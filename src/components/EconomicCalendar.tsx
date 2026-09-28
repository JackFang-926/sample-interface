import React, { useState } from 'react';
import { EconomicEvent } from '../types/market';
import { ECONOMIC_EVENTS } from '../data/mockMarketData';

interface EconomicCalendarProps {
  onOpenFullCalendar?: () => void;
}

export const EconomicCalendar: React.FC<EconomicCalendarProps> = ({ onOpenFullCalendar }) => {
  const [onlyHighImpact, setOnlyHighImpact] = useState(false);

  const events = onlyHighImpact
    ? ECONOMIC_EVENTS.filter((e) => e.isHighImpact)
    : ECONOMIC_EVENTS.slice(0, 4);

  const getImpactBadge = (impact: EconomicEvent['impact']) => {
    switch (impact) {
      case 'Critical':
        return 'bg-[#da2237] text-[#fff4f3] font-bold uppercase tracking-wider';
      case 'Bullish':
        return 'bg-[#20a28a]/20 text-[#66dabf] font-semibold';
      case 'Volatile':
        return 'bg-[#2962ff]/20 text-[#b6c4ff] font-semibold';
      case 'Medium':
        return 'bg-[#313441] text-[#c3c5d8]';
      default:
        return 'bg-[#313441] text-[#c3c5d8]';
    }
  };

  return (
    <div className="bg-[#171b26] rounded border border-[#262a35] p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#2962ff]">
            calendar_month
          </span>
          <span className="text-sm font-bold text-[#dfe2f2]">Economic Calendar</span>
        </div>

        {/* High Impact Toggle */}
        <button
          onClick={() => setOnlyHighImpact(!onlyHighImpact)}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
            onlyHighImpact
              ? 'bg-[#da2237]/20 border-[#da2237] text-[#ffb3b0]'
              : 'bg-[#1b1f2b] border-[#313441] text-[#8d90a2] hover:text-[#dfe2f2]'
          }`}
          title="Toggle High Impact Only"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#da2237]" />
          <span>High Impact</span>
        </button>
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-2 font-data-mono text-xs">
        {events.map((ev) => {
          const isCritical = ev.impact === 'Critical';

          return (
            <div
              key={ev.id}
              className={`bg-[#1b1f2b] hover:bg-[#202534] p-2.5 rounded transition-colors border ${
                isCritical
                  ? 'border-l-2 border-l-[#da2237] border-t-transparent border-r-transparent border-b-transparent'
                  : 'border-[#262a35]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className={`font-bold ${isCritical ? 'text-[#ffb3b0]' : 'text-[#8d90a2]'}`}
                  >
                    {ev.time}
                  </span>
                  <span className="bg-[#313441] px-1 rounded text-[#dfe2f2] text-[10px] font-semibold">
                    {ev.currency}
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#dfe2f2] truncate">
                    {ev.title}
                  </span>
                </div>
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${getImpactBadge(ev.impact)}`}>
                  {ev.impact}
                </span>
              </div>

              {/* Data Triad: Act / Fcst / Prior */}
              <div className="grid grid-cols-3 gap-1 mt-2 text-[11px] text-[#8d90a2]">
                <div>
                  Act:{' '}
                  <span
                    className={`font-bold ${
                      ev.actual !== '--' ? 'text-[#66dabf]' : 'text-[#8d90a2]'
                    }`}
                  >
                    {ev.actual}
                  </span>
                </div>
                <div>
                  Fcst: <span className="text-[#dfe2f2] font-medium">{ev.forecast}</span>
                </div>
                <div>
                  Prior: <span>{ev.prior}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Link to view full calendar */}
      <button
        onClick={onOpenFullCalendar}
        className="mt-3 inline-flex items-center gap-1 text-[#b6c4ff] hover:text-[#dfe2f2] text-xs font-medium transition-colors cursor-pointer"
      >
        <span>View full calendar</span>
        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
      </button>
    </div>
  );
};
