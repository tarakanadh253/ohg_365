'use client';

import Link from 'next/link';

export default function BeginnerProjectsPage() {
  const projectCategories = [
    {
      id: 'azure-databricks',
      title: 'Azure Databricks',
      description: 'Master Azure Databricks with hands-on projects. Learn DBFS, PySpark, Delta Lake, and data processing.',
      icon: '🔷',
      href: '/menu/projects/beginner/azure-databricks',
      projectsCount: 3,
      concepts: ['Databricks Workspace', 'DBFS', 'PySpark', 'Delta Lake', 'Data Cleaning', 'Aggregations']
    }
  ];

  return (
    <main className="min-h-screen pt-28 pb-20" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
            <span className="text-green-400 font-semibold">Beginner Projects</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Project Category</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Select a project category to start building your skills with hands-on projects, step-by-step tasks, and interview questions.
          </p>
        </div>

        {/* Project Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                {category.title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Projects Count */}
              <div className="mb-6">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">
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
              <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors">
                <span className="text-sm font-semibold mr-2">Start Learning</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-300 pointer-events-none" />
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
