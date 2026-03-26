"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  getLatestArticles,
  getAllCategories,
  getArticlesByCategory,
  searchArticles,
} from "@/lib/api/articles";

import ArticleGrid from "./articlegrid";

export default function ArticleExplorer({
  embedded = false,
  initialArticles = [],
  initialCategories = [],
}) {
  const hasServerArticles =
    Array.isArray(initialArticles) && initialArticles.length > 0;
  const hasServerCategories =
    Array.isArray(initialCategories) && initialCategories.length > 0;

  const [articles, setArticles] = useState(() =>
    hasServerArticles ? initialArticles : []
  );
  const [categories, setCategories] = useState(() =>
    hasServerCategories ? [...new Set(initialCategories)] : []
  );
  const [selected, setSelected] = useState("All Categories");
  const [isLoading, setIsLoading] = useState(!hasServerArticles);

  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [latest, allCats] = await Promise.all([
        getLatestArticles(8),
        getAllCategories(),
      ]);
      setArticles(latest);
      setCategories([...new Set(allCats)]);
      setSelected("All Categories");
    } catch (error) {
      console.error("Error loading initial data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasServerArticles) {
      loadInitialData();
      return;
    }
    setIsLoading(false);
    if (!hasServerCategories) {
      getAllCategories()
        .then((allCats) => setCategories([...new Set(allCats)]))
        .catch(() => {});
    }
  }, [hasServerArticles, hasServerCategories, loadInitialData]);

  const handleCategory = async (cat) => {
    try {
      setSelected(cat);
      setIsLoading(true);
      if (cat === "All Categories") {
        const latest = await getLatestArticles(8);
        setArticles(latest);
      } else {
        const data = await getArticlesByCategory(cat, 8);
        setArticles(data);
      }
    } catch (error) {
      console.error("Error loading category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setIsLoading(true);
      if (!query || query.trim() === "") {
        const latest = await getLatestArticles(8);
        setArticles(latest);
        setSelected("All Categories");
      } else {
        const res = await searchArticles(query);
        setArticles(res);
        setSelected(`Search: "${query}"`);
      }
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (embedded) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-gray-900">
        <header className="mb-8 md:mb-10 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 mb-2">
            Guides &amp; stories
          </p>
          <h2
            id="latest-articles-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
          >
            Latest baby naming articles
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto md:mx-0 text-sm sm:text-base">
            Expert guides on Islamic, Hindu, and Christian names—meanings, traditions, and trends.
          </p>
        </header>
        <ArticleGrid
          articles={articles}
          isLoading={isLoading}
          showHeading={false}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <ArticleGrid articles={articles} isLoading={isLoading} showHeading />
      </div>
    </main>
  );
}
