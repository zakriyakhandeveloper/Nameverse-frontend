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
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-28">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-50/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="space-y-12 sm:space-y-16">

          {/* Main heading - Cleaner, less overwhelming */}
          <div className="space-y-6 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
              <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span className="text-sm font-semibold text-amber-900">
                Trusted by 5M+ Parents
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Find Your Baby's
              <span className="block text-indigo-600 mt-2">Perfect Name</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Discover 60,000+ authentic baby names from Islamic, Hindu & Christian traditions with verified meanings in multiple languages.
            </p>
          </div>

          {/* Search Bar - More prominent */}
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>

          {/* Categories Grid - Simplified */}
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <a
                    key={category.id}
                    href={category.url}
                    className="group bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className={`bg-gradient-to-br ${category.gradient} p-4 rounded-xl`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {category.name} Names
                        </h3>
                        <p className="text-sm text-indigo-600 font-semibold mb-2">
                          {category.count}
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all mt-auto" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Stats - Cleaner presentation */}
          <div className="flex justify-center items-center gap-8 sm:gap-12 flex-wrap max-w-3xl mx-auto pt-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className={`w-5 h-5 ${stat.color} mr-2`} />
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.number}</div>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
