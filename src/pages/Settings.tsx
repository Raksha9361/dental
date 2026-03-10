import React, { useState } from 'react';
import { User, ChevronRight, Shield, HelpCircle, FileText, LogOut, Database } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export const Settings = () => {
  const [prefs, setPrefs] = useState({
    push: true,
    autoSave: true,
    dark: false,
  });

  const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={cn(
        "w-10 h-6 rounded-full relative transition-colors duration-200",
        active ? "bg-sky-500" : "bg-gray-200"
      )}
    >
      <div className={cn(
        "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
        active ? "translate-x-4" : "translate-x-0"
      )} />
    </button>
  );

  return (
    <div className="pb-20 px-6 pt-6 max-w-md mx-auto bg-slate-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="text-gray-500 text-xs">Manage your preferences</p>
      </header>

      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-6 flex items-center gap-4">
        <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center text-sky-500">
          <User size={28} />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-slate-900 text-sm">{MOCK_USER.name}</h2>
          <p className="text-[10px] text-gray-400 mb-0.5">{MOCK_USER.email}</p>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
            {MOCK_USER.role} · License #{MOCK_USER.license}
          </p>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </div>

      <section className="mb-6">
        <h3 className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-3 ml-2">Preferences</h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-3.5 flex justify-between items-center border-b border-gray-50">
            <div>
              <p className="text-xs font-bold text-slate-900">Push Notifications</p>
              <p className="text-[9px] text-gray-400">Case updates and reminders</p>
            </div>
            <Toggle active={prefs.push} onToggle={() => setPrefs(p => ({ ...p, push: !p.push }))} />
          </div>
          <div className="p-3.5 flex justify-between items-center border-b border-gray-50">
            <div>
              <p className="text-xs font-bold text-slate-900">Auto-Save Cases</p>
              <p className="text-[9px] text-gray-400">Save analysis automatically</p>
            </div>
            <Toggle active={prefs.autoSave} onToggle={() => setPrefs(p => ({ ...p, autoSave: !p.autoSave }))} />
          </div>
          <div className="p-3.5 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-slate-900">Dark Mode</p>
              <p className="text-[9px] text-gray-400">Reduce eye strain</p>
            </div>
            <Toggle active={prefs.dark} onToggle={() => setPrefs(p => ({ ...p, dark: !p.dark }))} />
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-3 ml-2">App</h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <Link to="/database" className="w-full p-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-gray-50">
            <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500">
              <Database size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-bold text-slate-900">Database Viewer</p>
              <p className="text-[9px] text-gray-400">View raw stored records</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </Link>
          <button className="w-full p-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-gray-50">
            <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <Shield size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-bold text-slate-900">Privacy & Security</p>
              <p className="text-[9px] text-gray-400">Data handling and permissions</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
          <button className="w-full p-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-gray-50">
            <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <HelpCircle size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-bold text-slate-900">Help & Support</p>
              <p className="text-[9px] text-gray-400">FAQs and contact</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
          <button className="w-full p-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
            <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <FileText size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-bold text-slate-900">Terms of Service</p>
              <p className="text-[9px] text-gray-400">Legal information</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        </div>
      </section>

      <div className="text-center mb-6">
        <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">DentalAI v2.4.1 · Build 2026.03.03</p>
      </div>

      <button className="w-full py-3.5 bg-red-50 text-red-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-red-100 hover:bg-red-100 transition-colors active:scale-95">
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  );
};
;
