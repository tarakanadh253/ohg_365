'use client';

// src/app/sql/page.tsx
import Link from 'next/link';
import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { videoTutorialsData } from '@/data/videoTutorials';
import { useState, useEffect } from 'react';
import { AUTH_SYSTEM_AVAILABLE } from '@/config/authStatus';

export default function SQLPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    AUTH_SYSTEM_AVAILABLE ? null : true
  );

  // Authentication check - runs immediately on mount
  useEffect(() => {
    if (!AUTH_SYSTEM_AVAILABLE) {
      setIsAuthenticated(true);
      return;
    }
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      const currentPath = window.location.pathname;
      window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    // Validate JWT token format and expiry
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        localStorage.removeItem('token');
        const currentPath = window.location.pathname;
        window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        const currentPath = window.location.pathname;
        window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem('token');
      const currentPath = window.location.pathname;
      window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
  }, []);

  const pageHeadings = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'basic-commands', title: 'Basic Commands' },
    { id: 'data-types', title: 'Data Types & Constraints' },
    { id: 'creating-tables', title: 'Creating Tables' },
    { id: 'data-manipulation', title: 'Data Manipulation' },
    { id: 'filtering-sorting', title: 'Filtering & Sorting' },
    { id: 'joins', title: 'Joins and Relationships' },
    { id: 'aggregate-functions', title: 'Aggregate Functions' },
    { id: 'subqueries', title: 'Subqueries' },
    { id: 'window-functions', title: 'Window Functions' },
    { id: 'database-design', title: 'Database Design' },
    { id: 'indexes-performance', title: 'Indexes & Performance' },
    { id: 'transactions', title: 'Transactions & ACID' },
    { id: 'practice-projects', title: 'Practice Projects' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'summary', title: 'Summary' }
  ];

  // Handle URL hash changes to set active section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash && pageHeadings.some(heading => heading.id === hash)) {
        setActiveSection(hash);
      }
    };

    // Set initial section from URL hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Don't render until authenticated
  if (isAuthenticated === null || isAuthenticated === false) {
    return null;
  }

  // Get navigation for current section
  const getNavigation = () => {
    const currentIndex = pageHeadings.findIndex(h => h.id === activeSection);
    const previousSection = currentIndex > 0 ? pageHeadings[currentIndex - 1] : null;
    const nextSection = currentIndex < pageHeadings.length - 1 ? pageHeadings[currentIndex + 1] : null;

    return {
      previous: previousSection ? {
        href: `/sql/#${previousSection.id}`,
        title: previousSection.title,
        isSection: true
      } : {
        href: '/python',
        title: 'Python Programming',
        isSection: false
      },
      next: nextSection ? {
        href: `/sql/#${nextSection.id}`,
        title: nextSection.title,
        isSection: true
      } : {
        href: '/web-dev',
        title: 'Web Development',
        isSection: false
      }
    };
  };

  const navigation = getNavigation();

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ SQL Learning Hub
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master SQL for database management and data analysis
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* Overview Section */}
                <div id="overview" className="bg-gray-800/50 border border-gray-600 p-8 rounded-lg mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">📋 SQL Course Overview</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-4">What You'll Learn</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• SQL syntax and fundamentals</li>
                        <li>• Database design and normalization</li>
                        <li>• Query optimization</li>
                        <li>• Data manipulation (CRUD operations)</li>
                        <li>• Joins and relationships</li>
                        <li>• Stored procedures and functions</li>
                        <li>• Database administration</li>
                        <li>• Performance tuning</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-4">Career Opportunities</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Database Administrator</li>
                        <li>• Data Analyst</li>
                        <li>• Business Intelligence Developer</li>
                        <li>• Backend Developer</li>
                        <li>• Data Engineer</li>
                        <li>• Database Developer</li>
                        <li>• Data Scientist</li>
                        <li>• Systems Analyst</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* What is a Database */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 What is a Database?</h2>
                  <div className="space-y-6">
                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg">
                      <h4 className="text-xl font-bold text-blue-300 mb-4">🎯 Database Fundamentals</h4>
                      <p className="text-lg text-gray-300 leading-relaxed mb-4">
                        A <strong className="text-white">database</strong> is an organized collection of structured data stored electronically in a computer system. 
                        It&apos;s designed to efficiently store, retrieve, manage, and update large amounts of information. Think of it as an intelligent digital filing 
                        cabinet that not only stores your data but also helps you find, sort, and analyze it quickly.
                      </p>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h5 className="font-bold text-white mb-2">Database Characteristics:</h5>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-white">Persistence:</strong> Data survives application restarts and system failures</li>
                          <li>• <strong className="text-white">Concurrency:</strong> Multiple users can access data simultaneously</li>
                          <li>• <strong className="text-white">Integrity:</strong> Data remains consistent and accurate</li>
                          <li>• <strong className="text-white">Security:</strong> Controlled access and data protection mechanisms</li>
                          <li>• <strong className="text-white">Scalability:</strong> Can handle growing amounts of data and users</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-4">Why Do We Need Databases?</h4>
                      <div className="space-y-3 text-gray-300">
                        <p><strong className="text-white">1. Data Organization:</strong> Instead of scattered files, data is organized in a structured format making it easy to access and manage.</p>
                        <p><strong className="text-white">2. Data Integrity:</strong> Databases enforce rules to ensure data accuracy and consistency. For example, you can&apos;t have a negative age or duplicate email addresses.</p>
                        <p><strong className="text-white">3. Concurrent Access:</strong> Multiple users can access and modify data simultaneously without conflicts. Imagine 1000 people booking flight tickets at the same time!</p>
                        <p><strong className="text-white">4. Security:</strong> Databases provide controlled access - not everyone can see or modify sensitive data like passwords or salary information.</p>
                        <p><strong className="text-white">5. Scalability:</strong> Databases can handle growth from hundreds to millions of records efficiently.</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gray-800 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Types of Databases</h3>
                        <div className="space-y-4 text-gray-300">
                          <div>
                            <p className="font-bold text-white mb-1">• Relational Databases (RDBMS)</p>
                            <p className="text-sm pl-4">Data organized in tables with rows and columns. Most common type for structured data. Examples: MySQL, PostgreSQL, Oracle, SQL Server</p>
                          </div>
                          <div>
                            <p className="font-bold text-white mb-1">• NoSQL Databases</p>
                            <p className="text-sm pl-4">Flexible schema for unstructured data. Great for big data and real-time applications. Examples: MongoDB (documents), Redis (key-value), Cassandra (wide-column)</p>
                          </div>
                          <div>
                            <p className="font-bold text-white mb-1">• Cloud Databases</p>
                            <p className="text-sm pl-4">Hosted on cloud platforms, offering scalability and accessibility. Examples: Amazon RDS, Azure SQL, Google Cloud SQL</p>
                          </div>
                          <div>
                            <p className="font-bold text-white mb-1">• In-Memory Databases</p>
                            <p className="text-sm pl-4">Store data in RAM for ultra-fast access. Perfect for caching and real-time analytics. Examples: Redis, Memcached</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Real-World Applications</h3>
                        <div className="space-y-4 text-gray-300">
                          <div>
                            <p className="font-bold text-white mb-1">• Banking & Finance</p>
                            <p className="text-sm pl-4">Customer accounts, transaction history, loan processing, fraud detection. Every ATM withdrawal, credit card payment is a database operation!</p>
                          </div>
                          <div>
                            <p className="font-bold text-white mb-1">• E-commerce</p>
                            <p className="text-sm pl-4">Product catalogs, order management, customer data, inventory tracking, payment processing. Amazon handles millions of transactions daily!</p>
                          </div>
                          <div>
                            <p className="font-bold text-white mb-1">• Healthcare</p>
                            <p className="text-sm pl-4">Patient records, medical history, prescriptions, appointment scheduling, insurance claims. Critical for patient care and medical research.</p>
                          </div>
                          <div>
                            <p className="font-bold text-white mb-1">• Social Media</p>
                            <p className="text-sm pl-4">User profiles, posts, comments, likes, friend connections, messaging. Facebook stores billions of posts and photos!</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-300 mb-3">🏗️ Database Architecture & Design</h4>
                      <div className="space-y-4">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <h5 className="font-bold text-white mb-2">Database Architecture Layers:</h5>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Physical Layer:</strong> How data is actually stored on disk (files, indexes, storage structures)</li>
                            <li>• <strong className="text-white">Logical Layer:</strong> How data appears to users (tables, views, relationships)</li>
                            <li>• <strong className="text-white">External Layer:</strong> How different applications view the data (user interfaces, reports)</li>
                          </ul>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <h5 className="font-bold text-white mb-2">Database Design Principles:</h5>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Normalization:</strong> Organizing data to reduce redundancy and improve integrity</li>
                            <li>• <strong className="text-white">Entity-Relationship Modeling:</strong> Designing relationships between data entities</li>
                            <li>• <strong className="text-white">ACID Properties:</strong> Atomicity, Consistency, Isolation, Durability</li>
                            <li>• <strong className="text-white">Data Integrity:</strong> Ensuring data accuracy and consistency</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-blue-300 mb-3">💡 Real-Life Analogy</h4>
                      <p className="text-gray-300">
                        Imagine a library: Books are your data, shelves are your tables, the catalog system is your database management system, 
                        and the librarian is SQL helping you find exactly what you need. Just as a library organizes thousands of books for easy access, 
                        a database organizes millions of data records for efficient retrieval!
                      </p>
                    </div>
                  </div>
                </div>

                {/* What is SQL */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📚 What is SQL?</h2>
                  <div className="space-y-6">
                    <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-lg mb-6">
                      <h4 className="text-xl font-bold text-purple-300 mb-4">🔍 SQL - The Universal Database Language</h4>
                      <p className="text-lg text-gray-300 leading-relaxed mb-4">
                        <strong className="text-white">SQL (Structured Query Language)</strong> is a standardized programming language specifically designed for managing and manipulating relational databases. 
                        Originally developed at IBM in the early 1970s by Donald D. Chamberlin and Raymond F. Boyce, SQL has become the universal language for database communication.
                      </p>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h5 className="font-bold text-white mb-2">SQL Language Characteristics:</h5>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-white">Declarative:</strong> You specify what you want, not how to get it</li>
                          <li>• <strong className="text-white">Set-oriented:</strong> Operates on sets of rows rather than individual records</li>
                          <li>• <strong className="text-white">Non-procedural:</strong> No need to specify step-by-step procedures</li>
                          <li>• <strong className="text-white">High-level:</strong> Abstracts complex database operations into simple commands</li>
                          <li>• <strong className="text-white">Portable:</strong> Works across different database systems with minimal changes</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-4">History and Evolution</h4>
                      <div className="space-y-3 text-gray-300">
                        <p><strong className="text-white">1970s:</strong> SQL was originally called SEQUEL (Structured English Query Language) and was designed to manipulate data stored in IBM&apos;s System R database.</p>
                        <p><strong className="text-white">1986:</strong> SQL was standardized by ANSI (American National Standards Institute), making it an official standard for relational databases.</p>
                        <p><strong className="text-white">Today:</strong> SQL is supported by all major database systems including MySQL, PostgreSQL, Oracle, SQL Server, and SQLite. Despite minor syntax variations, the core SQL remains consistent across platforms.</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gray-700 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Key Features of SQL</h3>
                        <div className="space-y-3 text-gray-300">
                          <div>
                            <p className="font-bold text-white mb-1">• Declarative Language</p>
                            <p className="text-sm pl-4">You tell SQL WHAT you want, not HOW to get it. The database engine figures out the most efficient way to retrieve your data. For example, "Give me all customers from California" - you don&apos;t need to specify the algorithm!</p>
                          </div>
                          <div>
                            <p className="font-bold text-white mb-1">• Standardized</p>
                            <p className="text-sm pl-4">SQL works across different database systems with minimal changes. Learn once, use everywhere! Although each database has its own extensions, the core SQL remains the same.</p>
                          </div>
                          <div>
                            <p className="font-bold text-white mb-1">• Powerful</p>
                            <p className="text-sm pl-4">Can process millions of rows in seconds. Modern databases can handle complex queries on terabytes of data efficiently using sophisticated optimization techniques.</p>
                          </div>
                          <div>
                            <p className="font-bold text-white mb-1">• Human-readable</p>
                            <p className="text-sm pl-4">SQL uses English-like syntax making it easy to read and write. Commands like SELECT, FROM, WHERE make sense even to non-programmers!</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-700 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">SQL Command Categories</h3>
                        <div className="space-y-4 text-gray-300">
                          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                            <p className="font-bold text-blue-300 mb-2">• DDL (Data Definition Language)</p>
                            <p className="text-sm mb-2">Defines and manages database structure. These commands change the schema (structure) of the database.</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• <strong className="text-white">CREATE:</strong> Creates new database objects (tables, indexes, views)</li>
                              <li>• <strong className="text-white">ALTER:</strong> Modifies existing database objects</li>
                              <li>• <strong className="text-white">DROP:</strong> Removes database objects</li>
                              <li>• <strong className="text-white">TRUNCATE:</strong> Removes all data from a table but keeps structure</li>
                            </ul>
                          </div>
                          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                            <p className="font-bold text-green-300 mb-2">• DML (Data Manipulation Language)</p>
                            <p className="text-sm mb-2">Manipulates the actual data within tables. These commands affect the data content.</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• <strong className="text-white">INSERT:</strong> Adds new records to tables</li>
                              <li>• <strong className="text-white">UPDATE:</strong> Modifies existing records</li>
                              <li>• <strong className="text-white">DELETE:</strong> Removes records from tables</li>
                              <li>• <strong className="text-white">SELECT:</strong> Retrieves data from tables (most commonly used)</li>
                            </ul>
                          </div>
                          <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                            <p className="font-bold text-purple-300 mb-2">• DQL (Data Query Language)</p>
                            <p className="text-sm mb-2">Retrieves data from databases. SELECT is the most powerful and commonly used SQL command.</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• <strong className="text-white">SELECT:</strong> Retrieves data from one or more tables</li>
                              <li>• <strong className="text-white">WHERE:</strong> Filters records based on conditions</li>
                              <li>• <strong className="text-white">ORDER BY:</strong> Sorts results in ascending or descending order</li>
                              <li>• <strong className="text-white">GROUP BY:</strong> Groups rows with same values into summary rows</li>
                            </ul>
                          </div>
                          <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
                            <p className="font-bold text-orange-300 mb-2">• DCL (Data Control Language)</p>
                            <p className="text-sm mb-2">Controls access to database objects and data. Manages security and permissions.</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• <strong className="text-white">GRANT:</strong> Gives privileges to users or roles</li>
                              <li>• <strong className="text-white">REVOKE:</strong> Removes privileges from users or roles</li>
                              <li>• <strong className="text-white">DENY:</strong> Explicitly denies permissions (SQL Server)</li>
                              <li>• <strong className="text-white">Role Management:</strong> Creates and manages user roles</li>
                            </ul>
                          </div>
                          <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                            <p className="font-bold text-red-300 mb-2">• TCL (Transaction Control Language)</p>
                            <p className="text-sm mb-2">Manages database transactions to ensure data integrity and consistency.</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• <strong className="text-white">COMMIT:</strong> Saves all changes made during transaction</li>
                              <li>• <strong className="text-white">ROLLBACK:</strong> Undoes all changes made during transaction</li>
                              <li>• <strong className="text-white">SAVEPOINT:</strong> Creates a point within transaction for partial rollback</li>
                              <li>• <strong className="text-white">SET TRANSACTION:</strong> Sets transaction properties</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-300 mb-3">💡 Why SQL Matters</h4>
                      <p className="text-gray-300 mb-3">
                        SQL is not just a programming language - it&apos;s a skill that opens doors to numerous career opportunities. Here&apos;s why SQL is indispensable in the modern tech world:
                      </p>
                      <ul className="text-gray-300 space-y-2 pl-4">
                        <li>✓ <strong className="text-white">Universal Skill:</strong> Used by data analysts, developers, scientists, and business professionals</li>
                        <li>✓ <strong className="text-white">High Demand:</strong> One of the most requested skills in tech job postings</li>
                        <li>✓ <strong className="text-white">Data-Driven Decisions:</strong> Enables businesses to extract insights from their data</li>
                        <li>✓ <strong className="text-white">Foundation for Advanced Topics:</strong> Essential for data science, machine learning, and business intelligence</li>
                        <li>✓ <strong className="text-white">Timeless Technology:</strong> SQL has been around for 50+ years and will continue to be relevant</li>
                      </ul>
                    </div>

                    <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-300 mb-4">🎯 SQL Learning Path: From Basics to Advanced</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <h5 className="font-bold text-green-400 mb-3">🟢 Beginner Level</h5>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Database Fundamentals</strong></li>
                            <li>• <strong className="text-white">Basic SELECT Queries</strong></li>
                            <li>• <strong className="text-white">Data Types & Constraints</strong></li>
                            <li>• <strong className="text-white">Creating & Managing Tables</strong></li>
                            <li>• <strong className="text-white">INSERT, UPDATE, DELETE</strong></li>
                            <li>• <strong className="text-white">Simple WHERE Conditions</strong></li>
                          </ul>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <h5 className="font-bold text-yellow-400 mb-3">🟡 Intermediate Level</h5>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Complex JOINs (INNER, LEFT, RIGHT)</strong></li>
                            <li>• <strong className="text-white">Aggregate Functions (SUM, AVG, COUNT)</strong></li>
                            <li>• <strong className="text-white">GROUP BY & HAVING</strong></li>
                            <li>• <strong className="text-white">Subqueries & CTEs</strong></li>
                            <li>• <strong className="text-white">Indexes & Performance</strong></li>
                            <li>• <strong className="text-white">Views & Stored Procedures</strong></li>
                          </ul>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <h5 className="font-bold text-red-400 mb-3">🔴 Advanced Level</h5>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Window Functions (ROW_NUMBER, RANK)</strong></li>
                            <li>• <strong className="text-white">Advanced JOINs (CROSS, FULL OUTER)</strong></li>
                            <li>• <strong className="text-white">Recursive Queries & CTEs</strong></li>
                            <li>• <strong className="text-white">Database Design & Normalization</strong></li>
                            <li>• <strong className="text-white">Transactions & ACID Properties</strong></li>
                            <li>• <strong className="text-white">Performance Optimization</strong></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-900/20 border border-orange-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-orange-300 mb-4">🚀 Modern SQL Applications</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <h5 className="font-bold text-white mb-3">Data Analytics & Business Intelligence</h5>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Reporting & Dashboards:</strong> Creating business reports and KPI dashboards</li>
                            <li>• <strong className="text-white">Data Warehousing:</strong> ETL processes and data integration</li>
                            <li>• <strong className="text-white">OLAP Operations:</strong> Multidimensional data analysis</li>
                            <li>• <strong className="text-white">Trend Analysis:</strong> Time-series data analysis and forecasting</li>
                          </ul>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <h5 className="font-bold text-white mb-3">Software Development</h5>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Backend Development:</strong> API data access and business logic</li>
                            <li>• <strong className="text-white">Full-Stack Applications:</strong> Database integration in web apps</li>
                            <li>• <strong className="text-white">Microservices:</strong> Data layer for distributed systems</li>
                            <li>• <strong className="text-white">Real-time Systems:</strong> Streaming data and event processing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What is RDBMS */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🗂️ What is RDBMS?</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      An <strong className="text-white">RDBMS (Relational Database Management System)</strong> is a software system that manages relational databases and provides an interface for users to interact with the data using SQL. 
                      The "relational" part means that data is stored in tables (also called relations) that can be linked to each other based on common fields.
                    </p>
                    
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-4">Understanding the Relational Model</h4>
                      <p className="text-gray-300 mb-4">
                        The relational model was introduced by Edgar F. Codd in 1970 while working at IBM. His groundbreaking paper "A Relational Model of Data for Large Shared Data Banks" revolutionized how we think about data storage. 
                        The key insight was organizing data into tables where each row represents a record and each column represents an attribute.
                      </p>
                      <p className="text-gray-300">
                        Unlike earlier database models (hierarchical and network), the relational model&apos;s simplicity and mathematical foundation made it intuitive and powerful. 
                        Today, relational databases power the majority of business applications worldwide.
                      </p>
                    </div>
                  
                    <div className="bg-gray-900 p-6 rounded-xl mb-6">
                      <h3 className="text-xl font-bold text-white mb-4">Core Characteristics of RDBMS</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-bold text-yellow-400 mb-2">1. Tables (Relations)</p>
                          <p className="text-gray-300 text-sm pl-4">
                            Data is organized in two-dimensional tables consisting of rows (records/tuples) and columns (fields/attributes). 
                            Each table represents an entity like "Customers", "Products", or "Orders". For example, a Students table might have columns for StudentID, Name, Email, and Age.
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-yellow-400 mb-2">2. Primary Key</p>
                          <p className="text-gray-300 text-sm pl-4">
                            A unique identifier for each row in a table. No two rows can have the same primary key value, and it cannot be NULL. 
                            Think of it like your social security number or student ID - it uniquely identifies you in the system. In a Students table, StudentID would be the primary key.
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-yellow-400 mb-2">3. Foreign Key</p>
                          <p className="text-gray-300 text-sm pl-4">
                            A field in one table that refers to the primary key in another table, creating relationships between tables. 
                            This is how we connect related data. For example, an Orders table might have a CustomerID foreign key that links to the Customers table, 
                            showing which customer placed each order.
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-yellow-400 mb-2">4. Relationships</p>
                          <p className="text-gray-300 text-sm pl-4">
                            RDBMS supports three types of relationships: <strong className="text-white">One-to-One</strong> (one person has one passport), 
                            <strong className="text-white"> One-to-Many</strong> (one customer places many orders), and 
                            <strong className="text-white"> Many-to-Many</strong> (students enroll in many courses, courses have many students - requires a junction table).
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-yellow-400 mb-2">5. Normalization</p>
                          <p className="text-gray-300 text-sm pl-4">
                            The process of organizing data to reduce redundancy and improve data integrity. Instead of storing customer name in every order record, 
                            we store it once in a Customers table and reference it by CustomerID. This saves space and ensures consistency.
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-yellow-400 mb-2">6. ACID Properties</p>
                          <p className="text-gray-300 text-sm pl-4">
                            Guarantees that database transactions are processed reliably: <strong className="text-white">Atomicity</strong> (all or nothing), 
                            <strong className="text-white"> Consistency</strong> (valid state to valid state), 
                            <strong className="text-white"> Isolation</strong> (concurrent transactions don&apos;t interfere), and 
                            <strong className="text-white"> Durability</strong> (committed data is never lost). Critical for banking, e-commerce, and any system requiring data reliability.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">📌 Practical Example: University Database</h3>
                      <p className="text-gray-300 mb-4">
                        Let&apos;s see how tables work together in a real-world scenario. Imagine a university tracking students, courses, and enrollments:
                      </p>
                      <div className="space-y-3 text-gray-300 text-sm">
                        <div className="bg-gray-800 p-4 rounded">
                          <p className="font-bold text-white mb-2">Students Table</p>
                          <pre className="text-gray-300 font-mono text-xs">
{`StudentID | Name          | Age | Email
----------|---------------|-----|-------------------
1         | Alice Johnson | 20  | alice@uni.edu
2         | Bob Smith     | 21  | bob@uni.edu
3         | Carol Davis   | 19  | carol@uni.edu`}
                          </pre>
                        </div>
                        <div className="bg-gray-800 p-4 rounded">
                          <p className="font-bold text-white mb-2">Courses Table</p>
                          <pre className="text-gray-300 font-mono text-xs">
{`CourseID | CourseName           | Credits
---------|----------------------|--------
101      | Database Systems     | 4
102      | Web Development      | 3
103      | Data Structures      | 4`}
                          </pre>
                        </div>
                        <div className="bg-gray-800 p-4 rounded">
                          <p className="font-bold text-white mb-2">Enrollments Table (Junction Table)</p>
                          <pre className="text-gray-300 font-mono text-xs">
{`EnrollmentID | StudentID | CourseID | Grade
-------------|-----------|----------|------
1            | 1         | 101      | A
2            | 1         | 102      | B+
3            | 2         | 101      | A-
4            | 3         | 103      | B`}
                          </pre>
                        </div>
                        <p className="text-gray-300 mt-4">
                          <strong className="text-white">Explanation:</strong> StudentID in Enrollments table is a foreign key referencing Students table. 
                          CourseID is a foreign key referencing Courses table. This structure allows us to track which students are enrolled in which courses, 
                          without duplicating student or course information. If we need to update a student&apos;s email, we only update it in one place!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Learn SQL */}
                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🚀 Why Should We Learn SQL?</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    SQL is essential across various technologies and industries:
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">Data Science & Analytics</h3>
                      <p className="text-gray-300 text-sm">Querying large datasets, data cleaning, generating insights and reports</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">Machine Learning & AI</h3>
                      <p className="text-gray-300 text-sm">Data preparation, cleaning, transformation for ML models</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">Web Development</h3>
                      <p className="text-gray-300 text-sm">Managing user data, transactions, content in Django, Node.js, Rails</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">Cloud & Big Data</h3>
                      <p className="text-gray-300 text-sm">Cloud databases (AWS RDS, Azure SQL), Big Data (Apache Hive)</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">Backend Development</h3>
                      <p className="text-gray-300 text-sm">API development, server-side logic, data persistence</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">Blockchain</h3>
                      <p className="text-gray-300 text-sm">Managing off-chain data alongside decentralized systems</p>
                    </div>
                  </div>
                </div>

                {/* Popular SQL Databases */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">💾 Popular SQL Databases</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">MySQL</h3>
                      <p className="text-gray-300 mb-2">Open-source, free, commonly used in web apps</p>
                      <p className="text-sm text-gray-400">✅ Speed & community support | ❌ Less enterprise features</p>
                    </div>

                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">PostgreSQL</h3>
                      <p className="text-gray-300 mb-2">Open-source, advanced features, JSON & GIS support</p>
                      <p className="text-sm text-gray-400">✅ Reliability & standards | ❌ Slower for simple reads</p>
                    </div>

                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">SQL Server (Microsoft)</h3>
                      <p className="text-gray-300 mb-2">Enterprise-grade, strong business intelligence tools</p>
                      <p className="text-sm text-gray-400">✅ Microsoft ecosystem | ❌ Windows-focused, paid</p>
                    </div>

                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">Oracle Database</h3>
                      <p className="text-gray-300 mb-2">Enterprise-grade, used by Fortune 500 companies</p>
                      <p className="text-sm text-gray-400">✅ Scalability & security | ❌ Expensive licensing</p>
                    </div>
                  </div>
                </div>

                {/* Advantages & Disadvantages */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">⚖️ Advantages & Disadvantages</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-4">✅ Advantages</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong>Simplicity:</strong> Easy to learn</li>
                        <li>• <strong>Consistency:</strong> ACID properties</li>
                        <li>• <strong>Security:</strong> Role-based access, encryption</li>
                        <li>• <strong>Concurrency:</strong> Multiple users simultaneously</li>
                        <li>• <strong>Portability:</strong> Same SQL across databases</li>
                      </ul>
                    </div>

                    <div className="bg-red-900/20 border border-red-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-red-400 mb-4">❌ Disadvantages</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong>Cost:</strong> Commercial RDBMS can be expensive</li>
                        <li>• <strong>Complexity at Scale:</strong> Large data better with NoSQL</li>
                        <li>• <strong>Performance:</strong> Poor schema design = slow queries</li>
                        <li>• <strong>Hardware:</strong> Large databases need powerful servers</li>
                        <li>• <strong>Rigid Schema:</strong> Structure changes can be difficult</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'basic-commands':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="basic-commands" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ SQL Basics
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master fundamental SQL concepts and basic database operations
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* SQL Fundamentals */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🔧 SQL Basic Commands & Operations</h2>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg mb-6">
                    <h4 className="text-xl font-bold text-blue-300 mb-4">🎯 Understanding SQL Command Structure</h4>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      SQL commands follow a specific structure and syntax rules. Understanding these fundamentals is crucial for writing effective database queries.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">SQL Command Anatomy:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Keywords:</strong> Reserved words like SELECT, FROM, WHERE (case-insensitive)</li>
                        <li>• <strong className="text-white">Clauses:</strong> Components that specify different aspects of the operation</li>
                        <li>• <strong className="text-white">Expressions:</strong> Values, column names, functions, or calculations</li>
                        <li>• <strong className="text-white">Operators:</strong> Symbols for comparisons, arithmetic, and logical operations</li>
                        <li>• <strong className="text-white">Semicolon:</strong> Terminates SQL statements (optional in some systems)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">SQL Command Categories</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong className="text-white">DDL (Data Definition):</strong> CREATE, ALTER, DROP</li>
                        <li>• <strong className="text-white">DML (Data Manipulation):</strong> INSERT, UPDATE, DELETE</li>
                        <li>• <strong className="text-white">DQL (Data Query):</strong> SELECT (most important)</li>
                        <li>• <strong className="text-white">DCL (Data Control):</strong> GRANT, REVOKE</li>
                        <li>• <strong className="text-white">TCL (Transaction Control):</strong> COMMIT, ROLLBACK</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">Best Practices</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong className="text-white">Use UPPERCASE</strong> for keywords (readability)</li>
                        <li>• <strong className="text-white">Indent properly</strong> for complex queries</li>
                        <li>• <strong className="text-white">Use meaningful aliases</strong> for tables and columns</li>
                        <li>• <strong className="text-white">Comment complex logic</strong> for documentation</li>
                        <li>• <strong className="text-white">Test queries</strong> on small datasets first</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* SELECT Statements */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-lg mb-6">
                    <h2 className="text-3xl font-bold text-green-300 mb-4">🔍 SELECT Statements - The Heart of SQL</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      The SELECT statement is the foundation of SQL and the most frequently used command. It allows you to retrieve, filter, sort, and manipulate data from database tables with incredible precision and flexibility.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">SELECT Statement Power:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Data Retrieval:</strong> Extract specific data from one or multiple tables</li>
                        <li>• <strong className="text-white">Data Transformation:</strong> Calculate new values, format output, combine columns</li>
                        <li>• <strong className="text-white">Data Filtering:</strong> Use conditions to get exactly what you need</li>
                        <li>• <strong className="text-white">Data Aggregation:</strong> Summarize data with functions like SUM, COUNT, AVG</li>
                        <li>• <strong className="text-white">Data Joining:</strong> Combine data from multiple related tables</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Basic SELECT Operations</h3>
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- Select all columns from a table
SELECT * FROM Students;

-- Select specific columns
SELECT Name, Age FROM Students;

-- Select with column aliases
SELECT 
    first_name AS "First Name",
    last_name AS "Last Name",
    salary AS "Annual Salary"
FROM employees;

-- Select with calculations
SELECT 
    Name,
    Marks,
    Marks * 1.1 AS "Bonus Marks"
FROM Students;

-- Select with DISTINCT to remove duplicates
SELECT DISTINCT department FROM employees;

-- Select with LIMIT to restrict results
SELECT * FROM Students LIMIT 10;

-- Select with OFFSET for pagination
SELECT * FROM Students LIMIT 10 OFFSET 20;`}
                    </pre>
                  </div>
                </div>

                {/* WHERE Clause */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg mb-6">
                    <h2 className="text-3xl font-bold text-blue-300 mb-4">🎯 WHERE Clause - Precision Data Filtering</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      The WHERE clause is the precision tool of SQL that allows you to filter rows based on specific conditions. It's like having a sophisticated search function that can find exactly the data you need from millions of records.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">WHERE Clause Capabilities:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Conditional Filtering:</strong> Use comparison operators (=, {'>'}, {'<'}, {'>='}, {'<='}, !=)</li>
                        <li>• <strong className="text-white">Pattern Matching:</strong> LIKE operator with wildcards (% and _)</li>
                        <li>• <strong className="text-white">Range Filtering:</strong> BETWEEN operator for value ranges</li>
                        <li>• <strong className="text-white">List Filtering:</strong> IN operator for multiple values</li>
                        <li>• <strong className="text-white">Null Handling:</strong> IS NULL and IS NOT NULL for missing data</li>
                        <li>• <strong className="text-white">Logical Operations:</strong> AND, OR, NOT for complex conditions</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- Basic WHERE conditions
SELECT * FROM Students WHERE Age > 18;

-- Multiple conditions with AND/OR
SELECT * FROM Students 
WHERE Age > 18 AND Marks > 50;

SELECT * FROM Students 
WHERE department = 'Engineering' OR department = 'Marketing';

-- Using IN for multiple values
SELECT * FROM Students 
WHERE CourseID IN (101, 102, 103);

-- Pattern matching with LIKE
SELECT * FROM Students 
WHERE Name LIKE 'A%';  -- Names starting with A

-- NULL value handling
SELECT * FROM Students 
WHERE phone_number IS NULL;

-- Range conditions with BETWEEN
SELECT * FROM Students 
WHERE Age BETWEEN 18 AND 25;`}
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-white mb-3">Comparison Operators</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">=</code> - Equal to</li>
                        <li>• <code className="text-white">!=</code> or <code className="text-white">&lt;&gt;</code> - Not equal</li>
                        <li>• <code className="text-white">&gt;</code> - Greater than</li>
                        <li>• <code className="text-white">&lt;</code> - Less than</li>
                        <li>• <code className="text-white">&gt;=</code> - Greater or equal</li>
                        <li>• <code className="text-white">&lt;=</code> - Less or equal</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-white mb-3">Logical Operators</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">AND</code> - Both conditions true</li>
                        <li>• <code className="text-white">OR</code> - Either condition true</li>
                        <li>• <code className="text-white">NOT</code> - Negate condition</li>
                        <li>• <code className="text-white">IN</code> - Value in list</li>
                        <li>• <code className="text-white">LIKE</code> - Pattern matching</li>
                        <li>• <code className="text-white">BETWEEN</code> - Range of values</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ORDER BY */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">ORDER BY (Sorting Results)</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The ORDER BY clause sorts results in ascending (ASC) or descending (DESC) order.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- Sort by single column (ascending by default)
SELECT * FROM Students ORDER BY Name;

-- Sort in descending order
SELECT Name, Marks FROM Students ORDER BY Marks DESC;

-- Sort by multiple columns
SELECT * FROM Students 
ORDER BY department ASC, Marks DESC;

-- Combine with LIMIT for top results
SELECT Name, Marks
FROM Students
ORDER BY Marks DESC
LIMIT 5;`}
                    </pre>
                  </div>
                </div>

                {/* Aggregate Functions */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">SQL Aggregate Functions</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Aggregate functions perform calculations on multiple rows and return a single result.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- COUNT() - Count number of rows
SELECT COUNT(*) FROM Students;
SELECT COUNT(DISTINCT department) FROM Students;

-- SUM() - Total of numeric column
SELECT SUM(Marks) FROM Students;

-- AVG() - Average value
SELECT AVG(Marks) FROM Students;

-- MIN() / MAX() - Smallest/largest value
SELECT MIN(Age), MAX(Age) FROM Students;

-- Multiple aggregates together
SELECT 
    COUNT(*) AS total_students,
    AVG(Marks) AS average_marks,
    MIN(Marks) AS min_marks,
    MAX(Marks) AS max_marks
FROM Students;`}
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-white mb-3">Common Functions</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">COUNT()</code> - Count rows</li>
                        <li>• <code className="text-white">SUM()</code> - Sum values</li>
                        <li>• <code className="text-white">AVG()</code> - Average values</li>
                        <li>• <code className="text-white">MIN()</code> - Minimum value</li>
                        <li>• <code className="text-white">MAX()</code> - Maximum value</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-white mb-3">Use Cases</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Total sales in a month</li>
                        <li>• Average customer rating</li>
                        <li>• Number of active users</li>
                        <li>• Highest/lowest prices</li>
                        <li>• Statistical analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* GROUP BY and HAVING */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">GROUP BY & HAVING</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    GROUP BY groups rows and allows aggregate functions on each group.
                    HAVING filters groups after aggregation.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- GROUP BY - Group data by column
SELECT CourseID, COUNT(*) AS StudentCount
FROM Students
GROUP BY CourseID;

-- GROUP BY with multiple columns
SELECT department, job_title, COUNT(*) AS employee_count
FROM employees
GROUP BY department, job_title;

-- HAVING - Filter grouped results
SELECT CourseID, AVG(Marks) AS AvgMarks
FROM Students
GROUP BY CourseID
HAVING AVG(Marks) > 70;

-- Combine WHERE and HAVING
SELECT department, AVG(salary) AS avg_salary
FROM employees
WHERE hire_date >= '2020-01-01'
GROUP BY department
HAVING AVG(salary) > 60000;`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">📌 Key Difference</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>• <strong>WHERE</strong> → Filters individual rows (before grouping)</li>
                      <li>• <strong>HAVING</strong> → Filters grouped results (after grouping)</li>
                    </ul>
                  </div>
                </div>

                {/* INSERT, UPDATE, DELETE */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">Data Manipulation (DML)</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Learn to insert, update, and delete data in database tables.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- INSERT - Add new rows
INSERT INTO Students (StudentID, Name, Age)
VALUES (1, 'John', 20);

-- INSERT multiple rows
INSERT INTO Students (StudentID, Name, Age)
VALUES 
    (2, 'Alice', 19),
    (3, 'Bob', 21);

-- INSERT from SELECT
INSERT INTO Students_Backup
SELECT * FROM Students WHERE Age > 18;

-- UPDATE - Modify existing rows
UPDATE Students 
SET Age = 21
WHERE StudentID = 1;

-- UPDATE multiple columns
UPDATE Students 
SET Age = 22, Marks = 95
WHERE Name = 'John';

-- DELETE - Remove rows
DELETE FROM Students 
WHERE StudentID = 1;

-- DELETE with condition
DELETE FROM Students 
WHERE Age < 18;

-- ⚠️ WARNING: Delete all rows (use carefully!)
DELETE FROM Students;`}
                    </pre>
                  </div>

                  <div className="bg-red-900/30 border border-red-500 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-red-400 mb-3">⚠️ Safety Tips</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Always use WHERE clause with UPDATE/DELETE</li>
                      <li>• Test with SELECT before UPDATE/DELETE</li>
                      <li>• Use transactions for critical operations</li>
                      <li>• Backup data before bulk operations</li>
                      <li>• Use LIMIT for safety when needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'joins':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="joins" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ Intermediate SQL
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master joins, subqueries, and advanced querying techniques
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* Introduction to JOINS */}
                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🔗 Advanced SQL JOINs & Relationships</h2>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg mb-6">
                    <h4 className="text-xl font-bold text-blue-300 mb-4">🎯 Understanding Relational Database Theory</h4>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      JOINs are the cornerstone of relational database operations, enabling the combination of data from multiple tables based on logical relationships. 
                      Understanding JOIN theory is essential for efficient data retrieval and complex business logic implementation.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">JOIN Fundamentals:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Cartesian Product:</strong> Mathematical foundation of all JOIN operations</li>
                        <li>• <strong className="text-white">Relationship Types:</strong> One-to-One, One-to-Many, Many-to-Many</li>
                        <li>• <strong className="text-white">Join Conditions:</strong> How tables are logically connected</li>
                        <li>• <strong className="text-white">Performance Impact:</strong> Understanding JOIN execution costs</li>
                        <li>• <strong className="text-white">Optimization Strategies:</strong> Index usage and query planning</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      One of the most powerful features of relational databases is the ability to establish relationships between tables. 
                      <strong className="text-white"> SQL JOINs</strong> are the mechanism that allows us to combine data from two or more tables based on related columns between them. 
                      This is the essence of "relational" in Relational Database Management System (RDBMS).
                    </p>
                    
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Why Do We Need JOINs?</h3>
                      <div className="space-y-4 text-gray-300">
                        <p className="leading-relaxed">
                          In a well-designed database, we follow the principle of <strong className="text-white">normalization</strong> - storing each piece of information only once to avoid redundancy. 
                          This means related data is split across multiple tables. For example, instead of storing customer details (name, address, phone) with every order, 
                          we store customer information in a Customers table and just reference the CustomerID in the Orders table.
                        </p>
                        <p className="leading-relaxed">
                          However, when we need to retrieve meaningful information like "Show me all orders with customer names and addresses", 
                          we need to <strong className="text-white">JOIN</strong> the Orders table with the Customers table. This is where JOINs become essential.
                        </p>
                      </div>
                    </div>
                  
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">Real-World Analogy</h3>
                      <p className="text-gray-300 mb-4">
                        Imagine you&apos;re organizing a school event. You have two lists:
                      </p>
                      <ul className="text-gray-300 space-y-2 pl-4">
                        <li>• <strong className="text-white">List A:</strong> Student names and their student IDs</li>
                        <li>• <strong className="text-white">List B:</strong> Student IDs and their course enrollments</li>
                      </ul>
                      <p className="text-gray-300 mt-3">
                        To find out which student is enrolled in which course, you need to <strong className="text-white">match</strong> the Student ID from both lists. 
                        That&apos;s exactly what a JOIN does - it matches records from different tables based on a common field!
                      </p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Understanding the JOIN Condition</h3>
                      <p className="text-gray-300 mb-4">
                        The <code className="text-white bg-gray-800 px-2 py-1 rounded">ON</code> clause specifies how tables should be matched. 
                        Typically, you join on a <strong className="text-white">foreign key</strong> (in one table) that references a <strong className="text-white">primary key</strong> (in another table).
                      </p>
                      <div className="bg-gray-800 p-4 rounded">
                        <p className="text-sm text-gray-400 mb-2">Sample Tables:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-white font-bold mb-2">Students Table</p>
                            <pre className="text-gray-300 font-mono text-xs">
{`StudentID | Name
----------|------------
1         | Alice
2         | Bob
3         | Carol`}
                            </pre>
                          </div>
                          <div>
                            <p className="text-white font-bold mb-2">Enrollments Table</p>
                            <pre className="text-gray-300 font-mono text-xs">
{`StudentID | CourseName
----------|------------
1         | Math
1         | Physics
2         | Math`}
                            </pre>
                          </div>
                        </div>
                        <p className="text-gray-300 mt-4 text-sm">
                          <strong className="text-white">Key Point:</strong> StudentID appears in both tables - this is our <strong className="text-white">join column</strong>. 
                          We use it to connect related information from both tables.
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-blue-300 mb-3">🎯 Types of JOINs Overview</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong className="text-white">INNER JOIN:</strong> Returns only matching rows from both tables (intersection)</li>
                        <li>• <strong className="text-white">LEFT JOIN:</strong> Returns all rows from left table + matching rows from right table</li>
                        <li>• <strong className="text-white">RIGHT JOIN:</strong> Returns all rows from right table + matching rows from left table</li>
                        <li>• <strong className="text-white">FULL OUTER JOIN:</strong> Returns all rows from both tables (union of LEFT and RIGHT JOIN)</li>
                        <li>• <strong className="text-white">CROSS JOIN:</strong> Returns Cartesian product (all possible combinations)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* INNER JOIN */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">1. INNER JOIN - The Most Common JOIN</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      <strong className="text-white">INNER JOIN</strong> (often just called JOIN) returns only the rows where there is a match in BOTH tables based on the join condition. 
                      If a row in the left table has no matching row in the right table (or vice versa), that row will NOT appear in the result set.
                    </p>
                    
                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-blue-300 mb-3">🎯 When to Use INNER JOIN</h4>
                      <p className="text-gray-300 mb-3">Use INNER JOIN when you want to find records that have relationships in both tables. Common scenarios:</p>
                      <ul className="text-gray-300 space-y-2 pl-4">
                        <li>• Show customers who have placed orders (exclude customers with no orders)</li>
                        <li>• Display students enrolled in courses (exclude students not taking any courses)</li>
                        <li>• List products that have been sold (exclude products with zero sales)</li>
                        <li>• Find employees assigned to departments (exclude unassigned employees)</li>
                      </ul>
                    </div>
                  
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Basic INNER JOIN Example</h3>
                      <p className="text-gray-300 mb-4">
                        Let&apos;s say we have a Students table and an Enrollments table. We want to see which students are enrolled in which courses.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT Students.Name, Enrollments.CourseName
FROM Students
INNER JOIN Enrollments ON Students.StudentID = Enrollments.StudentID;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`Name          | CourseName
--------------|------------------
Alice         | Database Systems
Alice         | Web Development
Bob           | Database Systems
Bob           | Data Structures

(4 rows returned)

Explanation:
- Alice (StudentID=1) is enrolled in 2 courses → 2 rows
- Bob (StudentID=2) is enrolled in 2 courses → 2 rows
- Carol (StudentID=3) has NO enrollments → 0 rows (excluded!)
- Note: Carol doesn't appear because INNER JOIN only shows matches`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">INNER JOIN with Table Aliases</h3>
                      <p className="text-gray-300 mb-4">
                        Table aliases (short names like &apos;s&apos; for Students, &apos;e&apos; for Enrollments) make queries shorter and more readable. 
                        This is especially important when joining multiple tables or when table names are long.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT s.Name, s.Age, e.CourseName, e.Grade
FROM Students s
INNER JOIN Enrollments e ON s.StudentID = e.StudentID
WHERE s.Age > 18;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`Name          | Age | CourseName         | Grade
--------------|-----|--------------------|------
Alice         | 20  | Database Systems   | A
Alice         | 20  | Web Development    | B+
Bob           | 21  | Database Systems   | A-
Bob           | 21  | Data Structures    | B

(4 rows returned)

Explanation:
- Only students aged > 18 who are enrolled in courses
- Each enrollment creates a separate row
- Table aliases (s, e) make the query cleaner and easier to read`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Joining Multiple Tables</h3>
                      <p className="text-gray-300 mb-4">
                        Real-world databases often require joining three or more tables. For example, to show student names, course names, and instructor names, 
                        you might join Students → Enrollments → Courses → Instructors. Each JOIN connects two tables at a time.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT s.Name AS StudentName, 
       c.CourseName, 
       i.InstructorName
FROM Students s
INNER JOIN Enrollments e ON s.StudentID = e.StudentID
INNER JOIN Courses c ON e.CourseID = c.CourseID
INNER JOIN Instructors i ON c.InstructorID = i.InstructorID;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`StudentName   | CourseName         | InstructorName
--------------|--------------------|-----------------
Alice         | Database Systems   | Dr. Smith
Alice         | Web Development    | Prof. Johnson
Bob           | Database Systems   | Dr. Smith
Bob           | Data Structures    | Dr. Williams

(4 rows returned)

Explanation:
Step 1: Join Students + Enrollments (match StudentID)
Step 2: Join result + Courses (match CourseID)
Step 3: Join result + Instructors (match InstructorID)
Only rows with matches in ALL four tables appear in final result`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">💡 Key Takeaways - INNER JOIN</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>✓ Returns only matching rows (intersection of both tables)</li>
                        <li>✓ Most restrictive JOIN type - excludes non-matching rows</li>
                        <li>✓ Default JOIN type (you can omit INNER keyword and just use JOIN)</li>
                        <li>✓ Best for finding relationships that definitely exist</li>
                        <li>✓ Can significantly reduce result set size</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* LEFT JOIN */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">2. LEFT JOIN (LEFT OUTER JOIN)</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      <strong className="text-white">LEFT JOIN</strong> (also called LEFT OUTER JOIN) returns ALL rows from the left table (the table mentioned first), 
                      and the matching rows from the right table. When there&apos;s no match in the right table, NULL values are returned for all right table columns.
                    </p>
                    
                    <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-300 mb-3">🎯 When to Use LEFT JOIN</h4>
                      <p className="text-gray-300 mb-3">
                        Use LEFT JOIN when you want to preserve all records from the primary (left) table, regardless of whether they have matching records in the secondary (right) table. 
                        This is crucial for:
                      </p>
                      <ul className="text-gray-300 space-y-2 pl-4">
                        <li>• Finding records WITHOUT matches (e.g., customers who haven&apos;t placed any orders)</li>
                        <li>• Getting complete lists with optional related data (e.g., all students, showing courses if enrolled)</li>
                        <li>• Identifying gaps in data (e.g., products never sold, employees not assigned to projects)</li>
                        <li>• Maintaining the full context from the primary table</li>
                      </ul>
                    </div>
                  
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Basic LEFT JOIN Example</h3>
                      <p className="text-gray-300 mb-4">
                        Scenario: We want to see ALL students and their course enrollments. Students without enrollments should still appear in the result with NULL for course information.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT Students.Name, Enrollments.CourseName
FROM Students
LEFT JOIN Enrollments ON Students.StudentID = Enrollments.StudentID;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`Name          | CourseName
--------------|------------------
Alice         | Database Systems
Alice         | Web Development
Bob           | Database Systems
Bob           | Data Structures
Carol         | NULL
David         | NULL

(6 rows returned)

Explanation:
- Alice has 2 enrollments → 2 rows with course names
- Bob has 2 enrollments → 2 rows with course names
- Carol has NO enrollments → 1 row with NULL (still appears!)
- David has NO enrollments → 1 row with NULL (still appears!)
- LEFT JOIN preserves ALL students from left table`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Finding Non-Matching Records</h3>
                      <p className="text-gray-300 mb-4">
                        A powerful use of LEFT JOIN is to find records that DON&apos;T have matches. By checking for NULL values in the right table&apos;s columns, 
                        we can identify orphaned or unrelated records. This is commonly used for data quality checks and finding gaps.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`-- Find students who are NOT enrolled in any course
SELECT s.Name, s.Email
FROM Students s
LEFT JOIN Enrollments e ON s.StudentID = e.StudentID
WHERE e.StudentID IS NULL;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`Name          | Email
--------------|-------------------
Carol         | carol@uni.edu
David         | david@uni.edu

(2 rows returned)

Explanation:
- LEFT JOIN includes all students
- WHERE e.StudentID IS NULL filters to only students with NO enrollments
- This is called an "anti-join" pattern - finding non-matches
- Very useful for data quality checks and identifying gaps`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">LEFT JOIN with Aggregate Functions</h3>
                      <p className="text-gray-300 mb-4">
                        You can combine LEFT JOIN with COUNT to show how many related records each main record has, including zero counts. 
                        This is perfect for reports showing "Number of orders per customer" or "Number of courses per student".
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT s.Name, COUNT(e.CourseID) AS CourseCount
FROM Students s
LEFT JOIN Enrollments e ON s.StudentID = e.StudentID
GROUP BY s.StudentID, s.Name
ORDER BY CourseCount DESC;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`Name          | CourseCount
--------------|-------------
Alice         | 2
Bob           | 2
Carol         | 0
David         | 0

(4 rows returned)

Explanation:
- COUNT(e.CourseID) counts matching enrollments for each student
- Students with no enrollments show 0 (not excluded)
- If we used INNER JOIN, Carol and David wouldn't appear at all
- LEFT JOIN ensures we see ALL students with their course counts`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">💡 Key Takeaways - LEFT JOIN</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>✓ Preserves ALL rows from the left table</li>
                        <li>✓ Returns NULL for non-matching right table columns</li>
                        <li>✓ Perfect for finding records without relationships</li>
                        <li>✓ Use WHERE column IS NULL to find non-matches</li>
                        <li>✓ Most common type of OUTER JOIN</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* RIGHT JOIN */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">3. RIGHT JOIN (RIGHT OUTER JOIN)</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      <strong className="text-white">RIGHT JOIN</strong> is the mirror opposite of LEFT JOIN. It returns ALL rows from the right table (the table mentioned second), 
                      and the matching rows from the left table. When there&apos;s no match in the left table, NULL values are returned for all left table columns.
                    </p>
                    
                    <div className="bg-orange-900/20 border border-orange-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-orange-300 mb-3">💡 Important Note</h4>
                      <p className="text-gray-300">
                        RIGHT JOIN is less commonly used than LEFT JOIN because you can achieve the same result by swapping the table order and using LEFT JOIN. 
                        For example, <code className="text-white bg-gray-800 px-2 py-1 rounded">A RIGHT JOIN B</code> is equivalent to <code className="text-white bg-gray-800 px-2 py-1 rounded">B LEFT JOIN A</code>. 
                        However, understanding RIGHT JOIN helps you read queries written by others and provides flexibility in query construction.
                      </p>
                    </div>
                  
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">RIGHT JOIN Example</h3>
                      <p className="text-gray-300 mb-4">
                        Scenario: We want to see ALL courses and which students are enrolled. Courses with no students should still appear with NULL for student information.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT e.CourseName, s.Name AS StudentName
FROM Students s
RIGHT JOIN Enrollments e ON s.StudentID = e.StudentID;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`CourseName         | StudentName
-------------------|-------------
Database Systems   | Alice
Web Development    | Alice
Database Systems   | Bob
Data Structures    | Bob
Machine Learning   | NULL
Calculus II        | NULL

(6 rows returned)

Explanation:
- All 6 courses appear in the result (right table preserved)
- Courses with enrolled students show student names
- Courses with NO enrolled students show NULL for StudentName
- Machine Learning and Calculus II have no students enrolled
- RIGHT JOIN ensures ALL courses are shown`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Finding Empty Courses</h3>
                      <p className="text-gray-300 mb-4">
                        Just like LEFT JOIN, we can use RIGHT JOIN with WHERE IS NULL to find records in the right table that have no matches in the left table.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`-- Find courses with NO students enrolled
SELECT e.CourseName, e.Credits
FROM Students s
RIGHT JOIN Enrollments e ON s.StudentID = e.StudentID
WHERE s.StudentID IS NULL;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`CourseName         | Credits
-------------------|--------
Machine Learning   | 4
Calculus II        | 3

(2 rows returned)

Explanation:
- Only courses with NO enrolled students
- WHERE s.StudentID IS NULL filters out courses that have students
- Useful for identifying underutilized courses
- Administration can decide to cancel or promote these courses`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">💡 Key Takeaways - RIGHT JOIN</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>✓ Preserves ALL rows from the right table</li>
                        <li>✓ Returns NULL for non-matching left table columns</li>
                        <li>✓ Mirror image of LEFT JOIN</li>
                        <li>✓ Can be rewritten as LEFT JOIN by swapping tables</li>
                        <li>✓ Less commonly used but still important to understand</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* FULL OUTER JOIN */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">4. FULL OUTER JOIN - Complete Data View</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      <strong className="text-white">FULL OUTER JOIN</strong> (or simply FULL JOIN) is the most inclusive type of JOIN. 
                      It returns ALL rows from BOTH tables - combining the results of LEFT JOIN and RIGHT JOIN. When there&apos;s no match, 
                      NULL values are returned for the non-matching table&apos;s columns.
                    </p>
                    
                    <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-300 mb-3">🎯 When to Use FULL OUTER JOIN</h4>
                      <p className="text-gray-300 mb-3">Use FULL OUTER JOIN when you need a complete picture of all data from both tables:</p>
                      <ul className="text-gray-300 space-y-2 pl-4">
                        <li>• Finding mismatches and gaps in data (records that exist in one table but not the other)</li>
                        <li>• Data reconciliation and synchronization between systems</li>
                        <li>• Audit reports showing all entities regardless of relationships</li>
                        <li>• Identifying orphaned records in either table</li>
                      </ul>
                    </div>
                  
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">FULL OUTER JOIN Example</h3>
                      <p className="text-gray-300 mb-4">
                        Scenario: Show ALL students and ALL courses, displaying matches where they exist and NULL where they don&apos;t.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT s.Name AS StudentName, e.CourseName
FROM Students s
FULL OUTER JOIN Enrollments e ON s.StudentID = e.StudentID;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`StudentName   | CourseName
--------------|------------------
Alice         | Database Systems
Alice         | Web Development
Bob           | Database Systems
Bob           | Data Structures
Carol         | NULL
David         | NULL
NULL          | Machine Learning
NULL          | Calculus II

(8 rows returned)

Explanation:
- Alice & Bob with enrollments → show with course names
- Carol & David with NO enrollments → show with NULL courses
- Machine Learning & Calculus II with NO students → show with NULL students
- FULL OUTER JOIN = LEFT JOIN + RIGHT JOIN combined
- Complete view of all students AND all courses`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-300 mb-3">⚠️ Important: MySQL Limitation</h4>
                      <p className="text-gray-300">
                        <strong className="text-white">Note:</strong> MySQL does not support FULL OUTER JOIN directly. However, you can simulate it by combining LEFT JOIN and RIGHT JOIN with UNION:
                      </p>
                      <div className="bg-gray-950 p-4 rounded mt-3">
                        <pre className="text-white font-mono text-sm">
{`-- FULL OUTER JOIN workaround for MySQL
SELECT s.Name, e.CourseName FROM Students s
LEFT JOIN Enrollments e ON s.StudentID = e.StudentID
UNION
SELECT s.Name, e.CourseName FROM Students s
RIGHT JOIN Enrollments e ON s.StudentID = e.StudentID;`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">💡 Key Takeaways - FULL OUTER JOIN</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>✓ Returns ALL rows from BOTH tables</li>
                        <li>✓ Most inclusive JOIN type</li>
                        <li>✓ NULLs appear for non-matching sides</li>
                        <li>✓ Perfect for data reconciliation and gap analysis</li>
                        <li>✓ Not supported in MySQL (use UNION workaround)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CROSS JOIN */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">5. CROSS JOIN - Cartesian Product</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      <strong className="text-white">CROSS JOIN</strong> produces the <strong className="text-white">Cartesian product</strong> of two tables. 
                      This means every row from the first table is combined with every row from the second table. If Table A has 3 rows and Table B has 4 rows, 
                      the result will have 3 × 4 = 12 rows!
                    </p>
                    
                    <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-red-300 mb-3">⚠️ Warning: CROSS JOIN Can Be Dangerous!</h4>
                      <p className="text-gray-300 mb-3">
                        CROSS JOIN doesn&apos;t use an ON clause because it doesn&apos;t match rows - it combines ALL possible pairs. 
                        This can result in HUGE result sets. For example:
                      </p>
                      <ul className="text-gray-300 space-y-2 pl-4">
                        <li>• 1,000 rows × 1,000 rows = 1,000,000 rows!</li>
                        <li>• Can cause memory issues and slow performance</li>
                        <li>• Usually unintentional (forgetting JOIN condition)</li>
                        <li>• Use with extreme caution</li>
                      </ul>
                    </div>
                  
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">CROSS JOIN Example</h3>
                      <p className="text-gray-300 mb-4">
                        Scenario: Generate all possible combinations of students and courses (every student paired with every course).
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT s.Name, c.CourseName
FROM Students s
CROSS JOIN Courses c;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output (assuming 3 students and 4 courses):</p>
                        <pre className="text-green-200 font-mono text-xs">
{`Name          | CourseName
--------------|------------------
Alice         | Database Systems
Alice         | Web Development
Alice         | Data Structures
Alice         | Machine Learning
Bob           | Database Systems
Bob           | Web Development
Bob           | Data Structures
Bob           | Machine Learning
Carol         | Database Systems
Carol         | Web Development
Carol         | Data Structures
Carol         | Machine Learning

(12 rows returned = 3 students × 4 courses)

Explanation:
- Each student appears 4 times (once for each course)
- Each course appears 3 times (once for each student)
- Total combinations = 3 × 4 = 12 rows
- No matching logic - just all possible pairs`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Practical Use Cases for CROSS JOIN</h3>
                      <p className="text-gray-300 mb-4">
                        Although rarely used, CROSS JOIN has legitimate applications:
                      </p>
                      <div className="space-y-4">
                        <div className="bg-gray-950 p-4 rounded">
                          <p className="text-white font-bold mb-2">1. Generating Test Data</p>
                          <p className="text-gray-300 text-sm mb-3">Create all possible combinations for testing scenarios</p>
                          <pre className="text-white font-mono text-xs">
{`-- Generate all size-color combinations for products
SELECT s.size, c.color
FROM sizes s CROSS JOIN colors c;

-- Output: Small-Red, Small-Blue, Medium-Red, Medium-Blue, etc.`}
                          </pre>
                        </div>
                        <div className="bg-gray-950 p-4 rounded">
                          <p className="text-white font-bold mb-2">2. Calendar Generation</p>
                          <p className="text-gray-300 text-sm mb-3">Create a complete date range by combining dates with time slots</p>
                          <pre className="text-white font-mono text-xs">
{`-- Generate hourly schedule for a week
SELECT d.date, t.time_slot
FROM dates d CROSS JOIN time_slots t;`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">💡 Key Takeaways - CROSS JOIN</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>✓ Produces Cartesian product (all possible combinations)</li>
                        <li>✓ No ON clause needed (no matching logic)</li>
                        <li>✓ Result size = Table1 rows × Table2 rows</li>
                        <li>✓ Rarely used in practice</li>
                        <li>✓ Can create very large result sets - use with caution!</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Multiple JOINs */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Multiple JOINs</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    You can join more than two tables in a single query.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- Join three tables
SELECT 
    s.Name,
    c.CourseName,
    d.DepartmentName
FROM Students s
INNER JOIN Courses c ON s.StudentID = c.StudentID
INNER JOIN Departments d ON c.DepartmentID = d.DepartmentID;

-- Mix different JOIN types
SELECT 
    e.first_name,
    e.last_name,
    d.department_name,
    p.project_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
LEFT JOIN projects p ON e.id = p.employee_id
WHERE e.salary > 60000;`}
                    </pre>
                  </div>
                </div>

                {/* Introduction to Subqueries */}
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 Introduction to Subqueries</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    A <strong>Subquery</strong> (or nested query) is a query inside another SQL query.
                    It helps break complex problems into smaller steps.
                  </p>
                  
                  <div className="bg-gray-800 p-6 rounded-xl">
                    <ul className="text-gray-300 space-y-2">
                      <li>• <strong>Outer Query:</strong> The main query</li>
                      <li>• <strong>Inner Query (Subquery):</strong> Executed first, result used by outer query</li>
                      <li>• Can appear in SELECT, FROM, or WHERE clauses</li>
                    </ul>
                  </div>
                </div>

                {/* Subqueries in WHERE */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Subqueries in WHERE Clause</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Used for filtering based on another query's result.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- Find students with above-average marks
SELECT Name, Marks
FROM Students
WHERE Marks > (SELECT AVG(Marks) FROM Students);

-- Find students enrolled in Math
SELECT Name 
FROM Students
WHERE StudentID IN (
    SELECT StudentID 
    FROM Courses 
    WHERE CourseName = 'Math'
);

-- Using EXISTS
SELECT Name
FROM Students s
WHERE EXISTS (
    SELECT 1 
    FROM Courses c 
    WHERE c.StudentID = s.StudentID
);`}
                    </pre>
                  </div>
                </div>

                {/* Subqueries in SELECT */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Subqueries in SELECT Clause</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Compute values on the fly for each row.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- Count enrolled courses for each student
SELECT 
    Name,
    (SELECT COUNT(*) 
     FROM Courses c 
     WHERE c.StudentID = s.StudentID) AS EnrolledCourses
FROM Students s;

-- Show salary difference from company average
SELECT 
    first_name,
    last_name,
    salary,
    salary - (SELECT AVG(salary) FROM employees) AS salary_difference
FROM employees;`}
                    </pre>
                  </div>
                </div>

                {/* Subqueries in FROM */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Subqueries in FROM Clause</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Acts like a temporary table (also called inline view or derived table).
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- Use subquery result as a table
SELECT Temp.StudentID, Temp.TotalCourses
FROM (
    SELECT StudentID, COUNT(*) AS TotalCourses
    FROM Courses
    GROUP BY StudentID
) Temp
WHERE Temp.TotalCourses > 2;

-- Department statistics
SELECT department, avg_salary, employee_count
FROM (
    SELECT 
        department,
        AVG(salary) AS avg_salary,
        COUNT(*) AS employee_count
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE avg_salary > 60000;`}
                    </pre>
                  </div>
                </div>

                {/* Correlated vs Non-Correlated */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Correlated vs Non-Correlated Subqueries</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Non-Correlated Subquery</h3>
                      <p className="text-gray-300 mb-3">Independent query. Executes once.</p>
                      <div className="bg-gray-900 p-4 rounded">
                        <pre className="text-white font-mono text-sm overflow-x-auto">
{`SELECT Name
FROM Students
WHERE Age > (
    SELECT AVG(Age) 
    FROM Students
);`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Correlated Subquery</h3>
                      <p className="text-gray-300 mb-3">Dependent on outer query. Runs per row.</p>
                      <div className="bg-gray-900 p-4 rounded">
                        <pre className="text-white font-mono text-sm overflow-x-auto">
{`SELECT Name
FROM Students s
WHERE EXISTS (
    SELECT 1
    FROM Courses c
    WHERE c.StudentID = s.StudentID
);`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/30 border border-yellow-500 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">⚡ Performance Note</h4>
                    <p className="text-gray-300">Correlated subqueries are slower because they execute multiple times (once per row). Use JOINs when possible for better performance.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'window-functions':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="window-functions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ Advanced SQL
              </h1>
              <p className="text-lg text-gray-300 mb-8 text-center">
                Master advanced SQL concepts including Window Functions, CTEs, Set Operations, and more
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* Window Functions */}
                <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🔮 Window Functions - Advanced Analytics</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      <strong className="text-white">Window functions</strong> (also called <strong className="text-white">analytic functions</strong>) are one of the most powerful features in modern SQL. 
                      They perform calculations across a set of table rows that are somehow related to the current row, similar to aggregate functions, 
                      but <strong className="text-white">WITHOUT collapsing rows into groups</strong>. This means you can see both individual row details AND aggregate calculations in the same result set!
                    </p>

                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-4">Why Are Window Functions Revolutionary?</h4>
                      <div className="space-y-3 text-gray-300">
                        <p><strong className="text-white">Traditional Problem:</strong> With GROUP BY, you lose individual row details. For example, if you group employees by department to get average salary, you can&apos;t see individual employee names anymore.</p>
                        <p><strong className="text-white">Window Function Solution:</strong> You can show each employee&apos;s name AND salary alongside the department&apos;s average salary - all in one query without losing detail!</p>
                        <p><strong className="text-white">The &quot;Window&quot; Concept:</strong> The term &quot;window&quot; refers to the set of rows the function operates on. You define this window using PARTITION BY (like GROUP BY) and ORDER BY clauses, but rows remain separate in the output.</p>
                      </div>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-blue-300 mb-3">💡 Key Components of Window Functions</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <h5 className="font-bold text-white mb-2">Window Function Anatomy:</h5>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <code className="text-white bg-gray-800 px-2 py-1 rounded text-xs">OVER()</code> - Defines the window scope</li>
                            <li>• <code className="text-white bg-gray-800 px-2 py-1 rounded text-xs">PARTITION BY</code> - Creates groups without collapsing</li>
                            <li>• <code className="text-white bg-gray-800 px-2 py-1 rounded text-xs">ORDER BY</code> - Sorts rows within partitions</li>
                            <li>• <code className="text-white bg-gray-800 px-2 py-1 rounded text-xs">ROWS/RANGE</code> - Defines frame boundaries</li>
                          </ul>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <h5 className="font-bold text-white mb-2">Window Function Types:</h5>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Ranking:</strong> ROW_NUMBER(), RANK(), DENSE_RANK()</li>
                            <li>• <strong className="text-white">Aggregate:</strong> SUM(), AVG(), COUNT() OVER()</li>
                            <li>• <strong className="text-white">Value:</strong> LAG(), LEAD(), FIRST_VALUE()</li>
                            <li>• <strong className="text-white">Statistical:</strong> PERCENT_RANK(), CUME_DIST()</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-300 mb-3">🚀 Window Functions vs Traditional Approaches</h4>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h5 className="font-bold text-white mb-2">Traditional GROUP BY Limitations:</h5>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-red-400">Data Loss:</strong> Individual row details are lost when grouping</li>
                          <li>• <strong className="text-red-400">Multiple Queries:</strong> Need separate queries for different aggregations</li>
                          <li>• <strong className="text-red-400">Complex Joins:</strong> Requires self-joins for comparison calculations</li>
                          <li>• <strong className="text-red-400">Performance:</strong> Multiple passes through data</li>
                        </ul>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg mt-4">
                        <h5 className="font-bold text-white mb-2">Window Functions Advantages:</h5>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-green-400">Preserve Details:</strong> Keep individual rows while adding calculations</li>
                          <li>• <strong className="text-green-400">Single Query:</strong> Multiple calculations in one statement</li>
                          <li>• <strong className="text-green-400">No Self-Joins:</strong> Direct access to related rows</li>
                          <li>• <strong className="text-green-400">Performance:</strong> Optimized execution plans</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Ranking Window Functions</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Ranking functions assign a rank or row number to each row within a partition of a result set. They are essential for finding &quot;top N&quot; records, 
                      handling ties, and creating leaderboards or rankings.
                    </p>

                    <div className="bg-gray-900 p-6 rounded-xl mb-6">
                      <h4 className="text-xl font-bold text-yellow-400 mb-4">Understanding the Differences</h4>
                      <div className="space-y-4 text-gray-300">
                        <div>
                          <p className="font-bold text-white mb-2">ROW_NUMBER()</p>
                          <p className="text-sm">Assigns a unique sequential integer to each row, even if there are ties. If two employees have the same salary, they get different row numbers (1, 2, not 1, 1).</p>
                        </div>
                        <div>
                          <p className="font-bold text-white mb-2">RANK()</p>
                          <p className="text-sm">Assigns the same rank to tied values, then skips numbers. For example: 1, 2, 2, 4 (skips 3 because two rows tied for 2nd place).</p>
                        </div>
                        <div>
                          <p className="font-bold text-white mb-2">DENSE_RANK()</p>
                          <p className="text-sm">Like RANK but doesn&apos;t skip numbers. For example: 1, 2, 2, 3 (no gaps in ranking).</p>
                        </div>
                        <div>
                          <p className="font-bold text-white mb-2">NTILE(n)</p>
                          <p className="text-sm">Distributes rows into n equal-sized groups (quartiles, percentiles). NTILE(4) creates 4 groups, NTILE(100) creates percentiles.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-yellow-400 mb-4">Ranking Functions Example</h4>
                      <p className="text-gray-300 mb-4">
                        Let&apos;s rank employees by salary to demonstrate how different ranking functions behave with tied values:
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT 
    first_name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
    RANK() OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank,
    NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM employees;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`first_name | salary | row_num | rank | dense_rank | quartile
-----------|--------|---------|------|------------|----------
Alice      | 95000  | 1       | 1    | 1          | 1
Bob        | 90000  | 2       | 2    | 2          | 1
Charlie    | 90000  | 3       | 2    | 2          | 2
David      | 85000  | 4       | 4    | 3          | 2
Eva        | 80000  | 5       | 5    | 4          | 3
Frank      | 75000  | 6       | 6    | 5          | 3
Grace      | 70000  | 7       | 7    | 6          | 4
Henry      | 65000  | 8       | 8    | 7          | 4

(8 rows returned)

Explanation:
ROW_NUMBER: 1,2,3,4,5,6,7,8 - Unique numbers even for ties
RANK: 1,2,2,4,5,6,7,8 - Bob & Charlie tied at 2, skips 3
DENSE_RANK: 1,2,2,3,4,5,6,7 - Bob & Charlie tied at 2, NO skip
NTILE(4): Divides 8 rows into 4 groups of 2 each (quartiles)
Notice: Bob and Charlie have same salary (90000) - see how each function handles this!`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-yellow-400 mb-4">PARTITION BY - Grouping Without Collapsing</h4>
                      <p className="text-gray-300 mb-4">
                        PARTITION BY divides the result set into partitions and the window function is applied to each partition independently. 
                        Think of it as creating separate &quot;mini-tables&quot; for each group, then ranking within each group.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`-- Rank employees within their department
SELECT 
    department,
    first_name,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`department  | first_name | salary | dept_rank
------------|------------|--------|----------
Engineering | Alice      | 95000  | 1
Engineering | Bob        | 90000  | 2
Engineering | Charlie    | 85000  | 3
Sales       | David      | 80000  | 1
Sales       | Eva        | 75000  | 2
Sales       | Frank      | 70000  | 3
HR          | Grace      | 72000  | 1
HR          | Henry      | 68000  | 2

(8 rows returned)

Explanation:
- PARTITION BY department creates 3 separate groups
- Ranking resets to 1 for each department
- Alice is #1 in Engineering, David is #1 in Sales, Grace is #1 in HR
- Each department has its own independent ranking
- All individual rows preserved (no grouping collapse)`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Aggregate Window Functions</h3>
                    <div className="space-y-6">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        You can use traditional aggregate functions (SUM, AVG, COUNT, MIN, MAX) as window functions. The key difference is that with window functions, 
                        <strong className="text-white"> you keep all the individual rows</strong> while also showing aggregate calculations. This is impossible with regular GROUP BY.
                      </p>

                      <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-blue-300 mb-3">🎯 When to Use Aggregate Window Functions</h4>
                        <ul className="text-gray-300 space-y-2 pl-4">
                          <li>• Compare individual values to group averages (e.g., employee salary vs department average)</li>
                          <li>• Calculate running totals (cumulative sums)</li>
                          <li>• Show individual and aggregate data simultaneously</li>
                          <li>• Create percentage calculations (individual / total * 100)</li>
                        </ul>
                      </div>

                      <div className="bg-gray-900 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4">Individual vs Department Average</h4>
                        <p className="text-gray-300 mb-4">
                          Classic use case: Show each employee&apos;s salary alongside their department&apos;s average salary so you can see who&apos;s above or below average.
                        </p>
                        <div className="bg-gray-950 p-4 rounded mb-3">
                          <pre className="text-white font-mono text-sm">
{`SELECT 
    first_name,
    salary,
    department,
    AVG(salary) OVER (PARTITION BY department) AS dept_avg,
    salary - AVG(salary) OVER (PARTITION BY department) AS diff_from_avg
FROM employees;`}
                          </pre>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                          <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                          <pre className="text-green-200 font-mono text-xs">
{`first_name | salary | department  | dept_avg | diff_from_avg
-----------|--------|-------------|----------|---------------
Alice      | 95000  | Engineering | 90000    | +5000
Bob        | 90000  | Engineering | 90000    | 0
Charlie    | 85000  | Engineering | 90000    | -5000
David      | 80000  | Sales       | 75000    | +5000
Eva        | 75000  | Sales       | 75000    | 0
Frank      | 70000  | Sales       | 75000    | -5000
Grace      | 72000  | HR          | 70000    | +2000
Henry      | 68000  | HR          | 70000    | -2000

(8 rows returned)

Explanation:
- Each row shows individual salary AND department average
- diff_from_avg shows how much above/below department average
- Engineering avg = (95000+90000+85000)/3 = 90000
- Sales avg = (80000+75000+70000)/3 = 75000
- Impossible with GROUP BY - window functions preserve all rows!`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4">Running Total (Cumulative Sum)</h4>
                        <p className="text-gray-300 mb-4">
                          A running total shows the cumulative sum up to the current row. Perfect for tracking cumulative sales, expenses, or any sequential accumulation. 
                          This is achieved by ordering rows and summing from the first row to the current row.
                        </p>
                        <div className="bg-gray-950 p-4 rounded mb-3">
                          <pre className="text-white font-mono text-sm">
{`SELECT 
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;`}
                          </pre>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                          <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                          <pre className="text-green-200 font-mono text-xs">
{`order_date  | amount | running_total
------------|--------|---------------
2024-01-01  | 100    | 100
2024-01-02  | 150    | 250
2024-01-03  | 200    | 450
2024-01-04  | 175    | 625
2024-01-05  | 225    | 850

(5 rows returned)

Explanation:
- Row 1: 100 (just first row)
- Row 2: 100 + 150 = 250 (sum of first two rows)
- Row 3: 100 + 150 + 200 = 450 (sum of first three rows)
- Row 4: previous total + 175 = 625
- Row 5: previous total + 225 = 850
- Shows cumulative total growing with each row`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Value Window Functions (LAG, LEAD, FIRST_VALUE, LAST_VALUE)</h3>
                    <div className="space-y-6">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Value window functions allow you to access data from other rows in the result set without using a self-join. 
                        This is extremely powerful for comparing current row values with previous/next rows or with the first/last values in a partition.
                      </p>

                      <div className="bg-gray-900 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4">Understanding LAG and LEAD</h4>
                        <div className="space-y-4 text-gray-300">
                          <p><strong className="text-white">LAG(column, offset)</strong> - Accesses data from a PREVIOUS row (looking backward)</p>
                          <p><strong className="text-white">LEAD(column, offset)</strong> - Accesses data from a NEXT row (looking forward)</p>
                          <p className="text-sm">The offset parameter specifies how many rows back/forward. LAG(salary, 1) gets previous row&apos;s salary, LAG(salary, 2) gets 2 rows back.</p>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4">LAG and LEAD Example</h4>
                        <p className="text-gray-300 mb-4">
                          Calculate month-over-month sales growth by comparing each month&apos;s sales with the previous month:
                        </p>
                        <div className="bg-gray-950 p-4 rounded mb-3">
                          <pre className="text-white font-mono text-sm">
{`SELECT 
    month,
    sales,
    LAG(sales, 1) OVER (ORDER BY month) AS prev_month_sales,
    sales - LAG(sales, 1) OVER (ORDER BY month) AS growth
FROM monthly_sales;`}
                          </pre>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                          <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                          <pre className="text-green-200 font-mono text-xs">
{`month   | sales  | prev_month_sales | growth
--------|--------|------------------|--------
2024-01 | 10000  | NULL             | NULL
2024-02 | 12000  | 10000            | +2000
2024-03 | 11500  | 12000            | -500
2024-04 | 13500  | 11500            | +2000
2024-05 | 15000  | 13500            | +1500

(5 rows returned)

Explanation:
- January: No previous month → prev_month_sales is NULL
- February: sales=12000, prev=10000, growth = 12000-10000 = +2000
- March: sales=11500, prev=12000, growth = 11500-12000 = -500 (decrease!)
- LAG looks at the previous row in the ordered set
- Perfect for trend analysis and period-over-period comparisons`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4">FIRST_VALUE and LAST_VALUE</h4>
                        <p className="text-gray-300 mb-4">
                          These functions return the first or last value in an ordered partition. Useful for comparing each row against the highest/lowest value, 
                          or finding the difference from the baseline (first value).
                        </p>
                        <div className="bg-gray-950 p-4 rounded mb-3">
                          <pre className="text-white font-mono text-sm">
{`SELECT 
    first_name,
    salary,
    FIRST_VALUE(salary) OVER (ORDER BY salary DESC) AS highest_salary,
    LAST_VALUE(salary) OVER (
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS lowest_salary,
    salary - LAST_VALUE(salary) OVER (
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS difference_from_lowest
FROM employees;`}
                          </pre>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                          <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                          <pre className="text-green-200 font-mono text-xs">
{`first_name | salary | highest_salary | lowest_salary | difference_from_lowest
-----------|--------|----------------|---------------|----------------------
Alice      | 95000  | 95000          | 65000         | 30000
Bob        | 90000  | 95000          | 65000         | 25000
Charlie    | 85000  | 95000          | 65000         | 20000
David      | 80000  | 95000          | 65000         | 15000
Eva        | 75000  | 95000          | 65000         | 10000
Frank      | 70000  | 95000          | 65000         | 5000
Henry      | 65000  | 95000          | 65000         | 0

(7 rows returned)

Explanation:
- highest_salary = 95000 (Alice) appears on every row
- lowest_salary = 65000 (Henry) appears on every row
- Each row shows how much more they earn than the lowest-paid employee
- ROWS BETWEEN... clause ensures LAST_VALUE considers all rows
- Useful for salary range analysis and compensation benchmarking`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">Window Function Types</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong>Ranking:</strong> ROW_NUMBER, RANK, DENSE_RANK</li>
                        <li>• <strong>Aggregate:</strong> SUM, AVG, COUNT, MIN, MAX</li>
                        <li>• <strong>Value:</strong> LAG, LEAD, FIRST_VALUE, LAST_VALUE</li>
                        <li>• <strong>Distribution:</strong> NTILE, PERCENT_RANK</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">Key Features</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• No GROUP BY needed</li>
                        <li>• PARTITION BY divides rows into groups</li>
                        <li>• ORDER BY defines row order</li>
                        <li>• Can combine multiple window functions</li>
                        <li>• Powerful for analytics and reporting</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Common Table Expressions */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📝 Common Table Expressions (CTEs)</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      A <strong className="text-white">Common Table Expression (CTE)</strong> is a temporary named result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. 
                      CTEs are defined using the <code className="text-white bg-gray-800 px-2 py-1 rounded">WITH</code> clause and exist only for the duration of the query.
                    </p>

                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-4">Why Use CTEs?</h4>
                      <div className="space-y-3 text-gray-300">
                        <p><strong className="text-white">1. Improved Readability:</strong> Break complex queries into logical, named steps. Instead of nested subqueries that are hard to read, CTEs make your SQL code more like a readable program with clear steps.</p>
                        <p><strong className="text-white">2. Code Reusability:</strong> Define a result set once and reference it multiple times in the same query. This reduces code duplication and makes maintenance easier.</p>
                        <p><strong className="text-white">3. Recursive Queries:</strong> CTEs support recursion, enabling queries on hierarchical data like organizational charts, file systems, or category trees - something impossible with regular subqueries!</p>
                        <p><strong className="text-white">4. Better Than Subqueries:</strong> For complex queries, CTEs are more maintainable than deeply nested subqueries. They also improve query optimization in many database systems.</p>
                      </div>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-blue-300 mb-3">💡 CTE vs Subquery vs Temporary Table</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-gray-800 p-3 rounded">
                          <p className="font-bold text-white mb-1">CTE</p>
                          <p className="text-gray-300">• Exists only during query<br/>• More readable<br/>• Can be recursive<br/>• Not stored physically</p>
                        </div>
                        <div className="bg-gray-800 p-3 rounded">
                          <p className="font-bold text-white mb-1">Subquery</p>
                          <p className="text-gray-300">• Inline, anonymous<br/>• Can be hard to read<br/>• No recursion<br/>• Used once</p>
                        </div>
                        <div className="bg-gray-800 p-3 rounded">
                          <p className="font-bold text-white mb-1">Temp Table</p>
                          <p className="text-gray-300">• Physically stored<br/>• Persists in session<br/>• Can be indexed<br/>• More overhead</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">Basic CTE Example</h3>
                    <p className="text-gray-300 mb-4">
                      A basic CTE allows you to define a named subquery at the beginning of your SQL statement, then reference it as if it were a table. 
                      This makes complex queries much more readable by separating logic into distinct, named steps.
                    </p>
                    <div className="bg-gray-950 p-4 rounded mb-3">
                      <pre className="text-white font-mono text-sm">
{`WITH department_stats AS (
    SELECT 
        department,
        COUNT(*) AS employee_count,
        AVG(salary) AS avg_salary,
        MAX(salary) AS max_salary
    FROM employees
    GROUP BY department
)
SELECT 
    department,
    employee_count,
    ROUND(avg_salary, 2) AS avg_salary,
    max_salary
FROM department_stats
WHERE avg_salary > 60000
ORDER BY avg_salary DESC;`}
                      </pre>
                    </div>
                    <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                      <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                      <pre className="text-green-200 font-mono text-xs">
{`department  | employee_count | avg_salary | max_salary
------------|----------------|------------|------------
Engineering | 15             | 85000.00   | 120000
Sales       | 12             | 72000.00   | 95000
Marketing   | 8              | 68000.00   | 85000

(3 rows returned)

Explanation:
Step 1: CTE calculates stats for each department
Step 2: Main query filters departments with avg > 60000
- IT and HR departments excluded (avg_salary <= 60000)
- Results sorted by average salary descending
- CTE makes the query easier to understand vs nested subquery`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">Multiple CTEs - Chaining Logic</h3>
                    <p className="text-gray-300 mb-4">
                      You can define multiple CTEs in a single query, separated by commas. Each CTE can reference CTEs defined before it, 
                      allowing you to build complex logic step-by-step. This creates a clear data transformation pipeline.
                    </p>
                    <div className="bg-gray-950 p-4 rounded mb-3">
                      <pre className="text-white font-mono text-sm">
{`WITH 
    -- Step 1: Filter high earners
    high_earners AS (
        SELECT * FROM employees WHERE salary > 80000
    ),
    -- Step 2: Calculate stats per department (uses high_earners CTE)
    department_totals AS (
        SELECT 
            department,
            COUNT(*) AS high_earner_count,
            AVG(salary) AS avg_high_earner_salary
        FROM high_earners
        GROUP BY department
    )
-- Step 3: Query the final result
SELECT 
    dt.department,
    dt.high_earner_count,
    ROUND(dt.avg_high_earner_salary, 2) AS avg_salary
FROM department_totals dt
ORDER BY dt.high_earner_count DESC;`}
                      </pre>
                    </div>
                    <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                      <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                      <pre className="text-green-200 font-mono text-xs">
{`department  | high_earner_count | avg_salary
------------|-------------------|------------
Engineering | 8                 | 95000.00
Sales       | 5                 | 87500.00
Marketing   | 3                 | 85000.00

(3 rows returned)

Explanation:
Step 1: high_earners CTE filters employees earning > 80000
Step 2: department_totals CTE groups high_earners by department
Step 3: Final SELECT queries department_totals and sorts by count
- Engineering has 8 employees earning > 80000 (avg of those 8 = 95000)
- Sales has 5 high earners (avg = 87500)
- HR department excluded (0 employees earning > 80000)
- CTEs create a clear, readable data pipeline`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">Recursive CTE - Hierarchical Data</h3>
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed">
                        <strong className="text-white">Recursive CTEs</strong> are one of SQL&apos;s most powerful features. They allow you to query hierarchical or tree-structured data 
                        by <strong className="text-white">calling themselves</strong> repeatedly until a condition is met. This is essential for organizational charts, bill of materials, 
                        file systems, category trees, and any parent-child relationships.
                      </p>

                      <div className="bg-gray-800 p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-white mb-3">How Recursive CTEs Work</h4>
                        <div className="space-y-3 text-gray-300 text-sm">
                          <p><strong className="text-white">1. Anchor Member (Base Case):</strong> The initial query that returns the starting point (e.g., top-level managers with no boss)</p>
                          <p><strong className="text-white">2. UNION ALL:</strong> Combines the base case with the recursive case</p>
                          <p><strong className="text-white">3. Recursive Member:</strong> References the CTE itself to get the next level (e.g., employees reporting to managers found in previous iteration)</p>
                          <p><strong className="text-white">4. Termination:</strong> Recursion stops when the recursive member returns no rows (no more children found)</p>
                        </div>
                      </div>

                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <p className="text-gray-400 text-sm mb-2">Example: Build organizational hierarchy showing reporting structure</p>
                        <pre className="text-white font-mono text-sm">
{`WITH RECURSIVE employee_hierarchy AS (
    -- Base case: CEO and top executives (no manager)
    SELECT 
        employee_id,
        first_name,
        manager_id,
        0 AS level,
        first_name AS hierarchy_path
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: find employees reporting to previous level
    SELECT 
        e.employee_id,
        e.first_name,
        e.manager_id,
        eh.level + 1,
        eh.hierarchy_path || ' -> ' || e.first_name
    FROM employees e
    INNER JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT level, first_name, hierarchy_path
FROM employee_hierarchy
ORDER BY level, first_name;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`level | first_name | hierarchy_path
------|------------|--------------------------------
0     | John       | John
1     | Alice      | John -> Alice
1     | Bob        | John -> Bob
2     | Carol      | John -> Alice -> Carol
2     | David      | John -> Alice -> David
2     | Eva        | John -> Bob -> Eva
3     | Frank      | John -> Alice -> Carol -> Frank

(7 rows returned)

Explanation:
Iteration 1 (Base): Finds John (CEO, no manager) at level 0
Iteration 2: Finds Alice & Bob reporting to John (level 1)
Iteration 3: Finds Carol, David, Eva reporting to Alice/Bob (level 2)
Iteration 4: Finds Frank reporting to Carol (level 3)
Iteration 5: No more employees → recursion stops
- Hierarchy path shows complete reporting chain
- Level indicates depth in organization (0=CEO, 1=Direct reports, etc.)`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">CTE Benefits</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Improved query readability</li>
                        <li>• Reusable result sets</li>
                        <li>• Recursive queries support</li>
                        <li>• Complex logic organization</li>
                        <li>• Better than nested subqueries</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">CTE Types</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong>Non-recursive:</strong> Standard CTEs</li>
                        <li>• <strong>Recursive:</strong> WITH RECURSIVE</li>
                        <li>• <strong>Multiple:</strong> Chain several CTEs</li>
                        <li>• <strong>Nested:</strong> CTEs within CTEs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Set Operations */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🔢 SQL Set Operations</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      <strong className="text-white">Set operations</strong> in SQL are based on mathematical set theory and allow you to combine, compare, or contrast the results of two or more SELECT queries. 
                      Think of sets as collections of unique items - set operations let you find unions (combine), intersections (common items), and differences between these collections.
                    </p>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-4">Understanding Set Theory in SQL</h4>
                      <p className="text-gray-300 mb-3">
                        Set operations treat query results as mathematical sets. Just like in mathematics where you can find:
                      </p>
                      <ul className="text-gray-300 space-y-2 pl-4">
                        <li>• <strong className="text-white">Union (A ∪ B):</strong> All elements from both sets</li>
                        <li>• <strong className="text-white">Intersection (A ∩ B):</strong> Only elements present in both sets</li>
                        <li>• <strong className="text-white">Difference (A - B):</strong> Elements in A but not in B</li>
                      </ul>
                      <p className="text-gray-300 mt-3">
                        SQL implements these operations with UNION, INTERSECT, and EXCEPT operators respectively.
                      </p>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-blue-300 mb-3">⚠️ Important Requirements</h4>
                      <p className="text-gray-300 mb-3">For set operations to work, the queries being combined must be <strong className="text-white">union-compatible</strong>:</p>
                      <ul className="text-gray-300 space-y-2 pl-4">
                        <li>• Both queries must return the <strong className="text-white">same number of columns</strong></li>
                        <li>• Corresponding columns must have <strong className="text-white">compatible data types</strong></li>
                        <li>• Column names can be different (result uses first query&apos;s column names)</li>
                        <li>• ORDER BY can only be used at the end of the entire set operation</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-8 rounded-2xl mt-8">
                    <h3 className="text-2xl font-bold text-white mb-6">1. UNION - Combining Sets</h3>
                    <div className="space-y-6">
                      <p className="text-gray-300 leading-relaxed">
                        <strong className="text-white">UNION</strong> combines the results of two or more SELECT statements and <strong className="text-white">removes duplicate rows</strong>. 
                        It&apos;s like merging two lists and ensuring each item appears only once, even if it was in both original lists.
                      </p>

                      <div className="bg-gray-900 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4">UNION Example - Finding All Cities</h4>
                        <p className="text-gray-300 mb-4">
                          Scenario: You want a complete list of cities where you have either customers OR suppliers (or both), with each city listed only once.
                        </p>
                        <div className="bg-gray-950 p-4 rounded mb-3">
                          <pre className="text-white font-mono text-sm">
{`SELECT city FROM customers
UNION
SELECT city FROM suppliers;`}
                          </pre>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                          <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                          <pre className="text-green-200 font-mono text-xs">
{`city
-------------
New York      (in both customers AND suppliers)
Los Angeles   (only in customers)
Chicago       (in both customers AND suppliers)
Houston       (only in suppliers)
Phoenix       (only in customers)

(5 rows returned)

Input Data:
Customers cities: New York, Los Angeles, Chicago, Phoenix, Chicago
Suppliers cities: New York, Chicago, Houston, Chicago

Explanation:
- UNION automatically removes duplicates
- Chicago appeared 3 times total (2 in customers, 1 in suppliers) → shows once
- New York appeared 2 times → shows once
- Result is sorted alphabetically by default in most databases
- Total unique cities = 5`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-8 rounded-2xl mt-8">
                    <h3 className="text-2xl font-bold text-white mb-6">2. UNION ALL - Including Duplicates</h3>
                    <div className="space-y-6">
                      <p className="text-gray-300 leading-relaxed">
                        <strong className="text-white">UNION ALL</strong> combines results just like UNION, but <strong className="text-white">keeps all duplicate rows</strong>. 
                        This is significantly faster than UNION because it doesn&apos;t need to identify and remove duplicates. Use UNION ALL when you know there are no duplicates or when you want to keep them.
                      </p>

                      <div className="bg-gray-900 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4">UNION ALL Example</h4>
                        <p className="text-gray-300 mb-4">
                          Same query as before, but keeping duplicates to see total occurrences:
                        </p>
                        <div className="bg-gray-950 p-4 rounded mb-3">
                          <pre className="text-white font-mono text-sm">
{`SELECT city FROM customers
UNION ALL
SELECT city FROM suppliers;`}
                          </pre>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                          <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                          <pre className="text-green-200 font-mono text-xs">
{`city
-------------
New York      (from customers)
Los Angeles   (from customers)
Chicago       (from customers)
Phoenix       (from customers)
Chicago       (from customers - duplicate!)
New York      (from suppliers)
Chicago       (from suppliers - another duplicate!)
Houston       (from suppliers)

(8 rows returned)

Input Data:
Customers: New York, Los Angeles, Chicago, Phoenix, Chicago (5 rows)
Suppliers: New York, Chicago, Houston (3 rows)

Explanation:
- UNION ALL keeps ALL rows including duplicates
- Chicago appears 3 times (2 from customers, 1 from suppliers)
- New York appears 2 times (1 from each table)
- Total rows = 5 + 3 = 8 (simple concatenation)
- Much faster than UNION (no duplicate checking)
- Use when duplicates are acceptable or when you know data is already unique`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-purple-300 mb-3">⚡ Performance Comparison</h4>
                        <div className="text-gray-300 space-y-2">
                          <p><strong className="text-white">UNION:</strong> Slower - Must sort and compare all rows to remove duplicates</p>
                          <p><strong className="text-white">UNION ALL:</strong> Faster - Simply appends result sets without checking for duplicates</p>
                          <p className="text-sm mt-3">
                            💡 Best Practice: Use UNION ALL when possible, and only use UNION when you specifically need to eliminate duplicates. 
                            For large datasets, UNION can be significantly slower.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-8 rounded-2xl mt-8">
                    <h3 className="text-2xl font-bold text-white mb-6">3. INTERSECT - Finding Common Elements</h3>
                    <div className="space-y-6">
                      <p className="text-gray-300 leading-relaxed">
                        <strong className="text-white">INTERSECT</strong> returns only the rows that are present in BOTH query results - the intersection of two sets. 
                        This is perfect for finding commonalities: customers who are also suppliers, students enrolled in both Spring AND Fall semesters, 
                        products available in both online AND physical stores.
                      </p>

                      <div className="bg-gray-900 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4">INTERSECT Example</h4>
                        <p className="text-gray-300 mb-4">
                          Scenario: Find cities where we have BOTH customers AND suppliers (overlap):
                        </p>
                        <div className="bg-gray-950 p-4 rounded mb-3">
                          <pre className="text-white font-mono text-sm">
{`SELECT city FROM customers
INTERSECT
SELECT city FROM suppliers;`}
                          </pre>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                          <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                          <pre className="text-green-200 font-mono text-xs">
{`city
-------------
New York
Chicago

(2 rows returned)

Input Data:
Customers cities: New York, Los Angeles, Chicago, Phoenix
Suppliers cities: New York, Chicago, Houston, Seattle

Explanation:
- New York: Present in BOTH customers AND suppliers ✓
- Chicago: Present in BOTH customers AND suppliers ✓
- Los Angeles: Only in customers ✗
- Phoenix: Only in customers ✗
- Houston: Only in suppliers ✗
- Seattle: Only in suppliers ✗
- INTERSECT returns only cities found in BOTH tables
- Automatically removes duplicates (like UNION)
- Perfect for finding overlapping data`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-blue-300 mb-3">💡 Real-World Applications</h4>
                        <ul className="text-gray-300 space-y-2 text-sm">
                          <li>• Find customers who placed orders in both 2023 AND 2024</li>
                          <li>• Identify products sold in both online AND physical stores</li>
                          <li>• Find students taking both required courses</li>
                          <li>• Discover users active on both mobile AND web platforms</li>
                          <li>• Data reconciliation - ensure same records exist in backup and production</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-8 rounded-2xl mt-8">
                    <h3 className="text-2xl font-bold text-white mb-6">4. EXCEPT (MINUS) - Finding Differences</h3>
                    <div className="space-y-6">
                      <p className="text-gray-300 leading-relaxed">
                        <strong className="text-white">EXCEPT</strong> (called <strong className="text-white">MINUS</strong> in Oracle) returns rows from the first query that are NOT present in the second query. 
                        This is the set difference operation - finding what&apos;s unique to the first set. Essential for identifying gaps, missing data, or exclusive records.
                      </p>

                      <div className="bg-gray-900 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4">EXCEPT Example</h4>
                        <p className="text-gray-300 mb-4">
                          Scenario: Find cities where we have customers but NO suppliers (expansion opportunities):
                        </p>
                        <div className="bg-gray-950 p-4 rounded mb-3">
                          <pre className="text-white font-mono text-sm">
{`SELECT city FROM customers
EXCEPT
SELECT city FROM suppliers;`}
                          </pre>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                          <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                          <pre className="text-green-200 font-mono text-xs">
{`city
-------------
Los Angeles
Phoenix

(2 rows returned)

Input Data:
Customers cities: New York, Los Angeles, Chicago, Phoenix, Miami
Suppliers cities: New York, Chicago, Houston, Seattle

Explanation:
- Los Angeles: In customers, NOT in suppliers ✓ (returned)
- Phoenix: In customers, NOT in suppliers ✓ (returned)
- Miami: In customers, NOT in suppliers ✓ (returned)
- New York: In BOTH → NOT returned ✗
- Chicago: In BOTH → NOT returned ✗
- Houston: Only in suppliers → NOT returned ✗ (wrong direction)
- Seattle: Only in suppliers → NOT returned ✗ (wrong direction)

Business Insight: These are potential markets to find new suppliers!`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4">Direction Matters with EXCEPT</h4>
                        <p className="text-gray-300 mb-4">
                          The order of queries matters! <code className="text-white bg-gray-800 px-2 py-1 rounded">A EXCEPT B</code> is NOT the same as <code className="text-white bg-gray-800 px-2 py-1 rounded">B EXCEPT A</code>:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-950 p-4 rounded">
                            <p className="text-white font-bold mb-2">Customers EXCEPT Suppliers</p>
                            <pre className="text-green-200 font-mono text-xs">
{`Result: Los Angeles, Phoenix, Miami
(Cities with customers but no suppliers)`}
                            </pre>
                          </div>
                          <div className="bg-gray-950 p-4 rounded">
                            <p className="text-white font-bold mb-2">Suppliers EXCEPT Customers</p>
                            <pre className="text-green-200 font-mono text-xs">
{`Result: Houston, Seattle
(Cities with suppliers but no customers)`}
                            </pre>
                          </div>
                        </div>
                        <p className="text-gray-300 mt-4 text-sm">
                          Different questions, different results! Choose the order based on what you&apos;re trying to find.
                        </p>
                      </div>

                      <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-yellow-300 mb-3">💡 Database Compatibility Note</h4>
                        <p className="text-gray-300 text-sm">
                          <strong className="text-white">MySQL:</strong> Does NOT support INTERSECT or EXCEPT. Use INNER JOIN or NOT EXISTS as workarounds.<br/>
                          <strong className="text-white">Oracle:</strong> Uses MINUS instead of EXCEPT (same functionality).<br/>
                          <strong className="text-white">PostgreSQL, SQL Server:</strong> Support all set operations natively.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 p-6 rounded-xl mt-6">
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">📌 Set Operations Summary</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2 text-gray-300">
                        <p><strong className="text-white">UNION:</strong> A ∪ B - All unique rows from both queries</p>
                        <p><strong className="text-white">UNION ALL:</strong> A + B - All rows including duplicates</p>
                        <p><strong className="text-white">INTERSECT:</strong> A ∩ B - Only common rows</p>
                        <p><strong className="text-white">EXCEPT:</strong> A - B - Rows in A but not in B</p>
                      </div>
                      <div className="space-y-2 text-gray-300">
                        <p>✓ All remove duplicates except UNION ALL</p>
                        <p>✓ All require same number of columns</p>
                        <p>✓ ORDER BY goes at the end</p>
                        <p>⚠️ MySQL doesn&apos;t support INTERSECT/EXCEPT</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* String Functions */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📝 SQL String Functions - Text Manipulation</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      <strong className="text-white">String functions</strong> are built-in SQL functions for manipulating and analyzing text data. 
                      They&apos;re essential for data cleaning (removing extra spaces), formatting output (creating full names), searching within text, and transforming string values. 
                      Every database provides these functions, though syntax may vary between MySQL, PostgreSQL, SQL Server, and Oracle.
                    </p>

                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-blue-300 mb-3">🎯 Why String Functions Matter</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <p><strong className="text-white">Data Cleaning:</strong> Real-world data is messy! Remove extra spaces, fix capitalization, standardize formats before analysis.</p>
                        <p><strong className="text-white">User-Friendly Output:</strong> Combine first and last names, format addresses nicely, create readable labels for reports.</p>
                        <p><strong className="text-white">Search Capabilities:</strong> Find patterns within text fields, extract specific portions like area codes or domains.</p>
                        <p><strong className="text-white">Data Validation:</strong> Check string lengths meet requirements, verify formats match patterns.</p>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-yellow-400 mb-4">CONCAT() - Combining Strings</h4>
                      <p className="text-gray-300 mb-4">
                        Joins two or more strings into one. Perfect for creating full names, complete addresses, or formatted labels. If any input is NULL, most databases return NULL.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT 
    first_name,
    last_name,
    CONCAT(first_name, ' ', last_name) AS full_name
FROM employees;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`first_name | last_name | full_name
-----------|-----------|-------------
John       | Doe       | John Doe
Jane       | Smith     | Jane Smith

(2 rows) - Creates formatted display names`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-yellow-400 mb-4">SUBSTRING() - Extract Portions</h4>
                      <p className="text-gray-300 mb-4">
                        Extracts characters from specific positions. Syntax: SUBSTRING(string, start, length). Start is usually 1-based.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT SUBSTRING('Database Systems', 1, 8) AS result;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`result
--------
Database

(Characters 1-8 extracted)`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-yellow-400 mb-4">TRIM() - Remove Whitespace</h4>
                      <p className="text-gray-300 mb-4">
                        Removes leading and trailing spaces. Critical for data cleaning and preventing duplicate entries due to extra spaces.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT TRIM('   SQL   ') AS result;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`result
-----
SQL

(Spaces removed from both ends)`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-yellow-400 mb-4">UPPER() / LOWER() - Case Conversion</h4>
                      <p className="text-gray-300 mb-4">
                        Convert text to uppercase or lowercase. Essential for case-insensitive comparisons and standardizing data.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`SELECT 
    email,
    LOWER(email) AS standardized
FROM users;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`email           | standardized
----------------|------------------
John@Email.COM  | john@email.com
JANE@email.com  | jane@email.com

(Standardized for comparison)`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date & Time Functions */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">SQL Date & Time Functions</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Date and time functions are used for handling and manipulating dates and times.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- NOW() - Current date and time
SELECT NOW();
-- Example: 2025-08-24 09:30:00

-- DATE() - Extract date part
SELECT DATE(NOW());
-- Example: 2025-08-24

-- DATEDIFF() - Days between two dates
SELECT DATEDIFF('2025-12-31', '2025-01-01') AS days;
-- Output: 364

-- DATE_ADD() - Add time interval
SELECT DATE_ADD('2025-08-24', INTERVAL 7 DAY) AS next_week;
-- Output: 2025-08-31

-- DATE_SUB() - Subtract time interval
SELECT DATE_SUB('2025-08-24', INTERVAL 1 MONTH) AS last_month;
-- Output: 2025-07-24

-- YEAR(), MONTH(), DAY() - Extract parts
SELECT 
    YEAR('2025-08-24') AS year,
    MONTH('2025-08-24') AS month,
    DAY('2025-08-24') AS day;
-- Output: 2025, 8, 24

-- DATE_FORMAT() - Format date
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s') AS formatted_date;`}
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">Date Functions</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">NOW()</code> - Current datetime</li>
                        <li>• <code className="text-white">DATE()</code> - Extract date</li>
                        <li>• <code className="text-white">DATEDIFF()</code> - Date difference</li>
                        <li>• <code className="text-white">DATE_ADD()</code> - Add interval</li>
                        <li>• <code className="text-white">DATE_SUB()</code> - Subtract interval</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">Use Cases</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Calculate age from birthdate</li>
                        <li>• Find records in date range</li>
                        <li>• Calculate subscription expiry</li>
                        <li>• Track days since event</li>
                        <li>• Generate date-based reports</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CASE Statements */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">SQL CASE Statements</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    CASE is like an IF-ELSE statement inside SQL queries. It implements conditional logic.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Basic CASE Syntax</h3>
                    <pre className="text-white font-mono text-sm overflow-x-auto">
{`-- Simple CASE statement
SELECT 
    name,
    salary,
    CASE 
        WHEN salary > 80000 THEN 'High'
        WHEN salary BETWEEN 50000 AND 80000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_category
FROM employees;

-- CASE with multiple conditions
SELECT 
    name,
    age,
    marks,
    CASE 
        WHEN marks >= 90 THEN 'A+'
        WHEN marks >= 80 THEN 'A'
        WHEN marks >= 70 THEN 'B'
        WHEN marks >= 60 THEN 'C'
        ELSE 'Fail'
    END AS grade
FROM students;

-- CASE in WHERE clause
SELECT * FROM employees
WHERE 
    CASE 
        WHEN department = 'Sales' THEN salary > 50000
        WHEN department = 'Engineering' THEN salary > 70000
        ELSE salary > 40000
    END;

-- CASE with aggregate functions
SELECT 
    department,
    COUNT(*) AS total_employees,
    COUNT(CASE WHEN salary > 70000 THEN 1 END) AS high_earners,
    ROUND(AVG(salary), 2) AS avg_salary
FROM employees
GROUP BY department;`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">✅ Use Cases</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Categorize data into groups</li>
                      <li>• Implement business logic</li>
                      <li>• Create custom calculations</li>
                      <li>• Handle NULL values</li>
                      <li>• Conditional aggregations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'practice-projects':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="practice-projects" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ Practice Projects
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Build real-world database applications
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-gray-600">
                    <h3 className="text-xl font-bold text-white mb-4">E-commerce Database</h3>
                    <p className="text-gray-300 mb-4">Design and implement a complete e-commerce database with products, orders, customers, and inventory management.</p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Database schema design</li>
                      <li>• Complex relationships</li>
                      <li>• Data integrity constraints</li>
                      <li>• Performance optimization</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-gray-600">
                    <h3 className="text-xl font-bold text-white mb-4">Analytics Dashboard</h3>
                    <p className="text-gray-300 mb-4">Create analytical queries for business intelligence and reporting using advanced SQL features.</p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Window functions</li>
                      <li>• Time series analysis</li>
                      <li>• Customer segmentation</li>
                      <li>• Performance metrics</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-gray-600">
                    <h3 className="text-xl font-bold text-white mb-4">Data Warehouse</h3>
                    <p className="text-gray-300 mb-4">Build a data warehouse with ETL processes and dimensional modeling.</p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Star schema design</li>
                      <li>• ETL processes</li>
                      <li>• Data quality checks</li>
                      <li>• Reporting queries</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'data-types':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="data-types" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ Data Types & Constraints
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Learn about SQL data types and constraints for proper database design
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* SQL Data Types */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 SQL Data Types & Database Design</h2>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg mb-6">
                    <h4 className="text-xl font-bold text-blue-300 mb-4">🎯 Understanding Data Types in Database Design</h4>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      Data types are the foundation of database schema design. They define what kind of data can be stored in each column, 
                      how much space it will occupy, and what operations can be performed on it. Choosing appropriate data types is crucial 
                      for data integrity, performance optimization, and storage efficiency.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">Data Type Selection Principles:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Storage Efficiency:</strong> Choose the smallest type that accommodates your data</li>
                        <li>• <strong className="text-white">Data Integrity:</strong> Prevent invalid data through type constraints</li>
                        <li>• <strong className="text-white">Performance:</strong> Optimize for query speed and indexing</li>
                        <li>• <strong className="text-white">Future-Proofing:</strong> Consider scalability and data growth</li>
                        <li>• <strong className="text-white">Consistency:</strong> Use consistent types across related tables</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-lg mb-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">🔢 Data Type Categories & Characteristics</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h5 className="font-bold text-white mb-2">Storage Characteristics:</h5>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-white">Fixed vs Variable:</strong> CHAR vs VARCHAR storage differences</li>
                          <li>• <strong className="text-white">Precision vs Scale:</strong> DECIMAL precision for financial data</li>
                          <li>• <strong className="text-white">Memory Usage:</strong> How data types affect memory consumption</li>
                          <li>• <strong className="text-white">Index Efficiency:</strong> Impact on index performance</li>
                        </ul>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h5 className="font-bold text-white mb-2">Operational Considerations:</h5>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-white">Sorting & Comparison:</strong> How types affect ORDER BY operations</li>
                          <li>• <strong className="text-white">Mathematical Operations:</strong> Numeric type calculations</li>
                          <li>• <strong className="text-white">String Operations:</strong> Text manipulation capabilities</li>
                          <li>• <strong className="text-white">Date Arithmetic:</strong> Temporal calculations and functions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg mb-4">
                        <h3 className="text-xl font-bold text-green-300 mb-3">🔢 Numeric Data Types</h3>
                        <p className="text-gray-300 text-sm mb-3">
                          Numeric types are fundamental for mathematical operations, financial calculations, and data analysis. 
                          Understanding precision, scale, and storage requirements is crucial for accurate data representation.
                        </p>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <h5 className="font-bold text-white mb-2 text-xs">Key Considerations:</h5>
                          <ul className="text-gray-300 text-xs space-y-1">
                            <li>• <strong className="text-white">Integer Types:</strong> Whole numbers with different ranges</li>
                            <li>• <strong className="text-white">Decimal Types:</strong> Fixed-point for financial precision</li>
                            <li>• <strong className="text-white">Floating Types:</strong> Approximate values for scientific data</li>
                            <li>• <strong className="text-white">Precision Loss:</strong> Understanding floating-point limitations</li>
                          </ul>
                        </div>
                      </div>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">INT</code> - Integer numbers (-2,147,483,648 to 2,147,483,647)</li>
                        <li>• <code className="text-white">BIGINT</code> - Large integer numbers</li>
                        <li>• <code className="text-white">DECIMAL(p,s)</code> - Fixed-point decimal (precision, scale)</li>
                        <li>• <code className="text-white">FLOAT</code> - Floating-point numbers</li>
                        <li>• <code className="text-white">DOUBLE</code> - Double-precision floating-point</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg mb-4">
                        <h3 className="text-xl font-bold text-blue-300 mb-3">📝 String Data Types</h3>
                        <p className="text-gray-300 text-sm mb-3">
                          String types handle textual data with different storage and performance characteristics. 
                          Choosing between fixed and variable length affects storage efficiency and query performance.
                        </p>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <h5 className="font-bold text-white mb-2 text-xs">Storage Optimization:</h5>
                          <ul className="text-gray-300 text-xs space-y-1">
                            <li>• <strong className="text-white">Fixed Length:</strong> CHAR for consistent data lengths</li>
                            <li>• <strong className="text-white">Variable Length:</strong> VARCHAR for space efficiency</li>
                            <li>• <strong className="text-white">Large Text:</strong> TEXT for documents and content</li>
                            <li>• <strong className="text-white">Binary Data:</strong> BLOB for files and media</li>
                          </ul>
                        </div>
                      </div>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">VARCHAR(n)</code> - Variable-length string (max n characters)</li>
                        <li>• <code className="text-white">CHAR(n)</code> - Fixed-length string (n characters)</li>
                        <li>• <code className="text-white">TEXT</code> - Large text data</li>
                        <li>• <code className="text-white">BLOB</code> - Binary large objects</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg mb-4">
                        <h3 className="text-xl font-bold text-purple-300 mb-3">📅 Date & Time Types</h3>
                        <p className="text-gray-300 text-sm mb-3">
                          Temporal data types handle dates, times, and timestamps with different precision levels. 
                          Understanding timezone handling and temporal calculations is essential for business applications.
                        </p>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <h5 className="font-bold text-white mb-2 text-xs">Temporal Considerations:</h5>
                          <ul className="text-gray-300 text-xs space-y-1">
                            <li>• <strong className="text-white">Timezone Awareness:</strong> Handling global applications</li>
                            <li>• <strong className="text-white">Precision Levels:</strong> Seconds, milliseconds, microseconds</li>
                            <li>• <strong className="text-white">Auto-Updating:</strong> TIMESTAMP for audit trails</li>
                            <li>• <strong className="text-white">Date Arithmetic:</strong> Calculations and comparisons</li>
                          </ul>
                        </div>
                      </div>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">DATE</code> - Date (YYYY-MM-DD)</li>
                        <li>• <code className="text-white">TIME</code> - Time (HH:MM:SS)</li>
                        <li>• <code className="text-white">DATETIME</code> - Date and time</li>
                        <li>• <code className="text-white">TIMESTAMP</code> - Auto-updating timestamp</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg mb-4">
                        <h3 className="text-xl font-bold text-orange-300 mb-3">🔘 Boolean & Specialized Types</h3>
                        <p className="text-gray-300 text-sm mb-3">
                          Specialized data types handle boolean logic, structured data, and unique identifiers. 
                          These types provide semantic meaning and validation for specific use cases.
                        </p>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <h5 className="font-bold text-white mb-2 text-xs">Specialized Features:</h5>
                          <ul className="text-gray-300 text-xs space-y-1">
                            <li>• <strong className="text-white">Boolean Logic:</strong> TRUE/FALSE operations</li>
                            <li>• <strong className="text-white">Structured Data:</strong> JSON for flexible schemas</li>
                            <li>• <strong className="text-white">Enumeration:</strong> Predefined value lists</li>
                            <li>• <strong className="text-white">Unique IDs:</strong> UUID for distributed systems</li>
                          </ul>
                        </div>
                      </div>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">BOOLEAN</code> - TRUE/FALSE values</li>
                        <li>• <code className="text-white">JSON</code> - JSON formatted data</li>
                        <li>• <code className="text-white">ENUM</code> - List of predefined values</li>
                        <li>• <code className="text-white">UUID</code> - Universally unique identifier</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Constraints */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg mb-6">
                    <h2 className="text-3xl font-bold text-red-300 mb-4">🔒 SQL Constraints - Data Integrity Guardians</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      Constraints are rules that enforce data integrity and business logic at the database level. They act as guardians 
                      ensuring that data remains consistent, valid, and follows the intended design patterns throughout the database lifecycle.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">Constraint Benefits:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Data Integrity:</strong> Prevent invalid or inconsistent data</li>
                        <li>• <strong className="text-white">Business Rules:</strong> Enforce organizational policies at database level</li>
                        <li>• <strong className="text-white">Referential Integrity:</strong> Maintain relationships between tables</li>
                        <li>• <strong className="text-white">Performance:</strong> Enable query optimization through constraint indexes</li>
                        <li>• <strong className="text-white">Documentation:</strong> Self-documenting database design</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 mb-6">
                    Constraints are rules applied to columns that ensure data integrity and consistency.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Common Constraints</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-lg font-bold text-yellow-400 mb-2">PRIMARY KEY</h4>
                        <p className="text-gray-300 mb-2">Uniquely identifies each row in a table.</p>
                        <pre className="text-white font-mono text-sm">
{`CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50),
    Age INT
);`}
                        </pre>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-lg font-bold text-yellow-400 mb-2">FOREIGN KEY</h4>
                        <p className="text-gray-300 mb-2">Links tables and maintains referential integrity.</p>
                        <pre className="text-white font-mono text-sm">
{`CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);`}
                        </pre>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-lg font-bold text-yellow-400 mb-2">NOT NULL</h4>
                        <p className="text-gray-300 mb-2">Ensures a column cannot have NULL values.</p>
                        <pre className="text-white font-mono text-sm">
{`CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100)
);`}
                        </pre>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-lg font-bold text-yellow-400 mb-2">UNIQUE</h4>
                        <p className="text-gray-300 mb-2">Ensures all values in a column are unique.</p>
                        <pre className="text-white font-mono text-sm">
{`CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(100) UNIQUE
);`}
                        </pre>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-lg font-bold text-yellow-400 mb-2">CHECK</h4>
                        <p className="text-gray-300 mb-2">Ensures values meet specific conditions.</p>
                        <pre className="text-white font-mono text-sm">
{`CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Price DECIMAL(10,2) CHECK (Price > 0),
    Category VARCHAR(50) CHECK (Category IN ('Electronics', 'Books', 'Clothing'))
);`}
                        </pre>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-lg font-bold text-yellow-400 mb-2">DEFAULT</h4>
                        <p className="text-gray-300 mb-2">Sets a default value for a column.</p>
                        <pre className="text-white font-mono text-sm">
{`CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    OrderDate DATE DEFAULT CURRENT_DATE,
    Status VARCHAR(20) DEFAULT 'Pending'
);`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">💡 Best Practices</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-4">✅ Data Type Selection</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Choose smallest appropriate data type</li>
                        <li>• Use INT for IDs, DECIMAL for money</li>
                        <li>• VARCHAR for variable text, CHAR for fixed</li>
                        <li>• Consider storage and performance</li>
                        <li>• Plan for future data growth</li>
                      </ul>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-4">🔧 Constraint Design</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Always define PRIMARY KEY</li>
                        <li>• Use FOREIGN KEY for relationships</li>
                        <li>• Add NOT NULL for required fields</li>
                        <li>• Use CHECK for business rules</li>
                        <li>• Consider UNIQUE for identifiers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'creating-tables':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="creating-tables" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ Creating Tables
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Learn how to create and manage database tables using DDL commands
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* CREATE TABLE */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 CREATE TABLE Statement</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The CREATE TABLE statement is used to create new tables in the database.
                    You must specify column names, data types, and constraints.
                  </p>
                  
                  <div className="bg-gray-800 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">Basic Syntax</h3>
                    <pre className="text-white font-mono text-sm">
{`CREATE TABLE table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    column3 datatype constraints,
    ...
);`}
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Example: Students Table</h3>
                      <pre className="text-white font-mono text-sm">
{`CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Age INT CHECK (Age >= 16),
    EnrollmentDate DATE DEFAULT CURRENT_DATE
);`}
                      </pre>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Example: Courses Table</h3>
                      <pre className="text-white font-mono text-sm">
{`CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(100) NOT NULL,
    Credits INT CHECK (Credits BETWEEN 1 AND 6),
    Instructor VARCHAR(100),
    Department VARCHAR(50)
);`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* ALTER TABLE */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🔧 ALTER TABLE Statement</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The ALTER TABLE statement is used to modify the structure of existing tables.
                    You can add, modify, or drop columns and constraints.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Adding Columns</h3>
                      <pre className="text-white font-mono text-sm mb-4">
{`-- Add a single column
ALTER TABLE Students 
ADD Phone VARCHAR(15);

-- Add multiple columns
ALTER TABLE Students 
ADD Phone VARCHAR(15),
ADD Address VARCHAR(200);`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Modifying Columns</h3>
                      <pre className="text-white font-mono text-sm mb-4">
{`-- Change column data type
ALTER TABLE Students 
ALTER COLUMN Age INT;

-- Change column size
ALTER TABLE Students 
ALTER COLUMN FirstName VARCHAR(100);

-- Add constraint to existing column
ALTER TABLE Students 
ADD CONSTRAINT CHK_Age CHECK (Age >= 16);`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Dropping Columns</h3>
                      <pre className="text-white font-mono text-sm mb-4">
{`-- Drop a single column
ALTER TABLE Students 
DROP COLUMN Phone;

-- Drop multiple columns
ALTER TABLE Students 
DROP COLUMN Phone,
DROP COLUMN Address;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Managing Constraints</h3>
                      <pre className="text-white font-mono text-sm mb-4">
{`-- Add foreign key constraint
ALTER TABLE Students 
ADD CONSTRAINT FK_Department 
FOREIGN KEY (DeptID) REFERENCES Departments(DeptID);

-- Drop constraint
ALTER TABLE Students 
DROP CONSTRAINT CHK_Age;

-- Rename table
ALTER TABLE Students 
RENAME TO StudentRecords;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* DROP TABLE */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🗑️ DROP TABLE Statement</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The DROP TABLE statement is used to completely remove a table and all its data from the database.
                    This action cannot be undone!
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Syntax</h3>
                    <pre className="text-white font-mono text-sm">
{`-- Drop a single table
DROP TABLE table_name;

-- Drop multiple tables
DROP TABLE table1, table2, table3;

-- Drop with CASCADE (if foreign key references exist)
DROP TABLE table_name CASCADE;`}
                    </pre>
                  </div>

                  <div className="bg-red-900/20 border border-red-500 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-red-400 mb-4">⚠️ Warning</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• DROP TABLE permanently deletes the table and all its data</li>
                      <li>• This action cannot be undone</li>
                      <li>• Make sure to backup important data before dropping tables</li>
                      <li>• Check for foreign key dependencies before dropping</li>
                    </ul>
                  </div>
                </div>

                {/* TRUNCATE TABLE */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">✂️ TRUNCATE TABLE Statement</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The TRUNCATE TABLE statement removes all rows from a table but keeps the table structure intact.
                    It's faster than DELETE for removing all rows.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Syntax</h3>
                    <pre className="text-white font-mono text-sm">
{`-- Remove all rows from a table
TRUNCATE TABLE table_name;

-- Example
TRUNCATE TABLE Students;`}
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 border border-blue-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-4">TRUNCATE vs DELETE</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong>TRUNCATE:</strong> Faster, resets auto-increment</li>
                        <li>• <strong>DELETE:</strong> Slower, can use WHERE clause</li>
                        <li>• <strong>TRUNCATE:</strong> Cannot be rolled back</li>
                        <li>• <strong>DELETE:</strong> Can be rolled back</li>
                      </ul>
                    </div>

                    <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-4">When to Use TRUNCATE</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Removing all rows from a table</li>
                        <li>• Resetting table for fresh data</li>
                        <li>• Performance is critical</li>
                        <li>• No need to rollback</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">💡 Best Practices</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-4">✅ Table Design</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Use meaningful table and column names</li>
                        <li>• Always define PRIMARY KEY</li>
                        <li>• Use appropriate data types</li>
                        <li>• Add constraints for data integrity</li>
                        <li>• Plan for future modifications</li>
                      </ul>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-4">🔧 Maintenance</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Always backup before major changes</li>
                        <li>• Test ALTER statements on copies first</li>
                        <li>• Use transactions for multiple changes</li>
                        <li>• Document schema changes</li>
                        <li>• Consider impact on applications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'data-manipulation':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="data-manipulation" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ Data Manipulation
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Learn how to insert, update, and delete data using DML commands
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* INSERT Statement */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 INSERT Statement</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The INSERT statement is used to add new rows of data to a table.
                    You can insert single rows or multiple rows at once.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Insert Single Row</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Insert with all columns
INSERT INTO Students 
VALUES (1, 'John', 'Doe', 'john@email.com', 20, '2024-01-15');

-- Insert with specific columns
INSERT INTO Students (StudentID, FirstName, LastName, Age)
VALUES (2, 'Jane', 'Smith', 19);`}
                      </pre>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Insert Multiple Rows</h3>
                      <pre className="text-white font-mono text-sm">
{`INSERT INTO Students (StudentID, FirstName, LastName, Age)
VALUES 
    (3, 'Alice', 'Johnson', 21),
    (4, 'Bob', 'Brown', 22),
    (5, 'Carol', 'Davis', 20);`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-4">Insert from Another Table</h3>
                    <pre className="text-white font-mono text-sm">
{`-- Copy data from one table to another
INSERT INTO GraduatedStudents (StudentID, FirstName, LastName)
SELECT StudentID, FirstName, LastName
FROM Students
WHERE GraduationDate IS NOT NULL;

-- Insert with calculated values
INSERT INTO StudentStats (StudentID, TotalCourses, AverageGrade)
SELECT 
    StudentID,
    COUNT(CourseID),
    AVG(Grade)
FROM Enrollments
GROUP BY StudentID;`}
                    </pre>
                  </div>
                </div>

                {/* UPDATE Statement */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">✏️ UPDATE Statement</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The UPDATE statement is used to modify existing data in a table.
                    Always use WHERE clause to avoid updating all rows accidentally.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Update Single Column</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Update specific student's email
UPDATE Students 
SET Email = 'newemail@example.com'
WHERE StudentID = 1;

-- Update with condition
UPDATE Students 
SET Age = Age + 1
WHERE EnrollmentDate < '2023-01-01';`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Update Multiple Columns</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Update multiple columns for specific student
UPDATE Students 
SET FirstName = 'Johnny',
    LastName = 'Smith',
    Email = 'johnny.smith@email.com'
WHERE StudentID = 1;

-- Update with calculated values
UPDATE Orders 
SET TotalAmount = Quantity * UnitPrice,
    UpdatedDate = CURRENT_TIMESTAMP
WHERE OrderStatus = 'Pending';`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Update with Subquery</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Update based on data from another table
UPDATE Students 
SET Department = 'Computer Science'
WHERE StudentID IN (
    SELECT StudentID 
    FROM Enrollments 
    WHERE CourseID = 'CS101'
);

-- Update with aggregate function
UPDATE Departments 
SET StudentCount = (
    SELECT COUNT(*) 
    FROM Students 
    WHERE Students.DeptID = Departments.DeptID
);`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-red-900/20 border border-red-500 p-6 rounded-xl mt-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4">⚠️ Warning</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Always use WHERE clause to specify which rows to update</li>
                      <li>• Without WHERE clause, ALL rows will be updated</li>
                      <li>• Test UPDATE statements on copies of data first</li>
                      <li>• Use transactions for multiple related updates</li>
                    </ul>
                  </div>
                </div>

                {/* DELETE Statement */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🗑️ DELETE Statement</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The DELETE statement is used to remove rows from a table.
                    Always use WHERE clause to avoid deleting all data accidentally.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Delete Specific Rows</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Delete specific student
DELETE FROM Students 
WHERE StudentID = 1;

-- Delete with condition
DELETE FROM Students 
WHERE Age < 18;

-- Delete with multiple conditions
DELETE FROM Orders 
WHERE OrderDate < '2023-01-01' 
  AND OrderStatus = 'Cancelled';`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Delete with Subquery</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Delete students who haven't enrolled in any courses
DELETE FROM Students 
WHERE StudentID NOT IN (
    SELECT DISTINCT StudentID 
    FROM Enrollments
);

-- Delete orders from inactive customers
DELETE FROM Orders 
WHERE CustomerID IN (
    SELECT CustomerID 
    FROM Customers 
    WHERE LastLoginDate < DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
);`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Delete All Rows</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Delete all rows from table (DANGEROUS!)
DELETE FROM Students;

-- Safer alternative: TRUNCATE TABLE
TRUNCATE TABLE Students;`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-red-900/20 border border-red-500 p-6 rounded-xl mt-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4">⚠️ Critical Warning</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• DELETE operations cannot be undone easily</li>
                      <li>• Always backup data before major deletions</li>
                      <li>• Use WHERE clause to specify which rows to delete</li>
                      <li>• Consider foreign key constraints before deleting</li>
                      <li>• Use transactions for multiple related deletions</li>
                    </ul>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">💡 Best Practices</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-4">✅ Safe Operations</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Always use WHERE clauses with UPDATE/DELETE</li>
                        <li>• Test queries on sample data first</li>
                        <li>• Use transactions for related operations</li>
                        <li>• Backup data before major changes</li>
                        <li>• Validate data before inserting</li>
                      </ul>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-4">🔧 Performance Tips</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Use bulk INSERT for multiple rows</li>
                        <li>• Index columns used in WHERE clauses</li>
                        <li>• Use LIMIT with UPDATE/DELETE for large datasets</li>
                        <li>• Consider using TRUNCATE instead of DELETE ALL</li>
                        <li>• Monitor query performance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'filtering-sorting':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="filtering-sorting" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ Filtering & Sorting
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master WHERE clause filtering and ORDER BY sorting in SQL queries
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* WHERE Clause */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🔍 WHERE Clause</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The WHERE clause is used to filter rows based on specified conditions.
                    It allows you to retrieve only the data that meets your criteria.
                  </p>
                  
                  <div className="bg-gray-800 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">Basic Syntax</h3>
                    <pre className="text-white font-mono text-sm">
{`SELECT column1, column2, ...
FROM table_name
WHERE condition;`}
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Comparison Operators</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <code className="text-white">=</code>
                          <span className="text-gray-300">Equal to</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="text-white">!= or &lt;&gt;</code>
                          <span className="text-gray-300">Not equal to</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="text-white">&gt;</code>
                          <span className="text-gray-300">Greater than</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="text-white">&lt;</code>
                          <span className="text-gray-300">Less than</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="text-white">&gt;=</code>
                          <span className="text-gray-300">Greater or equal</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="text-white">&lt;=</code>
                          <span className="text-gray-300">Less or equal</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Logical Operators</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <code className="text-white">AND</code>
                          <span className="text-gray-300">Both conditions true</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="text-white">OR</code>
                          <span className="text-gray-300">Either condition true</span>
                        </div>
                        <div className="flex justify-between">
                          <code className="text-white">NOT</code>
                          <span className="text-gray-300">Condition is false</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Basic Filtering Examples</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Find students older than 20
SELECT * FROM Students WHERE Age > 20;

-- Find students in specific age range
SELECT * FROM Students WHERE Age BETWEEN 18 AND 25;

-- Find students with specific names
SELECT * FROM Students WHERE FirstName = 'John';

-- Find students with multiple conditions
SELECT * FROM Students 
WHERE Age > 18 AND Department = 'Computer Science';`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Advanced Filtering</h3>
                      <pre className="text-white font-mono text-sm">
{`-- IN operator - multiple values
SELECT * FROM Students 
WHERE Department IN ('Computer Science', 'Mathematics', 'Physics');

-- LIKE operator - pattern matching
SELECT * FROM Students 
WHERE FirstName LIKE 'J%';  -- Names starting with 'J'

-- IS NULL / IS NOT NULL
SELECT * FROM Students 
WHERE Email IS NOT NULL;

-- Complex conditions
SELECT * FROM Students 
WHERE (Age > 20 AND Department = 'CS') 
   OR (Age <= 20 AND Department = 'Math');`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* ORDER BY Clause */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📊 ORDER BY Clause</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The ORDER BY clause is used to sort the result set in ascending or descending order.
                    You can sort by one or more columns.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Basic Syntax</h3>
                    <pre className="text-white font-mono text-sm">
{`SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column1 ASC|DESC, column2 ASC|DESC;`}
                    </pre>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Single Column Sorting</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Sort by age ascending (default)
SELECT * FROM Students ORDER BY Age;

-- Sort by age descending
SELECT * FROM Students ORDER BY Age DESC;

-- Sort by name alphabetically
SELECT * FROM Students ORDER BY FirstName ASC;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Multiple Column Sorting</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Sort by department first, then by age
SELECT * FROM Students 
ORDER BY Department ASC, Age DESC;

-- Sort by multiple criteria
SELECT FirstName, LastName, Age, Department
FROM Students 
ORDER BY Department, LastName, FirstName;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Sorting with Functions</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Sort by calculated values
SELECT FirstName, LastName, Age, 
       (Age * 12) AS AgeInMonths
FROM Students 
ORDER BY AgeInMonths DESC;

-- Sort by string length
SELECT FirstName, LastName
FROM Students 
ORDER BY LENGTH(FirstName), LENGTH(LastName);`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* LIMIT / TOP */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🔢 LIMIT / TOP Clause</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    LIMIT (MySQL/PostgreSQL) or TOP (SQL Server) is used to restrict the number of rows returned.
                    Very useful for pagination and getting top results.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">MySQL/PostgreSQL - LIMIT</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Get top 5 students by age
SELECT * FROM Students 
ORDER BY Age DESC 
LIMIT 5;

-- Get students 6-10 (pagination)
SELECT * FROM Students 
ORDER BY Age DESC 
LIMIT 5 OFFSET 5;

-- Alternative syntax
SELECT * FROM Students 
ORDER BY Age DESC 
LIMIT 5, 5;  -- Skip 5, take 5`}
                      </pre>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">SQL Server - TOP</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Get top 5 students by age
SELECT TOP 5 * FROM Students 
ORDER BY Age DESC;

-- Get top 10% of students
SELECT TOP 10 PERCENT * FROM Students 
ORDER BY Age DESC;

-- With ties (include tied values)
SELECT TOP 5 WITH TIES * FROM Students 
ORDER BY Age DESC;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">💡 Best Practices</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-4">✅ WHERE Clause Tips</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Use indexed columns in WHERE conditions</li>
                        <li>• Avoid functions on columns in WHERE</li>
                        <li>• Use appropriate data types in comparisons</li>
                        <li>• Combine conditions with AND/OR logically</li>
                        <li>• Use IN instead of multiple OR conditions</li>
                      </ul>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-4">🔧 ORDER BY Tips</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Sort by indexed columns when possible</li>
                        <li>• Use DESC for most recent/highest values</li>
                        <li>• Combine with LIMIT for pagination</li>
                        <li>• Consider NULL values in sorting</li>
                        <li>• Use multiple columns for stable sorting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'aggregate-functions':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="aggregate-functions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ Aggregate Functions
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master SQL aggregate functions, GROUP BY, and HAVING clause for data analysis
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* Aggregate Functions */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📊 Aggregate Functions</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Aggregate functions perform calculations on multiple rows and return a single result.
                    They are essential for data analysis and reporting.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">COUNT() Function</h3>
                      <p className="text-gray-300 mb-4">Returns the number of rows in a table or group.</p>
                      <pre className="text-white font-mono text-sm">
{`-- Count all rows
SELECT COUNT(*) FROM Students;

-- Count non-NULL values
SELECT COUNT(Email) FROM Students;

-- Count distinct values
SELECT COUNT(DISTINCT Department) FROM Students;`}
                      </pre>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">SUM() Function</h3>
                      <p className="text-gray-300 mb-4">Returns the total of a numeric column.</p>
                      <pre className="text-white font-mono text-sm">
{`-- Sum all salaries
SELECT SUM(Salary) FROM Employees;

-- Sum with condition
SELECT SUM(Salary) FROM Employees 
WHERE Department = 'IT';

-- Sum distinct values
SELECT SUM(DISTINCT Salary) FROM Employees;`}
                      </pre>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">AVG() Function</h3>
                      <p className="text-gray-300 mb-4">Returns the average value of a numeric column.</p>
                      <pre className="text-white font-mono text-sm">
{`-- Average age of students
SELECT AVG(Age) FROM Students;

-- Average with rounding
SELECT ROUND(AVG(Salary), 2) FROM Employees;

-- Average excluding NULLs
SELECT AVG(Salary) FROM Employees 
WHERE Salary IS NOT NULL;`}
                      </pre>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">MIN() & MAX() Functions</h3>
                      <p className="text-gray-300 mb-4">Return the smallest and largest values.</p>
                      <pre className="text-white font-mono text-sm">
{`-- Find youngest and oldest
SELECT MIN(Age), MAX(Age) FROM Students;

-- Highest and lowest salaries
SELECT MIN(Salary), MAX(Salary) 
FROM Employees;

-- Earliest and latest dates
SELECT MIN(EnrollmentDate), 
       MAX(EnrollmentDate) 
FROM Students;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* GROUP BY Clause */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">👥 GROUP BY Clause</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The GROUP BY clause groups rows that have the same values in specified columns.
                    It allows you to apply aggregate functions to each group separately.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Basic Syntax</h3>
                    <pre className="text-white font-mono text-sm">
{`SELECT column1, AGGREGATE_FUNCTION(column2)
FROM table_name
WHERE condition
GROUP BY column1
ORDER BY column1;`}
                    </pre>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Group by Single Column</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Count students by department
SELECT Department, COUNT(*) AS StudentCount
FROM Students
GROUP BY Department;

-- Average salary by department
SELECT Department, AVG(Salary) AS AvgSalary
FROM Employees
GROUP BY Department;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Group by Multiple Columns</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Count by department and year
SELECT Department, 
       YEAR(EnrollmentDate) AS Year,
       COUNT(*) AS StudentCount
FROM Students
GROUP BY Department, YEAR(EnrollmentDate);

-- Sales by product and region
SELECT ProductID, Region, 
       SUM(Quantity) AS TotalSold,
       AVG(Price) AS AvgPrice
FROM Sales
GROUP BY ProductID, Region;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Multiple Aggregate Functions</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Comprehensive department stats
SELECT Department,
       COUNT(*) AS EmployeeCount,
       AVG(Salary) AS AvgSalary,
       MIN(Salary) AS MinSalary,
       MAX(Salary) AS MaxSalary,
       SUM(Salary) AS TotalSalary
FROM Employees
GROUP BY Department;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* HAVING Clause */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🔍 HAVING Clause</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The HAVING clause is used to filter groups after aggregation.
                    It's like WHERE clause but for grouped results.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Key Differences</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">WHERE Clause</h4>
                        <ul className="text-gray-300 space-y-1 text-sm">
                          <li>• Filters individual rows</li>
                          <li>• Applied before grouping</li>
                          <li>• Cannot use aggregate functions</li>
                          <li>• Example: WHERE Age &gt; 25</li>
                        </ul>
                      </div>
                      <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg">
                        <h4 className="text-lg font-bold text-green-400 mb-2">HAVING Clause</h4>
                        <ul className="text-gray-300 space-y-1 text-sm">
                          <li>• Filters grouped results</li>
                          <li>• Applied after grouping</li>
                          <li>• Can use aggregate functions</li>
                          <li>• Example: HAVING COUNT(*) &gt; 5</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Basic HAVING Examples</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Departments with more than 10 employees
SELECT Department, COUNT(*) AS EmployeeCount
FROM Employees
GROUP BY Department
HAVING COUNT(*) > 10;

-- Departments with average salary > 50000
SELECT Department, AVG(Salary) AS AvgSalary
FROM Employees
GROUP BY Department
HAVING AVG(Salary) > 50000;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Complex HAVING Conditions</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Multiple conditions with HAVING
SELECT Department, 
       COUNT(*) AS EmployeeCount,
       AVG(Salary) AS AvgSalary
FROM Employees
GROUP BY Department
HAVING COUNT(*) > 5 AND AVG(Salary) > 45000;

-- Using different aggregate functions
SELECT ProductID,
       SUM(Quantity) AS TotalSold,
       COUNT(DISTINCT CustomerID) AS UniqueCustomers
FROM Orders
GROUP BY ProductID
HAVING SUM(Quantity) > 100 
   AND COUNT(DISTINCT CustomerID) > 10;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Complete Examples */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🎯 Complete Examples</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Business Analysis Query</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Top performing departments
SELECT d.DepartmentName,
       COUNT(e.EmployeeID) AS EmployeeCount,
       AVG(e.Salary) AS AvgSalary,
       SUM(s.SalesAmount) AS TotalSales
FROM Departments d
JOIN Employees e ON d.DeptID = e.DeptID
LEFT JOIN Sales s ON e.EmployeeID = s.EmployeeID
WHERE e.HireDate >= '2020-01-01'
GROUP BY d.DepartmentName
HAVING COUNT(e.EmployeeID) >= 5 
   AND AVG(e.Salary) > 40000
ORDER BY TotalSales DESC;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Student Performance Analysis</h3>
                      <pre className="text-white font-mono text-sm">
{`-- Course performance summary
SELECT c.CourseName,
       COUNT(DISTINCT e.StudentID) AS StudentCount,
       AVG(e.Grade) AS AvgGrade,
       MIN(e.Grade) AS MinGrade,
       MAX(e.Grade) AS MaxGrade,
       COUNT(CASE WHEN e.Grade >= 80 THEN 1 END) AS PassCount
FROM Courses c
JOIN Enrollments e ON c.CourseID = e.CourseID
GROUP BY c.CourseName
HAVING COUNT(DISTINCT e.StudentID) >= 10
ORDER BY AvgGrade DESC;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">💡 Best Practices</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-4">✅ Performance Tips</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Index columns used in GROUP BY</li>
                        <li>• Use WHERE to filter before grouping</li>
                        <li>• Use HAVING to filter after grouping</li>
                        <li>• Consider data types for aggregations</li>
                        <li>• Use appropriate aggregate functions</li>
                      </ul>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-4">🔧 Query Design</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Always include non-aggregated columns in GROUP BY</li>
                        <li>• Use meaningful column aliases</li>
                        <li>• Test with small datasets first</li>
                        <li>• Consider NULL handling in aggregates</li>
                        <li>• Use ORDER BY for consistent results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'subqueries':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="subqueries" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔍 Subqueries in SQL
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Understanding nested queries and their powerful applications in data retrieval
              </p>
              
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/30">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 What is a Subquery?</h2>
                  <div className="space-y-4 text-gray-300">
                    <p className="text-lg leading-relaxed">
                      A <strong className="text-white">subquery</strong> (also called an <strong className="text-white">inner query</strong> or <strong className="text-white">nested query</strong>) is a query that is embedded within another SQL query. The subquery is executed first, and its result is used by the outer query to complete its operation.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Think of it as asking a question within a question. For example, "Show me all employees who earn more than the average salary" requires two steps: first calculate the average salary, then find employees earning more than that average.
                    </p>
                    <div className="bg-gray-800 p-6 rounded-xl mt-4">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">Key Characteristics:</h4>
                      <ul className="space-y-2">
                        <li>• Subqueries are enclosed in parentheses ()</li>
                        <li>• The inner query executes first, followed by the outer query</li>
                        <li>• Can be used in SELECT, FROM, WHERE, and HAVING clauses</li>
                        <li>• Can return single values, multiple values, or entire tables</li>
                        <li>• Helps break down complex problems into simpler steps</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Subquery in WHERE */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Subquery in WHERE Clause</h2>
                  <p className="text-gray-300 mb-6 text-lg">
                    The most common use of subqueries is in the WHERE clause to filter rows based on values computed from other queries. This allows you to make comparisons with aggregated data or data from related tables.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Single Value Subquery</h3>
                      <p className="text-gray-300 mb-4">
                        A single value subquery returns exactly one value (one row, one column). This is typically used with comparison operators like =, &gt;, &lt;, &gt;=, &lt;=, !=
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <p className="text-sm text-gray-400 mb-2">Example: Find all employees who earn more than the average salary</p>
                        <pre className="text-white font-mono text-sm">
{`SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Output:</p>
                        <pre className="text-green-200 font-mono text-sm">
{`name          | salary
--------------+---------
Alice         | 85000
Bob           | 92000
Charlie       | 78000

(3 rows returned)

Explanation: The subquery first calculates AVG(salary) = 65000
Then outer query finds all employees with salary > 65000`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Multiple Value Subquery (IN)</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Find employees in Sales department
SELECT name, salary
FROM employees
WHERE dept_id IN (SELECT dept_id FROM departments WHERE dept_name = 'Sales');

-- Find students enrolled in CS courses
SELECT name
FROM students
WHERE student_id IN (SELECT student_id FROM enrollments WHERE course_name = 'CS');`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">EXISTS Operator</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Find customers who placed orders
SELECT customer_name
FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);

-- Find products never ordered
SELECT product_name
FROM products p
WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.product_id);`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Subquery in SELECT */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Subquery in SELECT Clause</h2>
                  <div className="bg-gray-900 p-6 rounded-xl">
                    <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Calculate columns using subqueries
SELECT 
    name,
    salary,
    (SELECT AVG(salary) FROM employees) AS avg_salary,
    salary - (SELECT AVG(salary) FROM employees) AS difference
FROM employees;

-- Count related records
SELECT 
    c.customer_name,
    (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.customer_id) AS order_count
FROM customers c;`}
                    </pre>
                  </div>
                </div>

                {/* Subquery in FROM */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Subquery in FROM Clause (Derived Table)</h2>
                  <div className="bg-gray-900 p-6 rounded-xl">
                    <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Use subquery result as temporary table
SELECT dept, avg_sal
FROM (
    SELECT department AS dept, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE avg_sal > 50000;

-- Complex calculations
SELECT *
FROM (
    SELECT 
        product_name,
        price,
        quantity,
        price * quantity AS total_value
    FROM products
) AS product_values
WHERE total_value > 1000;`}
                    </pre>
                  </div>
                </div>

                {/* Correlated Subquery */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Correlated Subquery</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <p className="text-gray-300 mb-4">References outer query in inner query - executes for each row</p>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Find employees earning more than their department average
SELECT e1.name, e1.salary, e1.department
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e1.department
);

-- Find top 3 earners per department
SELECT name, salary, department
FROM employees e1
WHERE (
    SELECT COUNT(*)
    FROM employees e2
    WHERE e2.department = e1.department AND e2.salary > e1.salary
) < 3;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Nested Subqueries */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Nested Subqueries</h2>
                  <div className="bg-gray-900 p-6 rounded-xl">
                    <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Multiple levels of nesting
SELECT name
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE dept_id IN (
        SELECT dept_id
        FROM departments
        WHERE location = 'New York'
    )
);

-- Complex filtering
SELECT product_name
FROM products
WHERE category_id IN (
    SELECT category_id
    FROM categories
    WHERE category_name IN (
        SELECT DISTINCT category
        FROM top_selling
        WHERE year = 2024
    )
);`}
                    </pre>
                  </div>
                </div>

                {/* Common Use Cases */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Common Use Cases</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-green-400 mb-3">When to Use</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Complex filtering logic</li>
                        <li>• Calculate aggregates inline</li>
                        <li>• Check for existence of data</li>
                        <li>• Compare with aggregated values</li>
                        <li>• Create derived tables</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-blue-400 mb-3">Performance Tips</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Use EXISTS instead of IN for large datasets</li>
                        <li>• Avoid correlated subqueries when possible</li>
                        <li>• Consider JOINs as alternative</li>
                        <li>• Use EXPLAIN to check query plan</li>
                        <li>• Index columns used in subqueries</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'database-design':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="database-design" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🏗️ Database Design - The Foundation of Data
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master the art of designing efficient, scalable, and maintainable database schemas
              </p>
              
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Introduction */}
                <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 rounded-2xl border border-purple-500/30">
                  <h2 className="text-3xl font-bold text-white mb-6">🏗️ Advanced Database Design & Architecture</h2>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg mb-6">
                    <h4 className="text-xl font-bold text-blue-300 mb-4">🎯 Database Design Theory & Principles</h4>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      Database design is both an art and a science, combining theoretical foundations with practical implementation considerations. 
                      It requires understanding of data modeling, normalization theory, performance optimization, and scalability patterns.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">Design Principles:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Normalization:</strong> Eliminating redundancy and dependency</li>
                        <li>• <strong className="text-white">Denormalization:</strong> Strategic redundancy for performance</li>
                        <li>• <strong className="text-white">Scalability:</strong> Designing for growth and load</li>
                        <li>• <strong className="text-white">Flexibility:</strong> Accommodating changing requirements</li>
                        <li>• <strong className="text-white">Maintainability:</strong> Clear structure and documentation</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-300">
                    <p className="text-lg leading-relaxed">
                      <strong className="text-white">Database design</strong> is the process of creating a detailed data model of a database. 
                      It involves deciding how data will be organized, what tables will exist, how they&apos;ll be related, and what constraints will ensure data integrity. 
                      Think of it as the architectural blueprint for your data - get it right, and everything else becomes easier.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Good database design follows the principle of <strong className="text-white">normalization</strong> - organizing data to minimize redundancy and dependency, 
                      while ensuring data integrity and eliminating anomalies. It&apos;s about creating a structure that supports both current needs and future growth.
                    </p>
                    <div className="bg-gray-800 p-6 rounded-xl mt-4">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">🎯 Why Database Design Matters</h4>
                      <ul className="space-y-2">
                        <li>• <strong className="text-white">Performance:</strong> Well-designed databases query faster and scale better</li>
                        <li>• <strong className="text-white">Data Integrity:</strong> Prevents invalid or inconsistent data</li>
                        <li>• <strong className="text-white">Maintainability:</strong> Easy to understand, modify, and extend</li>
                        <li>• <strong className="text-white">Cost Efficiency:</strong> Reduces storage needs and development time</li>
                        <li>• <strong className="text-white">User Experience:</strong> Faster applications with reliable data</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Entity-Relationship Model */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Entity-Relationship Model</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">One-to-One Relationship</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Each person has one passport
CREATE TABLE persons (
    person_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE passports (
    passport_id INT PRIMARY KEY,
    person_id INT UNIQUE,
    passport_number VARCHAR(20),
    FOREIGN KEY (person_id) REFERENCES persons(person_id)
);`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">One-to-Many Relationship</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- One author writes many books
CREATE TABLE authors (
    author_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE books (
    book_id INT PRIMARY KEY,
    title VARCHAR(200),
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Many-to-Many Relationship</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Students enroll in many courses, courses have many students
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100)
);

CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Normalization */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Normalization Forms</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">1NF (First Normal Form)</h3>
                      <p className="text-gray-300 mb-3">Each column contains atomic values, no repeating groups</p>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- BAD (Not 1NF)
CREATE TABLE orders (
    order_id INT,
    products VARCHAR(500)  -- 'Apple,Banana,Orange'
);

-- GOOD (1NF)
CREATE TABLE orders (
    order_id INT,
    order_date DATE
);
CREATE TABLE order_items (
    order_id INT,
    product_name VARCHAR(100)
);`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">2NF (Second Normal Form)</h3>
                      <p className="text-gray-300 mb-3">1NF + No partial dependencies (all non-key columns depend on entire primary key)</p>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- BAD (Not 2NF)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),  -- Depends only on product_id
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- GOOD (2NF)
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100)
);
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">3NF (Third Normal Form)</h3>
                      <p className="text-gray-300 mb-3">2NF + No transitive dependencies</p>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- BAD (Not 3NF)
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_name VARCHAR(100),
    dept_location VARCHAR(100)  -- Depends on dept_name, not emp_id
);

-- GOOD (3NF)
CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100),
    dept_location VARCHAR(100)
);
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Design Best Practices</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-green-400 mb-3">✅ Do</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Use meaningful table/column names</li>
                        <li>• Define primary keys for all tables</li>
                        <li>• Use foreign keys to enforce relationships</li>
                        <li>• Normalize to reduce redundancy</li>
                        <li>• Use appropriate data types</li>
                        <li>• Add NOT NULL where appropriate</li>
                        <li>• Use indexes on frequently queried columns</li>
                        <li>• Document your schema</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-red-400 mb-3">❌ Don&apos;t</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Store redundant data</li>
                        <li>• Use generic column names (id, name)</li>
                        <li>• Over-normalize (too many joins)</li>
                        <li>• Forget to add constraints</li>
                        <li>• Use VARCHAR for everything</li>
                        <li>• Ignore data integrity</li>
                        <li>• Skip planning phase</li>
                        <li>• Mix data types inconsistently</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Common Patterns */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Common Design Patterns</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Audit Trail Pattern</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT
);`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Soft Delete Pattern</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10,2),
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP NULL
);

-- Instead of DELETE, update is_deleted
UPDATE products SET is_deleted = TRUE, deleted_at = NOW() WHERE product_id = 1;

-- Query active records
SELECT * FROM products WHERE is_deleted = FALSE;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Versioning Pattern</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`CREATE TABLE document_versions (
    version_id INT PRIMARY KEY,
    document_id INT,
    version_number INT,
    content TEXT,
    created_at TIMESTAMP,
    created_by INT,
    FOREIGN KEY (document_id) REFERENCES documents(document_id)
);`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'indexes-performance':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="indexes-performance" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ⚡ Indexes & Performance - Database Speed Optimization
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master database indexing strategies and query optimization techniques for lightning-fast performance
              </p>
              
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Introduction */}
                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-8 rounded-2xl border border-green-500/30">
                  <h2 className="text-3xl font-bold text-white mb-6">🚀 Database Performance & Indexing Mastery</h2>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg mb-6">
                    <h4 className="text-xl font-bold text-blue-300 mb-4">🎯 Understanding Database Performance</h4>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      Database performance optimization is crucial for applications handling large amounts of data. Understanding indexing, query optimization, and performance monitoring is essential for building scalable systems.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">Performance Factors:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Query Execution Time:</strong> How long queries take to complete</li>
                        <li>• <strong className="text-white">Resource Utilization:</strong> CPU, memory, and I/O usage</li>
                        <li>• <strong className="text-white">Scalability:</strong> Performance under increasing data loads</li>
                        <li>• <strong className="text-white">Concurrency:</strong> Handling multiple simultaneous users</li>
                        <li>• <strong className="text-white">Data Access Patterns:</strong> Read vs write operation ratios</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-300">
                    <p className="text-lg leading-relaxed">
                      A <strong className="text-white">database index</strong> is a data structure that improves the speed of data retrieval operations on a database table. 
                      Think of it like an index in a book - instead of reading every page to find information about "SQL", 
                      you can look it up in the index and jump directly to the relevant pages.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Without indexes, the database must perform a <strong className="text-white">full table scan</strong> - examining every single row to find matching data. 
                      With proper indexes, the database can quickly locate the exact rows that match your query conditions, dramatically improving performance.
                    </p>
                    <div className="bg-gray-800 p-6 rounded-xl mt-4">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">⚡ Performance Impact</h4>
                      <ul className="space-y-2">
                        <li>• <strong className="text-white">Without Index:</strong> Query might take 10+ seconds on large tables</li>
                        <li>• <strong className="text-white">With Index:</strong> Same query completes in milliseconds</li>
                        <li>• <strong className="text-white">Real Example:</strong> Finding a user by email in 1M records: 10 seconds → 0.001 seconds</li>
                        <li>• <strong className="text-white">Trade-off:</strong> Indexes use additional storage space and slow down INSERT/UPDATE/DELETE operations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Query Optimization */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">🔧 Query Optimization Techniques</h2>
                  
                  <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-lg mb-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">🎯 Understanding Query Optimization</h4>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      Query optimization is the process of improving the performance of SQL queries by analyzing execution plans, 
                      identifying bottlenecks, and applying various optimization techniques.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">Optimization Strategies:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Execution Plan Analysis:</strong> Understanding how the database executes queries</li>
                        <li>• <strong className="text-white">Index Strategy:</strong> Choosing the right indexes for query patterns</li>
                        <li>• <strong className="text-white">Query Rewriting:</strong> Restructuring queries for better performance</li>
                        <li>• <strong className="text-white">Statistics & Cardinality:</strong> Keeping database statistics updated</li>
                        <li>• <strong className="text-white">Hardware Considerations:</strong> CPU, memory, and storage optimization</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Query Performance Analysis</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">EXPLAIN Statement</h4>
                          <pre className="text-white font-mono text-sm bg-gray-950 p-3 rounded">
{`-- Analyze query execution plan
EXPLAIN SELECT * FROM employees 
WHERE department = 'IT' AND salary > 50000;

-- Detailed execution plan
EXPLAIN ANALYZE SELECT * FROM employees 
WHERE department = 'IT';`}
                          </pre>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Performance Monitoring</h4>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Execution Time:</strong> Monitor query duration</li>
                            <li>• <strong className="text-white">Rows Examined:</strong> Check if full table scans occur</li>
                            <li>• <strong className="text-white">Index Usage:</strong> Verify indexes are being used</li>
                            <li>• <strong className="text-white">Memory Usage:</strong> Monitor temporary table usage</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Common Optimization Techniques</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Index Optimization</h4>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Covering Indexes:</strong> Include all needed columns</li>
                            <li>• <strong className="text-white">Selective Indexes:</strong> High cardinality columns</li>
                            <li>• <strong className="text-white">Composite Indexes:</strong> Multi-column indexes for complex queries</li>
                            <li>• <strong className="text-white">Partial Indexes:</strong> Indexes on filtered data subsets</li>
                          </ul>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Query Structure</h4>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Avoid SELECT *:</strong> Select only needed columns</li>
                            <li>• <strong className="text-white">Use LIMIT:</strong> Restrict result sets when possible</li>
                            <li>• <strong className="text-white">Optimize JOINs:</strong> Join on indexed columns</li>
                            <li>• <strong className="text-white">Subquery vs JOIN:</strong> Choose appropriate approach</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Index Types */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Index Types</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">1. Single Column Index</h3>
                      <p className="text-gray-300 mb-4">
                        The most common type of index, created on a single column. Perfect for WHERE clauses that filter on one column, 
                        ORDER BY operations, and JOIN conditions. The database creates a sorted structure that allows fast lookups.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`-- Create index on single column
CREATE INDEX idx_lastname ON employees(last_name);

-- Query that benefits from this index
SELECT * FROM employees WHERE last_name = 'Smith';

-- Show all indexes on table
SHOW INDEX FROM employees;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Performance Impact:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`Without Index:
- Full table scan: 1,000,000 rows examined
- Query time: 2.5 seconds
- I/O operations: 10,000 disk reads

With Index:
- Index lookup: 1 row found directly
- Query time: 0.003 seconds (833x faster!)
- I/O operations: 3 disk reads

Explanation:
- Index creates sorted structure: Adams, Brown, Johnson, Smith, Wilson...
- Database uses binary search to find 'Smith' instantly
- Only reads the specific data pages containing matching rows`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">2. Composite Index (Multi-Column)</h3>
                      <p className="text-gray-300 mb-4">
                        A composite index is created on multiple columns. The order of columns is crucial - it follows the <strong className="text-white">leftmost prefix rule</strong>. 
                        The index is sorted first by the first column, then by the second column within each group of the first column, and so on.
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`-- Index on multiple columns (order matters!)
CREATE INDEX idx_name ON employees(last_name, first_name);

-- This query uses index efficiently (both columns)
SELECT * FROM employees WHERE last_name = 'Smith' AND first_name = 'John';

-- This query also uses index (left prefix rule)
SELECT * FROM employees WHERE last_name = 'Smith';

-- This query does NOT use index (skips first column)
SELECT * FROM employees WHERE first_name = 'John';`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Composite Index Structure:</p>
                        <pre className="text-green-200 font-mono text-xs">
{`Index: idx_name (last_name, first_name)

Sorted Structure:
Adams    | Alice
Adams    | Bob  
Brown    | Carol
Smith    | John    ← Found instantly!
Smith    | Jane
Wilson   | Mike

Leftmost Prefix Rule:
✓ WHERE last_name = 'Smith'                    (uses index)
✓ WHERE last_name = 'Smith' AND first_name = 'John' (uses index)
✗ WHERE first_name = 'John'                   (cannot use index)

Real-world analogy: Like a phone book sorted by Last Name, then First Name.
You can find "Smith, John" quickly, but not "John" without "Smith".`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Unique Index</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Ensures column values are unique
CREATE UNIQUE INDEX idx_email ON users(email);

-- Automatically created with UNIQUE constraint
ALTER TABLE users ADD CONSTRAINT uq_email UNIQUE (email);`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Full-Text Index</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- For text searching
CREATE FULLTEXT INDEX idx_content ON articles(title, content);

-- Use with MATCH AGAINST
SELECT * FROM articles
WHERE MATCH(title, content) AGAINST('database optimization');`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Query Optimization */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Query Optimization</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Use EXPLAIN</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Analyze query execution plan
EXPLAIN SELECT * FROM employees WHERE last_name = 'Smith';

-- Detailed analysis
EXPLAIN ANALYZE SELECT * FROM employees WHERE salary > 50000;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Select Only Needed Columns</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- BAD - Fetches all columns
SELECT * FROM employees WHERE dept_id = 5;

-- GOOD - Only needed columns
SELECT id, first_name, last_name FROM employees WHERE dept_id = 5;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Avoid Functions on Indexed Columns</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- BAD - Index not used
SELECT * FROM employees WHERE YEAR(hire_date) = 2024;

-- GOOD - Index used
SELECT * FROM employees 
WHERE hire_date BETWEEN '2024-01-01' AND '2024-12-31';`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Use LIMIT for Large Result Sets</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Without LIMIT - returns all rows
SELECT * FROM orders ORDER BY order_date DESC;

-- With LIMIT - returns only needed rows
SELECT * FROM orders ORDER BY order_date DESC LIMIT 20;

-- Pagination
SELECT * FROM orders ORDER BY order_date DESC LIMIT 20 OFFSET 40;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Performance Tips */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Performance Best Practices</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-green-400 mb-3">✅ Do</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Index frequently queried columns</li>
                        <li>• Use appropriate index types</li>
                        <li>• Select only needed columns</li>
                        <li>• Use LIMIT when appropriate</li>
                        <li>• Use EXPLAIN to analyze queries</li>
                        <li>• Use JOIN instead of subqueries when faster</li>
                        <li>• Avoid SELECT * in production</li>
                        <li>• Use prepared statements</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-red-400 mb-3">❌ Don&apos;t</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Over-index (slows INSERT/UPDATE)</li>
                        <li>• Use functions on indexed columns</li>
                        <li>• Use LIKE with leading wildcard (%abc)</li>
                        <li>• Fetch all rows without LIMIT</li>
                        <li>• Use SELECT DISTINCT unnecessarily</li>
                        <li>• Use OR when IN is better</li>
                        <li>• Ignore query execution plans</li>
                        <li>• Leave unused indexes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Common Issues */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Common Performance Issues</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">N+1 Query Problem</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- BAD - N+1 queries (1 + N where N = number of authors)
SELECT * FROM books; -- 1 query
-- Then for each book:
SELECT * FROM authors WHERE id = book.author_id; -- N queries

-- GOOD - Single JOIN query
SELECT b.*, a.name as author_name
FROM books b
JOIN authors a ON b.author_id = a.id;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Missing Index</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Check slow query log
SHOW VARIABLES LIKE 'slow_query_log';

-- Identify missing indexes with EXPLAIN
EXPLAIN SELECT * FROM orders WHERE customer_id = 100;

-- Add index if needed
CREATE INDEX idx_customer ON orders(customer_id);`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'transactions':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="transactions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔄 Transactions & ACID - Data Integrity Guarantees
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master transaction management and ACID properties to ensure data consistency and reliability
              </p>
              
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Introduction */}
                <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 p-8 rounded-2xl border border-red-500/30">
                  <h2 className="text-3xl font-bold text-white mb-6">🔒 Database Transactions & ACID Properties</h2>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg mb-6">
                    <h4 className="text-xl font-bold text-blue-300 mb-4">🎯 Transaction Theory & Database Reliability</h4>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      Transactions are the fundamental mechanism ensuring database reliability and consistency. They provide the theoretical foundation 
                      for building robust, fault-tolerant database systems that can handle concurrent access and system failures gracefully.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">Transaction Theory Foundations:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Atomicity:</strong> All-or-nothing execution guarantee</li>
                        <li>• <strong className="text-white">Consistency:</strong> Database remains in valid state</li>
                        <li>• <strong className="text-white">Isolation:</strong> Concurrent transaction independence</li>
                        <li>• <strong className="text-white">Durability:</strong> Permanent data persistence</li>
                        <li>• <strong className="text-white">Concurrency Control:</strong> Managing simultaneous access</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-300">
                    <p className="text-lg leading-relaxed">
                      A <strong className="text-white">transaction</strong> is a sequence of database operations that are treated as a single unit of work. 
                      Either all operations succeed (commit), or if any operation fails, all operations are rolled back to maintain data consistency.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Think of a transaction like a bank transfer: you want to deduct money from Account A and add it to Account B. 
                      If the deduction succeeds but the addition fails, you&apos;re in trouble! Transactions ensure both operations happen together or neither happens.
                    </p>
                    <div className="bg-gray-800 p-6 rounded-xl mt-4">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">🎯 Real-World Examples</h4>
                      <ul className="space-y-2">
                        <li>• <strong className="text-white">Bank Transfer:</strong> Deduct from sender + Add to receiver (both or neither)</li>
                        <li>• <strong className="text-white">Online Shopping:</strong> Create order + Reduce inventory + Process payment</li>
                        <li>• <strong className="text-white">User Registration:</strong> Create user + Send welcome email + Set default preferences</li>
                        <li>• <strong className="text-white">Data Migration:</strong> Copy data + Update references + Clean old data</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Transaction Lifecycle */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">🔄 Transaction Lifecycle & States</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">📋 Understanding Transaction States</h3>
                      <p className="text-gray-300 mb-4">
                        Every transaction goes through a well-defined lifecycle with distinct states. Understanding these states is crucial for database design and troubleshooting.
                      </p>
                      <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl mb-4">
                        <h4 className="text-lg font-bold text-blue-300 mb-3">🔄 Transaction State Machine</h4>
                        <div className="space-y-3 text-gray-300">
                          <div className="flex items-start">
                            <span className="text-green-400 mr-3 text-xl">1.</span>
                            <div>
                              <strong className="text-white">Active State:</strong> Transaction is executing operations. All changes are temporary and can be rolled back.
                            </div>
                          </div>
                          <div className="flex items-start">
                            <span className="text-yellow-400 mr-3 text-xl">2.</span>
                            <div>
                              <strong className="text-white">Partially Committed:</strong> All operations completed successfully, but changes not yet made permanent.
                            </div>
                          </div>
                          <div className="flex items-start">
                            <span className="text-green-400 mr-3 text-xl">3.</span>
                            <div>
                              <strong className="text-white">Committed:</strong> All changes permanently saved to database. Transaction is complete.
                            </div>
                          </div>
                          <div className="flex items-start">
                            <span className="text-red-400 mr-3 text-xl">4.</span>
                            <div>
                              <strong className="text-white">Failed:</strong> Transaction encountered an error and cannot proceed.
                            </div>
                          </div>
                          <div className="flex items-start">
                            <span className="text-gray-400 mr-3 text-xl">5.</span>
                            <div>
                              <strong className="text-white">Aborted:</strong> Transaction rolled back to initial state. No changes made to database.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">💡 Why Transactions Matter in Real Applications</h3>
                      <p className="text-gray-300 mb-4">
                        Transactions are not just database concepts - they&apos;re fundamental to building reliable applications. Here&apos;s why they&apos;re essential:
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl">
                          <h4 className="text-lg font-bold text-purple-300 mb-3">🏦 Financial Systems</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>Bank Transfers:</strong> Money must move atomically between accounts</li>
                            <li>• <strong>Stock Trading:</strong> Buy/sell orders must execute completely or not at all</li>
                            <li>• <strong>Payment Processing:</strong> Charge customer + update inventory + send confirmation</li>
                            <li>• <strong>Currency Exchange:</strong> Convert between currencies maintaining total value</li>
                          </ul>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-xl">
                          <h4 className="text-lg font-bold text-green-300 mb-3">🛒 E-Commerce</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>Order Processing:</strong> Create order + reduce stock + process payment</li>
                            <li>• <strong>Inventory Management:</strong> Reserve items + update quantities + handle returns</li>
                            <li>• <strong>User Accounts:</strong> Register user + send email + set preferences</li>
                            <li>• <strong>Recommendations:</strong> Track views + update algorithms + store preferences</li>
                          </ul>
                        </div>
                        <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-xl">
                          <h4 className="text-lg font-bold text-orange-300 mb-3">🏥 Healthcare</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>Patient Records:</strong> Update medical history + schedule appointments + bill insurance</li>
                            <li>• <strong>Prescriptions:</strong> Doctor approval + pharmacy dispensing + insurance billing</li>
                            <li>• <strong>Lab Results:</strong> Process tests + update patient records + notify doctors</li>
                            <li>• <strong>Emergency Care:</strong> Admit patient + assign bed + update status + notify family</li>
                          </ul>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl">
                          <h4 className="text-lg font-bold text-blue-300 mb-3">🎓 Educational Systems</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>Course Registration:</strong> Enroll student + check prerequisites + update capacity</li>
                            <li>• <strong>Grade Processing:</strong> Calculate GPA + update transcripts + send notifications</li>
                            <li>• <strong>Graduation:</strong> Verify requirements + award degree + update alumni records</li>
                            <li>• <strong>Financial Aid:</strong> Process application + calculate award + disburse funds</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">⚡ Transaction Performance Considerations</h3>
                      <p className="text-gray-300 mb-4">
                        While transactions provide data integrity, they also introduce performance implications that developers must understand:
                      </p>
                      <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-red-300 mb-3">⚠️ Performance Trade-offs</h4>
                        <div className="space-y-4 text-gray-300">
                          <div>
                            <strong className="text-white">Locking Overhead:</strong> Transactions acquire locks on data, preventing other transactions from accessing the same data simultaneously. This can create bottlenecks in high-concurrency systems.
                          </div>
                          <div>
                            <strong className="text-white">Logging Requirements:</strong> Every transaction operation must be logged to ensure durability. This creates I/O overhead and can slow down write operations.
                          </div>
                          <div>
                            <strong className="text-white">Rollback Complexity:</strong> If a transaction needs to rollback, the database must undo all changes, which can be expensive for large transactions.
                          </div>
                          <div>
                            <strong className="text-white">Deadlock Risk:</strong> Multiple transactions can create deadlocks when they wait for each other&apos;s resources, requiring detection and resolution mechanisms.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">🔧 Simple Transaction Example</h3>
                      <p className="text-gray-300 mb-4">
                        Here&apos;s a basic bank transfer example demonstrating transaction principles:
                      </p>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`-- Bank Transfer Transaction
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 What Happens:</p>
                        <div className="text-green-200 text-xs space-y-1">
                          <div>• Both UPDATE operations execute atomically</div>
                          <div>• If either fails, both are rolled back</div>
                          <div>• COMMIT makes changes permanent</div>
                          <div>• No partial transfers possible</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Bank Transfer Example</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Money transfer between accounts
BEGIN;

-- Deduct from sender
UPDATE accounts 
SET balance = balance - 500 
WHERE account_id = 101;

-- Check if sender has sufficient funds
SELECT balance FROM accounts WHERE account_id = 101;

-- Add to receiver
UPDATE accounts 
SET balance = balance + 500 
WHERE account_id = 202;

-- Log transaction
INSERT INTO transactions (from_account, to_account, amount, date)
VALUES (101, 202, 500, NOW());

COMMIT;  -- Save all changes`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">SAVEPOINT</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`BEGIN;

UPDATE products SET stock = stock - 1 WHERE product_id = 1;
SAVEPOINT sp1;

UPDATE products SET stock = stock - 1 WHERE product_id = 2;
SAVEPOINT sp2;

UPDATE products SET stock = stock - 1 WHERE product_id = 3;

-- Rollback to savepoint (keeps changes before sp2)
ROLLBACK TO sp2;

-- Or commit all
COMMIT;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* ACID Properties Deep Dive */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">🧪 ACID Properties - The Foundation of Reliability</h2>
                  
                  <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-xl border border-green-500/30 mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">🔬 What Makes ACID Special?</h3>
                    <p className="text-gray-300 mb-4">
                      ACID is not just an acronym - it&apos;s a set of guarantees that make databases reliable and trustworthy. 
                      These properties ensure that your data remains consistent and accurate, even when multiple users are 
                      accessing and modifying it simultaneously, or when system failures occur.
                    </p>
                    <p className="text-gray-300">
                      Think of ACID as the "quality assurance" for database operations - it guarantees that your data 
                      will never be in an inconsistent or corrupted state, no matter what happens.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">⚛️ Atomicity - The "All or Nothing" Guarantee</h3>
                      <p className="text-gray-300 mb-4">
                        <strong className="text-white">Atomicity</strong> ensures that a transaction is treated as a single, indivisible unit of work. 
                        Either all operations within the transaction succeed, or none of them do. There&apos;s no middle ground.
                      </p>
                      <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl mb-4">
                        <h4 className="text-lg font-bold text-blue-300 mb-3">🔬 Deep Dive: How Atomicity Works</h4>
                        <div className="space-y-3 text-gray-300">
                          <div>
                            <strong className="text-white">Transaction Logging:</strong> Every operation is logged before execution. If any operation fails, 
                            the database uses these logs to undo (rollback) all previous operations in the transaction.
                          </div>
                          <div>
                            <strong className="text-white">Write-Ahead Logging (WAL):</strong> Changes are written to a transaction log before being applied 
                            to the actual data files. This ensures that rollback is always possible.
                          </div>
                          <div>
                            <strong className="text-white">Two-Phase Commit:</strong> In distributed systems, atomicity ensures that all participating 
                            databases either commit or rollback together.
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`-- Example: Bank Transfer (Atomic)
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Atomicity in Action:</p>
                        <div className="text-green-200 text-xs space-y-1">
                          <div>✅ Success: Both accounts updated, money transferred</div>
                          <div>❌ Failure: Neither account changed, no money lost</div>
                          <div>🚫 Never: One account updated, other unchanged</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-4">⚖️ Consistency - The Rule Keeper</h3>
                      <p className="text-gray-300 mb-4">
                        <strong className="text-white">Consistency</strong> ensures that a database transitions from one valid state to another. 
                        The database will never be left in an inconsistent state where business rules or constraints are violated.
                      </p>
                      <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl mb-4">
                        <h4 className="text-lg font-bold text-purple-300 mb-3">🛡️ How Consistency is Maintained</h4>
                        <div className="space-y-3 text-gray-300">
                          <div>
                            <strong className="text-white">Constraint Enforcement:</strong> Database constraints (CHECK, FOREIGN KEY, NOT NULL) 
                            prevent invalid data from being stored, ensuring data integrity.
                          </div>
                          <div>
                            <strong className="text-white">Business Rule Validation:</strong> Complex business logic can be enforced through 
                            triggers, stored procedures, and application-level validation.
                          </div>
                          <div>
                            <strong className="text-white">Referential Integrity:</strong> Foreign key relationships ensure that related data 
                            remains consistent across tables.
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-950 p-4 rounded mb-3">
                        <pre className="text-white font-mono text-sm">
{`-- Example: Balance Constraint
ALTER TABLE accounts ADD CONSTRAINT chk_balance CHECK (balance >= 0);
-- This transaction will be rejected if it violates constraints
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;`}
                        </pre>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
                        <p className="text-sm text-green-300 font-bold mb-2">📊 Consistency in Action:</p>
                        <div className="text-green-200 text-xs space-y-1">
                          <div>✅ Valid: Balance remains ≥ 0, transaction commits</div>
                          <div>❌ Invalid: Balance would go negative, transaction rejected</div>
                          <div>🛡️ Protection: Database never allows invalid states</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Isolation</h3>
                      <p className="text-gray-300 mb-3">Concurrent transactions don&apos;t interfere with each other</p>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`-- Set isolation level
SET TRANSACTION ISOLATION LEVEL 
READ COMMITTED;

BEGIN;
SELECT * FROM products WHERE id = 1;
-- Other transactions can't modify this row
COMMIT;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Durability</h3>
                      <p className="text-gray-300 mb-3">Committed transactions are permanently saved</p>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`BEGIN;
INSERT INTO orders VALUES (1, 'Product A', 100);
COMMIT;
-- Even if server crashes,
-- this data is preserved`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Isolation Levels */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Isolation Levels</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">READ UNCOMMITTED</h3>
                      <p className="text-gray-300 mb-3">Lowest isolation - can read uncommitted changes (dirty reads)</p>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN;
SELECT * FROM products;  -- May see uncommitted changes
COMMIT;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">READ COMMITTED (Default)</h3>
                      <p className="text-gray-300 mb-3">Only reads committed data - prevents dirty reads</p>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN;
SELECT * FROM products;  -- Only sees committed data
COMMIT;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">REPEATABLE READ</h3>
                      <p className="text-gray-300 mb-3">Same query returns same results - prevents non-repeatable reads</p>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT * FROM products WHERE id = 1;
-- Even if others UPDATE, same SELECT returns same result
SELECT * FROM products WHERE id = 1;
COMMIT;`}
                      </pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">SERIALIZABLE</h3>
                      <p className="text-gray-300 mb-3">Highest isolation - full isolation like serial execution</p>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
SELECT * FROM products;  -- Locks rows, prevents all anomalies
COMMIT;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Transaction Best Practices</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-green-400 mb-3">✅ Do</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Keep transactions short</li>
                        <li>• Use appropriate isolation level</li>
                        <li>• Always handle errors (try-catch)</li>
                        <li>• Use COMMIT/ROLLBACK explicitly</li>
                        <li>• Test transaction logic thoroughly</li>
                        <li>• Use SAVEPOINT for partial rollback</li>
                        <li>• Monitor deadlocks</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-red-400 mb-3">❌ Don&apos;t</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Keep transactions open too long</li>
                        <li>• Use highest isolation always (performance cost)</li>
                        <li>• Forget to handle errors</li>
                        <li>• Mix DDL and DML in transactions</li>
                        <li>• Lock more rows than needed</li>
                        <li>• Perform slow operations in transactions</li>
                        <li>• Ignore transaction timeouts</li>
                      </ul>
                    </div>
                  </div>
            </div>
          </main>
        );

      case 'summary':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="summary" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📚 SQL Quick Reference
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Essential SQL commands and best practices at a glance
              </p>
              
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Command Categories */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">SQL Command Categories</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-4">DDL (Data Definition)</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`CREATE TABLE, ALTER TABLE
DROP TABLE, TRUNCATE TABLE
CREATE INDEX, DROP INDEX`}
                      </pre>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-4">DML (Data Manipulation)</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`INSERT INTO
UPDATE SET WHERE
DELETE FROM WHERE`}
                      </pre>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">DQL (Data Query)</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`SELECT FROM WHERE
ORDER BY, GROUP BY
HAVING, LIMIT`}
                      </pre>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">TCL (Transaction Control)</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-4 rounded">
{`BEGIN, COMMIT
ROLLBACK, SAVEPOINT`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Essential Commands */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Essential Commands Cheat Sheet</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-xl">
                      <pre className="text-white font-mono text-sm">
{`-- Query data
SELECT column1, column2 FROM table WHERE condition ORDER BY column DESC LIMIT 10;

-- Insert data
INSERT INTO table (col1, col2) VALUES (val1, val2);

-- Update data
UPDATE table SET column = value WHERE condition;

-- Delete data
DELETE FROM table WHERE condition;

-- Join tables
SELECT * FROM table1 JOIN table2 ON table1.id = table2.fk_id;

-- Aggregate
SELECT category, COUNT(*), AVG(price) FROM products GROUP BY category HAVING COUNT(*) > 5;

-- Subquery
SELECT * FROM table WHERE id IN (SELECT id FROM other_table WHERE condition);

-- Transaction
BEGIN; UPDATE...; INSERT...; COMMIT;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Best Practices Summary</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-green-400 mb-3">✅ Performance</h3>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Use indexes on frequently queried columns</li>
                        <li>• Select only needed columns</li>
                        <li>• Use EXPLAIN to analyze queries</li>
                        <li>• Use LIMIT for large datasets</li>
                        <li>• Avoid functions on indexed columns</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-blue-400 mb-3">🔒 Security</h3>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Use prepared statements</li>
                        <li>• Validate user input</li>
                        <li>• Implement proper authentication</li>
                        <li>• Use least privilege principle</li>
                        <li>• Encrypt sensitive data</li>
                      </ul>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-500 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-purple-400 mb-3">💡 Design</h3>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Normalize to 3NF minimum</li>
                        <li>• Use meaningful names</li>
                        <li>• Define proper constraints</li>
                        <li>• Use foreign keys</li>
                        <li>• Plan for scalability</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Common Patterns */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Common SQL Patterns</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-xl">
                      <h3 className="text-lg font-bold text-yellow-400 mb-2">Pagination</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-3 rounded">
{`SELECT * FROM products ORDER BY id LIMIT 20 OFFSET 40;`}
                      </pre>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-xl">
                      <h3 className="text-lg font-bold text-yellow-400 mb-2">Top N per Group</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-3 rounded">
{`SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) as rn FROM products) WHERE rn <= 3;`}
                      </pre>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-xl">
                      <h3 className="text-lg font-bold text-yellow-400 mb-2">Running Total</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-3 rounded">
{`SELECT date, amount, SUM(amount) OVER (ORDER BY date) as running_total FROM transactions;`}
                      </pre>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-xl">
                      <h3 className="text-lg font-bold text-yellow-400 mb-2">Find Duplicates</h3>
                      <pre className="text-white font-mono text-sm bg-gray-950 p-3 rounded">
{`SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Key Takeaways */}
                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">🎯 Key Takeaways</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span className="text-gray-300"><strong className="text-white">Master SELECT:</strong> Foundation of SQL</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span className="text-gray-300"><strong className="text-white">Use JOINs:</strong> Combine related data</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span className="text-gray-300"><strong className="text-white">Index Wisely:</strong> Balance query speed</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span className="text-gray-300"><strong className="text-white">Normalize Data:</strong> Reduce redundancy</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span className="text-gray-300"><strong className="text-white">Use Transactions:</strong> Ensure data integrity</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span className="text-gray-300"><strong className="text-white">Optimize Queries:</strong> Analyze with EXPLAIN</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span className="text-gray-300"><strong className="text-white">Practice Regularly:</strong> Build real projects</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span className="text-gray-300"><strong className="text-white">Stay Updated:</strong> Learn new SQL features</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'video-tutorials':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="video-tutorials" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ SQL Video Tutorials
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Learn SQL through comprehensive video tutorials
              </p>
              
              <div className="max-w-6xl mx-auto">
                <VideoSection videos={[]} title="SQL Video Tutorials" />
              </div>
            </div>
          </main>
        );

      default:
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗄️ SQL Learning Hub
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Select a topic from the sidebar to start learning
              </p>
            </div>
          </main>
        );
    }
  };

  return (
    <TechLayout onThisPage={pageHeadings} technology="sql" activeSection={activeSection} setActiveSection={setActiveSection}>
      <div>
        {renderContent()}
      </div>
    </TechLayout>
  );
}