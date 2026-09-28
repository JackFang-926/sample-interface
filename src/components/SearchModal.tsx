import React, { useState, useEffect } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string, name: string) => void;
}

const SEARCH_CATALOG = [
  { symbol: 'SPX', name: 'S&P 500 Index', type: 'INDEX', exchange: 'CBOE', price: '5,912.40' },
  { symbol: 'NDX', name: 'NASDAQ 100 Index', type: 'INDEX', exchange: 'NASDAQ', price: '20,845.10' },
  { symbol: 'DJI', name: 'Dow Jones Industrial Average', type: 'INDEX', exchange: 'DJIA', price: '43,870.20' },
  { symbol: 'RUT', name: 'Russell 2000 Index', type: 'INDEX', exchange: 'RUSSELL', price: '2,340.50' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'STOCK', exchange: 'NASDAQ', price: '142.80' },
  { symbol: 'TSLA', name: 'Tesla Inc', type: 'STOCK', exchange: 'NASDAQ', price: '345.10' },
  { symbol: 'PLTR', name: 'Palantir Technologies', type: 'STOCK', exchange: 'NYSE', price: '64.80' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', type: 'STOCK', exchange: 'NASDAQ', price: '154.20' },
  { symbol: 'AAPL', name: 'Apple Inc', type: 'STOCK', exchange: 'NASDAQ', price: '231.40' },
  { symbol: 'MSFT', name: 'Microsoft Corp', type: 'STOCK', exchange: 'NASDAQ', price: '428.90' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', type: 'STOCK', exchange: 'NASDAQ', price: '208.50' },
  { symbol: 'META', name: 'Meta Platforms Inc', type: 'STOCK', exchange: 'NASDAQ', price: '612.40' },
  { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', type: 'CRYPTO', exchange: 'COINBASE', price: '96,480.00' },
  { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', type: 'CRYPTO', exchange: 'COINBASE', price: '3,640.20' },
  { symbol: 'EURUSD', name: 'Euro / US Dollar', type: 'FOREX', exchange: 'FX', price: '1.0520' },
  { symbol: 'GOLD', name: 'Gold Futures', type: 'COMMOD', exchange: 'COMEX', price: '2,684.50' },
  { symbol: 'USOIL', name: 'WTI Crude Oil', type: 'COMMOD', exchange: 'NYMEX', price: '69.80' },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'STOCK' | 'INDEX' | 'CRYPTO' | 'FOREX'>('ALL');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose(); // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = SEARCH_CATALOG.filter((item) => {
    const matchesFilter = activeFilter === 'ALL' || item.type === activeFilter;
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#1e222d] border border-[#363a45] rounded-lg shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-[#2a2e39] flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[20px] text-[#8d90a2]">search</span>
          <input
            type="text"
            autoFocus
            placeholder="Search markets, stocks, crypto, forex..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[#dfe2f2] placeholder-[#8d90a2] text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-[#8d90a2] hover:text-[#dfe2f2] p-1 rounded hover:bg-[#2a2e39] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-3 py-2 bg-[#171b26] border-b border-[#2a2e39] flex items-center gap-1.5 overflow-x-auto text-xs">
          {(['ALL', 'STOCK', 'INDEX', 'CRYPTO', 'FOREX'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer transition-colors ${
                activeFilter === filter
                  ? 'bg-[#2962ff] text-white'
                  : 'bg-[#262a35] text-[#8d90a2] hover:text-[#dfe2f2]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-[#262a35]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-[#8d90a2] text-sm">
              No matching financial instruments found for "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.symbol}
                onClick={() => {
                  onSelectSymbol(item.symbol, item.name);
                  onClose();
                }}
                className="p-3 hover:bg-[#2a2e39] flex items-center justify-between cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-[#dfe2f2] group-hover:text-[#2962ff]">
                    {item.symbol}
                  </span>
                  <span className="text-xs text-[#8d90a2] truncate max-w-xs">{item.name}</span>
                </div>

                <div className="flex items-center gap-2 font-data-mono text-xs">
                  <span className="bg-[#171b26] text-[#8d90a2] px-1.5 py-0.5 rounded text-[10px] font-semibold">
                    {item.exchange}
                  </span>
                  <span className="text-[#dfe2f2] font-semibold">{item.price}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-2 bg-[#171b26] border-t border-[#2a2e39] text-[11px] text-[#8d90a2] flex items-center justify-between">
          <span>Navigate with mouse or click symbol to load in chart</span>
          <span className="font-data-mono text-[10px]">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
