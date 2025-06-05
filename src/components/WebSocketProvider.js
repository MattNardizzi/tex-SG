'use client';

import { useEffect } from 'react';
import usePanelStore from '@/lib/store';

  const updatePanelData = usePanelStore((state) => state.updatePanelData);

  useEffect(() => {
    // Only connect in development
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

    const socket = new WebSocket('ws://localhost:8000/ws/tex');

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.channel && message.data) {
          updatePanelData(message.channel, message.data);
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    socket.onclose = () => {
      console.log('❌ WebSocket closed');
    };

    return () => socket.close();
  }, [updatePanelData]);

  return children;
}