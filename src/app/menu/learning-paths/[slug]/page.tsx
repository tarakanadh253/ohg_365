import { Metadata } from 'next';
import MenuPageTemplate from '@/components/menu-page-template';
import menuPagesData from '@/data/menu-pages.json';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return menuPagesData.pages
    .filter(page => page.category === 'learning-paths')
    .map(page => ({
      slug: page.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const pageData = menuPagesData.pages.find(
    page => page.category === 'learning-paths' && page.slug === params.slug
  );

  if (!pageData) {
    return {
      title: 'Learning Path | OHG365',
      description: 'Learn programming with structured learning paths.',
    };
  }

  return {
    title: pageData.metaTitle,
    description: pageData.metaDesc,
  };
}

export default function LearningPathPage({ params }: PageProps) {
  const pageData = menuPagesData.pages.find(
    page => page.category === 'learning-paths' && page.slug === params.slug
  );

  if (!pageData) {
    return (
      <main className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-gray-400">The learning path you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  return <MenuPageTemplate pageData={pageData} />;
}

