import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { InventoryItem, PlayerStats } from '../../../types';
import { Backpack, Sparkles, Shield, Key, Gem, Info } from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  stats
}) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(
    stats.inventory[0] || null
  );

  // Check the three crystals status
  const hasModelCrystal = stats.inventory.some(i => i.id === 'crystal_model');
  const hasViewCrystal = stats.inventory.some(i => i.id === 'crystal_view');
  const hasCtrlCrystal = stats.inventory.some(i => i.id === 'crystal_controller');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={
        <div className="flex items-center gap-2 text-sky-400">
          <Backpack size={22} />
          <span>Mochila & Inventário do Desenvolvedor</span>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Triad Sanctuary Banner */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">A Tríade dos Cristais MVC</h4>
              <p className="text-xs text-slate-400">
                Colete os 3 cristais primordiais para restaurar o equilíbrio de CodeLand.
              </p>
            </div>
          </div>

          {/* Crystals Pedestal */}
          <div className="flex items-center gap-3">
            {/* Model Crystal */}
            <div className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition ${
              hasModelCrystal 
                ? 'bg-sky-950/60 border-sky-500/60 text-sky-300 glow-model' 
                : 'bg-slate-900 border-slate-800 opacity-40 text-slate-500'
            }`}>
              <Gem size={22} className={hasModelCrystal ? 'animate-pulse' : ''} />
              <span className="text-[10px] font-bold">MODEL</span>
            </div>

            {/* View Crystal */}
            <div className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition ${
              hasViewCrystal 
                ? 'bg-purple-950/60 border-purple-500/60 text-purple-300 glow-view' 
                : 'bg-slate-900 border-slate-800 opacity-40 text-slate-500'
            }`}>
              <Gem size={22} className={hasViewCrystal ? 'animate-pulse' : ''} />
              <span className="text-[10px] font-bold">VIEW</span>
            </div>

            {/* Controller Crystal */}
            <div className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition ${
              hasCtrlCrystal 
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 glow-controller' 
                : 'bg-slate-900 border-slate-800 opacity-40 text-slate-500'
            }`}>
              <Gem size={22} className={hasCtrlCrystal ? 'animate-pulse' : ''} />
              <span className="text-[10px] font-bold">CONTROLLER</span>
            </div>
          </div>
        </div>

        {/* Inventory Grid & Item Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Items Grid */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Itens Armazenados ({stats.inventory.length})
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {stats.inventory.map(item => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedItem(item);
                    }}
                    className={`flex flex-col items-center p-3 rounded-xl border text-center transition transform active:scale-95 ${
                      isSelected
                        ? 'bg-sky-950/60 border-sky-400 text-sky-200 shadow-lg glow-model'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="text-3xl mb-2 select-none">{item.icon}</span>
                    <span className="text-xs font-bold truncate w-full">{item.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{item.type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Item Inspector Panel */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            {selectedItem ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="text-4xl">{selectedItem.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{selectedItem.name}</h4>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-500/20 text-sky-400">
                      {selectedItem.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300">Descrição:</span>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    {selectedItem.description}
                  </p>
                </div>

                {selectedItem.pillar && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Info size={14} className="text-sky-400" />
                    <span>Vinculado ao pilar: </span>
                    <strong className="text-sky-300">{selectedItem.pillar}</strong>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-xs text-center">
                <Info size={24} className="mb-2 opacity-50" />
                <span>Selecione um item da mochila para inspecionar seus detalhes.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
