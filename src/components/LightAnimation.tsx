'use client';

import { useEffect, useState } from 'react';

const LightEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${mousePosition.y - 100}px`,
        left: `${mousePosition.x - 100}px`,
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.3)',
        boxShadow: `0 0 100px rgba(255, 255, 255, 0.4)`,
        pointerEvents: 'none',
        transition: 'all 0.1s ease-out',
        filter: 'blur(15px)',
        transform: 'translate(-50%, -50%)',
      }}
    ></div>
  );
};

export default LightEffect;
