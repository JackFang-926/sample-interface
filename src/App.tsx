import React, { useState, useEffect } from 'react';
import { MarketIndex, StockMover, AssetPulse, NewsStory } from './types/market';
import { INITIAL_INDICES } from './data/mockMarketData';
import { Header } from './components/Header';
import { IndicesCards } from './components/IndicesCards';
import { InteractiveChart } from './components/InteractiveChart';
import { MarketMoversTable } from './components/MarketMoversTable';
import { SectorPerformance } from './components/SectorPerformance';
import { GlobalAssetPulse } from './components/GlobalAssetPulse';
import { EconomicCalendar } from './components/EconomicCalendar';
import { MarketSentiment } from './components/MarketSentiment';
import { TopStories } from './components/TopStories';
import { CommandTray } from './components/CommandTray';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { OrderModal } from './components/OrderModal';
import { NewsModal } from './components/NewsModal';
import { CalendarModal } from './components/CalendarModal';

export default function App() {
  const [indices, setIndices] = useState<MarketIndex[]>(INITIAL_INDICES);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('SPX');
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>('S&P 500 Index · CBOE');
  const [currentPrice, setCurrentPrice] = useState<number>(5912.40);
  const [openPrice, setOpenPrice] = useState<number>(5898.10);
  const [highPrice, setHighPrice] = useState<number>(5920.10);
  const [lowPrice, setLowPrice] = useState<number>(5885.30);
  const [volumeDisplay, setVolumeDisplay] = useState<string>('2.41B');

  // Interactive controls
  const [selectedRegion, setSelectedRegion] = useState<string>('US');
  const [selectedRange, setSelectedRange] = useState<string>('1D');
  const [activeNav, setActiveNav] = useState<string>('Markets');
  const [activeSubNav, setActiveSubNav] = useState<string>('Overview');
  const [layoutMode, setLayoutMode] = useState<string>('Quad-Grid');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<NewsStory | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle selecting an Index from hero cards or ticker bar
  const handleSelectIndex = (symbolName: string) => {
    if (symbolName.includes('S&P') || symbolName === 'SPX') {
      setSelectedSymbol('SPX');
      setSelectedSubtitle('S&P 500 Index · CBOE');
      setCurrentPrice(5912.40);
      setOpenPrice(5898.10);
      setHighPrice(5920.10);
      setLowPrice(5885.30);
      setVolumeDisplay('2.41B');
    } else if (symbolName.includes('NASDAQ')) {
      setSelectedSymbol('NDX');
      setSelectedSubtitle('NASDAQ 100 Index · CME');
      setCurrentPrice(20845.10);
      setOpenPrice(20695.50);
      setHighPrice(20875.90);
      setLowPrice(20680.40);
      setVolumeDisplay('4.82B');
    } else if (symbolName.includes('Dow') || symbolName.includes('DOW')) {
      setSelectedSymbol('DJI');
      setSelectedSubtitle('Dow Jones Industrial Average · NYSE');
      setCurrentPrice(43870.20);
      setOpenPrice(43936.00);
      setHighPrice(44015.30);
      setLowPrice(43810.10);
      setVolumeDisplay('1.15B');
    } else if (symbolName.includes('Russell')) {
      setSelectedSymbol('RUT');
      setSelectedSubtitle('Russell 2000 Index · CBOE');
      setCurrentPrice(2340.50);
      setOpenPrice(2321.80);
      setHighPrice(2345.80);
      setLowPrice(2318.20);
      setVolumeDisplay('890M');
    }
  };

  // Handle selecting stock from mover table
  const handleSelectStock = (stock: StockMover) => {
    setSelectedSymbol(stock.symbol);
    setSelectedSubtitle(`${stock.name} · Common Stock`);
    setCurrentPrice(stock.price);
    setOpenPrice(stock.price - stock.change);
    setHighPrice(stock.price * 1.015);
    setLowPrice(stock.price * 0.985);
    setVolumeDisplay(stock.volume);
    showToast(`Loaded ${stock.symbol} into interactive chart`);
  };

  // Handle selecting asset from pulse
  const handleSelectAsset = (asset: AssetPulse) => {
    const parsedPrice = parseFloat(asset.price.replace(/,/g, '')) || 100;
    setSelectedSymbol(asset.symbol);
    setSelectedSubtitle(`${asset.category} Real-Time Asset`);
    setCurrentPrice(parsedPrice);
    setOpenPrice(parsedPrice * 0.99);
    setHighPrice(parsedPrice * 1.012);
    setLowPrice(parsedPrice * 0.988);
    setVolumeDisplay('1.2B');
    showToast(`Loaded ${asset.symbol} into interactive chart`);
  };

  // Search selection
  const handleSelectFromSearch = (symbol: string, name: string) => {
    setSelectedSymbol(symbol);
    setSelectedSubtitle(`${name}`);
    showToast(`Loaded ${symbol} into active chart workspace`);
  };

  // Refresh All Panes action
  const handleRefreshAll = () => {
    // Simulate slight micro ticks
    setIndices((prev) =>
      prev.map((idx) => {
        const delta = (Math.random() - 0.48) * 1.5;
        const newPrice = Number((idx.price + delta).toFixed(2));
        return {
          ...idx,
          price: newPrice,
          change: Number((idx.change + delta).toFixed(2)),
        };
      })
    );
    showToast('Market feeds re-synchronized across NYSE, NASDAQ, CME & ICE');
  };

  // Order Placement
  const handleOrderPlaced = (order: {
    side: 'BUY' | 'SELL';
    quantity: number;
    symbol: string;
    price: number;
  }) => {
    showToast(
      `Executed ${order.side} ${order.quantity} ${order.symbol} @ $${order.price.toFixed(2)}`
    );
  };

  return (
    <div className="bg-[#0f131e] text-[#dfe2f2] min-h-screen flex flex-col font-sans select-none antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-12 right-4 z-50 bg-[#1e222d] border border-[#20a28a] text-[#dfe2f2] px-4 py-2.5 rounded shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#66dabf] animate-ping" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Header with Fixed Multi-Tier Bar */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        activeSubNav={activeSubNav}
        setActiveSubNav={setActiveSubNav}
        indices={indices}
        onSelectIndex={handleSelectIndex}
      />

      {/* Main Container - Padded for Fixed Header (120px) */}
      <main className="w-full pt-[120px] bg-[#0f131e] min-h-screen flex-1">
        <div className="flex flex-col w-full text-[#dfe2f2]">
          {/* Top Command & Header Bar */}
          <section className="w-full bg-[#0a0e19] px-4 py-3 border-b border-[#1b1f2b]">
            <div className="w-full flex flex-col xl:flex-row xl:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl sm:text-2xl text-[#dfe2f2] font-bold tracking-tight">
                    Markets today
                  </h1>
                  <span className="bg-[#262a35] px-2.5 py-0.5 rounded text-[#66dabf] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 border border-[#313441]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#66dabf] animate-pulse"></span>
                    Real-time feed
                  </span>
                </div>
                <p className="text-xs text-[#c3c5d8] max-w-3xl">
                  Track global financial markets in real time, explore macroeconomic trajectories,
                  sector performance, and top asset movers.
                </p>
              </div>

              {/* Controls: Region, Timeframe, Market State */}
              <div className="flex flex-wrap items-center gap-3 self-start xl:self-auto">
                {/* Region Tabs (Pill Style) */}
                <div className="bg-[#1b1f2b] p-0.5 rounded border border-[#262a35] flex items-center">
                  {(['US', 'Europe', 'Asia', 'Americas', 'Global'] as const).map((reg) => (
                    <button
                      key={reg}
                      onClick={() => {
                        setSelectedRegion(reg);
                        showToast(`Switched market region focus to ${reg}`);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                        selectedRegion === reg
                          ? 'bg-[#262a35] text-[#dfe2f2] font-semibold'
                          : 'text-[#8d90a2] hover:text-[#dfe2f2]'
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>

                {/* Range Pills */}
                <div className="bg-[#1b1f2b] p-0.5 rounded border border-[#262a35] flex items-center">
                  {(['1D', '5D', '1M', 'YTD', '1Y', 'ALL'] as const).map((rng) => (
                    <button
                      key={rng}
                      onClick={() => {
                        setSelectedRange(rng);
                        showToast(`Displaying ${rng} market performance`);
                      }}
                      className={`px-2 py-0.5 rounded font-data-mono text-[11px] transition-colors cursor-pointer ${
                        selectedRange === rng
                          ? 'bg-[#2962ff] text-white font-semibold'
                          : 'text-[#8d90a2] hover:text-[#dfe2f2]'
                      }`}
                    >
                      {rng}
                    </button>
                  ))}
                </div>

                {/* Market Status Banner */}
                <div className="flex items-center gap-2 bg-[#1b1f2b] border border-[#262a35] px-2.5 py-1 rounded text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#66dabf] shadow-[0_0_8px_rgba(102,218,191,0.6)]"></span>
                  <span className="text-[#dfe2f2] font-medium">Markets open</span>
                  <span className="text-[#434656]">·</span>
                  <span className="text-[#c3c5d8]">Closes in 3h 42m</span>
                </div>
              </div>
            </div>
          </section>

          {/* Hero Indices 4-Card Grid */}
          <IndicesCards
            indices={indices}
            selectedIndex={selectedSymbol === 'SPX' ? 'S&P 500' : selectedSymbol}
            onSelectIndex={handleSelectIndex}
          />

          {/* Main Content Split Grid: 8 Cols Main / 4 Cols Sidebar */}
          <div className="w-full px-4 py-2 grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* LEFT MAIN COLUMN (8 COLS) */}
            <div
              className={`flex flex-col gap-3 ${
                layoutMode === 'Focus Chart'
                  ? 'lg:col-span-12'
                  : layoutMode === 'Movers Focus'
                  ? 'lg:col-span-12'
                  : 'lg:col-span-8'
              }`}
            >
              {/* Section A: Interactive Mini TradingView Candlestick Chart Pane */}
              {layoutMode !== 'Movers Focus' && (
                <InteractiveChart
                  activeSymbol={selectedSymbol}
                  activeSymbolSubtitle={selectedSubtitle}
                  currentPrice={currentPrice}
                  openPrice={openPrice}
                  highPrice={highPrice}
                  lowPrice={lowPrice}
                  volumeDisplay={volumeDisplay}
                  onOpenOrderModal={() => setIsOrderModalOpen(true)}
                />
              )}

              {/* Section B: Market Movers High-Density Table */}
              <MarketMoversTable
                onSelectStock={handleSelectStock}
                selectedSymbol={selectedSymbol}
              />

              {/* Section C: S&P 500 Sector Performance */}
              <SectorPerformance
                onSelectSector={(sec) => showToast(`Filtered sector constituents for ${sec}`)}
              />

              {/* Section D: World Markets & Currencies Snapshot */}
              <GlobalAssetPulse onSelectAsset={handleSelectAsset} />
            </div>

            {/* RIGHT SIDEBAR COLUMN (4 COLS) */}
            {layoutMode !== 'Focus Chart' && layoutMode !== 'Movers Focus' && (
              <div className="lg:col-span-4 flex flex-col gap-3">
                {/* Sidebar Module A: Economic Calendar */}
                <EconomicCalendar onOpenFullCalendar={() => setIsCalendarModalOpen(true)} />

                {/* Sidebar Module B: Fear & Greed Sentiment Meter */}
                <MarketSentiment />

                {/* Sidebar Module C: Top Market News & Stories */}
                <TopStories
                  onSelectStory={(story) => setSelectedStory(story)}
                  onViewAllStories={() => setSelectedStory(null)}
                />
              </div>
            )}
          </div>

          {/* Bottom Command Tray */}
          <CommandTray
            onRefreshAll={handleRefreshAll}
            layoutMode={layoutMode}
            onChangeLayout={(mode) => {
              setLayoutMode(mode);
              showToast(`Terminal layout switched to ${mode}`);
            }}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSymbol={handleSelectFromSearch}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        symbol={selectedSymbol}
        price={currentPrice}
        onOrderPlaced={handleOrderPlaced}
      />

      <NewsModal story={selectedStory} onClose={() => setSelectedStory(null)} />

      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />
    </div>
  );
}
