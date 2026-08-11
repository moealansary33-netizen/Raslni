'use client';

import { useState } from 'react';
import { Bell, User, Phone, Lock, Eye, EyeOff } from 'lucide-react';

interface ClientRegisterScreenProps {
  onNavigate: (screen: string) => void;
}

export default function ClientRegisterScreen({ onNavigate }: ClientRegisterScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', password: '' });

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
      </div>

      {/* Form area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-8">
        <h2 className="text-xl font-bold text-[#1A1A2E] text-center mb-8">إنشاء حساب عميل</h2>

        <div className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pr-12 pl-4 text-sm text-gray-700 outline-none focus:border-[#2D9D78] transition-colors shadow-sm"
              style={{ fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}
            />
            <User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Phone */}
          <div className="relative">
            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pr-12 pl-4 text-sm text-gray-700 outline-none focus:border-[#2D9D78] transition-colors shadow-sm"
              style={{ fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}
            />
            <Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="كلمة المرور"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pr-12 pl-11 text-sm text-gray-700 outline-none focus:border-[#2D9D78] transition-colors shadow-sm"
              style={{ fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}
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

          {/* Submit Button */}
          <button
            onClick={() => onNavigate('client-home')}
            className="w-full bg-[#2D9D78] text-white font-bold py-4 rounded-2xl text-base mt-2 hover:bg-[#237A5E] transition-all active:scale-[0.98] shadow-md"
            style={{ fontFamily: 'Cairo, sans-serif' }}
          >
            تسجيل
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 mt-2">
            <button
              onClick={() => onNavigate('landing')}
              className="text-[#2D9D78] font-semibold hover:underline"
            >
              تسجيل الدخول
            </button>
            {' '}لديك حساب؟
          </p>
        </div>
      </div>
    </div>
  );
}
