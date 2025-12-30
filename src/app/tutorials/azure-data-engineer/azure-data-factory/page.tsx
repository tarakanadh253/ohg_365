'use client';

import TechLayout from '@/components/tech-layout';

const PAGE_HEADINGS = [
  { id: 'coming-soon', title: 'Coming Soon' }
];

// Helper function to create module-specific navigation items
const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string }> => {
  const basePath = '/tutorials/azure-data-engineer/azure-data-factory';
  return [
    {
      id: 'coming-soon',
      title: 'Coming Soon',
      href: `${basePath}#coming-soon`,
      icon: '🏭'
    }
  ];
};

export default function AzureDataFactoryPage() {
  return (
    <TechLayout
      technology="azure-data-engineer"
      onThisPage={PAGE_HEADINGS}
      activeSection="coming-soon"
      setActiveSection={() => { }}
      activeSubsection={null}
      setActiveSubsection={() => { }}
      customNavigationItems={createModuleNavigationItems()}
    >
      <div className="min-h-screen">
        {/* Header */}
        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-white mb-4">
            Azure Data Factory <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Module</span>
          </h1>
          <p className="text-gray-400 text-xl">Build and orchestrate data pipelines with Azure Data Factory</p>
        </div>

        {/* Coming Soon Section */}
        <section
          id="coming-soon"
          className="bg-[#1a1a1a] rounded-xl p-12 border border-gray-700 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🏭</div>
            <h2 className="text-3xl font-bold text-white mb-4">Content Coming Soon</h2>
            <p className="text-gray-400 text-lg mb-8">
              The Azure Data Factory module is currently under development. Check back soon for comprehensive content on:
            </p>
            <ul className="text-left space-y-3 text-gray-300 max-w-md mx-auto">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span>Data pipeline orchestration</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span>Data integration patterns</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span>ETL/ELT workflows</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span>Data transformation activities</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span>Monitoring and management</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </TechLayout>
  );
}

