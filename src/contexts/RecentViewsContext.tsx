"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Recipe {
  id: string;
  title: string;
  slug: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
  difficulty: string;
  viewedAt: Date;
}

interface RecentViewsContextType {
  recentViews: Recipe[];
  addToRecentViews: (recipe: Omit<Recipe, 'viewedAt'>) => void;
  clearRecentViews: () => void;
}

const RecentViewsContext = createContext<RecentViewsContextType | undefined>(undefined);

export const useRecentViews = () => {
  const context = useContext(RecentViewsContext);
  if (context === undefined) {
    throw new Error('useRecentViews must be used within a RecentViewsProvider');
  }
  return context;
};

interface RecentViewsProviderProps {
  children: ReactNode;
}

export const RecentViewsProvider: React.FC<RecentViewsProviderProps> = ({ children }) => {
  const [recentViews, setRecentViews] = useState<Recipe[]>([]);

  // Load recent views from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('recentViews');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentViews(parsed.map((item: any) => ({
          ...item,
          viewedAt: new Date(item.viewedAt)
        })));
      } catch (error) {
        console.error('Error parsing recent views:', error);
        localStorage.removeItem('recentViews');
      }
    }
  }, []);

  // Save to localStorage whenever recentViews changes
  useEffect(() => {
    if (recentViews.length > 0) {
      localStorage.setItem('recentViews', JSON.stringify(recentViews));
    }
  }, [recentViews]);

  const addToRecentViews = (recipe: Omit<Recipe, 'viewedAt'>) => {
    setRecentViews(prev => {
      // Remove existing entry if it exists
      const filtered = prev.filter(item => item.id !== recipe.id);
      
      // Add new entry at the beginning
      const newEntry = {
        ...recipe,
        viewedAt: new Date()
      };
      
      // Keep only last 10 items
      return [newEntry, ...filtered].slice(0, 10);
    });
  };

  const clearRecentViews = () => {
    setRecentViews([]);
    localStorage.removeItem('recentViews');
  };

  const value = {
    recentViews,
    addToRecentViews,
    clearRecentViews,
  };

  return (
    <RecentViewsContext.Provider value={value}>
      {children}
    </RecentViewsContext.Provider>
  );
};
