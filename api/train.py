"""
API para treinamento de modelo de ML
Função serverless para Vercel
"""

import json
import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import confusion_matrix, roc_curve, auc
from ucimlrepo import fetch_ucirepo
import io
import base64
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Processar requisição POST para treinamento"""
        try:
            # Configurar CORS
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            # Ler dados da requisição
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            request_data = json.loads(post_data.decode('utf-8'))
            
            # Processar treinamento
            result = self.process_training(request_data)
            
            # Retornar resultado
            response = json.dumps(result, ensure_ascii=False).encode('utf-8')
            self.wfile.write(response)
            
        except Exception as e:
            self.send_error(500, f'Erro interno: {str(e)}')
    
    def do_OPTIONS(self):
        """Lidar com requisições OPTIONS (CORS)"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def process_training(self, config):
        """Processar treinamento do modelo"""
        try:
            # 1. Carregar dataset
            dataset_info = self.load_dataset(config['datasetUrl'])
            
            # 2. Preparar dados
            X_train, X_test, y_train, y_test = self.prepare_data(
                dataset_info['data'], 
                config['trainSize']
            )
            
            # 3. Treinar modelo
            model = self.train_model(X_train, y_train, config)
            
            # 4. Avaliar modelo
            results = self.evaluate_model(model, X_test, y_test)
            
            # 5. Gerar visualizações
            visualizations = self.generate_visualizations(
                dataset_info, results, model
            )
            
            return {
                'success': True,
                'dataset': dataset_info,
                'results': results,
                'visualizations': visualizations,
                'model_info': {
                    'algorithm': 'Decision Tree',
                    'parameters': {
                        'criterion': config.get('criterion', 'entropy'),
                        'max_depth': config.get('maxDepth'),
                        'min_samples_split': config.get('minSamplesSplit', 5),
                        'min_samples_leaf': config.get('minSamplesLeaf', 2)
                    }
                }
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def load_dataset(self, dataset_url):
        """Carregar dataset"""
        try:
            # Se for ID do UCI
            if dataset_url.isdigit():
                dataset_id = int(dataset_url)
                
                if dataset_id == 17:  # Breast Cancer Wisconsin
                    breast_cancer = fetch_ucirepo(id=17)
                    X = breast_cancer.data.features
                    y = breast_cancer.data.targets
                    
                    return {
                        'name': 'Breast Cancer Wisconsin (Diagnostic)',
                        'samples': len(X),
                        'features': len(X.columns),
                        'data': {'X': X, 'y': y},
                        'classes': {
                            'benign': int((y == 'B').sum()),
                            'malignant': int((y == 'M').sum())
                        }
                    }
                else:
                    raise ValueError(f"Dataset UCI {dataset_id} não suportado")
            
            # Se for URL de CSV
            elif dataset_url.startswith('http'):
                df = pd.read_csv(dataset_url)
                
                # Assumir que última coluna é target
                X = df.iloc[:, :-1]
                y = df.iloc[:, -1]
                
                return {
                    'name': 'Dataset Personalizado',
                    'samples': len(X),
                    'features': len(X.columns),
                    'data': {'X': X, 'y': y},
                    'classes': dict(y.value_counts())
                }
            
            else:
                raise ValueError("URL de dataset inválida")
                
        except Exception as e:
            raise Exception(f"Erro ao carregar dataset: {str(e)}")
    
    def prepare_data(self, data, train_size):
        """Preparar dados para treinamento"""
        X = data['X']
        y = data['y']
        
        # Codificar labels se necessário
        if y.dtype == 'object':
            from sklearn.preprocessing import LabelEncoder
            le = LabelEncoder()
            y = le.fit_transform(y)
        
        # Dividir dados
        test_size = (100 - train_size) / 100
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )
        
        return X_train, X_test, y_train, y_test
    
    def train_model(self, X_train, y_train, config):
        """Treinar modelo"""
        # Parâmetros do modelo
        params = {
            'criterion': config.get('criterion', 'entropy'),
            'random_state': 42
        }
        
        max_depth = config.get('maxDepth')
        if max_depth != 'None' and max_depth is not None:
            params['max_depth'] = int(max_depth)
        
        if 'minSamplesSplit' in config:
            params['min_samples_split'] = int(config['minSamplesSplit'])
        
        if 'minSamplesLeaf' in config:
            params['min_samples_leaf'] = int(config['minSamplesLeaf'])
        
        # Treinar modelo
        model = DecisionTreeClassifier(**params)
        model.fit(X_train, y_train)
        
        return model
    
    def evaluate_model(self, model, X_test, y_test):
        """Avaliar modelo"""
        # Predições
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1] if len(np.unique(y_test)) == 2 else None
        
        # Métricas básicas
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, average='weighted')
        recall = recall_score(y_test, y_pred, average='weighted')
        f1 = f1_score(y_test, y_pred, average='weighted')
        
        # Matriz de confusão
        cm = confusion_matrix(y_test, y_pred)
        
        # Métricas clínicas (para classificação binária)
        clinical_metrics = {}
        if len(np.unique(y_test)) == 2:
            tn, fp, fn, tp = cm.ravel()
            
            clinical_metrics = {
                'sensitivity': tp / (tp + fn) if (tp + fn) > 0 else 0,
                'specificity': tn / (tn + fp) if (tn + fp) > 0 else 0,
                'ppv': tp / (tp + fp) if (tp + fp) > 0 else 0,
                'npv': tn / (tn + fn) if (tn + fn) > 0 else 0
            }
        
        # Curva ROC
        roc_data = {}
        if y_pred_proba is not None:
            fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
            roc_auc = auc(fpr, tpr)
            
            roc_data = {
                'fpr': fpr.tolist(),
                'tpr': tpr.tolist(),
                'auc': float(roc_auc)
            }
        
        return {
            'metrics': {
                'accuracy': float(accuracy * 100),
                'precision': float(precision * 100),
                'recall': float(recall * 100),
                'f1Score': float(f1 * 100),
                **{k: float(v * 100) for k, v in clinical_metrics.items()}
            },
            'confusion_matrix': cm.tolist(),
            'roc_curve': roc_data,
            'feature_importance': {
                'features': list(range(len(model.feature_importances_))),
                'importance': (model.feature_importances_ * 100).tolist()
            }
        }
    
    def generate_visualizations(self, dataset_info, results, model):
        """Gerar dados para visualizações"""
        return {
            'class_distribution': dataset_info['classes'],
            'confusion_matrix': results['confusion_matrix'],
            'feature_importance': results['feature_importance'],
            'roc_curve': results['roc_curve'],
            'decision_tree': {
                'max_depth': model.max_depth,
                'n_leaves': model.get_n_leaves(),
                'n_nodes': model.tree_.node_count
            }
        }

def handler_function(request):
    """Função principal para Vercel"""
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        }
    
    if request.method != 'POST':
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Método não permitido'})
        }
    
    try:
        # Processar dados da requisição
        config = json.loads(request.body)
        
        # Instanciar handler e processar
        api_handler = handler()
        result = api_handler.process_training(config)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, ensure_ascii=False)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }
