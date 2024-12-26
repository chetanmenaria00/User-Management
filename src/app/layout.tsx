import './globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../lib/reactQuery';

export const metadata = {
  title: 'User Management Table',
  description:
    'A demo user management table with Next.js, Shadcn, and TanStack.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="flex h-screen overflow-hidden bg-black">
            <main className="lg:dashboard-width flex-grow px-4 pb-20 lg:px-10 overflow-auto">
              <div className="container mx-auto h-full">{children}</div>
            </main>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
