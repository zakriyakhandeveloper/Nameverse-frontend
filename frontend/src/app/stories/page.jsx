import StoriesListingClient from './StoriesListingClient';

export const metadata = {
  title: 'Stories - Discover Inspiring Tales & Narratives | NameVerse',
  description: 'Explore our collection of inspiring stories, folktales, and narratives from Islamic, Christian, and Hindu traditions. Read engaging stories with moral lessons.',
  keywords: ['stories', 'folktales', 'narratives', 'Islamic stories', 'moral stories', 'inspiring tales'],
};

export default function StoriesPage() {
  return <StoriesListingClient />;
}
