import React from 'react';
import { NewsStory } from '../types/market';

interface NewsModalProps {
  story: NewsStory | null;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-[#1e222d] border border-[#363a45] rounded-lg shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-3 bg-[#171b26] border-b border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#2962ff]/20 text-[#b6c4ff] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              {story.category}
            </span>
            <span className="text-xs text-[#8d90a2]">{story.source}</span>
            <span className="text-xs text-[#8d90a2]">·</span>
            <span className="text-xs text-[#8d90a2]">{story.timeAgo}</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8d90a2] hover:text-[#dfe2f2] p-1 rounded hover:bg-[#2a2e39] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 text-xs text-[#dfe2f2]">
          <h2 className="text-base sm:text-lg font-bold text-[#dfe2f2] leading-snug">
            {story.headline}
          </h2>

          <div className="p-3 bg-[#171b26] rounded border border-[#2a2e39] flex items-center justify-between">
            <span className="text-[#8d90a2]">Algorithmic Sentiment Rating</span>
            <span
              className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                story.sentiment === 'Bullish'
                  ? 'bg-[#20a28a]/20 text-[#66dabf]'
                  : story.sentiment === 'Bearish'
                  ? 'bg-[#da2237]/20 text-[#ffb3b0]'
                  : 'bg-[#313441] text-[#c3c5d8]'
              }`}
            >
              {story.sentiment} Signal
            </span>
          </div>

          <div className="space-y-3 leading-relaxed text-[#c3c5d8] text-sm">
            <p>{story.summary}</p>
            <p>
              Wall Street analysts emphasize that macroeconomic signals and corporate balance
              sheets continue to dictate institutional capital allocations. Volatility remains
              clustered around upcoming central bank announcements, earnings revisions, and
              geopolitical supply-chain reassessments.
            </p>
            <p>
              Portfolio managers advise maintaining tactical asset diversification, disciplined stop-loss
              parameters, and continuous monitoring of real-time order books across derivative and
              cash markets.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#171b26] border-t border-[#2a2e39] flex items-center justify-between text-xs text-[#8d90a2]">
          <span>Verified wire feed via Bloomberg / Reuters Terminal</span>
          <button
            onClick={onClose}
            className="bg-[#262a35] hover:bg-[#313441] text-[#dfe2f2] px-3 py-1.5 rounded transition-colors cursor-pointer"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
