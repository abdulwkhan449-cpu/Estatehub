import React from 'react';
import { X, Scale, Trash2, Check, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { formatPKR } from '../utils/formatters';

interface PropertyComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyComparisonModal: React.FC<PropertyComparisonModalProps> = ({
  isOpen,
  onClose,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  const { comparisonList, toggleComparison, clearComparison } = useFavorites();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Side-by-Side Property Comparison</h2>
              <p className="text-xs text-slate-500">Compare up to 4 properties by specs, features, and price per sqft</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparisonList.length > 0 && (
              <button
                onClick={clearComparison}
                className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Comparison Table Body */}
        <div className="flex-1 overflow-x-auto p-6">
          {comparisonList.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Scale className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Properties Selected for Comparison</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the compare icon on any property card to add it to your side-by-side comparison matrix.
              </p>
            </div>
          ) : (
            <div className="min-w-[700px]">
              <div className="grid grid-cols-5 gap-4">
                {/* Feature Labels Column */}
                <div className="font-semibold text-xs text-slate-500 dark:text-slate-400 space-y-8 pt-44">
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">Price</div>
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">Status</div>
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">Type</div>
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">City / State</div>
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">Bedrooms</div>
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">Bathrooms</div>
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">Area (Sq Ft)</div>
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">Price / SqFt</div>
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">Year Built</div>
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">Garages</div>
                  <div className="py-2 border-b border-slate-100 dark:border-slate-800">Agent</div>
                </div>

                {/* Property Columns */}
                {comparisonList.map(prop => (
                  <div key={prop.id} className="space-y-8 text-xs text-slate-800 dark:text-slate-200">
                    {/* Header Card */}
                    <div className="space-y-2 h-40 flex flex-col justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                        <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleComparison(prop)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-black/90"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                        className="font-bold text-xs text-slate-900 dark:text-white hover:text-blue-600 line-clamp-1 cursor-pointer"
                      >
                        {prop.title}
                      </h4>
                    </div>

                    {/* Values */}
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800 font-bold text-[#D4AF37] text-sm">
                      {formatPKR(prop.price)} {prop.period && `/${prop.period}`}
                    </div>
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800 font-semibold uppercase">
                      For {prop.status}
                    </div>
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800 capitalize">
                      {prop.type}
                    </div>
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800">
                      {prop.city}, {prop.state}
                    </div>
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800 font-semibold">
                      {prop.bedrooms} Beds
                    </div>
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800 font-semibold">
                      {prop.bathrooms} Baths
                    </div>
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800 font-semibold">
                      {prop.areaSqFt.toLocaleString()} sqft
                    </div>
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800">
                      ${prop.pricePerSqFt}
                    </div>
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800">
                      {prop.yearBuilt}
                    </div>
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800">
                      {prop.garages} Bay
                    </div>
                    <div className="py-2 border-b border-slate-100 dark:border-slate-800 font-medium">
                      {prop.agent.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
