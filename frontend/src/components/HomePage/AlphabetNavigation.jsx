'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AlphabetNavigation = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header - Simplified */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Browse Names by Letter
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore names starting with any letter from A to Z
          </p>
        </div>

        {/* Alphabet Grid - Cleaner design */}
        <div className="grid grid-cols-7 sm:grid-cols-13 gap-2 sm:gap-3 max-w-5xl mx-auto">
          {alphabet.map((letter) => (
            <Link
              key={letter}
              href={`/names/islamic/letter/${letter.toLowerCase()}`}
              className="aspect-square flex items-center justify-center bg-white border border-gray-200 rounded-xl font-semibold text-lg sm:text-xl text-gray-700 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white hover:shadow-md transition-all"
              aria-label={`Browse baby names starting with ${letter}`}
            >
              {letter}
            </Link>
          ))}
        </div>

        {/* Popular Searches - Minimal */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-3">Popular:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['A', 'M', 'S', 'Z'].map((letter) => (
              <Link
                key={letter}
                href={`/names/islamic/letter/${letter.toLowerCase()}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all"
              >
                Names with {letter}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlphabetNavigation;
