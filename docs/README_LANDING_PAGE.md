# Landing Page - Árvore de Decisão para Câncer de Mama

## 🌐 Sobre a Landing Page

Esta landing page apresenta de forma interativa e visualmente atrativa todos os resultados do projeto de classificação de câncer de mama usando árvore de decisão.

## 📁 Arquivos da Landing Page

- `index.html` - Estrutura HTML principal
- `styles.css` - Estilos CSS responsivos
- `script.js` - JavaScript para interatividade
- Imagens PNG - Visualizações e gráficos

## 🎨 Características do Design

### Responsividade
- **Desktop**: Layout em grid com múltiplas colunas
- **Tablet**: Adaptação automática para telas médias
- **Mobile**: Layout em coluna única otimizado para touch

### Seções Principais

1. **Header**: Título do projeto, disciplina e autor
2. **Navegação**: Menu fixo com scroll suave
3. **Visão Geral**: Cards com objetivos, dataset e performance
4. **Dataset**: Estatísticas e visualizações dos dados
5. **Modelo**: Parâmetros e visualização da árvore
6. **Resultados**: Métricas e matriz de confusão
7. **Visualizações**: Gráficos de importância e dashboard
8. **Conclusões**: Resumo e recomendações
9. **Footer**: Informações do autor

### Funcionalidades Interativas

- **Navegação Suave**: Scroll animado entre seções
- **Hover Effects**: Efeitos visuais em cards e imagens
- **Animações**: Entrada progressiva dos elementos
- **Contadores Animados**: Estatísticas com animação
- **Botão Voltar ao Topo**: Aparece automaticamente
- **Tooltips**: Explicações das métricas

## 🚀 Como Usar

### Método 1: Abrir Diretamente
```bash
# Simplesmente abra o arquivo index.html em qualquer navegador
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Método 2: Servidor Local (Opcional)
```bash
# Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

## 🎨 Paleta de Cores

- **Primária**: Gradiente roxo-azul (#667eea → #764ba2)
- **Secundária**: Azul escuro (#2c3e50)
- **Acentos**: Cores suaves para cards (lightblue, lightcoral, etc.)
- **Fundo**: Branco (#ffffff) e cinza claro (#f8f9fa)

## 📱 Breakpoints Responsivos

```css
/* Desktop */
@media (min-width: 769px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Mobile */
@media (max-width: 480px) { ... }
```

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Grid, Flexbox, animações, gradientes
- **JavaScript ES6**: Interatividade e animações
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia Inter

## 📊 Visualizações Incluídas

1. **class_distribution.png**: Distribuição das classes
2. **correlation_heatmap.png**: Mapa de correlação
3. **decision_tree_visualization.png**: Árvore de decisão
4. **feature_importance.png**: Importância das features
5. **confusion_matrix.png**: Matriz de confusão
6. **evaluation_dashboard.png**: Dashboard completo

## 🎯 Seções Detalhadas

### Visão Geral
- Cards com ícones representando objetivo, dataset e performance
- Animação de entrada escalonada
- Hover effects com elevação

### Dataset
- Estatísticas em cards numerados
- Gráficos lado a lado
- Contadores animados

### Modelo
- Layout em duas colunas
- Parâmetros em lista estilizada
- Visualização da árvore em destaque

### Resultados
- Métricas em cards organizados
- Matriz de confusão com explicação
- Cores diferenciadas para tipos de métricas

### Visualizações
- Grid responsivo para gráficos
- Descrições contextuais
- Zoom suave no hover

### Conclusões
- Cards com ícones temáticos
- Lista de recomendações estilizada
- Layout em grid adaptativo

## 🔍 Funcionalidades JavaScript

### Navegação
```javascript
// Scroll suave para seções
navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});
```

### Animações
```javascript
// Intersection Observer para animações de entrada
const observer = new IntersectionObserver(animateOnScroll);
```

### Contadores
```javascript
// Animação dos números estatísticos
function animateCounters() { ... }
```

### Interatividade
```javascript
// Hover effects para imagens
images.forEach(img => {
    img.addEventListener('mouseenter', scaleUp);
});
```

## 📐 Estrutura CSS

### Layout Principal
- Container centralizado (max-width: 1200px)
- Padding responsivo
- Grid e Flexbox para layouts

### Componentes
- Cards com sombras e bordas arredondadas
- Botões com gradientes
- Seções alternadas (branco/cinza claro)

### Animações
- Transições suaves (0.3s ease)
- Transformações CSS3
- Keyframes para animações complexas

## 🌟 Destaques Visuais

- **Gradientes**: Header e botões com gradientes modernos
- **Sombras**: Cards com sombras sutis para profundidade
- **Tipografia**: Hierarquia clara com fonte Inter
- **Espaçamento**: Uso consistente de padding e margin
- **Cores**: Paleta harmoniosa e profissional

## 🔧 Customização

### Cores
Edite as variáveis CSS no início do arquivo `styles.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --text-color: #333;
    --bg-light: #f8f9fa;
}
```

### Conteúdo
Modifique o HTML em `index.html` mantendo a estrutura de classes CSS.

### Funcionalidades
Adicione novas interações em `script.js` seguindo os padrões existentes.

## 📱 Compatibilidade

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile**: iOS Safari 12+, Chrome Mobile 60+

## 🚀 Performance

- **Imagens**: Otimizadas para web
- **CSS**: Minificado e otimizado
- **JavaScript**: Código eficiente com event delegation
- **Fonts**: Carregamento otimizado do Google Fonts

## 📝 Manutenção

Para atualizar a landing page:
1. Substitua as imagens PNG por novas versões
2. Atualize os dados numéricos no HTML
3. Modifique o CSS para ajustes visuais
4. Teste em diferentes dispositivos e navegadores

---

**Desenvolvido com ❤️ para apresentação acadêmica**  
**Kalleby Evangelho - UFN 2025**

