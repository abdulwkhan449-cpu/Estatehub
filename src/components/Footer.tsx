import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Send, Heart, ArrowUp } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast('success', 'Subscribed to EstateHub Newsletter!', 'You will receive top luxury property alerts weekly.');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0B0D] text-slate-300 border-t border-white/10 transition-colors">
      {/* Top Banner Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Get Exclusive <span className="text-[#D4AF37]">Luxury Alerts</span>
            </h3>
            <p className="text-sm text-slate-400">
              Subscribe to receive new verified luxury listings, price drops, and market reports directly in your inbox.
            </p>
          </div>
          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#16181D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 text-slate-950" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#D4AF37] text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
              E
            </div>
            <span className="text-xl font-bold text-white">
              Estate<span className="text-[#D4AF37]">Hub</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            EstateHub is a premier luxury real estate platform providing seamless property discovery, intelligent AI matchmaking, verified listings, and direct access to top-rated agents.
          </p>
          <div className="space-y-2 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>450 Park Avenue, Suite 1800, New York, NY 10022</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>+1 (800) 555-ESTATE (378283)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>contact@estatehub.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-[#D4AF37] transition-colors">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('listings')} className="hover:text-[#D4AF37] transition-colors">
                Property Catalog
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('favorites')} className="hover:text-[#D4AF37] transition-colors">
                Saved Favorites
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('agents')} className="hover:text-[#D4AF37] transition-colors">
                Certified Agents
              </button>
            </li>
          </ul>
        </div>

        {/* Property Types */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Property Types</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => setActiveTab('listings')} className="hover:text-[#D4AF37] transition-colors">
                Modern Luxury Villas
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('listings')} className="hover:text-[#D4AF37] transition-colors">
                Downtown Penthouse Apartments
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('listings')} className="hover:text-[#D4AF37] transition-colors">
                Waterfront Family Houses
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('listings')} className="hover:text-[#D4AF37] transition-colors">
                Commercial Office Towers
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('listings')} className="hover:text-[#D4AF37] transition-colors">
                Exclusive Condos
              </button>
            </li>
          </ul>
        </div>

        {/* Support & Contact */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Customer Support</h4>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Our luxury real estate specialists are available 24/7 to assist with inquiries and private viewings.
          </p>
          <button
            onClick={() => setActiveTab('contact')}
            className="w-full py-2.5 px-3 rounded-lg bg-[#D4AF37] hover:bg-[#C5A028] text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#D4AF37]/20"
          >
            <span>Contact Support</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#07080A] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} EstateHub. Built with React & Tailwind.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-300 transition-colors">
              Terms of Service
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#16181D] hover:bg-white/10 text-[#D4AF37] transition-colors border border-white/10"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
