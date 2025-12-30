'use client';

import TechLayout from '@/components/tech-layout';
import Link from 'next/link';

export default function ArtificialIntelligenceLandingPage() {
  const modules = [
    {
      id: 'llms',
      title: 'Large Language Models (LLMs)',
      description: 'Learn about Large Language Models, their architecture, training, and applications',
      icon: '🤖',
      href: '/tutorials/artificial-intelligence/llms',
      topics: ['LLM Fundamentals', 'Architecture', 'Training', 'Applications', 'Fine-tuning']
    },
    {
      id: 'generative-ai',
      title: 'Generative AI',
      description: 'Master Generative AI models including GANs, VAEs, Diffusion Models, and their applications',
      icon: '✨',
      href: '/tutorials/artificial-intelligence/generative-ai',
      topics: ['GANs & VAEs', 'Diffusion Models', 'Multimodal AI', 'Prompt Engineering', 'Ethics & Safety']
    }
  ];

  return (
    <TechLayout
      technology="artificial-intelligence"
      onThisPage={[]}
      activeSection=""
      setActiveSection={() => { }}
      activeSubsection={null}
      setActiveSubsection={() => { }}
      hideSidebar={true}
    >
      <div className="min-h-screen">
        {/* Header */}
        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-white mb-4">
            Artificial Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Course</span>
          </h1>
          <p className="text-gray-400 text-xl">Master AI concepts, machine learning, and advanced AI technologies</p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={module.href}
              className="group relative bg-[#1a1a1a] rounded-xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 h-full flex flex-col"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl flex-shrink-0">{module.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {module.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 min-h-[40px]">
                    {module.description}
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Topics Covered</h3>
                <ul className="space-y-2">
                  {module.topics.map((topic, index) => (
                    <li key={index} className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                <span className="text-sm font-semibold mr-2">Start Learning</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Course Overview */}
        <div className="bg-[#1a1a1a] rounded-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Course Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>Large Language Models (LLMs) fundamentals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>Generative AI models (GANs, VAEs, Diffusion)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>LLM architecture and training methods</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>Fine-tuning and optimization techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>Practical applications and use cases</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>Best practices and deployment strategies</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Prerequisites</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Basic understanding of machine learning concepts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Familiarity with Python programming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Basic knowledge of neural networks (helpful but not required)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </TechLayout>
  );
}

