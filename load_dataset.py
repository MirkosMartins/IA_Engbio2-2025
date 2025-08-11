#!/usr/bin/env python3
"""
Script para carregar e explorar o dataset Breast Cancer Wisconsin (Diagnostic)
"""

import pandas as pd
import numpy as np
from ucimlrepo import fetch_ucirepo

def load_breast_cancer_data():
    """Carrega o dataset de câncer de mama do repositório UCI"""
    print("Carregando dataset Breast Cancer Wisconsin (Diagnostic)...")
    
    # Buscar dataset
    breast_cancer_wisconsin_diagnostic = fetch_ucirepo(id=17)
    
    # Dados (como pandas dataframes)
    X = breast_cancer_wisconsin_diagnostic.data.features
    y = breast_cancer_wisconsin_diagnostic.data.targets
    
    # Combinar features e targets em um único DataFrame
    data = pd.concat([X, y], axis=1)
    
    print(f"Dataset carregado com sucesso!")
    print(f"Forma dos dados: {data.shape}")
    print(f"Colunas: {list(data.columns)}")
    
    # Salvar dados em CSV
    data.to_csv('/home/ubuntu/breast_cancer_data.csv', index=False)
    print("Dados salvos em 'breast_cancer_data.csv'")
    
    # Informações básicas
    print("\n=== INFORMAÇÕES BÁSICAS ===")
    print(f"Número de instâncias: {len(data)}")
    print(f"Número de features: {len(X.columns)}")
    print(f"Variável target: {y.columns[0]}")
    
    # Distribuição das classes
    print(f"\nDistribuição das classes:")
    print(data[y.columns[0]].value_counts())
    
    # Primeiras linhas
    print(f"\nPrimeiras 5 linhas:")
    print(data.head())
    
    # Informações sobre tipos de dados
    print(f"\nInformações sobre os dados:")
    print(data.info())
    
    # Estatísticas descritivas
    print(f"\nEstatísticas descritivas:")
    print(data.describe())
    
    # Verificar valores ausentes
    print(f"\nValores ausentes por coluna:")
    missing_values = data.isnull().sum()
    print(missing_values[missing_values > 0])
    if missing_values.sum() == 0:
        print("Nenhum valor ausente encontrado!")
    
    return data, X, y

if __name__ == "__main__":
    data, X, y = load_breast_cancer_data()

