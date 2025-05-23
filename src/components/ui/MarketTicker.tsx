'use client'

import React, { useEffect, useState } from 'react'

type TickerData = {
  [symbol: string]: {
    price: number
    change: number | null
    direction: 'up' | 'down' | 'neutral'
  }
}

const MarketTicker = () => {
  const [data, setData] = useState<TickerData>({})

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/polygon') // ✅ adjust if needed

    ws.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data)
        setData((prev) => ({ ...prev, ...update }))
      } catch (error) {
        console.error('WebSocket message error:', error)
      }
    }

    return () => ws.close()
  }, [])

  return (
    <div className="w-full h-full px-4 flex items-center justify-center gap-10 text-green-400 font-mono text-sm">
      {Object.keys(data).length === 0 ? (
        <span className="text-gray-500">Waiting for data...</span>
      ) : (
        Object.entries(data).map(([symbol, { price }]) => (
          <div key={symbol}>
            {symbol.toUpperCase()}: ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
          </div>
        ))
      )}
    </div>
  )
}

export default MarketTicker