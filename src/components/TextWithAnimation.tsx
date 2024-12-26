import React from 'react';

const TextWithAnimation = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center font-poppins antialiased">
      <p className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-custom-gray to-white via-transparent text-2xl font-semibold px-12 py-3 whitespace-nowrap animate-shine">
        {text}
      </p>
    </div>
  );
};

export default TextWithAnimation;
