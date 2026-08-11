'use client';

import { useState } from 'react';
import { Bell, Search, ClipboardList, User, MapPin, Truck, Settings, MessageCircle } from 'lucide-react';

interface ClientHomeScreenProps {
  onNavigate: (screen: string) => void;
}

const categories = [
  { id: 1, label: 'متاجر', icon: '🏪' },
  { id: 2, label: 'صيدلية', icon: '💊' },
  { id: 3, label: 'مطعم', icon: '🍽️' },
  { id: 4, label: 'طرد مخصص', icon: '📦' },
];

function MapPreview() {
  return (
    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100">
      <svg width="100%" height="100%" className="absolute inset-0 opacity-30">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <svg width="100%" height="100%" className="absolute inset-0">
        <line x1="0" y1="80" x2="100%" y2="80" stroke="#cbd5e1" strokeWidth="8" />
        <line x1="0" y1="120" x2="100%" y2="120" stroke="#cbd5e1" strokeWidth="5" />
        <line x1="100" y1="0" x2="100" y2="100%" stroke="#cbd5e1" strokeWidth="6" />
        <line x1="220" y1="0" x2="220" y2="100%" stroke="#cbd5e1" strokeWidth="4" />
        <line x1="310" y1="0" x2="250" y2="100%" stroke="#cbd5e1" strokeWidth="5" />
        <path d="M 60 130 Q 160 100 260 80 L 310 55" stroke="#2D9D78" strokeWidth="3" fill="none" strokeDasharray="6 3" />
      </svg>

      <div className="absolute top-6 right-16 flex flex-col items-center">
        <div className="bg-white rounded-lg px-2 py-1 shadow-md text-xs text-gray-700 font-semibold whitespace-nowrap mb-1">
          ستنبل العس
          <div className="text-gray-400 text-[10px]">fim alnt</div>
        </div>
        <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white shadow-sm" />
      </div>

      <div className="absolute bottom-8 left-16">
        <MapPin size={28} className="text-[#2D9D78] drop-shadow-md map-pulse" fill="#2D9D78" fillOpacity={0.2} />
      </div>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md">
        <Truck size={18} className="text-[#2D9D78]" />
      </div>
    </div>
  );
}

export default function ClientHomeScreen({ onNavigate }: ClientHomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearchResult(q);
  };

  const navItems = [
    { id: 'client-orders', label: 'طلباتي', icon: ClipboardList, active: false },
    { id: 'client-chat', label: 'الرسائل', icon: MessageCircle, active: false },
    { id: 'client-settings', label: 'الإعدادات', icon: Settings, active: false },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F5F6F8]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <User size={18} className="text-gray-500" />
          </button>
          <h1 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Cairo, sans-serif' }}>
            رسلني
          </h1>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center relative">
            <Bell size={18} className="text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#2D9D78] rounded-full" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            placeholder="عايز تشتري أو توصل شنو اليوم؟"
            className="w-full bg-[#F5F6F8] rounded-2xl py-3 pr-4 pl-11 text-sm text-gray-700 outline-none border border-transparent focus:border-[#2D9D78] transition-colors"
            style={{ fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}
          />
          <button
            onClick={handleSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Search size={18} className="text-gray-400 hover:text-[#2D9D78] transition-colors" />
          </button>
        </div>
        {searchResult && (
          <p className="mt-2 text-xs text-[#2D9D78] font-medium text-right" style={{ fontFamily: 'Cairo, sans-serif' }}>
            نتائج البحث عن: {searchResult}
          </p>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4">
        {/* Categories */}
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex flex-col items-center gap-2 bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow active:scale-95"
            >
              <div className="w-12 h-12 bg-[#E8F5F0] rounded-xl flex items-center justify-center text-2xl">
                {cat.icon}
              </div>
              <span className="text-xs text-gray-700 font-medium text-center leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Custom Order Section Label */}
        <div className="flex items-center justify-between">
          <button className="text-[#2D9D78] text-sm font-semibold">عرض الكل</button>
          <h2 className="text-base font-bold text-[#1A1A2E]">طرد مخصص</h2>
        </div>

        {/* Active Order Card */}
        <div className="bg-white rounded-3xl shadow-md p-4 order-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#2D9D78] font-bold text-sm">قادم إليك</span>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#E8F5F0] rounded-xl flex items-center justify-center">
                <Truck size={20} className="text-[#2D9D78]" />
              </div>
              <span className="text-base font-bold text-[#1A1A2E]">Active Order</span>
            </div>
          </div>

          {/* Map */}
          <MapPreview />

          {/* Order info */}
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={() => onNavigate('client-chat')}
              className="bg-[#E8F5F0] text-[#2D9D78] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#d4ede4] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle size={15} />
              مراسلة المندوب
            </button>
            <div className="text-right">
              <p className="text-xs text-gray-400">رقم الطلب</p>
              <p className="text-sm font-bold text-[#1A1A2E]">#ORD-2841</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <button className="text-[#2D9D78] text-sm font-semibold">عرض الكل</button>
            <h2 className="text-base font-bold text-[#1A1A2E]">الطلبات الأخيرة</h2>
          </div>
          <div className="space-y-2">
            {[
              { label: 'طرد من السوق المركزي', time: 'أمس', status: 'مكتمل' },
              { label: 'دواء من صيدلية النيل', time: 'منذ يومين', status: 'مكتمل' },
            ].map((order, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm">
                <span className="text-xs text-gray-400 bg-green-50 text-green-600 px-2 py-1 rounded-lg font-medium">
                  {order.status}
                </span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#1A1A2E]">{order.label}</p>
                  <p className="text-xs text-gray-400">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-100 px-2 py-3 pb-6">
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
                  style={item.active ? { background: '#E8F5F0' } : {}}
                >
                  <Icon
                    size={18}
                    className={item.active ? 'text-[#2D9D78]' : 'text-gray-400'}
                  />
                </div>
                <span
                  className={'text-[10px] font-semibold ' + (item.active ? 'text-[#2D9D78]' : 'text-gray-400')}
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
