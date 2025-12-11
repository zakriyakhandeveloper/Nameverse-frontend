"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ListOrdered,
  List,
  FileText,
  Info,
  Star,
} from "lucide-react";
import SearchBar from "./searchBar";

const navItems = [
  { icon: List, label: "Names", href: "/names" },
  { icon: ListOrdered, label: "By Letter", href: "/names/islamic/letter/a" },
  { icon: FileText, label: "Blog", href: "/blog" },
  { icon: Info, label: "About", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isElevated, setIsElevated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsElevated(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeAll = () => setMenuOpen(false);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isElevated
            ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-blue-100"
            : "bg-white border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={closeAll}
              aria-label="NameVerse Home"
            >
              <div className="relative flex-shrink-0">
                <span className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-md group-hover:blur-lg transition-all" />
                <div className="relative w-11 h-11 rounded-full border border-blue-200 bg-white shadow-sm overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="NameVerse Logo"
                    fill
                    sizes="44px"
                    className="object-cover rounded-full"
                    priority
                  />
                </div>
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-xl font-semibold text-gray-900">
                  NameVerse
                </span>
                <span className="text-xs text-gray-500">
                  Baby Names & Meanings
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1 rounded-full bg-gray-50 border border-gray-100 px-2 py-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      active
                        ? "bg-white shadow text-blue-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    aria-current={active ? "page" : undefined}
                    onClick={closeAll}
                    prefetch
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="hidden xl:block min-w-[240px]">
                <SearchBar placeholder="Search names..." />
              </div>
              <Link
                href="/names"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
                onClick={closeAll}
              >
                <Star className="w-4 h-4" />
                Explore Names
              </Link>
            </div>

            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                aria-label="Menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="lg:hidden border-t border-gray-200 pb-6 animate-slideDown">
              <div className="px-2 py-4">
                <SearchBar mobile placeholder="Search names..." />
              </div>
              <nav className="space-y-2 px-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium ${
                        active
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={closeAll}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <Link
                  href="/names"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md"
                  onClick={closeAll}
                >
                  <Star className="w-4 h-4" />
                  Explore Names
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[90] lg:hidden"
          onClick={closeAll}
        />
      )}

      <div className="h-16" />

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
}