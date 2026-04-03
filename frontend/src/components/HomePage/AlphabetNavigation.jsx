'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Sparkles, TrendingUp } from 'lucide-react';

const AlphabetNavigation = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Popular starting letters with counts
  const popularLetters = [
    { letter: 'A', count: '8,500+', color: 'from-indigo-500 to-purple-600' },
    { letter: 'M', count: '7,200+', color: 'from-emerald-500 to-teal-600' },
    { letter: 'S', count: '6,800+', color: 'from-rose-500 to-pink-600' },
    { letter: 'Z', count: '4,500+', color: 'from-amber-500 to-orange-600' },
    { letter: 'F', count: '5,100+', color: 'from-blue-500 to-cyan-600' },
    { letter: 'H', count: '4,800+', color: 'from-violet-500 to-purple-600' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header - SEO Optimized */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
            <Search className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">Baby Names A to Z</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Browse Baby Names
            <span className="block text-indigo-600 mt-1">by Letter</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Islamic, Hindu & Christian baby names starting with any letter. 
            Find <strong>unique meanings</strong> and <strong>origins</strong> for every alphabet.
          </p>
        </div>

        {/* Alphabet Grid - Enhanced Design */}
        <div className="grid grid-cols-7 sm:grid-cols-13 gap-2 sm:gap-3 max-w-5xl mx-auto mb-12">
          {alphabet.map((letter, index) => (
            <motion.div
              key={letter}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
            >
              <Link
                href={`/names/islamic/letter/${letter.toLowerCase()}`}
                className="aspect-square flex items-center justify-center bg-white border-2 border-gray-100 rounded-xl font-bold text-lg sm:text-xl text-gray-700 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
                aria-label={`Browse baby names starting with letter ${letter}`}
              >
                {letter}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Popular Letters - Featured Section */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-900">Most Popular Starting Letters</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {popularLetters.map((item, index) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/names/islamic/letter/${item.letter.toLowerCase()}`}
                  className="block bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
                >
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform`}>
                    {item.letter}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1">Letter {item.letter}</div>
                    <div className="text-sm text-indigo-600 font-medium">{item.count} names</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Search Hint */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700">
              <strong className="text-indigo-700">Pro Tip:</strong> Use our search bar above for instant name suggestions with meanings!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlphabetNavigation;
