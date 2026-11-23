import React from 'react';
import { Button } from '../../components/common/Button';
import { PlayerProfile, PlayerStats } from '../../../types';
import { 
  BarChart3, 
  ArrowLeft, 
  CheckCircle, 
  Zap, 
  Clock, 
  Target, 
  Award, 
  GraduationCap,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface DashboardPageProps {
  profile: PlayerProfile;
  stats: PlayerStats;
  onBack: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profile,
  stats,
  onBack
}) => {
  const accuracy = stats.quizzesAnswered > 0 
    ? Math.round((stats.quizzesCorrect / stats.quizzesAnswered) * 100) 
    : 100;

  // Pedagogical recommendation generator
  const getPedagogicalRecommendations = (): string[] => {
    const recommendations: string[] = [];

    if (stats.modelScore < 15) {
      recommendations.push(
        'Reforço no Model: Pratique mais os conceitos de encapsulamento com modificadores private e métodos de regras de negócio.'
      );
    } else {
      recommendations.push(
        'Excelente domínio do Model! Suas classes mantêm o estado íntegro e regras de domínio bem isoladas.'
      );
    }

    if (stats.viewScore < 10) {
      recommendations.push(
        'Atenção à View: Lembre-se de nunca realizar cálculos matemáticos ou acessar repositórios na camada visual.'
      );
    } else {
      recommendations.push(
        'Perfeito isolamento na View! A apresentação de dados não polui as regras da aplicação.'
      );
    }

    if (stats.controllerScore < 15) {
      recommendations.push(
        'Refine o Controller: Evite o antipadrão "Fat Controller". Deixe o controlador apenas coordenar o fluxo entre View e Model.'
      );
    } else {
      recommendations.push(
        'Orquestração impecável! Seus controladores atuam como maestros leves e desacoplados.'
      );
    }

    if (stats.finalProjectScore >= 70) {
      recommendations.push(
        'Projeto Final Aprovado! Você está apto a desenvolver arquiteturas de software profissionais seguindo o padrão MVC em Java.'
      );
    } else {
      recommendations.push(
        'Próximo Passo: Conclua a implementação do Sistema de Alunos no Laboratório Final para consolidar sua formação.'
      );
    }

    return recommendations;
  };

  const recommendations = getPedagogicalRecommendations();

  return (
    <div className="min-h-screen w-full bg-codeland-dark p-6 flex flex-col items-center select-none text-slate-100">
      {/* Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <Button
          variant="primary"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={onBack}
        >
          Voltar
        </Button>

        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-purple-400" />
          <h2 className="text-lg font-bold text-slate-100">Painel de Aprendizagem & Desempenho</h2>
        </div>

        <div className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl font-bold">
          {profile.name} • Nvl {stats.level}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <Zap size={14} className="text-amber-400" /> Total de XP
          </span>
          <span className="text-2xl font-black text-amber-400 font-mono">{stats.xp}</span>
          <span className="text-[10px] text-slate-500 mt-1">{stats.levelTitle}</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <Target size={14} className="text-emerald-400" /> Taxa de Acerto
          </span>
          <span className="text-2xl font-black text-emerald-400 font-mono">{accuracy}%</span>
          <span className="text-[10px] text-slate-500 mt-1">{stats.quizzesCorrect} de {stats.quizzesAnswered} quizzes</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <CheckCircle size={14} className="text-sky-400" /> Desafios Feitos
          </span>
          <span className="text-2xl font-black text-sky-400 font-mono">{stats.completedChallenges.length}</span>
          <span className="text-[10px] text-slate-500 mt-1">Exercícios práticos</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <Award size={14} className="text-purple-400" /> Projeto Final
          </span>
          <span className="text-2xl font-black text-purple-400 font-mono">{stats.finalProjectScore}/100</span>
          <span className="text-[10px] text-slate-500 mt-1">Laboratório Java</span>
        </div>
      </div>

      {/* Pillars Breakdown & Recommendations */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Pillars Mastery Progress */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <GraduationCap size={18} className="text-sky-400" />
            <span>Domínio por Pilar Arquitetural</span>
          </h3>

          <div className="space-y-4 text-xs">
            {/* Model */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-sky-400">MODEL (Dados & Regras de Negócio)</span>
                <span className="text-slate-400 font-mono">
                  {Math.min(100, (stats.completedChallenges.filter(c => c.includes('fill') || c.includes('match') || c.includes('quiz_2')).length * 20))}%
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="bg-sky-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.max(25, (stats.completedChallenges.filter(c => c.includes('fill') || c.includes('match') || c.includes('quiz_2')).length * 20)))}%` }} 
                />
              </div>
            </div>

            {/* View */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-purple-400">VIEW (Interface & Apresentação)</span>
                <span className="text-slate-400 font-mono">
                  {Math.min(100, (stats.completedChallenges.filter(c => c.includes('fill_6') || c.includes('fill_7') || c.includes('debug_3') || c.includes('quiz_3')).length * 25))}%
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="bg-purple-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.max(20, (stats.completedChallenges.filter(c => c.includes('fill_6') || c.includes('fill_7') || c.includes('debug_3') || c.includes('quiz_3')).length * 25)))}%` }} 
                />
              </div>
            </div>

            {/* Controller */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-emerald-400">CONTROLLER (Fluxo & Coordenação)</span>
                <span className="text-slate-400 font-mono">
                  {Math.min(100, (stats.completedChallenges.filter(c => c.includes('fill_8') || c.includes('fill_9') || c.includes('flow') || c.includes('quiz_4')).length * 20))}%
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.max(20, (stats.completedChallenges.filter(c => c.includes('fill_8') || c.includes('fill_9') || c.includes('flow') || c.includes('quiz_4')).length * 20)))}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pedagogical Guidance */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <BookOpen size={18} className="text-amber-400" />
            <span>Recomendações Pedagógicas Adaptativas</span>
          </h3>

          <div className="space-y-2.5">
            {recommendations.map((rec, idx) => (
              <div 
                key={idx}
                className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
              >
                <Sparkles size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
