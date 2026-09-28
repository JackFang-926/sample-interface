import React, { useState } from 'react';
import { StockMover } from '../types/market';
import {
  TOP_GAINERS,
  TOP_LOSERS,
  MOST_ACTIVE,
  UNUSUAL_VOLUME,
  HIGHS_52W,
} from '../data/mockMarketData';

interface MarketMoversTableProps {
  onSelectStock: (stock: StockMover) => void;
  selectedSymbol?: string;
}

export const MarketMoversTable: React.FC<MarketMoversTableProps> = ({
  onSelectStock,
  selectedSymbol,
}) => {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers' | 'active' | 'volume' | 'highs'>(
    'gainers'
  );

  const getMoversList = (): StockMover[] => {
    switch (activeTab) {
      case 'gainers':
        return TOP_GAINERS;
      case 'losers':
        return TOP_LOSERS;
      case 'active':
        return MOST_ACTIVE;
      case 'volume':
        return UNUSUAL_VOLUME;
      case 'highs':
        return HIGHS_52W;
      default:
        return TOP_GAINERS;
    }
  };

  const movers = getMoversList();

  const getRatingBadge = (rating: StockMover['rating']) => {
    switch (rating) {
      case 'Strong Buy':
        return 'bg-[#20a28a] text-[#00201a] font-bold';
      case 'Buy':
        return 'bg-[#20a28a]/80 text-[#00201a] font-bold';
      case 'Neutral':
        return 'bg-[#313441] text-[#c3c5d8]';
      case 'Sell':
        return 'bg-[#da2237]/80 text-[#fff4f3] font-bold';
      case 'Strong Sell':
        return 'bg-[#da2237] text-[#fff4f3] font-bold';
      default:
        return 'bg-[#313441] text-[#c3c5d8]';
    }
  };

  return (
    <div className="bg-[#171b26] rounded border border-[#262a35] overflow-hidden">
      {/* Movers Tabs */}
      <div className="bg-[#1b1f2b] px-3 pt-2 flex items-center justify-between border-b border-[#262a35]">
        <div className="flex items-center gap-4 overflow-x-auto select-none no-scrollbar">
          <button
            onClick={() => setActiveTab('gainers')}
            className={`text-xs font-semibold pb-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'gainers'
                ? 'text-[#dfe2f2] border-[#2962ff]'
                : 'text-[#8d90a2] hover:text-[#dfe2f2] border-transparent'
            }`}
          >
            Top Gainers
          </button>
          <button
            onClick={() => setActiveTab('losers')}
            className={`text-xs font-semibold pb-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'losers'
                ? 'text-[#dfe2f2] border-[#2962ff]'
                : 'text-[#8d90a2] hover:text-[#dfe2f2] border-transparent'
            }`}
          >
            Top Losers
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`text-xs font-semibold pb-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'active'
                ? 'text-[#dfe2f2] border-[#2962ff]'
                : 'text-[#8d90a2] hover:text-[#dfe2f2] border-transparent'
            }`}
          >
            Most Active
          </button>
          <button
            onClick={() => setActiveTab('volume')}
            className={`text-xs font-semibold pb-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'volume'
                ? 'text-[#dfe2f2] border-[#2962ff]'
                : 'text-[#8d90a2] hover:text-[#dfe2f2] border-transparent'
            }`}
          >
            Unusual Volume
          </button>
          <button
            onClick={() => setActiveTab('highs')}
            className={`text-xs font-semibold pb-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'highs'
                ? 'text-[#dfe2f2] border-[#2962ff]'
                : 'text-[#8d90a2] hover:text-[#dfe2f2] border-transparent'
            }`}
          >
            52W Highs
          </button>
        </div>

        <button
          onClick={() => setActiveTab('gainers')}
          className="text-[#b6c4ff] hover:text-[#dfe2f2] text-xs font-medium flex items-center gap-0.5 transition-colors cursor-pointer shrink-0"
        >
          <span>All Movers</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </button>
      </div>

      {/* High-Density Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0a0e19] text-[#8d90a2] text-[10px] font-semibold uppercase tracking-wider border-b border-[#262a35]">
              <th className="py-2 px-3 font-medium">Symbol & Name</th>
              <th className="py-2 px-3 text-right font-medium">Price</th>
              <th className="py-2 px-3 text-right font-medium">Chg $</th>
              <th className="py-2 px-3 text-right font-medium">Chg %</th>
              <th className="py-2 px-3 text-right font-medium">Volume</th>
              <th className="py-2 px-3 text-right font-medium">Mkt Cap</th>
              <th className="py-2 px-3 text-center font-medium">Tech Rating</th>
              <th className="py-2 px-3 text-right font-medium">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f2330] font-data-mono text-xs">
            {movers.map((row) => {
              const isPositive = row.change >= 0;
              const isSelected = selectedSymbol === row.symbol;

              return (
                <tr
                  key={row.symbol}
                  onClick={() => onSelectStock(row)}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#262a35]'
                      : 'hover:bg-[#1b1f2b]'
                  }`}
                >
                  {/* Symbol & Name */}
                  <td className="py-2 px-3 font-sans">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                          backgroundColor: row.avatarBg,
                          color: row.avatarColor,
                        }}
                      >
                        {row.initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#dfe2f2] group-hover:text-[#2962ff]">
                          {row.symbol}
                        </span>
                        <span className="text-[11px] text-[#8d90a2] truncate max-w-[130px]">
                          {row.name}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-2 px-3 text-right font-semibold text-[#dfe2f2]">
                    ${row.price.toFixed(2)}
                  </td>

                  {/* Change $ */}
                  <td
                    className={`py-2 px-3 text-right font-medium ${
                      isPositive ? 'text-[#66dabf]' : 'text-[#ffb3b0]'
                    }`}
                  >
                    {isPositive ? '+' : ''}${row.change.toFixed(2)}
                  </td>

                  {/* Change % */}
                  <td className="py-2 px-3 text-right">
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold text-[11px] ${
                        isPositive
                          ? 'bg-[#20a28a]/20 text-[#66dabf]'
                          : 'bg-[#da2237]/20 text-[#ffb3b0]'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {row.changePercent.toFixed(2)}%
                    </span>
                  </td>

                  {/* Volume */}
                  <td className="py-2 px-3 text-right text-[#c3c5d8]">
                    {row.volume}
                  </td>

                  {/* Market Cap */}
                  <td className="py-2 px-3 text-right text-[#c3c5d8]">
                    {row.marketCap}
                  </td>

                  {/* Technical Rating */}
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider inline-block ${getRatingBadge(
                        row.rating
                      )}`}
                    >
                      {row.rating}
                    </span>
                  </td>

                  {/* Trend Sparkline */}
                  <td className="py-2 px-3 text-right">
                    <svg className="w-16 h-4 inline-block" fill="none" viewBox="0 0 64 16">
                      <path
                        d={
                          isPositive
                            ? 'M0,14 L15,10 L30,12 L45,4 L64,1'
                            : 'M0,4 L20,6 L35,11 L50,9 L64,13'
                        }
                        stroke={isPositive ? '#20a28a' : '#da2237'}
                        strokeLinecap="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
