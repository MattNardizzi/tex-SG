'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import DashboardHUD from '../components/panels/DashboardHUD';

export default function Home() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const accessCode = Cookies.get('tex_access_code');
    if (accessCode) setShowLogout(true);
  }, []);

  const handleLogout = () => {
    Cookies.remove('tex_access_code');
    router.push('/auth');
  };

  return (
    <div className="relative w-full h-full">
      {showLogout && (
        <button
          className="absolute top-4 right-4 z-50 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
      <DashboardHUD />
    </div>
  );
}