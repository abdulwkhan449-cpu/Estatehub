import React from 'react';
import { Heart, Trash2, Scale, ArrowRight, Building2 } from 'lucide-react';
import { Property } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { PropertyCard } from '../components/PropertyCard';

interface FavoritesPageProps {
  onSelectProperty: (property: Property) => void;
  onOpenComparisonModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  onSelectProperty,
  onOpenComparisonModal,
  setActiveTab,
}) => {
  const { favorites, clearFavorites, comparisonList } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">
            <Heart className="w-4 h-4 fill-current" />
            <span>Personal Collection</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Saved Favorite Properties ({favorites.length})
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Properties stored securely in your browser's LocalStorage.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-3">
            {comparisonList.length > 0 && (
              <button
                onClick={onOpenComparisonModal}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
              >
                <Scale className="w-4 h-4" />
                <span>Compare Selected ({comparisonList.length})</span>
              </button>
            )}

            <button
              onClick={clearFavorites}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/50 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Favorites</span>
            </button>
          </div>
        )}
      </div>

      {/* Favorites List / Grid */}
      {favorites.length === 0 ? (
        <div className="py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Favorites List is Empty</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Click the heart icon on any property card to save your favorite houses, apartments, or villas here for quick access.
          </p>
          <button
            onClick={() => setActiveTab('listings')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors inline-flex items-center gap-2"
          >
            <span>Browse Property Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(prop => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>
      )}
    </div>
  );
};
