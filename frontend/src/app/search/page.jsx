import GlobalSearchClient from './GlobalSearchClient';

export const metadata = {
  title: 'Search - Find Names, Stories & Articles | NameVerse',
  description: 'Search across our entire collection of baby names, inspiring stories, and informative articles. Find exactly what you are looking for.',
  keywords: ['search', 'find names', 'search stories', 'search articles', 'baby name search'],
};

export default function SearchPage() {
  return <GlobalSearchClient />;
}
