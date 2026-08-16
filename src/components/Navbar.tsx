import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  Scale,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { AnimatedCounter } from './AnimatedCounter';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiAdvisor: () => void;
  onOpenComparisonModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiAdvisor,
  onOpenComparisonModal,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { favorites, comparisonList } = useFavorites();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'listings', label: 'Properties' },
    { id: 'favorites', label: 'Favorites', badge: favorites.length },
    { id: 'agents', label: 'Agents' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0A0B0D]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37] text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 rotate-6 group-hover:rotate-0 transition-transform">
            E
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Estate<span className="text-[#D4AF37]">Hub</span>
            </span>
            <span className="block text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-[#D4AF37]/80">
              Luxury Real Estate
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Simple Text Menus without icons) */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#D4AF37] dark:text-[#D4AF37] bg-amber-50 dark:bg-[#D4AF37]/10 border border-amber-200 dark:border-[#D4AF37]/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-[11px] font-bold rounded-full bg-[#D4AF37] text-slate-950">
                    <AnimatedCounter value={item.badge} />
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* AI Matcher Button */}
          <button
            onClick={onOpenAiAdvisor}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#C5A028] shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>AI Matcher</span>
          </button>

          {/* Compare Button */}
          {comparisonList.length > 0 && (
            <button
              onClick={onOpenComparisonModal}
              className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#16181D] border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Compare Properties"
            >
              <Scale className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden md:inline">Compare</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37] text-slate-950">
                <AnimatedCounter value={comparisonList.length} />
              </span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#16181D] border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark / Light Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 animate-in fade-in zoom-in-75 duration-200" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 animate-in fade-in zoom-in-75 duration-200" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Mobile Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0B0D] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3">
            <button
              onClick={() => {
                onOpenAiAdvisor();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#D4AF37]"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>AI Matcher</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-[#16181D] border border-slate-200 dark:border-white/10"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {comparisonList.length > 0 && (
              <button
                onClick={() => {
                  onOpenComparisonModal();
                  setIsMobileMenuOpen(false);
                }}
                className="col-span-2 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-[#16181D] border border-white/10"
              >
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>Compare (<AnimatedCounter value={comparisonList.length} />)</span>
              </button>
            )}
          </div>

          <div className="space-y-1">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#D4AF37] dark:text-[#D4AF37] bg-amber-50 dark:bg-[#D4AF37]/10 font-semibold border border-[#D4AF37]/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#D4AF37] text-slate-950">
                      <AnimatedCounter value={item.badge} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
