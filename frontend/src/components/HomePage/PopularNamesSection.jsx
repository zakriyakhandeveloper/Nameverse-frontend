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
    <section className="py-12 sm:py-16 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-full mb-4"
          >
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-bold text-amber-800">Trending Now in 2025</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            Popular Baby Names This Month
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the most searched <span className="font-semibold text-indigo-600">baby boy names</span> and <span className="font-semibold text-indigo-600">baby girl names</span> chosen by thousands of parents worldwide in 2025. Our <span className="font-semibold text-indigo-600">popular baby names</span> list features trending <span className="font-semibold text-indigo-600">Islamic names</span>, <span className="font-semibold text-indigo-600">Hindu names</span>, and <span className="font-semibold text-indigo-600">Christian names</span> with beautiful meanings and cultural significance.
          </motion.p>
        </div>

        {/* Popular Names Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Boys Names */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border-2 border-blue-100 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-600">Popular Baby Boy Names</h3>
                <p className="text-sm text-gray-600">Trending boy names with meanings</p>
              </div>
            </div>

            <div className="space-y-3">
              {popularBoyNames.map((name, index) => (
                <Link
                  key={name.slug}
                  href={`/names/${name.religion.toLowerCase()}/${name.slug}`}
                  className="group block p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                          {name.name}
                        </h4>
                        <span className="text-xs font-semibold px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full">
                          {name.religion}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{name.meaning}</p>
                      <p className="text-xs text-gray-500">Origin: {name.origin}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/names/islamic"
              className="mt-6 block w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transition-all"
            >
              View All Islamic Boy Names →
            </Link>
          </motion.div>

          {/* Girls Names */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border-2 border-pink-100 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-pink-600">Popular Baby Girl Names</h3>
                <p className="text-sm text-gray-600">Trending girl names with meanings</p>
              </div>
            </div>

            <div className="space-y-3">
              {popularGirlNames.map((name, index) => (
                <Link
                  key={name.slug}
                  href={`/names/${name.religion.toLowerCase()}/${name.slug}`}
                  className="group block p-4 rounded-xl border border-gray-100 hover:border-pink-300 hover:bg-pink-50/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg text-gray-900 group-hover:text-pink-600 transition-colors">
                          {name.name}
                        </h4>
                        <span className="text-xs font-semibold px-2 py-1 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full">
                          {name.religion}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{name.meaning}</p>
                      <p className="text-xs text-gray-500">Origin: {name.origin}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/names/hindu"
              className="mt-6 block w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-center font-bold rounded-xl hover:from-pink-700 hover:to-rose-700 hover:shadow-lg transition-all"
            >
              View All Hindu Girl Names →
            </Link>
          </motion.div>
        </div>

        {/* SEO-Rich Bottom Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-5xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-indigo-100"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
            Why These Are the Most Popular Baby Names in 2025
          </h3>
          <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              Our <span className="font-semibold text-indigo-600">trending baby names 2025</span> list is based on real search data from millions of parents worldwide. These <span className="font-semibold text-indigo-600">popular baby names</span> represent a perfect blend of traditional values and modern appeal, combining <span className="font-semibold text-indigo-600">Islamic baby names</span> like Muhammad and Aisha with <span className="font-semibold text-indigo-600">Hindu baby names</span> like Arjun and Priya, and <span className="font-semibold text-indigo-600">Christian baby names</span> like Noah and Sophia.
            </p>
            <p>
              Parents are increasingly choosing <span className="font-semibold text-indigo-600">meaningful baby names</span> that honor their cultural heritage while being easy to pronounce in multiple languages. Names like Zain, Maya, and Liam have become <span className="font-semibold text-indigo-600">popular baby boy names</span> and <span className="font-semibold text-indigo-600">baby girl names</span> because they carry beautiful meanings and work well across different cultures. Our verified database provides complete information including pronunciation in Urdu, Arabic, Hindi, and English, making it easy for parents to find the perfect name.
            </p>
            <p>
              Whether you're looking for <span className="font-semibold text-indigo-600">unique baby names 2025</span>, <span className="font-semibold text-indigo-600">traditional Islamic names</span>, <span className="font-semibold text-indigo-600">Sanskrit Hindu names</span>, or <span className="font-semibold text-indigo-600">Biblical Christian names</span>, our popular names list provides inspiration backed by real trends and authentic cultural meanings. Each name is verified by religious and cultural experts to ensure accuracy and authenticity.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularNamesSection;
