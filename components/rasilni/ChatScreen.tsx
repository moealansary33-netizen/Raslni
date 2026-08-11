'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Send, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ChatMessage {
  id: string;
  order_id: string;
  sender: 'client' | 'courier';
  content: string;
  created_at: string;
}

interface ChatScreenProps {
  role: 'client' | 'courier';
  orderId: string;
  onNavigate: (screen: string) => void;
}

export default function ChatScreen({ role, orderId, onNavigate }: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const load = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });
      if (!error && data) setMessages(data as ChatMessage[]);
      setLoading(false);
    };

    load();

    channel = supabase
      .channel(`chat:${orderId}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `order_id=eq.${orderId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [orderId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    const { error } = await supabase
      .from('chat_messages')
      .insert({ order_id: orderId, sender: role, content: text });
    if (error) {
      setInput(text);
    }
  };

  const formatTime = (ts: string) => {
    try {
      const d = new Date(ts);
      return d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F6F8]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 shadow-sm flex items-center gap-3">
        <button
          onClick={() => onNavigate(role === 'client' ? 'client-home' : 'courier-home')}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ArrowRight size={18} className="text-gray-600" />
        </button>
        <div className="w-10 h-10 bg-[#E8F5F0] rounded-full flex items-center justify-center">
          <MessageCircle size={20} className="text-[#2D9D78]" />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-bold text-[#1A1A2E]">
            {role === 'client' ? 'المندوب' : 'العميل'}
          </h2>
          <p className="text-xs text-gray-400">طلب #{orderId}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[#2D9D78] rounded-full" />
          <span className="text-xs text-[#2D9D78] font-semibold">متصل</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-400">جارٍ تحميل الرسائل...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <MessageCircle size={40} className="text-gray-300" />
            <p className="text-sm text-gray-400">لا توجد رسائل بعد. ابدأ المحادثة!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender === role;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[75%] ${isMe ? 'order-2' : ''}`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm ${
                      isMe
                        ? 'bg-[#2D9D78] text-white rounded-bl-md'
                        : 'bg-white text-[#1A1A2E] rounded-br-md shadow-sm'
                    }`}
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                  >
                    {msg.content}
                  </div>
                  <p className={`text-[10px] text-gray-400 mt-1 ${isMe ? 'text-left' : 'text-right'}`}>
                    {formatTime(msg.created_at)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="bg-white px-4 py-3 pb-6 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            placeholder="اكتب رسالة..."
            className="flex-1 bg-[#F5F6F8] rounded-2xl py-3 pr-4 pl-4 text-sm text-gray-700 outline-none border border-transparent focus:border-[#2D9D78] transition-colors"
            style={{ fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-11 h-11 bg-[#2D9D78] rounded-2xl flex items-center justify-center hover:bg-[#237A5E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            <Send size={18} className="text-white" style={{ transform: 'scaleX(-1)' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
