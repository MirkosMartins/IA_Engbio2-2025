# Árvore de Decisão para Classificação de Câncer de Mama

**Exercício 1 - IA em Saúde – Engenharia Biomédica | UFN 2025**  
**Autor**: Kalleby Evangelho

## 📋 Resumo do Projeto

Este projeto desenvolve uma árvore de decisão para classificar tumores de mama como **malignos** ou **benignos** utilizando o dataset Breast Cancer Wisconsin (Diagnostic) do repositório UCI Machine Learning. O modelo final alcançou uma **acurácia de 95.6%** no conjunto de teste.

## 🎯 Objetivos

- **Principal**: Construir uma árvore de decisão capaz de classificar tumores de mama
- **Específicos**:
  - Explorar e preparar o dataset Breast Cancer Wisconsin
  - Otimizar hiperparâmetros da árvore de decisão
  - Avaliar performance com métricas clínicas relevantes
  - Identificar características mais importantes para diagnóstico

## 📊 Resultados Principais

- **Acurácia**: 95.6%
- **Precisão**: 100.0%
- **Recall**: 88.1%
- **F1-Score**: 93.7%
- **Especificidade**: 100.0%
- **Sensibilidade**: 88.1%

## 📁 Estrutura do Projeto

```
projeto-cancer-mama/
├── README.md                          # Este arquivo
├── relatorio_final.md                 # Relatório técnico completo
├── dataset_info.md                    # Informações sobre o dataset
├── evaluation_report.txt              # Relatório de avaliação detalhado
├── 
├── 📄 Scripts Python
├── load_dataset.py                    # Carregamento do dataset
├── prepare_data.py                    # Preparação e limpeza dos dados
├── build_decision_tree.py             # Construção da árvore de decisão
├── evaluate_model.py                  # Avaliação detalhada do modelo
├── 
├── 🌐 Landing Page
├── index.html                         # Página web principal
├── styles.css                         # Estilos CSS responsivos
├── script.js                          # JavaScript para interatividade
├── 
├── 📈 Visualizações
├── class_distribution.png             # Distribuição das classes
├── correlation_heatmap.png            # Mapa de correlação
├── decision_tree_visualization.png    # Visualização da árvore
├── feature_importance.png             # Importância das features
├── confusion_matrix.png               # Matriz de confusão
├── evaluation_dashboard.png           # Dashboard completo
├── 
├── 💾 Dados e Modelo
├── breast_cancer_data.csv             # Dataset processado
├── decision_tree_model.pkl            # Modelo treinado
├── feature_importance.csv             # Importância das features
├── decision_tree_text.txt             # Árvore em formato texto
├── X_train.npy, X_test.npy            # Dados de treino e teste
├── y_train.npy, y_test.npy            # Labels de treino e teste
├── feature_names.txt                  # Nomes das features
└── class_mapping.txt                  # Mapeamento das classes
```

## 🚀 Como Executar

### Pré-requisitos

```bash
pip install ucimlrepo scikit-learn pandas numpy matplotlib seaborn joblib
```

### Execução Passo a Passo

1. **Carregar Dataset**:
```bash
python load_dataset.py
```

2. **Preparar Dados**:
```bash
python prepare_data.py
```

3. **Construir Modelo**:
```bash
python build_decision_tree.py
```

4. **Avaliar Modelo**:
```bash
python evaluate_model.py
```

5. **Visualizar Landing Page**:
```bash
# Abrir index.html em um navegador web
```

## 📊 Dataset

**Fonte**: UCI Machine Learning Repository - Breast Cancer Wisconsin (Diagnostic)

**Características**:
- **569 instâncias** (357 benignos, 212 malignos)
- **30 features** derivadas de imagens FNA
- **Nenhum valor ausente**
- **10 características base** calculadas em 3 formas (mean, SE, worst)

## 🧠 Metodologia

### Preparação dos Dados
- Codificação da variável target (B=0, M=1)
- Divisão estratificada: 80% treino, 20% teste
- Análise de correlação para identificar features importantes

### Modelagem
- **Algoritmo**: Árvore de Decisão (DecisionTreeClassifier)
- **Otimização**: Grid Search com validação cruzada 5-fold
- **Parâmetros ótimos**:
  - criterion: 'entropy'
  - max_depth: 7
  - min_samples_split: 5
  - min_samples_leaf: 2

### Avaliação
- Métricas tradicionais: Acurácia, Precisão, Recall, F1-Score
- Métricas clínicas: Sensibilidade, Especificidade, PPV, NPV
- Curvas ROC e Precision-Recall
- Análise de erros e matriz de confusão

## 🔍 Principais Descobertas

1. **Feature Mais Importante**: `perimeter3` (perímetro - worst) com 64.6% de importância
2. **Zero Falsos Positivos**: Especificidade de 100% elimina diagnósticos incorretos de malignidade
3. **5 Falsos Negativos**: 11.9% de casos malignos não detectados requerem atenção
4. **Alta Confiabilidade**: PPV de 100% garante que predições positivas estão sempre corretas

## 🌐 Landing Page

A landing page interativa (`index.html`) apresenta:
- Visão geral do projeto
- Características do dataset
- Visualização da árvore de decisão
- Métricas de performance
- Gráficos e análises
- Conclusões e recomendações

**Features da página**:
- Design responsivo para mobile e desktop
- Navegação suave entre seções
- Visualizações interativas
- Dashboard completo de métricas

## 📈 Visualizações Incluídas

1. **Distribuição das Classes**: Gráfico de barras mostrando proporção benigno/maligno
2. **Mapa de Correlação**: Heatmap das correlações entre top features e diagnóstico
3. **Árvore de Decisão**: Visualização dos primeiros 3 níveis da árvore
4. **Importância das Features**: Ranking das características mais discriminativas
5. **Matriz de Confusão**: Análise detalhada de acertos e erros
6. **Dashboard de Avaliação**: Curvas ROC, Precision-Recall e distribuições

## 🏥 Aplicações Clínicas

### Benefícios Potenciais
- **Triagem Eficiente**: Acelerar diagnóstico inicial
- **Redução de Custos**: Diminuir exames desnecessários
- **Padronização**: Critérios objetivos para diagnóstico
- **Educação Médica**: Ferramenta de treinamento

### Limitações e Cuidados
- Usar apenas como ferramenta de apoio ao diagnóstico médico
- Acompanhamento necessário mesmo em casos preditos como benignos
- Validação adicional em datasets externos recomendada
- Monitoramento contínuo da performance em dados reais

## 📚 Referências

- **Dataset**: Wolberg, W., Mangasarian, O., Street, N., & Street, W. (1993). Breast Cancer Wisconsin (Diagnostic). UCI Machine Learning Repository. https://doi.org/10.24432/C5DW2B
- **Ferramentas**: Python, scikit-learn, pandas, matplotlib, seaborn
- **Metodologia**: Grid Search, validação cruzada, métricas clínicas

## 👨‍💻 Autor

**Kalleby Evangelho**  
Engenharia Biomédica - UFN 2025  
Disciplina: IA em Saúde

---

## 📝 Notas de Desenvolvimento

- Todos os scripts são independentes e podem ser executados separadamente
- O modelo treinado é salvo em formato pickle para reutilização
- Visualizações são salvas em alta resolução (300 DPI)
- Landing page funciona offline (não requer servidor web)
- Código documentado e seguindo boas práticas de Python

## 🔧 Troubleshooting

**Erro de importação**: Instale as dependências listadas em pré-requisitos
**Imagens não carregam**: Verifique se os arquivos PNG estão no mesmo diretório
**Modelo não carrega**: Execute os scripts na ordem especificada
**Landing page não abre**: Use um navegador moderno (Chrome, Firefox, Safari)

Para mais detalhes, consulte o `relatorio_final.md` com análise técnica completa.

