"use client";

import { useState, useEffect } from "react";
import { X, Search, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
  id: string;
  title: string;
  image?: string;
  prepTime?: number;
  servings?: number;
  slug?: string;
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      try {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
          setRecentSearches(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

  const handleResultClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  const renderSearchResults = () => {
    if (searchResults.length > 0) {
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Kết quả tìm kiếm ({searchResults.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {searchResults.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipe/${recipe.slug || recipe.id}`}
                onClick={handleResultClick}
                className="flex items-center p-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md group"
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
                      {recipe.prepTime || 30} phút
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {recipe.servings || 4} người
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
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy kết quả</h3>
          <p className="text-gray-500">Thử tìm kiếm với từ khóa khác như "gà", "thịt", "canh"</p>
        </div>
      );
    }
    return null;
  };

  const renderDefaultContent = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            Tìm kiếm phổ biến
          </h3>
          <div className="flex flex-wrap gap-2">
            {["gà kho gừng", "canh nấm", "thịt rang", "cơm rang", "bánh ngọt", "nước uống"].map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border border-orange-200 rounded-full text-sm font-medium text-orange-700 transition-all duration-200 hover:shadow-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {recentSearches.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Tìm kiếm gần đây
            </h3>
            <div className="space-y-2">
              {recentSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(term)}
                  className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4 text-gray-400 mr-3" />
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div 
          className="fixed inset-0 bg-black bg-opacity-25" 
          onClick={onClose} 
        />

        <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <Search className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Tìm kiếm món ăn</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm món ăn, nguyên liệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-gray-50 hover:bg-white transition-colors"
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
            {!searchTerm ? renderDefaultContent() : renderSearchResults()}
          </div>
        </div>
      </div>
    </div>
  );
}