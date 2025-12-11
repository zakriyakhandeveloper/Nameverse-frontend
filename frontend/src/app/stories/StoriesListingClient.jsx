'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, Clock, Tag, Search, Filter, Loader2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { fetchStories, fetchTrendingStories, getStoryCategories } from '@/lib/api/stories';
import toast from 'react-hot-toast';

export default function StoriesListingClient() {
  const [stories, setStories] = useState([]);
  const [trendingStories, setTrendingStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const categories = ['all', ...getStoryCategories()];

  // Fetch stories
  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        const result = await fetchStories({ page, limit: 30 });

        if (result.success) {
          setStories(result.data);
          setPagination(result.pagination);
        } else {
          toast.error('Failed to load stories');
        }
      } catch (error) {
        console.error('Error loading stories:', error);
        toast.error('Failed to load stories');
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [page]);

  // Fetch trending stories
  useEffect(() => {
    const loadTrending = async () => {
      try {
        const result = await fetchTrendingStories(10);
        if (result.success) {
          setTrendingStories(result.data);
        }
      } catch (error) {
        console.error('Error loading trending stories:', error);
      }
    };

    loadTrending();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
              <BookOpen className="text-white w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900">
              Stories
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover inspiring tales, folktales, and narratives from around the world
          </p>
        </div>

        {/* Trending Stories Section */}
        {trendingStories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-orange-500" />
              Trending Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingStories.slice(0, 6).map((story) => (
                <StoryCard key={story._id} story={story} featured />
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                {category === 'all' ? 'All Stories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        ) : stories.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700 font-medium">
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No stories found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Story Card Component
function StoryCard({ story, featured = false }) {
  return (
    <Link
      href={`/stories/${story.locale || 'en'}/${story.slug}`}
      className={`block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${
        featured ? 'border-2 border-orange-200' : 'border-2 border-gray-100'
      }`}
    >
      {/* Image */}
      {story.coverImage && (
        <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        {story.category && (
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-3">
            <Tag size={12} />
            {story.category}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {story.title}
        </h3>

        {/* Excerpt */}
        {story.excerpt && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {story.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{story.readTime || '5 min'} read</span>
          </div>
          <div className="flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
            <span>Read Story</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
