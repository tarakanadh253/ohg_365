'use client';

import Link from 'next/link';

export default function IntermediateProjectsPage() {
  const projectCategories = [
    {
      id: 'azure-databricks',
      title: 'Azure Databricks',
      description: 'Master advanced Azure Databricks concepts. Build ETL pipelines, handle multiple data sources, optimize performance, and implement data quality checks.',
      icon: '🔷',
      href: '/menu/projects/intermediate/azure-databricks',
      projectsCount: 5,
      concepts: ['ETL Functions', 'Multi-Source Ingestion', 'Incremental Load', 'Partitioning', 'Performance Optimization', 'Data Quality']
    }
  ];

  return (
    <main className="min-h-screen pt-28 pb-20" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
            <span className="text-yellow-400 font-semibold">Intermediate Projects</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Project Category</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Select a project category to advance your skills with intermediate-level projects, complex tasks, and challenging interview questions.
          </p>
        </div>

        {/* Project Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                {category.title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Projects Count */}
              <div className="mb-6">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-500/30">
                  {category.projectsCount} Projects
                </span>
              </div>

              {/* Concepts */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Concepts Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {category.concepts.slice(0, 4).map((concept, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs border border-gray-600"
                    >
                      {concept}
                    </span>
                  ))}
                  {category.concepts.length > 4 && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs border border-gray-600">
                      +{category.concepts.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center text-yellow-400 group-hover:text-yellow-300 transition-colors">
                <span className="text-sm font-semibold mr-2">Start Learning</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/5 group-hover:to-orange-500/5 transition-all duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg">
            <p className="text-gray-400 text-sm">
              More project categories coming soon! 🚀
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
