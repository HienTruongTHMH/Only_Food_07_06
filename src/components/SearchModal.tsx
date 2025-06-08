"use client";

import { useState, useEffect } from "react";
import { X, Search, Clock, Users, Home, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
  id: string;
  title: string;
  image?: string;
  prepTime?: number;
  servings?: number;
  slug?: string;
  ingredients?: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientResults, setIngredientResults] = useState<Recipe[]>([]);

  // Popular ingredients list in English
  const popularIngredients = [
    "Eggs", "Chicken", "Beef", "Pork", "Tomatoes", 
    "Onions", "Garlic", "Ginger", "Celery", "Carrots",
    "Potatoes", "Mushrooms", "Tofu", "Rice", "Noodles",
    "Fish", "Shrimp", "Bell Peppers", "Broccoli", "Spinach"
  ];

  useEffect(() => {
    if (isOpen) {
      // Bật lên nếu cần thiết
      // const video = document.querySelector('video');
      // if (video) {
      //   video.load();
      // }
      document.body.style.overflow = "hidden";
      try {
        const savedSearches = localStorage.getItem('recentSearches');
        const savedIngredients = localStorage.getItem('selectedIngredients');
        
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        }
        if (savedIngredients) {
          setSelectedIngredients(JSON.parse(savedIngredients));
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Search by text
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        console.log(`Searching for: ${searchTerm}`);
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        if (response.ok) {
          const results = await response.json();
          console.log('Search results:', results);
          setSearchResults(results);
        } else {
          console.error('Search failed:', response.status);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Search by ingredients
  useEffect(() => {
    if (selectedIngredients.length === 0) {
      setIngredientResults([]);
      return;
    }

    const searchByIngredients = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search/ingredients`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredients: selectedIngredients })
        });
        if (response.ok) {
          const results = await response.json();
          setIngredientResults(results);
        }
      } catch (error) {
        console.error('Ingredient search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchByIngredients();
  }, [selectedIngredients]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    try {
      const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  const toggleIngredient = (ingredient: string) => {
    const updated = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter(i => i !== ingredient)
      : [...selectedIngredients, ingredient];
    
    setSelectedIngredients(updated);
    try {
      localStorage.setItem('selectedIngredients', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving ingredients:', error);
    }
  };

  const clearAllIngredients = () => {
    setSelectedIngredients([]);
    setIngredientResults([]);
    localStorage.removeItem('selectedIngredients');
  };

  const handleResultClick = () => {
    onClose();
  };

  const handleHomeClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  const renderSearchResults = () => {
    const results = searchTerm ? searchResults : [];
    
    if (results.length > 0) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Search results for "{searchTerm}" ({results.length})
            </h3>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {results.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipe/${recipe.slug || recipe.id}`}
                onClick={handleResultClick}
                className="flex items-center p-4 bg-white/90 backdrop-blur-sm hover:bg-white/95 border border-gray-200/50 rounded-xl transition-all duration-200 hover:shadow-md group"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0 bg-gray-200">
                  {recipe.image ? (
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Search className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                    {recipe.title}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {recipe.prepTime || 30} min
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {recipe.servings || 4} servings
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    } else if (searchTerm && !isLoading) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100/80 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500">
            Try searching with different keywords like "chicken", "soup", "pasta"
          </p>
        </div>
      );
    }
    return null;
  };

  const renderIngredientResults = () => {
    if (ingredientResults.length > 0) {
      return (
        <div className="space-y-4 mt-6 pt-6 border-t border-gray-200/50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Recipes you need ({ingredientResults.length})
            </h3>
            <button
              onClick={clearAllIngredients}
              className="text-sm text-orange-600 hover:text-orange-700"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {ingredientResults.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipe/${recipe.slug || recipe.id}`}
                onClick={handleResultClick}
                className="flex items-center p-4 bg-white/90 backdrop-blur-sm hover:bg-white/95 border border-gray-200/50 rounded-xl transition-all duration-200 hover:shadow-md group"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0 bg-gray-200">
                  {recipe.image ? (
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Search className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                    {recipe.title}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {recipe.prepTime || 30} min
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {recipe.servings || 4} servings
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    } else if (selectedIngredients.length > 0 && !isLoading) {
      return (
        <div className="text-center py-12 mt-6 pt-6 border-t border-gray-200/50">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100/80 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matching recipes found</h3>
          <p className="text-gray-500">
            Try selecting different ingredients or reduce the number of ingredients
          </p>
        </div>
      );
    }
    return null;
  };

  const renderDefaultContent = () => {
    return (
      <div className="space-y-6">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Recent searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(term)}
                  className="px-3 py-2 bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Searches */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            Popular searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {["egg soup", "fried tofu", "ginger chicken", "mushroom stir-fry", "beef steak", "fried rice"].map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-4 py-2 bg-blue-50/80 backdrop-blur-sm hover:bg-blue-100/80 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 transition-all duration-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Ingredients */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            Popular ingredients
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularIngredients.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => toggleIngredient(ingredient)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedIngredients.includes(ingredient)
                    ? 'bg-orange-500/90 backdrop-blur-sm text-white shadow-md'
                    : 'bg-gradient-to-r from-orange-50/80 to-red-50/80 hover:from-orange-100/80 hover:to-red-100/80 border border-orange-200/50 text-orange-700 backdrop-blur-sm'
                }`}
              >
                {selectedIngredients.includes(ingredient) && (
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                )}
                {ingredient}
              </button>
            ))}
          </div>
          {selectedIngredients.length > 0 && (
            <div className="mt-3 p-3 bg-orange-50/80 backdrop-blur-sm rounded-lg border border-orange-200/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-orange-700">
                  Selected: {selectedIngredients.join(', ')}
                </p>
                <button
                  onClick={clearAllIngredients}
                  className="text-xs text-orange-600 hover:text-orange-700 underline"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Video Background */}
      <div className="fixed inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/cooking-poster.jpg" // Fallback image
        >
          <source src="/videos/bg-search-1280.mp4" type="video/mp4" />
          <source src="/videos/cooking-background.webm" type="video/webm" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100"></div>
        </video>
        {/* Overlay to darken video slightly */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="flex min-h-full items-start justify-center p-4 pt-16 relative z-10">
        <div 
          className="fixed inset-0 backdrop-blur-sm" 
          onClick={onClose} 
        />

        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl w-full max-w-4xl shadow-2xl border border-white/20">
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100/80 backdrop-blur-sm rounded-full">
                <Search className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Search recipes</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 backdrop-blur-sm rounded-full transition-colors"
                title="Back to homepage"
              >
                <Home className="w-5 h-5" />
              </Link>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 backdrop-blur-sm rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes, ingredients... (e.g., egg soup, fried tofu)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-gray-50/80 backdrop-blur-sm hover:bg-white/90 transition-colors"
                autoFocus
              />
              {isLoading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 pb-6">
            {/* Search results or default content */}
            {searchTerm ? renderSearchResults() : renderDefaultContent()}
            
            {/* Ingredient-based recipes */}
            {renderIngredientResults()}
          </div>
        </div>
      </div>
    </div>
  );
}