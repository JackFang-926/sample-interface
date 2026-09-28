import React, { useState } from 'react';
import { CandleData } from '../types/market';
import { SPX_CANDLES } from '../data/mockMarketData';

interface InteractiveChartProps {
  activeSymbol: string;
  activeSymbolSubtitle?: string;
  currentPrice?: number;
  openPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  volumeDisplay?: string;
  onOpenOrderModal?: () => void;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  activeSymbol = 'SPX',
  activeSymbolSubtitle = 'S&P 500 Index · CBOE',
  currentPrice = 5912.40,
  openPrice = 5898.10,
  highPrice = 5920.10,
  lowPrice = 5885.30,
  volumeDisplay = '2.41B',
  onOpenOrderModal,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('15m');
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const timeframes = ['1m', '5m', '15m', '1h', '1D'];

  // Map 14 mock candles to chart coordinates (width 700, height 220)
  // X values spaced from ~30 to ~630
  const candleCoordinates = [
    { x: 30, wickTop: 130, wickBottom: 185, bodyTop: 145, bodyHeight: 30, bull: true },
    { x: 75, wickTop: 120, wickBottom: 165, bodyTop: 130, bodyHeight: 25, bull: true },
    { x: 120, wickTop: 125, wickBottom: 175, bodyTop: 135, bodyHeight: 22, bull: false },
    { x: 165, wickTop: 100, wickBottom: 155, bodyTop: 110, bodyHeight: 32, bull: true },
    { x: 210, wickTop: 80, wickBottom: 135, bodyTop: 90, bodyHeight: 30, bull: true },
    { x: 255, wickTop: 95, wickBottom: 150, bodyTop: 105, bodyHeight: 28, bull: false },
    { x: 300, wickTop: 110, wickBottom: 160, bodyTop: 120, bodyHeight: 26, bull: false },
    { x: 345, wickTop: 85, wickBottom: 140, bodyTop: 95, bodyHeight: 30, bull: true },
    { x: 390, wickTop: 60, wickBottom: 115, bodyTop: 70, bodyHeight: 32, bull: true },
    { x: 435, wickTop: 75, wickBottom: 120, bodyTop: 80, bodyHeight: 24, bull: false },
    { x: 480, wickTop: 45, wickBottom: 100, bodyTop: 52, bodyHeight: 36, bull: true },
    { x: 525, wickTop: 30, wickBottom: 85, bodyTop: 38, bodyHeight: 34, bull: true },
    { x: 570, wickTop: 40, wickBottom: 85, bodyTop: 44, bodyHeight: 22, bull: false },
    { x: 615, wickTop: 18, wickBottom: 65, bodyTop: 24, bodyHeight: 30, bull: true },
  ];

  const volumeHeights = [
    { h: '45%', bull: true },
    { h: '60%', bull: true },
    { h: '35%', bull: false },
    { h: '70%', bull: true },
    { h: '85%', bull: true },
    { h: '55%', bull: false },
    { h: '40%', bull: false },
    { h: '65%', bull: true },
    { h: '90%', bull: true },
    { h: '50%', bull: false },
    { h: '75%', bull: true },
    { h: '100%', bull: true },
    { h: '30%', bull: false },
    { h: '80%', bull: true },
  ];

  return (
    <div
      className={`bg-[#171b26] rounded border border-[#262a35] overflow-hidden ${
        isFullscreen ? 'fixed inset-2 z-50 shadow-2xl flex flex-col' : ''
      }`}
    >
      {/* Chart Header Toolbar */}
      <div className="bg-[#1b1f2b] px-3 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-[#262a35]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#dfe2f2]">{activeSymbol}</span>
            <span className="text-[#8d90a2] text-xs hidden sm:inline-block">
              {activeSymbolSubtitle}
            </span>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center gap-0.5 bg-[#171b26] p-0.5 rounded font-data-mono text-xs border border-[#262a35]">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2 py-0.5 rounded transition-colors text-[11px] font-medium cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-[#313441] text-[#dfe2f2] font-semibold'
                    : 'text-[#8d90a2] hover:text-[#dfe2f2]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Indicators & Controls */}
        <div className="flex items-center gap-2">
          <span className="bg-[#262a35] px-2 py-0.5 rounded font-data-mono text-[11px] text-[#66dabf] flex items-center gap-1 border border-[#313441]">
            RSI (14): 58.4
          </span>
          <span className="bg-[#262a35] px-2 py-0.5 rounded font-data-mono text-[11px] text-[#b6c4ff] flex items-center gap-1 border border-[#313441]">
            MACD: Bullish
          </span>

          {/* Quick Trade Trigger Button */}
          {onOpenOrderModal && (
            <button
              onClick={onOpenOrderModal}
              className="bg-[#20a28a] hover:bg-[#00c076] text-[#00201a] px-2.5 py-0.5 rounded text-xs font-bold transition-colors flex items-center gap-1"
              title="Open Quick Order"
            >
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>Trade</span>
            </button>
          )}

          {/* Chart View Toggle */}
          <button
            onClick={() => setChartType(chartType === 'candle' ? 'line' : 'candle')}
            className={`p-1 rounded flex items-center border border-[#313441] transition-colors cursor-pointer ${
              chartType === 'candle'
                ? 'bg-[#313441] text-[#dfe2f2]'
                : 'text-[#8d90a2] hover:text-[#dfe2f2] bg-[#262a35]'
            }`}
            title="Toggle Candlestick / Line Chart"
          >
            <span className="material-symbols-outlined text-[16px]">
              {chartType === 'candle' ? 'candlestick_chart' : 'show_chart'}
            </span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 text-[#8d90a2] hover:text-[#dfe2f2] bg-[#262a35] border border-[#313441] rounded flex items-center transition-colors cursor-pointer"
            title="Expand Fullscreen"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isFullscreen ? 'close_fullscreen' : 'fullscreen'}
            </span>
          </button>
        </div>
      </div>

      {/* Chart Canvas Display Area */}
      <div className="relative w-full h-80 bg-[#0a0e19] p-3 select-none overflow-hidden flex flex-col justify-between">
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <span className="font-sans text-[80px] sm:text-[96px] font-bold text-[#dfe2f2] tracking-tighter">
            {activeSymbol} 500
          </span>
        </div>

        {/* Hover Crosshair Info Box */}
        {hoveredCandle && (
          <div className="absolute top-2 left-3 z-20 bg-[#1b1f2b]/90 backdrop-blur-xs border border-[#313441] px-2.5 py-1 rounded font-data-mono text-[11px] text-[#dfe2f2] flex items-center gap-3 shadow-lg">
            <span>
              Time: <b className="text-[#b6c4ff]">{hoveredCandle.time}</b>
            </span>
            <span>
              O: <b className="text-[#dfe2f2]">{hoveredCandle.open.toFixed(2)}</b>
            </span>
            <span>
              H: <b className="text-[#66dabf]">{hoveredCandle.high.toFixed(2)}</b>
            </span>
            <span>
              L: <b className="text-[#ffb3b0]">{hoveredCandle.low.toFixed(2)}</b>
            </span>
            <span>
              C:{' '}
              <b
                className={
                  hoveredCandle.close >= hoveredCandle.open ? 'text-[#66dabf]' : 'text-[#ffb3b0]'
                }
              >
                {hoveredCandle.close.toFixed(2)}
              </b>
            </span>
            <span>
              Vol: <b className="text-[#c3c5d8]">{(hoveredCandle.volume / 1000).toFixed(0)}K</b>
            </span>
          </div>
        )}

        {/* Candlesticks & Interactive Vectors */}
        <div className="relative w-full h-56">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 700 220">
            {/* Gridlines */}
            <line stroke="#313441" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="700" y1="40" y2="40" />
            <line stroke="#313441" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="700" y1="90" y2="90" />
            <line stroke="#313441" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="700" y1="140" y2="140" />
            <line stroke="#313441" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="700" y1="190" y2="190" />

            {/* Price Level Labels on Y-Axis */}
            <text x="6" y="44" fill="#8d90a2" fontSize="9" fontFamily="JetBrains Mono">
              5,920.00
            </text>
            <text x="6" y="94" fill="#8d90a2" fontSize="9" fontFamily="JetBrains Mono">
              5,910.00
            </text>
            <text x="6" y="144" fill="#8d90a2" fontSize="9" fontFamily="JetBrains Mono">
              5,900.00
            </text>
            <text x="6" y="194" fill="#8d90a2" fontSize="9" fontFamily="JetBrains Mono">
              5,890.00
            </text>

            {/* Candlesticks or Line */}
            {chartType === 'candle' ? (
              candleCoordinates.map((c, i) => {
                const color = c.bull ? '#20a28a' : '#da2237';
                const isHovered = hoverIndex === i;

                return (
                  <g
                    key={i}
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      setHoverIndex(i);
                      setHoveredCandle(SPX_CANDLES[i] || null);
                    }}
                    onMouseLeave={() => {
                      setHoverIndex(null);
                      setHoveredCandle(null);
                    }}
                  >
                    {/* Hover vertical crosshair line */}
                    {isHovered && (
                      <line
                        x1={c.x}
                        x2={c.x}
                        y1="0"
                        y2="220"
                        stroke="#66dabf"
                        strokeDasharray="2,2"
                        strokeWidth="0.75"
                        opacity="0.8"
                      />
                    )}

                    {/* Wick */}
                    <line
                      stroke={color}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      x1={c.x}
                      x2={c.x}
                      y1={c.wickTop}
                      y2={c.wickBottom}
                    />

                    {/* Body */}
                    <rect
                      fill={color}
                      height={c.bodyHeight}
                      rx="1"
                      width={isHovered ? 14 : 12}
                      x={isHovered ? c.x - 7 : c.x - 6}
                      y={c.bodyTop}
                    />
                  </g>
                );
              })
            ) : (
              /* Line chart view */
              <path
                d="M30,160 L75,142 L120,146 L165,126 L210,105 L255,119 L300,133 L345,110 L390,86 L435,92 L480,70 L525,55 L570,55 L615,39"
                fill="none"
                stroke="#2962ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Moving Average Overlays (EMA 20 & EMA 50) */}
            <path
              d="M20,165 C100,140 200,105 320,115 C420,120 520,50 630,28"
              fill="none"
              stroke="#2962ff"
              strokeWidth="1.5"
            />
            <path
              d="M20,175 C120,160 220,135 340,130 C450,125 540,80 630,55"
              fill="none"
              stroke="#ffb3b0"
              strokeDasharray="3,3"
              strokeWidth="1.2"
            />

            {/* Current Price Line Marker */}
            <line
              stroke="#20a28a"
              strokeDasharray="4,4"
              strokeWidth="1"
              x1="0"
              x2="670"
              y1="28"
              y2="28"
            />
          </svg>

          {/* Current Active Price Badge on Right Margin */}
          <div className="absolute right-2 top-[24px] bg-[#20a28a] text-[#00201a] px-2 py-0.5 rounded font-data-mono text-xs font-bold flex items-center gap-1 shadow-md">
            <span>
              {currentPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        {/* Volume Histogram Strip */}
        <div className="w-full flex items-end gap-1.5 h-10 pt-2 opacity-60">
          {volumeHeights.map((v, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-xs transition-opacity hover:opacity-100 ${
                v.bull ? 'bg-[#20a28a]' : 'bg-[#da2237]'
              }`}
              style={{ height: v.h }}
            />
          ))}
        </div>
      </div>

      {/* Chart Bottom Stat Bar */}
      <div className="bg-[#1b1f2b] px-3 py-1.5 flex items-center justify-between font-data-mono text-xs text-[#8d90a2] border-t border-[#262a35]">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <span>
            Open{' '}
            <b className="text-[#dfe2f2]">
              {openPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </b>
          </span>
          <span>
            High{' '}
            <b className="text-[#dfe2f2]">
              {highPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </b>
          </span>
          <span>
            Low{' '}
            <b className="text-[#dfe2f2]">
              {lowPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </b>
          </span>
          <span>
            Vol <b className="text-[#dfe2f2]">{volumeDisplay}</b>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[#66dabf]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#66dabf] animate-ping"></span>
          <span>Update: 2s ago</span>
        </div>
      </div>
    </div>
  );
};
