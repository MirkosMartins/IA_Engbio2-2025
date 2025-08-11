/**
 * Script Principal da Aplicação
 * ML Cancer Detection - Aplicação Interativa
 */

// Instâncias globais dos gerenciadores
let uiManager;
let apiManager;
let chartsManager;

/**
 * Inicialização da aplicação
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando ML Cancer Detection App...');
    
    // Verificar dependências
    if (typeof Chart === 'undefined') {
        console.warn('⚠️ Chart.js não carregado - gráficos podem não funcionar');
    }
    
    if (typeof d3 === 'undefined') {
        console.warn('⚠️ D3.js não carregado - visualização da árvore pode não funcionar');
    }

    // Inicializar gerenciadores
    initializeManagers();
    
    // Configurar event listeners globais
    setupGlobalEventListeners();
    
    // Configurar formulário
    setupFormEnhancements();
    
    // Inicializar tooltips e ajuda
    initializeHelpSystem();
    
    // Configurar tema
    initializeTheme();
    
    console.log('✅ Aplicação inicializada com sucesso!');
});

/**
 * Inicializar gerenciadores
 */
function initializeManagers() {
    try {
        // UI Manager
        uiManager = new UIManager();
        console.log('✅ UI Manager inicializado');
        
        // API Manager
        apiManager = new APIManager();
        console.log('✅ API Manager inicializado');
        
        // Charts Manager
        chartsManager = new ChartsManager();
        console.log('✅ Charts Manager inicializado');
        
        // Conectar gerenciadores
        connectManagers();
        
    } catch (error) {
        console.error('❌ Erro ao inicializar gerenciadores:', error);
        showErrorMessage('Erro ao inicializar aplicação. Recarregue a página.');
    }
}

/**
 * Conectar gerenciadores
 */
function connectManagers() {
    // Sobrescrever método de processamento do modelo no UI Manager
    if (uiManager) {
        uiManager.processModel = async function(formData) {
            try {
                // Mostrar seção de treinamento
                this.showSection('training');
                this.updateActiveNavLink(document.querySelector('a[href="#training"]'));
                
                // Resetar API Manager
                apiManager.reset();
                
                // Processar pipeline completo
                const results = await apiManager.processFullPipeline(formData);
                
                if (apiManager.isCancelled()) {
                    throw new Error('Operação cancelada');
                }
                
                // Gerar visualizações
                const visualizations = await apiManager.generateVisualizations(results);
                
                // Atualizar UI com resultados
                updateUIWithResults(results, visualizations);
                
                // Mostrar seção de resultados
                this.showSection('results');
                this.updateActiveNavLink(document.querySelector('a[href="#results"]'));
                
                // Atualizar gráficos
                updateCharts(visualizations);
                
            } catch (error) {
                console.error('Erro no processamento:', error);
                this.addLog(`Erro: ${error.message}`, 'error');
                throw error;
            }
        };
    }
    
    // Conectar logs da API com UI
    window.addEventListener('apiLog', function(event) {
        if (uiManager && uiManager.addLog) {
            uiManager.addLog(event.detail.message, event.detail.type);
        }
    });
}

/**
 * Atualizar UI com resultados
 */
function updateUIWithResults(results, visualizations) {
    // Atualizar métricas
    updateMetricsDisplay(results.results.metrics);
    
    // Atualizar estatísticas do dataset
    updateDatasetStats(results.dataset);
    
    // Mostrar seção do dataset se ainda não foi mostrada
    const datasetSection = document.getElementById('dataset');
    if (datasetSection) {
        datasetSection.style.display = 'block';
    }
}

/**
 * Atualizar exibição das métricas
 */
function updateMetricsDisplay(metrics) {
    const metricElements = {
        'accuracyValue': metrics.accuracy + '%',
        'precisionValue': metrics.precision + '%',
        'recallValue': metrics.recall + '%',
        'f1Value': metrics.f1Score + '%',
        'sensitivityValue': metrics.sensitivity + '%',
        'specificityValue': metrics.specificity + '%',
        'ppvValue': metrics.ppv + '%',
        'npvValue': metrics.npv + '%'
    };
    
    Object.entries(metricElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element && uiManager) {
            uiManager.animateCounter(element, value);
        }
    });
}

/**
 * Atualizar estatísticas do dataset
 */
function updateDatasetStats(dataset) {
    const stats = {
        'totalSamples': dataset.samples.toString(),
        'totalFeatures': dataset.features.toString(),
        'benignSamples': dataset.classes.benign ? dataset.classes.benign.toString() : '0',
        'malignantSamples': dataset.classes.malignant ? dataset.classes.malignant.toString() : '0'
    };
    
    Object.entries(stats).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element && uiManager) {
            uiManager.animateCounter(element, value);
        }
    });
}

/**
 * Atualizar gráficos
 */
function updateCharts(visualizations) {
    if (!chartsManager) return;
    
    try {
        // Atualizar distribuição de classes
        if (visualizations.classDistribution) {
            const benign = visualizations.classDistribution.benign || 0;
            const malignant = visualizations.classDistribution.malignant || 0;
            chartsManager.updateClassDistribution(benign, malignant);
        }
        
        // Atualizar matriz de confusão
        if (visualizations.confusionMatrix) {
            chartsManager.updateConfusionMatrix(visualizations.confusionMatrix);
        }
        
        // Atualizar importância das features
        if (visualizations.featureImportance) {
            chartsManager.updateFeatureImportance(
                visualizations.featureImportance.features,
                visualizations.featureImportance.importance
            );
        }
        
        // Atualizar curva ROC
        if (visualizations.rocCurve) {
            chartsManager.updateROCCurve(visualizations.rocCurve, 0.94);
        }
        
        // Criar visualização da árvore
        if (visualizations.decisionTree) {
            chartsManager.createDecisionTreeVisualization();
        }
        
        // Mostrar seção de visualizações
        const vizSection = document.getElementById('visualizations');
        if (vizSection) {
            vizSection.style.display = 'block';
        }
        
    } catch (error) {
        console.error('Erro ao atualizar gráficos:', error);
    }
}

/**
 * Configurar event listeners globais
 */
function setupGlobalEventListeners() {
    // Redimensionamento da janela
    window.addEventListener('resize', debounce(function() {
        if (chartsManager) {
            chartsManager.resizeCharts();
        }
    }, 250));
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        // ESC para cancelar operações
        if (e.key === 'Escape') {
            if (apiManager) {
                apiManager.cancel();
            }
        }
        
        // F5 para recarregar dados
        if (e.key === 'F5' && e.ctrlKey) {
            e.preventDefault();
            if (uiManager) {
                uiManager.loadPresetData();
            }
        }
    });
    
    // Scroll spy para navegação
    setupScrollSpy();
}

/**
 * Configurar scroll spy
 */
function setupScrollSpy() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
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
    
    window.addEventListener('scroll', throttle(updateActiveLink, 100));
}

/**
 * Configurar melhorias do formulário
 */
function setupFormEnhancements() {
    // Validação em tempo real
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidationErrors);
    });
    
    // Auto-save do formulário
    setupFormAutoSave();
    
    // Atalhos de teclado
    setupKeyboardShortcuts();
}

/**
 * Validar campo individual
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remover validações anteriores
    field.classList.remove('error', 'success');
    clearFieldErrors(field);
    
    // Validar baseado no tipo
    switch (field.id) {
        case 'datasetUrl':
            validateDatasetUrlField(field, value);
            break;
        case 'trainSize':
            validateTrainSizeField(field, value);
            break;
        case 'minSamplesSplit':
        case 'minSamplesLeaf':
            validateNumericField(field, value);
            break;
    }
}

/**
 * Validar campo URL do dataset
 */
function validateDatasetUrlField(field, value) {
    if (!value) return; // Campo opcional inicialmente
    
    const isUCIId = /^\d+$/.test(value);
    const isValidUrl = isValidURL(value);
    
    if (!isUCIId && !isValidUrl) {
        showFieldError(field, 'Digite um ID do UCI (ex: 17) ou uma URL válida');
    } else {
        field.classList.add('success');
    }
}

/**
 * Validar campo de tamanho do treino
 */
function validateTrainSizeField(field, value) {
    const num = parseInt(value);
    if (num < 60 || num > 90) {
        showFieldError(field, 'Valor deve estar entre 60% e 90%');
    } else {
        field.classList.add('success');
    }
}

/**
 * Validar campo numérico
 */
function validateNumericField(field, value) {
    const num = parseInt(value);
    if (isNaN(num) || num < 1) {
        showFieldError(field, 'Digite um número válido maior que 0');
    } else {
        field.classList.add('success');
    }
}

/**
 * Limpar erros de validação
 */
function clearValidationErrors(event) {
    const field = event.target;
    if (field.classList.contains('error')) {
        field.classList.remove('error');
        clearFieldErrors(field);
    }
}

/**
 * Mostrar erro no campo
 */
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

/**
 * Limpar erros do campo
 */
function clearFieldErrors(field) {
    const errors = field.parentNode.querySelectorAll('.form-error');
    errors.forEach(error => error.remove());
}

/**
 * Configurar auto-save do formulário
 */
function setupFormAutoSave() {
    const form = document.getElementById('configForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('change', saveFormData);
    });
    
    // Carregar dados salvos
    loadFormData();
}

/**
 * Salvar dados do formulário
 */
function saveFormData() {
    const formData = {};
    const form = document.getElementById('configForm');
    
    if (form) {
        const formDataObj = new FormData(form);
        for (let [key, value] of formDataObj.entries()) {
            formData[key] = value;
        }
        
        localStorage.setItem('mlCancerDetection_formData', JSON.stringify(formData));
    }
}

/**
 * Carregar dados do formulário
 */
function loadFormData() {
    try {
        const savedData = localStorage.getItem('mlCancerDetection_formData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            Object.entries(formData).forEach(([key, value]) => {
                const field = document.getElementById(key);
                if (field) {
                    field.value = value;
                    
                    // Disparar evento de mudança
                    field.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        }
    } catch (error) {
        console.warn('Erro ao carregar dados salvos:', error);
    }
}

/**
 * Configurar atalhos de teclado
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + Enter para treinar modelo
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            const trainBtn = document.getElementById('trainModelBtn');
            if (trainBtn && !trainBtn.disabled) {
                trainBtn.click();
            }
        }
        
        // Ctrl + L para carregar exemplo
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            const presetBtn = document.getElementById('loadPresetBtn');
            if (presetBtn) {
                presetBtn.click();
            }
        }
    });
}

/**
 * Inicializar sistema de ajuda
 */
function initializeHelpSystem() {
    // Tooltips para campos do formulário
    const tooltips = {
        'datasetUrl': 'Digite um ID do UCI ML Repository (ex: 17) ou URL de um arquivo CSV',
        'trainSize': 'Percentual dos dados usado para treinar o modelo',
        'maxDepth': 'Profundidade máxima da árvore de decisão',
        'criterion': 'Função usada para medir a qualidade das divisões',
        'minSamplesSplit': 'Número mínimo de amostras necessárias para dividir um nó',
        'minSamplesLeaf': 'Número mínimo de amostras necessárias em um nó folha'
    };
    
    Object.entries(tooltips).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute('title', text);
        }
    });
}

/**
 * Inicializar tema
 */
function initializeTheme() {
    // Detectar preferência de tema do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Aplicar tema salvo ou padrão
    const savedTheme = localStorage.getItem('mlCancerDetection_theme') || (prefersDark ? 'dark' : 'light');
    applyTheme(savedTheme);
}

/**
 * Aplicar tema
 */
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('mlCancerDetection_theme', theme);
}

/**
 * Mostrar mensagem de erro
 */
function showErrorMessage(message) {
    if (uiManager && uiManager.showToast) {
        uiManager.showToast(message, 'error');
    } else {
        alert(message);
    }
}

/**
 * Verificar se é URL válida
 */
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Exportar funções para debug
window.debugApp = {
    uiManager: () => uiManager,
    apiManager: () => apiManager,
    chartsManager: () => chartsManager,
    saveFormData,
    loadFormData,
    updateCharts,
    applyTheme
};

console.log('📊 ML Cancer Detection App carregada!');
console.log('🔧 Use window.debugApp para debug');