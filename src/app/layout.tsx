import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({ 
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-vazir',
});

export const metadata: Metadata = {
  title: 'داشبورد هوشمند پذیرندگان',
  description: 'تحلیل پیشرفته تراکنش‌ها و بینش‌های تجاری',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans antialiased bg-slate-900 text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white">
        {/* Glowing Background Orbs for Glassmorphism Effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[140px]" />
          <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-sky-500/20 blur-[100px]" />
        </div>
        {children}
      </body>
    </html>
  );
}