# Breast Cancer Wisconsin (Diagnostic) Data Set

## Informações Gerais
- **Objetivo**: Prever se o câncer é benigno ou maligno
- **Fonte**: UCI Machine Learning Repository
- **Tamanho**: 125.2 kB
- **Arquivo**: data.csv

## Descrição dos Dados
- Features computadas a partir de imagem digitalizada de aspiração por agulha fina (FNA) de massa mamária
- Descrevem características dos núcleos celulares presentes na imagem
- Valores ausentes: nenhum
- Distribuição das classes: 357 benignos, 212 malignos

## Atributos
1. **ID number** - Número de identificação
2. **Diagnosis** - Diagnóstico (M = maligno, B = benigno)
3-32. **30 features** baseadas em 10 características reais de cada núcleo celular:

### 10 características base:
a) radius (raio - média das distâncias do centro aos pontos do perímetro)
b) texture (textura - desvio padrão dos valores de escala de cinza)
c) perimeter (perímetro)
d) area (área)
e) smoothness (suavidade - variação local nos comprimentos do raio)
f) compactness (compacidade - perímetro^2 / área - 1.0)
g) concavity (concavidade - severidade das porções côncavas do contorno)
h) concave points (pontos côncavos - número de porções côncavas do contorno)
i) symmetry (simetria)
j) fractal dimension (dimensão fractal - "aproximação da linha costeira" - 1)

### Para cada característica são calculados:
- **Mean** (média) - campos 3-12
- **Standard Error** (erro padrão) - campos 13-22  
- **Worst** (pior - média dos 3 maiores valores) - campos 23-32

Total: 30 features + ID + Diagnosis = 32 colunas

