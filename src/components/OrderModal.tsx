import React, { useState } from 'react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  price: number;
  onOrderPlaced: (details: { side: 'BUY' | 'SELL'; quantity: number; symbol: string; price: number }) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  symbol,
  price,
  onOrderPlaced,
}) => {
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP'>('MARKET');
  const [quantity, setQuantity] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(price);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  const totalValue = (orderType === 'MARKET' ? price : limitPrice) * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderPlaced({
      side,
      quantity,
      symbol,
      price: orderType === 'MARKET' ? price : limitPrice,
    });
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#1e222d] border border-[#363a45] rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-3 bg-[#171b26] border-b border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#dfe2f2]">{symbol}</span>
            <span className="text-xs text-[#8d90a2]">Order Execution</span>
            <span className="font-data-mono text-xs font-bold text-[#dfe2f2] bg-[#262a35] px-1.5 py-0.5 rounded">
              ${price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8d90a2] hover:text-[#dfe2f2] p-1 rounded hover:bg-[#2a2e39] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {orderSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#20a28a]/20 text-[#66dabf] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check</span>
            </div>
            <h3 className="text-base font-bold text-[#dfe2f2]">Order Filled Successfully!</h3>
            <p className="text-xs text-[#8d90a2] font-data-mono">
              {side} {quantity} {symbol} @ ${price.toFixed(2)}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 text-xs">
            {/* Buy / Sell Tab Switcher */}
            <div className="grid grid-cols-2 gap-2 bg-[#171b26] p-1 rounded border border-[#2a2e39]">
              <button
                type="button"
                onClick={() => setSide('BUY')}
                className={`py-1.5 rounded font-bold transition-colors cursor-pointer ${
                  side === 'BUY'
                    ? 'bg-[#20a28a] text-[#00201a] shadow-sm'
                    : 'text-[#8d90a2] hover:text-[#dfe2f2]'
                }`}
              >
                BUY / LONG
              </button>
              <button
                type="button"
                onClick={() => setSide('SELL')}
                className={`py-1.5 rounded font-bold transition-colors cursor-pointer ${
                  side === 'SELL'
                    ? 'bg-[#da2237] text-[#fff4f3] shadow-sm'
                    : 'text-[#8d90a2] hover:text-[#dfe2f2]'
                }`}
              >
                SELL / SHORT
              </button>
            </div>

            {/* Order Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#8d90a2] font-medium text-[11px] uppercase tracking-wider">
                Order Type
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#171b26] p-1 rounded border border-[#2a2e39]">
                {(['MARKET', 'LIMIT', 'STOP'] as const).map((ot) => (
                  <button
                    key={ot}
                    type="button"
                    onClick={() => setOrderType(ot)}
                    className={`py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                      orderType === ot
                        ? 'bg-[#2962ff] text-white'
                        : 'text-[#8d90a2] hover:text-[#dfe2f2]'
                    }`}
                  >
                    {ot}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#8d90a2] font-medium text-[11px] uppercase tracking-wider">
                Units / Shares
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-[#171b26] border border-[#2a2e39] text-[#dfe2f2] px-3 py-1.5 rounded w-full font-data-mono text-sm focus:border-[#2962ff] focus:outline-none"
                />
                <div className="flex items-center gap-1 shrink-0">
                  {[10, 50, 100].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setQuantity(qty)}
                      className="bg-[#262a35] hover:bg-[#313441] text-[#dfe2f2] px-2 py-1.5 rounded font-data-mono text-xs cursor-pointer"
                    >
                      +{qty}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Limit Price if Limit order */}
            {orderType === 'LIMIT' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8d90a2] font-medium text-[11px] uppercase tracking-wider">
                  Limit Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(parseFloat(e.target.value) || price)}
                  className="bg-[#171b26] border border-[#2a2e39] text-[#dfe2f2] px-3 py-1.5 rounded font-data-mono text-sm focus:border-[#2962ff] focus:outline-none"
                />
              </div>
            )}

            {/* Summary */}
            <div className="bg-[#171b26] p-2.5 rounded border border-[#2a2e39] flex flex-col gap-1.5 font-data-mono text-xs">
              <div className="flex items-center justify-between text-[#8d90a2]">
                <span>Est. Price:</span>
                <span className="text-[#dfe2f2]">
                  ${(orderType === 'MARKET' ? price : limitPrice).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#8d90a2]">
                <span>Commission:</span>
                <span className="text-[#66dabf]">$0.00 (Zero Fee)</span>
              </div>
              <div className="flex items-center justify-between text-[#dfe2f2] font-bold border-t border-[#262a35] pt-1">
                <span>Total Capital:</span>
                <span className="text-sm">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              className={`w-full py-2.5 rounded font-bold text-sm transition-all cursor-pointer shadow-md ${
                side === 'BUY'
                  ? 'bg-[#20a28a] hover:bg-[#00c076] text-[#00201a]'
                  : 'bg-[#da2237] hover:bg-[#ff4d5e] text-[#fff4f3]'
              }`}
            >
              Place {side} Order ({quantity} {symbol})
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
