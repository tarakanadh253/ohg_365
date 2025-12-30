'use client';



import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  path: string;
  description: string;
}

const searchData: SearchResult[] = [
  // Main Courses
  { title: 'All Courses', path: '/tutorials/courses', description: 'Browse all available courses and tutorials' },
  { title: 'DevOps', path: '/devops', description: 'Docker, Kubernetes, CI/CD, AWS, Azure, GCP, infrastructure automation' },
  { title: 'Java', path: '/java', description: 'Java programming, Spring Framework, enterprise applications' },
  { title: 'Java Full Stack', path: '/tutorials/java-fullstack', description: 'Spring Boot, React, microservices, full stack development' },
  { title: 'Python', path: '/python', description: 'Python programming, Django, Flask, data science' },
  { title: 'Python Full Stack', path: '/tutorials/python-fullstack', description: 'Django, Flask, React, full stack web development' },
  { title: 'SQL', path: '/sql', description: 'Database design, SQL queries, NoSQL databases' },
  { title: 'SQL & Databases', path: '/sql', description: 'SQL, NoSQL, data modeling, database management' },
  { title: 'Web Development', path: '/web-dev', description: 'HTML, CSS, JavaScript, React, Node.js' },
  { title: 'Linux', path: '/linux', description: 'Linux commands, shell scripting, system administration' },

  // Azure Data Engineering
  { title: 'Azure Data Engineer', path: '/tutorials/azure-data-engineer', description: 'Azure cloud data engineering, pipelines, analytics' },
  { title: 'Azure Basics', path: '/tutorials/azure-data-engineer/azure-basics', description: 'Azure fundamentals, resource hierarchy, storage services' },
  { title: 'Azure Hierarchy', path: '/tutorials/azure-data-engineer/azure-basics#azure-hierarchy', description: 'Management groups, subscriptions, resource groups' },
  { title: 'Resource Group', path: '/tutorials/azure-data-engineer/azure-basics#resource-group', description: 'Azure resource groups, organization, management' },
  { title: 'Azure Blob Storage', path: '/tutorials/azure-data-engineer/azure-basics#azure-blob-storage', description: 'Blob storage, containers, access tiers' },
  { title: 'Azure Data Lake Storage', path: '/tutorials/azure-data-engineer/azure-basics#azure-data-lake', description: 'ADLS Gen2, hierarchical namespace, big data storage' },
  { title: 'Azure Databricks', path: '/tutorials/azure-data-engineer/azure-databricks', description: 'Apache Spark, data engineering, machine learning, notebooks' },
  { title: 'Databricks SQL', path: '/tutorials/azure-data-engineer/azure-databricks#databricks-sql', description: 'SQL editor, queries, dashboards, data warehouse' },
  { title: 'Databricks Data Engineering', path: '/tutorials/azure-data-engineer/azure-databricks#data-engineering', description: 'Jobs, data ingestion, ETL pipelines' },
  { title: 'Azure Data Factory', path: '/tutorials/azure-data-engineer/azure-data-factory', description: 'Data pipelines, ETL, data integration' },

  // AI & Data Science
  { title: 'Artificial Intelligence', path: '/tutorials/artificial-intelligence', description: 'AI, machine learning, neural networks, deep learning' },
  { title: 'AI', path: '/tutorials/artificial-intelligence', description: 'Artificial intelligence, NLP, computer vision' },
  { title: 'Generative AI', path: '/tutorials/artificial-intelligence/generative-ai', description: 'GenAI, LLMs, ChatGPT, prompt engineering' },
  { title: 'Large Language Models', path: '/tutorials/artificial-intelligence/llms', description: 'LLMs, transformers, GPT, BERT, language models' },
  { title: 'LLMs', path: '/tutorials/artificial-intelligence/llms', description: 'Large language models, NLP, text generation' },
  { title: 'Data Science', path: '/tutorials/data-science-ai', description: 'Machine learning, data analysis, visualization, statistics' },
  { title: 'Data Engineering', path: '/tutorials/data-engineering', description: 'Data pipelines, ETL, data warehousing, big data' },
  { title: 'Machine Learning', path: '/tutorials/data-science-ai', description: 'ML algorithms, model training, deep learning' },

  // Other Courses
  { title: 'SAP', path: '/tutorials/sap', description: 'SAP modules, ERP, enterprise solutions' },
  { title: 'Microsoft Fabric', path: '/tutorials/microsoft-fabric', description: 'Data integration, analytics, Power BI, Synapse' },
  { title: 'Medical Coding', path: '/tutorials/medical-coding', description: 'ICD-10, CPT codes, healthcare documentation, billing' },
  { title: 'Government Jobs', path: '/tutorials/government-jobs', description: 'Government job preparation, exams, notifications' },
  { title: 'Programming', path: '/tutorials/programming', description: 'Programming languages, coding tutorials' },

  // DevOps Topics
  { title: 'Docker', path: '/devops#docker-basics', description: 'Container management, Dockerfile, Docker Compose' },
  { title: 'Kubernetes', path: '/devops#kubernetes-basics', description: 'Container orchestration, pods, deployments, services' },
  { title: 'Jenkins', path: '/devops#jenkins-basics', description: 'CI/CD pipelines, automation, build jobs' },
  { title: 'CI/CD', path: '/devops#cicd', description: 'Continuous integration, continuous deployment, pipelines' },
  { title: 'Terraform', path: '/devops#ansible-basics', description: 'Infrastructure as code, provisioning, automation' },
  { title: 'Ansible', path: '/devops#ansible-basics', description: 'Configuration management, playbooks, automation' },
  { title: 'Git', path: '/devops#git-fundamentals', description: 'Version control, branching, merging, GitHub' },
  { title: 'GitHub', path: '/devops#github-gitlab', description: 'Git hosting, pull requests, actions, collaboration' },
  { title: 'AWS', path: '/devops#cloud-platforms', description: 'Amazon Web Services, EC2, S3, Lambda' },
  { title: 'Azure', path: '/tutorials/azure-data-engineer', description: 'Microsoft Azure cloud services' },
  { title: 'GCP', path: '/devops#cloud-platforms', description: 'Google Cloud Platform, compute, storage' },
  { title: 'Prometheus', path: '/devops#prometheus-basics', description: 'Monitoring, metrics, alerting' },
  { title: 'Grafana', path: '/devops#grafana-dashboards', description: 'Dashboards, visualization, monitoring' },

  // Tools & Utilities
  { title: 'Code Terminal', path: '/code-terminal', description: 'Online code execution environment' },
  { title: 'Terminal', path: '/terminal', description: 'Interactive terminal practice' },

  // Challenges
  { title: 'Challenges', path: '/challenges', description: 'Daily coding challenges, quizzes, and badges' },
  { title: 'Coding Challenges', path: '/challenges', description: 'Programming challenges with MCQs and coding problems' },
  { title: 'Daily Quiz', path: '/challenges', description: 'Daily programming quizzes with levels and badges' },
  { title: 'Python Challenges', path: '/challenges/python', description: 'Python programming challenges and quizzes' },
  { title: 'Java Challenges', path: '/challenges/java', description: 'Java programming challenges and quizzes' },
  { title: 'JavaScript Challenges', path: '/challenges/javascript', description: 'JavaScript programming challenges and quizzes' },
  { title: 'SQL Challenges', path: '/challenges/sql', description: 'SQL database challenges and quizzes' },

  // General
  { title: 'Home', path: '/', description: 'OneHubGlobal homepage' },
  { title: 'Tutorials', path: '/tutorials', description: 'All tutorials and learning resources' },
  { title: 'Apply Jobs', path: '/apply-jobs', description: 'Job applications, career opportunities' },
];

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setSelectedIndex(-1);

    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8);

    setResults(filtered);
  };

  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isExpanded && containerRef.current) {
      const updatePosition = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setCoords({
            top: rect.bottom + 24,
            left: rect.left,
            width: rect.width
          });
        }
      };
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isExpanded]);

  const handleResultClick = (path: string) => {
    router.push(path);
    setIsExpanded(false);
    setQuery('');
    setResults([]);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCollapse = () => {
    if (query === '') {
      setIsExpanded(false);
      setResults([]);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      setQuery('');
      setResults([]);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      handleResultClick(results[selectedIndex].path);
    }
  };

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setQuery('');
        setResults([]);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Handle Cmd/Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        handleExpand();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ zIndex: 110 }}>
      {/* Search Input Container */}
      <div
        className={`flex items-center transition-all duration-300 rounded-full ${isExpanded
          ? 'w-48 md:w-56 bg-gray-100 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-lg'
          : 'w-10 h-10 hover:bg-gray-100 dark:hover:bg-white/10'
          }`}
      >
        {/* Search Icon / Button */}
        <button
          onClick={handleExpand}
          className={`flex items-center justify-center transition-all duration-300 ${isExpanded ? 'pl-4 pr-2' : 'w-10 h-10'
            }`}
        >
          <svg
            className="w-5 h-5 transition-colors duration-300 nav-link-strict"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Input Field */}
        {isExpanded && (
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onBlur={handleCollapse}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="search-input flex-1 bg-transparent text-sm outline-none border-none ring-0 focus:ring-0 focus:outline-none placeholder-gray-600 text-black py-2 pr-2"
          />
        )}

        {/* Clear Button */}
        {isExpanded && query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="px-2 mr-1 text-gray-500 hover:text-black dark:hover:text-white transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isExpanded && results.length > 0 && mounted && createPortal(
        <div
          className="fixed bg-white dark:bg-[#083d77]/95 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-xl overflow-hidden z-[100000]"
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            width: `${coords.width}px`
          }}
        >
          <div className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {results.map((result, index) => (
              <button
                key={`${result.path}-${index}`}
                onClick={() => handleResultClick(result.path)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 ${selectedIndex === index
                  ? 'bg-gray-100 dark:bg-white/10 text-black dark:text-white'
                  : 'text-gray-700 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedIndex === index
                  ? 'bg-blue-100 dark:bg-white/20'
                  : 'bg-gray-100 dark:bg-white/10'
                  }`}>
                  <svg className="w-4 h-4 text-blue-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-sm truncate ${selectedIndex === index ? 'text-black dark:text-white' : 'text-gray-900 dark:text-white/90'}`}>
                    {result.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-white/70 truncate">
                    {result.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}

      {/* No Results Message */}
      {/* No Results Message */}
      {isExpanded && query && results.length === 0 && mounted && createPortal(
        <div
          className="fixed bg-white dark:bg-[#083d77]/95 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-xl p-4 z-[100000]"
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            width: `${coords.width}px`
          }}
        >
          <div className="text-center text-gray-500 dark:text-white/70 text-sm break-words px-2">
            No results found for &quot;{query}&quot;
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
