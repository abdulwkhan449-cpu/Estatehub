import React, { useState, useMemo } from 'react';
import { Property, FilterState } from '../types';
import { MOCK_PROPERTIES } from '../data/mockData';
import { PropertyFilter } from '../components/PropertyFilter';
import { PropertyCard } from '../components/PropertyCard';
import { Building2, SearchX } from 'lucide-react';

interface ListingsPageProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  onSelectProperty: (property: Property) => void;
}

export const ListingsPage: React.FC<ListingsPageProps> = ({
  filters,
  setFilters,
  resetFilters,
  onSelectProperty,
}) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(prop => {
      // Search text
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = prop.title.toLowerCase().includes(q);
        const matchCity = prop.city.toLowerCase().includes(q);
        const matchDesc = prop.description.toLowerCase().includes(q);
        const matchAddr = prop.address.toLowerCase().includes(q);
        if (!matchTitle && !matchCity && !matchDesc && !matchAddr) return false;
      }

      // City filter
      if (filters.city !== 'all' && prop.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && prop.status !== filters.status) {
        return false;
      }

      // Type filter
      if (filters.type !== 'all' && prop.type !== filters.type) {
        return false;
      }

      // Max Price filter
      if (prop.price > filters.maxPrice) {
        return false;
      }

      // Bedrooms filter
      if (filters.minBedrooms !== 'any' && prop.bedrooms < Number(filters.minBedrooms)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      if (filters.sortBy === 'area-desc') return b.areaSqFt - a.areaSqFt;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Real Estate Catalog
        </span>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Browse Verified Property Listings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Filter by location, price range, bedrooms, property type, and availability status.
        </p>
      </div>

      {/* Filter Component */}
      <PropertyFilter
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        layout={layout}
        setLayout={setLayout}
        totalResults={filteredProperties.length}
      />

      {/* Results Grid / List */}
      {filteredProperties.length === 0 ? (
        <div className="py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Properties Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            No listings matched your criteria. Try adjusting your price slider or clearing filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProperties.map(prop => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelectProperty={onSelectProperty}
              layout={layout}
            />
          ))}
        </div>
      )}
    </div>
  );
};
