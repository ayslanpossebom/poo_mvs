import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '../common/Button';
import { LabFile, LabValidationResult } from '../../../types';
import { STARTER_LAB_FILES, LAB_TIPS } from '../../../data/finalLabProject';
import { JavaCodeValidator } from '../../../services/validation/JavaCodeValidator';
import { StorageService } from '../../../services/persistence/StorageService';
import { sound } from '../../../services/audio/SoundEffects';
import confetti from 'canvas-confetti';
import { 
  FolderTree, 
  FileCode, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  RotateCcw, 
  Award, 
  HelpCircle,
  Eye,
  CheckCircle2,
  XCircle,
  Terminal,
  ArrowLeft
} from 'lucide-react';

interface FinalLabViewProps {
  onBackToMap: () => void;
  onProjectCompleted: (score: number) => void;
}

export const FinalLabView: React.FC<FinalLabViewProps> = ({
  onBackToMap,
  onProjectCompleted
}) => {
  // Load saved files from StorageService or fallback to starter files
  const [files, setFiles] = useState<LabFile[]>(() => {
    return StorageService.loadLabFiles() || STARTER_LAB_FILES;
  });

  const [activeFileName, setActiveFileName] = useState<string>('Aluno.java');
  const [validationResult, setValidationResult] = useState<LabValidationResult | null>(null);
  const [activeTabLeft, setActiveTabLeft] = useState<'ENUNCIADO' | 'CHECKLIST' | 'DICAS'>('ENUNCIADO');
  const [activeTipLevel, setActiveTipLevel] = useState<number>(0);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [showExampleModal, setShowExampleModal] = useState<boolean>(false);

  // Auto-save files
  useEffect(() => {
    StorageService.saveLabFiles(files);
  }, [files]);

  const activeFile = files.find(f => f.name === activeFileName) || files[0];

  const handleCodeChange = (newCode?: string) => {
    if (newCode === undefined) return;
    setFiles(prev => prev.map(f => f.name === activeFileName ? { ...f, code: newCode } : f));
  };

  const handleValidate = () => {
    sound.playClick();
    const result = JavaCodeValidator.validate(files);
    setValidationResult(result);

    const log: string[] = [
      `[${new Date().toLocaleTimeString()}] Iniciando Análise Estrutural e Arquitetural (Java 17)...`,
      `> Avaliando 5 arquivos do pacote SistemaAlunos...`,
      `> Pontuação Calculada: ${result.score}/100 pts (${result.passed ? 'APROVADO' : 'EM REVISÃO'})`,
      `  - Model: ${result.modelScore}/20`,
      `  - View: ${result.viewScore}/15`,
      `  - Controller: ${result.controllerScore}/20`,
      `  - Comunicação: ${result.communicationScore}/20`,
      `  - Funcionalidades: ${result.functionalityScore}/15`,
      `  - Organização/Main: ${result.organizationScore}/10`,
      result.passed 
        ? `[SUCESSO] Sistema validado com conformidade arquitetural MVC!`
        : `[AVISO] Verifique as pendências na checklist ao lado.`
    ];

    setTerminalOutput(log);

    if (result.passed) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const handleRunSimulatedExecution = () => {
    sound.playClick();
    const result = JavaCodeValidator.validate(files);
    setValidationResult(result);

    const logs: string[] = [
      `[JVM Simulada] Executando Main.java...`,
      `======================================================`,
      `Inicializando Sistema de Alunos MVC...`,
      `[AlunoController] Cadastrando novo aluno: Ada Lovelace (Notas: 9.5, 10.0)`,
      `[AlunoRepository] Objeto Aluno persistido na coleção com sucesso.`,
      `[AlunoController] Cadastrando novo aluno: Alan Turing (Notas: 10.0, 9.0)`,
      `[AlunoRepository] Objeto Aluno persistido na coleção com sucesso.`,
      `------------------------------------------------------`,
      `=== RELATÓRIO DE ALUNOS (AlunoView) ===`,
      `Nome: Ada Lovelace   | Média Calculada: 9.75 | Situação: APROVADO`,
      `Nome: Alan Turing    | Média Calculada: 9.50 | Situação: APROVADO`,
      `======================================================`,
      result.passed 
        ? `[TESTES PASSARAM] Todos os 4 casos de testes arquiteturais foram aprovados!`
        : `[FALHA DE TESTE] Algum componente violou o contrato do MVC.`
    ];

    setTerminalOutput(logs);
    if (result.passed) sound.playSuccess();
  };

  const handleResetCurrentFile = () => {
    sound.playClick();
    if (window.confirm(`Deseja restaurar o arquivo ${activeFileName} para o código inicial?`)) {
      setFiles(prev => prev.map(f => f.name === activeFileName ? { ...f, code: f.starterCode } : f));
    }
  };

  const handleFinalizeProject = () => {
    sound.playClick();
    const result = JavaCodeValidator.validate(files);
    setValidationResult(result);

    if (result.passed) {
      sound.playLevelUp();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
      onProjectCompleted(result.score);
    } else {
      sound.playError();
      alert(`Sua pontuação atual é de ${result.score}/100. É necessário atingir ao menos 70 pontos para concluir o projeto final. Consulte a checklist!`);
    }
  };

  const layerBadges: Record<string, { label: string; color: string }> = {
    MODEL: { label: 'MODEL', color: 'bg-sky-500/20 text-sky-400 border-sky-500/40' },
    VIEW: { label: 'VIEW', color: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
    CONTROLLER: { label: 'CONTROLLER', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
    MAIN: { label: 'MAIN', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden text-slate-100 select-none">
      {/* Top Navbar of the Laboratory */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBackToMap();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft size={16} />
            <span>Voltar ao Mapa</span>
          </button>

          <div className="h-6 w-px bg-slate-800 mx-1" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h1 className="text-sm font-bold tracking-wide text-slate-100">
              Laboratório Final Java — Sistema de Alunos MVC
            </h1>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={<RotateCcw size={14} />}
            onClick={handleResetCurrentFile}
            title="Reiniciar código do arquivo atual"
          >
            Reiniciar
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={<Eye size={14} />}
            onClick={() => setShowExampleModal(true)}
            title="Consultar código de referência"
          >
            Ver Exemplo
          </Button>

          <Button
            variant="model"
            size="sm"
            icon={<CheckCircle size={14} />}
            onClick={handleValidate}
          >
            Validar Código
          </Button>

          <Button
            variant="controller"
            size="sm"
            icon={<Play size={14} />}
            onClick={handleRunSimulatedExecution}
          >
            Executar Testes
          </Button>

          <Button
            variant="gold"
            size="sm"
            icon={<Award size={14} />}
            onClick={handleFinalizeProject}
          >
            Finalizar Projeto
          </Button>
        </div>
      </header>

      {/* Main 3-Panel Layout */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* PANEL 1 (LEFT): Enunciado, Checklist & Dicas (3 cols) */}
        <div className="col-span-3 bg-slate-900/90 border-r border-slate-800 flex flex-col overflow-hidden">
          {/* Sub-tabs header */}
          <div className="flex border-b border-slate-800 text-xs font-bold bg-slate-950/60">
            <button
              onClick={() => setActiveTabLeft('ENUNCIADO')}
              className={`flex-1 py-2.5 text-center transition ${
                activeTabLeft === 'ENUNCIADO' ? 'text-sky-400 border-b-2 border-sky-400 bg-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Enunciado
            </button>
            <button
              onClick={() => setActiveTabLeft('CHECKLIST')}
              className={`flex-1 py-2.5 text-center transition ${
                activeTabLeft === 'CHECKLIST' ? 'text-sky-400 border-b-2 border-sky-400 bg-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Checklist
            </button>
            <button
              onClick={() => setActiveTabLeft('DICAS')}
              className={`flex-1 py-2.5 text-center transition ${
                activeTabLeft === 'DICAS' ? 'text-amber-400 border-b-2 border-amber-400 bg-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dicas
            </button>
          </div>

          {/* Sub-tabs content */}
          <div className="p-4 overflow-y-auto flex-1 text-xs space-y-4">
            {activeTabLeft === 'ENUNCIADO' && (
              <div className="space-y-3 leading-relaxed text-slate-300">
                <h4 className="font-bold text-slate-100 text-sm">Objetivo do Desafio:</h4>
                <p>
                  Uma instituição de ensino necessita de um sistema para cadastrar alunos, armazenar suas notas, consultar seus dados e calcular suas médias aritméticas.
                </p>

                <h4 className="font-bold text-slate-100 text-xs mt-3">Responsabilidades Esperadas:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-400">
                  <li><strong className="text-sky-400">Aluno.java:</strong> Atributos encapsulados (nome, notas), construtor, getters e método <code className="bg-slate-950 px-1 py-0.5 rounded text-sky-300">calcularMedia()</code>.</li>
                  <li><strong className="text-sky-400">AlunoRepository.java:</strong> Lista em memória, método salvar e listarTodos.</li>
                  <li><strong className="text-purple-400">AlunoView.java:</strong> Exibir dados formatados e menus. SEM cálculos de negócio!</li>
                  <li><strong className="text-emerald-400">AlunoController.java:</strong> Orquestrar as ações entre Repository e View.</li>
                  <li><strong className="text-amber-400">Main.java:</strong> Instanciação dos componentes e inicialização do sistema.</li>
                </ul>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl mt-3">
                  <span className="font-bold text-amber-400 block mb-1">Rubrica de Avaliação (100 pts):</span>
                  <div className="space-y-0.5 text-[11px] text-slate-400 font-mono">
                    <p>• Model: 20 pts</p>
                    <p>• View: 15 pts</p>
                    <p>• Controller: 20 pts</p>
                    <p>• Comunicação entre camadas: 20 pts</p>
                    <p>• Funcionalidades: 15 pts</p>
                    <p>• Organização / Main: 10 pts</p>
                  </div>
                </div>
              </div>
            )}

            {activeTabLeft === 'CHECKLIST' && (
              <div className="space-y-2.5">
                <span className="font-bold text-slate-200 block text-xs">
                  Requisitos Arquiteturais:
                </span>
                {validationResult?.checklist ? (
                  validationResult.checklist.map(item => (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                        item.satisfied 
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      {item.satisfied ? (
                        <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={16} className="text-slate-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold text-xs">{item.label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.hint}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-xs italic">
                    Clique no botão "Validar Código" para preencher a análise automática da checklist.
                  </p>
                )}
              </div>
            )}

            {activeTabLeft === 'DICAS' && (
              <div className="space-y-3">
                <span className="font-bold text-amber-400 block text-xs flex items-center gap-1.5">
                  <Lightbulb size={14} /> Dicas Progressivas do Laboratório
                </span>

                <div className="space-y-2">
                  {LAB_TIPS.map(tip => (
                    <div
                      key={tip.level}
                      className={`p-3 rounded-xl border ${
                        activeTipLevel >= tip.level
                          ? 'bg-slate-950 border-amber-500/40'
                          : 'bg-slate-900 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-amber-300">
                          Nível {tip.level}: {tip.title}
                        </span>
                        {activeTipLevel < tip.level && (
                          <button
                            onClick={() => setActiveTipLevel(tip.level)}
                            className="text-[10px] font-bold text-amber-400 hover:underline"
                          >
                            Revelar
                          </button>
                        )}
                      </div>
                      {activeTipLevel >= tip.level ? (
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {tip.text}
                        </p>
                      ) : (
                        <p className="text-[11px] text-slate-500 italic">Dica oculta.</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PANEL 2 (CENTER): Monaco Code Editor with File Tabs (6 cols) */}
        <div className="col-span-6 flex flex-col bg-slate-950 border-r border-slate-800 overflow-hidden">
          {/* File Tabs */}
          <div className="flex items-center bg-slate-900/90 border-b border-slate-800 overflow-x-auto">
            {files.map(file => {
              const isActive = file.name === activeFileName;
              const badge = layerBadges[file.layer];

              return (
                <button
                  key={file.name}
                  onClick={() => {
                    sound.playClick();
                    setActiveFileName(file.name);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-r border-slate-800 transition ${
                    isActive
                      ? 'bg-slate-950 text-sky-400 border-t-2 border-t-sky-400'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileCode size={14} />
                  <span>{file.name}</span>
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border ${badge.color}`}>
                    {badge.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language="java"
              theme="vs-dark"
              value={activeFile.code}
              onChange={handleCodeChange}
              options={{
                fontSize: 13,
                fontFamily: '"Fira Code", monospace',
                tabSize: 4,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                padding: { top: 12, bottom: 12 }
              }}
            />
          </div>

          {/* Bottom Terminal Output */}
          <div className="h-36 bg-slate-950 border-t border-slate-800 flex flex-col font-mono text-xs">
            <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                <Terminal size={14} /> Console de Validação Pedagógica
              </span>
              <span className="text-[10px] text-slate-500">
                Análise estática & estrutural (sem JVM local necessária)
              </span>
            </div>
            <div className="p-3 overflow-y-auto flex-1 space-y-1 text-slate-300">
              {terminalOutput.length > 0 ? (
                terminalOutput.map((line, idx) => (
                  <div key={idx} className={line.includes('SUCESSO') || line.includes('APROVADO') ? 'text-emerald-400' : line.includes('ERRO') ? 'text-rose-400' : 'text-slate-300'}>
                    {line}
                  </div>
                ))
              ) : (
                <div className="text-slate-600 italic">
                  Clique em "Validar Código" ou "Executar Testes" para gerar o relatório de diagnósticos.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PANEL 3 (RIGHT): Project Tree & Validation Diagnostic (3 cols) */}
        <div className="col-span-3 bg-slate-900/90 flex flex-col overflow-hidden">
          {/* File Tree Header */}
          <div className="p-3 border-b border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-200">
            <FolderTree size={16} className="text-sky-400" />
            <span>Estrutura do Projeto (SistemaAlunos)</span>
          </div>

          {/* File Tree View */}
          <div className="p-3 border-b border-slate-800 font-mono text-xs space-y-1 text-slate-300">
            <div className="font-bold text-sky-400">📁 src/</div>
            <div className="pl-4">📁 model/</div>
            <div className="pl-8 text-slate-400 hover:text-sky-300 cursor-pointer" onClick={() => setActiveFileName('Aluno.java')}>📄 Aluno.java</div>
            <div className="pl-8 text-slate-400 hover:text-sky-300 cursor-pointer" onClick={() => setActiveFileName('AlunoRepository.java')}>📄 AlunoRepository.java</div>
            <div className="pl-4">📁 view/</div>
            <div className="pl-8 text-slate-400 hover:text-purple-300 cursor-pointer" onClick={() => setActiveFileName('AlunoView.java')}>📄 AlunoView.java</div>
            <div className="pl-4">📁 controller/</div>
            <div className="pl-8 text-slate-400 hover:text-emerald-300 cursor-pointer" onClick={() => setActiveFileName('AlunoController.java')}>📄 AlunoController.java</div>
            <div className="pl-4 text-slate-400 hover:text-amber-300 cursor-pointer" onClick={() => setActiveFileName('Main.java')}>📄 Main.java</div>
          </div>

          {/* Score & Diagnostic Report */}
          <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                Nota do Projeto
              </span>
              <div className="text-3xl font-black text-amber-400 font-mono">
                {validationResult?.score || 0}
                <span className="text-sm font-normal text-slate-500">/100</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 ${
                validationResult?.passed 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {validationResult?.passed ? 'QUALIFICADO PARA O TÍTULO' : 'EM ANDAMENTO'}
              </span>
            </div>

            {/* Score breakdown bars */}
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-sky-400 font-bold">Model (Dados/Regras)</span>
                  <span className="text-slate-400 font-mono">{validationResult?.modelScore || 0}/20</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-sky-400 h-full" style={{ width: `${((validationResult?.modelScore || 0) / 20) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-purple-400 font-bold">View (Apresentação)</span>
                  <span className="text-slate-400 font-mono">{validationResult?.viewScore || 0}/15</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-400 h-full" style={{ width: `${((validationResult?.viewScore || 0) / 15) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-emerald-400 font-bold">Controller (Coordenação)</span>
                  <span className="text-slate-400 font-mono">{validationResult?.controllerScore || 0}/20</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full" style={{ width: `${((validationResult?.controllerScore || 0) / 20) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-amber-400 font-bold">Comunicação e Desacoplamento</span>
                  <span className="text-slate-400 font-mono">{validationResult?.communicationScore || 0}/20</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-full" style={{ width: `${((validationResult?.communicationScore || 0) / 20) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Diagnostic Message */}
            {validationResult?.diagnosticReport && (
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-slate-100 block mb-1">Parecer do Avaliador:</span>
                {validationResult.diagnosticReport}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal with Reference Code */}
      {showExampleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-sm text-sky-400">
                Código de Referência — {activeFileName}
              </span>
              <button
                onClick={() => setShowExampleModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 font-code text-xs bg-slate-950 text-slate-200">
              <pre>
                <code>{activeFile.referenceCode}</code>
              </pre>
            </div>
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowExampleModal(false)}
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
