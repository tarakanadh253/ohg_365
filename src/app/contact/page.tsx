import { Metadata } from 'next';
import MenuPageTemplate from '@/components/menu-page-template';
import menuPagesData from '@/data/menu-pages.json';

export const metadata: Metadata = {
  title: 'Contact Us | OHG365',
  description: 'Get in touch with OHG365. Contact our team for support, feedback, or partnership inquiries.',
};

export default function ContactPage() {
  const pageData = menuPagesData.pages.find(page => page.slug === 'contact');

  if (!pageData) {
    return (
      <main className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-400">Page content coming soon.</p>
        </div>
      </main>
    );
  }

  return <MenuPageTemplate pageData={pageData} />;
}

