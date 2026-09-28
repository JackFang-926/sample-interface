import React from 'react';
import { NewsStory } from '../types/market';
import { TOP_STORIES } from '../data/mockMarketData';

interface TopStoriesProps {
  onSelectStory: (story: NewsStory) => void;
  onViewAllStories: () => void;
}

export const TopStories: React.FC<TopStoriesProps> = ({
  onSelectStory,
  onViewAllStories,
}) => {
  return (
    <div className="bg-[#171b26] rounded border border-[#262a35] p-3 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#2962ff]">
            feed
          </span>
          <span className="text-sm font-bold text-[#dfe2f2]">Top Stories</span>
        </div>
        <button
          onClick={onViewAllStories}
          className="text-[#b6c4ff] hover:text-[#dfe2f2] text-xs transition-colors cursor-pointer"
        >
          See all
        </button>
      </div>

      {/* Stories List */}
      <div className="flex flex-col gap-2.5 divide-y divide-[#262a35]">
        {TOP_STORIES.slice(0, 4).map((story) => (
          <article
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="flex flex-col gap-1 pt-2.5 first:pt-0 cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-[11px] text-[#8d90a2]">
              <span className="text-[#dfe2f2] font-semibold">{story.source}</span>
              <span>·</span>
              <span>{story.timeAgo}</span>
            </div>
            <h4 className="text-[13px] font-semibold text-[#dfe2f2] group-hover:text-[#2962ff] transition-colors leading-snug">
              {story.headline}
            </h4>
          </article>
        ))}
      </div>
    </div>
  );
};
