/**
 * Módulo de Interface do Usuário
 * Gerencia todas as interações e atualizações da UI
 */

class UIManager {
    constructor() {
        this.sections = ['configuration', 'dataset', 'training', 'results', 'visualizations'];
        this.currentSection = 'configuration';
        this.initializeEventListeners();
        this.initializeFormValidation();
        this.initializePreview();
    }

    /**
     * Inicializar event listeners
     */
    initializeEventListeners() {
        // Navegação
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.showSection(targetId);
                this.updateActiveNavLink(link);
            });
        });

        // Slider de treino/teste
        const trainSlider = document.getElementById('trainSize');
        if (trainSlider) {
            trainSlider.addEventListener('input', this.updateTrainTestSplit.bind(this));
        }

        // Botões do formulário
        const loadPresetBtn = document.getElementById('loadPresetBtn');
        if (loadPresetBtn) {
            loadPresetBtn.addEventListener('click', this.loadPresetData.bind(this));
        }

        const configForm = document.getElementById('configForm');
        if (configForm) {
            configForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Atualização da preview em tempo real
        this.setupRealtimePreview();
    }

    /**
     * Mostrar seção específica
     */
    showSection(sectionId) {
        this.sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.style.display = id === sectionId ? 'block' : 'none';
            }
        });
        this.currentSection = sectionId;

        // Scroll para o topo da seção
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Atualizar link ativo na navegação
     */
    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    /**
     * Atualizar divisão treino/teste
     */
    updateTrainTestSplit() {
        const trainSlider = document.getElementById('trainSize');
        const trainValue = document.getElementById('trainValue');
        const testValue = document.getElementById('testValue');
        const previewSplit = document.getElementById('previewSplit');

        if (trainSlider && trainValue && testValue) {
            const train = parseInt(trainSlider.value);
            const test = 100 - train;

            trainValue.textContent = train;
            testValue.textContent = test;
            
            if (previewSplit) {
                previewSplit.textContent = `${train}% / ${test}%`;
            }
        }
    }

    /**
     * Configurar preview em tempo real
     */
    setupRealtimePreview() {
        const inputs = [
            'datasetUrl',
            'criterion',
            'maxDepth',
            'minSamplesSplit',
            'minSamplesLeaf'
        ];

        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', this.updatePreview.bind(this));
                input.addEventListener('change', this.updatePreview.bind(this));
            }
        });
    }

    /**
     * Atualizar preview
     */
    updatePreview() {
        const datasetUrl = document.getElementById('datasetUrl')?.value || 'Não configurado';
        const criterion = document.getElementById('criterion')?.value || 'entropy';
        
        const previewDataset = document.getElementById('previewDataset');
        const previewCriterion = document.getElementById('previewCriterion');

        if (previewDataset) {
            if (datasetUrl === 'Não configurado' || datasetUrl === '') {
                previewDataset.textContent = 'Não configurado';
            } else if (datasetUrl === '17' || datasetUrl.includes('breast') || datasetUrl.includes('cancer')) {
                previewDataset.textContent = 'Breast Cancer Wisconsin';
            } else {
                previewDataset.textContent = 'Dataset Personalizado';
            }
        }

        if (previewCriterion) {
            previewCriterion.textContent = criterion.charAt(0).toUpperCase() + criterion.slice(1);
        }
    }

    /**
     * Inicializar validação do formulário
     */
    initializeFormValidation() {
        const datasetUrl = document.getElementById('datasetUrl');
        if (datasetUrl) {
            datasetUrl.addEventListener('blur', this.validateDatasetUrl.bind(this));
        }
    }

    /**
     * Validar URL do dataset
     */
    validateDatasetUrl() {
        const input = document.getElementById('datasetUrl');
        if (!input) return;

        const value = input.value.trim();
        
        // Remover classes de validação anteriores
        input.classList.remove('error', 'success');
        
        // Remover mensagens de erro anteriores
        const existingError = input.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        if (value === '') {
            return; // Campo vazio é válido
        }

        // Validar se é um número (UCI ID) ou URL válida
        const isUCIId = /^\d+$/.test(value);
        const isValidUrl = this.isValidUrl(value);

        if (!isUCIId && !isValidUrl) {
            input.classList.add('error');
            this.showFieldError(input, 'Digite um ID do UCI (ex: 17) ou uma URL válida');
        } else {
            input.classList.add('success');
        }
    }

    /**
     * Verificar se é uma URL válida
     */
    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    /**
     * Mostrar erro no campo
     */
    showFieldError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    /**
     * Carregar dados de exemplo
     */
    loadPresetData() {
        const form = document.getElementById('configForm');
        if (!form) return;

        // Preencher com dados do exemplo Breast Cancer
        document.getElementById('datasetUrl').value = '17';
        document.getElementById('trainSize').value = '80';
        document.getElementById('maxDepth').value = '7';
        document.getElementById('criterion').value = 'entropy';
        document.getElementById('minSamplesSplit').value = '5';
        document.getElementById('minSamplesLeaf').value = '2';

        this.updateTrainTestSplit();
        this.updatePreview();
        this.validateDatasetUrl();

        this.showToast('Dados de exemplo carregados com sucesso!', 'success');
    }

    /**
     * Lidar com submissão do formulário
     */
    async handleFormSubmit(e) {
        e.preventDefault();

        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            this.showToast('Por favor, corrija os erros no formulário', 'error');
            return;
        }

        try {
            this.showLoading(true);
            await this.processModel(formData);
        } catch (error) {
            console.error('Erro ao processar modelo:', error);
            this.showToast('Erro ao processar o modelo. Tente novamente.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Obter dados do formulário
     */
    getFormData() {
        return {
            datasetUrl: document.getElementById('datasetUrl')?.value || '',
            trainSize: parseInt(document.getElementById('trainSize')?.value || '80'),
            maxDepth: document.getElementById('maxDepth')?.value || '7',
            criterion: document.getElementById('criterion')?.value || 'entropy',
            minSamplesSplit: parseInt(document.getElementById('minSamplesSplit')?.value || '5'),
            minSamplesLeaf: parseInt(document.getElementById('minSamplesLeaf')?.value || '2')
        };
    }

    /**
     * Validar formulário
     */
    validateForm(formData) {
        let isValid = true;

        // Validar URL do dataset
        if (!formData.datasetUrl) {
            this.markFieldInvalid('datasetUrl', 'URL do dataset é obrigatória');
            isValid = false;
        }

        // Validar percentual de treino
        if (formData.trainSize < 60 || formData.trainSize > 90) {
            this.markFieldInvalid('trainSize', 'Percentual deve estar entre 60% e 90%');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Marcar campo como inválido
     */
    markFieldInvalid(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.add('error');
            this.showFieldError(field, message);
        }
    }

    /**
     * Processar modelo
     */
    async processModel(formData) {
        // Mostrar seção de treinamento
        this.showSection('training');
        this.updateActiveNavLink(document.querySelector('a[href="#training"]'));

        // Simular processo de treinamento
        await this.simulateTraining(formData);

        // Mostrar resultados
        this.showSection('results');
        this.updateActiveNavLink(document.querySelector('a[href="#results"]'));
    }

    /**
     * Simular processo de treinamento
     */
    async simulateTraining(formData) {
        const steps = [
            { id: 'step1', name: 'Carregando Dataset', duration: 2000 },
            { id: 'step2', name: 'Preparando Dados', duration: 1500 },
            { id: 'step3', name: 'Treinando Modelo', duration: 3000 },
            { id: 'step4', name: 'Avaliando Performance', duration: 1500 }
        ];

        const progressFill = document.getElementById('progressFill');
        const trainingStatus = document.getElementById('trainingStatus');
        
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            const stepElement = document.getElementById(step.id);
            
            // Atualizar status
            if (trainingStatus) {
                trainingStatus.textContent = step.name;
                trainingStatus.className = 'progress-status active';
            }

            // Ativar step
            if (stepElement) {
                stepElement.classList.add('active');
            }

            // Atualizar progress bar
            if (progressFill) {
                progressFill.style.width = `${((i + 1) / steps.length) * 100}%`;
            }

            // Adicionar log
            this.addLog(step.name, 'info');

            // Aguardar
            await this.delay(step.duration);

            // Completar step
            if (stepElement) {
                stepElement.classList.remove('active');
                stepElement.classList.add('completed');
            }

            this.addLog(`${step.name} - Concluído`, 'success');
        }

        // Finalizar
        if (trainingStatus) {
            trainingStatus.textContent = 'Concluído';
            trainingStatus.className = 'progress-status success';
        }

        // Atualizar métricas simuladas
        this.updateMetrics();
    }

    /**
     * Adicionar log
     */
    addLog(message, type = 'info') {
        const logsContainer = document.getElementById('trainingLogs');
        if (!logsContainer) return;

        const timestamp = new Date().toLocaleTimeString('pt-BR');
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;

        logsContainer.appendChild(logEntry);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }

    /**
     * Atualizar métricas simuladas
     */
    updateMetrics() {
        const metrics = {
            accuracy: '95.6%',
            precision: '100.0%',
            recall: '88.1%',
            f1: '93.7%',
            sensitivity: '88.1%',
            specificity: '100.0%',
            ppv: '100.0%',
            npv: '93.5%'
        };

        Object.entries(metrics).forEach(([key, value]) => {
            const element = document.getElementById(`${key}Value`);
            if (element) {
                this.animateCounter(element, value);
            }
        });

        // Atualizar estatísticas do dataset
        this.updateDatasetStats();
    }

    /**
     * Atualizar estatísticas do dataset
     */
    updateDatasetStats() {
        const stats = {
            totalSamples: '569',
            totalFeatures: '30',
            benignSamples: '357',
            malignantSamples: '212'
        };

        Object.entries(stats).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element) {
                this.animateCounter(element, value);
            }
        });
    }

    /**
     * Animar contador
     */
    animateCounter(element, targetValue) {
        const numericTarget = parseInt(targetValue.replace(/[^\d]/g, ''));
        const suffix = targetValue.replace(/[\d]/g, '');
        let current = 0;
        const increment = Math.ceil(numericTarget / 50);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                element.textContent = targetValue;
                clearInterval(timer);
            } else {
                element.textContent = current + suffix;
            }
        }, 30);
    }

    /**
     * Mostrar/ocultar loading
     */
    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = show ? 'flex' : 'none';
        }
    }

    /**
     * Mostrar toast notification
     */
    showToast(message, type = 'info', duration = 5000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        container.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    /**
     * Obter ícone do toast
     */
    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    /**
     * Delay helper
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Exportar para uso global
window.UIManager = UIManager;
