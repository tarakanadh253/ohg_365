import Link from 'next/link';
import { Metadata } from 'next';

interface MenuPageProps {
  pageData: {
    slug: string;
    metaTitle: string;
    metaDesc: string;
    h1: string;
    placeholderParagraphs: string[];
    samples: Array<{ title: string; slug: string }>;
    cta: { text: string; link: string };
    lastUpdated: string;
    difficulty?: string;
  };
}

export function generateMetadata(pageData: MenuPageProps['pageData']): Metadata {
  return {
    title: pageData.metaTitle,
    description: pageData.metaDesc,
  };
}

export default function MenuPageTemplate({ pageData }: MenuPageProps) {
  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <main className="min-h-screen py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{pageData.h1}</h1>
            {pageData.difficulty && (
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${difficultyColors[pageData.difficulty as keyof typeof difficultyColors] || difficultyColors.beginner}`}>
                {pageData.difficulty.charAt(0).toUpperCase() + pageData.difficulty.slice(1)}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">Last updated: {pageData.lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          {pageData.placeholderParagraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-300 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Sample Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Content</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {pageData.samples.map((sample, index) => (
              <Link
                key={index}
                href={`#${sample.slug}`}
                className="block p-6 bg-[#252525] border border-gray-600 rounded-lg hover:border-rose-500 hover:bg-rose-500/10 transition-all duration-300 group"
              >
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-rose-400 transition-colors">
                  {sample.title}
                </h3>
                <p className="text-gray-400 text-sm">Learn more →</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-rose-500/20 to-red-500/20 border border-rose-500/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-6">
            {pageData.cta.text}
          </p>
          <Link
            href={pageData.cta.link}
            className="inline-block px-6 py-3 bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-rose-500/30"
          >
            {pageData.cta.text}
          </Link>
        </div>
      </div>
    </main>
  );
}

