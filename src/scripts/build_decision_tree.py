#!/usr/bin/env python3
"""
Script para construir e treinar a árvore de decisão para classificação de câncer de mama
"""

import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier, plot_tree, export_text
from sklearn.model_selection import GridSearchCV, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import matplotlib.pyplot as plt
import seaborn as sns
import joblib

def load_prepared_data():
    """Carrega os dados preparados"""
    X_train = np.load('../data/X_train.npy')
    X_test = np.load('../data/X_test.npy')
    y_train = np.load('../data/y_train.npy')
    y_test = np.load('../data/y_test.npy')
    
    # Carregar nomes das features
    with open('../data/feature_names.txt', 'r') as f:
        feature_names = [line.strip() for line in f.readlines()]
    
    return X_train, X_test, y_train, y_test, feature_names

def build_decision_tree():
    """Constrói e treina a árvore de decisão"""
    print("=== CONSTRUÇÃO DA ÁRVORE DE DECISÃO ===")
    
    # Carregar dados
    X_train, X_test, y_train, y_test, feature_names = load_prepared_data()
    
    print(f"Dados de treino: {X_train.shape}")
    print(f"Dados de teste: {X_test.shape}")
    print(f"Features: {len(feature_names)}")
    
    # Definir parâmetros para busca em grade
    param_grid = {
        'max_depth': [3, 5, 7, 10, None],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4],
        'criterion': ['gini', 'entropy']
    }
    
    # Criar modelo base
    dt_base = DecisionTreeClassifier(random_state=42)
    
    # Busca em grade com validação cruzada
    print("\nRealizando busca em grade para otimização de hiperparâmetros...")
    grid_search = GridSearchCV(
        dt_base, 
        param_grid, 
        cv=5, 
        scoring='accuracy',
        n_jobs=-1,
        verbose=1
    )
    
    grid_search.fit(X_train, y_train)
    
    print(f"Melhores parâmetros: {grid_search.best_params_}")
    print(f"Melhor score CV: {grid_search.best_score_:.4f}")
    
    # Modelo otimizado
    best_dt = grid_search.best_estimator_
    
    # Treinar modelo simples para comparação
    dt_simple = DecisionTreeClassifier(random_state=42, max_depth=5)
    dt_simple.fit(X_train, y_train)
    
    # Validação cruzada
    cv_scores_best = cross_val_score(best_dt, X_train, y_train, cv=5)
    cv_scores_simple = cross_val_score(dt_simple, X_train, y_train, cv=5)
    
    print(f"\n=== VALIDAÇÃO CRUZADA ===")
    print(f"Modelo otimizado - CV Score: {cv_scores_best.mean():.4f} (+/- {cv_scores_best.std() * 2:.4f})")
    print(f"Modelo simples - CV Score: {cv_scores_simple.mean():.4f} (+/- {cv_scores_simple.std() * 2:.4f})")
    
    # Predições
    y_pred_best = best_dt.predict(X_test)
    y_pred_simple = dt_simple.predict(X_test)
    
    # Acurácia
    acc_best = accuracy_score(y_test, y_pred_best)
    acc_simple = accuracy_score(y_test, y_pred_simple)
    
    print(f"\n=== ACURÁCIA NO TESTE ===")
    print(f"Modelo otimizado: {acc_best:.4f}")
    print(f"Modelo simples: {acc_simple:.4f}")
    
    # Escolher melhor modelo
    if acc_best >= acc_simple:
        final_model = best_dt
        y_pred_final = y_pred_best
        model_name = "Otimizado"
        print(f"\nModelo escolhido: {model_name}")
    else:
        final_model = dt_simple
        y_pred_final = y_pred_simple
        model_name = "Simples"
        print(f"\nModelo escolhido: {model_name}")
    
    # Salvar modelo
    joblib.dump(final_model, '../models/decision_tree_model.pkl')
    print("Modelo salvo como '../models/decision_tree_model.pkl'")
    
    # Importância das features
    feature_importance = pd.DataFrame({
        'feature': feature_names,
        'importance': final_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print(f"\n=== TOP 10 FEATURES MAIS IMPORTANTES ===")
    print(feature_importance.head(10))
    
    # Salvar importância das features
    feature_importance.to_csv('../data/feature_importance.csv', index=False)
    
    return final_model, y_pred_final, y_test, feature_names, feature_importance

def create_visualizations(model, y_pred, y_test, feature_names, feature_importance):
    """Cria visualizações do modelo"""
    print("\n=== CRIANDO VISUALIZAÇÕES ===")
    
    # 1. Árvore de decisão (versão simplificada)
    plt.figure(figsize=(20, 12))
    plot_tree(model, 
              feature_names=feature_names,
              class_names=['Benigno', 'Maligno'],
              filled=True,
              rounded=True,
              fontsize=10,
              max_depth=3)  # Limitar profundidade para visualização
    plt.title('Árvore de Decisão - Classificação de Câncer de Mama\n(Primeiros 3 níveis)', fontsize=16)
    plt.savefig('../../assets/images/decision_tree_visualization.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 2. Importância das features
    plt.figure(figsize=(12, 8))
    top_features = feature_importance.head(15)
    plt.barh(range(len(top_features)), top_features['importance'], color='skyblue')
    plt.yticks(range(len(top_features)), top_features['feature'])
    plt.xlabel('Importância')
    plt.title('Top 15 Features Mais Importantes na Árvore de Decisão')
    plt.gca().invert_yaxis()
    plt.tight_layout()
    plt.savefig('../../assets/images/feature_importance.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 3. Matriz de confusão
    plt.figure(figsize=(8, 6))
    cm = confusion_matrix(y_test, y_pred)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=['Benigno', 'Maligno'],
                yticklabels=['Benigno', 'Maligno'])
    plt.title('Matriz de Confusão')
    plt.ylabel('Valor Real')
    plt.xlabel('Predição')
    plt.tight_layout()
    plt.savefig('../../assets/images/confusion_matrix.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    print("Visualizações salvas:")
    print("- decision_tree_visualization.png")
    print("- feature_importance.png") 
    print("- confusion_matrix.png")

def generate_text_tree(model, feature_names):
    """Gera representação textual da árvore"""
    tree_text = export_text(model, 
                           feature_names=feature_names,
                           class_names=['Benigno', 'Maligno'],
                           max_depth=4)  # Limitar profundidade
    
    with open('../data/decision_tree_text.txt', 'w') as f:
        f.write("ÁRVORE DE DECISÃO - REPRESENTAÇÃO TEXTUAL\n")
        f.write("=" * 50 + "\n\n")
        f.write("Legenda:\n")
        f.write("- Benigno: Classe 0\n")
        f.write("- Maligno: Classe 1\n")
        f.write("- gini: Medida de impureza\n")
        f.write("- samples: Número de amostras no nó\n")
        f.write("- value: [amostras_benignas, amostras_malignas]\n\n")
        f.write(tree_text)
    
    print("Representação textual da árvore salva em 'decision_tree_text.txt'")

if __name__ == "__main__":
    # Construir modelo
    model, y_pred, y_test, feature_names, feature_importance = build_decision_tree()
    
    # Criar visualizações
    create_visualizations(model, y_pred, y_test, feature_names, feature_importance)
    
    # Gerar árvore textual
    generate_text_tree(model, feature_names)
    
    # Relatório de classificação
    print(f"\n=== RELATÓRIO DE CLASSIFICAÇÃO ===")
    print(classification_report(y_test, y_pred, target_names=['Benigno', 'Maligno']))
    
    print("\n=== CONSTRUÇÃO DA ÁRVORE CONCLUÍDA ===")
    print("Todos os arquivos foram salvos com sucesso!")

