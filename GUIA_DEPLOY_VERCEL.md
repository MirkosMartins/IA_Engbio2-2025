# 🚀 Guia Completo de Deploy no Vercel

## 📋 Resumo do Projeto

Este projeto é uma **aplicação web interativa** para classificação de câncer de mama usando Machine Learning. A aplicação permite:

- ✅ **Entrada personalizada de datasets** (URL ou ID do UCI)
- ✅ **Configuração de parâmetros** de treino/teste
- ✅ **Treinamento automático** de modelos de ML
- ✅ **Visualizações interativas** em tempo real
- ✅ **Interface responsiva** em português
- ✅ **API backend** com Python/scikit-learn

## 🌟 Funcionalidades Principais

### 🎯 Interface Interativa
- **Formulário dinâmico** para configuração
- **Preview em tempo real** das configurações
- **Slider interativo** para divisão treino/teste
- **Validação de campos** em tempo real
- **Tooltips explicativos** para cada parâmetro

### 🤖 Machine Learning
- **Algoritmo**: Árvore de Decisão (Decision Tree)
- **Otimização automática** de hiperparâmetros
- **Validação cruzada** para robustez
- **Métricas clínicas** especializadas
- **Suporte a datasets personalizados**

### 📊 Visualizações
- **Gráficos interativos** com Chart.js
- **Dashboard de métricas** em tempo real
- **Matriz de confusão** visual
- **Curva ROC** e métricas AUC
- **Importância das features** rankeada
- **Distribuição de classes** animada

### 🔧 Tecnologias
- **Frontend**: HTML5, CSS3, JavaScript ES6
- **Backend**: Python 3.9, scikit-learn, pandas
- **Gráficos**: Chart.js, D3.js
- **Styling**: CSS Grid, Flexbox, Animações
- **Deploy**: Vercel (Frontend + Serverless Functions)

## 📁 Estrutura do Projeto

```
Árvore de Decisão Câncer de Mama/
├── 🌐 Frontend
│   ├── index.html                 # Página principal
│   ├── assets/
│   │   ├── css/
│   │   │   ├── styles.css        # Estilos principais
│   │   │   └── components/       # Componentes CSS
│   │   │       ├── forms.css     # Estilos de formulários
│   │   │       └── dashboard.css # Estilos de dashboard
│   │   ├── js/
│   │   │   ├── script.js         # Script principal
│   │   │   └── modules/          # Módulos JS
│   │   │       ├── ui.js         # Gerenciamento de UI
│   │   │       ├── api.js        # Comunicação com API
│   │   │       └── charts.js     # Gráficos e visualizações
│   │   └── images/               # Imagens e visualizações
│   │       ├── class_distribution.png
│   │       ├── confusion_matrix.png
│   │       ├── correlation_heatmap.png
│   │       ├── decision_tree_visualization.png
│   │       ├── evaluation_dashboard.png
│   │       └── feature_importance.png
│
├── 🐍 Backend
│   └── api/
│       └── train.py              # API serverless para treinamento
│
├── 📊 Dados e Modelos
│   └── src/
│       ├── data/                 # Dados processados
│       ├── models/               # Modelos treinados
│       └── scripts/              # Scripts Python originais
│
├── 📚 Documentação
│   └── docs/
│       ├── README.md
│       ├── relatorio_final.md
│       ├── dataset_info.md
│       └── README_VERCEL.md
│
└── ⚙️ Configuração
    ├── vercel.json               # Configuração Vercel
    ├── package.json              # Metadados do projeto
    ├── requirements.txt          # Dependências Python
    └── .gitignore               # Arquivos ignorados
```

## 🚀 Deploy no Vercel - Passo a Passo

### Método 1: Deploy via Interface Web (Recomendado)

#### 1️⃣ Preparação
```bash
# 1. Verificar se todos os arquivos estão no lugar
ls -la

# 2. Verificar estrutura principal
tree -L 2
```

#### 2️⃣ Criar Conta no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub/GitLab/Bitbucket
3. Clique em "New Project"

#### 3️⃣ Upload do Projeto
**Opção A - Via GitHub (Recomendado):**
```bash
# Criar repositório GitHub
git init
git add .
git commit -m "🚀 ML Cancer Detection - Aplicação Completa"
git branch -M main
git remote add origin https://github.com/USERNAME/ml-cancer-detection.git
git push -u origin main
```

**Opção B - Upload Direto:**
1. Compacte toda a pasta do projeto
2. No Vercel, escolha "Import from Archive"
3. Faça upload do arquivo

#### 4️⃣ Configuração no Vercel
1. **Nome do Projeto**: `ml-cancer-detection`
2. **Framework**: Detect Automatically
3. **Root Directory**: `./` (raiz)
4. **Environment Variables**: Nenhuma necessária

#### 5️⃣ Deploy
1. Clique em "Deploy"
2. Aguarde 2-3 minutos para build
3. Teste a URL gerada

### Método 2: Deploy via CLI

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Deploy de produção
vercel --prod
```

## ✅ Checklist de Verificação

### 🔍 Antes do Deploy
- [ ] Todos os arquivos CSS estão carregando
- [ ] Todos os arquivos JS estão funcionando
- [ ] Imagens estão sendo exibidas
- [ ] Formulário está validando
- [ ] Navegação entre seções funciona
- [ ] Responsividade está OK

### 🌐 Após o Deploy
- [ ] Site carrega sem erros
- [ ] Formulário aceita dados
- [ ] Botão "Treinar Modelo" funciona
- [ ] Gráficos são gerados
- [ ] Métricas são exibidas
- [ ] Interface está em português
- [ ] Responsivo em mobile

### 🐍 Backend Python
- [ ] Função `/api/train` responde
- [ ] Processamento ML funciona
- [ ] Dados são retornados corretamente
- [ ] CORS está configurado
- [ ] Timeout está adequado (30s)

## 🎯 Como Usar a Aplicação

### 1️⃣ Configuração
1. **Dataset**: Digite `17` para Breast Cancer ou URL personalizada
2. **Treino/Teste**: Ajuste o slider (recomendado: 80%/20%)
3. **Parâmetros**: Configure profundidade, critério, etc.
4. **Preview**: Verifique configurações no painel lateral

### 2️⃣ Treinamento
1. Clique em "Treinar Modelo"
2. Acompanhe o progresso na seção de treinamento
3. Veja logs em tempo real
4. Aguarde conclusão (1-2 minutos)

### 3️⃣ Resultados
1. **Métricas**: Acurácia, precisão, recall, F1-score
2. **Clínicas**: Sensibilidade, especificidade, PPV, NPV
3. **Visualizações**: Gráficos interativos
4. **Árvore**: Visualização da decisão

## 🐛 Troubleshooting

### ❌ Problemas Comuns

**1. Site não carrega**
```bash
# Verificar vercel.json
cat vercel.json

# Verificar logs
vercel logs
```

**2. CSS não aplica**
```bash
# Verificar caminhos no HTML
grep -n "css" index.html

# Verificar estrutura
ls -la assets/css/
```

**3. JavaScript não funciona**
```bash
# Verificar console do browser (F12)
# Verificar caminhos dos scripts
grep -n "script" index.html
```

**4. API Python falha**
```bash
# Verificar logs da função
vercel logs --follow

# Testar função isoladamente
curl -X POST https://seu-app.vercel.app/api/train \
  -H "Content-Type: application/json" \
  -d '{"datasetUrl":"17","trainSize":80}'
```

**5. Gráficos não aparecem**
- Verificar se Chart.js está carregando
- Verificar se D3.js está carregando
- Verificar console para erros

### 🔧 Soluções Rápidas

**Recarregar dependências:**
```bash
# Limpar cache do Vercel
vercel env rm CACHE_KEY
vercel --prod
```

**Verificar status:**
```bash
# Status do projeto
vercel ls

# Logs em tempo real
vercel logs --follow
```

**Teste local:**
```bash
# Servidor simples
python -m http.server 8000
# Acesse: http://localhost:8000
```

## 🎨 Personalização

### 🎨 Cores e Tema
Edite `assets/css/styles.css`:
```css
:root {
    --primary-color: #667eea;    /* Cor principal */
    --secondary-color: #764ba2;  /* Cor secundária */
    --success-color: #10b981;    /* Cor de sucesso */
    --warning-color: #f59e0b;    /* Cor de aviso */
    --error-color: #ef4444;      /* Cor de erro */
}
```

### 📝 Textos e Labels
Edite diretamente no `index.html` para alterar:
- Títulos das seções
- Labels dos formulários
- Textos explicativos
- Tooltips e ajudas

### 📊 Datasets Suportados
Adicione novos datasets em `assets/js/modules/api.js`:
```javascript
this.mockData = {
    datasets: {
        '17': { /* Breast Cancer */ },
        '123': { /* Novo Dataset */ }
    }
}
```

## 📊 Métricas e Performance

### ⚡ Performance
- **Tempo de carregamento**: < 2s
- **Tempo de treinamento**: 30-60s
- **Responsividade**: < 100ms
- **Tamanho total**: < 5MB

### 📈 Métricas ML
- **Acurácia**: 95.6%
- **Precisão**: 100.0%
- **Recall**: 88.1%
- **F1-Score**: 93.7%
- **AUC-ROC**: 0.94

## 🔐 Segurança e Privacidade

### 🛡️ Medidas Implementadas
- **HTTPS**: Ativado automaticamente pelo Vercel
- **CORS**: Configurado para frontend
- **Validação**: Inputs validados no frontend e backend
- **Sanitização**: Dados limpos antes do processamento
- **Rate Limiting**: Limitado pelo Vercel (30s timeout)

### 🔒 Dados
- **Não persistência**: Dados não são salvos no servidor
- **Processamento local**: ML roda em funções serverless
- **Sem cookies**: Não usa cookies de tracking
- **Código aberto**: Todo código é auditável

## 📞 Suporte e Contato

### 🆘 Problemas Técnicos
1. Verificar logs no Vercel Dashboard
2. Consultar documentação do Vercel
3. Testar localmente primeiro
4. Verificar dependências Python

### 📚 Recursos Úteis
- [Documentação Vercel](https://vercel.com/docs)
- [Chart.js Docs](https://www.chartjs.org/docs/)
- [Scikit-learn Guide](https://scikit-learn.org/stable/)
- [UCI ML Repository](https://archive.ics.uci.edu/ml/)

### 👨‍💻 Desenvolvimento
- **Autor**: Kalleby Evangelho
- **Instituição**: UFN - Universidade Franciscana
- **Disciplina**: IA em Saúde - Engenharia Biomédica
- **Ano**: 2025

---

## 🎉 Conclusão

Este projeto demonstra uma **aplicação completa de Machine Learning** com:

✅ **Interface moderna e responsiva**  
✅ **Backend escalável com Python**  
✅ **Visualizações interativas**  
✅ **Deploy automático no Vercel**  
✅ **Código bem documentado**  
✅ **Fácil manutenção e extensão**  

**Pronto para apresentação acadêmica e uso real! 🚀📊**

---

*Desenvolvido com ❤️ para demonstrar o poder do Machine Learning na área da saúde*
