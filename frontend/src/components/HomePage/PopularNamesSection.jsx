'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Heart, Star, ArrowRight } from 'lucide-react';

const PopularNamesSection = () => {
  const popularBoyNames = [
    { name: 'Muhammad', meaning: 'Praised one, praiseworthy', religion: 'Islamic', origin: 'Arabic', slug: 'muhammad' },
    { name: 'Arjun', meaning: 'Bright, shining, white', religion: 'Hindu', origin: 'Sanskrit', slug: 'arjun' },
    { name: 'Noah', meaning: 'Rest, comfort, peace', religion: 'Christian', origin: 'Hebrew', slug: 'noah' },
    { name: 'Ali', meaning: 'Exalted, noble, sublime', religion: 'Islamic', origin: 'Arabic', slug: 'ali' },
    { name: 'Aiden', meaning: 'Little fire, fiery one', religion: 'Christian', origin: 'Irish', slug: 'aiden' },
    { name: 'Aarav', meaning: 'Peaceful, wisdom, melody', religion: 'Hindu', origin: 'Sanskrit', slug: 'aarav' },
    { name: 'Omar', meaning: 'Long-lived, flourishing', religion: 'Islamic', origin: 'Arabic', slug: 'omar' },
    { name: 'Liam', meaning: 'Strong-willed warrior', religion: 'Christian', origin: 'Irish', slug: 'liam' },
    { name: 'Advait', meaning: 'Unique, unparalleled', religion: 'Hindu', origin: 'Sanskrit', slug: 'advait' },
    { name: 'Zain', meaning: 'Beauty, grace, excellence', religion: 'Islamic', origin: 'Arabic', slug: 'zain' },
  ];

  const popularGirlNames = [
    { name: 'Aisha', meaning: 'Living, prosperous, alive', religion: 'Islamic', origin: 'Arabic', slug: 'aisha' },
    { name: 'Priya', meaning: 'Beloved, dear one', religion: 'Hindu', origin: 'Sanskrit', slug: 'priya' },
    { name: 'Sophia', meaning: 'Wisdom, knowledge', religion: 'Christian', origin: 'Greek', slug: 'sophia' },
    { name: 'Fatima', meaning: 'Captivating, abstinent', religion: 'Islamic', origin: 'Arabic', slug: 'fatima' },
    { name: 'Olivia', meaning: 'Olive tree, peace', religion: 'Christian', origin: 'Latin', slug: 'olivia' },
    { name: 'Ananya', meaning: 'Unique, matchless, peerless', religion: 'Hindu', origin: 'Sanskrit', slug: 'ananya' },
    { name: 'Zara', meaning: 'Princess, flower, radiance', religion: 'Islamic', origin: 'Arabic', slug: 'zara' },
    { name: 'Ava', meaning: 'Life, bird, voice', religion: 'Christian', origin: 'Latin', slug: 'ava' },
    { name: 'Maya', meaning: 'Illusion, magic, mother', religion: 'Hindu', origin: 'Sanskrit', slug: 'maya' },
    { name: 'Layla', meaning: 'Night, dark beauty', religion: 'Islamic', origin: 'Arabic', slug: 'layla' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-900">Trending in 2025</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Popular Baby Names
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most searched names chosen by parents worldwide
          </p>
        </div>

        {/* Popular Names Grid - Simplified */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Boys Names */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Boy Names</h3>
                <p className="text-sm text-gray-600">Top picks for boys</p>
              </div>
            </div>

            <div className="space-y-2">
              {popularBoyNames.map((name) => (
                <Link
                  key={name.slug}
                  href={`/names/${name.religion.toLowerCase()}/${name.slug}`}
                  className="group block p-3 rounded-lg bg-white hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {name.name}
                        </h4>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                          {name.religion}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{name.meaning}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/names/islamic"
              className="mt-6 block w-full py-3 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Boy Names →
            </Link>
          </div>

          {/* Girls Names */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Girl Names</h3>
                <p className="text-sm text-gray-600">Top picks for girls</p>
              </div>
            </div>

            <div className="space-y-2">
              {popularGirlNames.map((name) => (
                <Link
                  key={name.slug}
                  href={`/names/${name.religion.toLowerCase()}/${name.slug}`}
                  className="group block p-3 rounded-lg bg-white hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                          {name.name}
                        </h4>
                        <span className="text-xs px-2 py-0.5 bg-pink-100 text-pink-700 rounded">
                          {name.religion}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{name.meaning}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/names/hindu"
              className="mt-6 block w-full py-3 bg-pink-600 text-white text-center font-semibold rounded-lg hover:bg-pink-700 transition-colors"
            >
              View All Girl Names →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularNamesSection;
