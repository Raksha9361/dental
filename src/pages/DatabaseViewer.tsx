import React, { useEffect, useState } from 'react';
import { ArrowLeft, Database, RefreshCw, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Case } from '../types';
import { motion } from 'motion/react';

export const DatabaseViewer = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = () => {
    setLoading(true);
    fetch('/api/cases')
      .then(res => res.json())
      .then(data => {
        setCases(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching cases:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/settings" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-slate-600" />
            </Link>
            <h1 className="text-lg font-bold text-slate-900">Database Viewer</h1>
          </div>
          <button 
            onClick={fetchCases}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <RefreshCw size={18} className={loading ? "animate-spin text-sky-500" : "text-slate-600"} />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <Database size={16} className="text-sky-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Table: cases ({cases.length} rows)</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">ID</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">Patient</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">Date</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {cases.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-400 text-sm italic">
                      No data found in database.
                    </td>
                  </tr>
                ) : (
                  cases.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-[11px] font-mono text-slate-600">{c.id.split('-').pop()}</td>
                      <td className="px-4 py-3 text-xs font-medium text-slate-900">{c.patientName}</td>
                      <td className="px-4 py-3 text-[11px] text-slate-500">{c.date}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tight ${
                          c.status === 'Analyzed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-sky-50 rounded-xl border border-sky-100">
          <h3 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-2">How to add data?</h3>
          <p className="text-xs text-sky-700 leading-relaxed">
            Go to the <strong>Scan</strong> page and capture an image. The app will automatically save a new row to this table.
          </p>
        </div>
      </main>
    </div>
  );
};
