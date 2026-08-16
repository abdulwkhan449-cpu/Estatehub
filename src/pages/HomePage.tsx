import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Sparkles,
  Building2,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Star,
  ArrowRight,
  ChevronRight,
  Home,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { motion } from 'motion/react';
import { Property, PropertyType, PropertyStatus, Agent } from '../types';
import { MOCK_PROPERTIES, FEATURED_CATEGORIES, TESTIMONIALS, STATS_COUNTER, SAMPLE_AGENTS } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { AgentCard } from '../components/AgentCard';
import { AnimatedCounter } from '../components/AnimatedCounter';

interface HomePageProps {
  onSelectProperty: (property: Property) => void;
  onSelectAgent: (agent: Agent) => void;
  onOpenAiAdvisor: () => void;
  setActiveTab: (tab: string) => void;
  setCatalogFilters: React.Dispatch<React.SetStateAction<any>>;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProperty,
  onSelectAgent,
  onOpenAiAdvisor,
  setActiveTab,
  setCatalogFilters,
}) => {
  const [searchStatus, setSearchStatus] = useState<PropertyStatus>('sale');
  const [searchCity, setSearchCity] = useState('all');
  const [searchType, setSearchType] = useState<PropertyType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProperties = MOCK_PROPERTIES.filter(p => p.featured);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCatalogFilters((prev: any) => ({
      ...prev,
      status: searchStatus,
      city: searchCity,
      type: searchType,
      searchQuery: searchQuery,
    }));
    setActiveTab('listings');
  };

  const handleCategoryClick = (catId: string) => {
    setCatalogFilters((prev: any) => ({
      ...prev,
      type: catId as PropertyType,
    }));
    setActiveTab('listings');
  };

  return (
    <div className="space-y-20 pb-16 overflow-x-hidden">
      {/* FULL WIDTH HERO SECTION */}
      <section className="relative w-full min-h-[660px] lg:min-h-[720px] flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Animated Background Image backdrop with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2200"
            alt="EstateHub Luxury Real Estate Pakistan"
            className="w-full h-full object-cover opacity-35 scale-105 animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] shadow-lg shadow-[#D4AF37]/10"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span>Pakistan’s Premier Luxury Real Estate Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto"
          >
            Find Extraordinary Mansions & <span className="text-[#D4AF37] italic">Verified Estates</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Discover verified luxury villas, sea-facing penthouses, and executive commercial plazas across Lahore, Karachi, Islamabad, and Rawalpindi.
          </motion.p>

          {/* Search Form Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-5xl mx-auto bg-white/95 dark:bg-[#16181D]/95 backdrop-blur-xl p-5 sm:p-7 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 text-slate-900 dark:text-white text-left"
          >
            {/* Status Tabs */}
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4 mb-5">
              <button
                type="button"
                onClick={() => setSearchStatus('sale')}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                  searchStatus === 'sale'
                    ? 'bg-[#D4AF37] text-slate-950 shadow-md shadow-[#D4AF37]/30 scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                Buy Property (Sale)
              </button>
              <button
                type="button"
                onClick={() => setSearchStatus('rent')}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                  searchStatus === 'rent'
                    ? 'bg-[#D4AF37] text-slate-950 shadow-md shadow-[#D4AF37]/30 scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                Rent Property
              </button>
            </div>

            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
              {/* Location Select */}
              <div className="lg:col-span-3 space-y-1">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" />
                  <select
                    value={searchCity}
                    onChange={e => setSearchCity(e.target.value)}
                    className="w-full pl-10 pr-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="all">All Cities in Pakistan</option>
                    <option value="Lahore">Lahore (DHA, Gulberg)</option>
                    <option value="Islamabad">Islamabad (E-7, F-6)</option>
                    <option value="Karachi">Karachi (Clifton, Emaar)</option>
                    <option value="Rawalpindi">Rawalpindi (Bahria Town)</option>
                  </select>
                </div>
              </div>

              {/* Type Select */}
              <div className="lg:col-span-3 space-y-1">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Property Type</label>
                <div className="relative">
                  <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" />
                  <select
                    value={searchType}
                    onChange={e => setSearchType(e.target.value as any)}
                    className="w-full pl-10 pr-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="all">All Categories</option>
                    <option value="villa">Luxury Villas</option>
                    <option value="house">Designer Houses</option>
                    <option value="apartment">Penthouses & Suites</option>
                    <option value="condo">Oceanfront Condos</option>
                    <option value="commercial">Commercial Plazas</option>
                  </select>
                </div>
              </div>

              {/* Keyword text */}
              <div className="lg:col-span-4 space-y-1">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Keyword / Amenity</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="e.g. pool, margalla view, DHA Phase 6..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="lg:col-span-2 pt-2 sm:pt-0">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-slate-950 font-extrabold text-xs shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 shadow-xl text-center"
        >
          {STATS_COUNTER.map((st, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] block tracking-tight">
                <AnimatedCounter value={st.value} />
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                {st.label}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Browse by Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Explore Collections
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Featured Property Categories
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('listings')}
            className="flex items-center gap-1.5 text-sm font-bold text-[#D4AF37] hover:underline"
          >
            <span>View All Listings</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_CATEGORIES.map(cat => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="text-lg font-bold group-hover:text-[#D4AF37] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  <AnimatedCounter value={cat.count} />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Handpicked Residences
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Featured Luxury Properties
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('listings')}
            className="flex items-center gap-1.5 text-sm font-bold text-[#D4AF37] hover:underline"
          >
            <span>Explore Catalog (<AnimatedCounter value={MOCK_PROPERTIES.length} />)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map(prop => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* AI Matcher Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/30 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#D4AF37]">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Real Estate Matcher</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              Unsure which property fits your family & budget?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Use our AI Property Advisor powered by Gemini. Simply specify your target budget in PKR (Crores/Lakhs), preferred location, and lifestyle needs for instant compatibility scores.
            </p>
          </div>

          <button
            onClick={onOpenAiAdvisor}
            className="px-8 py-4 rounded-2xl bg-[#D4AF37] hover:bg-[#C5A028] text-slate-950 font-extrabold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Launch AI Matcher</span>
          </button>
        </motion.div>
      </section>

      {/* Why Choose EstateHub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            Unrivaled Quality
          </span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Why Clients Choose EstateHub
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            We simplify real estate decisions through technology, legal transparency, and top-tier agent guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 rounded-2xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              <AnimatedCounter value="100%" /> Verified Properties
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every single listing on EstateHub undergoes physical verification and legal title clearance across CDA, LDA, and DHA authorities.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">PKR Price Matrix & Intelligence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Compare properties side-by-side in PKR Crores and Lakhs, view exact price-per-square-foot ratios, and analyze historical appreciation.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Certified Premier Agents</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Work directly with top <AnimatedCounter value="1%" /> licensed specialists in Lahore, Islamabad, Karachi, and Rawalpindi who provide white-glove support.
            </p>
          </div>
        </div>
      </section>

      {/* Top Agents Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Local Market Experts
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Connect With Certified Agents
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('agents')}
            className="flex items-center gap-1.5 text-sm font-bold text-[#D4AF37] hover:underline"
          >
            <span>View All Agents</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_AGENTS.slice(0, 4).map(agent => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onSelectAgent={onSelectAgent}
            />
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            Client Success Stories
          </span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Loved By Homebuyers & Overseas Investors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
