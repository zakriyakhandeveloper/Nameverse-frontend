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
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose NameVerse
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by millions of parents for authentic, verified baby names
          </p>
        </div>

        {/* Features Grid - Reduced to 4 key features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.slice(0, 4).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats - Simple and clean */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { number: '60K+', label: 'Verified Names', icon: BookCheck },
            { number: '5M+', label: 'Happy Parents', icon: Users },
            { number: '15+', label: 'Languages', icon: Globe },
            { number: '99%', label: 'Accuracy', icon: Shield }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center border border-gray-200"
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
