import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Camera, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const Scan = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    setIsCapturing(true);
    
    // Create a mock analyzed case
    const newCase = {
      id: `RPT-${new Date().toISOString().split('T')[0]}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      patientName: 'Sarah Johnson',
      patientId: 'PT-2024-001',
      tooth: '#14 (Upper Left)',
      date: new Date().toISOString().split('T')[0],
      status: 'Analyzed',
      diagnosis: 'Moderate Occlusal Cavity',
      confidence: 94.7,
      area: '12.4 mm²',
      diameter: '3.97 mm',
      depthStage: 'D2 — Dentin',
      treatment: 'Composite Restoration',
      treatmentPlan: [
        { step: 1, description: 'Local anesthesia administration', timeline: 'Day 1' },
        { step: 2, description: 'Caries removal with dental drill', timeline: 'Day 1' },
        { step: 3, description: 'Composite resin placement', timeline: 'Day 1' },
        { step: 4, description: 'Post-treatment X-ray', timeline: 'Day 1' },
        { step: 5, description: 'Follow-up assessment', timeline: 'Week 4' },
      ],
    };

    try {
      await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCase),
      });
      setTimeout(() => {
        navigate('/reports');
      }, 1500);
    } catch (err) {
      console.error("Error saving case:", err);
      setIsCapturing(false);
    }
  };

  return (
    <div className="pb-20 px-6 pt-6 max-w-md mx-auto bg-white min-h-screen">
      <header className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-slate-50 rounded-lg border border-gray-100 text-slate-600"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Capture Image</h1>
          <p className="text-gray-500 text-xs">Position tooth in frame</p>
        </div>
      </header>

      <div className="relative aspect-square bg-slate-900 rounded-2xl overflow-hidden mb-4 shadow-xl">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        />
        
        {/* Viewfinder Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 border-2 border-white/30 rounded-2xl relative">
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-sky-500 rounded-tl-lg"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-sky-500 rounded-tr-lg"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-sky-500 rounded-bl-lg"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-sky-500 rounded-br-lg"></div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 gap-3">
          <Camera size={40} />
          <p className="text-xs font-medium">Camera preview</p>
        </div>

        {isCapturing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white flex items-center justify-center z-10"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sky-600 text-sm font-bold">Analyzing tooth...</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="bg-sky-50 p-3 rounded-xl border border-sky-100 flex gap-3 mb-6">
        <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center text-sky-500 shrink-0">
          <span className="text-base font-bold">⚡</span>
        </div>
        <p className="text-[11px] text-sky-700 leading-tight">
          Ensure good lighting and hold the camera steady. Center the tooth in the frame for best results.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="py-3.5 rounded-xl border border-gray-200 text-slate-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
          <ShieldCheck size={16} />
          Validate
        </button>
        <button 
          onClick={handleCapture}
          className="py-3.5 rounded-xl bg-sky-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all active:scale-95"
        >
          <Camera size={16} />
          Capture
        </button>
      </div>
    </div>
  );
};
