import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-vazir',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans antialiased bg-[#f0f4f9] text-slate-800">
        {children}
      </body>
    </html>
  );
}