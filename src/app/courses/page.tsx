'use client';

import Link from 'next/link';
import { FileText, Laptop, Landmark, Cloud, Code2, Coffee, Layout, Database, BarChart3, Terminal } from 'lucide-react';
import HeroCarousel from '@/components/hero-carousel';

interface Course {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
}

const courses: Course[] = [
  {
    title: 'Medical Coding',
    description: 'Healthcare IT & Coding Systems',
    icon: <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    href: '/tutorials/medical-coding',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Programming',
    description: 'Software Development & Technologies',
    icon: <Laptop className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
    href: '/tutorials/programming',
    gradient: 'from-rose-500 to-red-500',
  },
  {
    title: 'Government Jobs',
    description: 'SBI & Bank Exam Preparation',
    icon: <Landmark className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    href: '/tutorials/government-jobs',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'DevOps',
    description: 'AWS, Azure & GCP - Containerization, CI/CD, Infrastructure Automation',
    icon: <Cloud className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    href: '/devops',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Python Full Stack',
    description: 'Build Modern Web Applications with Django, Flask, React',
    icon: <Code2 className="w-8 h-8 text-green-600 dark:text-green-400" />,
    href: '/tutorials/python-fullstack',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Java Full Stack',
    description: 'Enterprise-Grade Development with Spring Boot, React, Microservices',
    icon: <Coffee className="w-8 h-8 text-orange-600 dark:text-orange-400" />,
    href: '/tutorials/java-fullstack',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    title: 'Web Development',
    description: 'Create Stunning Websites with React, Node.js',
    icon: <Layout className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    href: '/web-dev',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'SQL & Databases',
    description: 'SQL & NoSQL Mastery - Database Design and Management',
    icon: <Database className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
    href: '/sql',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Data Science',
    description: 'Data Analysis, Machine Learning, and AI',
    icon: <BarChart3 className="w-8 h-8 text-violet-600 dark:text-violet-400" />,
    href: '/data-science',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Linux',
    description: 'Linux Administration and Command Line Mastery',
    icon: <Terminal className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />,
    href: '/linux',
    gradient: 'from-yellow-500 to-orange-500',
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--bg-primary)] transition-colors duration-300">
      {/* Hero Carousel */}
      <section className="w-full -mt-0">
        <HeroCarousel />
      </section>

      {/* Courses Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">

          <h2
            className="text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Courses</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl">Choose your learning path and start your journey today</p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <Link
              key={course.href}
              href={course.href}
              className="group relative rounded-xl p-8 overflow-hidden border border-gray-100 dark:border-white/10 card-hover-effect hover-glow-soft shadow-lg transition-all duration-300"
              style={{
                animationDelay: `${index * 0.1}s`,
                backgroundColor: 'var(--card-bg)'
              }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative z-20">
                {/* Icon */}
                {/* Icon */}
                <div className="w-16 h-16 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-200 dark:border-white/10">
                  {course.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold mb-3 text-center transition-colors duration-300"
                  style={{ color: 'var(--text-card-title)' }}
                >
                  {course.title}
                </h3>

                {/* Description */}
                {/* Description */}
                <p
                  className="text-center leading-relaxed font-medium"
                  style={{ color: 'var(--text-card-desc)' }}
                >
                  {course.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex justify-center">
                  <svg
                    className="w-6 h-6 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

