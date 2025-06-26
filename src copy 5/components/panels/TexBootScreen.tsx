import React, { useEffect } from 'react';

type TexBootScreenProps = {
  onDone: () => void;
};

export default function TexBootScreen({ onDone }: TexBootScreenProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDone();
    }, 3000); // adjust duration as needed
    return () => clearTimeout(timeout);
  }, [onDone]);

  return (
    <div className="w-full h-full flex items-center justify-center text-white">
      <div className="text-2xl animate-pulse">Initializing Tex...</div>
    </div>
  );
}