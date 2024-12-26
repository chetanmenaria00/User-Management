import Link from 'next/link';
import React from 'react';

const ButtonWithAnimation = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center font-poppins antialiased border-2 rounded-lg hover:scale-105">
      <Link
        href="dashboard/users"
        className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-custom-gray to-white via-transparent text-2xl font-semibold px-12 py-3 whitespace-nowrap overflow-hidden transform transition-all animate-shine hover:animate-glow"
      >
        {text}
      </Link>
    </div>
  );
};

export default ButtonWithAnimation;
