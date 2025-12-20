'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AlphabetNavigation = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            Browse Baby Names Alphabetically (A-Z)
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Explore thousands of <span className="font-semibold text-indigo-600">baby boy names</span> and <span className="font-semibold text-indigo-600">baby girl names</span> starting with any letter from A to Z. Find <span className="font-semibold text-indigo-600">Islamic baby names</span>, <span className="font-semibold text-indigo-600">Hindu baby names</span>, and <span className="font-semibold text-indigo-600">Christian baby names</span> with verified meanings in English, Urdu, Arabic, and Hindi. Each letter opens a curated collection of meaningful names from diverse cultures and religious traditions.
          </motion.p>
        </div>

        {/* Alphabet Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-7 sm:grid-cols-13 gap-2 sm:gap-3 max-w-5xl mx-auto"
        >
          {alphabet.map((letter, index) => (
            <motion.div
              key={letter}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.02 * index }}
            >
              <Link
                href={`/names/islamic/letter/${letter.toLowerCase()}`}
                className="group relative aspect-square flex items-center justify-center bg-white border-2 border-indigo-100 rounded-xl font-bold text-xl sm:text-2xl text-gray-700 hover:border-indigo-500 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white hover:shadow-xl hover:scale-110 transition-all duration-300"
                aria-label={`Browse baby names starting with ${letter}`}
              >
                {letter}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Names: {letter}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Popular Letter Searches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-medium">
            Popular Searches:
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {['A', 'M', 'S', 'Z', 'R', 'F'].map((letter) => (
              <Link
                key={letter}
                href={`/names/islamic/letter/${letter.toLowerCase()}`}
                className="px-4 py-2 bg-white border border-indigo-200 rounded-full text-sm font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
              >
                {letter === 'A' && 'Baby Names Starting with A'}
                {letter === 'M' && 'Baby Names Starting with M'}
                {letter === 'S' && 'Baby Names Starting with S'}
                {letter === 'Z' && 'Baby Names Starting with Z'}
                {letter === 'R' && 'Baby Names Starting with R'}
                {letter === 'F' && 'Baby Names Starting with F'}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* SEO-Rich Description */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto text-center space-y-4"
        >
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Our comprehensive <span className="font-semibold text-indigo-600">baby name database</span> is organized alphabetically for easy browsing. Whether you're looking for <span className="font-semibold text-indigo-600">unique baby names 2025</span>, <span className="font-semibold text-indigo-600">traditional Islamic names</span>, <span className="font-semibold text-indigo-600">Sanskrit Hindu names</span>, or <span className="font-semibold text-indigo-600">Biblical Christian names</span>, our A-Z navigation helps you discover the perfect name quickly. Each letter category includes hundreds of verified names with complete meanings, cultural origins, pronunciation guides, and spiritual significance.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Browse <span className="font-semibold text-indigo-600">baby boy names starting with A</span> like Aiden, Abdullah, and Arjun, or explore <span className="font-semibold text-indigo-600">baby girl names starting with M</span> like Maryam, Maya, and Madison. Our alphabetical baby name finder makes it easy to explore names by first letter while filtering by religion, gender, and cultural origin. Start your naming journey by clicking any letter above to discover thousands of meaningful baby names with authentic translations in multiple languages.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AlphabetNavigation;
