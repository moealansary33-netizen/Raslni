'use client';

import { useState } from 'react';
import { ArrowRight, User, Phone, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import LandingScreen from '@/components/rasilni/LandingScreen';
import ClientHomeScreen from '@/components/rasilni/ClientHomeScreen';
import CourierHomeScreen from '@/components/rasilni/CourierHomeScreen';
import ClientRegisterScreen from '@/components/rasilni/ClientRegisterScreen';
import CourierRegisterScreen from '@/components/rasilni/CourierRegisterScreen';
import LoginScreen from '@/components/rasilni/LoginScreen';
import ChatScreen from '@/components/rasilni/ChatScreen';

type Screen =
  | 'landing'
  | 'client-home'
  | 'courier-home'
  | 'client-register'
  | 'courier-register'
  | 'login'
  | 'client-orders'
  | 'courier-orders'
  | 'client-wallet'
  | 'courier-wallet'
  | 'client-settings'
  | 'courier-settings'
  | 'client-chat'
  | 'courier-chat'
  | 'client-profile'
  | 'courier-profile';

const ORDER_ID = 'ORD-2841';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('landing');

  const navigate = (s: string) => setScreen(s as Screen);

  const renderScreen = () => {
    switch (screen) {
      case 'landing':
        return <LandingScreen onNavigate={navigate} />;
      case 'client-home':
        return <ClientHomeScreen onNavigate={navigate} />;
      case 'courier-home':
        return <CourierHomeScreen onNavigate={navigate} />;
      case 'client-register':
        return <ClientRegisterScreen onNavigate={navigate} />;
      case 'courier-register':
        return <CourierRegisterScreen onNavigate={navigate} />;
      case 'login':
        return <LoginScreen onNavigate={navigate} />;
      case 'client-chat':
        return <ChatScreen role="client" orderId={ORDER_ID} onNavigate={navigate} />;
      case 'courier-chat':
        return <ChatScreen role="courier" orderId={ORDER_ID} onNavigate={navigate} />;
      case 'client-orders':
        return <OrdersScreen title="طلباتي" onNavigate={navigate} homeScreen="client-home" />;
      case 'courier-orders':
        return <OrdersScreen title="طلباتي" onNavigate={navigate} homeScreen="courier-home" dark />;
      case 'client-wallet':
        return <WalletScreen onNavigate={navigate} homeScreen="client-home" />;
      case 'courier-wallet':
        return <WalletScreen onNavigate={navigate} homeScreen="courier-home" dark />;
      case 'client-settings':
        return <SettingsScreen onNavigate={navigate} homeScreen="client-home" />;
      case 'courier-settings':
        return <SettingsScreen onNavigate={navigate} homeScreen="courier-home" dark />;
      case 'client-profile':
        return <ProfileScreen onNavigate={navigate} homeScreen="client-home" />;
      case 'courier-profile':
        return <ProfileScreen onNavigate={navigate} homeScreen="courier-home" dark />;
      default:
        return <LandingScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="phone-frame" style={{ maxWidth: 390 }}>
        <div className="h-full" style={{ minHeight: 844 }}>
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}

function OrdersScreen({
  title,
  onNavigate,
  homeScreen,
  dark,
}: {
  title: string;
  onNavigate: (s: string) => void;
  homeScreen: string;
  dark?: boolean;
}) {
  const orders = [
    { id: '#ORD-2841', label: 'طرد مخصص', status: 'قيد التوصيل', time: 'اليوم' },
    { id: '#ORD-2830', label: 'طرد من السوق المركزي', status: 'مكتمل', time: 'أمس' },
    { id: '#ORD-2811', label: 'دواء من صيدلية النيل', status: 'مكتمل', time: 'منذ يومين' },
  ];

  return (
    <div className="flex flex-col h-full" style={dark ? { background: '#1B3432' } : { background: '#F5F6F8' }}>
      <div
        className="px-4 pt-12 pb-4 flex items-center gap-3"
        style={dark ? { background: '#1A2E2B' } : { background: '#fff' }}
      >
        <button
          onClick={() => onNavigate(homeScreen)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={dark ? { background: 'rgba(255,255,255,0.1)' } : { background: '#F5F6F8' }}
        >
          <ArrowRight size={18} style={{ color: dark ? '#fff' : '#6B7280' }} />
        </button>
        <h1
          className="text-lg font-bold"
          style={{ color: dark ? '#fff' : '#1A1A2E', fontFamily: 'Cairo, sans-serif' }}
        >
          {title}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-3">
        {orders.map((order, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 shadow-sm"
            style={dark ? { background: '#243B38' } : { background: '#fff' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-semibold px-2 py-1 rounded-lg"
                style={
                  order.status === 'مكتمل'
                    ? { background: '#E8F5F0', color: '#2D9D78' }
                    : { background: '#FEF3C7', color: '#92400E' }
                }
              >
                {order.status}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: dark ? '#fff' : '#1A1A2E', fontFamily: 'Cairo, sans-serif' }}
              >
                {order.id}
              </span>
            </div>
            <p
              className="text-sm"
              style={{ color: dark ? 'rgba(255,255,255,0.7)' : '#6B7280', fontFamily: 'Cairo, sans-serif' }}
            >
              {order.label}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: dark ? 'rgba(255,255,255,0.4)' : '#9CA3AF' }}
            >
              {order.time}
            </p>
          </div>
        ))}
        <div className="h-4" />
      </div>
    </div>
  );
}

function WalletScreen({
  onNavigate,
  homeScreen,
  dark,
}: {
  onNavigate: (s: string) => void;
  homeScreen: string;
  dark?: boolean;
}) {
  const [amount, setAmount] = useState('');
  const [done, setDone] = useState(false);

  const recharge = () => {
    if (!amount) return;
    setDone(true);
    setTimeout(() => { setDone(false); setAmount(''); }, 2000);
  };

  return (
    <div className="flex flex-col h-full" style={dark ? { background: '#1B3432' } : { background: '#F5F6F8' }}>
      <div
        className="px-4 pt-12 pb-4 flex items-center gap-3"
        style={dark ? { background: '#1A2E2B' } : { background: '#fff' }}
      >
        <button
          onClick={() => onNavigate(homeScreen)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={dark ? { background: 'rgba(255,255,255,0.1)' } : { background: '#F5F6F8' }}
        >
          <ArrowRight size={18} style={{ color: dark ? '#fff' : '#6B7280' }} />
        </button>
        <h1
          className="text-lg font-bold"
          style={{ color: dark ? '#fff' : '#1A1A2E', fontFamily: 'Cairo, sans-serif' }}
        >
          المحفظة
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6 space-y-4">
        <div
          className="rounded-2xl p-5"
          style={{ background: 'linear-gradient(135deg, #2D9D78 0%, #1E7A5A 100%)' }}
        >
          <p className="text-white/80 text-xs mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>
            الرصيد الحالي
          </p>
          <p className="text-white text-2xl font-bold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            50,000 ج.س.
          </p>
        </div>

        <div
          className="rounded-2xl p-4 shadow-sm"
          style={dark ? { background: '#243B38' } : { background: '#fff' }}
        >
          <h2
            className="text-sm font-bold mb-3"
            style={{ color: dark ? '#fff' : '#1A1A2E', fontFamily: 'Cairo, sans-serif' }}
          >
            شحن الرصيد
          </h2>
          <div className="relative mb-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="المبلغ"
              className="w-full rounded-2xl py-3.5 pr-4 pl-4 text-sm outline-none transition-colors"
              style={
                dark
                  ? { background: '#1A2E2B', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }
                  : { background: '#F5F6F8', color: '#1A1A2E', border: '1px solid #E5E7EB', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }
              }
            />
          </div>
          <div className="flex gap-2 mb-3">
            {[1000, 5000, 10000].map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(String(amt))}
                className="flex-1 text-xs font-semibold py-2 rounded-xl transition-colors"
                style={
                  dark
                    ? { background: 'rgba(45,157,120,0.2)', color: '#5DCEA6' }
                    : { background: '#E8F5F0', color: '#2D9D78' }
                }
              >
                {amt.toLocaleString()} ج.س.
              </button>
            ))}
          </div>
          <button
            onClick={recharge}
            disabled={!amount || done}
            className="w-full bg-[#2D9D78] text-white font-bold py-3.5 rounded-2xl text-sm hover:bg-[#237A5E] transition-colors disabled:opacity-50 active:scale-[0.98]"
            style={{ fontFamily: 'Cairo, sans-serif' }}
          >
            {done ? 'تم الشحن بنجاح' : 'شحن'}
          </button>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}

function SettingsScreen({
  onNavigate,
  homeScreen,
  dark,
}: {
  onNavigate: (s: string) => void;
  homeScreen: string;
  dark?: boolean;
}) {
  const isCourier = homeScreen === 'courier-home';
  const profileScreen = isCourier ? 'courier-profile' : 'client-profile';

  const items = [
    { label: 'تعديل الملف الشخصي', action: () => onNavigate(profileScreen) },
    { label: 'الإشعارات', action: () => onNavigate(homeScreen) },
    { label: 'اللغة', action: () => onNavigate(homeScreen) },
    { label: 'الدعم والمساعدة', action: () => onNavigate(homeScreen) },
    { label: 'تسجيل الخروج', action: () => onNavigate('landing') },
  ];

  return (
    <div className="flex flex-col h-full" style={dark ? { background: '#1B3432' } : { background: '#F5F6F8' }}>
      <div
        className="px-4 pt-12 pb-4 flex items-center gap-3"
        style={dark ? { background: '#1A2E2B' } : { background: '#fff' }}
      >
        <button
          onClick={() => onNavigate(homeScreen)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={dark ? { background: 'rgba(255,255,255,0.1)' } : { background: '#F5F6F8' }}
        >
          <ArrowRight size={18} style={{ color: dark ? '#fff' : '#6B7280' }} />
        </button>
        <h1
          className="text-lg font-bold"
          style={{ color: dark ? '#fff' : '#1A1A2E', fontFamily: 'Cairo, sans-serif' }}
        >
          الإعدادات
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="w-full rounded-2xl p-4 shadow-sm flex items-center justify-between transition-colors hover:opacity-80"
            style={dark ? { background: '#243B38' } : { background: '#fff' }}
          >
            <ArrowRight size={18} style={{ color: dark ? 'rgba(255,255,255,0.4)' : '#9CA3AF' }} />
            <span
              className="text-sm font-medium"
              style={{
                color: item.label === 'تسجيل الخروج' ? '#EF4444' : (dark ? '#fff' : '#1A1A2E'),
                fontFamily: 'Cairo, sans-serif',
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
        <div className="h-4" />
      </div>
    </div>
  );
}

function ProfileScreen({
  onNavigate,
  homeScreen,
  dark,
}: {
  onNavigate: (s: string) => void;
  homeScreen: string;
  dark?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: 'أحمد محمد', phone: '0912345678', password: '' });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-full" style={dark ? { background: '#1B3432' } : { background: '#F5F6F8' }}>
      <div
        className="px-4 pt-12 pb-4 flex items-center gap-3"
        style={dark ? { background: '#1A2E2B' } : { background: '#fff' }}
      >
        <button
          onClick={() => onNavigate(homeScreen === 'courier-home' ? 'courier-settings' : 'client-settings')}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={dark ? { background: 'rgba(255,255,255,0.1)' } : { background: '#F5F6F8' }}
        >
          <ArrowRight size={18} style={{ color: dark ? '#fff' : '#6B7280' }} />
        </button>
        <h1
          className="text-lg font-bold"
          style={{ color: dark ? '#fff' : '#1A1A2E', fontFamily: 'Cairo, sans-serif' }}
        >
          تعديل الملف الشخصي
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-[#2D9D78] flex items-center justify-center">
            <User size={36} className="text-white" />
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="الاسم الكامل"
            className="w-full rounded-2xl py-3.5 pr-12 pl-4 text-sm outline-none transition-colors"
            style={
              dark
                ? { background: '#243B38', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }
                : { background: '#fff', color: '#1A1A2E', border: '1px solid #E5E7EB', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }
            }
          />
          <User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="رقم الهاتف"
            className="w-full rounded-2xl py-3.5 pr-12 pl-4 text-sm outline-none transition-colors"
            style={
              dark
                ? { background: '#243B38', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }
                : { background: '#fff', color: '#1A1A2E', border: '1px solid #E5E7EB', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }
            }
          />
          <Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="كلمة المرور الجديدة"
            className="w-full rounded-2xl py-3.5 pr-12 pl-11 text-sm outline-none transition-colors"
            style={
              dark
                ? { background: '#243B38', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }
                : { background: '#fff', color: '#1A1A2E', border: '1px solid #E5E7EB', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }
            }
          />
          <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#2D9D78] text-white font-bold py-4 rounded-2xl text-base mt-2 hover:bg-[#237A5E] transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
          style={{ fontFamily: 'Cairo, sans-serif' }}
        >
          {saved ? (
            <>
              <CheckCircle2 size={18} />
              تم الحفظ
            </>
          ) : (
            'حفظ التغييرات'
          )}
        </button>

        <div className="h-4" />
      </div>
    </div>
  );
}
