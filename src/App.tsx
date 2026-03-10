import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Scan } from './pages/Scan';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { DatabaseViewer } from './pages/DatabaseViewer';
import { BottomNav } from './components/BottomNav';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<RouteWrapper><Scan /></RouteWrapper>} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/database" element={<DatabaseViewer />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

function RouteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in duration-500">
      {children}
    </div>
  );
}
