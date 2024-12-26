'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import Sidebar from '@/components/SideBar';
import { useState } from 'react';
import queryClient from '@/lib/reactQuery';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <main className="flex-grow px-4 pb-20 lg:px-10 overflow-auto">
              <div className="container mx-auto h-full">{children}</div>
            </main>
            <button
              className={`p-2 bg-gray-600 text-white rounded-full h-8 w-8 fixed left-3 top-3 hover:top-[11px] transition-all ease-in-out ${
                sidebarOpen ? 'hidden' : 'flex'
              }`}
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
