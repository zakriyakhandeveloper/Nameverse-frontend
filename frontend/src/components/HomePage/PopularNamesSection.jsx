'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Heart, Star, ArrowRight, Sparkles, Users } from 'lucide-react';

const PopularNamesSection = () => {
  const popularBoyNames = [
    { name: 'Muhammad', meaning: 'Praised one, praiseworthy', religion: 'Islamic', origin: 'Arabic', slug: 'muhammad', searches: '125K+' },
    { name: 'Arjun', meaning: 'Bright, shining, white', religion: 'Hindu', origin: 'Sanskrit', slug: 'arjun', searches: '98K+' },
    { name: 'Noah', meaning: 'Rest, comfort, peace', religion: 'Christian', origin: 'Hebrew', slug: 'noah', searches: '112K+' },
    { name: 'Ali', meaning: 'Exalted, noble, sublime', religion: 'Islamic', origin: 'Arabic', slug: 'ali', searches: '89K+' },
    { name: 'Aiden', meaning: 'Little fire, fiery one', religion: 'Christian', origin: 'Irish', slug: 'aiden', searches: '76K+' },
    { name: 'Aarav', meaning: 'Peaceful, wisdom, melody', religion: 'Hindu', origin: 'Sanskrit', slug: 'aarav', searches: '82K+' },
    { name: 'Omar', meaning: 'Long-lived, flourishing', religion: 'Islamic', origin: 'Arabic', slug: 'omar', searches: '71K+' },
    { name: 'Liam', meaning: 'Strong-willed warrior', religion: 'Christian', origin: 'Irish', slug: 'liam', searches: '95K+' },
    { name: 'Advait', meaning: 'Unique, unparalleled', religion: 'Hindu', origin: 'Sanskrit', slug: 'advait', searches: '54K+' },
    { name: 'Zain', meaning: 'Beauty, grace, excellence', religion: 'Islamic', origin: 'Arabic', slug: 'zain', searches: '68K+' },
  ];

  const popularGirlNames = [
    { name: 'Aisha', meaning: 'Living, prosperous, alive', religion: 'Islamic', origin: 'Arabic', slug: 'aisha', searches: '108K+' },
    { name: 'Priya', meaning: 'Beloved, dear one', religion: 'Hindu', origin: 'Sanskrit', slug: 'priya', searches: '87K+' },
    { name: 'Sophia', meaning: 'Wisdom, knowledge', religion: 'Christian', origin: 'Greek', slug: 'sophia', searches: '115K+' },
    { name: 'Fatima', meaning: 'Captivating, abstinent', religion: 'Islamic', origin: 'Arabic', slug: 'fatima', searches: '94K+' },
    { name: 'Olivia', meaning: 'Olive tree, peace', religion: 'Christian', origin: 'Latin', slug: 'olivia', searches: '102K+' },
    { name: 'Ananya', meaning: 'Unique, matchless, peerless', religion: 'Hindu', origin: 'Sanskrit', slug: 'ananya', searches: '73K+' },
    { name: 'Zara', meaning: 'Princess, flower, radiance', religion: 'Islamic', origin: 'Arabic', slug: 'zara', searches: '81K+' },
    { name: 'Ava', meaning: 'Life, bird, voice', religion: 'Christian', origin: 'Latin', slug: 'ava', searches: '98K+' },
    { name: 'Maya', meaning: 'Illusion, magic, mother', religion: 'Hindu', origin: 'Sanskrit', slug: 'maya', searches: '79K+' },
    { name: 'Layla', meaning: 'Night, dark beauty', religion: 'Islamic', origin: 'Arabic', slug: 'layla', searches: '86K+' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-0 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-pink-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header - SEO Optimized */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-900">Trending Baby Names 2025</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Most Popular Baby Names
            <span className="block text-amber-600 mt-1">with Meanings & Origins</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the <strong>most searched Islamic, Hindu & Christian baby names</strong> chosen by 
            millions of parents worldwide. Each name includes verified meanings and cultural origins.
          </p>
        </div>

        {/* Trust Banner */}
        <div className="flex items-center justify-center gap-6 mb-10 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">5M+ Parents Trust Us</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Expert Verified Meanings</span>
          </div>
        </div>

        {/* Popular Names Grid - Simplified */}
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Boys Names - SEO Enhanced */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Popular Boy Names</h3>
                  <p className="text-sm text-gray-600">Top trending names for baby boys</p>
                </div>
              </div>

              <div className="space-y-3">
                {popularBoyNames.map((name, index) => (
                  <motion.div
                    key={name.slug}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/names/${name.religion.toLowerCase()}/${name.slug}`}
                      className="group block p-4 rounded-xl bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                              {name.name}
                            </h4>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                              {name.religion}
                            </span>
                            <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-full font-medium">
                              {name.searches}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="text-blue-500">"</span>
                            {name.meaning}
                            <span className="text-blue-500">"</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{name.origin}</span>
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/names/islamic"
                className="mt-6 block w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Explore All 60,000+ Boy Names →
              </Link>
            </div>

            {/* Girls Names - SEO Enhanced */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 sm:p-8 border border-pink-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Popular Girl Names</h3>
                  <p className="text-sm text-gray-600">Top trending names for baby girls</p>
                </div>
              </div>

              <div className="space-y-3">
                {popularGirlNames.map((name, index) => (
                  <motion.div
                    key={name.slug}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/names/${name.religion.toLowerCase()}/${name.slug}`}
                      className="group block p-4 rounded-xl bg-white hover:shadow-lg transition-all border border-transparent hover:border-pink-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-pink-600 transition-colors">
                              {name.name}
                            </h4>
                            <span className="text-xs px-2 py-1 bg-pink-100 text-pink-700 rounded-full font-medium">
                              {name.religion}
                            </span>
                            <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-full font-medium">
                              {name.searches}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="text-pink-500">"</span>
                            {name.meaning}
                            <span className="text-pink-500">"</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{name.origin}</span>
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/names/hindu"
                className="mt-6 block w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-center font-bold rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl"
              >
                Explore All 60,000+ Girl Names →
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PopularNamesSection;
