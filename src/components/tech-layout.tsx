'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './sidebar';

// Define the types for the props
interface TechLayoutProps {
  children: React.ReactNode;
  onThisPage?: { id: string; title: string }[];
  technology: 'java' | 'python' | 'sql' | 'web-dev' | 'data-science' | 'code-terminal' | 'devops' | 'linux' | 'azure-data-engineer' | 'artificial-intelligence' | 'medical-coding';
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  activeSubsection?: string | null;
  setActiveSubsection?: (section: string | null) => void;
  hideSidebar?: boolean;
  customNavigationItems?: SidebarItem[];
  hideNavButtons?: boolean;
}

interface SidebarItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  children?: SidebarItem[];
}

// Technology-specific navigation items
const getTechNavigationItems = (tech: string): SidebarItem[] => {
  const baseItems: SidebarItem[] = [];

  const techItems = {
    java: [
      {
        id: 'java-tutorial',
        title: 'Java Tutorial',
        href: '/java',
        icon: '☕',
        children: [
          { id: 'introduction', title: 'Java Tutorial', href: '/java#introduction' },
          { id: 'basics', title: 'Java Basics', href: '/java#basics' },
          { id: 'syntax', title: 'Java Syntax', href: '/java#syntax' },
          { id: 'output', title: 'Java Output', href: '/java#output' },
          { id: 'comments', title: 'Java Comments', href: '/java#comments' },
          { id: 'variables', title: 'Java Variables', href: '/java#variables' },
          { id: 'data-types', title: 'Java Data Types', href: '/java#data-types' },
          { id: 'operators', title: 'Java Operators', href: '/java#operators' },
          { id: 'strings', title: 'Java Strings', href: '/java#strings' },
          { id: 'math', title: 'Java Math', href: '/java#math' },
          { id: 'booleans', title: 'Java Booleans', href: '/java#booleans' },
          { id: 'if-else', title: 'Java If...Else', href: '/java#if-else' },
          { id: 'switch', title: 'Java Switch', href: '/java#switch' },
          { id: 'loops', title: 'Java Loops', href: '/java#loops' },
          { id: 'arrays', title: 'Java Arrays', href: '/java#arrays' },
          { id: 'methods', title: 'Java Methods', href: '/java#methods' }
        ]
      },
      {
        id: 'java-oop',
        title: 'Java OOP Concepts',
        href: '/java',
        icon: '🏗️',
        children: [
          { id: 'oop-concepts', title: 'Java OOP Concepts', href: '/java#oop-concepts' },
          { id: 'classes-objects', title: 'Java Classes and Objects', href: '/java#classes-objects' },
          { id: 'class-attributes', title: 'Java Class Attributes', href: '/java#class-attributes' },
          { id: 'class-methods', title: 'Java Class Methods', href: '/java#class-methods' },
          { id: 'constructors', title: 'Java Constructors', href: '/java#constructors' },
          { id: 'modifiers', title: 'Java Modifiers', href: '/java#modifiers' },
          { id: 'encapsulation', title: 'Java Encapsulation', href: '/java#encapsulation' },
          { id: 'packages', title: 'Java Packages', href: '/java#packages' },
          { id: 'inheritance', title: 'Java Inheritance', href: '/java#inheritance' },
          { id: 'polymorphism', title: 'Java Polymorphism', href: '/java#polymorphism' },
          { id: 'abstraction', title: 'Java Abstraction', href: '/java#abstraction' },
          { id: 'interfaces', title: 'Java Interface', href: '/java#interfaces' },
          { id: 'enums', title: 'Java Enums', href: '/java#enums' }
        ]
      },
      {
        id: 'java-advanced',
        title: 'Java Advanced',
        href: '/java',
        icon: '⚡',
        children: [
          { id: 'java-keywords', title: 'Java Keywords', href: '/java#java-keywords' },
          { id: 'strings-handling', title: 'Java String Methods', href: '/java#strings-handling' },
          { id: 'arrays-collections', title: 'Java Collections', href: '/java#arrays-collections' },
          { id: 'exception-handling', title: 'Java Exception Handling', href: '/java#exception-handling' },
          { id: 'packages-modules', title: 'Java Packages/Modules', href: '/java#packages-modules' },
          { id: 'file-handling', title: 'Java File Handling', href: '/java#file-handling' },
          { id: 'advanced', title: 'Java Advanced', href: '/java#advanced' },
          { id: 'date-time', title: 'Java Date/Time', href: '/java#date-time' },
          { id: 'arraylist', title: 'Java ArrayList', href: '/java#arraylist' },
          { id: 'linkedlist', title: 'Java LinkedList', href: '/java#linkedlist' },
          { id: 'hashmap', title: 'Java HashMap', href: '/java#hashmap' },
          { id: 'hashset', title: 'Java HashSet', href: '/java#hashset' },
          { id: 'iterator', title: 'Java Iterator', href: '/java#iterator' },
          { id: 'wrapper-classes', title: 'Java Wrapper Classes', href: '/java#wrapper-classes' },
          { id: 'exceptions-advanced', title: 'Java Exceptions', href: '/java#exceptions-advanced' },
          { id: 'regex', title: 'Java RegEx', href: '/java#regex' },
          { id: 'threads', title: 'Java Threads', href: '/java#threads' },
          { id: 'lambda', title: 'Java Lambda', href: '/java#lambda' }
        ]
      },
      {
        id: 'java-resources',
        title: 'Resources',
        href: '/java',
        icon: '📚',
        children: [
          { id: 'practice-projects', title: 'Practice Projects', href: '/java#practice-projects' },
          { id: 'video-tutorials', title: 'Video Tutorials', href: '/java#video-tutorials' }
        ]
      }
    ],
    python: [
      {
        id: 'python-basics',
        title: 'Python Basics',
        href: '/python',
        icon: '🐍',
        children: [
          { id: 'introduction', title: 'Introduction', href: '/python#introduction' },
          { id: 'syntax-indentation', title: 'Syntax & Indentation', href: '/python#syntax-indentation' },
          { id: 'variables-data-types', title: 'Variables & Data Types', href: '/python#variables-data-types' },
          { id: 'operators', title: 'Type Casting & Operators', href: '/python#operators' },
          { id: 'conditionals', title: 'Conditionals', href: '/python#conditionals' },
          { id: 'loops', title: 'Loops', href: '/python#loops' }
        ]
      },
      {
        id: 'python-intermediate',
        title: 'Python Intermediate',
        href: '/python',
        icon: '⚡',
        children: [
          { id: 'strings', title: 'Strings', href: '/python#strings' },
          { id: 'data-structures', title: 'Data Structures', href: '/python#data-structures' },
          { id: 'functions', title: 'Functions', href: '/python#functions' },
          { id: 'oop', title: 'OOP', href: '/python#oop' },
          { id: 'file-handling', title: 'File Handling', href: '/python#file-handling' },
          { id: 'exception-handling', title: 'Exception Handling', href: '/python#exception-handling' },
          { id: 'modules-packages', title: 'Modules & Packages', href: '/python#modules-packages' }
        ]
      },
      {
        id: 'python-advanced',
        title: 'Python Advanced',
        href: '/python',
        icon: '🔥',
        children: [
          { id: 'advanced-concepts', title: 'Advanced Concepts', href: '/python#advanced-concepts' }
        ]
      },
      {
        id: 'python-resources',
        title: 'Resources',
        href: '/python',
        icon: '📚',
        children: [
          { id: 'video-tutorials', title: 'Video Tutorials', href: '/python#video-tutorials' },
          { id: 'practice-projects', title: 'Practice Projects', href: '/python#practice-projects' },
          { id: 'summary', title: 'Summary', href: '/python#summary' }
        ]
      }
    ],
    sql: [
      {
        id: 'sql-basics',
        title: 'SQL Basics',
        href: '/sql',
        icon: '🗄️',
        children: [
          { id: 'introduction', title: 'Introduction', href: '/sql#introduction' },
          { id: 'basic-commands', title: 'Basic Commands', href: '/sql#basic-commands' },
          { id: 'data-types', title: 'Data Types & Constraints', href: '/sql#data-types' },
          { id: 'creating-tables', title: 'Creating Tables', href: '/sql#creating-tables' },
          { id: 'data-manipulation', title: 'Data Manipulation', href: '/sql#data-manipulation' },
          { id: 'filtering-sorting', title: 'Filtering & Sorting', href: '/sql#filtering-sorting' }
        ]
      },
      {
        id: 'sql-intermediate',
        title: 'SQL Intermediate',
        href: '/sql',
        icon: '⚡',
        children: [
          { id: 'joins', title: 'Joins and Relationships', href: '/sql#joins' },
          { id: 'aggregate-functions', title: 'Aggregate Functions', href: '/sql#aggregate-functions' },
          { id: 'subqueries', title: 'Subqueries', href: '/sql#subqueries' },
          { id: 'window-functions', title: 'Window Functions', href: '/sql#window-functions' }
        ]
      },
      {
        id: 'sql-advanced',
        title: 'SQL Advanced',
        href: '/sql',
        icon: '🔥',
        children: [
          { id: 'database-design', title: 'Database Design', href: '/sql#database-design' },
          { id: 'indexes-performance', title: 'Indexes & Performance', href: '/sql#indexes-performance' },
          { id: 'transactions', title: 'Transactions & ACID', href: '/sql#transactions' }
        ]
      },
      {
        id: 'sql-resources',
        title: 'Resources',
        href: '/sql',
        icon: '📚',
        children: [
          { id: 'video-tutorials', title: 'Video Tutorials', href: '/sql#video-tutorials' },
          { id: 'practice-projects', title: 'Practice Projects', href: '/sql#practice-projects' },
          { id: 'summary', title: 'Summary', href: '/sql#summary' }
        ]
      }
    ],
    'web-dev': [
      {
        id: 'frontend',
        title: 'Frontend Development',
        href: '/web-dev',
        icon: '🎨',
        children: [
          { id: 'html', title: 'HTML', href: '/web-dev' },
          { id: 'css', title: 'CSS', href: '/web-dev' },
          { id: 'javascript', title: 'JavaScript', href: '/web-dev' }
        ]
      },
      {
        id: 'backend',
        title: 'Backend Development',
        href: '/web-dev',
        icon: '⚙️',
        children: [
          { id: 'nodejs', title: 'Node.js', href: '/web-dev' },
          { id: 'express', title: 'Express.js', href: '/web-dev' }
        ]
      }
    ],
    'data-science': [
      {
        id: 'data-analysis',
        title: 'Data Analysis',
        href: '/data-science',
        icon: '📊',
        children: [
          { id: 'pandas', title: 'Pandas', href: '/data-science' },
          { id: 'numpy', title: 'NumPy', href: '/data-science' }
        ]
      },
      {
        id: 'machine-learning',
        title: 'Machine Learning',
        href: '/data-science',
        icon: '🤖',
        children: [
          { id: 'scikit-learn', title: 'Scikit-learn', href: '/data-science' },
          { id: 'tensorflow', title: 'TensorFlow', href: '/data-science' }
        ]
      }
    ],
    'code-terminal': [
      {
        id: 'terminal-basics',
        title: 'Terminal Basics',
        href: '/code-terminal',
        icon: '💻',
        children: [
          { id: 'commands', title: 'Basic Commands', href: '/code-terminal' },
          { id: 'navigation', title: 'File Navigation', href: '/code-terminal' }
        ]
      },
      {
        id: 'terminal-advanced',
        title: 'Advanced Terminal',
        href: '/code-terminal',
        icon: '⚡',
        children: [
          { id: 'scripting', title: 'Shell Scripting', href: '/code-terminal' },
          { id: 'automation', title: 'Automation', href: '/code-terminal' }
        ]
      }
    ],
    devops: [
      {
        id: 'devops-foundation',
        title: '1. DevOps Foundation',
        href: '/devops',
        icon: '🚀',
        children: [
          { id: 'introduction', title: 'Introduction to DevOps', href: '/devops#introduction' },
          { id: 'core-concepts', title: 'Core Concepts', href: '/devops#core-concepts' },
          { id: 'devops-lifecycle', title: 'DevOps Lifecycle', href: '/devops#devops-lifecycle' }
        ]
      },
      {
        id: 'linux-fundamentals',
        title: '2. Linux Fundamentals',
        href: '/devops',
        icon: '🐧',
        children: [
          { id: 'linux-introduction', title: 'Linux Introduction', href: '/devops#linux-introduction' },
          { id: 'linux-file-system', title: 'Linux File System', href: '/devops#linux-file-system' },
          { id: 'linux-navigation', title: 'Linux Navigation', href: '/devops#linux-navigation' },
          { id: 'linux-file-management', title: 'File Management', href: '/devops#linux-file-management' },
          { id: 'linux-permissions', title: 'Linux Permissions', href: '/devops#linux-permissions' },
          { id: 'linux-process-management', title: 'Process Management', href: '/devops#linux-process-management' },
          { id: 'linux-networking', title: 'Linux Networking', href: '/devops#linux-networking' },
          { id: 'linux-shell-scripting', title: 'Shell Scripting', href: '/devops#linux-shell-scripting' }
        ]
      },
      {
        id: 'version-control',
        title: '3. Version Control',
        href: '/devops',
        icon: '🔀',
        children: [
          { id: 'git-fundamentals', title: 'Git Fundamentals', href: '/devops#git-fundamentals' },
          { id: 'git-workflows', title: 'Git Workflows', href: '/devops#git-workflows' },
          { id: 'git-advanced', title: 'Advanced Git', href: '/devops#git-advanced' },
          { id: 'github-gitlab', title: 'GitHub & GitLab', href: '/devops#github-gitlab' }
        ]
      },
      {
        id: 'infrastructure-automation',
        title: '4. Infrastructure Automation',
        href: '/devops',
        icon: '🔧',
        children: [
          { id: 'ansible-basics', title: 'Ansible Basics', href: '/devops#ansible-basics' },
          { id: 'ansible-playbooks', title: 'Ansible Playbooks', href: '/devops#ansible-playbooks' },
          { id: 'ansible-roles', title: 'Ansible Roles', href: '/devops#ansible-roles' },
          { id: 'ansible-advanced', title: 'Advanced Ansible', href: '/devops#ansible-advanced' }
        ]
      },
      {
        id: 'containerization',
        title: '5. Containerization',
        href: '/devops',
        icon: '🐳',
        children: [
          { id: 'docker-basics', title: 'Docker Basics', href: '/devops#docker-basics' },
          { id: 'docker-compose', title: 'Docker Compose', href: '/devops#docker-compose' },
          { id: 'container-best-practices', title: 'Container Best Practices', href: '/devops#container-best-practices' }
        ]
      },
      {
        id: 'orchestration',
        title: '6. Orchestration',
        href: '/devops',
        icon: '☸️',
        children: [
          { id: 'kubernetes-basics', title: 'Kubernetes Basics', href: '/devops#kubernetes-basics' },
          { id: 'k8s-deployments', title: 'K8s Deployments', href: '/devops#k8s-deployments' },
          { id: 'k8s-services', title: 'K8s Services', href: '/devops#k8s-services' },
          { id: 'k8s-monitoring', title: 'K8s Monitoring', href: '/devops#k8s-monitoring' }
        ]
      },
      {
        id: 'cicd',
        title: '7. CI/CD',
        href: '/devops',
        icon: '🔄',
        children: [
          { id: 'jenkins-basics', title: 'Jenkins Basics', href: '/devops#jenkins-basics' },
          { id: 'jenkins-pipelines', title: 'Jenkins Pipelines', href: '/devops#jenkins-pipelines' },
          { id: 'github-actions', title: 'GitHub Actions', href: '/devops#github-actions' },
          { id: 'gitlab-ci', title: 'GitLab CI', href: '/devops#gitlab-ci' }
        ]
      },
      {
        id: 'monitoring',
        title: '8. Monitoring',
        href: '/devops',
        icon: '📊',
        children: [
          { id: 'prometheus-basics', title: 'Prometheus Basics', href: '/devops#prometheus-basics' },
          { id: 'grafana-dashboards', title: 'Grafana Dashboards', href: '/devops#grafana-dashboards' },
          { id: 'elk-stack', title: 'ELK Stack', href: '/devops#elk-stack' },
          { id: 'alerting', title: 'Alerting & Incident Response', href: '/devops#alerting' }
        ]
      },
      {
        id: 'devops-advanced',
        title: '9. Advanced Topics',
        href: '/devops',
        icon: '🔥',
        children: [
          { id: 'automation', title: 'Automation & Orchestration', href: '/devops#automation' },
          { id: 'security', title: 'DevSecOps & Security', href: '/devops#security' },
          { id: 'cloud-platforms', title: 'Cloud Platforms', href: '/devops#cloud-platforms' },
          { id: 'monitoring-observability', title: 'Monitoring & Observability', href: '/devops#monitoring-observability' }
        ]
      },
      {
        id: 'devops-resources',
        title: '10. Resources',
        href: '/devops',
        icon: '📚',
        children: [
          { id: 'tools-technologies', title: 'Tools & Technologies', href: '/devops#tools-technologies' },
          { id: 'learning-path', title: 'Learning Path', href: '/devops#learning-path' },
          { id: 'summary', title: 'Summary', href: '/devops#summary' }
        ]
      }
    ],
    linux: [
      {
        id: 'linux-basics',
        title: 'Linux Basics',
        href: '/linux',
        icon: '🐧',
        children: [
          { id: 'introduction', title: 'Introduction to Linux', href: '/linux#introduction' },
          { id: 'file-system', title: 'File System Structure', href: '/linux#file-system' },
          { id: 'navigation', title: 'Navigation Commands', href: '/linux#navigation' },
          { id: 'file-management', title: 'File & Directory Management', href: '/linux#file-management' },
          { id: 'viewing-editing', title: 'Viewing & Editing Files', href: '/linux#viewing-editing' },
          { id: 'permissions', title: 'User & Permission Management', href: '/linux#permissions' },
          { id: 'process-management', title: 'Process & System Management', href: '/linux#process-management' },
          { id: 'networking', title: 'Networking Basics', href: '/linux#networking' },
          { id: 'package-management', title: 'Package Management', href: '/linux#package-management' },
          { id: 'shell-scripting', title: 'Shell Scripting Basics', href: '/linux#shell-scripting' },
          { id: 'logs-monitoring', title: 'Logs & Monitoring', href: '/linux#logs-monitoring' },
          { id: 'shortcuts', title: 'Essential Shortcuts', href: '/linux#shortcuts' }
        ]
      },
      {
        id: 'linux-resources',
        title: 'Resources',
        href: '/linux',
        icon: '📚',
        children: [
          { id: 'video-tutorials', title: 'Video Tutorials', href: '/linux#video-tutorials' },
          { id: 'summary', title: 'Summary', href: '/linux#summary' }
        ]
      }
    ],
    'azure-data-engineer': [
      {
        id: 'azure-basics',
        title: 'Azure Basics',
        href: '/tutorials/azure-data-engineer#azure-basics',
        icon: '📘',
        children: [
          { id: 'azure-hierarchy', title: 'Azure Hierarchy', href: '/tutorials/azure-data-engineer#azure-hierarchy' },
          { id: 'resource-group', title: 'Resource Group', href: '/tutorials/azure-data-engineer#resource-group' },
          { id: 'azure-blob-storage', title: 'Azure Blob Storage', href: '/tutorials/azure-data-engineer#azure-blob-storage' },
          { id: 'azure-data-lake', title: 'Azure Data Lake Storage Gen2', href: '/tutorials/azure-data-engineer#azure-data-lake' }
        ]
      },
      {
        id: 'azure-databricks',
        title: 'Azure Databricks',
        href: '/tutorials/azure-data-engineer#azure-databricks',
        icon: '🔷',
        children: [
          { id: 'introduction-to-azure-databricks', title: 'Introduction to Azure Databricks', href: '/tutorials/azure-data-engineer#introduction-to-azure-databricks' },
          { id: 'databricks-architecture', title: 'Databricks Architecture', href: '/tutorials/azure-data-engineer#databricks-architecture' },
          { id: 'common-use-cases', title: 'Common Use Cases', href: '/tutorials/azure-data-engineer#common-use-cases' },
          { id: 'core-components', title: 'Core Components', href: '/tutorials/azure-data-engineer#core-components' },
          { id: 'advantages', title: 'Advantages', href: '/tutorials/azure-data-engineer#advantages' },
          { id: 'databricks-overview', title: 'Databricks Overview', href: '/tutorials/azure-data-engineer#databricks-overview' },
          { id: 'how-to-create', title: 'How to Create Azure Databricks', href: '/tutorials/azure-data-engineer#how-to-create' },
          { id: 'workspace-overview', title: 'Workspace Overview', href: '/tutorials/azure-data-engineer#workspace-overview' },
          { id: 'databricks-features', title: 'Databricks Features', href: '/tutorials/azure-data-engineer#databricks-features' }
        ]
      },
      {
        id: 'databricks-sql',
        title: 'Databricks SQL',
        href: '/tutorials/azure-data-engineer#databricks-sql',
        icon: '💾',
        children: [
          { id: 'sql-editor', title: 'SQL Editor', href: '/tutorials/azure-data-engineer#sql-editor' },
          { id: 'queries', title: 'Queries', href: '/tutorials/azure-data-engineer#queries' },
          { id: 'dashboards', title: 'Dashboards', href: '/tutorials/azure-data-engineer#dashboards' },
          { id: 'genie', title: 'Genie', href: '/tutorials/azure-data-engineer#genie' },
          { id: 'alerts', title: 'Alerts', href: '/tutorials/azure-data-engineer#alerts' },
          { id: 'query-history', title: 'Query History', href: '/tutorials/azure-data-engineer#query-history' },
          { id: 'sql-data-warehouse', title: 'SQL Data Warehouse', href: '/tutorials/azure-data-engineer#sql-data-warehouse' }
        ]
      },
      {
        id: 'azure-databricks-1',
        title: 'Data Engineering',
        href: '/tutorials/azure-data-engineer#azure-databricks-1',
        icon: '🛠️',
        children: [
          { id: 'data-engineering', title: 'Overview', href: '/tutorials/azure-data-engineer#data-engineering' },
          { id: 'jobs-runs', title: "Jobs run's", href: '/tutorials/azure-data-engineer#jobs-runs' },
          { id: 'data-ingestion', title: 'Data Ingestion', href: '/tutorials/azure-data-engineer#data-ingestion' },
          { id: 'ai-ml', title: 'AI/ML', href: '/tutorials/azure-data-engineer#ai-ml' },
          { id: 'playground', title: 'Playground', href: '/tutorials/azure-data-engineer#playground' },
          { id: 'experiments', title: 'Experiments', href: '/tutorials/azure-data-engineer#experiments' },
          { id: 'features', title: 'Features', href: '/tutorials/azure-data-engineer#features' },
          { id: 'models', title: 'Models', href: '/tutorials/azure-data-engineer#models' },
          { id: 'serving', title: 'Serving', href: '/tutorials/azure-data-engineer#serving' },
          { id: 'notebook-level-features', title: 'Notebook-level features', href: '/tutorials/azure-data-engineer#notebook-level-features' },
          { id: 'file-level-features', title: 'File-level Features', href: '/tutorials/azure-data-engineer#file-level-features' },
          { id: 'edit-level-features', title: 'Edit level features', href: '/tutorials/azure-data-engineer#edit-level-features' },
          { id: 'view-level-features', title: 'View level features', href: '/tutorials/azure-data-engineer#view-level-features' },
          { id: 'run-level-features', title: 'Run-level features', href: '/tutorials/azure-data-engineer#run-level-features' },
          { id: 'help-level-features', title: 'Help-level features', href: '/tutorials/azure-data-engineer#help-level-features' },
          { id: 'language-level-features', title: 'Language-level features', href: '/tutorials/azure-data-engineer#language-level-features' },
          { id: 'others-features', title: 'Others features', href: '/tutorials/azure-data-engineer#others-features' }
        ]
      }
    ],
    'artificial-intelligence': [
      {
        id: 'llms',
        title: 'Large Language Models (LLMs)',
        href: '/tutorials/artificial-intelligence#llms',
        icon: '🤖',
        children: [
          { id: 'llm-introduction', title: 'Introduction to LLMs', href: '/tutorials/artificial-intelligence#llm-introduction' },
          { id: 'llm-architecture', title: 'LLM Architecture', href: '/tutorials/artificial-intelligence#llm-architecture' },
          { id: 'llm-training', title: 'Training LLMs', href: '/tutorials/artificial-intelligence#llm-training' },
          { id: 'llm-applications', title: 'LLM Applications', href: '/tutorials/artificial-intelligence#llm-applications' }
        ]
      }
    ]
  };

  return [...baseItems, ...(techItems[tech as keyof typeof techItems] || [])];
};

export default function TechLayout({ children, onThisPage = [], technology, activeSection: externalActiveSection, setActiveSection: externalSetActiveSection, activeSubsection, setActiveSubsection, hideSidebar = false, customNavigationItems, hideNavButtons = false }: TechLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [internalActiveSection, setInternalActiveSection] = useState('');

  const activeSection = externalActiveSection !== undefined ? externalActiveSection : internalActiveSection;
  const setActiveSection = externalSetActiveSection || setInternalActiveSection;

  const sectionList = useMemo(() => onThisPage ?? [], [onThisPage]);
  const resolvedActiveSection = useMemo(() => {
    if (!sectionList.length) return activeSection;
    // If activeSection is provided, use it directly (it might be a subsection ID)
    // Don't fallback to first section - the activeSection is managed by the page component
    if (activeSection) {
      return activeSection;
    }
    return sectionList[0]?.id;
  }, [sectionList, activeSection]);

  useEffect(() => {
    if (!sectionList.length) return;
    sectionList.forEach(section => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const datasetKey = 'techPrevDisplay';
      if (!el.dataset[datasetKey]) {
        el.dataset[datasetKey] = el.style.display || '';
      }
      if (!resolvedActiveSection || resolvedActiveSection === section.id) {
        el.style.display = el.dataset[datasetKey] ?? '';
      } else {
        el.style.display = 'none';
      }
    });

    return () => {
      sectionList.forEach(section => {
        const el = document.getElementById(section.id);
        if (!el) return;
        const datasetKey = 'techPrevDisplay';
        if (el.dataset[datasetKey] !== undefined) {
          el.style.display = el.dataset[datasetKey] ?? '';
          delete el.dataset[datasetKey];
        } else {
          el.style.removeProperty('display');
        }
      });
    };
  }, [sectionList, resolvedActiveSection]);

  // Use custom navigation items if provided, otherwise use default
  const navigationItems = customNavigationItems || getTechNavigationItems(technology);
  const currentIndex = resolvedActiveSection ? sectionList.findIndex(section => section.id === resolvedActiveSection) : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < sectionList.length - 1;

  // Handle scroll to update active section (for sidebar highlighting only - NO scrolling)
  useEffect(() => {
    if (!sectionList.length) return; // Skip scroll handling if no onThisPage prop

    let scrollTimeout: NodeJS.Timeout;
    let lastScrollY = window.scrollY;
    let isScrollingProgrammatically = false;
    let programmaticScrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // If scroll delta is large (>100px), it's likely programmatic scrolling - skip
      if (scrollDelta > 100) {
        isScrollingProgrammatically = true;
        clearTimeout(programmaticScrollTimeout);
        programmaticScrollTimeout = setTimeout(() => {
          isScrollingProgrammatically = false;
        }, 2000); // Increased delay to prevent interference
        return;
      }

      // Skip if programmatic scroll is happening
      if (isScrollingProgrammatically) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Double-check that we're not in a programmatic scroll
        if (isScrollingProgrammatically) return;

        const sections = sectionList
          .map(item => document.getElementById(item.id))
          .filter((section): section is HTMLElement => Boolean(section && section.offsetParent !== null));
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= scrollPosition) {
            // Only update if section actually changed to prevent unnecessary re-renders
            const currentSection = externalActiveSection !== undefined ? externalActiveSection : '';
            if (section.id !== currentSection) {
              // ONLY update state for highlighting - DO NOT trigger any scrolling
              // But only if this is user scrolling, not programmatic
              setActiveSection(section.id);
              if (setActiveSubsection) {
                setActiveSubsection(null);
              }
            }
            break;
          }
        }
      }, 300); // Increased debounce delay
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      clearTimeout(programmaticScrollTimeout);
    };
  }, [sectionList, setActiveSection, setActiveSubsection, externalActiveSection]);

  return (
    <div className="flex min-h-screen relative w-full overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed position, stays visible while content scrolls */}
      {!hideSidebar && (
        <aside
          className={`
            fixed left-0 z-50 w-full max-w-xs sm:max-w-sm lg:w-80 shadow-2xl
            transform transition-transform duration-300 ease-in-out
            top-0 h-screen
            lg:top-[80px] lg:h-[calc(100vh-80px)]
            lg:translate-x-0 lg:z-30
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            overflow-hidden
            will-change-transform
           `}
          style={{ backgroundColor: 'var(--glass-bg)', borderRight: '1px solid var(--glass-border)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', boxShadow: '2px 0 8px var(--glass-shadow)' }}
        >
          {/* Mobile close button */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.15)', backgroundColor: 'rgba(26, 26, 26, 0.98)' }}>
            <span className="text-white font-semibold">Menu</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Sidebar
            items={navigationItems}
            onThisPage={sectionList}
            activeSection={resolvedActiveSection}
            setActiveSection={(sectionId: string) => {
              setActiveSection(sectionId);
              // Close sidebar on mobile after selection
              setSidebarOpen(false);
            }}
            activeSubsection={activeSubsection}
            setActiveSubsection={setActiveSubsection}
          />
        </aside>
      )}

      {/* Main Content - scrolls independently, sidebar stays fixed */}
      <div className={`flex-1 flex flex-col ${!hideSidebar ? 'lg:ml-80' : ''} min-h-screen w-full`}>
        {/* Mobile header */}
        <header className="lg:hidden bg-[#1a1a1a] border-b border-gray-600">
          <div className="flex items-center justify-between px-4 py-4">
            {!hideSidebar && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-3 rounded-xl text-white hover:bg-gray-800/50 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            {hideSidebar && <div className="w-10" />}
            <h1 className="text-xl font-bold text-white">
              {technology === 'java' ? 'Java Programming' :
                technology === 'python' ? 'Python Programming' :
                  technology === 'sql' ? 'SQL & Databases' :
                    technology === 'web-dev' ? 'Web Development' :
                      technology === 'data-science' ? 'Data Science' :
                        technology === 'code-terminal' ? 'Code Terminal' :
                          technology === 'devops' ? 'DevOps' :
                            technology === 'azure-data-engineer' ? 'Azure Data Engineer' :
                              technology === 'medical-coding' ? 'Medical Coding' : 'OneHubGlobal'}
            </h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Content area - uses natural window scrolling, independent from sidebar */}
        <main className="flex-1 relative z-10 w-full" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: '120px', minHeight: '100vh', color: 'var(--text-primary)' }}>
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <article className="max-w-none text-[var(--text-primary)] leading-relaxed space-y-6 break-words">
              {children}
              {!hideNavButtons && sectionList.length > 1 && resolvedActiveSection && setActiveSection && (
                <div className="flex flex-col gap-4 mt-12 pt-8 border-t border-gray-700">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <button
                      onClick={() => {
                        if (!hasPrevious) return;
                        const target = sectionList[currentIndex - 1];
                        if (target) setActiveSection(target.id);
                      }}
                      disabled={!hasPrevious}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${hasPrevious
                          ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'
                          : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                        }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Previous</span>
                      {hasPrevious && (
                        <span className="text-sm text-gray-400">
                          {sectionList[currentIndex - 1]?.title}
                        </span>
                      )}
                    </button>

                    <div className="text-sm text-gray-400 text-center md:text-right">
                      {currentIndex + 1} of {sectionList.length}
                    </div>

                    <button
                      onClick={() => {
                        if (!hasNext) return;
                        const target = sectionList[currentIndex + 1];
                        if (target) setActiveSection(target.id);
                      }}
                      disabled={!hasNext}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${hasNext
                          ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'
                          : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                        }`}
                    >
                      {hasNext && (
                        <span className="text-sm text-gray-400">
                          {sectionList[currentIndex + 1]?.title}
                        </span>
                      )}
                      <span>Next</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </article>
          </div>
        </main>
      </div>

    </div>
  );
}
