import { useState, useEffect, useCallback } from 'react';
import { create } from 'zustand';

// Local storage keys
const LIKES_KEY = 'article_likes';
const BOOKMARKS_KEY = 'article_bookmarks';
const VIEWS_KEY = 'article_views';

// Zustand store for article interactions
const useArticleStore = create((set, get) => ({
  likes: {},
  bookmarks: {},
  views: {},
  
  // Load from localStorage on init
  initialize: () => {
    if (typeof window !== 'undefined') {
      try {
        const likes = JSON.parse(localStorage.getItem(LIKES_KEY) || '{}');
        const bookmarks = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '{}');
        const views = JSON.parse(localStorage.getItem(VIEWS_KEY) || '{}');
        
        set({ likes, bookmarks, views });
      } catch (error) {
        console.error('Error loading article interactions:', error);
      }
    }
  },
  
  // Like/unlike an article
  toggleLike: (articleId) => {
    const { likes } = get();
    const newLikes = { ...likes };
    
    if (newLikes[articleId]) {
      delete newLikes[articleId];
    } else {
      newLikes[articleId] = {
        timestamp: Date.now(),
        articleId
      };
    }
    
    set({ likes: newLikes });
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(LIKES_KEY, JSON.stringify(newLikes));
    }
    
    return newLikes[articleId] ? true : false;
  },
  
  // Bookmark/unbookmark an article
  toggleBookmark: (articleId) => {
    const { bookmarks } = get();
    const newBookmarks = { ...bookmarks };
    
    if (newBookmarks[articleId]) {
      delete newBookmarks[articleId];
    } else {
      newBookmarks[articleId] = {
        timestamp: Date.now(),
        articleId
      };
    }
    
    set({ bookmarks: newBookmarks });
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
    }
    
    return newBookmarks[articleId] ? true : false;
  },
  
  // Track article view
  trackView: (articleId) => {
    const { views } = get();
    const newViews = { ...views };
    
    if (!newViews[articleId]) {
      newViews[articleId] = {
        timestamp: Date.now(),
        count: 1
      };
    } else {
      newViews[articleId] = {
        ...newViews[articleId],
        count: newViews[articleId].count + 1,
        timestamp: Date.now()
      };
    }
    
    set({ views: newViews });
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(VIEWS_KEY, JSON.stringify(newViews));
    }
  },
  
  // Get interaction status
  isLiked: (articleId) => {
    const { likes } = get();
    return !!likes[articleId];
  },
  
  isBookmarked: (articleId) => {
    const { bookmarks } = get();
    return !!bookmarks[articleId];
  },
  
  getViewCount: (articleId) => {
    const { views } = get();
    return views[articleId]?.count || 0;
  },
  
  // Get all bookmarked articles
  getBookmarkedArticles: () => {
    const { bookmarks } = get();
    return Object.keys(bookmarks).map(articleId => ({
      articleId,
      timestamp: bookmarks[articleId].timestamp
    })).sort((a, b) => b.timestamp - a.timestamp);
  },
  
  // Get all liked articles
  getLikedArticles: () => {
    const { likes } = get();
    return Object.keys(likes).map(articleId => ({
      articleId,
      timestamp: likes[articleId].timestamp
    })).sort((a, b) => b.timestamp - a.timestamp);
  }
}));

// Main hook for article interactions
export function useArticleInteractions(articleId) {
  const {
    likes,
    bookmarks,
    views,
    initialize,
    toggleLike,
    toggleBookmark,
    trackView,
    isLiked,
    isBookmarked,
    getViewCount
  } = useArticleStore();

  // Initialize on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Track view when article is accessed
  useEffect(() => {
    if (articleId) {
      trackView(articleId);
    }
  }, [articleId, trackView]);

  const handleLike = useCallback(() => {
    if (!articleId) return false;
    return toggleLike(articleId);
  }, [articleId, toggleLike]);

  const handleBookmark = useCallback(() => {
    if (!articleId) return false;
    return toggleBookmark(articleId);
  }, [articleId, toggleBookmark]);

  const handleShare = useCallback(async (platform = 'generic') => {
    if (!articleId) return false;

    const url = `${window.location.origin}/blog/${articleId}`;
    const title = document.title;
    
    try {
      switch (platform) {
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            '_blank',
            'width=550,height=420'
          );
          break;
          
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            '_blank',
            'width=580,height=400'
          );
          break;
          
        case 'linkedin':
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            '_blank',
            'width=750,height=600'
          );
          break;
          
        case 'whatsapp':
          window.open(
            `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
            '_blank'
          );
          break;
          
        case 'copy':
          await navigator.clipboard.writeText(url);
          return true;
          
        default:
          // Use Web Share API if available
          if (navigator.share) {
            await navigator.share({
              title,
              url,
              text: title
            });
          } else {
            await navigator.clipboard.writeText(url);
            return true;
          }
      }
      return true;
    } catch (error) {
      console.error('Error sharing article:', error);
      return false;
    }
  }, [articleId]);

  return {
    // State
    isLiked: isLiked(articleId),
    isBookmarked: isBookmarked(articleId),
    viewCount: getViewCount(articleId),
    
    // Actions
    handleLike,
    handleBookmark,
    handleShare,
    
    // Store access for advanced usage
    store: useArticleStore()
  };
}

// Hook for getting user's saved articles
export function useSavedArticles() {
  const { getBookmarkedArticles, getLikedArticles } = useArticleStore();
  
  return {
    bookmarkedArticles: getBookmarkedArticles(),
    likedArticles: getLikedArticles()
  };
}

// Hook for article statistics (combined local + article data)
export function useArticleStats(article, userInteractions) {
  if (!article) return null;

  const baseStats = article.stats || {
    views: 0,
    likes: 0,
    shares: 0,
    comments: 0
  };

  // Add user's local view count
  const totalViews = baseStats.views + (userInteractions?.viewCount || 0);
  
  // In a real app, you'd sync likes with backend
  const totalLikes = baseStats.likes + (userInteractions?.isLiked ? 1 : 0);

  return {
    ...baseStats,
    views: totalViews,
    likes: totalLikes
  };
}

export default useArticleInteractions;
