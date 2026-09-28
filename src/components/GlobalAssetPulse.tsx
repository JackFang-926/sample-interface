import React, { useState } from 'react';
import { AssetPulse } from '../types/market';
import { GLOBAL_ASSETS } from '../data/mockMarketData';

interface GlobalAssetPulseProps {
  onSelectAsset?: (asset: AssetPulse) => void;
}

export const GlobalAssetPulse: React.FC<GlobalAssetPulseProps> = ({ onSelectAsset }) => {
  const [activeTab, setActiveTab] = useState<'Crypto' | 'Forex' | 'Futures' | 'Commodities'>(
    'Crypto'
  );

  const assets = GLOBAL_ASSETS[activeTab];

  const getTagColor = (category: AssetPulse['category']) => {
    switch (category) {
      case 'CRYPTO':
        return 'bg-[#f7931a]/20 text-[#f7931a]';
      case 'FOREX':
        return 'bg-[#313441] text-[#c3c5d8]';
      case 'COMMOD':
        return 'bg-[#ffd700]/20 text-[#ffd700]';
      case 'ENERGY':
        return 'bg-[#313441] text-[#c3c5d8]';
      case 'FUTURES':
        return 'bg-[#2962ff]/20 text-[#b6c4ff]';
      default:
        return 'bg-[#313441] text-[#c3c5d8]';
    }
  };

  return (
    <div className="bg-[#171b26] rounded border border-[#262a35] p-3">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="text-sm font-bold text-[#dfe2f2]">Global Asset Pulse</span>

        <div className="flex items-center gap-1 bg-[#1b1f2b] p-0.5 rounded border border-[#262a35] text-xs">
          {(['Crypto', 'Forex', 'Futures', 'Commodities'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-0.5 rounded transition-colors text-[11px] font-medium cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#262a35] text-[#dfe2f2] font-semibold'
                  : 'text-[#8d90a2] hover:text-[#dfe2f2]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Pulse Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {assets.map((asset) => {
          const isPositive = asset.changePercent >= 0;

          return (
            <div
              key={asset.symbol}
              onClick={() => onSelectAsset && onSelectAsset(asset)}
              className="bg-[#1b1f2b] hover:bg-[#202534] border border-transparent hover:border-[#363a45] p-2.5 rounded flex flex-col transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#dfe2f2] group-hover:text-[#2962ff]">
                  {asset.symbol}
                </span>
                <span
                  className={`px-1 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getTagColor(
                    asset.category
                  )}`}
                >
                  {asset.category}
                </span>
              </div>

              <span className="font-data-mono text-sm font-bold text-[#dfe2f2] mt-1.5">
                {asset.price}
              </span>

              <div
                className={`flex items-center gap-1 font-data-mono text-[11px] font-medium mt-0.5 ${
                  isPositive ? 'text-[#66dabf]' : 'text-[#ffb3b0]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">
                  {isPositive ? 'trending_up' : 'trending_down'}
                </span>
                <span>
                  {isPositive ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
