import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { SoundToggle } from '../../components/common/SoundToggle';
import { StorageService } from '../../../services/persistence/StorageService';
import { sound } from '../../../services/audio/SoundEffects';
import { 
  Play, 
  RotateCcw, 
  HelpCircle, 
  Trophy, 
  Settings, 
  Sparkles, 
  BarChart3, 
  Trash2, 
  Gamepad2,
  Code2
} from 'lucide-react';

interface HomePageProps {
  onStartNewGame: () => void;
  onContinueGame: () => void;
  onOpenAchievements: () => void;
  onOpenDashboard: () => void;
  hasSave: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartNewGame,
  onContinueGame,
  onOpenAchievements,
  onOpenDashboard,
  hasSave
}) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleResetProgress = () => {
    sound.playError();
    if (window.confirm('Tem certeza que deseja apagar todo o seu progresso? Esta ação é irreversível!')) {
      StorageService.resetProgress();
      window.location.reload();
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-codeland-dark flex flex-col items-center justify-between p-6 overflow-hidden select-none">
      {/* Dynamic Animated Cyber Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/40 via-purple-950/20 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 retro-scanlines" />
      </div>

      {/* Top Bar with Audio Controls */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10 pt-2">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>CodeLand Online • v1.0.0</span>
        </div>
        <SoundToggle />
      </div>

      {/* Hero Center Content */}
      <div className="flex flex-col items-center text-center z-10 max-w-2xl my-auto">
        {/* Game Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-bold text-sky-400 mb-6 shadow-xl animate-float">
          <Sparkles size={14} className="text-amber-400" />
          <span>RPG Educacional de Arquitetura de Software em Java</span>
        </div>

        {/* Game Title */}
        <div className="relative mb-3">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-emerald-400 font-game drop-shadow-2xl">
            MVC QUEST
          </h1>
          <p className="text-lg sm:text-2xl font-bold tracking-widest uppercase text-amber-400 font-sans mt-2">
            A Jornada do Código
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed mb-8">
          CodeLand está em colapso devido à falta de organização arquitetural. Domine os três pilares sagrados — <strong className="text-sky-400">Model</strong>, <strong className="text-purple-400">View</strong> e <strong className="text-emerald-400">Controller</strong> — para restaurar o reino digital!
        </p>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          {hasSave && (
            <Button
              variant="gold"
              size="lg"
              icon={<Play size={18} />}
              onClick={onContinueGame}
              className="flex-1 text-slate-950 font-black"
            >
              CONTINUAR
            </Button>
          )}

          <Button
            variant={hasSave ? 'primary' : 'gold'}
            size="lg"
            icon={<Sparkles size={18} />}
            onClick={onStartNewGame}
            className="flex-1"
          >
            {hasSave ? 'NOVA JORNADA' : 'INICIAR JORNADA'}
          </Button>
        </div>

        {/* Secondary Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <Button
            variant="ghost"
            size="sm"
            icon={<HelpCircle size={15} />}
            onClick={() => {
              sound.playClick();
              setShowHowToPlay(true);
            }}
          >
            COMO JOGAR
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={<Trophy size={15} />}
            onClick={onOpenAchievements}
          >
            CONQUISTAS
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={<BarChart3 size={15} />}
            onClick={onOpenDashboard}
          >
            DESEMPENHO
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={<Settings size={15} />}
            onClick={() => {
              sound.playClick();
              setShowSettings(true);
            }}
          >
            CONFIGURAÇÕES
          </Button>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="z-10 text-[11px] text-slate-500 font-mono text-center">
        Desenvolvido com React, TypeScript, Phaser 3 & Monaco Editor • Sem necessidade de instalação
      </footer>

      {/* Modal: Como Jogar */}
      <Modal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
        size="lg"
        title={
          <div className="flex items-center gap-2 text-sky-400">
            <Gamepad2 size={22} />
            <span>Guia de Aventura em CodeLand</span>
          </div>
        }
      >
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <h4 className="font-bold text-slate-100 text-sm mb-1 flex items-center gap-2">
              <Code2 size={16} className="text-sky-400" /> O que é o MVC?
            </h4>
            <p>
              O padrão arquitetural <strong>Model-View-Controller</strong> divide o sistema em três camadas independentes:
              <br />• <strong className="text-sky-400">Model:</strong> Cuida dos dados e regras de negócio.
              <br />• <strong className="text-purple-400">View:</strong> Apresenta a interface visual ao usuário.
              <br />• <strong className="text-emerald-400">Controller:</strong> Coordena as requisições e a comunicação entre Model e View.
            </p>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <h4 className="font-bold text-slate-100 text-sm mb-1">🎮 Controles de Movimentação</h4>
            <p>
              • <strong>Teclado:</strong> Teclas <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">W</kbd> <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">A</kbd> <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">S</kbd> <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">D</kbd> ou <strong>Setas Direcionais</strong> para caminhar pelo mundo 2D.
              <br />• <strong>Interação:</strong> Pressione <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">E</kbd> ou <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Espaço</kbd> ao se aproximar de NPCs, baús ou portais.
              <br />• <strong>Dispositivos Touch / Tablets:</strong> D-Pad virtual direcional e botão tátil de ação na tela.
            </p>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <h4 className="font-bold text-slate-100 text-sm mb-1">🏆 As 5 Fases da Jornada</h4>
            <ol className="list-decimal pl-4 space-y-1 text-slate-400">
              <li><strong>Vila da Arquitetura:</strong> Introdução com o Professor Byte.</li>
              <li><strong>Floresta dos Dados:</strong> Domínio do Model com Modelina.</li>
              <li><strong>Cidade das Interfaces:</strong> Telas e formulários com Lady View.</li>
              <li><strong>Castelo dos Controladores:</strong> Fluxo e mediação com o Capitão Controller.</li>
              <li><strong>Laboratório Final:</strong> Criação do Sistema de Alunos em Java com o Doutor Debug.</li>
            </ol>
          </div>
        </div>
      </Modal>

      {/* Modal: Configurações */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        size="md"
        title={
          <div className="flex items-center gap-2 text-slate-200">
            <Settings size={20} />
            <span>Configurações do Jogo</span>
          </div>
        }
      >
        <div className="space-y-5 text-xs text-slate-300">
          <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
            <div>
              <span className="font-bold text-slate-200 block">Efeitos Sonoros e Música</span>
              <span className="text-slate-400 text-[11px]">Sons sintetizados em tempo real via Web Audio API.</span>
            </div>
            <SoundToggle />
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
            <span className="font-bold text-slate-200 block">Gerenciamento de Savegame (LocalStorage)</span>
            <p className="text-[11px] text-slate-400">
              Seu progresso é gravado automaticamente a cada desafio concluído.
            </p>
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 size={14} />}
              onClick={handleResetProgress}
            >
              Reiniciar Jornada do Zero
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
