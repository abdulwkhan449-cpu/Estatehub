import React, { createContext, useContext, useEffect, useState } from 'react';
import { Property } from '../types';

interface FavoritesContextType {
  favorites: Property[];
  toggleFavorite: (property: Property) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  comparisonList: Property[];
  toggleComparison: (property: Property) => void;
  isInComparison: (id: string) => boolean;
  clearComparison: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('estatehub_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [comparisonList, setComparisonList] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('estatehub_comparison');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('estatehub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('estatehub_comparison', JSON.stringify(comparisonList));
  }, [comparisonList]);

  const toggleFavorite = (property: Property) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === property.id);
      if (exists) {
        return prev.filter(item => item.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const toggleComparison = (property: Property) => {
    setComparisonList(prev => {
      const exists = prev.some(item => item.id === property.id);
      if (exists) {
        return prev.filter(item => item.id !== property.id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare a maximum of 4 properties at once.');
          return prev;
        }
        return [...prev, property];
      }
    });
  };

  const isInComparison = (id: string) => {
    return comparisonList.some(item => item.id === id);
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        comparisonList,
        toggleComparison,
        isInComparison,
        clearComparison,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
