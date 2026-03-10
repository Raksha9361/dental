import React, { useEffect, useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Case } from '../types';

export const Reports = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cases')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setReport(data[0]); // Latest case
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching report:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-6 text-center">
        <p className="text-gray-500 mb-4">No reports found. Start a new scan to generate a report.</p>
        <button 
          onClick={() => navigate('/scan')}
          className="bg-sky-500 text-white px-6 py-3 rounded-xl font-bold"
        >
          Start Scan
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 px-6 pt-6 max-w-md mx-auto bg-slate-50 min-h-screen">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Case Report</h1>
          <p className="text-gray-500 text-xs">Generated · Mar 3, 2026</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-lg shadow-sm text-sky-500 text-[11px] font-bold uppercase tracking-wider">
          <Download size={14} />
          Export PDF
        </button>
      </header>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-4"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Report ID</p>
            <h2 className="text-base font-bold text-slate-900">{report.id}</h2>
          </div>
          <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase">Finalized</span>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-6">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mb-0.5">Patient</p>
            <p className="text-xs font-bold text-slate-900">{report.patientName}</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mb-0.5">Patient ID</p>
            <p className="text-xs font-bold text-slate-900">{report.patientId}</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mb-0.5">Tooth</p>
            <p className="text-xs font-bold text-slate-900">{report.tooth}</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mb-0.5">Dentist</p>
            <p className="text-xs font-bold text-slate-900">Dr. Smith</p>
          </div>
        </div>
      </motion.div>

      <section className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-4">
        <h3 className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-3">AI Findings Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Diagnosis</span>
            <span className="text-xs font-bold text-slate-900">{report.diagnosis}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Confidence</span>
            <span className="text-xs font-bold text-sky-500">{report.confidence}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Area</span>
            <span className="text-xs font-bold text-slate-900">{report.area}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Diameter</span>
            <span className="text-xs font-bold text-slate-900">{report.diameter}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Depth Stage</span>
            <span className="text-xs font-bold text-slate-900">{report.depthStage}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Treatment</span>
            <span className="text-xs font-bold text-slate-900">{report.treatment}</span>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-6">
        <h3 className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-3">Treatment Plan</h3>
        <div className="space-y-3">
          {report.treatmentPlan?.map((step) => (
            <div key={step.step} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                {step.step}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-700">{step.description}</p>
              </div>
              <span className="text-[9px] text-gray-400 font-bold whitespace-nowrap">{step.timeline}</span>
            </div>
          ))}
        </div>
      </section>

      <button 
        onClick={() => navigate('/')}
        className="w-full bg-sky-500 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all active:scale-95"
      >
        <CheckCircle2 size={18} />
        Done — Back to Dashboard
      </button>
    </div>
  );
};
