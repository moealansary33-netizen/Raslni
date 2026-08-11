'use client';

import { useState } from 'react';
import { ClipboardList, Wallet, Settings, Phone, TrendingUp, ArrowDownCircle, MessageCircle } from 'lucide-react';

interface CourierHomeScreenProps {
  onNavigate: (screen: string) => void;
}

function Toggle({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="toggle-track"
      style={{ backgroundColor: isOn ? '#2D9D78' : '#6B7280' }}
      aria-label="toggle"
    >
      <div
        className="toggle-thumb"
        style={{ transform: isOn ? 'translateX(20px)' : 'translateX(2px)' }}
      />
    </button>
  );
}

export default function CourierHomeScreen({ onNavigate }: CourierHomeScreenProps) {
  const [isOnline, setIsOnline] = useState(true);

  const navItems = [
    { id: 'courier-wallet', label: 'المحفظة', icon: Wallet, active: false },
    { id: 'courier-orders', label: 'طلباتي', icon: ClipboardList, active: false },
    { id: 'courier-chat', label: 'الرسائل', icon: MessageCircle, active: false },
    { id: 'courier-settings', label: 'الإعدادات', icon: Settings, active: false },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: '#1B3432' }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-5" style={{ background: '#1A2E2B' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Toggle isOn={isOnline} onToggle={() => setIsOnline(!isOnline)} />
            <span className="text-white text-sm font-semibold">{isOnline ? 'متصل' : 'غير متصل'}</span>
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Cairo, sans-serif' }}>
            رسلني
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-semibold">متاح للعمل</span>
            <Toggle isOn={isOnline} onToggle={() => setIsOnline(!isOnline)} />
          </div>
        </div>

        {/* Status badge */}
        <div className="flex justify-center">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: isOnline ? 'rgba(45,157,120,0.25)' : 'rgba(107,114,128,0.25)', color: isOnline ? '#5DCEA6' : '#9CA3AF' }}
          >
            <div className={"w-2 h-2 rounded-full " + (isOnline ? 'bg-[#5DCEA6]' : 'bg-gray-400')} />
            {isOnline ? 'أنت متصل الآن' : 'أنت غير متصل'}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-3">
        {/* Earnings Card */}
        <div
          className="rounded-2xl p-4 flex items-center justify-between slide-up"
          style={{ background: 'linear-gradient(135deg, #2D9D78 0%, #1E7A5A 100%)' }}
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingUp size={22} className="text-white" />
          </div>
          <div className="text-right">
            <p className="text-white/80 text-xs mb-0.5">أرباح اليوم:</p>
            <p className="text-white text-xl font-bold">15,000 ج.س.</p>
          </div>
        </div>

        {/* Wallet Card - recharge only */}
        <div
          className="rounded-2xl p-4 slide-up"
          style={{ background: 'linear-gradient(135deg, #243B38 0%, #1A2E2B 100%)', animationDelay: '0.1s' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#2D9D78]/30 rounded-xl flex items-center justify-center">
              <Wallet size={20} className="text-[#5DCEA6]" />
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs mb-0.5">رصيد المحفظة</p>
              <p className="text-white text-xl font-bold">50,000 ج.س.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('courier-wallet')}
            className="w-full flex items-center justify-center gap-1.5 bg-[#2D9D78] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#237A5E] transition-colors"
          >
            <ArrowDownCircle size={16} />
            شحن الرصيد
          </button>
        </div>

        {/* Incoming Order */}
        <div
          className="bg-white rounded-3xl shadow-lg p-4 slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#2D9D78] font-semibold bg-[#E8F5F0] px-2 py-1 rounded-lg">طلب جديد</span>
            <h3 className="text-base font-bold text-[#1A1A2E]">طلب وارد</h3>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
              <span className="text-sm font-semibold text-[#1A1A2E]">2.1 كم</span>
              <span className="text-sm text-gray-500">المسافة:</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
              <span className="text-sm font-bold text-[#2D9D78]">3,500 ج.س.</span>
              <span className="text-sm text-gray-500">السعر المقترح:</span>
            </div>
          </div>

          <button className="w-full bg-[#1A2E2B] text-white font-bold py-3 rounded-2xl text-sm hover:bg-[#243B38] transition-colors active:scale-[0.98]">
            قبول الطلب
          </button>
        </div>

        {/* Current Delivery */}
        <div
          className="bg-white rounded-3xl shadow-md p-4 slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('courier-chat')}
                className="w-10 h-10 bg-[#E8F5F0] rounded-xl flex items-center justify-center hover:bg-[#d4ede4] transition-colors"
              >
                <MessageCircle size={18} className="text-[#2D9D78]" />
              </button>
              <div className="w-10 h-10 bg-[#E8F5F0] rounded-xl flex items-center justify-center">
                <Phone size={18} className="text-[#2D9D78]" />
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-bold text-[#1A1A2E]">التوصيل الحالي</h3>
              <p className="text-xs text-gray-400">المال</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 mb-3">
            <p className="text-sm font-semibold text-[#1A1A2E] text-right mb-0.5">التوصيل الحالي</p>
            <p className="text-xs text-gray-400 text-right">اعطني طوفانة عرابية</p>
          </div>

          <button className="w-full bg-[#E8F5F0] text-[#2D9D78] font-bold py-2.5 rounded-2xl text-sm hover:bg-[#d4ede4] transition-colors">
            رفع الفاتورة
          </button>
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <div className="px-2 py-3 pb-6" style={{ background: '#1A2E2B', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={item.active ? { background: 'rgba(45,157,120,0.2)' } : {}}
                >
                  <Icon
                    size={18}
                    className={item.active ? 'text-[#5DCEA6]' : 'text-white/40'}
                  />
                </div>
                <span
                  className={'text-[10px] font-semibold ' + (item.active ? 'text-[#5DCEA6]' : 'text-white/40')}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
