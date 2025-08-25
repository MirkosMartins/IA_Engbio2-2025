# 🧬 ML Cancer Detection - Aplicação Interativa

**Aplicação Web Interativa para Classificação de Câncer de Mama usando Machine Learning**

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![Python](https://img.shields.io/badge/Python-3.9-blue?logo=python)](https://python.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Modern-orange?logo=html5)](https://html.spec.whatwg.org/)

---

## 🌟 **Visão Geral**

Esta é uma **aplicação web moderna e interativa** que permite aos usuários treinar modelos de Machine Learning para classificação de câncer de mama em tempo real. Desenvolvida para fins educacionais como projeto da disciplina **IA em Saúde** da UFN 2025.

### 🎯 **Funcionalidades Principais**

- 🔧 **Configuração Dinâmica**: Interface para inserir URLs de datasets e configurar parâmetros
- 📊 **Visualizações Interativas**: Gráficos em tempo real com Chart.js e D3.js
- 🤖 **API Machine Learning**: Backend Python serverless para treinamento de modelos
- 📱 **Design Responsivo**: Interface otimizada para desktop, tablet e mobile
- 🇧🇷 **100% em Português**: Interface e documentação completamente em português

---

## 🚀 **Demo Online**

**[🔗 Acesse a Aplicação](https://seu-app.vercel.app)** *(após deploy no Vercel)*

---

## 📊 **Screenshots**

| Interface Principal | Dashboard de Resultados |
|:---:|:---:|
| ![Interface](assets/images/interface-preview.png) | ![Dashboard](assets/images/dashboard-preview.png) |

---

## 🛠️ **Tecnologias**

### Frontend
- **HTML5** - Estrutura semântica moderna
- **CSS3** - Grid, Flexbox, animações
- **JavaScript ES6** - Programação modular
- **Chart.js** - Gráficos interativos
- **D3.js** - Visualizações avançadas

### Backend
- **Python 3.9** - Linguagem principal
- **scikit-learn** - Machine Learning
- **pandas** - Manipulação de dados
- **NumPy** - Computação numérica

### Deploy
- **Vercel** - Frontend + Serverless Functions
- **Git** - Controle de versão

---

## 📁 **Estrutura do Projeto**

```
📦 ML Cancer Detection
├── 🌐 Frontend
│   ├── index.html              # Interface principal
│   ├── assets/
│   │   ├── css/               # Estilos modulares
│   │   ├── js/                # JavaScript modular
│   │   └── images/            # Visualizações
├── 🐍 Backend
│   └── api/
│       └── train.py           # API serverless
├── 📊 Dados & Modelos
│   └── src/
│       ├── data/              # Datasets e resultados
│       ├── models/            # Modelos treinados
│       └── scripts/           # Scripts Python
├── 📚 Documentação
│   ├── docs/                  # Documentação completa
│   ├── GUIA_DEPLOY_VERCEL.md  # Guia de deploy
│   └── README.md              # Este arquivo
└── ⚙️ Configuração
    ├── vercel.json            # Config Vercel
    ├── package.json           # Metadados
    └── requirements.txt       # Deps Python
```

---

## 🚀 **Como Usar**

### 1️⃣ **Teste Local**

```bash
# Clone o repositório
git clone https://github.com/MirkosMartins/IA_Engbio2-2025.git
cd IA_Engbio2-2025

# Mude para a branch do projeto
git checkout KallebyX-ex-1

# Inicie servidor local
python3 -m http.server 8000

# Acesse: http://localhost:8000
```

### 2️⃣ **Deploy no Vercel**

1. **Acesse [vercel.com](https://vercel.com)**
2. **Import Git Repository**
3. **Selecione a branch `KallebyX-ex-1`**
4. **Deploy automático!**

📖 **[Guia Completo de Deploy](GUIA_DEPLOY_VERCEL.md)**

---

## 🎮 **Como Usar a Aplicação**

### **1. Configuração**
- Digite `17` para dataset Breast Cancer ou URL personalizada
- Ajuste % treino/teste com o slider (recomendado: 80%/20%)
- Configure parâmetros do modelo (critério, profundidade, etc.)

### **2. Treinamento**
- Clique "Treinar Modelo"
- Acompanhe o progresso em tempo real
- Veja logs detalhados do processamento

### **3. Resultados**
- Visualize métricas (acurácia, precisão, recall, F1-score)
- Analise matriz de confusão interativa
- Explore gráficos de importância das features
- Examine curva ROC e métricas clínicas

---

## 📊 **Métricas do Modelo**

| Métrica | Valor | Descrição |
|---------|-------|-----------|
| **Acurácia** | 95.6% | Predições corretas |
| **Precisão** | 100.0% | Predições positivas corretas |
| **Recall** | 88.1% | Casos positivos detectados |
| **F1-Score** | 93.7% | Média harmônica |
| **Especificidade** | 100.0% | Casos negativos corretos |
| **AUC-ROC** | 0.94 | Área sob curva ROC |

---

## 📚 **Documentação**

- 📖 **[Guia de Deploy no Vercel](GUIA_DEPLOY_VERCEL.md)**
- 📊 **[Relatório Técnico Completo](docs/relatorio_final.md)**
- 🗃️ **[Informações do Dataset](docs/dataset_info.md)**
- 🌐 **[Documentação da Landing Page](docs/README_LANDING_PAGE.md)**

---

## 🧪 **Dataset**

**Fonte**: [UCI ML Repository - Breast Cancer Wisconsin](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic))

- **569 instâncias** (357 benignos, 212 malignos)
- **30 features** morfológicas de núcleos celulares
- **Dados reais** de aspiração por agulha fina (FNA)

---

## 🤝 **Contribuições**

Projeto desenvolvido como trabalho acadêmico. Sugestões e melhorias são bem-vindas!

### **Como contribuir:**
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📜 **Licença**

Este projeto é desenvolvido para fins educacionais na disciplina **IA em Saúde** da **Universidade Franciscana (UFN)**.

---

## 👨‍💻 **Autor**

**Kalleby Evangelho**  
🎓 Engenharia Biomédica - UFN 2025  
📚 Disciplina: IA em Saúde  
👨‍🏫 Prof. Orientador: [Nome do Professor]

---

## 🏥 **Aplicação Clínica**

⚠️ **Importante**: Este modelo deve ser usado apenas como **ferramenta de apoio** ao diagnóstico médico, nunca substituindo a avaliação de profissionais especializados.

### **Benefícios Potenciais:**
- 🩺 Triagem eficiente de casos
- 📊 Análise objetiva de características
- 🎓 Ferramenta educacional para profissionais
- 💡 Insights sobre importância das features

---

## 🔗 **Links Úteis**

- 🌐 **[Repositório GitHub](https://github.com/MirkosMartins/IA_Engbio2-2025/tree/KallebyX-ex-1)**
- 📊 **[Dataset UCI](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic))**
- 🚀 **[Vercel Platform](https://vercel.com)**
- 📚 **[scikit-learn Docs](https://scikit-learn.org/stable/)**

---

<div align="center">

**Desenvolvido com ❤️ para demonstrar o poder do Machine Learning na área da saúde**

🌟 **Se este projeto foi útil, considere dar uma star!** ⭐

</div>
