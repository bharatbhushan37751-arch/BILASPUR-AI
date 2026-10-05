import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Menu, X, Bot, Calendar, Layers, GraduationCap } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDemoInfo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenDemoInfo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'planner', label: 'Plan Trip', icon: Calendar },
    { id: 'explore', label: 'Explore Bilaspur', icon: Layers },
    { id: 'guide', label: 'AI Guide', icon: Bot },
    { id: 'visualizer', label: 'AI Visualizer', icon: Sparkles },
    { id: 'about', label: 'About & Project', icon: GraduationCap },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 via-teal-700 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-stone-900">
                  Bilaspur<span className="text-emerald-700">AI</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  HP · INDIA
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">Smart Tourism & Local Discovery</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-stone-100 text-stone-900 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {onOpenDemoInfo && (
              <button
                onClick={onOpenDemoInfo}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                title="View College Project Problem & Solution Flow"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Project Pitch</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('planner')}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Plan My Trip</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            {onOpenDemoInfo && (
              <button
                onClick={() => {
                  onOpenDemoInfo();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg"
              >
                <GraduationCap className="w-4 h-4" />
                <span>College Project Problem & Architecture</span>
              </button>
            )}
            <button
              onClick={() => handleNavClick('planner')}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Plan My Trip</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
