import React from 'react';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  ChevronDown
} from 'lucide-react';
import { FilterState, PropertyType, PropertyStatus } from '../types';
import { formatPKR } from '../utils/formatters';

interface PropertyFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  layout: 'grid' | 'list';
  setLayout: (layout: 'grid' | 'list') => void;
  totalResults: number;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  filters,
  setFilters,
  resetFilters,
  layout,
  setLayout,
  totalResults,
}) => {
  const cities = ['All Cities', 'Lahore', 'Islamabad', 'Karachi', 'Rawalpindi'];

  const propertyTypes: { id: PropertyType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Types' },
    { id: 'house', label: 'Houses' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'villa', label: 'Villas' },
    { id: 'condo', label: 'Condos' },
    { id: 'commercial', label: 'Commercial' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-5 transition-colors">
      {/* Top Search Input & Status Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search query box */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search by title, location, keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* City Dropdown */}
        <div className="md:col-span-3 relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={filters.city}
            onChange={e => setFilters(prev => ({ ...prev, city: e.target.value }))}
            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white appearance-none focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            {cities.map(c => (
              <option key={c} value={c === 'All Cities' ? 'all' : c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Status Toggle (All / Rent / Sale) */}
        <div className="md:col-span-3 flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {(['all', 'sale', 'rent'] as (PropertyStatus | 'all')[]).map(status => (
            <button
              key={status}
              onClick={() => setFilters(prev => ({ ...prev, status }))}
              className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                filters.status === status
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0 mr-1 flex items-center gap-1">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Type:
        </span>
        {propertyTypes.map(t => (
          <button
            key={t.id}
            onClick={() => setFilters(prev => ({ ...prev, type: t.id }))}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filters.type === t.id
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Extended Sliders & Selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        {/* Price Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>Max Price</span>
            <span className="text-[#D4AF37] font-bold">
              {formatPKR(filters.maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min={10000000}
            max={500000000}
            step={10000000}
            value={filters.maxPrice}
            onChange={e => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-[#D4AF37] cursor-pointer"
          />
        </div>

        {/* Bedrooms Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Bedrooms</label>
          <select
            value={filters.minBedrooms}
            onChange={e =>
              setFilters(prev => ({
                ...prev,
                minBedrooms: e.target.value === 'any' ? 'any' : Number(e.target.value),
              }))
            }
            className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="any">Any Bedrooms</option>
            <option value="1">1+ Bedroom</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={e =>
              setFilters(prev => ({
                ...prev,
                sortBy: e.target.value as FilterState['sortBy'],
              }))
            }
            className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Listed</option>
            <option value="area-desc">Area: Largest SqFt</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end gap-2">
          <button
            onClick={resetFilters}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Results Count & Layout Switcher */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400">
        <div>
          Showing <strong className="text-slate-900 dark:text-white">{totalResults}</strong> matching properties
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setLayout('grid')}
            className={`p-1.5 rounded-md transition-colors ${
              layout === 'grid'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={`p-1.5 rounded-md transition-colors ${
              layout === 'list'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
