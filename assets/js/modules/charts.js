/**
 * Módulo de Gráficos
 * Gerencia criação e atualização de gráficos e visualizações
 */

class ChartsManager {
    constructor() {
        this.charts = {};
        this.colors = {
            primary: '#667eea',
            secondary: '#764ba2',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#3b82f6',
            light: '#f8fafc',
            dark: '#1f2937'
        };
        this.initializeCharts();
    }

    /**
     * Inicializar todos os gráficos
     */
    initializeCharts() {
        // Aguardar carregamento do DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupCharts();
            });
        } else {
            this.setupCharts();
        }
    }

    /**
     * Configurar gráficos
     */
    setupCharts() {
        this.createClassDistributionChart();
        this.createConfusionMatrixChart();
        this.createFeatureImportanceChart();
        this.createROCCurveChart();
    }

    /**
     * Criar gráfico de distribuição de classes
     */
    createClassDistributionChart() {
        const canvas = document.getElementById('classDistributionChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        this.charts.classDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Benignos', 'Malignos'],
                datasets: [{
                    data: [357, 212],
                    backgroundColor: [
                        this.colors.success,
                        this.colors.error
                    ],
                    borderColor: [
                        this.colors.success,
                        this.colors.error
                    ],
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 14,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }

    /**
     * Criar gráfico da matriz de confusão
     */
    createConfusionMatrixChart() {
        const canvas = document.getElementById('confusionMatrixChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Dados da matriz de confusão: [[TN, FP], [FN, TP]]
        const matrixData = [
            [72, 0],   // Linha 1: Real Benigno
            [5, 37]    // Linha 2: Real Maligno
        ];

        // Criar dataset para heatmap
        const data = [];
        const labels = [];
        
        matrixData.forEach((row, i) => {
            row.forEach((value, j) => {
                data.push({
                    x: j,
                    y: i,
                    v: value
                });
            });
        });

        this.charts.confusionMatrix = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Matriz de Confusão',
                    data: data,
                    backgroundColor: (context) => {
                        const value = context.parsed.v;
                        const maxValue = Math.max(...matrixData.flat());
                        const intensity = value / maxValue;
                        return `rgba(102, 126, 234, ${0.2 + intensity * 0.8})`;
                    },
                    borderColor: this.colors.primary,
                    borderWidth: 2,
                    pointRadius: 30
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: -0.5,
                        max: 1.5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                return value === 0 ? 'Predito Benigno' : 
                                       value === 1 ? 'Predito Maligno' : '';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Predição'
                        }
                    },
                    y: {
                        min: -0.5,
                        max: 1.5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                return value === 0 ? 'Real Benigno' : 
                                       value === 1 ? 'Real Maligno' : '';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Valor Real'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: function() {
                                return 'Matriz de Confusão';
                            },
                            label: function(context) {
                                const x = context.parsed.x;
                                const y = context.parsed.y;
                                const value = context.parsed.v;
                                
                                const realLabel = y === 0 ? 'Benigno' : 'Maligno';
                                const predLabel = x === 0 ? 'Benigno' : 'Maligno';
                                
                                return `Real: ${realLabel}, Predito: ${predLabel} - ${value} casos`;
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Criar gráfico de importância das features
     */
    createFeatureImportanceChart() {
        const canvas = document.getElementById('featureImportanceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        const features = [
            'perimeter3', 'concave_points3', 'concave_points1', 'texture3',
            'area2', 'compactness2', 'radius2', 'concave_points2', 'area1', 'smoothness1'
        ];
        
        const importance = [64.64, 11.46, 8.51, 6.71, 4.61, 1.62, 1.29, 1.15, 0.01, 0.00];

        this.charts.featureImportance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: features,
                datasets: [{
                    label: 'Importância (%)',
                    data: importance,
                    backgroundColor: this.createGradient(ctx, this.colors.primary, this.colors.secondary),
                    borderColor: this.colors.primary,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 70,
                        title: {
                            display: true,
                            text: 'Importância (%)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Features'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Importância: ${context.parsed.x}%`;
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    /**
     * Criar curva ROC
     */
    createROCCurveChart() {
        const canvas = document.getElementById('rocCurveChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Dados simulados da curva ROC
        const rocData = [
            {x: 0, y: 0},
            {x: 0.0, y: 0.1},
            {x: 0.0, y: 0.3},
            {x: 0.0, y: 0.5},
            {x: 0.0, y: 0.7},
            {x: 0.12, y: 0.88},
            {x: 1.0, y: 1.0}
        ];

        this.charts.rocCurve = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Curva ROC (AUC = 0.94)',
                    data: rocData,
                    borderColor: this.colors.primary,
                    backgroundColor: `${this.colors.primary}20`,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: this.colors.primary,
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }, {
                    label: 'Linha Aleatória',
                    data: [{x: 0, y: 0}, {x: 1, y: 1}],
                    borderColor: this.colors.dark,
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        min: 0,
                        max: 1,
                        title: {
                            display: true,
                            text: 'Taxa de Falsos Positivos'
                        },
                        ticks: {
                            callback: function(value) {
                                return (value * 100).toFixed(0) + '%';
                            }
                        }
                    },
                    y: {
                        min: 0,
                        max: 1,
                        title: {
                            display: true,
                            text: 'Taxa de Verdadeiros Positivos'
                        },
                        ticks: {
                            callback: function(value) {
                                return (value * 100).toFixed(0) + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const x = (context.parsed.x * 100).toFixed(1);
                                const y = (context.parsed.y * 100).toFixed(1);
                                return `${context.dataset.label}: (${x}%, ${y}%)`;
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    /**
     * Criar gradiente
     */
    createGradient(ctx, color1, color2) {
        const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    }

    /**
     * Atualizar dados do gráfico de distribuição
     */
    updateClassDistribution(benign, malignant) {
        if (this.charts.classDistribution) {
            this.charts.classDistribution.data.datasets[0].data = [benign, malignant];
            this.charts.classDistribution.update('active');
        }
    }

    /**
     * Atualizar matriz de confusão
     */
    updateConfusionMatrix(matrix) {
        if (this.charts.confusionMatrix) {
            const data = [];
            matrix.forEach((row, i) => {
                row.forEach((value, j) => {
                    data.push({
                        x: j,
                        y: i,
                        v: value
                    });
                });
            });
            
            this.charts.confusionMatrix.data.datasets[0].data = data;
            this.charts.confusionMatrix.update('active');
        }
    }

    /**
     * Atualizar importância das features
     */
    updateFeatureImportance(features, importance) {
        if (this.charts.featureImportance) {
            this.charts.featureImportance.data.labels = features;
            this.charts.featureImportance.data.datasets[0].data = importance;
            this.charts.featureImportance.update('active');
        }
    }

    /**
     * Atualizar curva ROC
     */
    updateROCCurve(rocData, auc) {
        if (this.charts.rocCurve) {
            this.charts.rocCurve.data.datasets[0].data = rocData;
            this.charts.rocCurve.data.datasets[0].label = `Curva ROC (AUC = ${auc.toFixed(2)})`;
            this.charts.rocCurve.update('active');
        }
    }

    /**
     * Criar visualização da árvore de decisão
     */
    createDecisionTreeVisualization() {
        const container = document.getElementById('decisionTreeViz');
        if (!container) return;

        // Dados simplificados da árvore
        const treeData = {
            name: "perimeter3 ≤ 106.1",
            children: [
                {
                    name: "Benigno",
                    size: 357,
                    type: "leaf",
                    class: "benign"
                },
                {
                    name: "concave_points3 ≤ 0.135",
                    children: [
                        {
                            name: "Benigno",
                            size: 45,
                            type: "leaf",
                            class: "benign"
                        },
                        {
                            name: "Maligno",
                            size: 167,
                            type: "leaf",
                            class: "malignant"
                        }
                    ]
                }
            ]
        };

        this.renderDecisionTree(container, treeData);
    }

    /**
     * Renderizar árvore de decisão com D3.js
     */
    renderDecisionTree(container, data) {
        // Limpar container
        container.innerHTML = '';

        const width = container.offsetWidth;
        const height = 400;

        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', 'translate(40,40)');

        const tree = d3.tree()
            .size([width - 80, height - 80]);

        const root = d3.hierarchy(data);
        tree(root);

        // Links
        g.selectAll('.link')
            .data(root.links())
            .enter().append('path')
            .attr('class', 'link')
            .attr('d', d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x))
            .style('fill', 'none')
            .style('stroke', '#ccc')
            .style('stroke-width', 2);

        // Nodes
        const node = g.selectAll('.node')
            .data(root.descendants())
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y},${d.x})`);

        node.append('circle')
            .attr('r', 20)
            .style('fill', d => {
                if (d.data.type === 'leaf') {
                    return d.data.class === 'benign' ? this.colors.success : this.colors.error;
                }
                return this.colors.primary;
            })
            .style('stroke', '#fff')
            .style('stroke-width', 3);

        node.append('text')
            .attr('dy', '.35em')
            .attr('x', d => d.children ? -25 : 25)
            .style('text-anchor', d => d.children ? 'end' : 'start')
            .style('font-size', '12px')
            .style('font-weight', '500')
            .text(d => d.data.name);
    }

    /**
     * Destruir todos os gráficos
     */
    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
    }

    /**
     * Redimensionar gráficos
     */
    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }
}

// Exportar para uso global
window.ChartsManager = ChartsManager;
