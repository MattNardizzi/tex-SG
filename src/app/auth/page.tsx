'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [codeInput, setCodeInput] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expectedCode = process.env.NEXT_PUBLIC_TEX_ACCESS_CODE;

    if (codeInput === expectedCode) {
      Cookies.set('tex_access_code', codeInput, { expires: 1 });
      router.push('/');
    } else {
      alert('Incorrect code.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl">🔐 Enter Access Code</h1>
        <input
          type="password"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Secret Code"
          className="p-2 rounded text-black"
          required
        />
        <button type="submit" className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-700">
          Unlock
        </button>
      </form>
    </div>
  );
}