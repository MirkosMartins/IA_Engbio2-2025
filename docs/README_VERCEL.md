# 🌐 Deploy no Vercel - Árvore de Decisão Câncer de Mama

## 🚀 Como fazer deploy no Vercel

### Método 1: Deploy via Interface Web do Vercel (Recomendado)

1. **Criar conta no Vercel**:
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub, GitLab ou Bitbucket

2. **Upload do projeto**:
   - Clique em "New Project"
   - Escolha "Import Git Repository" ou "Browse All Templates"
   - Faça upload dos arquivos do projeto

3. **Configuração automática**:
   - O Vercel detectará automaticamente que é um projeto estático
   - As configurações do `vercel.json` serão aplicadas automaticamente

4. **Deploy**:
   - Clique em "Deploy"
   - Aguarde o processo de build
   - Seu projeto estará disponível em uma URL como: `https://seu-projeto.vercel.app`

### Método 2: Deploy via CLI

1. **Instalar Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login no Vercel**:
```bash
vercel login
```

3. **Deploy do projeto**:
```bash
# No diretório do projeto
vercel

# Para deploy de produção
vercel --prod
```

### Método 3: Deploy via Git (Recomendado para projetos maiores)

1. **Criar repositório no GitHub**:
```bash
git init
git add .
git commit -m "Initial commit: Árvore de Decisão Câncer de Mama"
git branch -M main
git remote add origin https://github.com/username/arvore-decisao-cancer-mama.git
git push -u origin main
```

2. **Conectar ao Vercel**:
   - No dashboard do Vercel, clique em "New Project"
   - Selecione seu repositório GitHub
   - Configure as opções de build (já configuradas no `vercel.json`)

## ⚙️ Configurações do Projeto

### Arquivos de Configuração

- **`vercel.json`**: Configurações específicas do Vercel
- **`package.json`**: Metadados do projeto
- **`.gitignore`**: Arquivos a serem ignorados pelo Git

### Estrutura para Deploy

```
projeto/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # JavaScript
├── vercel.json             # Configurações Vercel
├── package.json            # Metadados do projeto
├── .gitignore              # Arquivos ignorados
├── 
├── 📸 Imagens (Visualizações)
├── class_distribution.png
├── correlation_heatmap.png
├── decision_tree_visualization.png
├── feature_importance.png
├── confusion_matrix.png
├── evaluation_dashboard.png
├── 
├── 📄 Documentação
├── README.md
├── README_VERCEL.md
├── relatorio_final.md
├── dataset_info.md
├── 
└── 🐍 Scripts Python (para referência)
    ├── load_dataset.py
    ├── prepare_data.py
    ├── build_decision_tree.py
    └── evaluate_model.py
```

## 🎯 Otimizações para Web

### Performance
- **Imagens otimizadas**: Todas as visualizações estão em alta resolução (300 DPI)
- **Cache configurado**: Headers de cache otimizados no `vercel.json`
- **CSS minificado**: Estilos otimizados para performance
- **JavaScript eficiente**: Código otimizado com event delegation

### SEO e Acessibilidade
- **Meta tags**: Configurações adequadas no HTML
- **Alt text**: Todas as imagens possuem descrições
- **Semantic HTML**: Estrutura semântica apropriada
- **Responsive**: Design totalmente responsivo

### Segurança
- **HTTPS**: Ativado automaticamente pelo Vercel
- **Headers de segurança**: Configurados no `vercel.json`

## 🔧 Comandos Úteis

### Desenvolvimento Local
```bash
# Servidor Python simples
python -m http.server 8000

# Acessar: http://localhost:8000
```

### Deploy e Monitoramento
```bash
# Deploy com preview
vercel

# Deploy de produção
vercel --prod

# Ver logs
vercel logs

# Listar deployments
vercel ls
```

## 📊 Recursos do Projeto

### Páginas e Seções
- **Visão Geral**: Objetivos e resumo do projeto
- **Dataset**: Características e visualizações dos dados
- **Modelo**: Parâmetros e visualização da árvore
- **Resultados**: Métricas e matriz de confusão
- **Visualizações**: Gráficos avançados e dashboard
- **Conclusões**: Resultados e recomendações

### Funcionalidades Interativas
- **Navegação suave**: Scroll animado entre seções
- **Hover effects**: Efeitos visuais em cards e imagens
- **Animações**: Entrada progressiva dos elementos
- **Tooltips**: Explicações das métricas
- **Responsive**: Adaptação automática para dispositivos

### Tecnologias Utilizadas
- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, animações
- **JavaScript ES6**: Interatividade
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia

## 🌟 Características do Deploy

### URLs de Exemplo
- **Produção**: `https://arvore-decisao-cancer-mama.vercel.app`
- **Preview**: `https://arvore-decisao-cancer-mama-git-main.vercel.app`

### Domínio Personalizado (Opcional)
1. Comprar domínio (ex: `cancerdetection.com.br`)
2. Adicionar no dashboard do Vercel
3. Configurar DNS conforme instruções

### Analytics (Opcional)
- Vercel Analytics (gratuito)
- Google Analytics
- Hotjar para heatmaps

## 🚨 Troubleshooting

### Problemas Comuns

**1. Imagens não carregam**:
- Verificar se todas as imagens estão no diretório raiz
- Confirmar nomes dos arquivos (case-sensitive)

**2. CSS não aplica**:
- Verificar caminho do arquivo CSS no HTML
- Confirmar se `styles.css` está no diretório correto

**3. JavaScript não funciona**:
- Verificar console do browser para erros
- Confirmar se `script.js` está no diretório correto

**4. Deploy falha**:
- Verificar se `vercel.json` está válido
- Confirmar se todos os arquivos necessários estão presentes

### Logs e Debug
```bash
# Ver logs detalhados
vercel logs --follow

# Debug local
vercel dev
```

## 📞 Suporte

### Documentação Oficial
- [Vercel Docs](https://vercel.com/docs)
- [Static Sites Guide](https://vercel.com/docs/concepts/deployments/static-sites)

### Contato
- **Desenvolvedor**: Kalleby Evangelho
- **Instituição**: UFN - Universidade Franciscana
- **Disciplina**: IA em Saúde - Engenharia Biomédica

---

## 🎉 Pronto para o Deploy!

Após seguir estas instruções, seu projeto estará disponível online e acessível para apresentação acadêmica, compartilhamento com colegas e professores, e demonstração das funcionalidades da árvore de decisão para classificação de câncer de mama.

**Boa sorte com sua apresentação! 🚀📊**
