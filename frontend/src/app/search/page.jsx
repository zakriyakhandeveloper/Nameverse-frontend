import GlobalSearchClient from './GlobalSearchClient';

export const metadata = {
  title: 'Search - Find Names & Articles | NameVerse',
  description: 'Search across our collection of baby names and informative articles. Find exactly what you are looking for.',
  keywords: ['search', 'find names', 'search articles', 'baby name search'],
};

export default function SearchPage() {
  return <GlobalSearchClient />;
}
