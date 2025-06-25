import { useEffect, useState } from 'react';

const symbols = [
  { label: 'AAPL', display: 'AAPL' },
  { label: 'TSLA', display: 'TSLA' },
  { label: 'GOOG', display: 'GOOG' },
  { label: 'META', display: 'META' },
  { label: 'AMD', display: 'AMD' },
  { label: 'BTC-USD', display: 'BTC' },
  { label: 'ETH-USD', display: 'ETH' },
  { label: '^GSPC', display: 'SP500' },       // S&P 500
  { label: '^IXIC', display: 'NASDAQ' },     // NASDAQ Composite
  { label: 'VIX', display: 'VIX' },
];

// 🔐 Your actual API key from Finnhub:
const API_KEY = 'd0qhl1pr01qt60oofc20d0qhl1pr01qt60oofc2g';

export function useMarketQuotes() {
  const [quotes, setQuotes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const results = await Promise.all(
          symbols.map(async ({ label, display }) => {
            const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${label}&token=${API_KEY}`);
            const data = await res.json();

            const price = parseFloat(data.c).toFixed(2);
            const change = (data.d ?? (data.c - data.pc)).toFixed(2);
            const changePct = (data.dp ?? ((data.c - data.pc) / data.pc) * 100).toFixed(2);

            const direction = parseFloat(change) >= 0 ? '▲' : '▼';
            const sign = parseFloat(change) >= 0 ? '+' : '';

            return `${display}: $${price} ${direction} ${sign}${changePct}%`;
          })
        );

        setQuotes(results.slice(0, 6)); // Display 6 rotating quotes
      } catch (err) {
        console.error('Error fetching quotes from Finnhub:', err);
      }
    }

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 10000);
    return () => clearInterval(interval);
  }, []);

  return quotes;
}