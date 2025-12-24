import { Globe, Heart, Award, BookOpen, Languages, CheckCircle, Star, Lock, TrendingUp, ArrowRight } from 'lucide-react';
import SearchBar from './SearchSection';

const Hero = () => {
  const categories = [
    {
      id: 'islamic',
      name: 'Islamic',
      icon: Globe,
      gradient: 'from-emerald-500 to-teal-600',
      url: '/names/islamic',
      count: '25,000+',
      description: 'Quranic & Arabic baby names with meanings in Urdu',
      fullDescription: 'Explore 25,000+ authentic Islamic baby names including Quranic names for boys and girls, names of Prophets and Sahaba, and Arabic origin names. Each Muslim baby name includes verified meanings in Urdu and Arabic with spiritual significance and pronunciation guides.',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 'hindu',
      name: 'Hindu',
      icon: Heart,
      gradient: 'from-orange-500 to-red-600',
      url: '/names/hindu',
      count: '20,000+',
      description: 'Sanskrit & Hindi names with Vedic meanings',
      fullDescription: 'Discover 20,000+ Hindu baby names from Sanskrit, Hindi, Tamil, and other Indian languages. Find Hindu boy names and Hindu girl names inspired by Hindu deities like Lord Krishna and Lord Shiva, Vedic literature, Indian culture, and modern Bollywood trends with pronunciation guides.',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'christian',
      name: 'Christian',
      icon: Award,
      gradient: 'from-blue-500 to-indigo-600',
      url: '/names/christian',
      count: '15,000+',
      description: 'Biblical names with verse references & saint names',
      fullDescription: 'Browse 15,000+ Christian baby names with Biblical origins from Old and New Testament, traditional saint names, and European Christian heritage. Each Christian boy name and Christian girl name includes verse references, spiritual meanings, Christian historical significance, and pronunciation guides.',
      bgColor: 'bg-blue-50'
    }
  ];

  const stats = [
    { number: '60K+', label: 'Names', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { number: '15+', label: 'Languages', icon: Languages, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { number: '99%', label: 'Verified', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' }
  ];

  const trustIndicators = [
    { icon: Star, text: 'Trusted by 5M+ Parents', color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: Lock, text: 'Expert Verified', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: BookOpen, text: 'Multilingual Support', color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  return (
    <section className="relative w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-12 sm:py-16 lg:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          
          {/* Trust badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-md border border-indigo-100 rounded-full shadow-lg">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Trusted by 5M+ Parents
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight px-2">
              Find Your Baby's Perfect Name
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
                60,000+ Verified Islamic, Hindu & Christian Names
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium px-4 max-w-3xl mx-auto">
              Discover authentic baby names with complete meanings in English, Urdu, Arabic & Hindi. Explore Islamic names, Hindu names, and Christian names with pronunciation guides and cultural significance.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto px-2">
            <SearchBar />
          </div>

          {/* Trust indicators - Mobile optimized */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div
                  key={index}
                  className={`inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 ${indicator.bg} rounded-lg text-xs sm:text-sm font-semibold border border-transparent hover:border-gray-200 transition-all`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${indicator.color}`} />
                  <span className="text-gray-800">{indicator.text}</span>
                </div>
              );
            })}
          </div>

          {/* Categories Grid - Enhanced Mobile */}
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
              Explore Names by Tradition
            </h2>
            {/* Mobile: Single column with better spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <a
                    key={category.id}
                    href={category.url}
                    className="group relative flex flex-col p-5 sm:p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-gray-100 hover:border-indigo-300 transition-all duration-300"
                  >
                    {/* Mobile: Horizontal layout, Desktop: Vertical */}
                    <div className="flex sm:flex-col items-start sm:items-center gap-4 mb-3 sm:mb-0">
                      <div className={`flex-shrink-0 bg-gradient-to-br ${category.gradient} p-3.5 sm:p-4 rounded-xl text-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      <div className="flex-1 sm:text-center text-left">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5 sm:mb-1">{category.name} Names</h3>
                        <p className="text-sm sm:text-base font-bold text-indigo-600">{category.count}</p>
                      </div>
                    </div>

                    {/* Description - visible on all screens */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed sm:text-center">{category.description}</p>

                    {/* Desktop: Hover explore button */}
                    <div className="hidden sm:flex items-center justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-sm font-bold text-indigo-600">Explore</span>
                      <ArrowRight className="w-4 h-4 text-indigo-600" />
                    </div>

                    {/* Mobile: Show arrow */}
                    <div className="sm:hidden absolute top-5 right-5">
                      <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 max-w-2xl mx-auto pt-4 sm:pt-8 px-2">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ${stat.bg} rounded-xl mb-2 sm:mb-3`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">{stat.number}</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons - Enhanced */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 max-w-lg mx-auto px-2">
            <a href="/names/islamic" className="flex-1">
              <button className="w-full px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base">
                Browse Islamic Names
              </button>
            </a>
            <a href="/blog" className="flex-1">
              <button className="w-full px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-gray-300 text-gray-900 font-bold rounded-xl hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-lg transition-all text-sm sm:text-base">
                Articles
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
