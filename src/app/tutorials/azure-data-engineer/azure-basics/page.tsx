'use client';

import TechLayout from '@/components/tech-layout';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import courseSections from '@/data/azure-basics-course.json';

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const ImageGallery = ({ images }: { images: GalleryImage[] }) => {
  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 mt-6 sm:mt-8">
      {images.map((image, index) => (
        <figure
          key={`${image.src}-${index}`}
          className="overflow-hidden rounded-2xl border border-gray-600 bg-[var(--bg-secondary)] shadow-lg shadow-blue-500/10 transition hover:shadow-blue-500/25"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            sizes="(min-width: 1280px) 100vw, (min-width: 768px) 100vw, 100vw"
            className="h-auto w-full object-contain bg-[var(--bg-secondary)]"
          />
          {image.caption && (
            <figcaption className="border-t border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};

type CourseContentItem =
  | { type: 'paragraph'; text: string; heading_level?: number | null }
  | { type: 'heading'; text: string; heading_level?: number | null }
  | { type: 'image'; alt?: string; src: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; rows: string[][]; headers?: string[]; caption?: string };

type CourseSection = {
  title: string;
  content: CourseContentItem[];
};

type CourseGroup = {
  id: string;
  title: string;
  sections: CourseSection[];
};

const courseContent = courseSections as CourseGroup[];

// Generate subsection IDs from titles
const generateSubsectionId = (groupId: string, sectionTitle: string, index: number): string => {
  const slug = sectionTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  return `${groupId}-${slug || index}`;
};

// Build flat list of all subsections for navigation
type SubsectionInfo = {
  id: string;
  title: string;
  parentId: string;
  parentTitle: string;
  sectionIndex: number;
};

const ALL_SUBSECTIONS: SubsectionInfo[] = [];
const SUBSECTION_MAP: Record<string, SubsectionInfo> = {};

courseContent.forEach(group => {
  group.sections.forEach((section, index) => {
    const subsectionId = generateSubsectionId(group.id, section.title, index);
    const info: SubsectionInfo = {
      id: subsectionId,
      title: section.title,
      parentId: group.id,
      parentTitle: group.title,
      sectionIndex: index
    };
    ALL_SUBSECTIONS.push(info);
    SUBSECTION_MAP[subsectionId] = info;
  });
});

// Main sections for sidebar
const PAGE_HEADINGS = courseContent.map(section => ({
  id: section.id,
  title: section.title
}));

// Create navigation items with subsections as children
const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string; children?: Array<{ id: string; title: string; href: string }> }> => {
  const basePath = '/tutorials/azure-data-engineer/azure-basics';

  const icons: Record<string, string> = {
    'azure-hierarchy': '🏗️',
    'resource-group': '📦',
    'azure-blob-storage': '💾',
    'azure-data-lake': '🌊'
  };

  return courseContent.map(group => {
    const children = group.sections.map((section, index) => {
      const subsectionId = generateSubsectionId(group.id, section.title, index);
      return {
        id: subsectionId,
        title: section.title,
        href: `${basePath}#${subsectionId}`
      };
    });

    // First child as default for parent link
    const firstChildId = children.length > 0 ? children[0].id : group.id;

    return {
      id: group.id,
      title: group.title,
      href: `${basePath}#${firstChildId}`,
      icon: icons[group.id] || '📘',
      children
    };
  });
};

const SectionContent = ({ content }: { content: CourseSection['content'] }) => {
  const nodes: React.ReactNode[] = [];
  let pendingImages: GalleryImage[] = [];

  const flushImages = () => {
    if (pendingImages.length) {
      nodes.push(
        <ImageGallery key={`gallery-${nodes.length}`} images={pendingImages} />
      );
      pendingImages = [];
    }
  };

  content.forEach((item, index) => {
    if (item.type === 'image') {
      pendingImages.push({
        src: item.src,
        alt: item.alt || 'Azure Basics image',
        width: 1920,
        height: 1080
      });
      return;
    }

    flushImages();

    if (item.type === 'paragraph') {
      const text = item.text || '';
      // Check if paragraph contains a colon - highlight text before colon as sub-heading
      const colonIndex = text.indexOf(':');
      if (colonIndex > 0 && colonIndex < 50) {
        // Only treat as sub-heading if colon is within first 50 chars (likely a label)
        const beforeColon = text.substring(0, colonIndex);
        const afterColon = text.substring(colonIndex + 1);
        nodes.push(
          <p key={`paragraph-${index}`} className="mb-3 text-base sm:text-lg leading-relaxed text-gray-300">
            <span className="font-bold text-cyan-400">{beforeColon}:</span>
            {afterColon}
          </p>
        );
      } else {
        nodes.push(
          <p key={`paragraph-${index}`} className="mb-3 text-base sm:text-lg leading-relaxed text-gray-300">
            {text}
          </p>
        );
      }
      return;
    }

    if (item.type === 'heading') {
      const level = item.heading_level ?? 2;
      const text = item.text || '';

      // Check if heading contains colon - highlight only the part before colon
      const colonIndex = text.indexOf(':');
      const hasColonLabel = colonIndex > 0 && colonIndex < 50;

      if (level <= 1) {
        nodes.push(
          <div key={`heading-${index}`} className="p-4 sm:p-5 glass-card rounded-lg mt-6 mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-rose-400">{text}</h3>
          </div>
        );
      } else if (level === 2) {
        if (hasColonLabel) {
          // Has colon label - highlight only the part before colon
          const beforeColon = text.substring(0, colonIndex);
          const afterColon = text.substring(colonIndex + 1);
          nodes.push(
            <h4 key={`heading-${index}`} className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-gray-300">
              <span className="text-cyan-400">{beforeColon}:</span>
              {afterColon}
            </h4>
          );
        } else {
          // Regular heading - rose color
          nodes.push(
            <h4 key={`heading-${index}`} className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-rose-400">
              {text}
            </h4>
          );
        }
      } else {
        // Level 3+ headings - cyan color for sub-headings
        if (hasColonLabel) {
          const beforeColon = text.substring(0, colonIndex);
          const afterColon = text.substring(colonIndex + 1);
          nodes.push(
            <h5 key={`heading-${index}`} className="text-base sm:text-lg font-semibold mt-4 mb-2 text-gray-300">
              <span className="text-cyan-400">{beforeColon}:</span>
              {afterColon}
            </h5>
          );
        } else {
          nodes.push(
            <h5 key={`heading-${index}`} className="text-base sm:text-lg font-semibold text-cyan-400 mt-4 mb-2">
              {text}
            </h5>
          );
        }
      }
      return;
    }

    if (item.type === 'list') {
      nodes.push(
        <ul key={`list-${index}`} className="list-disc list-inside space-y-2 mb-4 text-gray-300">
          {item.items.map((listItem, listIndex) => (
            <li key={`list-item-${listIndex}`} className="text-base sm:text-lg">
              {listItem}
            </li>
          ))}
        </ul>
      );
      return;
    }

    if (item.type === 'table') {
      flushImages();
      const rows = item.rows || [];
      const headers = item.headers || (rows.length > 0 ? rows[0] : []);
      const dataRows = item.headers ? rows : rows.slice(1);

      if (headers.length > 0 || dataRows.length > 0) {
        nodes.push(
          <div key={`table-${index}`} className="my-6 overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-700">
                  {headers.map((cell, cellIndex) => (
                    <th
                      key={`header-${cellIndex}`}
                      className="border border-gray-600 px-3 sm:px-4 py-2 text-left font-semibold text-white whitespace-pre-wrap break-words"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rowIndex) => (
                  <tr
                    key={`row-${rowIndex}`}
                    className={rowIndex % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`cell-${rowIndex}-${cellIndex}`}
                        className="border border-gray-600 px-3 sm:px-4 py-2 text-gray-300 whitespace-pre-wrap break-words"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {item.caption && (
              <p className="mt-2 text-sm text-gray-400 italic text-center">{item.caption}</p>
            )}
          </div>
        );
      }
      return;
    }
  });

  flushImages();

  return <>{nodes}</>;
};

export default function AzureDataEngineerPage() {
  // activeSection now holds the subsection ID
  const [activeSection, setActiveSection] = useState(ALL_SUBSECTIONS[0]?.id || 'azure-hierarchy');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const shouldScrollRef = useRef(false);

  // Get current subsection info
  const currentSubsection = SUBSECTION_MAP[activeSection];
  const currentIndex = ALL_SUBSECTIONS.findIndex(s => s.id === activeSection);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < ALL_SUBSECTIONS.length - 1;

  // Get the content for the current subsection
  const getCurrentContent = (): { group: CourseGroup; section: CourseSection } | null => {
    if (!currentSubsection) return null;
    const group = courseContent.find(g => g.id === currentSubsection.parentId);
    if (!group) return null;
    const section = group.sections[currentSubsection.sectionIndex];
    if (!section) return null;
    return { group, section };
  };

  const goToPreviousSection = () => {
    if (hasPrevious) {
      const prevId = ALL_SUBSECTIONS[currentIndex - 1].id;
      handleSetActiveSection(prevId);
    }
  };

  const goToNextSection = () => {
    if (hasNext) {
      const nextId = ALL_SUBSECTIONS[currentIndex + 1].id;
      handleSetActiveSection(nextId);
    }
  };

  // Custom setActiveSection that handles navigation
  const handleSetActiveSection = (sectionId: string) => {
    shouldScrollRef.current = true;

    // Check if it's a subsection ID
    if (SUBSECTION_MAP[sectionId]) {
      setActiveSection(sectionId);
      setActiveSubsection(null);
      window.history.replaceState(null, '', `#${sectionId}`);
    } else if (PAGE_HEADINGS.some(h => h.id === sectionId)) {
      // It's a main section ID, navigate to its first subsection
      const firstSubsection = ALL_SUBSECTIONS.find(s => s.parentId === sectionId);
      if (firstSubsection) {
        setActiveSection(firstSubsection.id);
        setActiveSubsection(null);
        window.history.replaceState(null, '', `#${firstSubsection.id}`);
      }
    }
  };

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setActiveSection(ALL_SUBSECTIONS[0]?.id || 'azure-hierarchy');
        setActiveSubsection(null);
        return;
      }

      // Check if hash is a subsection ID
      if (SUBSECTION_MAP[hash]) {
        setActiveSection(hash);
        setActiveSubsection(null);
      } else if (PAGE_HEADINGS.some(h => h.id === hash)) {
        // It's a main section, navigate to first subsection
        const firstSubsection = ALL_SUBSECTIONS.find(s => s.parentId === hash);
        if (firstSubsection) {
          setActiveSection(firstSubsection.id);
          setActiveSubsection(null);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Scroll to top when section changes
  useEffect(() => {
    if (shouldScrollRef.current) {
      shouldScrollRef.current = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  const currentContent = getCurrentContent();

  return (
    <TechLayout
      technology="azure-data-engineer"
      onThisPage={PAGE_HEADINGS}
      activeSection={activeSection}
      setActiveSection={handleSetActiveSection}
      activeSubsection={activeSubsection}
      setActiveSubsection={setActiveSubsection}
      customNavigationItems={createModuleNavigationItems()}
      hideNavButtons={true}
    >
      <div className="min-h-screen relative px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 relative z-10">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Azure Basics <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Module</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Learn the fundamentals of Azure cloud infrastructure and services
          </p>
        </div>

        {/* Current Section Content */}
        {currentContent && (
          <section
            id={activeSection}
            className="glass-section rounded-xl p-4 sm:p-6 lg:p-8 scroll-mt-24 mb-8"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <span>{currentContent.group.title}</span>
              <span>›</span>
              <span className="text-blue-400">{currentContent.section.title}</span>
            </div>

            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 pb-4 border-b border-gray-700">
              {currentContent.section.title}
            </h2>

            {/* Section Content */}
            <div className="text-gray-300">
              <SectionContent content={currentContent.section.content} />
            </div>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-700 mb-16">
          <button
            onClick={goToPreviousSection}
            disabled={!hasPrevious}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${hasPrevious
              ? 'bg-gray-800 hover:bg-gray-700 text-white cursor-pointer'
              : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
              }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="text-left">
              <div className="text-xs text-gray-400">Previous</div>
              {hasPrevious && (
                <div className="text-sm font-medium">
                  {ALL_SUBSECTIONS[currentIndex - 1]?.title}
                </div>
              )}
            </div>
          </button>

          <div className="text-sm text-gray-400">
            {currentIndex + 1} of {ALL_SUBSECTIONS.length}
          </div>

          <button
            onClick={goToNextSection}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${hasNext
              ? 'bg-gray-800 hover:bg-gray-700 text-white cursor-pointer'
              : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
              }`}
          >
            <div className="text-right">
              <div className="text-xs text-gray-400">Next</div>
              {hasNext && (
                <div className="text-sm font-medium">
                  {ALL_SUBSECTIONS[currentIndex + 1]?.title}
                </div>
              )}
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </TechLayout>
  );
}
