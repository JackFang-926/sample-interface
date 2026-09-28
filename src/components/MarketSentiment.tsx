import React from 'react';

export const MarketSentiment: React.FC = () => {
  return (
    <div className="bg-[#171b26] rounded border border-[#262a35] p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-[#dfe2f2]">Market Sentiment</span>
        <span className="bg-[#20a28a]/20 text-[#66dabf] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
          Greed
        </span>
      </div>

      {/* Semi-Circular Arc Gauge */}
      <div className="w-full flex flex-col items-center justify-center pt-1">
        <svg className="w-44 h-24 overflow-visible" viewBox="0 0 160 90">
          <defs>
            <linearGradient id="sentimentGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#da2237" />
              <stop offset="35%" stopColor="#ffb3b0" />
              <stop offset="65%" stopColor="#20a28a" />
              <stop offset="100%" stopColor="#66dabf" />
            </linearGradient>
          </defs>

          {/* Meter Background Track */}
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            fill="none"
            stroke="#313441"
            strokeLinecap="round"
            strokeWidth="12"
          />

          {/* Meter Gradient Section */}
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            fill="none"
            stroke="url(#sentimentGradient)"
            strokeDasharray="188.5"
            strokeDashoffset="50"
            strokeLinecap="round"
            strokeWidth="12"
          />

          {/* Needle Indicator pointing at 74 degrees */}
          <line
            x1="80"
            y1="80"
            x2="120"
            y2="40"
            stroke="#dfe2f2"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
          <circle cx="80" cy="80" r="5" fill="#dfe2f2" />
        </svg>

        {/* Big Score Readout */}
        <div className="text-center -mt-4">
          <span className="font-sans text-2xl font-bold text-[#dfe2f2] tracking-tight">
            74
          </span>
          <span className="text-xs text-[#66dabf] block font-semibold">
            Greed Driven
          </span>
        </div>
      </div>

      {/* Historical Shifts Breakdown */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-2 bg-[#1b1f2b] p-2 rounded text-center font-data-mono text-xs border border-[#262a35]">
        <div>
          <span className="text-[#8d90a2] text-[10px] block font-sans">Yesterday</span>
          <span className="text-[#dfe2f2] font-semibold text-xs">68</span>
        </div>
        <div>
          <span className="text-[#8d90a2] text-[10px] block font-sans">Last week</span>
          <span className="text-[#dfe2f2] font-semibold text-xs">61</span>
        </div>
        <div>
          <span className="text-[#8d90a2] text-[10px] block font-sans">Last month</span>
          <span className="text-[#dfe2f2] font-semibold text-xs">52</span>
        </div>
      </div>
    </div>
  );
};
