# Árvore de Decisão para Classificação de Câncer de Mama

## Resumo Executivo

Este projeto desenvolveu uma árvore de decisão para classificar tumores de mama como **malignos** ou **benignos** utilizando o dataset Breast Cancer Wisconsin (Diagnostic) do repositório UCI Machine Learning. O modelo final alcançou uma acurácia de **95.6%** no conjunto de teste, demonstrando excelente capacidade de diagnóstico.

## 1. Introdução

O câncer de mama é uma das principais causas de mortalidade por câncer em mulheres mundialmente. O diagnóstico precoce e preciso é fundamental para o tratamento eficaz. Este projeto utiliza técnicas de aprendizado de máquina, especificamente árvores de decisão, para auxiliar no processo de diagnóstico através da análise de características morfológicas dos núcleos celulares.

### 1.1 Objetivos

- **Objetivo Principal**: Construir uma árvore de decisão capaz de classificar tumores de mama como malignos ou benignos
- **Objetivos Específicos**:
  - Explorar e preparar o dataset Breast Cancer Wisconsin
  - Otimizar hiperparâmetros da árvore de decisão
  - Avaliar a performance do modelo com métricas clínicas relevantes
  - Identificar as características mais importantes para o diagnóstico

## 2. Metodologia

### 2.1 Dataset

**Fonte**: UCI Machine Learning Repository - Breast Cancer Wisconsin (Diagnostic)
**Características**:
- **569 instâncias** (357 benignos, 212 malignos)
- **30 features** derivadas de imagens digitalizadas de aspiração por agulha fina (FNA)
- **Nenhum valor ausente**

### 2.2 Features do Dataset

As 30 features são baseadas em 10 características morfológicas dos núcleos celulares, calculadas em três formas:
- **Mean** (média) - campos 1-10
- **Standard Error** (erro padrão) - campos 11-20  
- **Worst** (pior - média dos 3 maiores valores) - campos 21-30

**Características base**:
1. **Radius** - raio médio das distâncias do centro aos pontos do perímetro
2. **Texture** - desvio padrão dos valores de escala de cinza
3. **Perimeter** - perímetro do núcleo
4. **Area** - área do núcleo
5. **Smoothness** - variação local nos comprimentos do raio
6. **Compactness** - perímetro² / área - 1.0
7. **Concavity** - severidade das porções côncavas do contorno
8. **Concave points** - número de porções côncavas do contorno
9. **Symmetry** - simetria do núcleo
10. **Fractal dimension** - "aproximação da linha costeira" - 1



### 2.3 Preparação dos Dados

**Codificação da Variável Target**:
- **B (Benigno)**: 0
- **M (Maligno)**: 1

**Divisão dos Dados**:
- **Conjunto de Treino**: 455 amostras (80%)
  - 285 benignos, 170 malignos
- **Conjunto de Teste**: 114 amostras (20%)
  - 72 benignos, 42 malignos

**Estratificação**: Mantida a proporção original das classes em ambos os conjuntos.

### 2.4 Construção da Árvore de Decisão

**Otimização de Hiperparâmetros**:
Utilizou-se busca em grade (Grid Search) com validação cruzada de 5 folds para otimizar:
- `criterion`: ['gini', 'entropy']
- `max_depth`: [3, 5, 7, 10, None]
- `min_samples_split`: [2, 5, 10]
- `min_samples_leaf`: [1, 2, 4]

**Parâmetros Ótimos Encontrados**:
- `criterion`: 'entropy'
- `max_depth`: 7
- `min_samples_leaf`: 2
- `min_samples_split`: 5

## 3. Resultados

### 3.1 Performance do Modelo

**Métricas Principais**:
- **Acurácia**: 95.61%
- **Precisão**: 100.00%
- **Recall (Sensibilidade)**: 88.10%
- **F1-Score**: 93.67%
- **AUC-ROC**: 93.96%

**Métricas Clínicas**:
- **Sensibilidade**: 88.10% - Capacidade de detectar casos malignos
- **Especificidade**: 100.00% - Capacidade de detectar casos benignos
- **Valor Preditivo Positivo (PPV)**: 100.00% - Quando prediz maligno, está correto 100% das vezes
- **Valor Preditivo Negativo (NPV)**: 93.51% - Quando prediz benigno, está correto 93.51% das vezes

### 3.2 Matriz de Confusão

```
                    Predito
                Benigno  Maligno
Real  Benigno      72       0
      Maligno       5      37
```

**Interpretação**:
- **Verdadeiros Negativos**: 72 casos benignos corretamente identificados
- **Verdadeiros Positivos**: 37 casos malignos corretamente identificados
- **Falsos Negativos**: 5 casos malignos incorretamente classificados como benignos
- **Falsos Positivos**: 0 casos benignos incorretamente classificados como malignos

### 3.3 Features Mais Importantes

**Top 10 Características Mais Relevantes**:

1. **perimeter3** (perímetro - worst): 64.64%
2. **concave_points3** (pontos côncavos - worst): 11.46%
3. **concave_points1** (pontos côncavos - mean): 8.51%
4. **texture3** (textura - worst): 6.71%
5. **area2** (área - standard error): 4.61%
6. **compactness2** (compacidade - standard error): 1.62%
7. **radius2** (raio - standard error): 1.29%
8. **concave_points2** (pontos côncavos - standard error): 1.15%
9. **area1** (área - mean): 0.00%
10. **smoothness1** (suavidade - mean): 0.00%

**Observação**: O perímetro na versão "worst" (média dos 3 maiores valores) é a característica mais discriminativa, representando quase 65% da importância total da árvore.


## 4. Análise de Erros

O modelo apresentou apenas **5 erros** no conjunto de teste (4.4% de erro):
- **0 Falsos Positivos**: Nenhum caso benigno foi incorretamente classificado como maligno
- **5 Falsos Negativos**: 5 casos malignos foram incorretamente classificados como benignos

Esta distribuição de erros é clinicamente favorável, pois evita completamente falsos alarmes (falsos positivos) que poderiam causar ansiedade desnecessária aos pacientes.

## 5. Interpretação Clínica

### 5.1 Significado das Métricas

**Sensibilidade (88.1%)**:
- O modelo detecta corretamente 88.1% dos casos malignos
- Significa que de cada 100 casos malignos, 88 são corretamente identificados
- Os 11.9% restantes requerem atenção adicional para melhorar a detecção

**Especificidade (100.0%)**:
- O modelo identifica corretamente 100% dos casos benignos
- Garante que nenhum paciente com tumor benigno seja incorretamente alarmado
- Elimina completamente os falsos positivos

**Valor Preditivo Positivo (100.0%)**:
- Quando o modelo prediz "maligno", está correto 100% das vezes
- Oferece alta confiança nas predições positivas
- Importante para decisões de tratamento

**Valor Preditivo Negativo (93.5%)**:
- Quando o modelo prediz "benigno", está correto 93.5% das vezes
- 6.5% dos casos preditos como benignos são na verdade malignos
- Requer acompanhamento médico mesmo em casos preditos como benignos

## 6. Conclusões

### 6.1 Principais Achados

1. **Alta Performance Geral**: O modelo alcançou 95.6% de acurácia, demonstrando excelente capacidade discriminativa entre tumores malignos e benignos.

2. **Precisão Perfeita**: Com 100% de precisão, o modelo elimina completamente falsos positivos, evitando diagnósticos incorretos de malignidade.

3. **Boa Sensibilidade**: A sensibilidade de 88.1% garante que a maioria dos casos malignos seja detectada, embora haja espaço para melhoria.

4. **Características Discriminativas**: O perímetro (worst) emergiu como a característica mais importante (64.6%), seguido por pontos côncavos e textura.

5. **Robustez do Modelo**: A validação cruzada confirmou a estabilidade do modelo com score médio de 94.7%.

### 6.2 Vantagens do Modelo

- **Eliminação de Falsos Positivos**: Especificidade de 100% evita ansiedade desnecessária
- **Alta Confiabilidade**: Quando prediz maligno, está sempre correto
- **Interpretabilidade**: Árvore de decisão oferece transparência nas decisões
- **Eficiência Computacional**: Modelo simples e rápido para implementação clínica

### 6.3 Limitações

- **Falsos Negativos**: 5 casos malignos não foram detectados (11.9% de miss rate)
- **Dataset Limitado**: Validação em apenas um dataset pode limitar generalização
- **Características Específicas**: Dependência de características morfológicas específicas

## 7. Recomendações

### 7.1 Para Implementação Clínica

1. **Uso como Ferramenta de Apoio**: O modelo deve complementar, não substituir, o julgamento médico especializado.

2. **Protocolo de Acompanhamento**: Mesmo casos preditos como benignos devem ter acompanhamento regular devido ao NPV de 93.5%.

3. **Validação Adicional**: Testar o modelo em datasets externos e populações diversas.

4. **Integração com Outros Exames**: Combinar com outros métodos diagnósticos para melhorar a sensibilidade.

### 7.2 Para Melhorias Futuras

1. **Engenharia de Features**: Explorar características adicionais que possam melhorar a sensibilidade.

2. **Ensemble Methods**: Combinar múltiplos modelos para reduzir falsos negativos.

3. **Balanceamento de Classes**: Técnicas para melhorar a detecção da classe minoritária (malignos).

4. **Validação Prospectiva**: Estudos longitudinais para validar a performance em cenários reais.

## 8. Impacto e Aplicações

### 8.1 Benefícios Potenciais

- **Triagem Eficiente**: Acelerar o processo de diagnóstico inicial
- **Redução de Custos**: Diminuir exames desnecessários em casos claramente benignos
- **Padronização**: Oferecer critérios objetivos para diagnóstico
- **Educação Médica**: Ferramenta para treinamento de profissionais

### 8.2 Considerações Éticas

- **Transparência**: Pacientes devem ser informados sobre o uso de IA no diagnóstico
- **Responsabilidade**: Decisões finais devem sempre envolver profissionais qualificados
- **Equidade**: Garantir que o modelo funcione adequadamente em diferentes populações
- **Privacidade**: Proteger dados sensíveis dos pacientes

## 9. Referências e Metodologia

**Dataset**: Wolberg, W., Mangasarian, O., Street, N., & Street, W. (1993). Breast Cancer Wisconsin (Diagnostic). UCI Machine Learning Repository. https://doi.org/10.24432/C5DW2B

**Ferramentas Utilizadas**:
- Python 3.11 com scikit-learn para modelagem
- Pandas e NumPy para manipulação de dados
- Matplotlib e Seaborn para visualizações
- Grid Search com validação cruzada para otimização

**Métricas de Avaliação**:
- Acurácia, Precisão, Recall, F1-Score
- Sensibilidade, Especificidade, PPV, NPV
- Curva ROC e AUC
- Matriz de Confusão

---

**Desenvolvido por**: Kalleby Evangelho  
**Disciplina**: IA em Saúde – Engenharia Biomédica | UFN 2025  
**Data**: Agosto de 2025

