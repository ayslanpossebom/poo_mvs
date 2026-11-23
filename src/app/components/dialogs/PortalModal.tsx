import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { RegionInfo, PlayerStats } from '../../../types';
import { Compass, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  regions: RegionInfo[];
  stats: PlayerStats;
  currentRegionId: number;
  onTeleport: (regionId: number) => void;
}

export const PortalModal: React.FC<PortalModalProps> = ({
  isOpen,
  onClose,
  regions,
  stats,
  currentRegionId,
  onTeleport
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={
        <div className="flex items-center gap-2 text-amber-400">
          <Compass size={22} />
          <span>Matriz de Portais de CodeLand</span>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <p className="text-xs text-slate-300">
          Utilize a rede de portais para viajar instantaneamente entre as 5 regiões de CodeLand. Novas regiões são desbloqueadas conforme seu nível e progresso nos desafios.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {regions.map(region => {
            const isUnlocked = stats.unlockedRegions.includes(region.id) || stats.level >= region.requiredLevel;
            const isCurrent = currentRegionId === region.id;

            return (
              <div
                key={region.id}
                className={`flex flex-col justify-between p-4 rounded-xl border transition ${
                  isCurrent
                    ? 'bg-sky-950/40 border-sky-500 shadow-md glow-model'
                    : isUnlocked
                    ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700'
                    : 'bg-slate-900/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-100">{region.name}</span>
                      {isCurrent && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-sky-500 text-slate-950">
                          Aqui
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{region.subtitle}</span>
                  </div>

                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: region.themeColor }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                  {region.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    {isUnlocked ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle size={12} /> Desbloqueado
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1">
                        <Lock size={12} /> Nível {region.requiredLevel} necessário
                      </span>
                    )}
                  </div>

                  {isUnlocked && !isCurrent && (
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight size={14} />}
                      onClick={() => {
                        sound.playPortal();
                        onTeleport(region.id);
                        onClose();
                      }}
                    >
                      Viajar
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
