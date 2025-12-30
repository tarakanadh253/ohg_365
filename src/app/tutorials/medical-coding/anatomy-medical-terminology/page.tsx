'use client';

import TechLayout from '@/components/tech-layout';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import courseSections from '@/data/medical-coding-course.json';

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
          className="overflow-hidden rounded-2xl border border-gray-600 bg-[var(--bg-secondary)] shadow-lg shadow-sky-500/10 transition hover:shadow-sky-500/25"
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

// For medical coding we currently have a single big section in JSON.
// We'll dynamically slice that content into logical sub-sections that
// become sidebar items, similar to the Azure Data Engineer course.
const mainGroup = courseContent[0];
const mainSection = mainGroup.sections[0];
const mainContent = mainSection.content;

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

// Build flat list of logical subsections for navigation based on key headings
type SubsectionInfo = {
  id: string;
  title: string;
  startIndex: number;
  endIndex: number;
};

const findContentIndex = (keyword: string): number => {
  const upperKeyword = keyword.toUpperCase();
  return mainContent.findIndex(item => {
    if (item.type === 'paragraph' || item.type === 'heading') {
      const text = item.text || '';
      return text.toUpperCase().includes(upperKeyword);
    }
    return false;
  });
};

// Define our logical side headings and where they start in the content
const RAW_SECTIONS = [
  {
    id: 'medical-coding',
    title: 'Medical Coding',
    keyword: 'MEDICAL CODING'
  },
  {
    id: 'rcm-cycle',
    title: 'RCM Cycle (Revenue Cycle Management)',
    keyword: 'RCM CYCLE'
  },
  {
    id: 'anatomy-and-medical-terminology',
    title: 'Anatomy and Medical Terminology',
    keyword: 'ANATOMY AND MEDICAL TERMINOLGY Anatomy and medical terminology are most important'
  },
  {
    id: 'medical-terminology',
    title: 'Medical Terminology',
    // Use a more specific phrase so it doesn't match earlier sentences
    // like "Anatomy and medical terminology are most important..."
    keyword: 'MEDICAL TERMINOLOGY Medical term contains 4 parts'
  }
];

const buildSubsections = (): SubsectionInfo[] => {
  // Find start indexes for each logical section
  const withIndexes = RAW_SECTIONS.map(section => {
    const idx = findContentIndex(section.keyword);
    return idx === -1
      ? null
      : {
        id: section.id,
        title: section.title,
        startIndex: idx
      };
  }).filter((s): s is { id: string; title: string; startIndex: number } => s !== null);

  // Sort by where they appear in the content
  withIndexes.sort((a, b) => a.startIndex - b.startIndex);

  // Find where career content starts and ends
  const careerStartIndex = findContentIndex('CARRER IN MEDICAL CODING');
  const anatomyStartIndex = findContentIndex('ANATOMY AND MEDICAL TERMINOLGY Anatomy and medical terminology are most important');

  // Compute endIndex as the start of the next section (or end of content)
  return withIndexes.map((section, index) => {
    const next = withIndexes[index + 1];
    let endIndex = next ? next.startIndex : mainContent.length;

    // Special case: Medical Coding section should include career content
    // It should extend from "MEDICAL CODING" to "RCM CYCLE", then skip to include career content up to "ANATOMY"
    if (section.id === 'medical-coding') {
      const rcmCycleSection = withIndexes.find(s => s.id === 'rcm-cycle');
      if (rcmCycleSection && careerStartIndex !== -1 && anatomyStartIndex !== -1) {
        // Medical Coding section: from start to RCM CYCLE, then append career content
        // We'll handle this in getCurrentContent by merging the slices
        endIndex = rcmCycleSection.startIndex;
      } else if (anatomyStartIndex !== -1) {
        // If no RCM section, extend to Anatomy
        endIndex = anatomyStartIndex;
      }
    }

    // Special case: RCM Cycle section should end before career content
    if (section.id === 'rcm-cycle' && careerStartIndex !== -1) {
      endIndex = careerStartIndex;
    }

    // Special case: Anatomy section must start AFTER career content ends
    // Ensure it doesn't include any career content
    if (section.id === 'anatomy-and-medical-terminology' && careerStartIndex !== -1 && anatomyStartIndex !== -1) {
      // Make sure startIndex is at least at the anatomy text, not before
      const actualStartIndex = Math.max(section.startIndex, anatomyStartIndex);
      return {
        id: section.id,
        title: section.title,
        startIndex: actualStartIndex,
        endIndex
      };
    }

    return {
      id: section.id,
      title: section.title,
      startIndex: section.startIndex,
      endIndex
    };
  });
};

const ALL_SUBSECTIONS: SubsectionInfo[] = buildSubsections();
const SUBSECTION_MAP: Record<string, SubsectionInfo> = {};

ALL_SUBSECTIONS.forEach(section => {
  SUBSECTION_MAP[section.id] = section;
});

// Main sections for sidebar
const PAGE_HEADINGS = ALL_SUBSECTIONS.map(section => ({
  id: section.id,
  title: section.title
}));

// Create navigation items with subsections as children
const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string; children?: Array<{ id: string; title: string; href: string }> }> => {
  const basePath = '/tutorials/medical-coding/anatomy-medical-terminology';

  const icons: Record<string, string> = {
    'anatomy-medical-terminology': '🏥'
  };

  const children = ALL_SUBSECTIONS.map(section => ({
    id: section.id,
    title: section.title,
    href: `${basePath}#${section.id}`
  }));

  const firstChildId = children[0]?.id ?? 'medical-coding';

  return [
    {
      id: 'anatomy-medical-terminology',
      title: 'Anatomy and Medical Terminology - Part 1',
      href: `${basePath}#${firstChildId}`,
      icon: icons['anatomy-medical-terminology'] || '📘',
      children
    }
  ];
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
        alt: item.alt || 'Medical Coding image',
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
          <p key={`paragraph-${index}`} className="mb-3 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-bold text-sky-400">{beforeColon}:</span>
            {afterColon}
          </p>
        );
      } else {
        nodes.push(
          <p key={`paragraph-${index}`} className="mb-3 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
            <h3 className="text-xl sm:text-2xl font-bold text-sky-400">{text}</h3>
          </div>
        );
      } else if (level === 2) {
        if (hasColonLabel) {
          // Has colon label - highlight only the part before colon
          const beforeColon = text.substring(0, colonIndex);
          const afterColon = text.substring(colonIndex + 1);
          nodes.push(
            <h4 key={`heading-${index}`} className="text-lg sm:text-xl font-semibold mt-6 mb-3" style={{ color: 'var(--text-primary)' }}>
              <span className="text-sky-400">{beforeColon}:</span>
              {afterColon}
            </h4>
          );
        } else {
          // Regular heading - green color
          nodes.push(
            <h4 key={`heading-${index}`} className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-sky-400">
              {text}
            </h4>
          );
        }
      } else {
        // Level 3+ headings - emerald color for sub-headings
        if (hasColonLabel) {
          const beforeColon = text.substring(0, colonIndex);
          const afterColon = text.substring(colonIndex + 1);
          nodes.push(
            <h5 key={`heading-${index}`} className="text-base sm:text-lg font-semibold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>
              <span className="text-sky-400">{beforeColon}:</span>
              {afterColon}
            </h5>
          );
        } else {
          nodes.push(
            <h5 key={`heading-${index}`} className="text-base sm:text-lg font-semibold text-sky-400 mt-4 mb-2">
              {text}
            </h5>
          );
        }
      }
      return;
    }

    if (item.type === 'list') {
      nodes.push(
        <ul key={`list-${index}`} className="list-disc list-inside space-y-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
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
                <tr className="bg-gray-100 dark:bg-gray-700">
                  {headers.map((cell, cellIndex) => (
                    <th
                      key={`header-${cellIndex}`}
                      className="border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2 text-left font-semibold text-black dark:text-white whitespace-pre-wrap break-words"
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
                    className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`cell-${rowIndex}-${cellIndex}`}
                        className="border border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 text-gray-900 dark:text-gray-300 whitespace-pre-wrap break-words"
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

export default function AnatomyMedicalTerminologyPage() {
  // activeSection now holds the subsection ID
  const [activeSection, setActiveSection] = useState(ALL_SUBSECTIONS[0]?.id || 'anatomy-medical-terminology');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const shouldScrollRef = useRef(false);

  // Get current subsection info
  const currentIndex = ALL_SUBSECTIONS.findIndex(s => s.id === activeSection);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < ALL_SUBSECTIONS.length - 1;

  // Get the content for the current subsection
  const getCurrentContent = (): { group: CourseGroup; section: CourseSection } | null => {
    const subsection = SUBSECTION_MAP[activeSection] || ALL_SUBSECTIONS[0];
    if (!subsection) return null;

    let content: CourseContentItem[] = [];

    // Special handling: Medical Coding section should include career content
    if (subsection.id === 'medical-coding') {
      const rcmCycleSection = ALL_SUBSECTIONS.find(s => s.id === 'rcm-cycle');
      const careerStartIndex = findContentIndex('CARRER IN MEDICAL CODING');
      const anatomyStartIndex = findContentIndex('ANATOMY AND MEDICAL TERMINOLGY Anatomy and medical terminology are most important');

      if (rcmCycleSection && careerStartIndex !== -1 && anatomyStartIndex !== -1) {
        // Medical Coding: content from start to RCM CYCLE, then append career content
        const mainPart = mainContent.slice(subsection.startIndex, rcmCycleSection.startIndex);
        const careerPart = mainContent.slice(careerStartIndex, anatomyStartIndex);
        content = [...mainPart, ...careerPart];
      } else {
        // Fallback to normal slice
        content = mainContent.slice(subsection.startIndex, subsection.endIndex);
      }
    } else {
      // Normal slice for other sections
      content = mainContent.slice(subsection.startIndex, subsection.endIndex);
    }

    const section: CourseSection = {
      title: subsection.title,
      content
    };

    return {
      group: mainGroup,
      section
    };
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
      // It's a known heading ID; treat it as subsection ID
      setActiveSection(sectionId);
      setActiveSubsection(null);
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setActiveSection(ALL_SUBSECTIONS[0]?.id || 'anatomy-medical-terminology');
        setActiveSubsection(null);
        return;
      }

      // Check if hash is a subsection ID
      if (SUBSECTION_MAP[hash]) {
        setActiveSection(hash);
        setActiveSubsection(null);
      } else if (PAGE_HEADINGS.some(h => h.id === hash)) {
        // It's a known heading ID; treat it as subsection ID
        setActiveSection(hash);
        setActiveSubsection(null);
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
      technology="medical-coding"
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

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Anatomy and Medical Terminology
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Part 1</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Learn the fundamentals of anatomy and medical terminology essential for medical coding
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
              <span className="text-sky-400">{currentContent.section.title}</span>
            </div>

            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 pb-4 border-b border-gray-700">
              {currentContent.section.title}
            </h2>

            {/* Section Content */}
            <div style={{ color: 'var(--text-secondary)' }}>
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
              <div className="text-xs text-white">Previous</div>
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
              <div className="text-xs text-white">Next</div>
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
