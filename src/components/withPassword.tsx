'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function withPasswordProtect(Component: React.FC) {
  return function ProtectedPage() {
    const [authorized, setAuthorized] = useState(false);
    const [codeInput, setCodeInput] = useState('');

    const expectedCode = process.env.NEXT_PUBLIC_TEX_ACCESS_CODE;

    useEffect(() => {
      const cookie = Cookies.get('tex_access_code');
      if (cookie === expectedCode) {
        setAuthorized(true);
      }
    }, [expectedCode]); // ✅ Fixes the missing dependency warning

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (codeInput === expectedCode) {
        Cookies.set('tex_access_code', codeInput, { expires: 1 });
        setAuthorized(true);
      } else {
        alert('❌ Incorrect code');
      }
    };

    if (!authorized) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-xl">🔐 Enter Access Code</h1>
            <input
              type="password"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Secret code"
              className="p-2 text-black rounded"
            />
            <button type="submit" className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-600">
              Unlock
            </button>
          </form>
        </div>
      );
    }

    return <Component />;
  };
}