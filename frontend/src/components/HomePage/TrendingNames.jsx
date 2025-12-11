'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Heart, ChevronRight, Globe, BookOpen, Award, Sparkles, Loader2 } from 'lucide-react';
import { fetchTrendingNames } from '@/lib/api/names';
import toast from 'react-hot-toast';

const religionFilters = [
  { 
    value: "global", 
    label: "All", 
    icon: Globe,
    gradient: "from-indigo-600 to-purple-600",
    bg: "bg-indigo-50"
  },
  { 
    value: "islamic", 
    label: "Islamic", 
    icon: BookOpen,
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50"
  },
  { 
    value: "hindu", 
    label: "Hindu", 
    icon: Sparkles,
    gradient: "from-orange-500 to-red-600",
    bg: "bg-orange-50"
  },
  { 
    value: "christian", 
    label: "Christian", 
    icon: Award,
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50"
  },
];

export default function TrendingNames() {
  const [selectedReligion, setSelectedReligion] = useState("global");
  const [favorites, setFavorites] = useState([]);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending names from API
  useEffect(() => {
    const loadTrendingNames = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchTrendingNames({
          religion: selectedReligion,
          limit: 20,
        });

        if (result.success && result.data) {
          setNames(result.data);
        } else {
          setNames([]);
          setError('No trending names found');
        }
      } catch (err) {
        console.error('Error loading trending names:', err);
        setError('Failed to load trending names');
        toast.error('Failed to load trending names');
        setNames([]);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingNames();
  }, [selectedReligion]);

  const toggleFavorite = (nameId) => {
    setFavorites(prev => 
      prev.includes(nameId) 
        ? prev.filter(id => id !== nameId)
        : [...prev, nameId]
    );
  };

  const handleViewDetails = (name) => {
    window.location.href = `/names/${name.religion?.toLowerCase()}/${name.slug}`;
  };

  const selectedFilter = religionFilters.find(f => f.value === selectedReligion);

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Centered */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className={`bg-gradient-to-br ${selectedFilter.gradient} p-3 rounded-xl shadow-lg`}>
              <TrendingUp className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
              Trending Names
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover the most popular baby names loved by parents worldwide
          </p>
        </div>

        {/* Filter Pills - Centered */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {religionFilters.map((filter) => {
            const FilterIcon = filter.icon;
            const isSelected = selectedReligion === filter.value;
            
            return (
              <button
                key={filter.value}
                onClick={() => setSelectedReligion(filter.value)}
                className={`
                  flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base
                  transition-all duration-300 shadow-md hover:shadow-lg
                  ${isSelected
                    ? `bg-gradient-to-r ${filter.gradient} text-white scale-105`
                    : `bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200`
                  }
                `}
              >
                <FilterIcon size={18} />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Names Grid - Mobile First */}
        {!loading && !error && names.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {names.map((name, index) => {
            const isFavorite = favorites.includes(name._id);
            
            return (
              <div
                key={name._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-indigo-200 overflow-hidden"
                style={{
                  animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
                }}
              >
                {/* Card Content */}
                <div className="p-5">
                  
                  {/* Header with Name and Favorite */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 truncate">
                        {name.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{name.origin}</p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(name._id)}
                      className={`
                        p-2 rounded-lg transition-all duration-200 flex-shrink-0
                        ${isFavorite 
                          ? 'bg-pink-100 text-pink-600 scale-110' 
                          : 'bg-gray-100 text-gray-400 hover:bg-pink-50 hover:text-pink-400'
                        }
                      `}
                    >
                      <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
                    </button>
                  </div>

                  {/* Gender Badge */}
                  <div className="mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                      name.gender === 'Male' ? 'bg-blue-50 text-blue-700 border-2 border-blue-200' : 
                      name.gender === 'Female' ? 'bg-pink-50 text-pink-700 border-2 border-pink-200' : 
                      'bg-purple-50 text-purple-700 border-2 border-purple-200'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        name.gender === 'Male' ? 'bg-blue-500' : 
                        name.gender === 'Female' ? 'bg-pink-500' : 
                        'bg-purple-500'
                      }`}></div>
                      <span className="text-xs font-bold">{name.gender}</span>
                    </div>
                  </div>

                  {/* Meaning */}
                  <div className={`${selectedFilter.bg} rounded-xl p-4 mb-4 border-2 ${
                    selectedReligion === 'islamic' ? 'border-emerald-200' :
                    selectedReligion === 'hindu' ? 'border-orange-200' :
                    selectedReligion === 'christian' ? 'border-blue-200' :
                    'border-indigo-200'
                  }`}>
                    <div className="flex items-start gap-2">
                      <Sparkles size={16} className="text-gray-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {name.short_meaning}
                      </p>
                    </div>
                  </div>

                  {/* Lucky Number and Colors */}
                  <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-semibold">Lucky #</span>
                      <span className="font-black text-xl text-gray-900">
                        {name.lucky_number}
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {name.lucky_colors?.map((color, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleViewDetails(name)}
                  className={`
                    w-full bg-gradient-to-r ${selectedFilter.gradient}
                    text-white font-bold py-3.5 text-sm
                    transition-all duration-200 hover:shadow-lg
                    flex items-center justify-center gap-2
                    border-t-2 border-gray-100
                  `}
                >
                  <span>View Details</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            );
          })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && names.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No trending names found for {selectedReligion}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}