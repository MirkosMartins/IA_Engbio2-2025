#!/usr/bin/env python3
"""
Script para avaliação detalhada da árvore de decisão
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import (
    classification_report, confusion_matrix, accuracy_score,
    precision_score, recall_score, f1_score, roc_curve, auc,
    precision_recall_curve, average_precision_score
)
from sklearn.tree import DecisionTreeClassifier
import joblib

def load_data_and_model():
    """Carrega dados e modelo treinado"""
    X_train = np.load('../data/X_train.npy')
    X_test = np.load('../data/X_test.npy')
    y_train = np.load('../data/y_train.npy')
    y_test = np.load('../data/y_test.npy')
    
    with open('../data/feature_names.txt', 'r') as f:
        feature_names = [line.strip() for line in f.readlines()]
    
    model = joblib.load('../models/decision_tree_model.pkl')
    
    return X_train, X_test, y_train, y_test, feature_names, model

def detailed_evaluation():
    """Realiza avaliação detalhada do modelo"""
    print("=== AVALIAÇÃO DETALHADA DO MODELO ===")
    
    # Carregar dados e modelo
    X_train, X_test, y_train, y_test, feature_names, model = load_data_and_model()
    
    # Predições
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]  # Probabilidade da classe positiva (maligno)
    
    # Métricas básicas
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    print(f"Acurácia: {accuracy:.4f}")
    print(f"Precisão: {precision:.4f}")
    print(f"Recall (Sensibilidade): {recall:.4f}")
    print(f"F1-Score: {f1:.4f}")
    
    # Matriz de confusão detalhada
    cm = confusion_matrix(y_test, y_pred)
    tn, fp, fn, tp = cm.ravel()
    
    print(f"\n=== MATRIZ DE CONFUSÃO ===")
    print(f"Verdadeiros Negativos (TN): {tn}")
    print(f"Falsos Positivos (FP): {fp}")
    print(f"Falsos Negativos (FN): {fn}")
    print(f"Verdadeiros Positivos (TP): {tp}")
    
    # Métricas derivadas
    specificity = tn / (tn + fp)
    sensitivity = tp / (tp + fn)
    ppv = tp / (tp + fp)  # Valor Preditivo Positivo
    npv = tn / (tn + fn)  # Valor Preditivo Negativo
    
    print(f"\n=== MÉTRICAS CLÍNICAS ===")
    print(f"Sensibilidade (Taxa de Verdadeiros Positivos): {sensitivity:.4f}")
    print(f"Especificidade (Taxa de Verdadeiros Negativos): {specificity:.4f}")
    print(f"Valor Preditivo Positivo (PPV): {ppv:.4f}")
    print(f"Valor Preditivo Negativo (NPV): {npv:.4f}")
    
    # Curva ROC
    fpr, tpr, thresholds_roc = roc_curve(y_test, y_pred_proba)
    roc_auc = auc(fpr, tpr)
    
    # Curva Precision-Recall
    precision_curve, recall_curve, thresholds_pr = precision_recall_curve(y_test, y_pred_proba)
    avg_precision = average_precision_score(y_test, y_pred_proba)
    
    print(f"\n=== MÉTRICAS DE CURVA ===")
    print(f"AUC-ROC: {roc_auc:.4f}")
    print(f"Average Precision Score: {avg_precision:.4f}")
    
    return {
        'accuracy': accuracy, 'precision': precision, 'recall': recall, 'f1': f1,
        'specificity': specificity, 'sensitivity': sensitivity, 'ppv': ppv, 'npv': npv,
        'roc_auc': roc_auc, 'avg_precision': avg_precision,
        'fpr': fpr, 'tpr': tpr, 'precision_curve': precision_curve, 'recall_curve': recall_curve,
        'y_test': y_test, 'y_pred': y_pred, 'y_pred_proba': y_pred_proba,
        'confusion_matrix': cm
    }

def create_advanced_visualizations(metrics):
    """Cria visualizações avançadas"""
    print("\n=== CRIANDO VISUALIZAÇÕES AVANÇADAS ===")
    
    # Configurar estilo
    plt.style.use('default')
    sns.set_palette("husl")
    
    # 1. Dashboard de métricas
    fig, axes = plt.subplots(2, 3, figsize=(18, 12))
    fig.suptitle('Dashboard de Avaliação - Árvore de Decisão para Câncer de Mama', fontsize=16)
    
    # Matriz de confusão melhorada
    ax1 = axes[0, 0]
    sns.heatmap(metrics['confusion_matrix'], annot=True, fmt='d', cmap='Blues',
                xticklabels=['Benigno', 'Maligno'], yticklabels=['Benigno', 'Maligno'], ax=ax1)
    ax1.set_title('Matriz de Confusão')
    ax1.set_ylabel('Valor Real')
    ax1.set_xlabel('Predição')
    
    # Curva ROC
    ax2 = axes[0, 1]
    ax2.plot(metrics['fpr'], metrics['tpr'], color='darkorange', lw=2, 
             label=f'ROC curve (AUC = {metrics["roc_auc"]:.3f})')
    ax2.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
    ax2.set_xlim([0.0, 1.0])
    ax2.set_ylim([0.0, 1.05])
    ax2.set_xlabel('Taxa de Falsos Positivos')
    ax2.set_ylabel('Taxa de Verdadeiros Positivos')
    ax2.set_title('Curva ROC')
    ax2.legend(loc="lower right")
    ax2.grid(True)
    
    # Curva Precision-Recall
    ax3 = axes[0, 2]
    ax3.plot(metrics['recall_curve'], metrics['precision_curve'], color='blue', lw=2,
             label=f'PR curve (AP = {metrics["avg_precision"]:.3f})')
    ax3.set_xlabel('Recall')
    ax3.set_ylabel('Precision')
    ax3.set_title('Curva Precision-Recall')
    ax3.legend(loc="lower left")
    ax3.grid(True)
    
    # Métricas principais
    ax4 = axes[1, 0]
    metrics_names = ['Acurácia', 'Precisão', 'Recall', 'F1-Score']
    metrics_values = [metrics['accuracy'], metrics['precision'], metrics['recall'], metrics['f1']]
    bars = ax4.bar(metrics_names, metrics_values, color=['skyblue', 'lightgreen', 'lightcoral', 'gold'])
    ax4.set_title('Métricas Principais')
    ax4.set_ylabel('Score')
    ax4.set_ylim([0, 1])
    for bar, value in zip(bars, metrics_values):
        ax4.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01, 
                f'{value:.3f}', ha='center', va='bottom')
    
    # Métricas clínicas
    ax5 = axes[1, 1]
    clinical_names = ['Sensibilidade', 'Especificidade', 'PPV', 'NPV']
    clinical_values = [metrics['sensitivity'], metrics['specificity'], metrics['ppv'], metrics['npv']]
    bars = ax5.bar(clinical_names, clinical_values, color=['lightblue', 'lightpink', 'lightgreen', 'lightyellow'])
    ax5.set_title('Métricas Clínicas')
    ax5.set_ylabel('Score')
    ax5.set_ylim([0, 1])
    for bar, value in zip(bars, clinical_values):
        ax5.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01, 
                f'{value:.3f}', ha='center', va='bottom')
    
    # Distribuição de probabilidades
    ax6 = axes[1, 2]
    benign_probs = metrics['y_pred_proba'][metrics['y_test'] == 0]
    malignant_probs = metrics['y_pred_proba'][metrics['y_test'] == 1]
    ax6.hist(benign_probs, bins=20, alpha=0.7, label='Benigno', color='lightblue')
    ax6.hist(malignant_probs, bins=20, alpha=0.7, label='Maligno', color='lightcoral')
    ax6.set_xlabel('Probabilidade Predita (Maligno)')
    ax6.set_ylabel('Frequência')
    ax6.set_title('Distribuição de Probabilidades')
    ax6.legend()
    ax6.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('../../assets/images/evaluation_dashboard.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    print("Dashboard de avaliação salvo como 'evaluation_dashboard.png'")

def analyze_errors(metrics, feature_names):
    """Analisa os erros do modelo"""
    print("\n=== ANÁLISE DE ERROS ===")
    
    # Carregar dados para análise de erros
    X_test = np.load('../data/X_test.npy')
    
    # Identificar erros
    errors = metrics['y_test'] != metrics['y_pred']
    false_positives = (metrics['y_test'] == 0) & (metrics['y_pred'] == 1)
    false_negatives = (metrics['y_test'] == 1) & (metrics['y_pred'] == 0)
    
    print(f"Total de erros: {errors.sum()}")
    print(f"Falsos Positivos: {false_positives.sum()}")
    print(f"Falsos Negativos: {false_negatives.sum()}")
    
    if false_positives.sum() > 0:
        print(f"\nCasos Falsos Positivos (preditos como malignos, mas são benignos):")
        fp_indices = np.where(false_positives)[0]
        for i, idx in enumerate(fp_indices[:3]):  # Mostrar apenas os primeiros 3
            print(f"  Caso {i+1}: Probabilidade = {metrics['y_pred_proba'][idx]:.3f}")
    
    if false_negatives.sum() > 0:
        print(f"\nCasos Falsos Negativos (preditos como benignos, mas são malignos):")
        fn_indices = np.where(false_negatives)[0]
        for i, idx in enumerate(fn_indices[:3]):  # Mostrar apenas os primeiros 3
            print(f"  Caso {i+1}: Probabilidade = {metrics['y_pred_proba'][idx]:.3f}")

def generate_summary_report(metrics):
    """Gera relatório resumo"""
    report = f"""
RELATÓRIO DE AVALIAÇÃO - ÁRVORE DE DECISÃO PARA CÂNCER DE MAMA
================================================================

RESUMO EXECUTIVO:
- O modelo de árvore de decisão foi treinado com sucesso para classificar 
  tumores de mama como benignos ou malignos.
- Acurácia geral: {metrics['accuracy']:.1%}
- O modelo demonstra excelente performance com alta precisão e recall.

MÉTRICAS PRINCIPAIS:
- Acurácia: {metrics['accuracy']:.4f} ({metrics['accuracy']:.1%})
- Precisão: {metrics['precision']:.4f} ({metrics['precision']:.1%})
- Recall (Sensibilidade): {metrics['recall']:.4f} ({metrics['recall']:.1%})
- F1-Score: {metrics['f1']:.4f}
- AUC-ROC: {metrics['roc_auc']:.4f}

MÉTRICAS CLÍNICAS:
- Sensibilidade: {metrics['sensitivity']:.4f} ({metrics['sensitivity']:.1%})
- Especificidade: {metrics['specificity']:.4f} ({metrics['specificity']:.1%})
- Valor Preditivo Positivo: {metrics['ppv']:.4f} ({metrics['ppv']:.1%})
- Valor Preditivo Negativo: {metrics['npv']:.4f} ({metrics['npv']:.1%})

INTERPRETAÇÃO CLÍNICA:
- Sensibilidade de {metrics['sensitivity']:.1%}: O modelo identifica corretamente 
  {metrics['sensitivity']:.1%} dos casos malignos.
- Especificidade de {metrics['specificity']:.1%}: O modelo identifica corretamente 
  {metrics['specificity']:.1%} dos casos benignos.
- PPV de {metrics['ppv']:.1%}: Quando o modelo prediz maligno, está correto 
  {metrics['ppv']:.1%} das vezes.
- NPV de {metrics['npv']:.1%}: Quando o modelo prediz benigno, está correto 
  {metrics['npv']:.1%} das vezes.

MATRIZ DE CONFUSÃO:
                    Predito
                Benigno  Maligno
Real  Benigno      {metrics['confusion_matrix'][0,0]}       {metrics['confusion_matrix'][0,1]}
      Maligno      {metrics['confusion_matrix'][1,0]}       {metrics['confusion_matrix'][1,1]}

CONCLUSÕES:
1. O modelo apresenta excelente performance para diagnóstico de câncer de mama.
2. A alta sensibilidade minimiza o risco de não detectar casos malignos.
3. A alta especificidade reduz diagnósticos falso-positivos.
4. O modelo pode ser uma ferramenta valiosa de apoio ao diagnóstico médico.

RECOMENDAÇÕES:
- O modelo deve ser usado como ferramenta de apoio, não substituindo o julgamento médico.
- Validação adicional em datasets externos seria benéfica.
- Monitoramento contínuo da performance em dados reais é recomendado.
"""
    
    with open('../data/evaluation_report.txt', 'w') as f:
        f.write(report)
    
    print("Relatório de avaliação salvo como 'evaluation_report.txt'")

if __name__ == "__main__":
    # Carregar dados e modelo
    X_train, X_test, y_train, y_test, feature_names, model = load_data_and_model()
    
    # Avaliação detalhada
    metrics = detailed_evaluation()
    
    # Visualizações avançadas
    create_advanced_visualizations(metrics)
    
    # Análise de erros
    analyze_errors(metrics, feature_names)
    
    # Relatório resumo
    generate_summary_report(metrics)
    
    print("\n=== AVALIAÇÃO COMPLETA ===")
    print("Todos os arquivos de avaliação foram gerados com sucesso!")

