'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Heart, ChevronRight, BookOpen, Award, Sparkles, Loader2, ArrowRight, Star, Users, Search } from 'lucide-react';
import { fetchTrendingNames } from '@/lib/api/names';
import toast from 'react-hot-toast';

const religionFilters = [
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
  const [selectedReligion, setSelectedReligion] = useState("islamic");
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
    // API returns "Islam" but we need "islamic" for the URL
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

  const selectedFilter = religionFilters.find(f => f.value === selectedReligion) || religionFilters[0];

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - SEO Optimized */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6"
          >
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">Trending Now</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Trending Baby Names
            <span className="block text-indigo-600 mt-1">2025 Most Popular</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover the <strong>most searched Islamic, Hindu & Christian baby names</strong> trending in 2025. 
            Find meanings, lucky numbers, and cultural origins for each name.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 mt-6 flex-wrap"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
              <Search className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">100K+ Monthly Searches</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">5M+ Parents</span>
            </div>
          </motion.div>
        </div>

        {/* Filter Pills - Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-14"
        >
          {religionFilters.map((filter) => {
            const FilterIcon = filter.icon;
            const isSelected = selectedReligion === filter.value;
            
            return (
              <button
                key={filter.value}
                onClick={() => setSelectedReligion(filter.value)}
                className={`
                  flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base
                  transition-all duration-300 shadow-lg hover:shadow-xl
                  ${isSelected
                    ? `bg-gradient-to-r ${filter.gradient} text-white scale-105 shadow-xl`
                    : `bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-300`
                  }
                `}
              >
                <FilterIcon size={20} />
                <span>{filter.label} Names</span>
                {isSelected && <Star className="w-4 h-4 fill-current ml-1" />}
              </button>
            );
          })}
        </motion.div>

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

        {/* Names Grid - Enhanced Design */}
        {!loading && !error && names.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {names.map((name, index) => {
            const isFavorite = favorites.includes(name._id);
            
            return (
              <motion.div
                key={name._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 overflow-hidden group hover:-translate-y-1"
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
                      <p className="text-sm text-gray-700 leading-relaxed font-medium line-clamp-2">
                        {name.short_meaning || name.long_meaning || 'Beautiful meaning'}
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
                    text-white font-bold py-4 text-sm
                    transition-all duration-200 hover:shadow-xl group-hover:py-4.5
                    flex items-center justify-center gap-2
                    border-t border-gray-100
                  `}
                >
                  <span>View Full Details</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && names.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg mb-4">No trending names found for {selectedReligion}</p>
            <p className="text-gray-500">Try selecting a different category or check back later</p>
          </div>
        )}

        {/* CTA Section */}
        {!loading && !error && names.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href={`/names/${selectedReligion}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-5 h-5" />
              Explore All {selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Names
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Browse 60,000+ verified baby names with meanings
            </p>
          </motion.div>
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
