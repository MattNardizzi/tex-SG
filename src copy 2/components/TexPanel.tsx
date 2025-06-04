'use client';

import { useEffect, useState } from 'react';

export default function TexPanel() {
  const [message, setMessage] = useState('Connecting to Tex...');

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/tex');

    socket.onopen = () => {
      console.log('✅ Connected to Tex WebSocket');
    };

    socket.onmessage = (event) => {
      setMessage(event.data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('❌ WebSocket connection closed');
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#000',
      color: '#0f0',
      fontFamily: 'monospace',
      borderRadius: '8px',
      marginTop: '1rem'
    }}>
      {message}
    </div>
  );
}
