
'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Package,
  Truck,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export default function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [role, setRole] = useState<'client' | 'courier'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const phone = form.phone.trim();
    const password = form.password;

    if (!phone || !password) {
      setError('أدخل رقم الهاتف وكلمة المرور');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const email = `${phone}@rasilni.app`;

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError || !authData.user) {
        setError('رقم الهاتف أو كلمة المرور غير صحيحة');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile) {
        await supabase.auth.signOut();
        setError('تم تسجيل الدخول لكن بيانات الحساب غير موجودة');
        return;
      }

      if (profile.role !== role) {
        await supabase.auth.signOut();

        if (role === 'client') {
          setError('هذا الحساب مسجل كمندوب');
        } else {
          setError('هذا الحساب مسجل كعميل');
        }

        return;
      }

      if (role === 'client') {
        onNavigate('client-home');
      } else {
        onNavigate('courier-home');
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background:
          'linear-gradient(160deg, #1A2E2B 0%, #0D1E1C 100%)',
      }}
    >
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => onNavigate('landing')}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ArrowRight size={18} className="text-white" />
        </button>

        <h1
          className="text-xl font-bold text-white"
          style={{ fontFamily: 'Cairo, sans-serif' }}
        >
          تسجيل الدخول
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
        <p
          className="text-white/60 text-sm mb-3 text-center"
          style={{ fontFamily: 'Cairo, sans-serif' }}
        >
          اختر نوع الحساب
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setRole('client')}
            className="flex flex-col items-center gap-2 py-4 rounded-2xl transition-all active:scale-[0.98]"
            style={{
              background:
                role === 'client'
                  ? '#2D9D78'
                  : 'rgba(255,255,255,0.05)',
              border:
                role === 'client'
                  ? '1px solid #2D9D78'
                  : '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <Package
              size={24}
              className={
                role === 'client'
                  ? 'text-white'
                  : 'text-white/50'
              }
            />

            <span
              className="text-sm font-bold"
              style={{
                color:
                  role === 'client'
                    ? '#fff'
                    : 'rgba(255,255,255,0.5)',
                fontFamily: 'Cairo, sans-serif',
              }}
            >
              عميل
            </span>
          </button>

          <button
            onClick={() => setRole('courier')}
            className="flex flex-col items-center gap-2 py-4 rounded-2xl transition-all active:scale-[0.98]"
            style={{
              background:
                role === 'courier'
                  ? '#2D9D78'
                  : 'rgba(255,255,255,0.05)',
              border:
                role === 'courier'
                  ? '1px solid #2D9D78'
                  : '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <Truck
              size={24}
              className={
                role === 'courier'
                  ? 'text-white'
                  : 'text-white/50'
              }
            />

            <span
              className="text-sm font-bold"
              style={{
                color:
                  role === 'courier'
                    ? '#fff'
                    : 'rgba(255,255,255,0.5)',
                fontFamily: 'Cairo, sans-serif',
              }}
            >
              مندوب
            </span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full bg-white/10 text-white border border-white/15 rounded-2xl py-3.5 pr-12 pl-4 text-sm outline-none focus:border-[#2D9D78] transition-colors placeholder:text-white/40"
              style={{
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
              }}
            />

            <Phone
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="كلمة المرور"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
              className="w-full bg-white/10 text-white border border-white/15 rounded-2xl py-3.5 pr-12 pl-11 text-sm outline-none focus:border-[#2D9D78] transition-colors placeholder:text-white/40"
              style={{
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
              }}
            />

            <Lock
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            >
              {showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>

          {error && (
            <div
              className="rounded-xl px-4 py-3 text-sm text-red-200 bg-red-500/10 border border-red-400/20 text-right"
              style={{ fontFamily: 'Cairo, sans-serif' }}
            >
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#2D9D78] text-white font-bold py-4 rounded-2xl text-base mt-2 hover:bg-[#237A5E] transition-all active:scale-[0.98] shadow-lg disabled:opacity-50"
            style={{ fontFamily: 'Cairo, sans-serif' }}
          >
            {loading ? 'جارٍ تسجيل الدخول...' : 'دخول'}
          </button>

          <p
            className="text-center text-sm text-white/50 mt-2"
            style={{ fontFamily: 'Cairo, sans-serif' }}
          >
            ليس لديك حساب؟{' '}

            <button
              onClick={() =>
                onNavigate(
                  role === 'client'
                    ? 'client-register'
                    : 'courier-register'
                )
              }
              className="text-[#5DCEA6] font-semibold hover:underline"
            >
              إنشاء حساب
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

