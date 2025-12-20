'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, BookCheck, Users, Award, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

const WhyChooseSection = () => {
  const features = [
    {
      icon: Shield,
      title: '99% Verified Accuracy',
      description: 'Every baby name is verified by cultural and religious experts including Islamic scholars, Sanskrit linguists, and theologians to ensure authentic meanings.',
      gradient: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Unique translations in English, Urdu, Arabic, and Hindi with pronunciation guides. No other baby name site offers this comprehensive language support.',
      gradient: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: BookCheck,
      title: '60,000+ Verified Names',
      description: 'Comprehensive database covering 25,000+ Islamic names, 20,000+ Hindu names, and 15,000+ Christian names with complete cultural context and origins.',
      gradient: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Users,
      title: 'Trusted by 5M+ Parents',
      description: 'Join millions of parents worldwide who have found their baby\'s perfect name through our expert-curated, culturally authentic database.',
      gradient: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Award,
      title: 'Expert Verification Process',
      description: 'Our team of cultural experts, Islamic scholars, Sanskrit specialists, and theologians verify each name against original sources like Quran, Vedas, and Bible.',
      gradient: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: Sparkles,
      title: 'Complete Information',
      description: 'Beyond just meanings - get pronunciation guides, numerology insights, personality traits, spiritual significance, and lucky numbers for each name.',
      gradient: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Heart,
      title: 'Cultural Authenticity',
      description: 'Deep religious and cultural insights not found on generic name sites. Understand Quranic references, Vedic connections, and Biblical significance.',
      gradient: 'from-amber-500 to-yellow-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: CheckCircle2,
      title: 'No Mistranslations',
      description: 'Avoid embarrassing errors found on other sites. Our verified meanings prevent common mistranslations and ensure your child\'s name has the meaning you intend.',
      gradient: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50'
    }
  ];

  const comparisonPoints = [
    {
      feature: 'Multilingual translations (Urdu, Arabic, Hindi)',
      nameverse: true,
      others: false
    },
    {
      feature: 'Verified by religious & cultural experts',
      nameverse: true,
      others: false
    },
    {
      feature: 'Deep religious context (Quran, Vedas, Bible)',
      nameverse: true,
      others: false
    },
    {
      feature: 'Pronunciation guides in multiple languages',
      nameverse: true,
      others: true
    },
    {
      feature: 'Numerology & spiritual significance',
      nameverse: true,
      others: false
    },
    {
      feature: 'Audio pronunciations',
      nameverse: true,
      others: true
    },
    {
      feature: '60,000+ names database',
      nameverse: true,
      others: false
    },
    {
      feature: 'Cultural authenticity guarantee',
      nameverse: true,
      others: false
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-full mb-4"
          >
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-bold text-indigo-800">Why Parents Choose NameVerse</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            The World's Most Trusted Multilingual Baby Name Database
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            NameVerse stands as the premier destination for parents seeking <span className="font-semibold text-indigo-600">authentic baby names with verified meanings</span> across <span className="font-semibold text-indigo-600">Islamic, Hindu, and Christian traditions</span>. Unlike generic baby name websites that offer shallow information or mistranslated meanings, we provide comprehensive, expert-verified content in multiple languages with deep cultural and religious context. Join over 5 million parents worldwide who trust NameVerse for finding their baby's perfect name.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
                className={`${feature.bgColor} rounded-2xl p-6 border-2 border-gray-100 hover:border-indigo-300 hover:shadow-xl transition-all group`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
            <h3 className="text-2xl font-bold text-white text-center">
              NameVerse vs Other Baby Name Sites
            </h3>
            <p className="text-sm text-white/90 text-center mt-2">
              See why NameVerse is the superior choice for finding your baby's name
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Header Row */}
            <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-50 font-bold text-sm sm:text-base">
              <div className="text-gray-700">Feature</div>
              <div className="text-center text-indigo-600">NameVerse</div>
              <div className="text-center text-gray-500">Other Sites</div>
            </div>

            {/* Comparison Rows */}
            {comparisonPoints.map((point, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-indigo-50/50 transition-colors text-sm sm:text-base"
              >
                <div className="text-gray-700 flex items-center">
                  {point.feature}
                </div>
                <div className="flex justify-center items-center">
                  {point.nameverse ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-200" />
                  )}
                </div>
                <div className="flex justify-center items-center">
                  {point.others ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100" />
                  ) : (
                    <div className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">✕</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { number: '60,000+', label: 'Verified Baby Names', icon: BookCheck },
            { number: '5M+', label: 'Happy Parents', icon: Users },
            { number: '15+', label: 'Languages Supported', icon: Globe },
            { number: '99%', label: 'Accuracy Rate', icon: Shield }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all"
              >
                <Icon className="w-10 h-10 mx-auto mb-3 text-indigo-600" />
                <div className="text-3xl sm:text-4xl font-black text-indigo-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Our Verification Process Guarantees Authentic Meanings
          </h3>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Every <span className="font-semibold text-indigo-600">baby name</span> in our database undergoes rigorous verification by cultural and religious experts. For <span className="font-semibold text-indigo-600">Islamic baby names</span>, our team of Islamic scholars cross-references Quranic verses, authentic Hadith, and classical Arabic sources. For <span className="font-semibold text-indigo-600">Hindu baby names</span>, Sanskrit linguists verify meanings against Vedas, Upanishads, and Puranas. For <span className="font-semibold text-indigo-600">Christian baby names</span>, theologians check Biblical references in original Hebrew and Greek texts.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            This meticulous process ensures you receive <span className="font-semibold text-indigo-600">authentic, accurate meanings</span> - not the mistranslations and shallow definitions found on generic baby name sites. When you choose a name from NameVerse, you can be confident it carries the meaning and significance you intend for your child's lifelong identity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
