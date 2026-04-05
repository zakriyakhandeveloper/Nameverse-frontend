'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { TrendingUp, Heart, BookOpen, ArrowRight, Star, Search, RefreshCw, Sparkles, Zap, Crown, Flame } from 'lucide-react';
import { fetchTrendingNames } from '@/lib/api/names';
import toast from 'react-hot-toast';

const religionFilters = [
  { value: "islamic", label: "Islamic", color: "from-emerald-500 to-teal-600", bgColor: "bg-emerald-50", textColor: "text-emerald-700" },
  { value: "hindu", label: "Hindu", color: "from-orange-500 to-amber-600", bgColor: "bg-orange-50", textColor: "text-orange-700" },
  { value: "christian", label: "Christian", color: "from-blue-500 to-indigo-600", bgColor: "bg-blue-50", textColor: "text-blue-700" },
];

const NameCardSkeleton = () => (
  <div className="border-2 border-gray-200 rounded-xl p-5 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="h-7 bg-gray-200 rounded-lg w-28 mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-20"></div>
      </div>
      <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
    </div>
    <div className="h-4 bg-gray-100 rounded w-24 mb-4"></div>
    <div className="h-14 bg-gray-50 rounded-lg mb-4"></div>
    <div className="h-12 bg-gray-100 rounded-lg"></div>
  </div>
);

export default function TrendingNames() {
  const [selectedReligion, setSelectedReligion] = useState("islamic");
  const [favorites, setFavorites] = useState([]);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTrendingNames = useCallback(async (religion) => {
    setLoading(true);
    setError(null);

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out');
      setNames([]);
    }, 15000); // 15 second timeout

    try {
      const result = await fetchTrendingNames({
        religion: religion,
        limit: 12,
      });

      clearTimeout(timeoutId);

      if (result.success && result.data && result.data.length > 0) {
        setNames(result.data);
      } else {
        setNames([]);
        setError('No trending names found');
      }
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Error loading trending names:', err);
      setError('Failed to load trending names');
      toast.error('Failed to load trending names');
      setNames([]);
    }
  }, []);

  useEffect(() => {
    loadTrendingNames(selectedReligion);
  }, [selectedReligion, loadTrendingNames]);

  const toggleFavorite = (nameId) => {
    setFavorites(prev => 
      prev.includes(nameId) 
        ? prev.filter(id => id !== nameId)
        : [...prev, nameId]
    );
  };

  const handleViewDetails = (name) => {
    const religionMap = {
      'islam': 'islamic',
      'islamic': 'islamic',
      'hindu': 'hindu',
      'hinduism': 'hindu',
      'christian': 'christian',
      'christianity': 'christian',
    };
    const religion = religionMap[name.religion?.toLowerCase()] || selectedReligion || 'islamic';
    window.location.href = `/names/${religion}/${name.slug}`;
  };

  const activeFilter = religionFilters.find(f => f.value === selectedReligion) || religionFilters[0];

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4 shadow-md">
            <Flame className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-semibold text-white">Trending Now</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trending Baby Names <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">2025</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Discover the most searched Islamic, Hindu & Christian baby names trending in 2025.
          </p>
        </div>

        {/* Filter Pills - Colorful */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {religionFilters.map((filter) => {
            const isSelected = selectedReligion === filter.value;
            
            return (
              <button
                key={filter.value}
                onClick={() => setSelectedReligion(filter.value)}
                className={`
                  px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300
                  ${isSelected
                    ? `bg-gradient-to-r ${filter.color} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-400 hover:shadow-md'
                  }
                `}
              >
                {filter.label} Names
                {isSelected && <Star className="w-3.5 h-3.5 inline ml-1 fill-current" />}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <NameCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200 max-w-md mx-auto">
            <RefreshCw className="w-10 h-10 text-gray-400 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600 text-lg mb-2 font-semibold">{error}</p>
            <p className="text-gray-500 text-sm mb-6">Please try again or select a different category</p>
            <button
              onClick={() => loadTrendingNames(selectedReligion)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Names Grid */}
        {!loading && !error && names.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {names.map((name, index) => {
              const isFavorite = favorites.includes(name._id);
              
              return (
                <div
                  key={name._id}
                  className="bg-white rounded-xl border-2 border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2 group"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className="p-5">
                    {/* Header with gradient top border */}
                    <div className="relative">
                      <div className="absolute -top-2 left-4 right-4 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {name.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5">{name.origin}</p>
                        </div>
                        <button
                          onClick={() => toggleFavorite(name._id)}
                          className={`
                            p-2 rounded-lg transition-all flex-shrink-0
                            ${isFavorite 
                              ? 'text-red-500 bg-red-50 scale-110' 
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            }
                          `}
                          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
                        </button>
                      </div>
                    </div>

                    {/* Gender Badge */}
                    <div className="mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                        name.gender === 'Male' ? 'bg-blue-100 text-blue-700' : 
                        name.gender === 'Female' ? 'bg-pink-100 text-pink-700' : 
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {name.gender === 'Male' ? <Crown className="w-3 h-3" /> : 
                         name.gender === 'Female' ? <Sparkles className="w-3 h-3" /> : 
                         <Star className="w-3 h-3" />}
                        {name.gender}
                      </span>
                    </div>

                    {/* Meaning */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-4 border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {name.short_meaning || name.long_meaning || 'Beautiful meaning'}
                      </p>
                    </div>

                    {/* Lucky Number & Colors */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">Lucky #</span>
                        <span className="font-bold text-xl text-gray-900 bg-white px-2 py-1 rounded-lg shadow-sm">
                          {name.lucky_number}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        {name.lucky_colors?.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleViewDetails(name)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 text-sm transition-all duration-300 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2 hover:shadow-lg"
                  >
                    <Zap className="w-4 h-4" />
                    View Full Details
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && names.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200 max-w-md mx-auto">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4 font-semibold">No trending names found for {selectedReligion}</p>
            <p className="text-gray-500 mb-6">Try selecting a different category or check back later</p>
          </div>
        )}

        {/* CTA */}
        {!loading && !error && names.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href={`/names/${selectedReligion}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <BookOpen className="w-5 h-5" />
              Explore All {selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Names
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Browse 60,000+ verified baby names with meanings
            </p>
          </div>
        )}
      </div>
    </section>
  );
}