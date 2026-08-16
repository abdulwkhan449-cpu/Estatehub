import React, { useState } from 'react';
import {
  Heart,
  Scale,
  Bed,
  Bath,
  Maximize,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar
} from 'lucide-react';
import { Property } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { formatPKR } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  layout = 'grid',
}) => {
  const { isFavorite, toggleFavorite, isInComparison, toggleComparison } = useFavorites();
  const { addToast } = useToast();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const favorited = isFavorite(property.id);
  const inComparison = isInComparison(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(property);
    if (!favorited) {
      addToast('success', 'Saved to Favorites', `"${property.title}" has been saved.`);
    } else {
      addToast('info', 'Removed from Favorites', `"${property.title}" was removed.`);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleComparison(property);
    if (!inComparison) {
      addToast('success', 'Added to Compare List', `Comparing ${property.title}`);
    } else {
      addToast('info', 'Removed from Compare', `Removed ${property.title}`);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (property.images.length <= 1) return;
    setCurrentImgIndex(prev => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (property.images.length <= 1) return;
    setCurrentImgIndex(prev => (prev - 1 + property.images.length) % property.images.length);
  };

  const formattedPrice = formatPKR(property.price);

  if (layout === 'list') {
    return (
      <div
        onClick={() => onSelectProperty(property)}
        className="group relative flex flex-col md:flex-row bg-white dark:bg-[#16181D] rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-[#D4AF37]/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative md:w-80 h-64 md:h-auto overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
          <img
            src={property.images[currentImgIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Carousel Arrows */}
          {property.images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={prevImage}
                className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md ${
                property.status === 'sale'
                  ? 'bg-[#D4AF37]'
                  : 'bg-emerald-500'
              }`}
            >
              For {property.status}
            </span>
            {property.featured && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-300 shadow-md">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Details Content */}
        <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] dark:text-[#D4AF37] mb-1">
                  <span>{property.type}</span>
                  {property.verified && (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#D4AF37] dark:group-hover:text-[#D4AF37] transition-colors">
                  {property.title}
                </h3>
                <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mt-1">
                  <MapPin className="w-4 h-4 text-[#D4AF37]/80 shrink-0" />
                  <span>{property.address}, {property.city}, {property.state}</span>
                </p>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                <span className="text-2xl font-black text-slate-900 dark:text-[#D4AF37]">
                  {formattedPrice}
                </span>
                {property.period && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-normal"> /{property.period}</span>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mt-3 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Property Specs */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#D4AF37]" />
                <strong className="text-slate-900 dark:text-white">{property.bedrooms}</strong> Beds
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-[#D4AF37]" />
                <strong className="text-slate-900 dark:text-white">{property.bathrooms}</strong> Baths
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize className="w-4 h-4 text-[#D4AF37]" />
                <strong className="text-slate-900 dark:text-white">{property.areaSqFt.toLocaleString()}</strong> sq ft
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCompareClick}
                className={`p-2 rounded-xl transition-colors ${
                  inComparison
                    ? 'bg-[#D4AF37] text-slate-950'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
                }`}
                title="Compare Property"
              >
                <Scale className="w-4 h-4" />
              </button>
              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded-xl transition-colors ${
                  favorited
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
                }`}
                title="Favorite Property"
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-current text-white' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout Default
  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="group relative flex flex-col bg-white dark:bg-[#16181D] rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-[#D4AF37]/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Photo Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Carousel controls if multi images */}
        {property.images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Badges Top */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider text-slate-950 shadow-md ${
                property.status === 'sale' ? 'bg-[#D4AF37]' : 'bg-emerald-500 text-white'
              }`}
            >
              For {property.status}
            </span>
            {property.isNew && (
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider text-slate-950 bg-amber-300 shadow-md">
                New
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCompareClick}
              className={`p-2 rounded-xl backdrop-blur-md shadow-md transition-colors ${
                inComparison
                  ? 'bg-[#D4AF37] text-slate-950'
                  : 'bg-black/40 hover:bg-black/70 text-white'
              }`}
              title="Compare"
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-xl backdrop-blur-md shadow-md transition-all ${
                favorited
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/40 hover:bg-black/70 text-white'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Price Tag Bottom Left */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-baseline gap-1 drop-shadow-md">
            <span className="text-xl font-black text-[#D4AF37]">{formattedPrice}</span>
            {property.period && <span className="text-xs font-medium opacity-90">/{property.period}</span>}
          </div>
        </div>
      </div>

      {/* Details Footer */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#D4AF37] dark:text-[#D4AF37] uppercase tracking-wider">
            <span>{property.type}</span>
            {property.verified && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#D4AF37] dark:group-hover:text-[#D4AF37] transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]/80 shrink-0" />
            <span>{property.address}, {property.city}</span>
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 font-medium">
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-[#0A0B0D]/60 border border-transparent dark:border-white/5">
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Bed className="w-3.5 h-3.5 text-[#D4AF37]" /> Beds
            </span>
            <strong className="text-slate-900 dark:text-white mt-0.5 text-sm">{property.bedrooms}</strong>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-[#0A0B0D]/60 border border-transparent dark:border-white/5">
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Bath className="w-3.5 h-3.5 text-[#D4AF37]" /> Baths
            </span>
            <strong className="text-slate-900 dark:text-white mt-0.5 text-sm">{property.bathrooms}</strong>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-[#0A0B0D]/60 border border-transparent dark:border-white/5">
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Maximize className="w-3.5 h-3.5 text-[#D4AF37]" /> Area
            </span>
            <strong className="text-slate-900 dark:text-white mt-0.5 text-sm">{property.areaSqFt.toLocaleString()} sqft</strong>
          </div>
        </div>

        {/* Agent Info & Quick View */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <img
              src={property.agent.photo}
              alt={property.agent.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-white/20"
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {property.agent.name}
            </span>
          </div>

          <span className="text-xs font-bold text-[#D4AF37] dark:text-[#D4AF37] group-hover:underline flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Details
          </span>
        </div>
      </div>
    </div>
  );
};
