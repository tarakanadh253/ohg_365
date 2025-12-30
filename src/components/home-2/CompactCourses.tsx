'use client';

import Link from 'next/link';
import Image from 'next/image';
import CompactSection from './CompactSection';

const courses = [
  {
    id: '2',
    title: 'Programming',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=3870&auto=format&fit=crop',
    href: '/tutorials/programming',
  },
  {
    id: '1',
    title: 'Medical Coding',
    category: 'Healthcare',
    image: '/medical-coding-new.jpg',
    href: '/tutorials/medical-coding',
  },

  {
    id: '4',
    title: 'DevOps & Cloud',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3870&auto=format&fit=crop',
    href: '/tutorials',
  },
];

export default function CompactCourses() {
  return (
    <CompactSection
      title="Start Your Learning Journey"
      subtitle="Explore comprehensive tutorials across multiple domains"
      backgroundColor="var(--bg-secondary)"
      stagger={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={course.href}
            className="group relative rounded-xl overflow-hidden card-hover-effect hover-glow-soft bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-lg"
          >

            <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-115"
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Category badge */}

            </div>
            <div className="p-4 relative">
              <div className="text-xs mb-2 font-bold uppercase tracking-wide transition-colors text-blue-600 dark:text-blue-400">
                {course.category}
              </div>
              <h3
                className="font-bold text-base mb-2 transition-all duration-300 !text-black dark:text-white group-hover:text-[#083D77] dark:group-hover:text-blue-300"
              >
                {course.title}
              </h3>
              <div className="absolute bottom-4 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#7A94A5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
          </Link>
        ))}
      </div>
    </CompactSection>
  );
}

