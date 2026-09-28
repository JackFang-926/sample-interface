import React, { useState } from 'react';
import { SectorItem } from '../types/market';
import { SECTORS } from '../data/mockMarketData';

interface SectorPerformanceProps {
  onSelectSector?: (sectorName: string) => void;
}

export const SectorPerformance: React.FC<SectorPerformanceProps> = ({ onSelectSector }) => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const handleSelect = (name: string) => {
    setSelectedSector(selectedSector === name ? null : name);
    if (onSelectSector) {
      onSelectSector(name);
    }
  };

  return (
    <div className="bg-[#171b26] rounded border border-[#262a35] p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#dfe2f2]">
            S&P 500 Sector Performance
          </span>
          <span className="bg-[#313441] px-1.5 py-0.5 rounded text-[10px] font-semibold text-[#8d90a2] uppercase tracking-wider">
            11 SECTORS
          </span>
        </div>
        <span className="text-[11px] text-[#8d90a2]">Updated real-time</span>
      </div>

      {/* Grid of Sector Breakdown Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {SECTORS.map((sec) => {
          const isPositive = sec.changePercent >= 0;
          const isSelected = selectedSector === sec.name;

          return (
            <div
              key={sec.name}
              onClick={() => handleSelect(sec.name)}
              className={`p-2 rounded flex flex-col gap-1.5 cursor-pointer transition-colors border ${
                isSelected
                  ? 'bg-[#262a35] border-[#2962ff]'
                  : 'bg-[#1b1f2b] hover:bg-[#202534] border-transparent'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#dfe2f2] font-medium">{sec.name}</span>
                <span
                  className={`font-data-mono font-bold text-xs ${
                    isPositive ? 'text-[#66dabf]' : 'text-[#ffb3b0]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {sec.changePercent.toFixed(2)}%
                </span>
              </div>

              {/* Strength Bar */}
              <div className="w-full bg-[#313441] h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isPositive ? 'bg-[#20a28a]' : 'bg-[#da2237]'
                  }`}
                  style={{ width: `${Math.min(sec.weight, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
