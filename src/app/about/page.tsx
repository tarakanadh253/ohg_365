import { Metadata } from 'next';
import MenuPageTemplate from '@/components/menu-page-template';
import menuPagesData from '@/data/menu-pages.json';

export const metadata: Metadata = {
  title: 'About OHG365 | Learn to Code',
  description: 'Learn about OHG365 - your platform for learning programming, coding challenges, and developer resources.',
};

export default function AboutPage() {
  const pageData = menuPagesData.pages.find(page => page.slug === 'about');

  if (!pageData) {
    return (
      <main className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">About OHG365</h1>
          <p className="text-[var(--text-secondary)]">Page content coming soon.</p>
        </div>
      </main>
    );
  }

  return <MenuPageTemplate pageData={pageData} />;
}

