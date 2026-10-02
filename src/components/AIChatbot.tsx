'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MessageCircle,
  X,
  Send,
  ChefHat,
  ChevronRight,
  RotateCcw,
  Bot,
  User,
  GraduationCap,
  CalendarCheck,
  Bike
} from 'lucide-react';

interface ChatAction {
  label: string;
  url: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: 'firebase-ai-logic' | 'domain-engine';
  actions?: ChatAction[];
  timestamp: string;
}

const DEFAULT_WELCOME_MESSAGE: Message = {
  id: 'msg-welcome',
  sender: 'assistant',
  source: 'firebase-ai-logic',
  text: "Namaste! 🙏 I'm **Chef Genie**, your personal MyChef AI Food Concierge powered by **Firebase AI Logic** (`mychef-7e869`).\n\nAsk me anything about daily tiffins, **₹84 student PG mess passes**, Jain/Pure Veg meals, or how our **100% Skip & Pause Policy** works!",
  actions: [
    { label: 'Explore Local Kitchens', url: '/explore' },
    { label: 'Student Meal Passes (₹84)', url: '/passes' }
  ],
  timestamp: 'Just now'
};


const STARTER_PROMPTS = [
  '🎓 How does the ₹84 Student Mess work?',
  '🍛 Recommend pure veg thali for lunch',
  '⏸️ What is the meal skip & pause policy?',
  '⚡ What are today\'s dispatch cutoff times?'
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([DEFAULT_WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  const lastUserMessageRef = useRef<string>('');

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    lastUserMessageRef.current = query;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const botMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I'm here to help with your meals! What would you like to explore?",
        source: data.source || 'firebase-ai-logic',
        actions: data.actions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `bot_err_${Date.now()}`,
        sender: 'assistant',
        source: 'domain-engine',
        text: "There was a momentary network interruption connecting to the server. Your request was saved—tap **Try Again** or browse the links below!",
        actions: [
          { label: '🔄 Try Again', url: '#retry' },
          { label: 'Browse Local Kitchens', url: '/explore' },
          { label: 'Student Meal Passes (₹84)', url: '/passes' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };


  const handleResetChat = () => {
    setMessages([DEFAULT_WELCOME_MESSAGE]);
  };

  // Helper to format simple markdown bold tags **text** into <strong>
  const formatMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-stone-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-stone-800 text-xs font-bold shadow-lg border border-orange-200 animate-in fade-in slide-in-from-right-3 duration-300 hover:border-orange-400 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Ask Chef Genie AI</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Chef AI Assistant" : "Open Chef AI Assistant"}
          className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 ${
            isOpen 
              ? 'bg-stone-900 text-white rotate-90 scale-95' 
              : 'btn-animated-primary text-white hover:scale-105 active:scale-95 shadow-orange-500/30 ring-4 ring-orange-400/20'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <ChefHat className="w-6 h-6" />
              <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1.5 -right-1.5 fill-amber-300 animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* Interactive AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[92vw] sm:w-[390px] h-[540px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white p-3.5 px-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm text-white leading-tight">Chef Genie AI</h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-emerald-200 text-[9px] font-black uppercase border border-emerald-400/40">
                    Firebase AI
                  </span>
                </div>
                <p className="text-[10px] text-amber-100 font-medium">Firebase AI Logic • mychef-7e869</p>
              </div>
            </div>


            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5 border border-orange-200 shadow-2xs">
                    <ChefHat className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-orange-600 text-white rounded-tr-xs shadow-xs font-semibold'
                      : 'bg-white text-stone-700 rounded-tl-xs border border-stone-200 shadow-2xs space-y-2'
                  }`}
                >
                  <p className="whitespace-pre-line text-xs">
                    {msg.sender === 'assistant' ? formatMessageText(msg.text) : msg.text}
                  </p>

                  {/* Contextual Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-stone-100">
                      {msg.actions.map((act, idx) => {
                        if (act.url === '#retry') {
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(lastUserMessageRef.current)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-[11px] transition-colors shadow-2xs cursor-pointer"
                            >
                              <span>{act.label}</span>
                            </button>
                          );
                        }
                        return (
                          <Link
                            key={idx}
                            href={act.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-[11px] transition-colors border border-orange-200 shadow-2xs"
                          >
                            <span>{act.label}</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        );
                      })}
                    </div>
                  )}


                  <span className={`text-[9px] block text-right font-medium ${msg.sender === 'user' ? 'text-orange-200' : 'text-stone-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-xs p-3 border border-stone-200 shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="p-2 bg-stone-100/80 border-t border-stone-200 overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
            {STARTER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-xl bg-white hover:bg-orange-50 text-stone-700 hover:text-orange-700 text-[10px] font-extrabold whitespace-nowrap border border-stone-200 transition-colors shrink-0 shadow-2xs cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about thalis, ₹84 pass, skip rules..."
              className="flex-1 px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-stone-900"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="w-9 h-9 rounded-xl btn-animated-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
