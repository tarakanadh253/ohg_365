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
    .filter(page => page.category === 'practice')
    .map(page => ({
      slug: page.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const pageData = menuPagesData.pages.find(
    page => page.category === 'practice' && page.slug === params.slug
  );

  if (!pageData) {
    return {
      title: 'Practice Zone | OHG365',
      description: 'Practice coding with quizzes, challenges, and interactive exercises.',
    };
  }

  return {
    title: pageData.metaTitle,
    description: pageData.metaDesc,
  };
}

export default function PracticePage({ params }: PageProps) {
  const pageData = menuPagesData.pages.find(
    page => page.category === 'practice' && page.slug === params.slug
  );

  if (!pageData) {
    return (
      <main className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-gray-400">The practice page you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  return <MenuPageTemplate pageData={pageData} />;
}

