import React, { useState } from 'react';
import {
  X,
  Heart,
  Scale,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Car,
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Compass,
  Building2,
  Star,
  Send,
  Sparkles
} from 'lucide-react';
import { Property } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { formatPKR } from '../utils/formatters';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenCalcWithPrice: (price: number) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  onOpenCalcWithPrice,
}) => {
  if (!property) return null;

  const { isFavorite, toggleFavorite, isInComparison, toggleComparison } = useFavorites();
  const { addToast } = useToast();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'floorplans' | 'nearby' | 'agent'>('overview');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState(
    `Hi ${property.agent.name}, I am interested in "${property.title}" (${property.address}). Please contact me regarding scheduling a tour.`
  );
  const [isSending, setIsSending] = useState(false);

  const favorited = isFavorite(property.id);
  const inComparison = isInComparison(property.id);

  const formattedPrice = formatPKR(property.price);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('success', 'Link Copied!', 'Property link copied to your clipboard.');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAgentContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      addToast('success', 'Inquiry Sent!', `Your message has been delivered to agent ${property.agent.name}.`);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>{property.type}</span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                For {property.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
              {property.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share Property"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => toggleComparison(property)}
              className={`p-2.5 rounded-xl transition-colors ${
                inComparison
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Compare Property"
            >
              <Scale className="w-5 h-5" />
            </button>

            <button
              onClick={() => toggleFavorite(property)}
              className={`p-2.5 rounded-xl transition-colors ${
                favorited
                  ? 'bg-rose-500 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Save Favorite"
            >
              <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          {/* Main Gallery Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-lg">
              <img
                src={property.images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {property.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-3">
                  <button
                    onClick={() =>
                      setActiveImageIndex(prev => (prev - 1 + property.images.length) % property.images.length)
                    }
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex(prev => (prev + 1) % property.images.length)}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Virtual Tour Overlay Pill */}
              {property.virtualTourUrl && (
                <a
                  href={property.virtualTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/70 hover:bg-black/90 text-white backdrop-blur-md text-xs font-semibold flex items-center gap-2 border border-white/20 transition-all"
                >
                  <Compass className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>360° Virtual House Tour</span>
                </a>
              )}
            </div>

            {/* Thumbnails Row */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-blue-600 scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Overview Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Asking Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {formattedPrice}
                </span>
                {property.period && (
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">/{property.period}</span>
                )}
              </div>
              <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
              </p>
            </div>

            {/* Quick Mortgage Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenCalcWithPrice(property.price);
                }}
                className="w-full md:w-auto px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-blue-200 dark:border-blue-800"
              >
                <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Calculate Monthly Mortgage</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <Bed className="w-3.5 h-3.5" /> Bedrooms
              </span>
              <strong className="block text-lg font-bold text-slate-900 dark:text-white mt-1">
                {property.bedrooms}
              </strong>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <Bath className="w-3.5 h-3.5" /> Bathrooms
              </span>
              <strong className="block text-lg font-bold text-slate-900 dark:text-white mt-1">
                {property.bathrooms}
              </strong>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <Maximize className="w-3.5 h-3.5" /> Total Area
              </span>
              <strong className="block text-lg font-bold text-slate-900 dark:text-white mt-1">
                {property.areaSqFt.toLocaleString()} sqft
              </strong>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <Car className="w-3.5 h-3.5" /> Garages
              </span>
              <strong className="block text-lg font-bold text-slate-900 dark:text-white mt-1">
                {property.garages}
              </strong>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Year Built
              </span>
              <strong className="block text-lg font-bold text-slate-900 dark:text-white mt-1">
                {property.yearBuilt}
              </strong>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                Price / SqFt
              </span>
              <strong className="block text-lg font-bold text-slate-900 dark:text-white mt-1">
                ${property.pricePerSqFt}
              </strong>
            </div>
          </div>

          {/* Navigation Tabs Inside Modal */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
            {[
              { id: 'overview', label: 'Description' },
              { id: 'features', label: `Amenities (${property.features.length})` },
              { id: 'floorplans', label: `Floor Plans (${property.floorPlans.length})` },
              { id: 'nearby', label: 'Location & Nearby' },
              { id: 'agent', label: 'Contact Agent' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Property Overview</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>
          )}

          {/* Tab 2: Amenities & Features */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Features & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Floor Plans */}
          {activeTab === 'floorplans' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Architectural Floor Plans</h3>
              {property.floorPlans.length === 0 ? (
                <p className="text-sm text-slate-500">Floor plan drawings available upon request from the agent.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.floorPlans.map((fp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 space-y-3"
                    >
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{fp.title}</h4>
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <img src={fp.image} alt={fp.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium pt-1">
                        <span>{fp.bedrooms} Beds • {fp.bathrooms} Baths</span>
                        <span>{fp.sizeSqFt} sq ft</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Location & Nearby */}
          {activeTab === 'nearby' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Location Map View</h3>
                {/* Visual Map Container */}
                <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 max-w-sm space-y-2">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xl animate-bounce">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{property.address}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Latitude: {property.lat} • Longitude: {property.lng} ({property.city}, {property.state})
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Nearby Schools & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.nearbyPlaces.map((np, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{np.name}</span>
                      <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                        {np.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Agent Form */}
          {(activeTab === 'agent' || activeTab === 'overview') && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Listed Property Agent</h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Agent Card */}
                <div className="md:col-span-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={property.agent.photo}
                      alt={property.agent.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">{property.agent.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{property.agent.title}</p>
                      <div className="flex items-center gap-1 text-amber-500 text-xs mt-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold">{property.agent.rating}</span>
                        <span className="text-slate-400">({property.agent.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {property.agent.bio}
                  </p>

                  <div className="space-y-2 text-xs pt-2 border-t border-slate-200/60 dark:border-slate-700">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-semibold transition-colors"
                    >
                      <Phone className="w-4 h-4 text-blue-500" />
                      <span>{property.agent.phone}</span>
                    </a>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-semibold transition-colors"
                    >
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>{property.agent.email}</span>
                    </a>
                  </div>
                </div>

                {/* Contact Form */}
                <form
                  onSubmit={handleAgentContactSubmit}
                  className="md:col-span-7 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Send Direct Message to Agent</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      required
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      required
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Your Phone Number"
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    rows={3}
                    value={contactMessage}
                    onChange={e => setContactMessage(e.target.value)}
                    required
                    className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSending ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
