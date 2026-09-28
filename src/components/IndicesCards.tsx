import React from 'react';
import { MarketIndex } from '../types/market';

interface IndicesCardsProps {
  indices: MarketIndex[];
  selectedIndex: string;
  onSelectIndex: (symbol: string) => void;
}

export const IndicesCards: React.FC<IndicesCardsProps> = ({
  indices,
  selectedIndex,
  onSelectIndex,
}) => {
  return (
    <section className="w-full px-4 py-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {indices.map((idx) => {
          const isSelected = selectedIndex === idx.symbol;
          const isPositive = idx.change >= 0;

          return (
            <div
              key={idx.symbol}
              onClick={() => onSelectIndex(idx.symbol)}
              className={`bg-[#171b26] hover:bg-[#1b1f2b] p-3 rounded transition-all group cursor-pointer border ${
                isSelected
                  ? 'border-[#2962ff] shadow-[0_0_12px_rgba(41,98,255,0.25)]'
                  : 'border-[#262a35] hover:border-[#363a45]'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#dfe2f2]">{idx.symbol}</span>
                  <span className="bg-[#313441] px-1.5 py-0.5 rounded text-[#8d90a2] text-[10px] font-semibold uppercase tracking-wider">
                    {idx.category}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#c3c5d8] opacity-0 group-hover:opacity-100 transition-opacity">
                  open_in_new
                </span>
              </div>

              {/* Price & Change */}
              <div className="flex items-baseline justify-between mt-2">
                <span className="font-sans text-2xl text-[#dfe2f2] tracking-tight font-bold">
                  {idx.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <div
                  className={`flex items-center gap-0.5 font-data-mono text-xs px-1.5 py-0.5 rounded font-semibold ${
                    isPositive
                      ? 'text-[#66dabf] bg-[#20a28a]/20'
                      : 'text-[#ffb3b0] bg-[#da2237]/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isPositive ? 'arrow_drop_up' : 'arrow_drop_down'}
                  </span>
                  <span>
                    {isPositive ? '+' : ''}
                    {idx.change.toFixed(2)} ({isPositive ? '+' : ''}
                    {idx.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              {/* Sparkline Area SVG */}
              <div className="w-full h-12 mt-2">
                <svg className="w-full h-full" fill="none" viewBox="0 0 200 48" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`grad-${idx.symbol.replace(/\s+/g, '')}`} x1="0" x2="0" y1="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={isPositive ? '#20a28a' : '#da2237'}
                        stopOpacity="0.35"
                      />
                      <stop
                        offset="100%"
                        stopColor={isPositive ? '#20a28a' : '#da2237'}
                        stopOpacity="0.0"
                      />
                    </linearGradient>
                  </defs>

                  {idx.symbol === 'S&P 500' && (
                    <>
                      <path
                        d="M0,38 C20,36 35,42 55,30 C75,18 90,26 110,16 C130,6 150,22 170,12 C185,4 195,8 200,6 L200,48 L0,48 Z"
                        fill={`url(#grad-${idx.symbol.replace(/\s+/g, '')})`}
                      />
                      <path
                        d="M0,38 C20,36 35,42 55,30 C75,18 90,26 110,16 C130,6 150,22 170,12 C185,4 195,8 200,6"
                        stroke="#20a28a"
                        strokeLinecap="round"
                        strokeWidth="1.75"
                      />
                    </>
                  )}

                  {idx.symbol === 'NASDAQ 100' && (
                    <>
                      <path
                        d="M0,40 C25,38 45,44 70,24 C95,4 115,20 140,10 C165,0 180,14 200,4 L200,48 L0,48 Z"
                        fill={`url(#grad-${idx.symbol.replace(/\s+/g, '')})`}
                      />
                      <path
                        d="M0,40 C25,38 45,44 70,24 C95,4 115,20 140,10 C165,0 180,14 200,4"
                        stroke="#20a28a"
                        strokeLinecap="round"
                        strokeWidth="1.75"
                      />
                    </>
                  )}

                  {idx.symbol === 'Dow Jones' && (
                    <>
                      <path
                        d="M0,10 C30,12 50,8 80,26 C110,44 140,24 170,36 C185,42 195,44 200,40 L200,48 L0,48 Z"
                        fill={`url(#grad-${idx.symbol.replace(/\s+/g, '')})`}
                      />
                      <path
                        d="M0,10 C30,12 50,8 80,26 C110,44 140,24 170,36 C185,42 195,44 200,40"
                        stroke="#da2237"
                        strokeLinecap="round"
                        strokeWidth="1.75"
                      />
                    </>
                  )}

                  {idx.symbol === 'Russell 2000' && (
                    <>
                      <path
                        d="M0,32 C30,34 50,18 80,22 C110,26 130,8 160,14 C175,17 190,6 200,4 L200,48 L0,48 Z"
                        fill={`url(#grad-${idx.symbol.replace(/\s+/g, '')})`}
                      />
                      <path
                        d="M0,32 C30,34 50,18 80,22 C110,26 130,8 160,14 C175,17 190,6 200,4"
                        stroke="#20a28a"
                        strokeLinecap="round"
                        strokeWidth="1.75"
                      />
                    </>
                  )}
                </svg>
              </div>

              {/* Low & High Range */}
              <div className="flex items-center justify-between mt-1 font-data-mono text-[11px] text-[#8d90a2]">
                <span>
                  L:{' '}
                  <span className="text-[#c3c5d8]">
                    {idx.low.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </span>
                <span>
                  H:{' '}
                  <span className="text-[#c3c5d8]">
                    {idx.high.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
