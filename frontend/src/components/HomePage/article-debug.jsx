"use client";
import React, { useEffect, useState } from "react";
import { getLatestArticles } from "@/lib/api/articles";

export default function ArticleDebug() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Loading latest articles...");
      
      const latest = await getLatestArticles(8);
      console.log("Loaded articles:", latest);
      
      setArticles(latest || []);
    } catch (error) {
      console.error("Error loading articles:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Article Debug - Latest 8 Articles</h2>
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="text-lg">Loading articles...</div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {!isLoading && !error && (
        <div>
          <div className="mb-4">
            <strong>Found {articles.length} articles</strong>
          </div>
          
          {articles.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {articles.map((article, index) => (
                <div key={article.id} className="border p-4 rounded-lg">
                  <h3 className="font-bold mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{article.subtitle}</p>
                  <p className="text-xs text-gray-500">Category: {article.category}</p>
                  <p className="text-xs text-gray-500">Read time: {article.readTimeMinutes} min</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No articles found
            </div>
          )}
        </div>
      )}
      
      <button 
        onClick={loadArticles}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reload Articles
      </button>
    </div>
  );
}
