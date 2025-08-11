// Navegação suave e interatividade
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegação suave para links internos
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fixa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Destacar link ativo na navegação
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Atualizar link ativo no scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Animação de entrada para cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.overview-card, .metrics-card, .viz-card, .conclusion-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Efeito de hover para imagens
    const images = document.querySelectorAll('.dataset-image, .tree-image, .viz-image, .confusion-matrix-image');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Contador animado para estatísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        });
    }
    
    // Observar seção de dataset para iniciar animação dos contadores
    const datasetSection = document.querySelector('#dataset');
    if (datasetSection) {
        const datasetObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    datasetObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        datasetObserver.observe(datasetSection);
    }
    
    // Tooltip para métricas
    const metricItems = document.querySelectorAll('.metric-item');
    
    const tooltips = {
        'Acurácia': 'Proporção de predições corretas em relação ao total de predições',
        'Precisão': 'Proporção de verdadeiros positivos em relação a todos os positivos preditos',
        'Recall': 'Proporção de verdadeiros positivos em relação a todos os positivos reais',
        'F1-Score': 'Média harmônica entre precisão e recall',
        'Sensibilidade': 'Capacidade de detectar corretamente casos malignos',
        'Especificidade': 'Capacidade de detectar corretamente casos benignos',
        'PPV': 'Valor Preditivo Positivo - probabilidade de um resultado positivo ser verdadeiro',
        'NPV': 'Valor Preditivo Negativo - probabilidade de um resultado negativo ser verdadeiro'
    };
    
    metricItems.forEach(item => {
        const label = item.querySelector('.metric-label').textContent;
        if (tooltips[label]) {
            item.setAttribute('title', tooltips[label]);
            item.style.cursor = 'help';
        }
    });
    
    // Botão de voltar ao topo (se necessário)
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Mostrar/esconder botão de voltar ao topo
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidade do botão de voltar ao topo
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('🎉 Landing page carregada com sucesso!');
    console.log('📊 Projeto: Árvore de Decisão para Classificação de Câncer de Mama');
    console.log('👨‍🎓 Autor: Kalleby Evangelho');
});

