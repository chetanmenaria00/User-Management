// import Image from 'next/image';
import React from 'react';

interface Gif {
  src?: string; // The source URL of the GIF
  alt?: string; // Optional alt text for the GIF
  className?: string; // Optional className to apply custom styling
}

const GifLoader: React.FC<Gif> = ({ className = '' }) => {
  return (
    <div
      className={`container mx-auto flex justify-center items-center ${className}`}
    >
      <video
        className="w-[50%] rounded-full"
        src={
          'https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/uG73t6y3S6obzxxr4w.mp4?Expires=1735210146&Signature=jSUcjDLMPF3WrWICiUuovos2Iw8o8voRsz6HOaIhATUwDka4Dvsw9Pqxyi-uy-igWTZVb41zi4GoPIXcSt-DkA56yiui2VeRv4A7xRB1~RRGJ45BQ0IyyO8r7Dh5la4HETIkMgELP4znWv8RCUaTp3y-SGa7w5OnLli5MmC7IUp1i4rxeNXX9dhNVnQEqTK9cABrRHO8DYJL9Doe9Rc6VXHnA7qR0sdgjX3hrfk4Y8uA~~Eav6N9oO9muBAgjKcXHTn-sAt-2C-WxGNyGdx0VBqy7F7b-AE2sIbKitn4swdDXrteBwRCwbqJJd7cE1~yYeO~YKO-ukKQLo0-OqWYxg__&Key-Pair-Id=K2YEDJLVZ3XRI#t=0.001'
        }
        loop={true}
        autoPlay={true}
        muted={true}
        // className="w-full h-auto"
      />
    </div>
  );
};

export default GifLoader;
