import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, Camera, FileText, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export const BottomNav = () => {
  const navItems = [
    { icon: LayoutGrid, label: 'Home', path: '/' },
    { icon: Camera, label: 'Scan', path: '/scan' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-50 pb-safe">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-0.5 transition-colors py-1",
              isActive ? "text-sky-500" : "text-gray-400 hover:text-gray-600"
            )
          }
        >
          <item.icon size={22} />
          <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
