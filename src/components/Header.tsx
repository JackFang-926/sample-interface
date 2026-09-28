import React, { useState, useEffect } from 'react';
import { MarketIndex } from '../types/market';

interface HeaderProps {
  onOpenSearch: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  activeSubNav: string;
  setActiveSubNav: (nav: string) => void;
  indices: MarketIndex[];
  onSelectIndex: (symbol: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  activeNav,
  setActiveNav,
  activeSubNav,
  setActiveSubNav,
  indices,
  onSelectIndex,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  // Periodic subtle tick pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseKey((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const topNavItems = ['Products', 'Community', 'Markets', 'News', 'Brokers', 'More'];
  const subNavItems = [
    'Overview',
    'Countries',
    'Indices',
    'Stocks',
    'Crypto',
    'Forex',
    'Futures',
    'Bonds',
    'Economy',
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#171b26] shadow-[0_1px_8px_rgba(0,0,0,0.45)] border-b border-[#2a2e39]">
      {/* Tier 1: Main Header Bar */}
      <div className="h-12 w-full px-4 flex items-center justify-between gap-3">
        {/* Brand & Search */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            onClick={() => {
              setActiveNav('Markets');
              setActiveSubNav('Overview');
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              alt="TradingView Logo"
              className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UL6ZLYmJdF8Xao22oSgFIU3AZa44Jr8MxI-de8CbvGSS2UAvCN8nxYlc7fK5DfEhje1dwUPewgumNi-hOZ1h9pkgcFH7zCCFZn2LSTPqJ9t8bgJ7ggFqXpoHUa6f2uvSp3HxULlV5j_h3YtL5VmFq7IiiptbcX7iXZjeEVbCGGfA3Xq671QacQkUSd58tJ7SwEfiU5NIm8WecGbLINCQyuIdVPWs_isb7OxwHnF5zsDETe7IyXAGQFV4MF"
            />
            <span className="text-sm text-[#dfe2f2] font-bold tracking-tight hidden sm:inline-block">
              TradingView
            </span>
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-[#1b1f2b] border border-[#313441] hover:border-[#434656] px-2.5 py-1.5 rounded text-[#c3c5d8] hover:text-[#dfe2f2] transition-colors cursor-pointer text-xs"
            title="Search (Ctrl+K)"
          >
            <span className="material-symbols-outlined text-[16px] text-[#8d90a2]">search</span>
            <span className="hidden lg:inline-block">Search markets, stocks, crypto</span>
            <span className="font-data-mono text-[10px] bg-[#313441] px-1.5 py-0.5 rounded text-[#c3c5d8]">
              Ctrl+K
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-4 shrink-0">
          {topNavItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#dfe2f2] font-semibold border-b-2 border-[#2962ff] pb-0.5'
                    : 'text-[#c3c5d8] hover:text-[#dfe2f2]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageModal(!showLanguageModal)}
              className="p-1.5 text-[#c3c5d8] hover:text-[#dfe2f2] hover:bg-[#262a35] rounded transition-colors flex items-center"
              title="Select Language / Region"
            >
              <span className="material-symbols-outlined text-[18px]">language</span>
            </button>
            {showLanguageModal && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1e222d] border border-[#363a45] rounded shadow-xl py-1 z-50 text-xs">
                <div className="px-3 py-1.5 font-bold text-[#c3c5d8] uppercase text-[10px] tracking-wider border-b border-[#2a2e39]">
                  Region & Language
                </div>
                {['English (US)', 'English (UK)', 'Español', 'Deutsch', 'Français', '日本語'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setShowLanguageModal(false)}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#2a2e39] text-[#dfe2f2] transition-colors"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 text-[#c3c5d8] hover:text-[#dfe2f2] hover:bg-[#262a35] rounded transition-colors flex items-center"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#da2237] animate-pulse"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-[#1e222d] border border-[#363a45] rounded shadow-xl p-2 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#2a2e39] mb-2 font-bold text-[#dfe2f2]">
                  <span>Market Alerts</span>
                  <span className="text-[10px] text-[#66dabf] font-normal">Real-time</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="p-2 bg-[#171b26] rounded border border-[#2a2e39]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#dfe2f2]">
                      <span>NVDA +4.2% Breakout</span>
                      <span className="text-[#8d90a2] text-[10px]">Just now</span>
                    </div>
                    <p className="text-[11px] text-[#c3c5d8] mt-0.5">
                      New all-time intraday high at $142.80.
                    </p>
                  </div>
                  <div className="p-2 bg-[#171b26] rounded border border-[#2a2e39]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#dfe2f2]">
                      <span>FOMC Announcement</span>
                      <span className="text-[#8d90a2] text-[10px]">14:00 EST</span>
                    </div>
                    <p className="text-[11px] text-[#c3c5d8] mt-0.5">
                      Interest rate decision released in 2 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Icon Indicator */}
          <button
            className="p-1.5 text-[#c3c5d8] hover:text-[#dfe2f2] hover:bg-[#262a35] rounded transition-colors flex items-center"
            title="Terminal Dark Mode Active"
          >
            <span className="material-symbols-outlined text-[18px]">dark_mode</span>
          </button>

          {/* Get Started Button */}
          <button
            onClick={onOpenSearch}
            className="bg-[#2962ff] text-[#f7f5ff] hover:bg-[#004ee8] px-3 py-1 rounded text-xs font-medium transition-colors hidden sm:block shadow-sm"
          >
            Get started
          </button>

          {/* User Profile Avatar */}
          <div
            className="w-7 h-7 rounded-full bg-[#b6c4ff] flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#2962ff] transition-all"
            title="User Account"
          >
            <span className="material-symbols-outlined text-[#002780] text-[16px]">person</span>
          </div>
        </div>
      </div>

      {/* Tier 2: Real-time Streaming Ticker Marquee Bar */}
      <div className="h-8 w-full bg-[#0a0e19] px-4 flex items-center gap-6 overflow-x-auto select-none border-t border-b border-[#1b1f2b] no-scrollbar">
        <div
          onClick={() => onSelectIndex('S&P 500')}
          className="flex items-center gap-2 shrink-0 font-data-mono text-xs cursor-pointer hover:bg-[#1b1f2b] px-1.5 py-0.5 rounded transition-colors"
        >
          <span className="text-[#c3c5d8] text-[10px] font-semibold tracking-wider uppercase">S&P 500</span>
          <span className="text-[#dfe2f2] font-medium">5,912.40</span>
          <span className="text-[#66dabf] flex items-center font-semibold">+0.38%</span>
        </div>

        <div
          onClick={() => onSelectIndex('NASDAQ 100')}
          className="flex items-center gap-2 shrink-0 font-data-mono text-xs cursor-pointer hover:bg-[#1b1f2b] px-1.5 py-0.5 rounded transition-colors"
        >
          <span className="text-[#c3c5d8] text-[10px] font-semibold tracking-wider uppercase">NASDAQ</span>
          <span className="text-[#dfe2f2] font-medium">18,924.50</span>
          <span className="text-[#66dabf] flex items-center font-semibold">+0.72%</span>
        </div>

        <div
          onClick={() => onSelectIndex('Dow Jones')}
          className="flex items-center gap-2 shrink-0 font-data-mono text-xs cursor-pointer hover:bg-[#1b1f2b] px-1.5 py-0.5 rounded transition-colors"
        >
          <span className="text-[#c3c5d8] text-[10px] font-semibold tracking-wider uppercase">DOW 30</span>
          <span className="text-[#dfe2f2] font-medium">43,870.20</span>
          <span className="text-[#ffb3b0] flex items-center font-semibold">-0.15%</span>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-data-mono text-xs">
          <span className="text-[#c3c5d8] text-[10px] font-semibold tracking-wider uppercase">US 10Y</span>
          <span className="text-[#dfe2f2] font-medium">4.42%</span>
          <span className="text-[#66dabf] flex items-center font-semibold">+0.02</span>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-data-mono text-xs">
          <span className="text-[#c3c5d8] text-[10px] font-semibold tracking-wider uppercase">BTC/USD</span>
          <span className="text-[#dfe2f2] font-medium">96,480.00</span>
          <span className="text-[#66dabf] flex items-center font-semibold">+3.12%</span>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-data-mono text-xs">
          <span className="text-[#c3c5d8] text-[10px] font-semibold tracking-wider uppercase">EUR/USD</span>
          <span className="text-[#dfe2f2] font-medium">1.0520</span>
          <span className="text-[#ffb3b0] flex items-center font-semibold">-0.18%</span>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-data-mono text-xs">
          <span className="text-[#c3c5d8] text-[10px] font-semibold tracking-wider uppercase">GOLD</span>
          <span className="text-[#dfe2f2] font-medium">2,684.50</span>
          <span className="text-[#66dabf] flex items-center font-semibold">+0.45%</span>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-data-mono text-xs">
          <span className="text-[#c3c5d8] text-[10px] font-semibold tracking-wider uppercase">BRENT CRUDE</span>
          <span className="text-[#dfe2f2] font-medium">73.20</span>
          <span className="text-[#ffb3b0] flex items-center font-semibold">-0.80%</span>
        </div>
      </div>

      {/* Tier 3: Sub-Navigation Bar */}
      <div className="h-10 w-full bg-[#1b1f2b] px-4 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-[#262a35]">
        <nav className="flex items-center gap-5">
          {subNavItems.map((sub) => {
            const isActive = activeSubNav === sub;
            return (
              <button
                key={sub}
                onClick={() => setActiveSubNav(sub)}
                className={`text-xs whitespace-nowrap transition-colors cursor-pointer py-1 font-medium ${
                  isActive
                    ? 'text-[#dfe2f2] font-bold border-b-2 border-[#2962ff]'
                    : 'text-[#c3c5d8] hover:text-[#dfe2f2]'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
