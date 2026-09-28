import React, { useState, useEffect } from 'react';

interface CommandTrayProps {
  onRefreshAll: () => void;
  layoutMode: string;
  onChangeLayout: (mode: string) => void;
}

export const CommandTray: React.FC<CommandTrayProps> = ({
  onRefreshAll,
  layoutMode,
  onChangeLayout,
}) => {
  const [serverTime, setServerTime] = useState('14:18:22 EST');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Format EST time
      const timeStr = now.toLocaleTimeString('en-US', {
        hour12: false,
        timeZone: 'America/New_York',
      });
      setServerTime(`${timeStr} EST`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefreshAll();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="w-full bg-[#1b1f2b] border-t border-[#262a35] px-4 py-2 mt-4 flex items-center justify-between text-xs text-[#8d90a2] select-none">
      {/* Left System Status Items */}
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="flex items-center gap-1.5 text-[#dfe2f2] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#66dabf] shadow-[0_0_8px_rgba(102,218,191,0.6)] animate-pulse" />
          NYSE / NASDAQ: Operational (Latency 8ms)
        </span>
        <span className="hidden md:inline-block">Data stream: ICE Real-Time L1/L2</span>
        <span className="hidden lg:inline-block">
          Server Time:{' '}
          <span className="font-data-mono text-[#dfe2f2] font-semibold">{serverTime}</span>
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Layout Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowLayoutMenu(!showLayoutMenu)}
            className="hover:text-[#dfe2f2] transition-colors flex items-center gap-1 cursor-pointer py-1 px-1.5 rounded hover:bg-[#262a35]"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span>
            <span>Layout: {layoutMode}</span>
          </button>
          {showLayoutMenu && (
            <div className="absolute right-0 bottom-full mb-1 w-36 bg-[#1e222d] border border-[#363a45] rounded shadow-lg py-1 z-50 text-xs">
              {['Quad-Grid', 'Standard', 'Focus Chart', 'Movers Focus'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    onChangeLayout(mode);
                    setShowLayoutMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 transition-colors ${
                    layoutMode === mode
                      ? 'bg-[#2962ff] text-[#ffffff] font-bold'
                      : 'text-[#dfe2f2] hover:bg-[#262a35]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh All Panes */}
        <button
          onClick={handleRefresh}
          className="hover:text-[#dfe2f2] transition-colors flex items-center gap-1 cursor-pointer py-1 px-1.5 rounded hover:bg-[#262a35]"
          title="Refresh real-time data feeds"
        >
          <span
            className={`material-symbols-outlined text-[14px] ${
              isRefreshing ? 'animate-spin text-[#66dabf]' : ''
            }`}
          >
            sync
          </span>
          <span>Refresh All Panes</span>
        </button>
      </div>
    </div>
  );
};
