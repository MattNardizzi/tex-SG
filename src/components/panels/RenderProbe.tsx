'use client';

import React, { useEffect, useState } from 'react';

export default function RenderProbe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('[RenderProbe] ✅ Mounted in browser');
  }, []);

  return (
    <div style={{ color: '#00ff88', fontSize: '1.2rem', padding: '1rem' }}>
      ✅ RenderProbe is active — mounted: {mounted ? 'yes' : 'no'}
    </div>
  );
}