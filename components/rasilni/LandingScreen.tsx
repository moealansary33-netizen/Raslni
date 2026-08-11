'use client';

import { Truck, Package } from 'lucide-react';

interface LandingScreenProps {
  onNavigate: (screen: string) => void;
}

export default function LandingScreen({ onNavigate }: LandingScreenProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: 'linear-gradient(160deg, #1A2E2B 0%, #0D1E1C 100%)' }}>
      {/* Logo area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 bg-[#2D9D78] rounded-3xl flex items-center justify-center mb-6 shadow-lg">
          <Package size={40} className="text-white" />
        </div>
        <h1
          className="text-4xl font-extrabold text-white mb-3"
          style={{ fontFamily: 'Cairo, sans-serif', letterSpacing: '-0.5px' }}
        >
          رسلني
        </h1>
        <p className="text-white/60 text-base" style={{ fontFamily: 'Cairo, sans-serif' }}>
          توصيل سريع وموثوق في كل مكان
        </p>

        {/* Decorative ring */}
        <div className="mt-10 w-48 h-48 border border-[#2D9D78]/20 rounded-full flex items-center justify-center">
          <div className="w-36 h-36 border border-[#2D9D78]/30 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-[#2D9D78]/10 rounded-full flex items-center justify-center">
              <Truck size={36} className="text-[#5DCEA6]" />
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-12 space-y-3">
        <p className="text-white/50 text-center text-sm mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
          اختر نوع الحساب للبدء
        </p>

        <button
          onClick={() => onNavigate('client-register')}
          className="w-full bg-[#2D9D78] text-white font-bold py-4 rounded-2xl text-base hover:bg-[#237A5E] transition-all active:scale-[0.98] shadow-lg"
          style={{ fontFamily: 'Cairo, sans-serif' }}
        >
          إنشاء حساب عميل
        </button>

        <button
          onClick={() => onNavigate('courier-register')}
          className="w-full bg-white/10 text-white font-bold py-4 rounded-2xl text-base hover:bg-white/20 transition-all active:scale-[0.98] border border-white/20"
          style={{ fontFamily: 'Cairo, sans-serif' }}
        >
          إنشاء حساب مندوب
        </button>

        <button
          onClick={() => onNavigate('login')}
          className="w-full bg-transparent text-[#5DCEA6] font-semibold py-3.5 rounded-2xl text-sm hover:bg-[#2D9D78]/10 transition-all border border-[#2D9D78]/50"
          style={{ fontFamily: 'Cairo, sans-serif' }}
        >
          تسجيل دخول
        </button>
      </div>
    </div>
  );
}
