#!/usr/bin/env python3
"""
Script para preparar os dados para construção da árvore de decisão
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import seaborn as sns

def prepare_data():
    """Prepara os dados para a árvore de decisão"""
    print("=== PREPARAÇÃO DOS DADOS ===")
    
    # Carregar dados
    data = pd.read_csv('/home/ubuntu/breast_cancer_data.csv')
    print(f"Dados carregados: {data.shape}")
    
    # Separar features e target
    X = data.drop('Diagnosis', axis=1)
    y = data['Diagnosis']
    
    print(f"Features (X): {X.shape}")
    print(f"Target (y): {y.shape}")
    print(f"Classes originais: {y.unique()}")
    
    # Codificar variável target (M=1 para Maligno, B=0 para Benigno)
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    
    print(f"Classes codificadas: {np.unique(y_encoded)}")
    print(f"Mapeamento: {dict(zip(label_encoder.classes_, label_encoder.transform(label_encoder.classes_)))}")
    
    # Criar DataFrame com target codificado para análise
    data_encoded = X.copy()
    data_encoded['Diagnosis'] = y_encoded
    
    # Análise de correlação
    print("\n=== ANÁLISE DE CORRELAÇÃO ===")
    correlation_with_target = data_encoded.corr()['Diagnosis'].abs().sort_values(ascending=False)
    print("Top 10 features mais correlacionadas com o diagnóstico:")
    print(correlation_with_target.head(11)[1:])  # Excluir a própria variável target
    
    # Dividir dados em treino e teste
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, 
        test_size=0.2, 
        random_state=42, 
        stratify=y_encoded
    )
    
    print(f"\n=== DIVISÃO DOS DADOS ===")
    print(f"Treino: {X_train.shape[0]} amostras")
    print(f"Teste: {X_test.shape[0]} amostras")
    print(f"Distribuição no treino: {np.bincount(y_train)}")
    print(f"Distribuição no teste: {np.bincount(y_test)}")
    
    # Salvar dados preparados
    np.save('/home/ubuntu/X_train.npy', X_train.values)
    np.save('/home/ubuntu/X_test.npy', X_test.values)
    np.save('/home/ubuntu/y_train.npy', y_train)
    np.save('/home/ubuntu/y_test.npy', y_test)
    
    # Salvar nomes das features e mapeamento das classes
    feature_names = X.columns.tolist()
    class_mapping = dict(zip(label_encoder.classes_, label_encoder.transform(label_encoder.classes_)))
    
    with open('/home/ubuntu/feature_names.txt', 'w') as f:
        for name in feature_names:
            f.write(f"{name}\n")
    
    with open('/home/ubuntu/class_mapping.txt', 'w') as f:
        f.write("B (Benigno): 0\n")
        f.write("M (Maligno): 1\n")
    
    print("\nDados preparados e salvos com sucesso!")
    
    # Criar visualização da distribuição das classes
    plt.figure(figsize=(10, 6))
    
    # Subplot 1: Distribuição original
    plt.subplot(1, 2, 1)
    y.value_counts().plot(kind='bar', color=['lightblue', 'lightcoral'])
    plt.title('Distribuição das Classes\n(Original)')
    plt.xlabel('Diagnóstico')
    plt.ylabel('Frequência')
    plt.xticks([0, 1], ['Benigno (B)', 'Maligno (M)'], rotation=0)
    
    # Subplot 2: Distribuição codificada
    plt.subplot(1, 2, 2)
    pd.Series(y_encoded).value_counts().sort_index().plot(kind='bar', color=['lightblue', 'lightcoral'])
    plt.title('Distribuição das Classes\n(Codificada)')
    plt.xlabel('Diagnóstico')
    plt.ylabel('Frequência')
    plt.xticks([0, 1], ['Benigno (0)', 'Maligno (1)'], rotation=0)
    
    plt.tight_layout()
    plt.savefig('/home/ubuntu/class_distribution.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Criar heatmap das correlações mais importantes
    plt.figure(figsize=(12, 8))
    top_features = correlation_with_target.head(11)[1:].index  # Top 10 features
    correlation_matrix = data_encoded[list(top_features) + ['Diagnosis']].corr()
    
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0, 
                square=True, fmt='.2f')
    plt.title('Correlação entre Top 10 Features e Diagnóstico')
    plt.tight_layout()
    plt.savefig('/home/ubuntu/correlation_heatmap.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    print("Visualizações salvas: 'class_distribution.png' e 'correlation_heatmap.png'")
    
    return X_train, X_test, y_train, y_test, feature_names, class_mapping

if __name__ == "__main__":
    X_train, X_test, y_train, y_test, feature_names, class_mapping = prepare_data()

