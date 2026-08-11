'use client';

import { useState } from 'react';
import { User, Phone, Truck, ChevronDown, Upload, CheckCircle2, Lock, Eye, EyeOff, Hash } from 'lucide-react';

interface CourierRegisterScreenProps {
  onNavigate: (screen: string) => void;
}

export default function CourierRegisterScreen({ onNavigate }: CourierRegisterScreenProps) {
  const [vehicleType, setVehicleType] = useState('');
  const [showVehicleMenu, setShowVehicleMenu] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', plate: '', password: '' });

  const vehicleOptions = ['موتر', 'ركشة', 'سيارة'];

  const handleFileUpload = () => {
    setIdUploaded(true);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F6F8' }}>
      {/* Dark Header */}
      <div className="px-5 pt-12 pb-5" style={{ background: '#1A2E2B' }}>
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <User size={18} className="text-white/70" />
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Cairo, sans-serif' }}>
            رسلني
          </h1>
          <div className="w-9 h-9" />
        </div>
      </div>

      {/* Form area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
        <h2 className="text-xl font-bold text-[#1A1A2E] text-center mb-6">إنشاء حساب مندوب</h2>

        <div className="space-y-3">
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

          {/* Vehicle Type */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowVehicleMenu(!showVehicleMenu)}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pr-12 pl-11 text-sm text-right shadow-sm flex items-center justify-between"
              style={{ fontFamily: 'Cairo, sans-serif' }}
            >
              <ChevronDown size={16} className="text-gray-400" />
              <span className={vehicleType ? 'text-gray-700' : 'text-gray-400'}>
                {vehicleType || 'نوع المركبة'}
              </span>
            </button>
            <Truck size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

            {showVehicleMenu && (
              <div className="absolute top-full right-0 left-0 mt-1 bg-white rounded-2xl shadow-lg border border-gray-100 z-10 overflow-hidden">
                {vehicleOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setVehicleType(opt); setShowVehicleMenu(false); }}
                    className="w-full text-right px-4 py-3 text-sm text-gray-700 hover:bg-[#E8F5F0] transition-colors"
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Plate Number */}
          <div className="relative">
            <input
              type="text"
              placeholder="رقم اللوحة"
              value={form.plate}
              onChange={(e) => setForm({ ...form, plate: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pr-12 pl-4 text-sm text-gray-700 outline-none focus:border-[#2D9D78] transition-colors shadow-sm"
              style={{ fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}
            />
            <Hash size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
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

          {/* Upload ID */}
          <button
            type="button"
            onClick={handleFileUpload}
            className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pr-4 pl-4 text-sm shadow-sm flex items-center justify-between transition-colors hover:border-[#2D9D78]"
            style={{ fontFamily: 'Cairo, sans-serif' }}
          >
            {idUploaded ? (
              <>
                <CheckCircle2 size={18} className="text-[#2D9D78]" />
                <span className="text-[#2D9D78] font-semibold">تم رفع الهوية</span>
              </>
            ) : (
              <>
                <Upload size={18} className="text-gray-400" />
                <span className="text-gray-400">رفع صورة الهوية / الجواز / البطاقة الوطنية</span>
              </>
            )}
          </button>

          {/* Submit Button */}
          <button
            onClick={() => onNavigate('courier-home')}
            className="w-full text-white font-bold py-4 rounded-2xl text-base mt-2 transition-all active:scale-[0.98] shadow-md"
            style={{
              background: 'linear-gradient(135deg, #2D9D78 0%, #1E7A5A 100%)',
              fontFamily: 'Cairo, sans-serif',
            }}
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
