'use client';
import Link from 'next/link';

export default function ThemesGrid() {
  const themes = [
    { label: "Prophet Names", href: "/search?q=prophet", icon: "👳" },
    { label: "Names from Hadith", href: "/search?q=hadith", icon: "📖" },
    { label: "Spiritual Names", href: "/search?q=spiritual", icon: "✨" },
    { label: "Modern Islamic", href: "/names/islamic", icon: "🌙" },
    { label: "Nature-Inspired", href: "/search?q=nature", icon: "🌿" },
    { label: "Quranic Themes", href: "/search?q=quran", icon: "📕" },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 mt-12" aria-labelledby="themes-heading">
      <header className="text-center mb-6">
        <h2 id="themes-heading" className="text-2xl font-bold text-gray-900 mb-2">
          🕌 Islamic Name Categories
        </h2>
        <p className="text-gray-600">
          Explore baby names by Islamic themes and traditions
        </p>
      </header>
      <nav aria-label="Islamic name categories">
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 list-none p-0 m-0">
          {themes.map((theme) => (
            <li key={theme.label}>
              <Link
                href={theme.href}
                className="flex items-center gap-3 text-center bg-white border-2 border-gray-200 rounded-xl shadow-sm px-4 py-4 hover:border-yellow-400 hover:bg-yellow-50 hover:shadow-md transition-all duration-200 group"
                aria-label={`Browse ${theme.label}`}
              >
                <span className="text-2xl" aria-hidden="true">{theme.icon}</span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-yellow-700">{theme.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
