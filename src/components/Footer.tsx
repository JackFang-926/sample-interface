import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#171b26] py-4 px-4 text-center text-[#8d90a2] text-xs border-t border-[#262a35] shadow-[0_-1px_4px_rgba(0,0,0,0.2)]">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img
            alt="TradingView Logo"
            className="h-5 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UL6ZLYmJdF8Xao22oSgFIU3AZa44Jr8MxI-de8CbvGSS2UAvCN8nxYlc7fK5DfEhje1dwUPewgumNi-hOZ1h9pkgcFH7zCCFZn2LSTPqJ9t8bgJ7ggFqXpoHUa6f2uvSp3HxULlV5j_h3YtL5VmFq7IiiptbcX7iXZjeEVbCGGfA3Xq671QacQkUSd58tJ7SwEfiU5NIm8WecGbLINCQyuIdVPWs_isb7OxwHnF5zsDETe7IyXAGQFV4MF"
          />
          <span className="text-[#8d90a2]">
            © 2024 TradingView Inc. Market data provided by ICE Data Services.
          </span>
        </div>

        <div className="flex items-center gap-5">
          {['Terms of Service', 'Privacy Policy', 'Security', 'Status'].map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#dfe2f2] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
