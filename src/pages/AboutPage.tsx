import React from 'react';
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  Target,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  MapPin,
  TrendingUp,
  Globe,
  FileCheck,
  Compass,
  Zap,
  PhoneCall
} from 'lucide-react';
import { motion } from 'motion/react';
import { SAMPLE_AGENTS } from '../data/mockData';
import { AnimatedCounter } from '../components/AnimatedCounter';

export const AboutPage: React.FC = () => {
  const milestones = [
    {
      year: '2018',
      title: 'Foundation in Lahore',
      description: 'EstateHub was established in Gulberg, Lahore with a single promise: 100% verified legal titles and zero hidden commission tricks.',
    },
    {
      year: '2020',
      title: 'National Expansion',
      description: 'Expanded operations to Islamabad (Sectors E-7, F-6) and Karachi (Clifton & DHA Phase 8), introducing immersive Matterport 3D virtual tours.',
    },
    {
      year: '2023',
      title: 'AI Property Matcher Launch',
      description: 'Integrated intelligent AI recommendation engines tailored for Overseas Pakistanis in the UK, UAE, USA, and Canada.',
    },
    {
      year: '2026',
      title: 'Rs. 450+ Crore Transacted',
      description: 'Crossed Rs. 450+ Crore in luxury residential and commercial transactions with a 99.4% client satisfaction index.',
    },
  ];

  const pillars = [
    {
      icon: Target,
      title: 'Rigorous Verification',
      desc: 'Every plot, bungalow, and penthouse listed undergoes strict physical site surveys, CDA/LDA/KDA legal clearance, and ownership audits.',
    },
    {
      icon: ShieldCheck,
      title: 'Overseas Pakistani Portal',
      desc: 'Dedicated concierge team providing remote power of attorney advisory, live video walkthroughs, and secure international transfers.',
    },
    {
      icon: Sparkles,
      title: 'AI Smart Matcher',
      desc: 'Our proprietary machine learning algorithm matches your lifestyle criteria, budget in Crores/Lakhs, and family size with ideal homes in seconds.',
    },
    {
      icon: HeartHandshake,
      title: 'Ethical Transparency',
      desc: 'No aggressive spam sales calls, zero hidden buyer surcharges, and completely open price-per-square-foot metrics.',
    },
  ];

  const regionalCoverage = [
    { city: 'Lahore', areas: 'DHA Phase 1-9, Gulberg III, Bedian Road, Model Town', listings: '950+ Listings' },
    { city: 'Islamabad', areas: 'Sectors E-7, F-6, F-7, Blue Area, Margalla Enclave', listings: '720+ Listings' },
    { city: 'Karachi', areas: 'Clifton, DHA Phase 8, Emaar Crescent Bay, KHI Cantt', listings: '680+ Listings' },
    { city: 'Rawalpindi', areas: 'Bahria Town Phase 1-8, Bahria Golf City, Chaklala', listings: '500+ Listings' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Pakistan’s Premier Real Estate Gateway</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-tight"
          >
            Setting New Standards in <span className="text-[#D4AF37]">Luxury & Trust</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            EstateHub is Pakistan’s leading technology-driven luxury real estate enterprise. We connect buyers, investors, and overseas Pakistanis with verified high-end residences in Lahore, Karachi, Islamabad, and Rawalpindi.
          </motion.p>
        </div>
      </section>

      {/* Core Statistics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-3xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 shadow-2xl text-center">
          <div className="space-y-1 border-r border-slate-100 dark:border-white/5 last:border-none">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] block">
              <AnimatedCounter value="Rs. 450+ Cr" />
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Volume Transacted</span>
          </div>
          <div className="space-y-1 border-r border-slate-100 dark:border-white/5 last:border-none">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] block">
              <AnimatedCounter value="2,850+" />
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Verified Listings</span>
          </div>
          <div className="space-y-1 border-r border-slate-100 dark:border-white/5 last:border-none">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] block">
              <AnimatedCounter value="99.4%" />
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Satisfied Clients</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] block">
              <AnimatedCounter value="18+" />
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Metropolitan Hubs</span>
          </div>
        </div>
      </section>

      {/* Corporate Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            Why EstateHub Leads
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built on Four Pillars of Excellence
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            We blend modern artificial intelligence with local real estate mastery to deliver unprecedented clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-white dark:bg-[#16181D] border border-slate-200/80 dark:border-white/10 shadow-lg space-y-4 relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Story Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            Our Journey
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Milestones Shaping EstateHub
          </h2>
        </div>

        <div className="relative border-l-2 border-[#D4AF37]/40 ml-4 sm:ml-32 space-y-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-10">
              {/* Year Marker Badge */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#D4AF37] text-slate-950 font-extrabold text-xs flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="sm:absolute sm:-left-32 sm:top-0 text-sm font-extrabold text-[#D4AF37] mb-1 sm:mb-0">
                {m.year}
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 shadow-md space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{m.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Coverage Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            Metropolitan Presence
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Primary Operating Regions in Pakistan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionalCoverage.map((reg, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-[#16181D] border border-slate-200 dark:border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{reg.city}</h3>
                <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase">
                  <AnimatedCounter value={reg.listings} />
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {reg.areas}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Agents Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            Certified Advisors
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Meet Our Senior Real Estate Specialists
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_AGENTS.slice(0, 4).map(agent => (
            <div
              key={agent.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 shadow-md text-center space-y-3"
            >
              <img
                src={agent.photo}
                alt={agent.name}
                className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-[#D4AF37]/20"
              />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{agent.name}</h4>
                <p className="text-xs text-[#D4AF37] font-semibold">{agent.title}</p>
                <p className="text-[11px] text-slate-500 mt-1">{agent.agency}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight">Ready to Find Your Prime Property?</h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Browse thousands of verified luxury villas, oceanfront apartments, and commercial plazas across Pakistan.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="tel:+923008456789"
              className="px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-slate-950 font-bold text-xs transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +92 300 8456789</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
