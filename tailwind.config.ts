import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'custom-gray': '#4d4d4d',
      },
      animation: {
        shine: 'shine 6s infinite linear',
        glow: 'glow 1.5s infinite alternate',
      },
      keyframes: {
        shine: {
          '0%': {
            backgroundPosition: '0',
          },
          '60%': {
            backgroundPosition: '180px',
          },
          '100%': {
            backgroundPosition: '300px',
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
          },
          '100%': {
            boxShadow: '0 0 20px rgba(255, 255, 255, 1)',
          },
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
