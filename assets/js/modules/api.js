/**
 * Módulo de API
 * Gerencia comunicação com backend e processamento de dados
 */

class APIManager {
    constructor() {
        this.baseURL = '/api';
        this.isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        this.setupMockData();
    }

    /**
     * Configurar dados mock para demonstração
     */
    setupMockData() {
        this.mockData = {
            datasets: {
                '17': {
                    name: 'Breast Cancer Wisconsin (Diagnostic)',
                    samples: 569,
                    features: 30,
                    classes: {
                        benign: 357,
                        malignant: 212
                    },
                    description: 'Dataset de câncer de mama do UCI ML Repository'
                }
            },
            results: {
                metrics: {
                    accuracy: 95.6,
                    precision: 100.0,
                    recall: 88.1,
                    f1Score: 93.7,
                    sensitivity: 88.1,
                    specificity: 100.0,
                    ppv: 100.0,
                    npv: 93.5,
                    auc: 0.94
                },
                confusionMatrix: [[72, 0], [5, 37]],
                featureImportance: {
                    features: ['perimeter3', 'concave_points3', 'concave_points1', 'texture3', 'area2'],
                    importance: [64.64, 11.46, 8.51, 6.71, 4.61]
                },
                rocCurve: [
                    {fpr: 0.0, tpr: 0.0},
                    {fpr: 0.0, tpr: 0.12},
                    {fpr: 0.0, tpr: 0.88},
                    {fpr: 1.0, tpr: 1.0}
                ]
            }
        };
    }

    /**
     * Validar URL do dataset
     */
    async validateDatasetURL(url) {
        try {
            // Se for um ID do UCI
            if (/^\d+$/.test(url)) {
                return this.validateUCIDataset(url);
            }

            // Se for uma URL
            if (this.isValidURL(url)) {
                return this.validateCustomDataset(url);
            }

            throw new Error('URL inválida');
        } catch (error) {
            console.error('Erro ao validar dataset:', error);
            throw error;
        }
    }

    /**
     * Validar dataset UCI
     */
    async validateUCIDataset(id) {
        await this.delay(500); // Simular requisição

        if (this.mockData.datasets[id]) {
            return {
                valid: true,
                data: this.mockData.datasets[id]
            };
        }

        throw new Error(`Dataset UCI ${id} não encontrado`);
    }

    /**
     * Validar dataset personalizado
     */
    async validateCustomDataset(url) {
        await this.delay(1000); // Simular requisição

        // Simulação de validação
        return {
            valid: true,
            data: {
                name: 'Dataset Personalizado',
                samples: 1000,
                features: 25,
                classes: {
                    class0: 600,
                    class1: 400
                },
                description: 'Dataset carregado de URL personalizada'
            }
        };
    }

    /**
     * Carregar e processar dataset
     */
    async loadDataset(config) {
        try {
            this.log('Iniciando carregamento do dataset...', 'info');
            
            // Simular processamento
            await this.delay(2000);
            
            const validation = await this.validateDatasetURL(config.datasetUrl);
            
            if (!validation.valid) {
                throw new Error('Dataset inválido');
            }

            this.log('Dataset carregado com sucesso', 'success');
            return validation.data;

        } catch (error) {
            this.log(`Erro ao carregar dataset: ${error.message}`, 'error');
            throw error;
        }
    }

    /**
     * Preparar dados para treinamento
     */
    async prepareData(datasetInfo, config) {
        try {
            this.log('Preparando dados para treinamento...', 'info');
            
            // Simular preparação
            await this.delay(1500);
            
            const trainSamples = Math.floor(datasetInfo.samples * (config.trainSize / 100));
            const testSamples = datasetInfo.samples - trainSamples;
            
            const result = {
                trainSamples,
                testSamples,
                features: datasetInfo.features,
                trainDistribution: {
                    class0: Math.floor(trainSamples * 0.63),
                    class1: Math.floor(trainSamples * 0.37)
                },
                testDistribution: {
                    class0: Math.floor(testSamples * 0.63),
                    class1: Math.floor(testSamples * 0.37)
                }
            };
            
            this.log('Dados preparados com sucesso', 'success');
            return result;

        } catch (error) {
            this.log(`Erro ao preparar dados: ${error.message}`, 'error');
            throw error;
        }
    }

    /**
     * Treinar modelo
     */
    async trainModel(dataInfo, config) {
        try {
            this.log('Iniciando treinamento do modelo...', 'info');
            
            // Simular treinamento
            await this.delay(3000);
            
            // Simular otimização de hiperparâmetros
            this.log('Otimizando hiperparâmetros...', 'info');
            await this.delay(1000);
            
            // Simular validação cruzada
            this.log('Realizando validação cruzada...', 'info');
            await this.delay(1000);
            
            const model = {
                algorithm: 'Decision Tree',
                parameters: {
                    criterion: config.criterion,
                    maxDepth: config.maxDepth === 'None' ? null : parseInt(config.maxDepth),
                    minSamplesSplit: config.minSamplesSplit,
                    minSamplesLeaf: config.minSamplesLeaf
                },
                crossValidationScore: 94.7,
                trainingTime: '2.3s'
            };
            
            this.log('Modelo treinado com sucesso', 'success');
            return model;

        } catch (error) {
            this.log(`Erro ao treinar modelo: ${error.message}`, 'error');
            throw error;
        }
    }

    /**
     * Avaliar modelo
     */
    async evaluateModel(model) {
        try {
            this.log('Avaliando performance do modelo...', 'info');
            
            // Simular avaliação
            await this.delay(1500);
            
            // Retornar resultados mock
            const results = {
                ...this.mockData.results,
                model: model,
                evaluationTime: '1.2s',
                timestamp: new Date().toISOString()
            };
            
            this.log('Avaliação concluída com sucesso', 'success');
            return results;

        } catch (error) {
            this.log(`Erro ao avaliar modelo: ${error.message}`, 'error');
            throw error;
        }
    }

    /**
     * Processar pipeline completo
     */
    async processFullPipeline(config) {
        try {
            // Usar API real se disponível, senão usar mock
            if (this.isProductionEnvironment()) {
                return await this.processWithRealAPI(config);
            } else {
                return await this.processWithMockData(config);
            }

        } catch (error) {
            this.log(`Erro no pipeline: ${error.message}`, 'error');
            throw error;
        }
    }

    /**
     * Verificar se está em ambiente de produção
     */
    isProductionEnvironment() {
        return !this.isLocal && window.location.hostname.includes('vercel.app');
    }

    /**
     * Processar com API real
     */
    async processWithRealAPI(config) {
        try {
            this.log('Conectando com API do servidor...', 'info');
            
            const response = await fetch('/api/train', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(config)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro na API');
            }

            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Erro no processamento');
            }

            this.log('Processamento concluído com sucesso', 'success');
            return this.formatAPIResponse(result);

        } catch (error) {
            this.log(`Erro na API: ${error.message}`, 'error');
            
            // Fallback para dados mock se API falhar
            this.log('Usando dados de demonstração...', 'warning');
            return await this.processWithMockData(config);
        }
    }

    /**
     * Processar com dados mock
     */
    async processWithMockData(config) {
        // 1. Carregar dataset
        const datasetInfo = await this.loadDataset(config);
        
        // 2. Preparar dados
        const dataInfo = await this.prepareData(datasetInfo, config);
        
        // 3. Treinar modelo
        const model = await this.trainModel(dataInfo, config);
        
        // 4. Avaliar modelo
        const results = await this.evaluateModel(model);
        
        return {
            dataset: datasetInfo,
            data: dataInfo,
            model: model,
            results: results
        };
    }

    /**
     * Formatar resposta da API
     */
    formatAPIResponse(apiResult) {
        return {
            dataset: apiResult.dataset,
            data: {
                trainSamples: Math.floor(apiResult.dataset.samples * 0.8),
                testSamples: Math.floor(apiResult.dataset.samples * 0.2),
                features: apiResult.dataset.features
            },
            model: apiResult.model_info,
            results: apiResult.results
        };
    }

    /**
     * Gerar visualizações
     */
    async generateVisualizations(results) {
        try {
            this.log('Gerando visualizações...', 'info');
            
            // Simular geração
            await this.delay(1000);
            
            const visualizations = {
                classDistribution: results.dataset.classes,
                confusionMatrix: results.results.confusionMatrix,
                featureImportance: results.results.featureImportance,
                rocCurve: results.results.rocCurve,
                decisionTree: this.generateDecisionTreeData()
            };
            
            this.log('Visualizações geradas com sucesso', 'success');
            return visualizations;

        } catch (error) {
            this.log(`Erro ao gerar visualizações: ${error.message}`, 'error');
            throw error;
        }
    }

    /**
     * Gerar dados da árvore de decisão
     */
    generateDecisionTreeData() {
        return {
            name: "perimeter3 ≤ 106.1",
            gini: 0.468,
            samples: 569,
            value: [357, 212],
            children: [
                {
                    name: "Benigno",
                    gini: 0.0,
                    samples: 357,
                    value: [357, 0],
                    type: "leaf",
                    class: "benign"
                },
                {
                    name: "concave_points3 ≤ 0.135",
                    gini: 0.394,
                    samples: 212,
                    value: [0, 212],
                    children: [
                        {
                            name: "texture3 ≤ 25.62",
                            gini: 0.444,
                            samples: 45,
                            value: [0, 45]
                        },
                        {
                            name: "Maligno",
                            gini: 0.0,
                            samples: 167,
                            value: [0, 167],
                            type: "leaf",
                            class: "malignant"
                        }
                    ]
                }
            ]
        };
    }

    /**
     * Fazer download dos resultados
     */
    async downloadResults(results, format = 'json') {
        try {
            let data, filename, mimeType;

            switch (format) {
                case 'json':
                    data = JSON.stringify(results, null, 2);
                    filename = 'resultados_modelo.json';
                    mimeType = 'application/json';
                    break;
                
                case 'csv':
                    data = this.convertToCSV(results.results.metrics);
                    filename = 'metricas_modelo.csv';
                    mimeType = 'text/csv';
                    break;
                
                default:
                    throw new Error('Formato não suportado');
            }

            // Criar e fazer download do arquivo
            const blob = new Blob([data], { type: mimeType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            this.log(`Download realizado: ${filename}`, 'success');

        } catch (error) {
            this.log(`Erro no download: ${error.message}`, 'error');
            throw error;
        }
    }

    /**
     * Converter dados para CSV
     */
    convertToCSV(data) {
        const headers = Object.keys(data);
        const values = Object.values(data);
        
        let csv = headers.join(',') + '\n';
        csv += values.join(',') + '\n';
        
        return csv;
    }

    /**
     * Verificar se é URL válida
     */
    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    /**
     * Fazer log (integração com UI)
     */
    log(message, type = 'info') {
        console.log(`[API] ${message}`);
        
        // Disparar evento para UI
        window.dispatchEvent(new CustomEvent('apiLog', {
            detail: { message, type, timestamp: new Date() }
        }));
    }

    /**
     * Delay helper
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Cancelar operação atual
     */
    cancel() {
        this.cancelled = true;
        this.log('Operação cancelada pelo usuário', 'warning');
    }

    /**
     * Verificar se operação foi cancelada
     */
    isCancelled() {
        return this.cancelled || false;
    }

    /**
     * Reset do estado
     */
    reset() {
        this.cancelled = false;
    }
}

// Exportar para uso global
window.APIManager = APIManager;
