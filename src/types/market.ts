export interface MarketIndex {
  symbol: string;
  name: string;
  category: string;
  price: number;
  change: number;
  changePercent: number;
  low: number;
  high: number;
  sparkline: number[];
  bullish: boolean;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  rating: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  sparkline: number[];
  avatarBg: string;
  avatarColor: string;
  initial: string;
}

export interface SectorItem {
  name: string;
  changePercent: number;
  weight: number;
}

export interface AssetPulse {
  symbol: string;
  category: 'CRYPTO' | 'FOREX' | 'COMMOD' | 'ENERGY' | 'FUTURES';
  price: string;
  changePercent: number;
  bullish: boolean;
}

export interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  title: string;
  actual: string;
  forecast: string;
  prior: string;
  impact: 'Bullish' | 'Volatile' | 'Critical' | 'Medium' | 'Low';
  isHighImpact: boolean;
}

export interface NewsStory {
  id: string;
  source: string;
  timeAgo: string;
  headline: string;
  summary: string;
  category: string;
  sentiment: 'Bullish' | 'Neutral' | 'Bearish';
}
