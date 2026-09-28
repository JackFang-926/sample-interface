import React from 'react';
import { ECONOMIC_EVENTS } from '../data/mockMarketData';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-[#1e222d] border border-[#363a45] rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-3 bg-[#171b26] border-b border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#2962ff]">
              calendar_month
            </span>
            <span className="font-bold text-sm text-[#dfe2f2]">
              Global Macro Economic Calendar
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8d90a2] hover:text-[#dfe2f2] p-1 rounded hover:bg-[#2a2e39] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Calendar Table */}
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-left border-collapse font-data-mono text-xs">
            <thead>
              <tr className="bg-[#0a0e19] text-[#8d90a2] text-[10px] uppercase font-semibold border-b border-[#262a35]">
                <th className="p-3">Time</th>
                <th className="p-3">Cur</th>
                <th className="p-3 font-sans">Event</th>
                <th className="p-3 text-right">Actual</th>
                <th className="p-3 text-right">Forecast</th>
                <th className="p-3 text-right">Prior</th>
                <th className="p-3 text-center">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262a35]">
              {ECONOMIC_EVENTS.map((ev) => (
                <tr key={ev.id} className="hover:bg-[#262a35] transition-colors">
                  <td className="p-3 text-[#c3c5d8] font-bold">{ev.time}</td>
                  <td className="p-3">
                    <span className="bg-[#171b26] px-1.5 py-0.5 rounded text-[10px] text-[#dfe2f2] font-semibold border border-[#313441]">
                      {ev.currency}
                    </span>
                  </td>
                  <td className="p-3 font-sans text-[#dfe2f2] font-semibold">{ev.title}</td>
                  <td className="p-3 text-right font-bold text-[#66dabf]">{ev.actual}</td>
                  <td className="p-3 text-right text-[#dfe2f2]">{ev.forecast}</td>
                  <td className="p-3 text-right text-[#8d90a2]">{ev.prior}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider inline-block ${
                        ev.impact === 'Critical'
                          ? 'bg-[#da2237] text-white'
                          : ev.impact === 'Bullish'
                          ? 'bg-[#20a28a]/20 text-[#66dabf]'
                          : ev.impact === 'Volatile'
                          ? 'bg-[#2962ff]/20 text-[#b6c4ff]'
                          : 'bg-[#313441] text-[#c3c5d8]'
                      }`}
                    >
                      {ev.impact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#171b26] border-t border-[#2a2e39] flex items-center justify-between text-xs text-[#8d90a2]">
          <span>Data updated live from Bureau of Labor Statistics & Federal Reserve</span>
          <button
            onClick={onClose}
            className="bg-[#262a35] hover:bg-[#313441] text-[#dfe2f2] px-3 py-1.5 rounded transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
