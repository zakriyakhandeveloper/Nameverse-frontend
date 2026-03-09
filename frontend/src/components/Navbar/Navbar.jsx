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

  // add scroll elevation effect
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
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${
          isElevated
            ? "bg-white/95 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and branding */}
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={closeAll}
              aria-label="NameVerse Home"
            >
              <Image
                src="/logo.png"
                alt="NameVerse Logo"
                width={44}
                height={44}
                className="rounded-full"
                priority
              />
              <span className="hidden sm:inline-block text-lg font-semibold text-gray-900">
                NameVerse
              </span>
            </Link>

            {/* Desktop navigation links */}
            <nav className="hidden lg:flex lg:space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? "text-blue-700 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    aria-current={active ? "page" : undefined}
                    onClick={closeAll}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Search + CTA on desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-full max-w-xs">
                <SearchBar placeholder="Search names..." />
              </div>
              <Link
                href="/names"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow hover:shadow-lg transition-shadow"
                onClick={closeAll}
              >
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Explore</span>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile overlay menu */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/30 z-[90]" onClick={closeAll} />
        )}
        {menuOpen && (
          <div className="lg:hidden fixed top-16 left-0 right-0 bg-white z-[100] shadow-md animate-slideDown">
            <div className="px-4 py-4">
              <SearchBar mobile placeholder="Search names..." />
            </div>
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
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
                className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md"
                onClick={closeAll}
              >
                <Star className="w-4 h-4" />
                <span>Explore Names</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* spacer to avoid content under header */}
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
          animation: slideDown 0.25s ease-out;
        }
      `}</style>
    </>
  );
}