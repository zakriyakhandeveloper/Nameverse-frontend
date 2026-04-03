'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Globe, BookCheck, Users, Award, Sparkles, Heart, CheckCircle2, ArrowRight, Star, Zap } from 'lucide-react';

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
    <section className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header - SEO Optimized */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
            <Star className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">#1 Trusted Baby Name Website</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Parents Choose
            <span className="block text-indigo-600 mt-1">NameVerse for Baby Names</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Join <strong>5 million+ parents</strong> worldwide who trust NameVerse for 
            <strong> authentic Islamic, Hindu & Christian baby names</strong> with verified meanings and cultural origins.
          </p>
        </div>

        {/* Features Grid - Enhanced with 4 key features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.slice(0, 4).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats - Enhanced Design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          {[
            { number: '60,000+', label: 'Verified Baby Names', icon: BookCheck, color: 'from-blue-500 to-indigo-600' },
            { number: '5M+', label: 'Happy Parents Worldwide', icon: Users, color: 'from-emerald-500 to-teal-600' },
            { number: '15+', label: 'Languages Supported', icon: Globe, color: 'from-purple-500 to-pink-600' },
            { number: '99%', label: 'Meaning Accuracy', icon: Shield, color: 'from-amber-500 to-orange-600' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table - SEO Enhanced */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              NameVerse vs Other Baby Name Sites
            </h3>
            <p className="text-gray-600">See why parents prefer NameVerse for authentic baby names</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Feature</th>
                  <th className="text-center py-4 px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-bold">
                      <Zap className="w-4 h-4" />
                      NameVerse
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 text-gray-500 font-medium">Other Sites</th>
                </tr>
              </thead>
              <tbody>
                {comparisonPoints.map((point, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-gray-700 font-medium">{point.feature}</td>
                    <td className="text-center py-4 px-4">
                      {point.nameverse ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {point.others ? (
                        <CheckCircle2 className="w-6 h-6 text-gray-400 mx-auto" />
                      ) : (
                        <span className="text-gray-300">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/names/islamic"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Start Exploring 60,000+ Baby Names
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
