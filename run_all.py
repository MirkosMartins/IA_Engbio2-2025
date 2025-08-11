#!/usr/bin/env python3
"""
Script principal para executar todo o pipeline do projeto
Árvore de Decisão para Classificação de Câncer de Mama
"""

import os
import sys
import subprocess
from pathlib import Path

def run_script(script_path, description):
    """Executa um script Python e exibe o status"""
    print(f"\n{'='*60}")
    print(f"🔄 {description}")
    print(f"{'='*60}")
    
    try:
        # Mudar para o diretório do script
        script_dir = os.path.dirname(script_path)
        original_dir = os.getcwd()
        
        if script_dir:
            os.chdir(script_dir)
        
        # Executar o script
        result = subprocess.run([sys.executable, os.path.basename(script_path)], 
                              capture_output=True, text=True)
        
        # Voltar ao diretório original
        os.chdir(original_dir)
        
        if result.returncode == 0:
            print(f"✅ {description} - CONCLUÍDO COM SUCESSO")
            print(result.stdout)
        else:
            print(f"❌ {description} - ERRO")
            print(f"Erro: {result.stderr}")
            print(f"Output: {result.stdout}")
            return False
            
    except Exception as e:
        print(f"❌ Erro ao executar {description}: {str(e)}")
        return False
    
    return True

def main():
    """Função principal"""
    print("🧬 ÁRVORE DE DECISÃO PARA CLASSIFICAÇÃO DE CÂNCER DE MAMA")
    print("👨‍🎓 Autor: Kalleby Evangelho")
    print("🏫 UFN 2025 - IA em Saúde - Engenharia Biomédica")
    print("\n🚀 Iniciando execução completa do projeto...")
    
    # Definir scripts na ordem de execução
    scripts = [
        {
            'path': 'src/scripts/load_dataset.py',
            'description': 'Carregando dataset do UCI ML Repository'
        },
        {
            'path': 'src/scripts/prepare_data.py',
            'description': 'Preparando e analisando dados'
        },
        {
            'path': 'src/scripts/build_decision_tree.py',
            'description': 'Construindo e treinando árvore de decisão'
        },
        {
            'path': 'src/scripts/evaluate_model.py',
            'description': 'Avaliando modelo e gerando relatórios'
        }
    ]
    
    # Verificar se os scripts existem
    for script in scripts:
        if not Path(script['path']).exists():
            print(f"❌ Script não encontrado: {script['path']}")
            return False
    
    # Executar scripts sequencialmente
    success_count = 0
    for script in scripts:
        if run_script(script['path'], script['description']):
            success_count += 1
        else:
            print(f"\n❌ Falha na execução. Parando pipeline.")
            break
    
    # Resultado final
    print(f"\n{'='*60}")
    print(f"📊 RESULTADO FINAL")
    print(f"{'='*60}")
    
    if success_count == len(scripts):
        print(f"🎉 PIPELINE CONCLUÍDO COM SUCESSO!")
        print(f"✅ {success_count}/{len(scripts)} scripts executados com sucesso")
        print(f"\n📁 Arquivos gerados:")
        print(f"   • Modelo treinado: src/models/decision_tree_model.pkl")
        print(f"   • Dados processados: src/data/")
        print(f"   • Visualizações: assets/images/")
        print(f"   • Relatórios: src/data/evaluation_report.txt")
        print(f"\n🌐 Para visualizar a landing page:")
        print(f"   • Abra o arquivo index.html em um navegador")
        print(f"   • Ou execute: python -m http.server 8000")
        print(f"   • Acesse: http://localhost:8000")
        
    else:
        print(f"❌ PIPELINE FALHOU")
        print(f"⚠️  {success_count}/{len(scripts)} scripts executados com sucesso")
        print(f"🔧 Verifique os erros acima e tente novamente")
    
    return success_count == len(scripts)

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
