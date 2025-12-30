'use client';

// src/app/java/page.tsx
import Link from 'next/link';
import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { videoTutorialsData } from '@/data/videoTutorials';
import { useState, useEffect } from 'react';
import { AUTH_SYSTEM_AVAILABLE } from '@/config/authStatus';

export default function JavaPage() {
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
    { id: 'introduction', title: 'Java Tutorial' },
    { id: 'basics', title: 'Java Basics' },
    { id: 'syntax', title: 'Java Syntax' },
    { id: 'output', title: 'Java Output' },
    { id: 'comments', title: 'Java Comments' },
    { id: 'variables', title: 'Java Variables' },
    { id: 'data-types', title: 'Java Data Types' },
    { id: 'operators', title: 'Java Operators' },
    { id: 'strings', title: 'Java Strings' },
    { id: 'math', title: 'Java Math' },
    { id: 'booleans', title: 'Java Booleans' },
    { id: 'if-else', title: 'Java If...Else' },
    { id: 'switch', title: 'Java Switch' },
    { id: 'loops', title: 'Java Loops' },
    { id: 'arrays', title: 'Java Arrays' },
    { id: 'methods', title: 'Java Methods' },
    { id: 'oop-concepts', title: 'Java OOP Concepts' },
    { id: 'classes-objects', title: 'Java Classes and Objects' },
    { id: 'class-attributes', title: 'Java Class Attributes' },
    { id: 'class-methods', title: 'Java Class Methods' },
    { id: 'constructors', title: 'Java Constructors' },
    { id: 'modifiers', title: 'Java Modifiers' },
    { id: 'encapsulation', title: 'Java Encapsulation' },
    { id: 'packages', title: 'Java Packages' },
    { id: 'inheritance', title: 'Java Inheritance' },
    { id: 'polymorphism', title: 'Java Polymorphism' },
    { id: 'abstraction', title: 'Java Abstraction' },
    { id: 'interfaces', title: 'Java Interface' },
    { id: 'enums', title: 'Java Enums' },
    { id: 'java-keywords', title: 'Java Keywords' },
    { id: 'strings-handling', title: 'Java String Methods' },
    { id: 'arrays-collections', title: 'Java Collections' },
    { id: 'exception-handling', title: 'Java Exception Handling' },
    { id: 'packages-modules', title: 'Java Packages/Modules' },
    { id: 'file-handling', title: 'Java File Handling' },
    { id: 'advanced', title: 'Java Advanced' },
    { id: 'date-time', title: 'Java Date/Time' },
    { id: 'arraylist', title: 'Java ArrayList' },
    { id: 'linkedlist', title: 'Java LinkedList' },
    { id: 'hashmap', title: 'Java HashMap' },
    { id: 'hashset', title: 'Java HashSet' },
    { id: 'iterator', title: 'Java Iterator' },
    { id: 'wrapper-classes', title: 'Java Wrapper Classes' },
    { id: 'exceptions-advanced', title: 'Java Exceptions' },
    { id: 'regex', title: 'Java RegEx' },
    { id: 'threads', title: 'Java Threads' },
    { id: 'lambda', title: 'Java Lambda' },
    { id: 'practice-projects', title: 'Practice Projects' },
    { id: 'video-tutorials', title: 'Video Tutorials' }
  ];

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (hash && pageHeadings.some(heading => heading.id === hash)) {
        setActiveSection(hash);
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
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
        href: `/java/#${previousSection.id}`,
        title: previousSection.title,
        isSection: true
      } : {
        href: '/devops',
        title: 'DevOps',
        isSection: false
      },
      next: nextSection ? {
        href: `/java/#${nextSection.id}`,
        title: nextSection.title,
        isSection: true
      } : {
        href: '/python',
        title: 'Python Programming',
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
              {/* Hero Section */}
              <div className="glass-gradient p-12 rounded-lg mb-12" style={{ background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)' }}>
                <h1 id="introduction" className="text-5xl md:text-6xl font-bold mb-6 text-center text-white">
                  Java Tutorial
                </h1>
                <p className="text-xl text-gray-300 mb-6 text-center max-w-4xl mx-auto">
                  Java is a popular programming language, created in 1995 by Sun Microsystems (now owned by Oracle).
                </p>
                <p className="text-lg text-gray-300 mb-8 text-center max-w-4xl mx-auto">
                  Master Java programming from fundamentals to advanced enterprise development. 
                  Learn to build scalable, maintainable applications used by billions of devices worldwide.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <button 
                    onClick={() => setActiveSection('basics')}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Start Learning Java →
                  </button>
                </div>
                
                <div className="glass-card rounded-lg p-6 text-center" style={{ background: 'rgba(225, 29, 72, 0.2)' }}>
                  <p className="text-gray-300 text-lg">
                    <strong className="text-white">3+ Billion</strong> devices run Java. 
                    It's used for mobile apps, web applications, desktop apps, games, and much more!
                  </p>
                </div>
              </div>

              {/* Overview Section */}
              <div id="overview" className="glass-section p-8 rounded-lg mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">📋 Java Course Overview</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-4">What You'll Learn</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Java syntax and fundamentals</li>
                      <li>• Object-oriented programming</li>
                      <li>• Collections and data structures</li>
                      <li>• Exception handling</li>
                      <li>• Multithreading and concurrency</li>
                      <li>• Spring Framework</li>
                      <li>• Enterprise application development</li>
                      <li>• Best practices and design patterns</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-4">Career Opportunities</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Java Developer</li>
                      <li>• Enterprise Software Developer</li>
                      <li>• Spring Framework Developer</li>
                      <li>• Backend Developer</li>
                      <li>• Android Developer</li>
                      <li>• Full-Stack Developer</li>
                      <li>• Software Architect</li>
                      <li>• Technical Lead</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Why Learn Java */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Why Learn Java?</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4 text-gray-300">
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span>Works on different platforms (Windows, Mac, Linux, Raspberry Pi, etc.)</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span>One of the most popular programming languages in the world</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span>Large demand in the current job market</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span>Easy to learn and simple to use</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span>Open-source and free</span>
                      </div>
                    </div>
                    <div className="space-y-4 text-gray-300">
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span>Secure, fast and powerful</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span>Huge community support (tens of millions of developers)</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span>Object-oriented giving clear structure to programs</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span>Close to C++ and C# making it easy to switch</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Java Theory */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Understanding Java Programming Language</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <p className="text-lg leading-relaxed">
                      <strong className="text-white">Java</strong> is a high-level, class-based, object-oriented programming language developed by <strong className="text-white">James Gosling</strong> and his team at Sun Microsystems (now owned by Oracle Corporation) in 1995. Originally called "Oak" after an oak tree outside Gosling's office, it was later renamed Java, inspired by Java coffee.
                    </p>
                    
                    <p className="text-lg leading-relaxed">
                      Java was designed with the philosophy of <strong className="text-white">"Write Once, Run Anywhere" (WORA)</strong>, meaning that compiled Java code can run on all platforms that support Java without the need for recompilation. This is achieved through the <strong className="text-white">Java Virtual Machine (JVM)</strong>, which serves as an abstraction layer between the compiled code and the underlying hardware.
                    </p>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">🎯 The Philosophy Behind Java</h3>
                      <p className="text-gray-300 mb-4">
                        Java was created with five primary goals that still guide its development today:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">1.</span>
                          <span><strong className="text-white">Simple and Familiar:</strong> Java's syntax is based on C and C++ but removes complex features like pointers, operator overloading, and multiple inheritance to make it easier to learn and use.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">2.</span>
                          <span><strong className="text-white">Object-Oriented:</strong> Everything in Java is an object (except primitives), promoting modular, flexible, and extensible code.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">3.</span>
                          <span><strong className="text-white">Platform Independent:</strong> The famous WORA capability allows Java programs to run on any device with a JVM.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">4.</span>
                          <span><strong className="text-white">Secure:</strong> Built-in security features protect against viruses and malicious code through bytecode verification and sandboxing.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">5.</span>
                          <span><strong className="text-white">High Performance:</strong> Just-In-Time (JIT) compilation converts bytecode to native machine code for faster execution.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">🏗️ Java Architecture & JVM</h3>
                      <p className="text-gray-300 mb-4">
                        Understanding Java's architecture is fundamental to grasping how it achieves platform independence and high performance:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">1. Java Development Kit (JDK)</h4>
                          <p className="text-gray-300 text-sm">
                            The complete development environment containing the JRE, compiler (javac), debugger, and development tools needed to create Java applications.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">2. Java Runtime Environment (JRE)</h4>
                          <p className="text-gray-300 text-sm">
                            Provides the libraries, JVM, and other components to run Java applications. It's what end-users need to execute Java programs.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">3. Java Virtual Machine (JVM)</h4>
                          <p className="text-gray-300 text-sm mb-2">
                            The heart of Java's platform independence. The JVM is responsible for:
                          </p>
                          <ul className="text-gray-300 text-sm space-y-1 ml-4">
                            <li>• Loading bytecode (.class files)</li>
                            <li>• Verifying bytecode for security</li>
                            <li>• Executing bytecode (interpretation or JIT compilation)</li>
                            <li>• Managing memory (heap, stack, garbage collection)</li>
                            <li>• Providing runtime environment</li>
                          </ul>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                          <h4 className="text-white font-bold mb-2">📊 Compilation & Execution Flow</h4>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p><strong className="text-white">Step 1:</strong> Write source code (.java file)</p>
                            <p><strong className="text-white">Step 2:</strong> Java Compiler (javac) converts to bytecode (.class file)</p>
                            <p><strong className="text-white">Step 3:</strong> Class Loader loads .class files into memory</p>
                            <p><strong className="text-white">Step 4:</strong> Bytecode Verifier ensures code safety</p>
                            <p><strong className="text-white">Step 5:</strong> JIT Compiler converts bytecode to native machine code</p>
                            <p><strong className="text-white">Step 6:</strong> Execution Engine runs the native code</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">🌍 Java Ecosystem</h3>
                      <p className="text-gray-300 mb-4">
                        Java isn't just a language—it's a complete ecosystem with various editions and components:
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Java SE</h4>
                          <p className="text-gray-300 text-sm">
                            <strong>Standard Edition</strong> - Core Java platform for desktop and server applications. Includes basic libraries and APIs.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Java EE</h4>
                          <p className="text-gray-300 text-sm">
                            <strong>Enterprise Edition</strong> - Built on SE, adds APIs for large-scale, multi-tiered, scalable, and secure enterprise applications.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Java ME</h4>
                          <p className="text-gray-300 text-sm">
                            <strong>Micro Edition</strong> - Subset of SE for mobile devices, embedded systems, and IoT devices with limited resources.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Key Characteristics of Java</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Platform Independent:</strong> Java code is compiled into bytecode that runs on the Java Virtual Machine (JVM), making it platform-independent. The same bytecode can execute on Windows, Linux, macOS, or any system with a JVM.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Object-Oriented:</strong> Java follows the object-oriented programming paradigm, supporting concepts like encapsulation, inheritance, and polymorphism.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Secure:</strong> Java has built-in security features like bytecode verification, sandboxing, and automatic memory management.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Robust:</strong> Strong memory management, exception handling, and type checking make Java programs reliable.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Multithreaded:</strong> Built-in support for multithreading allows concurrent execution of multiple threads.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Interpreted and Compiled:</strong> Java combines both compilation and interpretation for optimal performance.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">How Java Works</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Java follows a unique compilation and execution process that sets it apart from other programming languages:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-300">
                          <li><strong className="text-white">Source Code:</strong> You write Java code in .java files using any text editor or IDE.</li>
                          <li><strong className="text-white">Compilation:</strong> The Java compiler (javac) converts your source code into bytecode (.class files).</li>
                          <li><strong className="text-white">Bytecode:</strong> This intermediate code is platform-independent and can run on any system with a JVM.</li>
                          <li><strong className="text-white">JVM Execution:</strong> The Java Virtual Machine interprets and executes the bytecode, providing platform-specific machine code.</li>
                          <li><strong className="text-white">Runtime:</strong> Your program runs with the help of the JVM, which handles memory management, garbage collection, and security.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Java is Used For */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-white mb-6">What is Java Used For?</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-900/50 border border-emerald-500/30 rounded-lg p-6">
                      <div className="text-4xl mb-4">📱</div>
                      <h3 className="text-xl font-bold text-white mb-3">Mobile Applications</h3>
                      <p className="text-gray-300">
                        Android apps are primarily built using Java. Billions of mobile devices run Java.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-rose-500/30 rounded-lg p-6">
                      <div className="text-4xl mb-4">🌐</div>
                      <h3 className="text-xl font-bold text-white mb-3">Web Applications</h3>
                      <p className="text-gray-300">
                        Build dynamic web apps with frameworks like Spring Boot, JSP, and Servlets.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                      <div className="text-4xl mb-4">🖥️</div>
                      <h3 className="text-xl font-bold text-purple-400 mb-3">Desktop Applications</h3>
                      <p className="text-gray-300">
                        Create cross-platform desktop apps using JavaFX and Swing.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-yellow-500/30 rounded-lg p-6">
                      <div className="text-4xl mb-4">🏢</div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">Enterprise Software</h3>
                      <p className="text-gray-300">
                        Power large-scale enterprise applications and servers.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                      <div className="text-4xl mb-4">🎮</div>
                      <h3 className="text-xl font-bold text-green-400 mb-3">Games</h3>
                      <p className="text-gray-300">
                        Develop games with engines like LibGDX and jMonkeyEngine.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6">
                      <div className="text-4xl mb-4">🗄️</div>
                      <h3 className="text-xl font-bold text-red-400 mb-3">Big Data</h3>
                      <p className="text-gray-300">
                        Process massive datasets with Hadoop, Spark, and more.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Started */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8 text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Get Started with Java</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    This tutorial will teach you the basics of Java. It is not necessary to have any prior programming experience.
                  </p>
                  <button 
                    onClick={() => setActiveSection('basics')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    Start Learning Java →
                  </button>
                </div>
              </div>
            </div>
          </main>
        );

      case 'output':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Output</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Output</h2>
              <p className="text-lg text-gray-300 mb-6">
                In Java, you can display output to the console using <code className="text-white">System.out.println()</code>.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Print Statements</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">System.out.println()</h3>
                  <p className="text-gray-300 mb-4">Prints text and moves to the next line:</p>
                  <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{`public class OutputExample {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Programming");
    }
}`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">System.out.print()</h3>
                  <p className="text-gray-300 mb-4">Prints text without moving to the next line:</p>
                  <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{`public class PrintExample {
    public static void main(String[] args) {
        System.out.print("Hello ");
        System.out.print("World!");
        // Output: Hello World!
    }
}`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">System.out.printf()</h3>
                  <p className="text-gray-300 mb-4">Formatted output (similar to C's printf):</p>
                  <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{`public class PrintfExample {
    public static void main(String[] args) {
        String name = "John";
        int age = 25;
        double height = 5.9;
        
        System.out.printf("Name: %s, Age: %d, Height: %.1f%n", name, age, height);
        // Output: Name: John, Age: 25, Height: 5.9
    }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Output Methods Comparison</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-rose-900/30">
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Method</th>
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Description</th>
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">println()</code></td>
                      <td className="border border-gray-600 px-4 py-3">Prints and adds newline</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">System.out.println("Hello");</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">print()</code></td>
                      <td className="border border-gray-600 px-4 py-3">Prints without newline</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">System.out.print("Hello");</code></td>
                    </tr>
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">printf()</code></td>
                      <td className="border border-gray-600 px-4 py-3">Formatted output</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">System.out.printf("%s", "Hello");</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'basics':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="basics" className="text-4xl md:text-5xl font-bold mb-6 text-center text-white">
                Java Basics
              </h1>
              <p className="text-lg text-gray-300 mb-8 text-center">
                Master the essential building blocks of Java programming
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* Java Syntax Overview */}
                <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Java Syntax Overview</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Java is a statically-typed, object-oriented programming language with a clear syntax structure. 
                    Understanding these fundamentals is crucial for building robust applications.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">📝 Syntax Rules</h3>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Case-sensitive language</li>
                        <li>• Semicolons end statements</li>
                        <li>• Curly braces define blocks</li>
                        <li>• Comments with // or /* */</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-purple-400 mb-3">🏗️ Structure</h3>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Classes contain methods</li>
                        <li>• Methods contain statements</li>
                        <li>• Package declarations</li>
                        <li>• Import statements</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">🎯 Naming</h3>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• camelCase for variables</li>
                        <li>• PascalCase for classes</li>
                        <li>• UPPER_CASE for constants</li>
                        <li>• Descriptive names</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Data Types and Variables */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Data Types and Variables</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-green-400 mb-4">Primitive Data Types</h3>
                      <p className="text-gray-300 mb-4">
                        Java has 8 primitive data types that store values directly in memory. 
                        These are the building blocks for all other data structures.
                      </p>
                      
                      <div className="bg-gray-900 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-white font-semibold">Integer Types:</div>
                            <div className="text-gray-300">• byte (8-bit)</div>
                            <div className="text-gray-300">• short (16-bit)</div>
                            <div className="text-gray-300">• int (32-bit)</div>
                            <div className="text-gray-300">• long (64-bit)</div>
                          </div>
                          <div>
                            <div className="text-green-400 font-semibold">Other Types:</div>
                            <div className="text-gray-300">• float (32-bit)</div>
                            <div className="text-gray-300">• double (64-bit)</div>
                            <div className="text-gray-300">• boolean (true/false)</div>
                            <div className="text-gray-300">• char (16-bit Unicode)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Reference Types</h3>
                      <p className="text-gray-300 mb-4">
                        Reference types store references to objects in memory. 
                        They include classes, interfaces, arrays, and enums.
                      </p>
                      
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-300">
                          <div className="text-yellow-400 font-semibold mb-2">Common Reference Types:</div>
                          <div>• String - Text data</div>
                          <div>• Arrays - Collections of data</div>
                          <div>• Objects - Instances of classes</div>
                          <div>• Collections - List, Set, Map</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-white mb-4">Variable Declaration and Initialization</h3>
                    <div className="bg-gray-900 p-6 rounded-lg">
                      <pre className="text-green-400 font-mono text-sm">
{`// Variable Declaration and Initialization
public class VariableExamples {
    public static void main(String[] args) {
        // Primitive variables
        int age = 25;                    // Integer
        double salary = 75000.50;        // Double
        boolean isEmployed = true;       // Boolean
        char grade = 'A';                // Character
        
        // Reference variables
        String name = "John Doe";        // String
        int[] numbers = {1, 2, 3, 4, 5}; // Array
        
        // Constants (final keyword)
        final double PI = 3.14159;
        final String COMPANY = "TechCorp";
        
        // Multiple variable declaration
        int x = 10, y = 20, z = 30;
        
        // Display values
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: $" + salary);
        System.out.println("PI: " + PI);
    }
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Control Structures */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Control Structures</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-green-400 mb-4">Conditional Statements</h3>
                      <p className="text-gray-300 mb-4">
                        Control the flow of execution based on conditions. 
                        Essential for making decisions in your programs.
                      </p>
                      
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-green-400 font-mono text-sm">
{`// If-else statements
int score = 85;
String grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else {
    grade = "F";
}

// Ternary operator
String status = (score >= 60) ? "Pass" : "Fail";

// Switch statement
int day = 3;
String dayName;
switch (day) {
    case 1: dayName = "Monday"; break;
    case 2: dayName = "Tuesday"; break;
    case 3: dayName = "Wednesday"; break;
    default: dayName = "Unknown"; break;
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Loop Structures</h3>
                      <p className="text-gray-300 mb-4">
                        Execute code repeatedly until a condition is met. 
                        Choose the right loop for your specific needs.
                      </p>
                      
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-green-400 font-mono text-sm">
{`// For loop - when you know iterations
for (int i = 0; i < 5; i++) {
    System.out.println("Count: " + i);
}

// Enhanced for loop (for-each)
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println("Number: " + num);
}

// While loop - condition checked first
int count = 0;
while (count < 3) {
    System.out.println("While: " + count);
    count++;
}

// Do-while loop - executes at least once
int x = 0;
do {
    System.out.println("Do-while: " + x);
    x++;
} while (x < 3);`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Methods and Functions */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Methods and Functions</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-green-400 mb-4">Method Declaration</h3>
                      <p className="text-gray-300 mb-4">
                        Methods are blocks of code that perform specific tasks. 
                        They promote code reusability and organization.
                      </p>
                      
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-green-400 font-mono text-sm">
{`// Method syntax
[access_modifier] [static] return_type method_name(parameters) {
    // method body
    return value; // if return_type is not void
}

// Examples
public static int add(int a, int b) {
    return a + b;
}

public static void printMessage(String message) {
    System.out.println(message);
}

public static double calculateArea(double radius) {
    return Math.PI * radius * radius;
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Method Overloading</h3>
                      <p className="text-gray-300 mb-4">
                        Multiple methods with the same name but different parameters. 
                        Java determines which method to call based on arguments.
                      </p>
                      
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-green-400 font-mono text-sm">
{`// Method overloading examples
public class Calculator {
    // Add two integers
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Add three integers
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
    
    // Add two doubles
    public static double add(double a, double b) {
        return a + b;
    }
    
    // Add two strings
    public static String add(String a, String b) {
        return a + b;
    }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'syntax':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Syntax</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Syntax</h2>
              <p className="text-lg text-gray-300 mb-6">
                Java syntax is the set of rules that define how a Java program is written and interpreted.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Basic Java Syntax</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Hello World Example</h3>
                  <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Key Syntax Rules</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• <strong className="text-white">Case Sensitive:</strong> Java is case sensitive</li>
                    <li>• <strong className="text-white">Class Names:</strong> Should start with uppercase letter</li>
                    <li>• <strong className="text-white">Method Names:</strong> Should start with lowercase letter</li>
                    <li>• <strong className="text-white">Program File Name:</strong> Must match the class name</li>
                    <li>• <strong className="text-white">Semicolons:</strong> Every statement must end with a semicolon</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'comments':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Comments</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Comments</h2>
              <p className="text-lg text-gray-300 mb-6">
                Comments are essential elements in Java programming that serve multiple purposes beyond just explaining code. They are completely ignored by the Java compiler during compilation but play a crucial role in code documentation, maintenance, and collaboration.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">The Importance of Comments in Java</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Comments in Java serve several critical purposes that extend far beyond simple code explanation:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-white mb-2">📝 Documentation</h3>
                      <p className="text-sm">Comments provide inline documentation that explains what code does, why it does it, and how it works.</p>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-white mb-2">🔧 Maintenance</h3>
                      <p className="text-sm">Well-commented code is easier to maintain, debug, and modify, especially when working in teams.</p>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-white mb-2">🎯 Code Clarity</h3>
                      <p className="text-sm">Comments help clarify complex algorithms, business logic, and non-obvious code behavior.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-white mb-2">📚 Learning Aid</h3>
                      <p className="text-sm">Comments serve as learning tools for new developers joining a project or learning Java.</p>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-white mb-2">🚫 Debugging</h3>
                      <p className="text-sm">Comments can temporarily disable code during debugging without deleting it.</p>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-white mb-2">📖 API Documentation</h3>
                      <p className="text-sm">JavaDoc comments generate professional API documentation automatically.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Types of Comments</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Single-line Comments</h3>
                  <p className="text-gray-300 mb-4">Start with // and end at the end of the line:</p>
                  <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{`public class CommentExample {
    public static void main(String[] args) {
        // This is a single-line comment
        System.out.println("Hello World"); // This is also a comment
    }
}`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Multi-line Comments</h3>
                  <p className="text-gray-300 mb-4">Start with /* and end with */:</p>
                  <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{`public class CommentExample {
    public static void main(String[] args) {
        /* This is a multi-line comment
           It can span multiple lines
           and is useful for longer explanations */
        System.out.println("Hello World");
    }
}`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Documentation Comments</h3>
                  <p className="text-gray-300 mb-4">Start with /** and end with */, used for JavaDoc:</p>
                  <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{`/**
 * This is a documentation comment
 * It describes what the method does
 * @param name the name to greet
 * @return a greeting message
 */
public String greet(String name) {
    return "Hello, " + name + "!";
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'variables':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Variables</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Variables</h2>
              <p className="text-lg text-gray-300 mb-6">
                Variables are fundamental building blocks in Java programming that act as named storage locations in memory. They allow you to store, retrieve, and manipulate data throughout your program's execution. Understanding variables is crucial for any Java developer as they form the foundation of data management in Java applications.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Variables in Java</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  A variable in Java is a named memory location that stores a value of a specific data type. Think of it as a labeled box where you can store different types of information that your program needs to work with.
                </p>
                
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Key Characteristics of Java Variables</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-white mr-3 text-xl">•</span>
                      <span><strong className="text-white">Type Safety:</strong> Every variable must have a declared data type, ensuring type safety at compile time.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 text-xl">•</span>
                      <span><strong className="text-white">Scope:</strong> Variables have a specific scope where they can be accessed and used within your program.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 text-xl">•</span>
                      <span><strong className="text-white">Lifetime:</strong> Variables exist for a specific duration during program execution.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 text-xl">•</span>
                      <span><strong className="text-white">Mutability:</strong> Most variables can have their values changed after initialization (except final variables).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 text-xl">•</span>
                      <span><strong className="text-white">Memory Management:</strong> Java automatically manages memory allocation and deallocation for variables.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Variable Declaration and Initialization</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      In Java, variables must be declared before they can be used. The declaration process involves specifying the data type and giving the variable a name:
                    </p>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-white font-mono text-sm">
                        <strong>Syntax:</strong> dataType variableName = value;
                      </p>
                    </div>
                    <p className="text-gray-300 text-sm">
                      This syntax combines declaration (dataType variableName) with initialization (= value). You can also declare a variable first and initialize it later, but you must initialize it before using it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Variable Types</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Local Variables</h3>
                  <p className="text-gray-300 mb-4">Declared inside methods, constructors, or blocks:</p>
                  <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{`public class VariableExample {
    public static void main(String[] args) {
        // Local variable
        int age = 25;
        String name = "John";
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Instance Variables</h3>
                  <p className="text-gray-300 mb-4">Declared in a class, outside any method:</p>
                  <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{`public class Student {
    // Instance variables
    String name;
    int age;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Static Variables</h3>
                  <p className="text-gray-300 mb-4">Belong to the class rather than any specific instance:</p>
                  <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{`public class Counter {
    // Static variable
    static int count = 0;
    
    public static void increment() {
        count++;
    }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data-types':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Data Types</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Data Types</h2>
              <p className="text-lg text-gray-300 mb-6">
                Data types in Java define the type of data that can be stored in variables and determine the operations that can be performed on them. Java is a statically-typed language, meaning every variable must have a declared type at compile time. This type system ensures type safety and helps prevent runtime errors.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Java Data Types</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Java's type system is designed to provide both flexibility and safety. The language categorizes data types into two main groups, each serving different purposes in application development.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Primitive Data Types</h3>
                    <p className="text-gray-300 mb-4">
                      Primitive types are the basic building blocks of Java's type system. They represent simple values and are not objects.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-white">Built-in:</strong> Predefined by the Java language</li>
                      <li>• <strong className="text-white">Efficient:</strong> Stored directly in memory</li>
                      <li>• <strong className="text-white">Immutable:</strong> Cannot be modified after creation</li>
                      <li>• <strong className="text-white">Value-based:</strong> Compared by value, not reference</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Non-Primitive Data Types</h3>
                    <p className="text-gray-300 mb-4">
                      Non-primitive types are objects that can contain methods and have more complex behavior.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-white">Reference-based:</strong> Stored as references to objects</li>
                      <li>• <strong className="text-white">Extensible:</strong> Can have methods and properties</li>
                      <li>• <strong className="text-white">Nullable:</strong> Can be null</li>
                      <li>• <strong className="text-white">Object-oriented:</strong> Support inheritance and polymorphism</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Memory Management and Data Types</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Understanding how Java manages memory for different data types is crucial for writing efficient programs:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Primitive Types</h4>
                        <p className="text-sm text-gray-300">Stored on the stack, accessed directly, very fast operations</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Reference Types</h4>
                        <p className="text-sm text-gray-300">Stored on the heap, accessed via references, more flexible</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Primitive Data Types</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-rose-900/30">
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Type</th>
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Size</th>
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Range</th>
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">byte</code></td>
                      <td className="border border-gray-600 px-4 py-3">1 byte</td>
                      <td className="border border-gray-600 px-4 py-3">-128 to 127</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">byte b = 100;</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">short</code></td>
                      <td className="border border-gray-600 px-4 py-3">2 bytes</td>
                      <td className="border border-gray-600 px-4 py-3">-32,768 to 32,767</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">short s = 1000;</code></td>
                    </tr>
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">int</code></td>
                      <td className="border border-gray-600 px-4 py-3">4 bytes</td>
                      <td className="border border-gray-600 px-4 py-3">-2,147,483,648 to 2,147,483,647</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">int i = 100000;</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">long</code></td>
                      <td className="border border-gray-600 px-4 py-3">8 bytes</td>
                      <td className="border border-gray-600 px-4 py-3">-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">long l = 100000L;</code></td>
                    </tr>
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">float</code></td>
                      <td className="border border-gray-600 px-4 py-3">4 bytes</td>
                      <td className="border border-gray-600 px-4 py-3">3.4e-038 to 3.4e+038</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">float f = 3.14f;</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">double</code></td>
                      <td className="border border-gray-600 px-4 py-3">8 bytes</td>
                      <td className="border border-gray-600 px-4 py-3">1.7e-308 to 1.7e+308</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">double d = 3.14159;</code></td>
                    </tr>
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">boolean</code></td>
                      <td className="border border-gray-600 px-4 py-3">1 bit</td>
                      <td className="border border-gray-600 px-4 py-3">true or false</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">boolean b = true;</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">char</code></td>
                      <td className="border border-gray-600 px-4 py-3">2 bytes</td>
                      <td className="border border-gray-600 px-4 py-3">0 to 65,535</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">char c = 'A';</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'operators':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Operators</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Operators</h2>
              <p className="text-lg text-gray-300 mb-6">
                Operators in Java are special symbols that perform specific operations on one, two, or three operands and return a result. They are the building blocks of expressions and statements in Java programming. Understanding operators is fundamental to writing effective Java code, as they enable you to manipulate data, make decisions, and control program flow.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Java Operators</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Java operators are categorized based on the number of operands they work with and the type of operation they perform. This classification helps developers understand when and how to use each operator effectively.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Unary Operators</h3>
                    <p className="text-gray-300 mb-4">
                      Work with a single operand to perform operations like increment, decrement, and negation.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-white">++ (increment):</strong> Increases value by 1</li>
                      <li>• <strong className="text-white">-- (decrement):</strong> Decreases value by 1</li>
                      <li>• <strong className="text-white">! (logical NOT):</strong> Inverts boolean value</li>
                      <li>• <strong className="text-white">- (unary minus):</strong> Negates numeric value</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Binary Operators</h3>
                    <p className="text-gray-300 mb-4">
                      Work with two operands to perform arithmetic, comparison, and logical operations.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-white">Arithmetic:</strong> +, -, *, /, %</li>
                      <li>• <strong className="text-white">Comparison:</strong> ==, !=, &lt;, &gt;, &lt;=, &gt;=</li>
                      <li>• <strong className="text-white">Logical:</strong> &&, ||</li>
                      <li>• <strong className="text-white">Assignment:</strong> =, +=, -=, *=, /=</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Ternary Operator</h3>
                    <p className="text-gray-300 mb-4">
                      The only ternary operator in Java, used for conditional expressions.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-white">Conditional:</strong> condition ? value1 : value2</li>
                      <li>• <strong className="text-white">Compact:</strong> Alternative to if-else statements</li>
                      <li>• <strong className="text-white">Expression:</strong> Returns a value</li>
                      <li>• <strong className="text-white">Nested:</strong> Can be chained for complex conditions</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Operator Precedence and Associativity</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Understanding operator precedence is crucial for writing correct Java expressions. Java follows specific rules for evaluating expressions with multiple operators:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Precedence</h4>
                        <p className="text-sm text-gray-300">Determines which operators are evaluated first in an expression</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Associativity</h4>
                        <p className="text-sm text-gray-300">Determines the order when operators have the same precedence</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Arithmetic Operators</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-rose-900/30">
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Operator</th>
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Name</th>
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">+</code></td>
                      <td className="border border-gray-600 px-4 py-3">Addition</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x + y</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">-</code></td>
                      <td className="border border-gray-600 px-4 py-3">Subtraction</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x - y</code></td>
                    </tr>
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">*</code></td>
                      <td className="border border-gray-600 px-4 py-3">Multiplication</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x * y</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">/</code></td>
                      <td className="border border-gray-600 px-4 py-3">Division</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x / y</code></td>
                    </tr>
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">%</code></td>
                      <td className="border border-gray-600 px-4 py-3">Modulus</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x % y</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Comparison Operators</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-rose-900/30">
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Operator</th>
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Name</th>
                      <th className="border border-gray-600 px-4 py-3 text-left text-white">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">==</code></td>
                      <td className="border border-gray-600 px-4 py-3">Equal to</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x == y</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">!=</code></td>
                      <td className="border border-gray-600 px-4 py-3">Not equal</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x != y</code></td>
                    </tr>
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">&gt;</code></td>
                      <td className="border border-gray-600 px-4 py-3">Greater than</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x &gt; y</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">&lt;</code></td>
                      <td className="border border-gray-600 px-4 py-3">Less than</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x &lt; y</code></td>
                    </tr>
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">&gt;=</code></td>
                      <td className="border border-gray-600 px-4 py-3">Greater than or equal</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x &gt;= y</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-white">&lt;=</code></td>
                      <td className="border border-gray-600 px-4 py-3">Less than or equal</td>
                      <td className="border border-gray-600 px-4 py-3"><code className="text-green-300">x &lt;= y</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Example Code</h2>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`public class OperatorsExample {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        
        // Arithmetic operators
        System.out.println("Addition: " + (a + b));        // 13
        System.out.println("Subtraction: " + (a - b));     // 7
        System.out.println("Multiplication: " + (a * b)); // 30
        System.out.println("Division: " + (a / b));        // 3
        System.out.println("Modulus: " + (a % b));         // 1
        
        // Comparison operators
        System.out.println("Equal: " + (a == b));        // false
        System.out.println("Not equal: " + (a != b));    // true
        System.out.println("Greater: " + (a > b));       // true
        System.out.println("Less: " + (a < b));          // false
    }
}`}</code>
              </pre>
            </div>
          </div>
        );

      case 'strings':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Strings</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Strings</h2>
              <p className="text-lg text-gray-300 mb-6">
                Strings in Java are objects that represent sequences of characters. They are one of the most commonly used data types in Java programming, serving as the foundation for text processing, user input handling, and data manipulation. Understanding strings is essential for any Java developer, as they are used in virtually every Java application.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Java Strings</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Strings in Java are immutable objects, meaning once created, their content cannot be changed. This design choice has important implications for memory management, performance, and thread safety in Java applications.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">String Characteristics</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Immutable:</strong> Cannot be modified after creation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Object-based:</strong> Strings are objects, not primitives</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Unicode Support:</strong> Can store international characters</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Thread-safe:</strong> Safe for concurrent access</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">String Creation Methods</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">String Literal:</strong> "Hello World"</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Constructor:</strong> new String("Hello")</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Concatenation:</strong> "Hello" + "World"</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Methods:</strong> substring(), toString()</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">String Memory Management</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Java uses a special memory area called the String Pool (String Constant Pool) to optimize memory usage for strings:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">String Pool</h4>
                        <p className="text-sm text-gray-300">Stores unique string literals to avoid duplication</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Heap Memory</h4>
                        <p className="text-sm text-gray-300">Stores string objects created with 'new' keyword</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">String Examples</h2>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`public class StringExample {
    public static void main(String[] args) {
        // Creating strings
        String greeting = "Hello";
        String name = "World";
        
        // String concatenation
        String message = greeting + " " + name;
        System.out.println(message); // Hello World
        
        // String length
        System.out.println("Length: " + message.length()); // 11
        
        // String methods
        System.out.println(message.toUpperCase()); // HELLO WORLD
        System.out.println(message.toLowerCase()); // hello world
    }
}`}</code>
              </pre>
            </div>
          </div>
        );

      case 'math':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Math</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Math Class</h2>
              <p className="text-lg text-gray-300 mb-6">
                The Math class in Java is a utility class that provides a comprehensive set of mathematical functions and constants. It contains static methods for performing basic and advanced mathematical operations, making it an essential tool for scientific computing, data analysis, and any application requiring mathematical calculations.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding the Math Class</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  The Math class is part of the java.lang package and is automatically imported into every Java program. It provides a wide range of mathematical operations that are commonly needed in programming applications.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Static Methods:</strong> All methods are static, called directly on the class</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Precision:</strong> High-precision mathematical calculations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Constants:</strong> Mathematical constants like PI and E</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Optimized:</strong> Highly optimized for performance</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Method Categories</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Basic Operations:</strong> min(), max(), abs(), round()</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Power Functions:</strong> pow(), sqrt(), cbrt()</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Trigonometric:</strong> sin(), cos(), tan(), atan()</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Logarithmic:</strong> log(), log10(), exp()</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Mathematical Constants</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      The Math class provides important mathematical constants that are frequently used in calculations:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Math.PI</h4>
                        <p className="text-sm text-gray-300">The ratio of a circle's circumference to its diameter (≈ 3.14159)</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Math.E</h4>
                        <p className="text-sm text-gray-300">The base of natural logarithms (≈ 2.71828)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Math Methods</h2>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`public class MathExample {
    public static void main(String[] args) {
        double x = 4.0;
        double y = 2.0;
        
        // Basic math operations
        System.out.println("Max: " + Math.max(x, y));     // 4.0
        System.out.println("Min: " + Math.min(x, y));     // 2.0
        System.out.println("Abs: " + Math.abs(-5));       // 5
        System.out.println("Sqrt: " + Math.sqrt(x));       // 2.0
        System.out.println("Pow: " + Math.pow(x, y));     // 16.0
        System.out.println("Round: " + Math.round(4.7));  // 5
        System.out.println("Random: " + Math.random());    // 0.0 to 1.0
    }
}`}</code>
              </pre>
            </div>
          </div>
        );

      case 'booleans':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Booleans</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Booleans</h2>
              <p className="text-lg text-gray-300 mb-6">
                The boolean data type in Java is a primitive type that represents logical values. It can only hold two possible values: true or false. Booleans are fundamental to programming logic, enabling decision-making, conditional execution, and control flow in Java applications. They form the backbone of conditional statements, loops, and logical operations.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Java Booleans</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Boolean values are essential for implementing logic in Java programs. They enable the program to make decisions based on conditions and control the flow of execution through different code paths.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Boolean Characteristics</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Primitive Type:</strong> Not an object, stored directly in memory</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Two Values:</strong> Only true or false, no other values</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Size:</strong> Typically 1 bit, but JVM implementation dependent</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Default Value:</strong> false for uninitialized boolean variables</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Common Uses</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Conditional Statements:</strong> if, else, switch conditions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Loop Control:</strong> while, for loop conditions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Method Returns:</strong> Functions that return true/false</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Flags:</strong> State indicators and toggles</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Boolean Logic Operations</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Java provides logical operators for combining and manipulating boolean values:
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Logical AND (&&)</h4>
                        <p className="text-sm text-gray-300">Returns true only if both operands are true</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Logical OR (||)</h4>
                        <p className="text-sm text-gray-300">Returns true if at least one operand is true</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Logical NOT (!)</h4>
                        <p className="text-sm text-gray-300">Inverts the boolean value</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Boolean Examples</h2>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`public class BooleanExample {
    public static void main(String[] args) {
        boolean isJavaFun = true;
        boolean isFishTasty = false;
        
        System.out.println(isJavaFun);     // true
        System.out.println(isFishTasty);   // false
        
        // Boolean expressions
        int x = 10;
        int y = 9;
        System.out.println(x > y);         // true
        System.out.println(x == 10);       // true
        System.out.println(x == 15);       // false
    }
}`}</code>
              </pre>
            </div>
          </div>
        );

      case 'if-else':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java If...Else</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java If...Else Statements</h2>
              <p className="text-lg text-gray-300 mb-6">
                Conditional statements in Java allow programs to make decisions and execute different code paths based on specific conditions. The if-else construct is fundamental to programming logic, enabling dynamic behavior and decision-making in applications. Understanding conditional statements is crucial for creating interactive and intelligent programs.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Conditional Statements</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Conditional statements form the backbone of program logic, allowing applications to respond differently based on various conditions. They enable programs to make decisions, validate input, handle errors, and create dynamic user experiences.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Key Concepts</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Condition Evaluation:</strong> Boolean expressions that determine execution path</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Code Blocks:</strong> Groups of statements executed based on conditions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Flow Control:</strong> Determines which code executes next</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Nesting:</strong> Conditions can be nested within other conditions</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Statement Types</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">if Statement:</strong> Executes code when condition is true</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">if-else Statement:</strong> Provides alternative execution path</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">if-else-if:</strong> Multiple condition checking</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Nested if:</strong> Conditions within conditions</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Conditional Logic Best Practices</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Writing effective conditional statements requires understanding of logical operators and proper structure:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Clear Conditions</h4>
                        <p className="text-sm text-gray-300">Use descriptive variable names and clear boolean expressions</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Proper Nesting</h4>
                        <p className="text-sm text-gray-300">Avoid deep nesting; use early returns or guard clauses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">If...Else Examples</h2>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`public class IfElseExample {
    public static void main(String[] args) {
        int time = 22;
        
        // Simple if statement
        if (time < 18) {
            System.out.println("Good day.");
        }
        
        // If...else statement
        if (time < 18) {
            System.out.println("Good day.");
        } else {
            System.out.println("Good evening.");
        }
        
        // If...else if...else statement
        if (time < 10) {
            System.out.println("Good morning.");
        } else if (time < 20) {
            System.out.println("Good day.");
        } else {
            System.out.println("Good evening.");
        }
    }
}`}</code>
              </pre>
            </div>
          </div>
        );

      case 'switch':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Switch</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Switch Statements</h2>
              <p className="text-lg text-gray-300 mb-6">
                The switch statement in Java provides an efficient way to handle multiple conditional branches based on a single variable's value. It offers a cleaner alternative to long chains of if-else statements, improving code readability and performance. Switch statements are particularly useful when dealing with multiple discrete values and can work with various data types including primitives, strings, and enums.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Switch Statements</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Switch statements provide a structured approach to handling multiple conditions by comparing a single expression against multiple constant values. They offer better performance than equivalent if-else chains and improve code organization.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Switch Components</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Expression:</strong> The value being evaluated</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Cases:</strong> Constant values to match against</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Break:</strong> Prevents fall-through to next case</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Default:</strong> Executes when no case matches</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Supported Data Types</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Primitives:</strong> byte, short, int, char</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Wrapper Classes:</strong> Byte, Short, Integer, Character</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">String:</strong> Since Java 7</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Enums:</strong> User-defined enumeration types</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Switch Statement Benefits</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Switch statements offer several advantages over if-else chains:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Performance</h4>
                        <p className="text-sm text-gray-300">More efficient than multiple if-else statements</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Readability</h4>
                        <p className="text-sm text-gray-300">Cleaner, more organized code structure</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Maintainability</h4>
                        <p className="text-sm text-gray-300">Easier to add or modify cases</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Fall-through</h4>
                        <p className="text-sm text-gray-300">Controlled execution flow with break statements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Switch Examples</h2>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`public class SwitchExample {
    public static void main(String[] args) {
        int day = 4;
        
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Invalid day");
        }
    }
}`}</code>
              </pre>
            </div>
          </div>
        );

      case 'loops':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Loops</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Loops</h2>
              <p className="text-lg text-gray-300 mb-6">
                Loops in Java are control structures that allow repeated execution of code blocks based on specific conditions. They are fundamental to programming, enabling efficient processing of data collections, iterative algorithms, and repetitive tasks. Understanding loops is essential for writing efficient and maintainable Java applications.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Java Loops</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Loops provide a powerful mechanism for automating repetitive tasks and processing collections of data. They help reduce code duplication and enable complex algorithms that require iteration.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">For Loop</h3>
                    <p className="text-gray-300 mb-4">
                      Best for known number of iterations with initialization, condition, and increment.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-white">Initialization:</strong> Set starting value</li>
                      <li>• <strong className="text-white">Condition:</strong> Test continuation</li>
                      <li>• <strong className="text-white">Increment:</strong> Update counter</li>
                      <li>• <strong className="text-white">Use Cases:</strong> Array processing, counting</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">While Loop</h3>
                    <p className="text-gray-300 mb-4">
                      Executes as long as condition is true, condition checked before each iteration.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-white">Pre-test:</strong> Condition checked first</li>
                      <li>• <strong className="text-white">Zero iterations:</strong> May not execute</li>
                      <li>• <strong className="text-white">Manual control:</strong> Update condition manually</li>
                      <li>• <strong className="text-white">Use Cases:</strong> User input, file reading</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Do-While Loop</h3>
                    <p className="text-gray-300 mb-4">
                      Executes at least once, then checks condition for continuation.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-white">Post-test:</strong> Condition checked after execution</li>
                      <li>• <strong className="text-white">Guaranteed execution:</strong> Always runs once</li>
                      <li>• <strong className="text-white">Menu systems:</strong> Perfect for user menus</li>
                      <li>• <strong className="text-white">Use Cases:</strong> Input validation, menus</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Loop Control Statements</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Java provides control statements to manage loop execution:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">break Statement</h4>
                        <p className="text-sm text-gray-300">Immediately exits the loop</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">continue Statement</h4>
                        <p className="text-sm text-gray-300">Skips to next iteration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Loop Examples</h2>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`public class LoopExample {
    public static void main(String[] args) {
        // For loop
        System.out.println("For loop:");
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
        
        // While loop
        System.out.println("While loop:");
        int j = 1;
        while (j <= 5) {
            System.out.println("Count: " + j);
            j++;
        }
        
        // Do...while loop
        System.out.println("Do...while loop:");
        int k = 1;
        do {
            System.out.println("Count: " + k);
            k++;
        } while (k <= 5);
    }
}`}</code>
              </pre>
            </div>
          </div>
        );

      case 'arrays':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Arrays</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Arrays</h2>
              <p className="text-lg text-gray-300 mb-6">
                Arrays in Java are data structures that store multiple values of the same data type in a contiguous memory location. They provide an efficient way to organize and access related data, enabling powerful algorithms and data processing capabilities. Understanding arrays is fundamental to Java programming and essential for working with collections of data.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Java Arrays</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Arrays are one of the most fundamental data structures in programming, providing a systematic way to store and access multiple values using a single variable name and an index.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Array Characteristics</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Fixed Size:</strong> Length determined at creation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Homogeneous:</strong> All elements same data type</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Indexed Access:</strong> Elements accessed by index</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Contiguous Memory:</strong> Elements stored sequentially</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Array Advantages</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Efficient Access:</strong> O(1) random access time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Memory Efficient:</strong> Contiguous storage</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Cache Friendly:</strong> Better performance due to locality</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Simple Syntax:</strong> Easy to declare and use</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Array Memory Management</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Understanding how arrays are stored in memory is crucial for performance optimization:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Heap Storage</h4>
                        <p className="text-sm text-gray-300">Arrays are objects stored on the heap</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Reference Variable</h4>
                        <p className="text-sm text-gray-300">Array variable holds reference to memory location</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Array Examples</h2>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`public class ArrayExample {
    public static void main(String[] args) {
        // Declare and initialize array
        String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
        
        // Access array elements
        System.out.println(cars[0]); // Volvo
        
        // Change array element
        cars[0] = "Opel";
        System.out.println(cars[0]); // Opel
        
        // Array length
        System.out.println("Array length: " + cars.length); // 4
        
        // Loop through array
        for (int i = 0; i < cars.length; i++) {
            System.out.println(cars[i]);
        }
        
        // Enhanced for loop
        for (String car : cars) {
            System.out.println(car);
        }
    }
}`}</code>
              </pre>
            </div>
          </div>
        );

      case 'methods':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Methods</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Methods</h2>
              <p className="text-lg text-gray-300 mb-6">
                Methods in Java are reusable blocks of code that perform specific tasks and can be called from other parts of the program. They are fundamental to object-oriented programming, enabling code organization, reusability, and modularity. Understanding methods is essential for writing maintainable and efficient Java applications.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Java Methods</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Methods are the building blocks of Java programs, providing a way to encapsulate functionality and create reusable code. They promote code organization, reduce duplication, and make programs easier to understand and maintain.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Method Components</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Method Signature:</strong> Name and parameter list</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Return Type:</strong> Data type of returned value</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Parameters:</strong> Input values for the method</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Method Body:</strong> Code that executes when called</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Method Benefits</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Code Reusability:</strong> Write once, use many times</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Modularity:</strong> Break complex problems into smaller parts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Maintainability:</strong> Easier to debug and modify</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-3 text-xl">•</span>
                        <span><strong className="text-white">Testing:</strong> Individual methods can be tested separately</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Method Types and Usage</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Java supports different types of methods for various programming scenarios:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Static Methods</h4>
                        <p className="text-sm text-gray-300">Belong to class, called without creating objects</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Instance Methods</h4>
                        <p className="text-sm text-gray-300">Belong to objects, called on specific instances</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Void Methods</h4>
                        <p className="text-sm text-gray-300">Perform actions but don't return values</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Return Methods</h4>
                        <p className="text-sm text-gray-300">Calculate and return specific values</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Method Examples</h2>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`public class MethodExample {
    // Method with no parameters
    static void myMethod() {
        System.out.println("I just got executed!");
    }
    
    // Method with parameters
    static void myMethodWithParams(String fname, int age) {
        System.out.println(fname + " is " + age);
    }
    
    // Method with return value
    static int myMethodWithReturn(int x, int y) {
        return x + y;
    }
    
    public static void main(String[] args) {
        myMethod();                                    // I just got executed!
        myMethodWithParams("Liam", 5);                 // Liam is 5
        int result = myMethodWithReturn(5, 3);
        System.out.println("Result: " + result);       // Result: 8
    }
}`}</code>
              </pre>
            </div>
          </div>
        );

      case 'intermediate':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="intermediate" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ☕ Intermediate Java
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Deepen your understanding with core Java concepts
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-6 rounded-xl border border-rose-500/30 hover:scale-105 transition-transform">
                    <div className="text-3xl mb-4">🏗️</div>
                    <h3 className="text-xl font-bold text-white mb-3">OOP Concepts</h3>
                    <p className="text-gray-300 mb-4">Master Encapsulation, Inheritance, Polymorphism, and Abstraction.</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Classes and Objects</li>
                      <li>• Encapsulation</li>
                      <li>• Inheritance</li>
                      <li>• Polymorphism</li>
                      <li>• Abstraction</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 p-6 rounded-xl border border-purple-500/30 hover:scale-105 transition-transform">
                    <div className="text-3xl mb-4">🔑</div>
                    <h3 className="text-xl font-bold text-purple-400 mb-3">Java Keywords</h3>
                    <p className="text-gray-300 mb-4">Understand the usage of important keywords like final, static, super, this.</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• static keyword</li>
                      <li>• final keyword</li>
                      <li>• super keyword</li>
                      <li>• this keyword</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 p-6 rounded-xl border border-green-500/30 hover:scale-105 transition-transform">
                    <div className="text-3xl mb-4">📝</div>
                    <h3 className="text-xl font-bold text-green-400 mb-3">Strings & String Handling</h3>
                    <p className="text-gray-300 mb-4">Explore String class, StringBuilder, StringBuffer, and common operations.</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• String class methods</li>
                      <li>• StringBuilder</li>
                      <li>• StringBuffer</li>
                      <li>• String manipulation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 p-6 rounded-xl border border-yellow-500/30 hover:scale-105 transition-transform">
                    <div className="text-3xl mb-4">📊</div>
                    <h3 className="text-xl font-bold text-yellow-400 mb-3">Arrays & Collections</h3>
                    <p className="text-gray-300 mb-4">Learn about arrays, ArrayList, LinkedList, HashMap, HashSet, and more.</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Arrays</li>
                      <li>• ArrayList</li>
                      <li>• HashMap</li>
                      <li>• HashSet</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 p-6 rounded-xl border border-red-500/30 hover:scale-105 transition-transform">
                    <div className="text-3xl mb-4">⚠️</div>
                    <h3 className="text-xl font-bold text-red-400 mb-3">Exception Handling</h3>
                    <p className="text-gray-300 mb-4">Understand try-catch, finally, throws, custom exceptions.</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• try-catch blocks</li>
                      <li>• finally block</li>
                      <li>• throws keyword</li>
                      <li>• Custom exceptions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-800/50 p-6 rounded-xl border border-indigo-500/30 hover:scale-105 transition-transform">
                    <div className="text-3xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-indigo-400 mb-3">Packages & Modules</h3>
                    <p className="text-gray-300 mb-4">Organize your code with packages and explore Java Platform Module System.</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Package creation</li>
                      <li>• Import statements</li>
                      <li>• Access modifiers</li>
                      <li>• Module system</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'oop-concepts':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="oop-concepts" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🏗️ Object-Oriented Programming Concepts
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master the four pillars of OOP: Encapsulation, Inheritance, Polymorphism, and Abstraction
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* What is OOP - Enhanced with detailed theory */}
                <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">What is Object-Oriented Programming?</h2>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    <strong className="text-white">Object-Oriented Programming (OOP)</strong> is a programming paradigm that organizes software design around data (objects) rather than functions and logic. It is one of the most powerful and widely-used programming approaches, forming the foundation of modern software development. Java is a pure object-oriented language where everything revolves around objects and classes, making it an ideal language for learning and implementing OOP principles.
                  </p>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">The Philosophy Behind OOP</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      OOP emerged as a solution to the complexity and maintenance challenges of procedural programming. Instead of writing programs as a sequence of instructions, OOP organizes code into self-contained objects that interact with each other. This paradigm shift brings several fundamental advantages that revolutionized software development.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">🌍 Real-world Modeling</h4>
                        <p className="text-sm text-gray-300">OOP allows developers to model real-world entities directly in code, making software design more intuitive and natural</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">🧩 Modularity</h4>
                        <p className="text-sm text-gray-300">Code is organized into discrete, independent modules that can be developed, tested, and maintained separately</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">♻️ Code Reusability</h4>
                        <p className="text-sm text-gray-300">Once created, classes and objects can be reused across different parts of an application or in different projects</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">🚀 Extensibility</h4>
                        <p className="text-sm text-gray-300">New features can be added to existing code without modifying the original implementation</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Four Pillars with Detailed Explanation */}
                <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">The Four Pillars of OOP</h2>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    Object-Oriented Programming is built on four fundamental principles, often called the "Four Pillars of OOP." These principles work together to create robust, maintainable, and scalable software systems. Understanding these pillars is essential for mastering Java and OOP concepts.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-green-900/20 to-gray-800 p-6 rounded-xl border border-green-500/30">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">🔒 1. Encapsulation</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-bold text-green-300 mb-1">Definition:</p>
                          <p className="text-gray-300 text-sm">Encapsulation is the bundling of data (attributes) and methods (functions) that operate on that data into a single unit called a class. It also involves hiding the internal state of objects and restricting direct access to some components.</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-green-300 mb-1">How it Works:</p>
                          <p className="text-gray-300 text-sm">Encapsulation uses access modifiers (private, public, protected) to control visibility. Data is typically kept private, and public methods (getters/setters) provide controlled access to that data.</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-green-300 mb-1">Real-World Analogy:</p>
                          <p className="text-gray-300 text-sm">A car's engine is encapsulated under the hood. You interact with it through the steering wheel, pedals, and dashboard, not by directly touching the engine components. The complex mechanisms are hidden, and you only use simple interfaces.</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded">
                          <p className="text-xs font-bold text-green-300 mb-1">Benefits:</p>
                          <ul className="text-xs text-gray-300 space-y-1">
                            <li>• Data hiding and security</li>
                            <li>• Controlled access through validation</li>
                            <li>• Easier maintenance and flexibility</li>
                            <li>• Reduces system complexity</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/20 to-gray-800 p-6 rounded-xl border border-purple-500/30">
                      <h3 className="text-2xl font-bold text-purple-400 mb-4">🧬 2. Inheritance</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-bold text-purple-300 mb-1">Definition:</p>
                          <p className="text-gray-300 text-sm">Inheritance is the mechanism by which one class (child/subclass) acquires the properties and behaviors of another class (parent/superclass). It enables code reuse and establishes hierarchical relationships between classes.</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-purple-300 mb-1">How it Works:</p>
                          <p className="text-gray-300 text-sm">A subclass inherits all non-private members from its superclass and can add new members or override inherited ones. Java uses the 'extends' keyword for inheritance, supporting single inheritance (one parent class).</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-purple-300 mb-1">Real-World Analogy:</p>
                          <p className="text-gray-300 text-sm">Children inherit traits from their parents (eye color, height) but can also have unique characteristics. Similarly, a SportsCar class inherits from Car but adds turbo boost and racing features specific to sports cars.</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded">
                          <p className="text-xs font-bold text-purple-300 mb-1">Benefits:</p>
                          <ul className="text-xs text-gray-300 space-y-1">
                            <li>• Code reusability and DRY principle</li>
                            <li>• Establishes relationships</li>
                            <li>• Method overriding for specialization</li>
                            <li>• Logical class hierarchies</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-900/20 to-gray-800 p-6 rounded-xl border border-yellow-500/30">
                      <h3 className="text-2xl font-bold text-yellow-400 mb-4">🎭 3. Polymorphism</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-bold text-yellow-300 mb-1">Definition:</p>
                          <p className="text-gray-300 text-sm">Polymorphism (meaning "many forms") allows objects of different classes to be treated as objects of a common superclass. It enables a single interface to represent different underlying forms (data types).</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-yellow-300 mb-1">How it Works:</p>
                          <p className="text-gray-300 text-sm">Polymorphism is achieved through method overriding (runtime/dynamic polymorphism) and method overloading (compile-time/static polymorphism). Methods behave differently based on the object calling them.</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-yellow-300 mb-1">Real-World Analogy:</p>
                          <p className="text-gray-300 text-sm">A person can be a student, employee, or athlete at the same time. The same person behaves differently in different contexts - studying at school, working at office, playing sports. Same person, different behaviors.</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded">
                          <p className="text-xs font-bold text-yellow-300 mb-1">Benefits:</p>
                          <ul className="text-xs text-gray-300 space-y-1">
                            <li>• Flexibility and extensibility</li>
                            <li>• Clean and readable code</li>
                            <li>• Dynamic method dispatch</li>
                            <li>• Loose coupling between objects</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-900/20 to-gray-800 p-6 rounded-xl border border-red-500/30">
                      <h3 className="text-2xl font-bold text-red-400 mb-4">👻 4. Abstraction</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-bold text-red-300 mb-1">Definition:</p>
                          <p className="text-gray-300 text-sm">Abstraction is the process of hiding complex implementation details and showing only the essential features of an object. It focuses on what an object does rather than how it does it.</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-red-300 mb-1">How it Works:</p>
                          <p className="text-gray-300 text-sm">Abstraction is achieved using abstract classes (0-100% abstraction) and interfaces (100% abstraction). Abstract classes can have abstract methods without implementation that must be implemented by subclasses.</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-red-300 mb-1">Real-World Analogy:</p>
                          <p className="text-gray-300 text-sm">When you drive a car, you use the steering wheel and pedals without knowing the complex mechanisms of the engine, transmission, and braking system. You interact with simple interfaces, not complex implementations.</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded">
                          <p className="text-xs font-bold text-red-300 mb-1">Benefits:</p>
                          <ul className="text-xs text-gray-300 space-y-1">
                            <li>• Reduces complexity</li>
                            <li>• Avoids code duplication</li>
                            <li>• Enhances security</li>
                            <li>• Easier to understand and maintain</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits of OOP */}
                <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Why Use Object-Oriented Programming?</h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    OOP provides numerous advantages that make it the preferred paradigm for large-scale software development. Understanding these benefits helps you appreciate why OOP is so widely adopted in the industry.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-900/20 to-gray-800 p-6 rounded-lg border border-rose-500/30">
                      <h4 className="text-lg font-bold text-white mb-3">🔄 Code Reusability</h4>
                      <p className="text-sm text-gray-300">Write once, use many times through inheritance and composition. Reduces development time and improves consistency across the application.</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-900/20 to-gray-800 p-6 rounded-lg border border-green-500/30">
                      <h4 className="text-lg font-bold text-green-400 mb-3">🛡️ Data Security</h4>
                      <p className="text-sm text-gray-300">Encapsulation protects data from unauthorized access and modification. Only authorized methods can access and modify object state.</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900/20 to-gray-800 p-6 rounded-lg border border-purple-500/30">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">🔧 Easy Maintenance</h4>
                      <p className="text-sm text-gray-300">Changes in one class don't affect other classes if properly encapsulated. Easier to locate and fix bugs in modular code.</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-900/20 to-gray-800 p-6 rounded-lg border border-yellow-500/30">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">🎯 Modularity</h4>
                      <p className="text-sm text-gray-300">Code is organized into independent, manageable modules. Each class handles a specific aspect of the application.</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-900/20 to-gray-800 p-6 rounded-lg border border-red-500/30">
                      <h4 className="text-lg font-bold text-red-400 mb-3">🚀 Scalability</h4>
                      <p className="text-sm text-gray-300">Easy to extend and scale applications by adding new classes and features without affecting existing code.</p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-900/20 to-gray-800 p-6 rounded-lg border border-indigo-500/30">
                      <h4 className="text-lg font-bold text-indigo-400 mb-3">🐛 Easy Debugging</h4>
                      <p className="text-sm text-gray-300">Isolated classes make debugging and testing easier. Problems can be tracked to specific classes and methods.</p>
                    </div>
                  </div>
                </div>

                {/* Encapsulation - Enhanced with detailed theory */}
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">🔒 Encapsulation - In Depth</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">What is Encapsulation?</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        <strong className="text-green-400">Encapsulation</strong> is one of the fundamental principles of Object-Oriented Programming that binds together data (variables) and methods (functions) that manipulate the data into a single unit called a class. It is often described as "data hiding" because it protects the internal state of an object from unauthorized access and modification.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Encapsulation achieves two critical objectives: it bundles related properties and behaviors together, and it restricts direct access to an object's internal state. This is accomplished through access modifiers that control the visibility of class members.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">How Encapsulation Works</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-bold text-green-300 mb-2">1. Data Hiding through Access Modifiers</h4>
                          <p className="text-gray-300 mb-3">Java provides four access modifiers to implement encapsulation:</p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
                              <p className="font-bold text-green-300 mb-1">private</p>
                              <p className="text-sm text-gray-300">Accessible only within the same class. Most restrictive, ensures complete data hiding.</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
                              <p className="font-bold text-green-300 mb-1">default (no modifier)</p>
                              <p className="text-sm text-gray-300">Accessible within the same package. Package-level protection.</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
                              <p className="font-bold text-green-300 mb-1">protected</p>
                              <p className="text-sm text-gray-300">Accessible within the same package and by subclasses. Used for inheritance.</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
                              <p className="font-bold text-green-300 mb-1">public</p>
                              <p className="text-sm text-gray-300">Accessible from anywhere. Least restrictive, used for public interfaces.</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-green-300 mb-2">2. Getters and Setters (Accessor and Mutator Methods)</h4>
                          <p className="text-gray-300 mb-3">
                            To access and modify private data, we provide public getter and setter methods. This controlled access allows validation, logging, and other logic to be applied when data is accessed or modified.
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <p className="font-bold text-green-300 mb-2">Getter Methods (Accessors)</p>
                              <p className="text-sm text-gray-300 mb-2">Return the value of a private field</p>
                              <code className="text-xs text-green-400">public Type getFieldName() &#123; return fieldName; &#125;</code>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <p className="font-bold text-green-300 mb-2">Setter Methods (Mutators)</p>
                              <p className="text-sm text-gray-300 mb-2">Set the value of a private field with validation</p>
                              <code className="text-xs text-green-400">public void setFieldName(Type value) &#123; this.fieldName = value; &#125;</code>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-green-300 mb-2">3. The this Keyword</h4>
                          <p className="text-gray-300">
                            The <code className="text-green-400">this</code> keyword refers to the current object instance. It's used to differentiate between instance variables and parameters with the same name, making code clearer and avoiding naming conflicts.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">Why is Encapsulation Important?</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-bold text-green-300 mb-2">🛡️ Data Protection</h4>
                            <p className="text-sm text-gray-300">Prevents external code from directly accessing and corrupting object data. Only methods within the class can access private data.</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-bold text-green-300 mb-2">✅ Validation and Control</h4>
                            <p className="text-sm text-gray-300">Setter methods can validate data before storing it. For example, ensuring age is positive or balance is non-negative.</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-bold text-green-300 mb-2">🔄 Flexibility</h4>
                            <p className="text-sm text-gray-300">Internal implementation can change without affecting external code. Public interface remains constant.</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-bold text-green-300 mb-2">🔒 Security</h4>
                            <p className="text-sm text-gray-300">Sensitive data like passwords or account numbers can be protected from unauthorized access and modification.</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-bold text-green-300 mb-2">🧩 Modularity</h4>
                            <p className="text-sm text-gray-300">Each class is a self-contained unit with well-defined interfaces, making code more maintainable.</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-bold text-green-300 mb-2">📝 Easier Debugging</h4>
                            <p className="text-sm text-gray-300">When data is modified only through methods, you can add breakpoints and logging to track changes.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">Real-World Analogy</h3>
                      <div className="bg-gray-800 p-6 rounded-lg">
                        <p className="text-gray-300 leading-relaxed mb-4">
                          Think of encapsulation like an <strong className="text-green-400">ATM machine</strong>:
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-green-400 mr-3">•</span>
                            <span><strong className="text-green-300">Hidden Data:</strong> The cash, card reader mechanisms, and internal systems are hidden inside the machine (private data)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-400 mr-3">•</span>
                            <span><strong className="text-green-300">Public Interface:</strong> You interact through buttons, screen, and card slot (public methods)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-400 mr-3">•</span>
                            <span><strong className="text-green-300">Controlled Access:</strong> You can't directly access the cash; you must use withdrawal methods with PIN validation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-400 mr-3">•</span>
                            <span><strong className="text-green-300">Data Validation:</strong> The ATM validates your PIN, checks balance, and enforces withdrawal limits before dispensing cash</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Example: Bank Account with Encapsulation</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`public class BankAccount {
    private String accountNumber;
    private double balance;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    // Getter methods
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public double getBalance() {
        return balance;
    }
    
    // Setter methods with validation
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            this.balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Invalid withdrawal amount");
        }
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Benefits of Encapsulation</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Data hiding and security</li>
                        <li>• Controlled access to data</li>
                        <li>• Validation in setter methods</li>
                        <li>• Easier maintenance</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Access Modifiers</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-red-400">private</code> - Only within the same class</li>
                        <li>• <code className="text-yellow-400">default</code> - Within the same package</li>
                        <li>• <code className="text-white">protected</code> - Within package and subclasses</li>
                        <li>• <code className="text-green-400">public</code> - From anywhere</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Inheritance */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">🧬 Inheritance</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Inheritance allows a class to inherit properties and methods from another class. 
                    It promotes code reusability and establishes an "is-a" relationship between classes.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Example: Vehicle Inheritance Hierarchy</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`// Parent class
class Vehicle {
    protected String brand;
    protected int year;
    
    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
    
    public void start() {
        System.out.println("Vehicle is starting...");
    }
    
    public void displayInfo() {
        System.out.println("Brand: " + brand + ", Year: " + year);
    }
}

// Child class
class Car extends Vehicle {
    private int doors;
    
    public Car(String brand, int year, int doors) {
        super(brand, year); // Call parent constructor
        this.doors = doors;
    }
    
    @Override
    public void start() {
        System.out.println("Car is starting with " + doors + " doors");
    }
    
    public void honk() {
        System.out.println("Beep beep!");
    }
}

// Usage
public class InheritanceDemo {
    public static void main(String[] args) {
        Car myCar = new Car("Toyota", 2023, 4);
        myCar.displayInfo(); // Inherited method
        myCar.start();       // Overridden method
        myCar.honk();        // Own method
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Types of Inheritance</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong>Single:</strong> One parent, one child</li>
                        <li>• <strong>Multilevel:</strong> Chain of inheritance</li>
                        <li>• <strong>Hierarchical:</strong> One parent, multiple children</li>
                        <li>• <strong>Multiple:</strong> Via interfaces only</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Key Concepts</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">extends</code> keyword</li>
                        <li>• <code className="text-yellow-400">super</code> keyword</li>
                        <li>• Method overriding</li>
                        <li>• Constructor chaining</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Polymorphism */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">🎭 Polymorphism</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Polymorphism means "many forms". It allows objects of different types to be treated as objects of a common type. 
                    In Java, this is achieved through method overriding and method overloading.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Example: Runtime Polymorphism</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`// Base class
class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

// Derived classes
class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog barks: Woof!");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cat meows: Meow!");
    }
}

// Polymorphism in action
public class PolymorphismDemo {
    public static void main(String[] args) {
        Animal animal1 = new Dog();    // Upcasting
        Animal animal2 = new Cat();     // Upcasting
        
        animal1.makeSound(); // Output: Dog barks: Woof!
        animal2.makeSound(); // Output: Cat meows: Meow!
        
        // Same method call, different behaviors
        Animal[] animals = {new Dog(), new Cat(), new Animal()};
        for (Animal animal : animals) {
            animal.makeSound(); // Polymorphic method calls
        }
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Compile-time Polymorphism</h4>
                      <p className="text-gray-300 mb-3">Method Overloading</p>
                      <pre className="text-green-400 font-mono text-sm">
{`public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}`}
                      </pre>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Runtime Polymorphism</h4>
                      <p className="text-gray-300 mb-3">Method Overriding</p>
                      <pre className="text-green-400 font-mono text-sm">
{`class Shape {
    public void draw() {
        System.out.println("Drawing shape");
    }
}

class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Abstraction */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-red-400 mb-6">👻 Abstraction</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Abstraction hides the complex implementation details and shows only the essential features. 
                    In Java, this is achieved using abstract classes and interfaces.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Example: Abstract Class and Interface</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`// Abstract class
abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method (no implementation)
    public abstract double area();
    
    // Concrete method
    public void displayColor() {
        System.out.println("Color: " + color);
    }
}

// Interface
interface Drawable {
    void draw();
    void erase();
}

// Concrete class implementing both
class Circle extends Shape implements Drawable {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
    
    @Override
    public void erase() {
        System.out.println("Erasing a circle");
    }
}

// Usage
public class AbstractionDemo {
    public static void main(String[] args) {
        Circle circle = new Circle("Red", 5.0);
        circle.displayColor();
        System.out.println("Area: " + circle.area());
        circle.draw();
        circle.erase();
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Abstract Classes</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Cannot be instantiated</li>
                        <li>• Can have abstract and concrete methods</li>
                        <li>• Can have constructors</li>
                        <li>• Single inheritance</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Interfaces</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• All methods are implicitly abstract</li>
                        <li>• All fields are public, static, final</li>
                        <li>• Multiple inheritance allowed</li>
                        <li>• Cannot have constructors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'classes-objects':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="classes-objects" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🧱 Classes and Objects
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Definition, working principles, real-world analogies, memory management, and comprehensive examples
              </p>

              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">What are Classes and Objects?</h2>
                  <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                    A <strong className="text-white">class</strong> is a blueprint that defines the structure and behavior of objects. An <strong className="text-white">object</strong> is an instance of a class, representing a specific entity with state (attributes) and behavior (methods).
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Classes encapsulate data and functions together, while objects are created at runtime to use those definitions. Multiple objects can be created from the same class, each with independent state.
                  </p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        Classes represent the fundamental building blocks of object-oriented programming, embodying the concept of <strong className="text-white">abstraction</strong>. They allow us to model real-world entities by defining both their characteristics (data) and capabilities (behavior) in a single, cohesive unit.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The relationship between classes and objects follows the <strong className="text-white">template-instance pattern</strong>, where a class serves as a template that defines the common structure and behavior, while objects are specific instances that populate this template with unique data.
                      </p>
                      <p className="text-gray-300">
                        This design philosophy enables <strong className="text-white">code reusability</strong>, <strong className="text-white">maintainability</strong>, and <strong className="text-white">scalability</strong> by allowing developers to create multiple objects from a single class definition, each with its own independent state while sharing the same behavioral patterns.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Real-World Analogy</h3>
                    <p className="text-gray-300 text-sm">Consider a class as a house blueprint. Objects are actual houses built from that blueprint. Each house shares the same design but can have different colors, furniture, and residents (state).</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Benefits</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Code reuse through instantiation</li>
                      <li>• Clear separation of concerns</li>
                      <li>• Easier testing and maintenance</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">How Classes and Objects Work</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <p className="text-lg leading-relaxed">
                      Classes serve as templates that define what data an object will contain and what operations it can perform. Objects are runtime instances that have their own memory space and can interact with other objects.
                    </p>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Conceptual Understanding</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          The class-object relationship embodies several fundamental computer science principles:
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Data Abstraction:</strong> Classes hide implementation details while exposing essential operations through well-defined interfaces</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Information Hiding:</strong> Internal state is protected from external manipulation, ensuring data integrity</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Modularity:</strong> Classes represent self-contained units that can be developed, tested, and maintained independently</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Encapsulation:</strong> Data and methods are bundled together, creating cohesive units that manage their own state</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Philosophical Perspective</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Object-oriented programming represents a paradigm shift from procedural programming by modeling software systems as collections of interacting objects rather than sequences of function calls:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Procedural Approach</h4>
                            <p className="text-sm text-gray-300">Data and functions are separate; functions operate on external data structures</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Object-Oriented Approach</h4>
                            <p className="text-sm text-gray-300">Data and functions are unified; objects manage their own state and behavior</p>
                          </div>
                        </div>
                        <p className="text-gray-300">
                          This shift enables more intuitive modeling of real-world systems, where entities have both properties and capabilities, leading to more maintainable and extensible code architectures.
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Class Components</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Fields/Attributes:</strong> Data that objects will contain</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Methods:</strong> Functions that define object behavior</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Constructors:</strong> Special methods for object creation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Access Modifiers:</strong> Control visibility and access</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Object Lifecycle</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Creation:</strong> Using <code className="text-white">new</code> keyword</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Initialization:</strong> Constructor sets initial state</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Usage:</strong> Methods called, state modified</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-white mr-3 text-xl">•</span>
                            <span><strong className="text-white">Garbage Collection:</strong> Automatic memory cleanup</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Memory Management Theory</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding how objects are stored in memory is crucial for performance optimization and represents a fundamental aspect of computer science:
                        </p>
                        
                        <div className="bg-gray-800/50 border border-gray-500 rounded-lg p-4 mb-4">
                          <h4 className="text-white font-bold mb-3">Theoretical Framework</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            Memory management in object-oriented systems involves complex interactions between the <strong className="text-white">programmer's logical model</strong> and the <strong className="text-white">underlying hardware architecture</strong>. Objects exist in a virtual memory space that must be mapped to physical memory locations.
                          </p>
                          <p className="text-gray-300 text-sm">
                            The Java Virtual Machine (JVM) abstracts these complexities through <strong className="text-white">automatic memory management</strong>, but understanding the underlying principles is essential for writing efficient, scalable applications.
                          </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Heap Memory</h4>
                            <p className="text-sm text-gray-300 mb-2">Objects are stored on the heap, accessible via references</p>
                            <p className="text-xs text-gray-400">Dynamic allocation, garbage collection, shared across threads</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Stack Memory</h4>
                            <p className="text-sm text-gray-300 mb-2">Local variables and method calls stored on stack</p>
                            <p className="text-xs text-gray-400">LIFO structure, automatic cleanup, thread-specific</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Reference Variables</h4>
                            <p className="text-sm text-gray-300 mb-2">Hold memory addresses pointing to objects</p>
                            <p className="text-xs text-gray-400">Indirection mechanism, null safety, garbage collection roots</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-800/50 border border-gray-500 rounded-lg p-4">
                          <h4 className="text-white font-bold mb-3">Garbage Collection Theory</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            The <strong className="text-white">garbage collector</strong> implements sophisticated algorithms to automatically reclaim memory from objects that are no longer reachable. This process involves:
                          </p>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• <strong className="text-white">Reachability Analysis:</strong> Determining which objects can be accessed from root references</li>
                            <li>• <strong className="text-white">Mark and Sweep:</strong> Identifying and removing unreachable objects</li>
                            <li>• <strong className="text-white">Memory Compaction:</strong> Defragmenting memory to reduce fragmentation</li>
                            <li>• <strong className="text-white">Generational Collection:</strong> Optimizing for objects with different lifecycles</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Advanced Theoretical Concepts</h2>
                  
                  <div className="space-y-6 mb-8">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Object Identity and Equality</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding the distinction between <strong className="text-white">object identity</strong> and <strong className="text-white">object equality</strong> is fundamental to object-oriented programming:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Identity (==)</h4>
                            <p className="text-sm text-gray-300 mb-2">Compares memory addresses - determines if two references point to the same object</p>
                            <p className="text-xs text-gray-400">Fundamental for understanding object lifecycle and memory management</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Equality (.equals())</h4>
                            <p className="text-sm text-gray-300 mb-2">Compares object content - determines if two objects represent the same logical entity</p>
                            <p className="text-xs text-gray-400">Customizable behavior, essential for collections and comparisons</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">State and Behavior Coupling</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          The relationship between an object's state and behavior represents a core principle of object-oriented design:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-white">State-Dependent Behavior:</strong> Methods can behave differently based on current object state</li>
                          <li>• <strong className="text-white">State Transitions:</strong> Methods can modify object state, creating state machines</li>
                          <li>• <strong className="text-white">Invariant Preservation:</strong> Methods must maintain object invariants across state changes</li>
                          <li>• <strong className="text-white">Encapsulation Benefits:</strong> State changes are controlled through well-defined interfaces</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Design Patterns and Principles</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Classes and objects form the foundation for numerous design patterns and software engineering principles:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Single Responsibility Principle</h4>
                            <p className="text-sm text-gray-300">Each class should have only one reason to change, representing a single concept or responsibility</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Open/Closed Principle</h4>
                            <p className="text-sm text-gray-300">Classes should be open for extension but closed for modification, enabling polymorphism</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Dependency Inversion</h4>
                            <p className="text-sm text-gray-300">High-level modules should not depend on low-level modules; both should depend on abstractions</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Composition over Inheritance</h4>
                            <p className="text-sm text-gray-300">Favor object composition and delegation over class inheritance for code reuse</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Comprehensive Examples</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Basic Class and Object</h3>
                      <pre className="text-green-400 font-mono text-sm">{`class Car {
    // Instance variables (attributes)
    private String brand;
    private String model;
    private int year;
    private double price;
    private boolean isRunning;
    
    // Constructor
    public Car(String brand, String model, int year, double price) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.isRunning = false;
    }
    
    // Methods (behavior)
    public void start() {
        if (!isRunning) {
            isRunning = true;
            System.out.println(brand + " " + model + " is starting...");
        } else {
            System.out.println("Car is already running!");
        }
    }
    
    public void stop() {
        if (isRunning) {
            isRunning = false;
            System.out.println(brand + " " + model + " has stopped.");
        } else {
            System.out.println("Car is already stopped!");
        }
    }
    
    public void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
        System.out.println("Price: $" + price);
        System.out.println("Status: " + (isRunning ? "Running" : "Stopped"));
    }
    
    // Getters and Setters
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
    
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    
    public boolean isRunning() { return isRunning; }
}

public class CarDemo {
    public static void main(String[] args) {
        // Creating objects
        Car car1 = new Car("Toyota", "Camry", 2022, 25000.0);
        Car car2 = new Car("Honda", "Civic", 2023, 22000.0);
        
        // Using objects
        car1.displayInfo();
        car1.start();
        car1.stop();
        
        System.out.println("\\n--- Second Car ---");
        car2.displayInfo();
        car2.start();
        car2.setPrice(23000.0); // Modifying object state
        car2.displayInfo();
    }
}`}</pre>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-4">Advanced Example: Bank Account</h3>
                      <pre className="text-green-400 font-mono text-sm">{`class BankAccount {
    private String accountNumber;
    private String accountHolder;
    private double balance;
    private static int totalAccounts = 0; // Class variable
    
    public BankAccount(String accountHolder, double initialBalance) {
        this.accountNumber = "ACC" + (++totalAccounts);
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        System.out.println("Account created: " + accountNumber);
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited $" + amount + ". New balance: $" + balance);
        } else {
            System.out.println("Invalid deposit amount!");
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrew $" + amount + ". New balance: $" + balance);
        } else {
            System.out.println("Invalid withdrawal amount or insufficient funds!");
        }
    }
    
    public void checkBalance() {
        System.out.println("Account: " + accountNumber);
        System.out.println("Holder: " + accountHolder);
        System.out.println("Balance: $" + balance);
    }
    
    public static int getTotalAccounts() {
        return totalAccounts;
    }
    
    // Getters
    public String getAccountNumber() { return accountNumber; }
    public String getAccountHolder() { return accountHolder; }
    public double getBalance() { return balance; }
}

public class BankDemo {
    public static void main(String[] args) {
        BankAccount account1 = new BankAccount("John Doe", 1000.0);
        BankAccount account2 = new BankAccount("Jane Smith", 500.0);
        
        account1.deposit(500.0);
        account1.withdraw(200.0);
        account1.checkBalance();
        
        System.out.println("\\nTotal accounts created: " + BankAccount.getTotalAccounts());
    }
}`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Theoretical Best Practices and Design Philosophy</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Object-Oriented Design Principles</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Effective class and object design follows established theoretical principles that promote maintainable, extensible, and robust software:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Cohesion and Coupling</h4>
                            <p className="text-sm text-gray-300 mb-2">High cohesion: class elements work together toward a single purpose</p>
                            <p className="text-xs text-gray-400">Low coupling: minimal dependencies between classes</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Information Hiding</h4>
                            <p className="text-sm text-gray-300 mb-2">Encapsulate implementation details behind well-defined interfaces</p>
                            <p className="text-xs text-gray-400">Reduces complexity and enables independent evolution</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Abstraction Levels</h4>
                            <p className="text-sm text-gray-300 mb-2">Design classes at appropriate abstraction levels</p>
                            <p className="text-xs text-gray-400">Balance between generality and specificity</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Polymorphism Design</h4>
                            <p className="text-sm text-gray-300 mb-2">Design for substitutability and behavioral variation</p>
                            <p className="text-xs text-gray-400">Enable runtime flexibility through interface contracts</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Memory and Performance Considerations</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding the theoretical implications of object creation and memory usage is crucial for designing efficient systems:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-white">Object Lifecycle Management:</strong> Consider object creation costs and garbage collection impact</li>
                          <li>• <strong className="text-white">Reference Management:</strong> Avoid memory leaks through proper reference handling</li>
                          <li>• <strong className="text-white">Immutability Benefits:</strong> Immutable objects reduce complexity and improve thread safety</li>
                          <li>• <strong className="text-white">Object Pooling:</strong> Reuse expensive objects when appropriate to reduce allocation overhead</li>
                          <li>• <strong className="text-white">Lazy Initialization:</strong> Defer object creation until actually needed</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-3">Design Anti-Patterns to Avoid</h3>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• <strong className="text-red-400">God Classes:</strong> Classes with too many responsibilities</li>
                          <li>• <strong className="text-red-400">Anemic Domain Models:</strong> Classes with only data, no behavior</li>
                          <li>• <strong className="text-red-400">Tight Coupling:</strong> Excessive dependencies between classes</li>
                          <li>• <strong className="text-red-400">Circular Dependencies:</strong> Classes depending on each other</li>
                          <li>• <strong className="text-red-400">Premature Optimization:</strong> Over-engineering without performance requirements</li>
                        </ul>
                      </div>
                      <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-3">Theoretical Benefits</h3>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• <strong className="text-green-400">Modularity:</strong> Independent development and testing</li>
                          <li>• <strong className="text-green-400">Reusability:</strong> Code reuse across different contexts</li>
                          <li>• <strong className="text-green-400">Extensibility:</strong> Easy addition of new features</li>
                          <li>• <strong className="text-green-400">Maintainability:</strong> Easier debugging and modification</li>
                          <li>• <strong className="text-green-400">Testability:</strong> Isolated unit testing capabilities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'class-attributes':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="class-attributes" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🧾 Class Attributes (Fields)
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Definition, types, scope, memory management, theoretical foundations, and best practices</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">What are Attributes?</h2>
                  <p className="text-lg text-gray-300 mb-4">Attributes (also called fields) hold the state of an object. They can be instance-level or class-level (static).</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-white">Instance Fields</strong>: Different for each object</li>
                    <li>• <strong className="text-white">Static Fields</strong>: Shared across all objects of a class</li>
                    <li>• <strong className="text-white">Final Fields</strong>: Constants that cannot be reassigned</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        Attributes represent the <strong className="text-white">state space</strong> of objects, defining the possible configurations an object can exist in. They embody the principle of <strong className="text-white">data encapsulation</strong>, where object state is protected and controlled through well-defined interfaces.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The distinction between instance and static attributes reflects different <strong className="text-white">scoping paradigms</strong> in object-oriented design: instance attributes model object-specific state, while static attributes represent class-level shared state.
                      </p>
                      <p className="text-gray-300">
                        Understanding attribute design is crucial for implementing <strong className="text-white">data integrity</strong>, <strong className="text-white">thread safety</strong>, and <strong className="text-white">memory efficiency</strong> in object-oriented systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Attribute Types and Memory Management</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Instance vs Static Attributes</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          The fundamental distinction between instance and static attributes reflects different memory allocation strategies and access patterns:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Instance Attributes</h4>
                            <p className="text-sm text-gray-300 mb-2">Each object has its own copy, stored in object memory</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Object-specific state</li>
                              <li>• Accessed via object reference</li>
                              <li>• Memory allocated per object</li>
                              <li>• Supports polymorphism</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Static Attributes</h4>
                            <p className="text-sm text-gray-300 mb-2">Shared across all instances, stored in class memory</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Class-level state</li>
                              <li>• Accessed via class name</li>
                              <li>• Single memory location</li>
                              <li>• Global to class scope</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Memory Allocation Theory</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding how attributes are stored in memory is essential for performance optimization and thread safety:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Heap Storage</h4>
                            <p className="text-sm text-gray-300 mb-2">Instance attributes stored in object memory on heap</p>
                            <p className="text-xs text-gray-400">Garbage collected, shared across threads</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Method Area</h4>
                            <p className="text-sm text-gray-300 mb-2">Static attributes stored in class metadata area</p>
                            <p className="text-xs text-gray-400">Persistent, shared across all instances</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Stack Storage</h4>
                            <p className="text-sm text-gray-300 mb-2">Local variables and method parameters</p>
                            <p className="text-xs text-gray-400">Thread-specific, automatic cleanup</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Advanced Attribute Concepts</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Final Attributes and Immutability</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Final attributes represent a commitment to <strong className="text-white">immutability</strong>, a fundamental principle in concurrent programming and functional design:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-white">Compile-time Constants:</strong> Values known at compile time, inlined by compiler</li>
                          <li>• <strong className="text-white">Runtime Constants:</strong> Values determined at runtime but immutable after initialization</li>
                          <li>• <strong className="text-white">Thread Safety:</strong> Final attributes are inherently thread-safe for reading</li>
                          <li>• <strong className="text-white">Memory Model:</strong> Final attributes have special guarantees in Java memory model</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Access Modifiers and Encapsulation</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Access modifiers control the <strong className="text-white">visibility</strong> and <strong className="text-white">accessibility</strong> of attributes, implementing the principle of information hiding:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Visibility Levels</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong className="text-green-400">public:</strong> Accessible from anywhere</li>
                              <li>• <strong className="text-yellow-400">protected:</strong> Package + subclass access</li>
                              <li>• <strong className="text-orange-400">package-private:</strong> Same package only</li>
                              <li>• <strong className="text-red-400">private:</strong> Class access only</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Design Principles</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong className="text-white">Principle of Least Privilege:</strong> Minimize access scope</li>
                              <li>• <strong className="text-white">Encapsulation:</strong> Hide implementation details</li>
                              <li>• <strong className="text-white">Controlled Access:</strong> Use getters/setters when needed</li>
                              <li>• <strong className="text-white">API Design:</strong> Public interface vs private implementation</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Comprehensive Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`class BankAccount {
    // Static attributes (class-level)
    private static int totalAccounts = 0;
    private static final String BANK_NAME = "JavaBank";
    
    // Instance attributes (object-level)
    private final String accountNumber;
    private String accountHolder;
    private double balance;
    private boolean isActive;
    
    // Constructor
    public BankAccount(String accountHolder, double initialBalance) {
        this.accountNumber = "ACC" + (++totalAccounts);
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.isActive = true;
    }
    
    // Static method accessing static attribute
    public static int getTotalAccounts() {
        return totalAccounts;
    }
    
    // Instance methods accessing instance attributes
    public void deposit(double amount) {
        if (isActive && amount > 0) {
            balance += amount;
        }
    }
    
    public void withdraw(double amount) {
        if (isActive && amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
    
    // Getters for controlled access
    public String getAccountNumber() { return accountNumber; }
    public String getAccountHolder() { return accountHolder; }
    public double getBalance() { return balance; }
    public boolean isActive() { return isActive; }
    
    // Setter with validation
    public void setAccountHolder(String accountHolder) {
        if (accountHolder != null && !accountHolder.trim().isEmpty()) {
            this.accountHolder = accountHolder;
        }
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use <code className="text-white">private</code> attributes with public getters/setters</li>
                      <li>• Make attributes <code className="text-white">final</code> when possible for immutability</li>
                      <li>• Use <code className="text-white">static final</code> for constants</li>
                      <li>• Initialize attributes in constructors or at declaration</li>
                      <li>• Consider thread safety for shared static attributes</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Exposing mutable state through public attributes</li>
                      <li>• Using static attributes for instance-specific data</li>
                      <li>• Not initializing final attributes in constructors</li>
                      <li>• Thread safety issues with static mutable attributes</li>
                      <li>• Memory leaks through static references</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'class-methods':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="class-methods" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🛠️ Class Methods
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Instance vs static methods, signatures, overloading, theoretical foundations, and best practices</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Methods in Depth</h2>
                  <p className="text-lg text-gray-300 mb-4">Methods define behavior. <strong className="text-white">Instance methods</strong> operate on object state; <strong className="text-white">static methods</strong> belong to the class.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Method signature: name + parameter list</li>
                    <li>• Overloading: same name, different parameters</li>
                    <li>• Access: public/protected/(default)/private</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        Methods represent the <strong className="text-white">behavioral interface</strong> of objects, defining how objects respond to messages and interact with their environment. They embody the principle of <strong className="text-white">message passing</strong>, where objects communicate through method invocation.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The distinction between instance and static methods reflects different <strong className="text-white">scoping paradigms</strong>: instance methods operate on object-specific state, while static methods provide class-level functionality that doesn't require object instantiation.
                      </p>
                      <p className="text-gray-300">
                        Method design is crucial for implementing <strong className="text-white">polymorphism</strong>, <strong className="text-white">encapsulation</strong>, and <strong className="text-white">code reusability</strong> in object-oriented systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Method Types and Execution Model</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Instance vs Static Methods</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          The fundamental distinction between instance and static methods reflects different execution contexts and access patterns:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Instance Methods</h4>
                            <p className="text-sm text-gray-300 mb-2">Operate on object state, require object instantiation</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Access instance variables via <code className="text-white">this</code></li>
                              <li>• Support polymorphism and overriding</li>
                              <li>• Memory allocated per object</li>
                              <li>• Can access both instance and static members</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Static Methods</h4>
                            <p className="text-sm text-gray-300 mb-2">Belong to class, no object instance required</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Accessed via class name</li>
                              <li>• Cannot access instance variables</li>
                              <li>• Single memory location</li>
                              <li>• Cannot be overridden (but can be hidden)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Method Overloading Theory</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Method overloading enables <strong className="text-white">ad-hoc polymorphism</strong>, allowing multiple methods with the same name but different parameter signatures:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-white">Compile-time Resolution:</strong> Method selection based on argument types</li>
                          <li>• <strong className="text-white">Type Promotion:</strong> Automatic conversion between compatible types</li>
                          <li>• <strong className="text-white">Ambiguity Resolution:</strong> Compiler chooses most specific method</li>
                          <li>• <strong className="text-white">API Design:</strong> Provides intuitive interfaces for different use cases</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Advanced Method Concepts</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Method Signatures and Contracts</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Method signatures define the <strong className="text-white">contract</strong> between caller and callee, establishing the interface for object interaction:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Signature Components</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong className="text-white">Method Name:</strong> Identifier for method invocation</li>
                              <li>• <strong className="text-white">Parameter List:</strong> Input types and names</li>
                              <li>• <strong className="text-white">Return Type:</strong> Output type or void</li>
                              <li>• <strong className="text-white">Throws Clause:</strong> Declared exceptions</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Design Principles</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong className="text-white">Single Responsibility:</strong> One purpose per method</li>
                              <li>• <strong className="text-white">Cohesion:</strong> Related operations grouped together</li>
                              <li>• <strong className="text-white">Coupling:</strong> Minimize dependencies between methods</li>
                              <li>• <strong className="text-white">Naming:</strong> Descriptive method names</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Method Execution and Stack Management</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding method execution is crucial for performance optimization and debugging:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Stack Frames</h4>
                            <p className="text-sm text-gray-300 mb-2">Each method call creates a stack frame</p>
                            <p className="text-xs text-gray-400">Local variables, parameters, return address</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Call Stack</h4>
                            <p className="text-sm text-gray-300 mb-2">LIFO structure for method calls</p>
                            <p className="text-xs text-gray-400">Automatic cleanup on method return</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Recursion</h4>
                            <p className="text-sm text-gray-300 mb-2">Methods calling themselves</p>
                            <p className="text-xs text-gray-400">Stack overflow risk with deep recursion</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Comprehensive Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`class Calculator {
    // Static methods (class-level)
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static double add(double a, double b) {
        return a + b;
    }
    
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    // Instance methods (object-level)
    private double result;
    private String operation;
    
    public Calculator() {
        this.result = 0.0;
        this.operation = "none";
    }
    
    public void setResult(double result) {
        this.result = result;
    }
    
    public double getResult() {
        return result;
    }
    
    public void performOperation(String op, double value) {
        switch (op.toLowerCase()) {
            case "add":
                result += value;
                operation = "add";
                break;
            case "subtract":
                result -= value;
                operation = "subtract";
                break;
            case "multiply":
                result *= value;
                operation = "multiply";
                break;
            case "divide":
                if (value != 0) {
                    result /= value;
                    operation = "divide";
                } else {
                    throw new IllegalArgumentException("Division by zero");
                }
                break;
            default:
                throw new IllegalArgumentException("Unknown operation: " + op);
        }
    }
    
    public void clear() {
        result = 0.0;
        operation = "none";
    }
    
    public String getOperation() {
        return operation;
    }
    
    // Method overloading example
    public void performOperation(String op, int value) {
        performOperation(op, (double) value);
    }
    
    // Static utility method
    public static boolean isValidOperation(String op) {
        return op != null && (op.equals("add") || op.equals("subtract") || 
                              op.equals("multiply") || op.equals("divide"));
    }
}

public class CalculatorDemo {
    public static void main(String[] args) {
        // Using static methods
        System.out.println("Static addition: " + Calculator.add(5, 3));
        System.out.println("Static multiplication: " + Calculator.multiply(4, 7));
        
        // Using instance methods
        Calculator calc = new Calculator();
        calc.performOperation("add", 10.5);
        calc.performOperation("multiply", 2.0);
        System.out.println("Result: " + calc.getResult());
        
        // Method overloading
        calc.performOperation("subtract", 5); // int parameter
        System.out.println("After subtraction: " + calc.getResult());
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use descriptive method names that indicate purpose</li>
                      <li>• Keep methods focused on single responsibility</li>
                      <li>• Use static methods for utility functions</li>
                      <li>• Prefer instance methods for state-dependent operations</li>
                      <li>• Use method overloading judiciously</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Accessing instance variables from static methods</li>
                      <li>• Overloading based only on return type</li>
                      <li>• Creating overly complex method signatures</li>
                      <li>• Not handling exceptions properly</li>
                      <li>• Mixing static and instance method responsibilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'constructors':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="constructors" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🧩 Constructors
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Initialization, overloading, chaining, theoretical foundations, and best practices</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">What is a Constructor?</h2>
                  <p className="text-lg text-gray-300 mb-4">A constructor is a special method used to initialize new objects. It has the same name as the class and no return type.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Default constructor (no args)</li>
                    <li>• Parameterized constructors</li>
                    <li>• Constructor overloading</li>
                    <li>• <code className="text-white">this()</code> and <code className="text-white">super()</code> chaining</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        Constructors represent the <strong className="text-white">initialization protocol</strong> for objects, ensuring that objects are created in a valid, consistent state. They embody the principle of <strong className="text-white">object lifecycle management</strong>, where every object must be properly initialized before use.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The constructor mechanism implements the <strong className="text-white">invariant establishment</strong> pattern, guaranteeing that object invariants are satisfied immediately after creation. This prevents objects from existing in an undefined or inconsistent state.
                      </p>
                      <p className="text-gray-300">
                        Constructor design is crucial for implementing <strong className="text-white">object integrity</strong>, <strong className="text-white">encapsulation</strong>, and <strong className="text-white">defensive programming</strong> practices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Constructor Types and Initialization</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Constructor Categories</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Constructors can be categorized based on their purpose and initialization strategy:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Default Constructor</h4>
                            <p className="text-sm text-gray-300 mb-2">No parameters, provides default initialization</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Automatically provided if no constructors defined</li>
                              <li>• Initializes fields to default values</li>
                              <li>• Can be explicitly defined</li>
                              <li>• Useful for simple object creation</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Parameterized Constructor</h4>
                            <p className="text-sm text-gray-300 mb-2">Takes parameters for custom initialization</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Allows custom object state setup</li>
                              <li>• Validates input parameters</li>
                              <li>• Enables flexible object creation</li>
                              <li>• Supports constructor overloading</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Constructor Chaining Theory</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Constructor chaining enables <strong className="text-white">code reuse</strong> and <strong className="text-white">initialization delegation</strong> within the same class hierarchy:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-white">this() Chaining:</strong> Delegates to another constructor in the same class</li>
                          <li>• <strong className="text-white">super() Chaining:</strong> Delegates to parent class constructor</li>
                          <li>• <strong className="text-white">Implicit Chaining:</strong> Automatic super() call if not explicitly provided</li>
                          <li>• <strong className="text-white">Initialization Order:</strong> Parent constructors execute before child constructors</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Advanced Constructor Concepts</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Object Initialization Process</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding the object initialization sequence is crucial for proper constructor design:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Memory Allocation</h4>
                            <p className="text-sm text-gray-300 mb-2">JVM allocates memory for object</p>
                            <p className="text-xs text-gray-400">Heap memory reserved for object instance</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Field Initialization</h4>
                            <p className="text-sm text-gray-300 mb-2">Default values assigned to fields</p>
                            <p className="text-xs text-gray-400">null for objects, 0 for primitives</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Constructor Execution</h4>
                            <p className="text-sm text-gray-300 mb-2">Constructor body executes</p>
                            <p className="text-xs text-gray-400">Custom initialization logic runs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Constructor Design Patterns</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Several design patterns leverage constructors for object creation and initialization:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Builder Pattern</h4>
                            <p className="text-sm text-gray-300 mb-2">Complex object construction with fluent interface</p>
                            <p className="text-xs text-gray-400">Separates construction from representation</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Factory Pattern</h4>
                            <p className="text-sm text-gray-300 mb-2">Static methods for object creation</p>
                            <p className="text-xs text-gray-400">Encapsulates object creation logic</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Singleton Pattern</h4>
                            <p className="text-sm text-gray-300 mb-2">Private constructor for single instance</p>
                            <p className="text-xs text-gray-400">Ensures only one instance exists</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Prototype Pattern</h4>
                            <p className="text-sm text-gray-300 mb-2">Copy constructor for object cloning</p>
                            <p className="text-xs text-gray-400">Creates objects by copying existing ones</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Comprehensive Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`class Employee {
    private final String id;
    private String name;
    private String department;
    private double salary;
    private boolean isActive;
    
    // Default constructor
    public Employee() {
        this("EMP" + System.currentTimeMillis(), "Unknown", "General", 0.0);
    }
    
    // Parameterized constructor
    public Employee(String id, String name, String department, double salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
        this.isActive = true;
    }
    
    // Copy constructor
    public Employee(Employee other) {
        this(other.id + "_COPY", other.name, other.department, other.salary);
    }
    
    // Constructor chaining example
    public Employee(String name, double salary) {
        this("EMP" + System.currentTimeMillis(), name, "General", salary);
    }
    
    // Builder pattern constructor
    public static class Builder {
        private String id;
        private String name;
        private String department = "General";
        private double salary = 0.0;
        
        public Builder(String name) {
            this.name = name;
            this.id = "EMP" + System.currentTimeMillis();
        }
        
        public Builder department(String department) {
            this.department = department;
            return this;
        }
        
        public Builder salary(double salary) {
            this.salary = salary;
            return this;
        }
        
        public Employee build() {
            return new Employee(id, name, department, salary);
        }
    }
    
    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
    public boolean isActive() { return isActive; }
    
    // Setters with validation
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        }
    }
    
    public void setDepartment(String department) {
        if (department != null && !department.trim().isEmpty()) {
            this.department = department;
        }
    }
    
    public void setSalary(double salary) {
        if (salary >= 0) {
            this.salary = salary;
        }
    }
    
    public void deactivate() {
        this.isActive = false;
    }
    
    @Override
    public String toString() {
        return String.format("Employee[id=%s, name=%s, dept=%s, salary=%.2f, active=%s]", 
                            id, name, department, salary, isActive);
    }
}

public class ConstructorDemo {
    public static void main(String[] args) {
        // Default constructor
        Employee emp1 = new Employee();
        System.out.println("Default: " + emp1);
        
        // Parameterized constructor
        Employee emp2 = new Employee("John Doe", "Engineering", 75000.0);
        System.out.println("Parameterized: " + emp2);
        
        // Constructor chaining
        Employee emp3 = new Employee("Jane Smith", 65000.0);
        System.out.println("Chained: " + emp3);
        
        // Copy constructor
        Employee emp4 = new Employee(emp2);
        System.out.println("Copy: " + emp4);
        
        // Builder pattern
        Employee emp5 = new Employee.Builder("Alice Johnson")
            .department("Marketing")
            .salary(80000.0)
            .build();
        System.out.println("Builder: " + emp5);
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Always initialize final fields in constructors</li>
                      <li>• Use constructor chaining to avoid code duplication</li>
                      <li>• Validate parameters in constructors</li>
                      <li>• Keep constructors simple and focused</li>
                      <li>• Consider using builder pattern for complex objects</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Not calling super() in constructor chaining</li>
                      <li>• Leaving final fields uninitialized</li>
                      <li>• Performing complex operations in constructors</li>
                      <li>• Not validating constructor parameters</li>
                      <li>• Creating objects in invalid states</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'modifiers':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="modifiers" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🧷 Modifiers
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Access modifiers, non-access modifiers, theoretical foundations, and comprehensive examples</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">What are Modifiers?</h2>
                  <p className="text-lg text-gray-300 mb-4">Modifiers are keywords that modify the behavior and accessibility of classes, methods, and variables in Java.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-white">Access Modifiers:</strong> Control visibility and accessibility</li>
                    <li>• <strong className="text-white">Non-access Modifiers:</strong> Control behavior and characteristics</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        Modifiers implement the fundamental principles of <strong className="text-white">information hiding</strong> and <strong className="text-white">encapsulation</strong> in object-oriented programming. They provide fine-grained control over the visibility and behavior of program elements.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The modifier system enables <strong className="text-white">defensive programming</strong> by allowing developers to explicitly control access patterns and prevent unauthorized modifications to critical system components.
                      </p>
                      <p className="text-gray-300">
                        Understanding modifiers is crucial for implementing <strong className="text-white">secure</strong>, <strong className="text-white">maintainable</strong>, and <strong className="text-white">scalable</strong> software architectures.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Access Modifiers - Visibility Control</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Access Levels Hierarchy</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Access modifiers control the <strong className="text-white">visibility scope</strong> of classes, methods, and variables:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-green-400 font-bold mb-2">public</h4>
                            <p className="text-sm text-gray-300 mb-2">Accessible from anywhere in the application</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Global visibility</li>
                              <li>• API endpoints</li>
                              <li>• Framework interfaces</li>
                              <li>• Public APIs</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-yellow-400 font-bold mb-2">protected</h4>
                            <p className="text-sm text-gray-300 mb-2">Package + subclass access</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Inheritance-friendly</li>
                              <li>• Package access</li>
                              <li>• Subclass access</li>
                              <li>• Framework extension points</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-400 font-bold mb-2">package-private (default)</h4>
                            <p className="text-sm text-gray-300 mb-2">Same package access only</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Package encapsulation</li>
                              <li>• Internal implementation</li>
                              <li>• Package-level APIs</li>
                              <li>• Default visibility</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-red-400 font-bold mb-2">private</h4>
                            <p className="text-sm text-gray-300 mb-2">Class access only</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Maximum encapsulation</li>
                              <li>• Implementation details</li>
                              <li>• Internal state</li>
                              <li>• Helper methods</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Access Control Theory</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Access modifiers implement the <strong className="text-white">principle of least privilege</strong> and <strong className="text-white">defense in depth</strong>:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-white">Information Hiding:</strong> Hide implementation details from external access</li>
                          <li>• <strong className="text-white">Encapsulation:</strong> Bundle data and methods together with controlled access</li>
                          <li>• <strong className="text-white">API Design:</strong> Expose only necessary interfaces to clients</li>
                          <li>• <strong className="text-white">Security:</strong> Prevent unauthorized access to sensitive operations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Non-Access Modifiers - Behavior Control</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Static Modifier</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          The <code className="text-white">static</code> modifier creates <strong className="text-white">class-level</strong> members that belong to the class rather than instances:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Static Variables</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Shared across all instances</li>
                              <li>• Class-level state</li>
                              <li>• Memory efficient</li>
                              <li>• Thread safety considerations</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Static Methods</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Utility functions</li>
                              <li>• Factory methods</li>
                              <li>• Cannot access instance variables</li>
                              <li>• Cannot be overridden</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Final Modifier</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          The <code className="text-white">final</code> modifier creates <strong className="text-white">immutable</strong> elements:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Final Variables</h4>
                            <p className="text-sm text-gray-300">Cannot be reassigned after initialization</p>
                            <p className="text-xs text-gray-400">Constants, immutable references</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Final Methods</h4>
                            <p className="text-sm text-gray-300">Cannot be overridden in subclasses</p>
                            <p className="text-xs text-gray-400">Prevents method overriding</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Final Classes</h4>
                            <p className="text-sm text-gray-300">Cannot be extended</p>
                            <p className="text-xs text-gray-400">Prevents inheritance</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Abstract Modifier</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          The <code className="text-white">abstract</code> modifier creates <strong className="text-white">incomplete</strong> classes and methods:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Abstract Classes</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Cannot be instantiated</li>
                              <li>• Can contain concrete methods</li>
                              <li>• Partial implementation</li>
                              <li>• Template for subclasses</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Abstract Methods</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• No implementation provided</li>
                              <li>• Must be implemented by subclasses</li>
                              <li>• Define contract</li>
                              <li>• Enable polymorphism</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Synchronized Modifier</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          The <code className="text-white">synchronized</code> modifier provides <strong className="text-white">thread safety</strong>:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-white">Mutual Exclusion:</strong> Only one thread can execute synchronized code</li>
                          <li>• <strong className="text-white">Memory Visibility:</strong> Changes are visible to other threads</li>
                          <li>• <strong className="text-white">Method Synchronization:</strong> Synchronizes entire method</li>
                          <li>• <strong className="text-white">Block Synchronization:</strong> Synchronizes specific code blocks</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Transient and Volatile Modifiers</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Special modifiers for <strong className="text-white">serialization</strong> and <strong className="text-white">memory management</strong>:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">transient</h4>
                            <p className="text-sm text-gray-300 mb-2">Excludes field from serialization</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Not serialized</li>
                              <li>• Temporary data</li>
                              <li>• Security sensitive data</li>
                              <li>• Calculated fields</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">volatile</h4>
                            <p className="text-sm text-gray-300 mb-2">Ensures memory visibility across threads</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• No caching</li>
                              <li>• Always read from memory</li>
                              <li>• Thread-safe reads</li>
                              <li>• Performance impact</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Comprehensive Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`// Access modifiers example
public class BankAccount {
    // Private fields - maximum encapsulation
    private final String accountNumber;
    private String accountHolder;
    private double balance;
    private boolean isActive;
    
    // Package-private static counter
    static int totalAccounts = 0;
    
    // Public constructor
    public BankAccount(String accountHolder, double initialBalance) {
        this.accountNumber = "ACC" + (++totalAccounts);
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.isActive = true;
    }
    
    // Public methods - API interface
    public void deposit(double amount) {
        if (isActive && amount > 0) {
            balance += amount;
        }
    }
    
    public void withdraw(double amount) {
        if (isActive && amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
    
    // Protected method - for subclasses
    protected void setActive(boolean active) {
        this.isActive = active;
    }
    
    // Package-private helper method
    void validateAccount() {
        if (balance < 0) {
            isActive = false;
        }
    }
    
    // Private helper method
    private void logTransaction(String operation, double amount) {
        System.out.println(operation + ": " + amount + " | Balance: " + balance);
    }
    
    // Static utility method
    public static int getTotalAccounts() {
        return totalAccounts;
    }
    
    // Getters
    public String getAccountNumber() { return accountNumber; }
    public String getAccountHolder() { return accountHolder; }
    public double getBalance() { return balance; }
    public boolean isActive() { return isActive; }
}

// Abstract class example
abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method - must be implemented by subclasses
    public abstract double getArea();
    
    public abstract double getPerimeter();
    
    // Concrete method
    public String getColor() {
        return color;
    }
    
    // Final method - cannot be overridden
    public final String getShapeInfo() {
        return "Shape: " + getClass().getSimpleName() + ", Color: " + color;
    }
}

// Final class example
final class Circle extends Shape {
    private final double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }
    
    public double getRadius() {
        return radius;
    }
}

// Synchronized example
class Counter {
    private int count = 0;
    
    // Synchronized method
    public synchronized void increment() {
        count++;
    }
    
    // Synchronized block
    public void decrement() {
        synchronized(this) {
            count--;
        }
    }
    
    public synchronized int getCount() {
        return count;
    }
}

// Transient and volatile example
class DataProcessor implements Serializable {
    private String data;
    private transient String tempData; // Not serialized
    private volatile boolean processing = false; // Thread-safe
    
    public void processData(String input) {
        processing = true;
        tempData = input;
        data = processInput(input);
        processing = false;
    }
    
    private String processInput(String input) {
        return input.toUpperCase();
    }
    
    public boolean isProcessing() {
        return processing;
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use <code className="text-white">private</code> by default, public when necessary</li>
                      <li>• Use <code className="text-white">final</code> for immutable data</li>
                      <li>• Use <code className="text-white">static</code> for utility methods and constants</li>
                      <li>• Use <code className="text-white">abstract</code> for incomplete implementations</li>
                      <li>• Use <code className="text-white">synchronized</code> carefully for thread safety</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Overusing public access</li>
                      <li>• Not using final for constants</li>
                      <li>• Synchronized performance overhead</li>
                      <li>• Forgetting transient in serialization</li>
                      <li>• Misunderstanding protected access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'encapsulation':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="encapsulation" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔒 Java Encapsulation
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Data hiding, access control, getters/setters, and encapsulation best practices</p>
              
              <div className="max-w-6xl mx-auto">
                {/* What is Encapsulation */}
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">🔒 What is Encapsulation?</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">Definition</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        <strong className="text-green-400">Encapsulation</strong> is one of the four fundamental principles of Object-Oriented Programming (OOP). It refers to the bundling of data (attributes) and methods (functions) that operate on that data into a single unit called a class. It also involves hiding the internal state of objects and restricting direct access to some components.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        The key concept is <strong className="text-green-400">data hiding</strong> - protecting the internal state of an object from unauthorized access and modification. This is achieved through access modifiers and controlled interfaces.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">Key Principles</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
                            <h4 className="text-lg font-bold text-green-300 mb-2">🔐 Data Hiding</h4>
                            <p className="text-gray-300 text-sm">Keep data private and provide controlled access through methods</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
                            <h4 className="text-lg font-bold text-green-300 mb-2">🛡️ Access Control</h4>
                            <p className="text-gray-300 text-sm">Use access modifiers to control visibility and accessibility</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
                            <h4 className="text-lg font-bold text-green-300 mb-2">🔧 Controlled Interface</h4>
                            <p className="text-gray-300 text-sm">Provide public methods for safe data manipulation</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
                            <h4 className="text-lg font-bold text-green-300 mb-2">✅ Data Validation</h4>
                            <p className="text-gray-300 text-sm">Validate data before allowing modifications</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Access Modifiers */}
                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-blue-400 mb-6">🔑 Access Modifiers</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">Java Access Modifiers</h3>
                      <p className="text-gray-300 mb-4">Java provides four access modifiers to implement encapsulation:</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                          <h4 className="text-lg font-bold text-blue-300 mb-2">private</h4>
                          <p className="text-sm text-gray-300 mb-2">Most restrictive access level</p>
                          <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Accessible only within the same class</li>
                            <li>• Cannot be accessed from outside the class</li>
                            <li>• Used for data hiding</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                          <h4 className="text-lg font-bold text-blue-300 mb-2">default (no modifier)</h4>
                          <p className="text-sm text-gray-300 mb-2">Package-level access</p>
                          <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Accessible within the same package</li>
                            <li>• Cannot be accessed from other packages</li>
                            <li>• Default when no modifier is specified</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                          <h4 className="text-lg font-bold text-blue-300 mb-2">protected</h4>
                          <p className="text-sm text-gray-300 mb-2">Inheritance-friendly access</p>
                          <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Accessible within the same package</li>
                            <li>• Accessible by subclasses in other packages</li>
                            <li>• Used for inheritance</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                          <h4 className="text-lg font-bold text-blue-300 mb-2">public</h4>
                          <p className="text-sm text-gray-300 mb-2">Least restrictive access</p>
                          <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Accessible from anywhere</li>
                            <li>• Can be accessed from any package</li>
                            <li>• Used for public interfaces</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Getters and Setters */}
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">🔧 Getters and Setters</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-purple-400 mb-4">What are Getters and Setters?</h3>
                      <p className="text-gray-300 mb-4">
                        <strong className="text-purple-400">Getters</strong> and <strong className="text-purple-400">Setters</strong> are methods used to access and modify private fields in a controlled manner. They provide a public interface to private data while maintaining encapsulation.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 p-4 rounded-lg border border-purple-500/30">
                          <h4 className="text-lg font-bold text-purple-300 mb-2">Getter Methods</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Return the value of a private field</li>
                            <li>• Usually named getFieldName()</li>
                            <li>• Provide read-only access to data</li>
                            <li>• Can include validation or formatting</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-purple-500/30">
                          <h4 className="text-lg font-bold text-purple-300 mb-2">Setter Methods</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Set the value of a private field</li>
                            <li>• Usually named setFieldName()</li>
                            <li>• Provide controlled write access</li>
                            <li>• Can include validation and constraints</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practical Example */}
                <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">💻 Practical Example</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-yellow-400 mb-4">Bank Account Example</h3>
                      <p className="text-gray-300 mb-4">Let's create a BankAccount class that demonstrates proper encapsulation:</p>
                      
                      <div className="bg-gray-800 p-6 rounded-lg">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
{`public class BankAccount {
    // Private fields - data hiding
    private String accountNumber;
    private String accountHolder;
    private double balance;
    private String pin;
    
    // Constructor
    public BankAccount(String accountNumber, String accountHolder, String pin) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.pin = pin;
        this.balance = 0.0; // New account starts with 0 balance
    }
    
    // Getter methods - controlled read access
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public String getAccountHolder() {
        return accountHolder;
    }
    
    public double getBalance() {
        return balance;
    }
    
    // Setter methods - controlled write access with validation
    public void setAccountHolder(String newHolder) {
        if (newHolder != null && !newHolder.trim().isEmpty()) {
            this.accountHolder = newHolder;
        } else {
            System.out.println("Invalid account holder name!");
        }
    }
    
    public void setPin(String newPin) {
        if (newPin != null && newPin.length() == 4 && newPin.matches("\\d{4}")) {
            this.pin = newPin;
        } else {
            System.out.println("PIN must be 4 digits!");
        }
    }
    
    // Business methods - controlled operations
    public boolean deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            return true;
        } else {
            System.out.println("Deposit amount must be positive!");
            return false;
        }
    }
    
    public boolean withdraw(double amount, String enteredPin) {
        if (!pin.equals(enteredPin)) {
            System.out.println("Invalid PIN!");
            return false;
        }
        
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        } else {
            System.out.println("Invalid withdrawal amount or insufficient funds!");
            return false;
        }
    }
    
    public boolean changePin(String oldPin, String newPin) {
        if (pin.equals(oldPin)) {
            setPin(newPin);
            return true;
        } else {
            System.out.println("Invalid old PIN!");
            return false;
        }
    }
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-yellow-400 mb-4">Usage Example</h3>
                      <div className="bg-gray-800 p-6 rounded-lg">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
{`public class BankAccountDemo {
    public static void main(String[] args) {
        // Create a new bank account
        BankAccount account = new BankAccount("123456789", "John Doe", "1234");
        
        // Access data through getters (controlled access)
        System.out.println("Account: " + account.getAccountNumber());
        System.out.println("Holder: " + account.getAccountHolder());
        System.out.println("Balance: $" + account.getBalance());
        
        // Modify data through setters (controlled modification)
        account.setAccountHolder("John Smith");
        account.deposit(1000.0);
        
        // Business operations with validation
        boolean success = account.withdraw(500.0, "1234");
        if (success) {
            System.out.println("Withdrawal successful!");
        }
        
        // This would fail - invalid PIN
        account.withdraw(100.0, "9999");
        
        // This would fail - insufficient funds
        account.withdraw(1000.0, "1234");
        
        System.out.println("Final balance: $" + account.getBalance());
    }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits of Encapsulation */}
                <div className="bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-red-400 mb-6">🎯 Benefits of Encapsulation</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
                        <h4 className="text-lg font-bold text-red-300 mb-2">🛡️ Data Security</h4>
                        <p className="text-sm text-gray-300">Private data cannot be accessed directly, preventing unauthorized modifications</p>
                      </div>
                      
                      <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
                        <h4 className="text-lg font-bold text-red-300 mb-2">✅ Data Validation</h4>
                        <p className="text-sm text-gray-300">Setters can validate data before allowing changes</p>
                      </div>
                      
                      <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
                        <h4 className="text-lg font-bold text-red-300 mb-2">🔧 Easy Maintenance</h4>
                        <p className="text-sm text-gray-300">Changes to internal implementation don't affect external code</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
                        <h4 className="text-lg font-bold text-red-300 mb-2">🎯 Controlled Interface</h4>
                        <p className="text-sm text-gray-300">Public methods provide a clean, controlled interface</p>
                      </div>
                      
                      <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
                        <h4 className="text-lg font-bold text-red-300 mb-2">🔄 Flexibility</h4>
                        <p className="text-sm text-gray-300">Internal implementation can change without affecting users</p>
                      </div>
                      
                      <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
                        <h4 className="text-lg font-bold text-red-300 mb-2">🐛 Easier Debugging</h4>
                        <p className="text-sm text-gray-300">Data access is controlled, making it easier to track issues</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-indigo-400 mb-6">⭐ Encapsulation Best Practices</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-indigo-400 mb-4">Guidelines for Good Encapsulation</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                          <h4 className="text-lg font-bold text-indigo-300 mb-2">1. Make Fields Private</h4>
                          <p className="text-sm text-gray-300">Always make instance variables private unless there's a specific reason to make them public</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                          <h4 className="text-lg font-bold text-indigo-300 mb-2">2. Provide Getters for Read Access</h4>
                          <p className="text-sm text-gray-300">Create getter methods for fields that need to be read from outside the class</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                          <h4 className="text-lg font-bold text-indigo-300 mb-2">3. Provide Setters for Write Access</h4>
                          <p className="text-sm text-gray-300">Create setter methods with validation for fields that need to be modified</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                          <h4 className="text-lg font-bold text-indigo-300 mb-2">4. Validate Input in Setters</h4>
                          <p className="text-sm text-gray-300">Always validate input data in setter methods to maintain data integrity</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                          <h4 className="text-lg font-bold text-indigo-300 mb-2">5. Use Business Methods</h4>
                          <p className="text-sm text-gray-300">Provide business methods that perform meaningful operations rather than just getters/setters</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real-World Analogy */}
                <div className="bg-gradient-to-r from-teal-600/10 to-green-600/10 border border-teal-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-teal-400 mb-6">🌍 Real-World Analogy</h2>
                  
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-teal-400 mb-4">ATM Machine Analogy</h3>
                    <p className="text-gray-300 mb-4">
                      Think of encapsulation like an <strong className="text-teal-400">ATM machine</strong>:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                          <h4 className="text-lg font-bold text-teal-300 mb-2">🔒 Hidden Data</h4>
                          <p className="text-sm text-gray-300">The cash, card reader mechanisms, and internal systems are hidden inside the machine (private data)</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                          <h4 className="text-lg font-bold text-teal-300 mb-2">🖥️ Public Interface</h4>
                          <p className="text-sm text-gray-300">You interact through buttons, screen, and card slot (public methods)</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                          <h4 className="text-lg font-bold text-teal-300 mb-2">🔐 Controlled Access</h4>
                          <p className="text-sm text-gray-300">You can't directly access the cash; you must use withdrawal methods with PIN validation</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                          <h4 className="text-lg font-bold text-teal-300 mb-2">✅ Data Validation</h4>
                          <p className="text-sm text-gray-300">The ATM validates your PIN, checks balance, and enforces withdrawal limits</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'packages':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="packages" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📦 Packages
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Organization, naming, imports, access control, theoretical foundations, and comprehensive examples</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">What are Packages?</h2>
                  <p className="text-lg text-gray-300 mb-4">Packages are Java's namespace mechanism that groups related classes and interfaces for better organization, access control, and avoiding naming conflicts.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-white">Namespace Management:</strong> Avoid naming conflicts</li>
                    <li>• <strong className="text-white">Access Control:</strong> Package-level visibility</li>
                    <li>• <strong className="text-white">Organization:</strong> Logical grouping of related classes</li>
                    <li>• <strong className="text-white">Import System:</strong> Selective class importing</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        Packages implement the <strong className="text-white">namespace pattern</strong> and <strong className="text-white">modular design</strong> principles in software architecture. They provide a hierarchical organization system that mirrors real-world domain structures.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The package system enables <strong className="text-white">separation of concerns</strong> by allowing developers to organize code into logical modules with controlled access patterns and clear boundaries.
                      </p>
                      <p className="text-gray-300">
                        Understanding packages is crucial for implementing <strong className="text-white">scalable</strong>, <strong className="text-white">maintainable</strong>, and <strong className="text-white">collaborative</strong> software systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Package Organization and Naming</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Package Naming Conventions</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Package names follow the <strong className="text-white">reverse domain naming</strong> convention to ensure global uniqueness:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Standard Convention</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <code className="text-white">com.company.project.module</code></li>
                              <li>• <code className="text-white">org.apache.commons.lang</code></li>
                              <li>• <code className="text-white">java.util.concurrent</code></li>
                              <li>• <code className="text-white">javax.servlet.http</code></li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Naming Rules</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Lowercase letters only</li>
                              <li>• Use dots for hierarchy</li>
                              <li>• No spaces or special characters</li>
                              <li>• Descriptive and meaningful</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Package Structure Theory</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Packages create a <strong className="text-white">hierarchical namespace</strong> that mirrors organizational and domain structures:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Domain Packages</h4>
                            <p className="text-sm text-gray-300 mb-2">Business domain organization</p>
                            <p className="text-xs text-gray-400">com.company.banking.accounts</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Technical Packages</h4>
                            <p className="text-sm text-gray-300 mb-2">Technical layer organization</p>
                            <p className="text-xs text-gray-400">com.company.banking.dao</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Utility Packages</h4>
                            <p className="text-sm text-gray-300 mb-2">Shared utility classes</p>
                            <p className="text-xs text-gray-400">com.company.banking.utils</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Import System and Access Control</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Import Mechanisms</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Java provides several import mechanisms for accessing classes from other packages:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Single Import</h4>
                            <p className="text-sm text-gray-300 mb-2">Import specific class</p>
                            <code className="text-xs text-gray-400">import java.util.ArrayList;</code>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Wildcard Import</h4>
                            <p className="text-sm text-gray-300 mb-2">Import all classes from package</p>
                            <code className="text-xs text-gray-400">import java.util.*;</code>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Static Import</h4>
                            <p className="text-sm text-gray-300 mb-2">Import static members</p>
                            <code className="text-xs text-gray-400">import static java.lang.Math.PI;</code>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Fully Qualified</h4>
                            <p className="text-sm text-gray-300 mb-2">Use complete package name</p>
                            <code className="text-xs text-gray-400">java.util.ArrayList list;</code>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Package Access Control</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Packages provide <strong className="text-white">package-level access control</strong> through package-private visibility:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-white">Package-Private:</strong> Default access within same package</li>
                          <li>• <strong className="text-white">Protected Access:</strong> Package + subclass access</li>
                          <li>• <strong className="text-white">Public Access:</strong> Global access across packages</li>
                          <li>• <strong className="text-white">Private Access:</strong> Class-only access</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Advanced Package Concepts</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Package Design Patterns</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Common package organization patterns for different architectural approaches:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Layered Architecture</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <code className="text-white">com.company.app.presentation</code></li>
                              <li>• <code className="text-white">com.company.app.business</code></li>
                              <li>• <code className="text-white">com.company.app.data</code></li>
                              <li>• <code className="text-white">com.company.app.util</code></li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Domain-Driven Design</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <code className="text-white">com.company.banking.domain</code></li>
                              <li>• <code className="text-white">com.company.banking.infrastructure</code></li>
                              <li>• <code className="text-white">com.company.banking.application</code></li>
                              <li>• <code className="text-white">com.company.banking.interfaces</code></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Package Dependencies and Coupling</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding package dependencies is crucial for maintaining <strong className="text-white">loose coupling</strong> and <strong className="text-white">high cohesion</strong>:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Acyclic Dependencies</h4>
                            <p className="text-sm text-gray-300 mb-2">Avoid circular package dependencies</p>
                            <p className="text-xs text-gray-400">Prevents tight coupling</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Dependency Inversion</h4>
                            <p className="text-sm text-gray-300 mb-2">Depend on abstractions, not concretions</p>
                            <p className="text-xs text-gray-400">Interface-based design</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Package Cohesion</h4>
                            <p className="text-sm text-gray-300 mb-2">Related classes in same package</p>
                            <p className="text-xs text-gray-400">Single responsibility principle</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Comprehensive Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`// Package: com.banking.domain
package com.banking.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

public class Account {
    private final String accountNumber;
    private String accountHolder;
    private BigDecimal balance;
    private AccountType type;
    private LocalDateTime createdAt;
    
    public Account(String accountNumber, String accountHolder, AccountType type) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.type = type;
        this.balance = BigDecimal.ZERO;
        this.createdAt = LocalDateTime.now();
    }
    
    public void deposit(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) > 0) {
            balance = balance.add(amount);
        }
    }
    
    public boolean withdraw(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) > 0 && 
            balance.compareTo(amount) >= 0) {
            balance = balance.subtract(amount);
            return true;
        }
        return false;
    }
    
    // Getters
    public String getAccountNumber() { return accountNumber; }
    public String getAccountHolder() { return accountHolder; }
    public BigDecimal getBalance() { return balance; }
    public AccountType getType() { return type; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Account account = (Account) obj;
        return Objects.equals(accountNumber, account.accountNumber);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(accountNumber);
    }
}

// Package: com.banking.domain
public enum AccountType {
    SAVINGS, CHECKING, BUSINESS, INVESTMENT
}

// Package: com.banking.service
package com.banking.service;

import com.banking.domain.Account;
import com.banking.domain.AccountType;
import com.banking.repository.AccountRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public class AccountService {
    private final AccountRepository repository;
    
    public AccountService(AccountRepository repository) {
        this.repository = repository;
    }
    
    public Account createAccount(String accountHolder, AccountType type) {
        String accountNumber = generateAccountNumber();
        Account account = new Account(accountNumber, accountHolder, type);
        return repository.save(account);
    }
    
    public Optional<Account> findAccount(String accountNumber) {
        return repository.findByAccountNumber(accountNumber);
    }
    
    public List<Account> findAccountsByHolder(String accountHolder) {
        return repository.findByAccountHolder(accountHolder);
    }
    
    public boolean transfer(String fromAccount, String toAccount, BigDecimal amount) {
        Optional<Account> from = repository.findByAccountNumber(fromAccount);
        Optional<Account> to = repository.findByAccountNumber(toAccount);
        
        if (from.isPresent() && to.isPresent()) {
            if (from.get().withdraw(amount)) {
                to.get().deposit(amount);
                return true;
            }
        }
        return false;
    }
    
    private String generateAccountNumber() {
        return "ACC" + System.currentTimeMillis();
    }
}

// Package: com.banking.repository
package com.banking.repository;

import com.banking.domain.Account;
import java.util.List;
import java.util.Optional;

public interface AccountRepository {
    Account save(Account account);
    Optional<Account> findByAccountNumber(String accountNumber);
    List<Account> findByAccountHolder(String accountHolder);
    List<Account> findAll();
    void delete(Account account);
}

// Package: com.banking.repository.impl
package com.banking.repository.impl;

import com.banking.domain.Account;
import com.banking.repository.AccountRepository;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryAccountRepository implements AccountRepository {
    private final Map<String, Account> accounts = new ConcurrentHashMap<>();
    
    @Override
    public Account save(Account account) {
        accounts.put(account.getAccountNumber(), account);
        return account;
    }
    
    @Override
    public Optional<Account> findByAccountNumber(String accountNumber) {
        return Optional.ofNullable(accounts.get(accountNumber));
    }
    
    @Override
    public List<Account> findByAccountHolder(String accountHolder) {
        return accounts.values().stream()
            .filter(account -> account.getAccountHolder().equals(accountHolder))
            .toList();
    }
    
    @Override
    public List<Account> findAll() {
        return new ArrayList<>(accounts.values());
    }
    
    @Override
    public void delete(Account account) {
        accounts.remove(account.getAccountNumber());
    }
}

// Package: com.banking.util
package com.banking.util;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;

public class CurrencyFormatter {
    private static final Locale DEFAULT_LOCALE = Locale.US;
    
    public static String formatCurrency(BigDecimal amount) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(DEFAULT_LOCALE);
        return formatter.format(amount);
    }
    
    public static String formatCurrency(BigDecimal amount, Locale locale) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);
        return formatter.format(amount);
    }
}

// Package: com.banking.main
package com.banking.main;

import com.banking.domain.Account;
import com.banking.domain.AccountType;
import com.banking.repository.impl.InMemoryAccountRepository;
import com.banking.service.AccountService;
import com.banking.util.CurrencyFormatter;
import java.math.BigDecimal;

public class BankingApplication {
    public static void main(String[] args) {
        // Create repository and service
        InMemoryAccountRepository repository = new InMemoryAccountRepository();
        AccountService accountService = new AccountService(repository);
        
        // Create accounts
        Account savings = accountService.createAccount("John Doe", AccountType.SAVINGS);
        Account checking = accountService.createAccount("John Doe", AccountType.CHECKING);
        
        // Perform operations
        savings.deposit(new BigDecimal("1000.00"));
        checking.deposit(new BigDecimal("500.00"));
        
        // Transfer money
        boolean transferSuccess = accountService.transfer(
            savings.getAccountNumber(), 
            checking.getAccountNumber(), 
            new BigDecimal("200.00")
        );
        
        if (transferSuccess) {
            System.out.println("Transfer successful!");
            System.out.println("Savings balance: " + 
                CurrencyFormatter.formatCurrency(savings.getBalance()));
            System.out.println("Checking balance: " + 
                CurrencyFormatter.formatCurrency(checking.getBalance()));
        }
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use reverse domain naming convention</li>
                      <li>• Keep packages focused and cohesive</li>
                      <li>• Avoid circular dependencies</li>
                      <li>• Use meaningful package names</li>
                      <li>• Organize by domain or technical layer</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Using default package (no package declaration)</li>
                      <li>• Creating overly deep package hierarchies</li>
                      <li>• Circular dependencies between packages</li>
                      <li>• Not following naming conventions</li>
                      <li>• Mixing unrelated classes in same package</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'inheritance':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="inheritance" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🧬 Inheritance
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Definition, types, overriding, super, constructor chaining, composition vs inheritance, theoretical foundations, and comprehensive examples</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-purple-600/10 to-red-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">What is Inheritance?</h2>
                  <p className="text-lg text-gray-300 mb-4">A subclass reuses and specializes behavior from a superclass using <code className="text-purple-300">extends</code>. Inheritance models an <strong className="text-purple-300">is‑a</strong> relationship (e.g., Dog is an Animal).</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-purple-300">Single Inheritance:</strong> Java supports single inheritance of classes</li>
                    <li>• <strong className="text-purple-300">Method Overriding:</strong> Subclasses can override superclass methods</li>
                    <li>• <strong className="text-purple-300">Access Control:</strong> Protected members accessible to subclasses</li>
                    <li>• <strong className="text-purple-300">Constructor Chaining:</strong> Superclass constructors called first</li>
                    <li>• <strong className="text-purple-300">Multiple Inheritance:</strong> Achieved through interfaces</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-300 mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        Inheritance implements the <strong className="text-purple-300">code reuse</strong> and <strong className="text-purple-300">specialization</strong> principles in object-oriented programming. It enables the creation of hierarchical class structures that model real-world relationships.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The inheritance mechanism follows the <strong className="text-purple-300">Liskov Substitution Principle (LSP)</strong>, ensuring that objects of a superclass can be replaced with objects of a subclass without altering the correctness of the program.
                      </p>
                      <p className="text-gray-300">
                        Understanding inheritance is crucial for implementing <strong className="text-purple-300">maintainable</strong>, <strong className="text-purple-300">extensible</strong>, and <strong className="text-purple-300">polymorphic</strong> software systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">Types of Inheritance</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Inheritance Hierarchy Types</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Java supports several inheritance patterns through class extension and interface implementation:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Single Inheritance</h4>
                            <p className="text-sm text-gray-300 mb-2">One class extends one superclass</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Direct parent-child relationship</li>
                              <li>• Most common inheritance pattern</li>
                              <li>• Clear hierarchy structure</li>
                              <li>• Avoids diamond problem</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Multilevel Inheritance</h4>
                            <p className="text-sm text-gray-300 mb-2">Chain of inheritance (A → B → C)</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Grandparent-parent-child chain</li>
                              <li>• Each level adds specialization</li>
                              <li>• Can access all ancestor methods</li>
                              <li>• Constructor chaining required</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Hierarchical Inheritance</h4>
                            <p className="text-sm text-gray-300 mb-2">Multiple classes extend one superclass</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• One parent, multiple children</li>
                              <li>• Shared common behavior</li>
                              <li>• Specialized implementations</li>
                              <li>• Polymorphic behavior</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Multiple Inheritance</h4>
                            <p className="text-sm text-gray-300 mb-2">Achieved through interfaces</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• One class implements multiple interfaces</li>
                              <li>• Contract-based inheritance</li>
                              <li>• No implementation inheritance</li>
                              <li>• Avoids diamond problem</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Inheritance vs Composition</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding when to use inheritance versus composition is crucial for good design:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Use Inheritance When</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• True "is-a" relationship exists</li>
                              <li>• Need to override behavior</li>
                              <li>• Want polymorphic behavior</li>
                              <li>• Superclass is stable and well-designed</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Use Composition When</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• "has-a" or "uses-a" relationship</li>
                              <li>• Need runtime flexibility</li>
                              <li>• Want to avoid tight coupling</li>
                              <li>• Multiple inheritance needed</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">Method Overriding and Polymorphism</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Method Overriding Rules</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Method overriding enables <strong className="text-purple-300">runtime polymorphism</strong> and must follow specific rules:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-purple-300">Same Signature:</strong> Method name and parameters must match exactly</li>
                          <li>• <strong className="text-purple-300">Covariant Returns:</strong> Return type can be subclass of superclass return type</li>
                          <li>• <strong className="text-purple-300">Access Level:</strong> Cannot be more restrictive than superclass method</li>
                          <li>• <strong className="text-purple-300">Exception Handling:</strong> Cannot throw broader checked exceptions</li>
                          <li>• <strong className="text-purple-300">@Override Annotation:</strong> Recommended for clarity and error detection</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Dynamic Method Dispatch</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Java uses <strong className="text-purple-300">dynamic method dispatch</strong> to determine which method to call at runtime:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Virtual Method Calls</h4>
                            <p className="text-sm text-gray-300 mb-2">Method resolution at runtime</p>
                            <p className="text-xs text-gray-400">Based on actual object type</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Method Table</h4>
                            <p className="text-sm text-gray-300 mb-2">Virtual method table (vtable)</p>
                            <p className="text-xs text-gray-400">Efficient method lookup</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Polymorphism</h4>
                            <p className="text-sm text-gray-300 mb-2">Same interface, different behavior</p>
                            <p className="text-xs text-gray-400">Runtime behavior variation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">Constructor Chaining and Initialization</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Constructor Chaining Process</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Constructor chaining ensures proper initialization order in inheritance hierarchies:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Implicit super()</h4>
                            <p className="text-sm text-gray-300 mb-2">Automatic call to superclass constructor</p>
                            <p className="text-xs text-gray-400">First line of subclass constructor</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Explicit super()</h4>
                            <p className="text-sm text-gray-300 mb-2">Manual call with parameters</p>
                            <p className="text-xs text-gray-400">Must be first statement</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">this() Chaining</h4>
                            <p className="text-sm text-gray-300 mb-2">Call another constructor in same class</p>
                            <p className="text-xs text-gray-400">Alternative to super()</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Initialization Order</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding the initialization sequence is crucial for proper object construction:
                        </p>
                        <ol className="space-y-2 text-gray-300 text-sm">
                          <li>1. <strong className="text-purple-300">Static Initialization:</strong> Static blocks and fields in superclass</li>
                          <li>2. <strong className="text-purple-300">Static Initialization:</strong> Static blocks and fields in subclass</li>
                          <li>3. <strong className="text-purple-300">Instance Initialization:</strong> Instance blocks and fields in superclass</li>
                          <li>4. <strong className="text-purple-300">Superclass Constructor:</strong> Superclass constructor execution</li>
                          <li>5. <strong className="text-purple-300">Instance Initialization:</strong> Instance blocks and fields in subclass</li>
                          <li>6. <strong className="text-purple-300">Subclass Constructor:</strong> Subclass constructor execution</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">Comprehensive Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`// Base class - Animal
class Animal {
    protected String name;
    protected int age;
    protected String species;
    
    // Static initialization
    static {
        System.out.println("Animal class loaded");
    }
    
    // Instance initialization
    {
        System.out.println("Animal instance block");
    }
    
    public Animal(String name, int age, String species) {
        System.out.println("Animal constructor called");
        this.name = name;
        this.age = age;
        this.species = species;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
    
    public void makeSound() {
        System.out.println(name + " makes a sound");
    }
    
    // Final method - cannot be overridden
    public final void breathe() {
        System.out.println(name + " is breathing");
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getSpecies() { return species; }
    
    @Override
    public String toString() {
        return species + " named " + name + " (age " + age + ")";
    }
}

// Intermediate class - Mammal
class Mammal extends Animal {
    private boolean hasFur;
    private int numberOfLegs;
    
    static {
        System.out.println("Mammal class loaded");
    }
    
    {
        System.out.println("Mammal instance block");
    }
    
    public Mammal(String name, int age, boolean hasFur, int numberOfLegs) {
        super(name, age, "Mammal"); // Call parent constructor
        System.out.println("Mammal constructor called");
        this.hasFur = hasFur;
        this.numberOfLegs = numberOfLegs;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " makes a mammal sound");
    }
    
    public void nurse() {
        System.out.println(name + " is nursing");
    }
    
    public boolean hasFur() { return hasFur; }
    public int getNumberOfLegs() { return numberOfLegs; }
    
    @Override
    public String toString() {
        return super.toString() + " with " + numberOfLegs + " legs" + 
               (hasFur ? " and fur" : " without fur");
    }
}

// Concrete class - Dog
class Dog extends Mammal {
    private String breed;
    private boolean isTrained;
    
    static {
        System.out.println("Dog class loaded");
    }
    
    {
        System.out.println("Dog instance block");
    }
    
    public Dog(String name, int age, String breed, boolean isTrained) {
        super(name, age, true, 4); // Call Mammal constructor
        System.out.println("Dog constructor called");
        this.breed = breed;
        this.isTrained = isTrained;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " barks: Woof! Woof!");
    }
    
    public void wagTail() {
        System.out.println(name + " is wagging tail");
    }
    
    public void fetch() {
        System.out.println(name + " is fetching");
    }
    
    public String getBreed() { return breed; }
    public boolean isTrained() { return isTrained; }
    
    @Override
    public String toString() {
        return super.toString() + " of breed " + breed + 
               (isTrained ? " (trained)" : " (not trained)");
    }
}

// Another concrete class - Cat
class Cat extends Mammal {
    private boolean isIndoor;
    private String favoriteToy;
    
    public Cat(String name, int age, boolean isIndoor, String favoriteToy) {
        super(name, age, true, 4);
        this.isIndoor = isIndoor;
        this.favoriteToy = favoriteToy;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " meows: Meow! Meow!");
    }
    
    public void purr() {
        System.out.println(name + " is purring");
    }
    
    public void play() {
        System.out.println(name + " is playing with " + favoriteToy);
    }
    
    public boolean isIndoor() { return isIndoor; }
    public String getFavoriteToy() { return favoriteToy; }
}

// Interface for additional behavior
interface Pet {
    void play();
    void beFriendly();
    String getOwner();
}

// Dog implementing Pet interface
class PetDog extends Dog implements Pet {
    private String owner;
    
    public PetDog(String name, int age, String breed, boolean isTrained, String owner) {
        super(name, age, breed, isTrained);
        this.owner = owner;
    }
    
    @Override
    public void play() {
        System.out.println(name + " is playing with " + owner);
    }
    
    @Override
    public void beFriendly() {
        System.out.println(name + " is being friendly to " + owner);
    }
    
    @Override
    public String getOwner() {
        return owner;
    }
}

// Composition example - Animal Shelter
class AnimalShelter {
    private List<Animal> animals;
    private String shelterName;
    
    public AnimalShelter(String shelterName) {
        this.shelterName = shelterName;
        this.animals = new ArrayList<>();
    }
    
    public void addAnimal(Animal animal) {
        animals.add(animal);
        System.out.println("Added " + animal.getName() + " to " + shelterName);
    }
    
    public void feedAllAnimals() {
        System.out.println("Feeding all animals in " + shelterName);
        for (Animal animal : animals) {
            animal.eat();
        }
    }
    
    public void makeAllAnimalsSound() {
        System.out.println("All animals in " + shelterName + " are making sounds:");
        for (Animal animal : animals) {
            animal.makeSound();
        }
    }
    
    public List<Animal> getAnimals() {
        return new ArrayList<>(animals);
    }
}

// Demo class
public class InheritanceDemo {
    public static void main(String[] args) {
        System.out.println("=== Inheritance Demo ===\\n");
        
        // Create animals
        Dog dog = new Dog("Buddy", 3, "Golden Retriever", true);
        Cat cat = new Cat("Whiskers", 2, true, "ball");
        PetDog petDog = new PetDog("Max", 4, "Labrador", true, "John");
        
        System.out.println("\\n=== Animal Information ===");
        System.out.println(dog);
        System.out.println(cat);
        System.out.println(petDog);
        
        System.out.println("\\n=== Polymorphic Behavior ===");
        Animal[] animals = {dog, cat, petDog};
        
        for (Animal animal : animals) {
            System.out.println("\\n" + animal.getName() + ":");
            animal.eat();
            animal.sleep();
            animal.makeSound();
            animal.breathe(); // Final method
            
            // Type-specific behavior
            if (animal instanceof Dog) {
                ((Dog) animal).wagTail();
                ((Dog) animal).fetch();
            } else if (animal instanceof Cat) {
                ((Cat) animal).purr();
                ((Cat) animal).play();
            }
            
            if (animal instanceof Pet) {
                ((Pet) animal).play();
                ((Pet) animal).beFriendly();
                System.out.println("Owner: " + ((Pet) animal).getOwner());
            }
        }
        
        System.out.println("\\n=== Composition Example ===");
        AnimalShelter shelter = new AnimalShelter("Happy Paws Shelter");
        shelter.addAnimal(dog);
        shelter.addAnimal(cat);
        shelter.addAnimal(petDog);
        
        shelter.feedAllAnimals();
        System.out.println();
        shelter.makeAllAnimalsSound();
        
        System.out.println("\\n=== Method Overriding Demo ===");
        demonstrateMethodOverriding();
    }
    
    private static void demonstrateMethodOverriding() {
        Animal animal = new Dog("Rex", 5, "German Shepherd", false);
        
        // Runtime polymorphism - calls Dog's makeSound()
        animal.makeSound(); // Output: Rex barks: Woof! Woof!
        
        // Cannot call Dog-specific methods without casting
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal; // Downcasting
            dog.wagTail();
        }
    }
}`}</pre>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">Advanced Inheritance Concepts</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Liskov Substitution Principle (LSP)</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          The LSP states that objects of a superclass should be replaceable with objects of a subclass without altering the correctness of the program:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-purple-300">Behavioral Compatibility:</strong> Subclass must honor superclass contracts</li>
                          <li>• <strong className="text-purple-300">Preconditions:</strong> Subclass cannot strengthen preconditions</li>
                          <li>• <strong className="text-purple-300">Postconditions:</strong> Subclass cannot weaken postconditions</li>
                          <li>• <strong className="text-purple-300">Invariants:</strong> Subclass must maintain superclass invariants</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Inheritance Anti-Patterns</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Common mistakes to avoid when using inheritance:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-red-400 font-bold mb-2">Fragile Base Class</h4>
                            <p className="text-sm text-gray-300 mb-2">Changes to superclass break subclasses</p>
                            <p className="text-xs text-gray-400">Solution: Use composition</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-red-400 font-bold mb-2">Inappropriate Inheritance</h4>
                            <p className="text-sm text-gray-300 mb-2">Using inheritance for code reuse only</p>
                            <p className="text-xs text-gray-400">Solution: Use composition</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-red-400 font-bold mb-2">Deep Inheritance</h4>
                            <p className="text-sm text-gray-300 mb-2">Too many levels of inheritance</p>
                            <p className="text-xs text-gray-400">Solution: Flatten hierarchy</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-red-400 font-bold mb-2">God Classes</h4>
                            <p className="text-sm text-gray-300 mb-2">Superclass with too many responsibilities</p>
                            <p className="text-xs text-gray-400">Solution: Split responsibilities</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-purple-400 mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Favor composition over inheritance for reuse without tight coupling</li>
                      <li>• Keep superclasses stable; subclasses should not break LSP</li>
                      <li>• Prefer protected sparingly; keep fields private</li>
                      <li>• Use final on classes/methods when extension is not intended</li>
                      <li>• Design for inheritance or prohibit it</li>
                      <li>• Use abstract classes for common behavior</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-purple-400 mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Using inheritance for code reuse only</li>
                      <li>• Breaking Liskov Substitution Principle</li>
                      <li>• Creating fragile base classes</li>
                      <li>• Deep inheritance hierarchies</li>
                      <li>• Not using @Override annotation</li>
                      <li>• Ignoring constructor chaining</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'polymorphism':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="polymorphism" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🎭 Polymorphism
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Overriding, overloading, dynamic dispatch, upcasting/downcasting, covariant returns</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-yellow-600/10 to-amber-600/10 border border-yellow-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">Many Forms</h2>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Compile-time: method overloading</li>
                    <li>• Runtime: method overriding + dynamic dispatch (virtual calls)</li>
                    <li>• Interfaces/abstract classes enable polymorphic APIs</li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">Dynamic Dispatch Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`class Shape { void draw() { System.out.println("shape"); } }
class Circle extends Shape { @Override void draw() { System.out.println("circle"); } }
class Square extends Shape { @Override void draw() { System.out.println("square"); } }
class Demo { static void paint(Shape s) { s.draw(); } }`}</pre>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3">Rules for Overriding</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Same name and parameters; covariant return allowed</li>
                      <li>• Access cannot be more restrictive</li>
                      <li>• Exceptions: cannot throw broader checked exceptions</li>
                      <li>• Use <code className="text-yellow-300">@Override</code> to catch mistakes</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3">Casting</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Upcasting (sub → super): implicit and safe</li>
                      <li>• Downcasting (super → sub): explicit and validate with <code className="text-yellow-300">instanceof</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'abstraction':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="abstraction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                👻 Abstraction
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Abstract classes vs interfaces, contracts, design guidelines</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-red-600/10 to-rose-600/10 border border-red-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-red-400 mb-6">Hiding Complexity</h2>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Abstract classes: partial abstraction, state + concrete methods</li>
                    <li>• Interfaces: full abstraction, multiple inheritance of type</li>
                  </ul>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-red-400 mb-3">When to Use Abstract Class</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• You need shared state or protected helpers</li>
                      <li>• You want to provide default behavior</li>
                      <li>• You expect closely related subclasses</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-red-400 mb-3">When to Use Interface</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• You need a capability/role contract</li>
                      <li>• Multiple unrelated classes must implement it</li>
                      <li>• You want composition-friendly design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'interfaces':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="interfaces" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔌 Interfaces
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Contracts, default/static/private methods, functional interfaces, multiple inheritance of type</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-indigo-600/10 to-blue-600/10 border border-indigo-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-indigo-400 mb-6">Defining Contracts</h2>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Implicitly public abstract methods</li>
                    <li>• public static final constants</li>
                    <li>• default and static methods (Java 8+)</li>
                    <li>• private interface methods (Java 9+)</li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-indigo-400 mb-4">Functional Interfaces and Lambdas</h3>
                  <p className="text-gray-300 mb-3">A functional interface has exactly one abstract method (e.g., Runnable, Comparator). They enable lambda expressions and method references.</p>
                  <pre className="text-green-400 font-mono text-sm">{`@FunctionalInterface interface Op { int apply(int a,int b); }
Op add = (a,b) -> a + b;`}</pre>
                </div>
              </div>
            </div>
          </main>
        );

      case 'enums':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="enums" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🧭 Enums
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Type-safe constants, methods in enums, theoretical foundations, and comprehensive examples</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-teal-600/10 to-emerald-600/10 border border-teal-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-teal-400 mb-6">What are Enums?</h2>
                  <p className="text-lg text-gray-300 mb-4">Enums define a fixed set of constants with optional fields, constructors, and methods. They provide type safety and eliminate magic numbers/strings.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-teal-300">Type Safety:</strong> Compile-time checking of valid values</li>
                    <li>• <strong className="text-teal-300">Constants:</strong> Fixed set of predefined values</li>
                    <li>• <strong className="text-teal-300">Methods:</strong> Can contain methods and fields</li>
                    <li>• <strong className="text-teal-300">Switch Support:</strong> Enhanced switch statements</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-teal-300 mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        Enums implement the <strong className="text-teal-300">type-safe enumeration pattern</strong> and <strong className="text-teal-300">constant object pattern</strong> in object-oriented programming. They provide a robust alternative to traditional constant definitions.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The enum mechanism enables <strong className="text-teal-300">domain modeling</strong> by allowing developers to represent real-world concepts with fixed, well-defined values that are both type-safe and self-documenting.
                      </p>
                      <p className="text-gray-300">
                        Understanding enums is crucial for implementing <strong className="text-teal-300">maintainable</strong>, <strong className="text-teal-300">readable</strong>, and <strong className="text-teal-300">robust</strong> software systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-teal-400 mb-6">Enum Types and Features</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-teal-400 mb-4">Basic Enum Structure</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Enums are special classes that extend <code className="text-teal-300">java.lang.Enum</code> and provide several built-in features:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-teal-300 font-bold mb-2">Simple Enum</h4>
                            <p className="text-sm text-gray-300 mb-2">Basic constant enumeration</p>
                            <code className="text-xs text-gray-400">enum Status &#123; ACTIVE, INACTIVE, PENDING &#125;</code>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-teal-300 font-bold mb-2">Enum with Fields</h4>
                            <p className="text-sm text-gray-300 mb-2">Enums with additional data</p>
                            <code className="text-xs text-gray-400">enum Planet &#123; EARTH(6371), MARS(3390) &#125;</code>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-teal-400 mb-4">Enum Methods and Behavior</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Enums can contain methods, implement interfaces, and provide rich behavior:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-teal-300">Instance Methods:</strong> Methods that operate on enum constants</li>
                          <li>• <strong className="text-teal-300">Static Methods:</strong> Utility methods for enum operations</li>
                          <li>• <strong className="text-teal-300">Abstract Methods:</strong> Each constant must implement</li>
                          <li>• <strong className="text-teal-300">Interface Implementation:</strong> Enums can implement interfaces</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-teal-400 mb-6">Advanced Enum Concepts</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-teal-400 mb-4">Enum Design Patterns</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Common patterns for using enums in software design:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-teal-300 font-bold mb-2">State Machine</h4>
                            <p className="text-sm text-gray-300 mb-2">Model state transitions</p>
                            <code className="text-xs text-gray-400">enum OrderState &#123; PENDING, PROCESSING, SHIPPED, DELIVERED &#125;</code>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-teal-300 font-bold mb-2">Strategy Pattern</h4>
                            <p className="text-sm text-gray-300 mb-2">Encapsulate algorithms</p>
                            <code className="text-xs text-gray-400">enum PaymentMethod &#123; CREDIT_CARD, PAYPAL, BANK_TRANSFER &#125;</code>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-teal-300 font-bold mb-2">Factory Pattern</h4>
                            <p className="text-sm text-gray-300 mb-2">Create objects based on type</p>
                            <code className="text-xs text-gray-400">enum VehicleType &#123; CAR, TRUCK, MOTORCYCLE &#125;</code>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-teal-300 font-bold mb-2">Singleton Pattern</h4>
                            <p className="text-sm text-gray-300 mb-2">Ensure single instance</p>
                            <code className="text-xs text-gray-400">enum DatabaseConnection &#123; SINGLETON &#125;</code>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-teal-400 mb-4">Enum Performance and Memory</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding enum performance characteristics is important for optimization:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-teal-300 font-bold mb-2">Memory Efficiency</h4>
                            <p className="text-sm text-gray-300 mb-2">Single instance per constant</p>
                            <p className="text-xs text-gray-400">No object creation overhead</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-teal-300 font-bold mb-2">Switch Performance</h4>
                            <p className="text-sm text-gray-300 mb-2">Optimized switch statements</p>
                            <p className="text-xs text-gray-400">Jump table optimization</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-teal-300 font-bold mb-2">Thread Safety</h4>
                            <p className="text-sm text-gray-300 mb-2">Immutable by default</p>
                            <p className="text-xs text-gray-400">Safe for concurrent access</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-teal-400 mb-4">Comprehensive Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`// Basic enum example
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;
    
    public boolean isWeekend() {
        return this == SATURDAY || this == SUNDAY;
    }
    
    public boolean isWeekday() {
        return !isWeekend();
    }
}

// Enum with fields and constructor
enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6),
    JUPITER(1.9e+27, 7.1492e7),
    SATURN(5.688e+26, 6.0268e7),
    URANUS(8.686e+25, 2.5559e7),
    NEPTUNE(1.024e+26, 2.4746e7);
    
    private final double mass;   // in kilograms
    private final double radius; // in meters
    
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }
    
    public double getMass() { return mass; }
    public double getRadius() { return radius; }
    
    // Universal gravitational constant (m3 kg-1 s-2)
    public static final double G = 6.67300E-11;
    
    public double surfaceGravity() {
        return G * mass / (radius * radius);
    }
    
    public double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}

// Enum with abstract methods
enum Operation {
    PLUS("+") {
        public double apply(double x, double y) { return x + y; }
    },
    MINUS("-") {
        public double apply(double x, double y) { return x - y; }
    },
    TIMES("*") {
        public double apply(double x, double y) { return x * y; }
    },
    DIVIDE("/") {
        public double apply(double x, double y) { return x / y; }
    };
    
    private final String symbol;
    
    Operation(String symbol) {
        this.symbol = symbol;
    }
    
    public abstract double apply(double x, double y);
    
    @Override
    public String toString() {
        return symbol;
    }
}

// Enum implementing interface
interface Describable {
    String getDescription();
}

enum Color implements Describable {
    RED("Red", "A warm color"),
    GREEN("Green", "A natural color"),
    BLUE("Blue", "A cool color"),
    YELLOW("Yellow", "A bright color"),
    ORANGE("Orange", "A vibrant color"),
    PURPLE("Purple", "A royal color");
    
    private final String name;
    private final String description;
    
    Color(String name, String description) {
        this.name = name;
        this.description = description;
    }
    
    @Override
    public String getDescription() {
        return description;
    }
    
    public String getName() {
        return name;
    }
    
    public boolean isPrimary() {
        return this == RED || this == GREEN || this == BLUE;
    }
    
    public boolean isSecondary() {
        return this == YELLOW || this == ORANGE || this == PURPLE;
    }
}

// Enum with state machine behavior
enum OrderStatus {
    PENDING {
        @Override
        public OrderStatus next() { return PROCESSING; }
        
        @Override
        public boolean canCancel() { return true; }
    },
    PROCESSING {
        @Override
        public OrderStatus next() { return SHIPPED; }
        
        @Override
        public boolean canCancel() { return false; }
    },
    SHIPPED {
        @Override
        public OrderStatus next() { return DELIVERED; }
        
        @Override
        public boolean canCancel() { return false; }
    },
    DELIVERED {
        @Override
        public OrderStatus next() { return this; } // Final state
        
        @Override
        public boolean canCancel() { return false; }
    },
    CANCELLED {
        @Override
        public OrderStatus next() { return this; } // Final state
        
        @Override
        public boolean canCancel() { return false; }
    };
    
    public abstract OrderStatus next();
    public abstract boolean canCancel();
    
    public boolean isFinal() {
        return this == DELIVERED || this == CANCELLED;
    }
}

// Enum with singleton pattern
enum DatabaseConnection {
    INSTANCE;
    
    private boolean connected = false;
    
    public void connect() {
        if (!connected) {
            System.out.println("Connecting to database...");
            connected = true;
        }
    }
    
    public void disconnect() {
        if (connected) {
            System.out.println("Disconnecting from database...");
            connected = false;
        }
    }
    
    public boolean isConnected() {
        return connected;
    }
}

// Usage examples
public class EnumDemo {
    public static void main(String[] args) {
        // Basic enum usage
        Day today = Day.MONDAY;
        System.out.println("Today is: " + today);
        System.out.println("Is weekend? " + today.isWeekend());
        
        // Enum with fields
        Planet earth = Planet.EARTH;
        double weight = earth.surfaceWeight(70); // 70 kg person
        System.out.println("Weight on Earth: " + weight + " N");
        
        // Enum with operations
        double result = Operation.PLUS.apply(5, 3);
        System.out.println("5 + 3 = " + result);
        
        // Enum with interface
        Color red = Color.RED;
        System.out.println(red.getName() + ": " + red.getDescription());
        System.out.println("Is primary color? " + red.isPrimary());
        
        // State machine
        OrderStatus status = OrderStatus.PENDING;
        System.out.println("Current status: " + status);
        System.out.println("Can cancel? " + status.canCancel());
        
        status = status.next();
        System.out.println("Next status: " + status);
        
        // Singleton enum
        DatabaseConnection db = DatabaseConnection.INSTANCE;
        db.connect();
        System.out.println("Connected: " + db.isConnected());
        
        // Switch with enum
        switch (today) {
            case MONDAY:
                System.out.println("Start of work week");
                break;
            case FRIDAY:
                System.out.println("TGIF!");
                break;
            case SATURDAY:
            case SUNDAY:
                System.out.println("Weekend!");
                break;
            default:
                System.out.println("Mid-week");
        }
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-teal-400 mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use enums for fixed sets of related constants</li>
                      <li>• Add meaningful methods to enums</li>
                      <li>• Use enums in switch statements</li>
                      <li>• Consider enum-based state machines</li>
                      <li>• Use enums for singleton pattern</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-teal-400 mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Using strings instead of enums</li>
                      <li>• Not handling all enum values in switch</li>
                      <li>• Modifying enum constants at runtime</li>
                      <li>• Not using enum methods effectively</li>
                      <li>• Ignoring enum performance benefits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'java-keywords':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="java-keywords" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔑 Java Keywords
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master essential Java keywords and their usage in programming
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* static keyword */}
                <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">static Keyword</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The <code className="text-green-400">static</code> keyword is used to create class-level variables and methods 
                    that belong to the class rather than to any specific instance.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Static Variables and Methods</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`public class Counter {
    // Static variable - shared across all instances
    private static int count = 0;
    
    // Instance variable - unique to each instance
    private String name;
    
    public Counter(String name) {
        this.name = name;
        count++; // Increment static counter
    }
    
    // Static method - can be called without creating an instance
    public static int getCount() {
        return count;
    }
    
    // Static method to reset counter
    public static void resetCount() {
        count = 0;
    }
    
    // Instance method
    public String getName() {
        return name;
    }
}

// Usage
public class StaticDemo {
    public static void main(String[] args) {
        System.out.println("Initial count: " + Counter.getCount()); // 0
        
        Counter c1 = new Counter("First");
        Counter c2 = new Counter("Second");
        Counter c3 = new Counter("Third");
        
        System.out.println("Count after creating objects: " + Counter.getCount()); // 3
        
        // Static methods can be called on class name
        Counter.resetCount();
        System.out.println("Count after reset: " + Counter.getCount()); // 0
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Static Variables</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Shared among all instances</li>
                        <li>• Initialized when class is first loaded</li>
                        <li>• Accessed using class name</li>
                        <li>• Memory efficient</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Static Methods</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Cannot access instance variables</li>
                        <li>• Cannot use <code className="text-red-400">this</code> or <code className="text-red-400">super</code></li>
                        <li>• Called without creating objects</li>
                        <li>• Utility methods</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* final keyword */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">final Keyword</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The <code className="text-green-400">final</code> keyword is used to create constants, 
                    prevent method overriding, and stop inheritance.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Final Variables, Methods, and Classes</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`public class FinalDemo {
    // Final variable - constant
    private static final double PI = 3.14159;
    private static final String COMPANY_NAME = "TechCorp";
    
    // Final instance variable - must be initialized in constructor
    private final int id;
    
    public FinalDemo(int id) {
        this.id = id; // Must initialize final variable
    }
    
    // Final method - cannot be overridden
    public final void displayInfo() {
        System.out.println("ID: " + id + ", Company: " + COMPANY_NAME);
    }
    
    // Regular method
    public void calculateArea(double radius) {
        double area = PI * radius * radius;
        System.out.println("Area: " + area);
    }
}

// Final class - cannot be extended
public final class UtilityClass {
    public static void printMessage() {
        System.out.println("This is a utility class");
    }
}

// This would cause compilation error:
// public class ExtendedUtility extends UtilityClass { }

// Usage
public class FinalUsage {
    public static void main(String[] args) {
        FinalDemo demo = new FinalDemo(123);
        demo.displayInfo();
        demo.calculateArea(5.0);
        
        UtilityClass.printMessage();
        
        // Final variables cannot be reassigned
        // FinalDemo.PI = 3.14; // Compilation error
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Final Variables</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Cannot be reassigned</li>
                        <li>• Must be initialized</li>
                        <li>• Constants</li>
                        <li>• Thread-safe</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Final Methods</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Cannot be overridden</li>
                        <li>• Performance optimization</li>
                        <li>• Security</li>
                        <li>• API stability</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">Final Classes</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Cannot be extended</li>
                        <li>• Immutable classes</li>
                        <li>• Security</li>
                        <li>• Performance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* super keyword */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">super Keyword</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The <code className="text-green-400">super</code> keyword is used to refer to the immediate parent class 
                    and access its methods, variables, and constructors.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Using super in Inheritance</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`// Parent class
class Vehicle {
    protected String brand;
    protected int year;
    
    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
        System.out.println("Vehicle constructor called");
    }
    
    public void start() {
        System.out.println("Vehicle is starting...");
    }
    
    public void displayInfo() {
        System.out.println("Brand: " + brand + ", Year: " + year);
    }
}

// Child class
class Car extends Vehicle {
    private int doors;
    
    public Car(String brand, int year, int doors) {
        // Call parent constructor using super
        super(brand, year);
        this.doors = doors;
        System.out.println("Car constructor called");
    }
    
    @Override
    public void start() {
        // Call parent method using super
        super.start();
        System.out.println("Car is starting with " + doors + " doors");
    }
    
    @Override
    public void displayInfo() {
        // Call parent method and add more info
        super.displayInfo();
        System.out.println("Doors: " + doors);
    }
    
    public void honk() {
        System.out.println("Beep beep!");
    }
}

// Usage
public class SuperDemo {
    public static void main(String[] args) {
        Car myCar = new Car("Toyota", 2023, 4);
        myCar.displayInfo();
        myCar.start();
        myCar.honk();
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">super() Constructor</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Calls parent constructor</li>
                        <li>• Must be first statement</li>
                        <li>• Implicit if not specified</li>
                        <li>• Parameter matching</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">super.method()</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Calls parent method</li>
                        <li>• Method overriding</li>
                        <li>• Access parent functionality</li>
                        <li>• Polymorphism</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* this keyword */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">this Keyword</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The <code className="text-green-400">this</code> keyword refers to the current object and is used 
                    to distinguish between instance variables and parameters.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Using this in Classes</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`public class Person {
    private String name;
    private int age;
    
    // Constructor with this keyword
    public Person(String name, int age) {
        this.name = name;  // this.name refers to instance variable
        this.age = age;    // this.age refers to instance variable
    }
    
    // Method with this keyword
    public void setName(String name) {
        this.name = name;  // Distinguish between parameter and instance variable
    }
    
    // Method chaining using this
    public Person setAge(int age) {
        this.age = age;
        return this;  // Return current object for method chaining
    }
    
    // Method that returns this for chaining
    public Person displayInfo() {
        System.out.println("Name: " + this.name + ", Age: " + this.age);
        return this;
    }
    
    // Method passing this as parameter
    public void compareWith(Person other) {
        if (this.age > other.age) {
            System.out.println(this.name + " is older than " + other.name);
        } else if (this.age < other.age) {
            System.out.println(this.name + " is younger than " + other.name);
        } else {
            System.out.println(this.name + " and " + other.name + " are the same age");
        }
    }
}

// Usage
public class ThisDemo {
    public static void main(String[] args) {
        Person person1 = new Person("Alice", 25);
        Person person2 = new Person("Bob", 30);
        
        // Method chaining using this
        person1.setAge(26).displayInfo();
        
        // Comparing objects using this
        person1.compareWith(person2);
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">this for Variables</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Distinguish instance variables</li>
                        <li>• Avoid naming conflicts</li>
                        <li>• Clear code intent</li>
                        <li>• Parameter vs field</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">this for Methods</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Method chaining</li>
                        <li>• Return current object</li>
                        <li>• Fluent interface</li>
                        <li>• Builder pattern</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'strings-handling':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="strings-handling" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📝 Strings & String Handling
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master string manipulation, StringBuilder, StringBuffer, and common string operations
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* String Basics */}
                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">String Class Fundamentals</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Strings in Java are immutable objects that represent a sequence of characters. 
                    Understanding string handling is crucial for effective Java programming.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">String Creation and Basic Operations</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`public class StringBasics {
    public static void main(String[] args) {
        // String creation methods
        String str1 = "Hello World";                    // String literal
        String str2 = new String("Hello World");       // Using constructor
        String str3 = String.valueOf(123);             // Converting number to string
        String str4 = String.format("Name: %s, Age: %d", "Alice", 25);
        
        // String immutability demonstration
        String original = "Hello";
        String modified = original.concat(" World");
        System.out.println("Original: " + original);    // Still "Hello"
        System.out.println("Modified: " + modified);    // "Hello World"
        
        // String comparison
        String a = "Hello";
        String b = "Hello";
        String c = new String("Hello");
        
        System.out.println(a == b);                    // true (same reference)
        System.out.println(a == c);                     // false (different references)
        System.out.println(a.equals(c));                // true (same content)
        System.out.println(a.equalsIgnoreCase("HELLO")); // true
        
        // String length and character access
        String text = "Java Programming";
        System.out.println("Length: " + text.length()); // 16
        System.out.println("First char: " + text.charAt(0)); // 'J'
        System.out.println("Last char: " + text.charAt(text.length() - 1)); // 'g'
        
        // String searching
        System.out.println("Contains 'Java': " + text.contains("Java")); // true
        System.out.println("Starts with 'Java': " + text.startsWith("Java")); // true
        System.out.println("Ends with 'ing': " + text.endsWith("ing")); // true
        System.out.println("Index of 'Pro': " + text.indexOf("Pro")); // 5
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">String Creation</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• String literals (pooled)</li>
                        <li>• new String() constructor</li>
                        <li>• String.valueOf() method</li>
                        <li>• String.format() method</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">String Immutability</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Cannot be changed after creation</li>
                        <li>• Operations return new strings</li>
                        <li>• Thread-safe by default</li>
                        <li>• Memory efficient</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* String Methods */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Common String Methods</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    The String class provides numerous methods for manipulation, searching, and formatting.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">String Manipulation Methods</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`public class StringMethods {
    public static void main(String[] args) {
        String text = "  Java Programming Language  ";
        
        // Trimming whitespace
        String trimmed = text.trim();
        System.out.println("Trimmed: '" + trimmed + "'");
        
        // Case conversion
        String upper = text.toUpperCase();
        String lower = text.toLowerCase();
        System.out.println("Upper: " + upper);
        System.out.println("Lower: " + lower);
        
        // Substring operations
        String substring1 = text.substring(5);           // From index 5 to end
        String substring2 = text.substring(5, 15);       // From index 5 to 15
        System.out.println("Substring 1: " + substring1);
        System.out.println("Substring 2: " + substring2);
        
        // String replacement
        String replaced = text.replace("Java", "Python");
        String replacedAll = text.replaceAll("\\s+", "-"); // Replace spaces with dashes
        System.out.println("Replaced: " + replaced);
        System.out.println("Replaced All: " + replacedAll);
        
        // String splitting
        String csv = "apple,banana,orange,grape";
        String[] fruits = csv.split(",");
        System.out.println("Split fruits:");
        for (String fruit : fruits) {
            System.out.println("- " + fruit.trim());
        }
        
        // String joining (Java 8+)
        String joined = String.join(" | ", fruits);
        System.out.println("Joined: " + joined);
        
        // String formatting
        String name = "Alice";
        int age = 30;
        double salary = 75000.50;
        String formatted = String.format("Name: %s, Age: %d, Salary: $%.2f", name, age, salary);
        System.out.println("Formatted: " + formatted);
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Search Methods</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">indexOf()</code> - Find first occurrence</li>
                        <li>• <code className="text-white">lastIndexOf()</code> - Find last occurrence</li>
                        <li>• <code className="text-white">contains()</code> - Check if contains</li>
                        <li>• <code className="text-white">startsWith()</code> - Check prefix</li>
                        <li>• <code className="text-white">endsWith()</code> - Check suffix</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Modification Methods</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">substring()</code> - Extract substring</li>
                        <li>• <code className="text-white">replace()</code> - Replace characters</li>
                        <li>• <code className="text-white">trim()</code> - Remove whitespace</li>
                        <li>• <code className="text-white">toUpperCase()</code> - Convert to uppercase</li>
                        <li>• <code className="text-white">toLowerCase()</code> - Convert to lowercase</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">Utility Methods</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">split()</code> - Split into array</li>
                        <li>• <code className="text-white">join()</code> - Join array elements</li>
                        <li>• <code className="text-white">format()</code> - Format string</li>
                        <li>• <code className="text-white">valueOf()</code> - Convert to string</li>
                        <li>• <code className="text-white">isEmpty()</code> - Check if empty</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* StringBuilder */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">StringBuilder Class</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    StringBuilder is a mutable sequence of characters, perfect for efficient string concatenation 
                    and manipulation when you need to modify strings frequently.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">StringBuilder Operations</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`public class StringBuilderDemo {
    public static void main(String[] args) {
        // Creating StringBuilder
        StringBuilder sb = new StringBuilder();
        StringBuilder sb2 = new StringBuilder("Hello");
        StringBuilder sb3 = new StringBuilder(50); // Initial capacity
        
        // Appending content
        sb.append("Java");
        sb.append(" Programming");
        sb.append(" Language");
        System.out.println("After append: " + sb.toString());
        
        // Inserting at specific position
        sb.insert(4, " is a ");
        System.out.println("After insert: " + sb.toString());
        
        // Deleting characters
        sb.delete(0, 5); // Delete from index 0 to 5
        System.out.println("After delete: " + sb.toString());
        
        // Replacing characters
        sb.replace(0, 1, "J"); // Replace character at index 0
        System.out.println("After replace: " + sb.toString());
        
        // Reversing string
        sb.reverse();
        System.out.println("After reverse: " + sb.toString());
        
        // Capacity and length
        System.out.println("Length: " + sb.length());
        System.out.println("Capacity: " + sb.capacity());
        
        // Setting length
        sb.setLength(10);
        System.out.println("After setLength: " + sb.toString());
        
        // Performance comparison
        long start = System.currentTimeMillis();
        StringBuilder performance = new StringBuilder();
        for (int i = 0; i < 10000; i++) {
            performance.append("Number: ").append(i).append(" ");
        }
        long end = System.currentTimeMillis();
        System.out.println("StringBuilder time: " + (end - start) + "ms");
        
        // Convert to String
        String result = performance.toString();
        System.out.println("Final string length: " + result.length());
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">StringBuilder Advantages</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Mutable - can be modified</li>
                        <li>• Efficient concatenation</li>
                        <li>• Better performance</li>
                        <li>• Memory efficient</li>
                        <li>• Thread-safe (not synchronized)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Common Methods</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">append()</code> - Add to end</li>
                        <li>• <code className="text-white">insert()</code> - Insert at position</li>
                        <li>• <code className="text-white">delete()</code> - Remove characters</li>
                        <li>• <code className="text-white">replace()</code> - Replace characters</li>
                        <li>• <code className="text-white">reverse()</code> - Reverse string</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* StringBuffer */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">StringBuffer Class</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    StringBuffer is similar to StringBuilder but is thread-safe (synchronized). 
                    Use it when you need thread safety in multi-threaded environments.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">StringBuffer vs StringBuilder</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`public class StringBufferDemo {
    public static void main(String[] args) {
        // StringBuffer is thread-safe
        StringBuffer sb = new StringBuffer("Thread-Safe");
        
        // Same methods as StringBuilder
        sb.append(" String");
        sb.insert(11, " Buffer ");
        System.out.println("StringBuffer: " + sb.toString());
        
        // Performance comparison
        int iterations = 100000;
        
        // StringBuilder performance
        long start1 = System.currentTimeMillis();
        StringBuilder sb1 = new StringBuilder();
        for (int i = 0; i < iterations; i++) {
            sb1.append("test");
        }
        long end1 = System.currentTimeMillis();
        System.out.println("StringBuilder time: " + (end1 - start1) + "ms");
        
        // StringBuffer performance
        long start2 = System.currentTimeMillis();
        StringBuffer sb2 = new StringBuffer();
        for (int i = 0; i < iterations; i++) {
            sb2.append("test");
        }
        long end2 = System.currentTimeMillis();
        System.out.println("StringBuffer time: " + (end2 - start2) + "ms");
        
        // When to use which?
        System.out.println("\\nUse StringBuilder for:");
        System.out.println("- Single-threaded applications");
        System.out.println("- Better performance");
        System.out.println("- Less memory overhead");
        
        System.out.println("\\nUse StringBuffer for:");
        System.out.println("- Multi-threaded applications");
        System.out.println("- Thread safety required");
        System.out.println("- Shared mutable state");
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">StringBuffer Features</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Thread-safe (synchronized)</li>
                        <li>• Mutable sequence</li>
                        <li>• Slower than StringBuilder</li>
                        <li>• Memory overhead for synchronization</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">When to Use</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Multi-threaded environments</li>
                        <li>• Shared mutable state</li>
                        <li>• Thread safety is critical</li>
                        <li>• Performance is less important</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'arrays-collections':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="arrays-collections" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📊 Arrays & Collections
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master Java arrays and the Collections Framework for efficient data management
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* Arrays */}
                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">Java Arrays</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Arrays are fixed-size data structures that store elements of the same type. 
                    They provide fast access to elements using index-based addressing.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Array Creation and Operations</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`public class ArrayBasics {
    public static void main(String[] args) {
        // Array declaration and initialization
        int[] numbers = {1, 2, 3, 4, 5};
        String[] names = new String[3];
        names[0] = "Alice";
        names[1] = "Bob";
        names[2] = "Charlie";
        
        // Array length and access
        System.out.println("Array length: " + numbers.length);
        System.out.println("First element: " + numbers[0]);
        System.out.println("Last element: " + numbers[numbers.length - 1]);
        
        // Array iteration
        System.out.println("\\nNumbers array:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Index " + i + ": " + numbers[i]);
        }
        
        // Enhanced for loop
        System.out.println("\\nNames array:");
        for (String name : names) {
            System.out.println("Name: " + name);
        }
        
        // Array copying
        int[] original = {1, 2, 3, 4, 5};
        int[] copy = new int[original.length];
        System.arraycopy(original, 0, copy, 0, original.length);
        
        // Using Arrays.copyOf (Java 6+)
        int[] copy2 = Arrays.copyOf(original, original.length);
        
        // Array sorting
        int[] unsorted = {5, 2, 8, 1, 9};
        Arrays.sort(unsorted);
        System.out.println("\\nSorted array: " + Arrays.toString(unsorted));
        
        // Binary search (array must be sorted)
        int index = Arrays.binarySearch(unsorted, 5);
        System.out.println("Index of 5: " + index);
        
        // Multi-dimensional arrays
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("\\nMatrix:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Array Characteristics</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Fixed size at creation</li>
                        <li>• Same data type elements</li>
                        <li>• Index-based access</li>
                        <li>• Contiguous memory</li>
                        <li>• Fast random access</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Common Operations</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">length</code> - Get array size</li>
                        <li>• <code className="text-white">Arrays.sort()</code> - Sort array</li>
                        <li>• <code className="text-white">Arrays.binarySearch()</code> - Search</li>
                        <li>• <code className="text-white">Arrays.copyOf()</code> - Copy array</li>
                        <li>• <code className="text-white">Arrays.toString()</code> - String representation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ArrayList */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">ArrayList Class</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    ArrayList is a resizable array implementation of the List interface. 
                    It provides dynamic sizing and many useful methods for list manipulation.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">ArrayList Operations</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`import java.util.ArrayList;
import java.util.Collections;

public class ArrayListDemo {
    public static void main(String[] args) {
        // Creating ArrayList
        ArrayList<String> fruits = new ArrayList<>();
        ArrayList<Integer> numbers = new ArrayList<>(10); // Initial capacity
        
        // Adding elements
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add(1, "Grape"); // Insert at specific index
        
        // Adding multiple elements
        Collections.addAll(fruits, "Mango", "Pineapple");
        
        // Accessing elements
        System.out.println("First fruit: " + fruits.get(0));
        System.out.println("Last fruit: " + fruits.get(fruits.size() - 1));
        
        // Checking if element exists
        System.out.println("Contains Apple: " + fruits.contains("Apple"));
        System.out.println("Index of Banana: " + fruits.indexOf("Banana"));
        
        // Modifying elements
        fruits.set(0, "Green Apple");
        System.out.println("Modified first fruit: " + fruits.get(0));
        
        // Removing elements
        fruits.remove("Orange"); // Remove by value
        fruits.remove(0); // Remove by index
        
        // List iteration
        System.out.println("\\nAll fruits:");
        for (String fruit : fruits) {
            System.out.println("- " + fruit);
        }
        
        // Using forEach with lambda (Java 8+)
        System.out.println("\\nFruits with forEach:");
        fruits.forEach(fruit -> System.out.println("Fruit: " + fruit));
        
        // Sorting
        Collections.sort(fruits);
        System.out.println("\\nSorted fruits: " + fruits);
        
        // Reversing
        Collections.reverse(fruits);
        System.out.println("Reversed fruits: " + fruits);
        
        // Sublist
        ArrayList<String> subList = new ArrayList<>(fruits.subList(0, 2));
        System.out.println("Sublist: " + subList);
        
        // Converting to array
        String[] fruitArray = fruits.toArray(new String[0]);
        System.out.println("Array: " + Arrays.toString(fruitArray));
        
        // Performance demonstration
        ArrayList<Integer> performanceList = new ArrayList<>();
        long start = System.currentTimeMillis();
        
        for (int i = 0; i < 100000; i++) {
            performanceList.add(i);
        }
        
        long end = System.currentTimeMillis();
        System.out.println("\\nTime to add 100,000 elements: " + (end - start) + "ms");
        System.out.println("Final size: " + performanceList.size());
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">ArrayList Advantages</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Dynamic resizing</li>
                        <li>• Random access</li>
                        <li>• Rich API</li>
                        <li>• Generic type support</li>
                        <li>• Iterator support</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Common Methods</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">add()</code> - Add element</li>
                        <li>• <code className="text-white">get()</code> - Get element</li>
                        <li>• <code className="text-white">set()</code> - Set element</li>
                        <li>• <code className="text-white">remove()</code> - Remove element</li>
                        <li>• <code className="text-white">size()</code> - Get size</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* HashMap */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">HashMap Class</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    HashMap is a hash table implementation of the Map interface. 
                    It provides fast key-value pair storage and retrieval.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">HashMap Operations</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class HashMapDemo {
    public static void main(String[] args) {
        // Creating HashMap
        HashMap<String, Integer> ages = new HashMap<>();
        HashMap<String, String> capitals = new HashMap<>(10); // Initial capacity
        
        // Adding key-value pairs
        ages.put("Alice", 25);
        ages.put("Bob", 30);
        ages.put("Charlie", 35);
        ages.put("Diana", 28);
        
        // Accessing values
        System.out.println("Alice's age: " + ages.get("Alice"));
        System.out.println("Bob's age: " + ages.get("Bob"));
        
        // Checking if key exists
        System.out.println("Contains Alice: " + ages.containsKey("Alice"));
        System.out.println("Contains age 25: " + ages.containsValue(25));
        
        // Updating values
        ages.put("Alice", 26); // Update existing key
        System.out.println("Updated Alice's age: " + ages.get("Alice"));
        
        // Removing entries
        Integer removedAge = ages.remove("Charlie");
        System.out.println("Removed Charlie's age: " + removedAge);
        
        // Getting all keys
        Set<String> names = ages.keySet();
        System.out.println("All names: " + names);
        
        // Getting all values
        System.out.println("All ages: " + ages.values());
        
        // Iterating through HashMap
        System.out.println("\\nAll entries:");
        for (Map.Entry<String, Integer> entry : ages.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Using forEach with lambda
        System.out.println("\\nUsing forEach:");
        ages.forEach((name, age) -> System.out.println(name + " is " + age + " years old"));
        
        // HashMap with custom objects as values
        HashMap<String, Person> people = new HashMap<>();
        people.put("employee1", new Person("Alice", 25, "Engineer"));
        people.put("employee2", new Person("Bob", 30, "Manager"));
        
        Person alice = people.get("employee1");
        System.out.println("\\nEmployee 1: " + alice.getName() + " - " + alice.getJob());
        
        // Nested HashMap
        HashMap<String, HashMap<String, String>> departments = new HashMap<>();
        HashMap<String, String> engineering = new HashMap<>();
        engineering.put("Manager", "John");
        engineering.put("Lead", "Sarah");
        departments.put("Engineering", engineering);
        
        System.out.println("\\nEngineering Manager: " + 
            departments.get("Engineering").get("Manager"));
        
        // Performance demonstration
        HashMap<Integer, String> performanceMap = new HashMap<>();
        long start = System.currentTimeMillis();
        
        for (int i = 0; i < 100000; i++) {
            performanceMap.put(i, "Value" + i);
        }
        
        long end = System.currentTimeMillis();
        System.out.println("\\nTime to add 100,000 entries: " + (end - start) + "ms");
        System.out.println("Final size: " + performanceMap.size());
    }
    
    static class Person {
        private String name;
        private int age;
        private String job;
        
        public Person(String name, int age, String job) {
            this.name = name;
            this.age = age;
            this.job = job;
        }
        
        public String getName() { return name; }
        public int getAge() { return age; }
        public String getJob() { return job; }
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">HashMap Features</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Key-value pairs</li>
                        <li>• Fast lookup O(1)</li>
                        <li>• No duplicate keys</li>
                        <li>• Null keys and values allowed</li>
                        <li>• Not thread-safe</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Common Methods</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">put()</code> - Add/update entry</li>
                        <li>• <code className="text-white">get()</code> - Get value</li>
                        <li>• <code className="text-white">remove()</code> - Remove entry</li>
                        <li>• <code className="text-white">containsKey()</code> - Check key</li>
                        <li>• <code className="text-white">keySet()</code> - Get all keys</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* HashSet */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">HashSet Class</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    HashSet is a hash table implementation of the Set interface. 
                    It stores unique elements and provides fast membership testing.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">HashSet Operations</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

public class HashSetDemo {
    public static void main(String[] args) {
        // Creating HashSet
        HashSet<String> uniqueNames = new HashSet<>();
        HashSet<Integer> numbers = new HashSet<>(10); // Initial capacity
        
        // Adding elements
        uniqueNames.add("Alice");
        uniqueNames.add("Bob");
        uniqueNames.add("Charlie");
        uniqueNames.add("Alice"); // Duplicate - will be ignored
        
        System.out.println("Unique names: " + uniqueNames);
        System.out.println("Size: " + uniqueNames.size());
        
        // Checking membership
        System.out.println("Contains Alice: " + uniqueNames.contains("Alice"));
        System.out.println("Contains David: " + uniqueNames.contains("David"));
        
        // Removing elements
        boolean removed = uniqueNames.remove("Bob");
        System.out.println("Removed Bob: " + removed);
        System.out.println("After removal: " + uniqueNames);
        
        // Set operations
        HashSet<String> set1 = new HashSet<>();
        set1.add("A");
        set1.add("B");
        set1.add("C");
        
        HashSet<String> set2 = new HashSet<>();
        set2.add("B");
        set2.add("C");
        set2.add("D");
        
        // Union
        HashSet<String> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("\\nSet1: " + set1);
        System.out.println("Set2: " + set2);
        System.out.println("Union: " + union);
        
        // Intersection
        HashSet<String> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        System.out.println("Intersection: " + intersection);
        
        // Difference
        HashSet<String> difference = new HashSet<>(set1);
        difference.removeAll(set2);
        System.out.println("Difference (set1 - set2): " + difference);
        
        // Converting to TreeSet for sorted order
        TreeSet<String> sortedSet = new TreeSet<>(uniqueNames);
        System.out.println("\\nSorted set: " + sortedSet);
        
        // Iterating through HashSet
        System.out.println("\\nIterating through HashSet:");
        for (String name : uniqueNames) {
            System.out.println("- " + name);
        }
        
        // Using forEach with lambda
        System.out.println("\\nUsing forEach:");
        uniqueNames.forEach(name -> System.out.println("Name: " + name));
        
        // Performance demonstration
        HashSet<Integer> performanceSet = new HashSet<>();
        long start = System.currentTimeMillis();
        
        for (int i = 0; i < 100000; i++) {
            performanceSet.add(i);
        }
        
        long end = System.currentTimeMillis();
        System.out.println("\\nTime to add 100,000 elements: " + (end - start) + "ms");
        System.out.println("Final size: " + performanceSet.size());
        
        // Checking for duplicates in array
        int[] arrayWithDuplicates = {1, 2, 3, 2, 4, 5, 1, 6};
        HashSet<Integer> seen = new HashSet<>();
        HashSet<Integer> duplicates = new HashSet<>();
        
        for (int num : arrayWithDuplicates) {
            if (!seen.add(num)) { // add() returns false if element already exists
                duplicates.add(num);
            }
        }
        
        System.out.println("\\nOriginal array: " + Arrays.toString(arrayWithDuplicates));
        System.out.println("Duplicates found: " + duplicates);
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">HashSet Features</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Unique elements only</li>
                        <li>• Fast membership testing</li>
                        <li>• No order guarantee</li>
                        <li>• Null elements allowed</li>
                        <li>• Hash-based storage</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Use Cases</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Removing duplicates</li>
                        <li>• Fast lookups</li>
                        <li>• Set operations</li>
                        <li>• Membership testing</li>
                        <li>• Unique collections</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'exception-handling':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="exception-handling" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ⚠️ Exception Handling
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master Java exception handling with try-catch, finally, and custom exceptions
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* Exception Basics */}
                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-red-400 mb-6">Exception Handling Fundamentals</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Exception handling in Java allows you to gracefully handle runtime errors and unexpected conditions. 
                    It prevents your program from crashing and provides meaningful error messages.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Try-Catch-Finally Blocks</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`public class ExceptionBasics {
    public static void main(String[] args) {
        // Basic try-catch
        try {
            int result = divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Try-catch-finally
        try {
            String text = null;
            int length = text.length();
        } catch (NullPointerException e) {
            System.out.println("Null pointer exception: " + e.getMessage());
        } finally {
            System.out.println("Finally block always executes");
        }
        
        // Multiple catch blocks
        try {
            int[] numbers = {1, 2, 3};
            System.out.println(numbers[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("General exception: " + e.getMessage());
        }
    }
    
    public static int divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero");
        }
        return a / b;
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Exception Types</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong>Checked Exceptions:</strong> Must be handled</li>
                        <li>• <strong>Unchecked Exceptions:</strong> Runtime exceptions</li>
                        <li>• <strong>Errors:</strong> Serious system problems</li>
                        <li>• <strong>Custom Exceptions:</strong> User-defined</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Exception Hierarchy</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">Throwable</code> - Root class</li>
                        <li>• <code className="text-white">Exception</code> - Checked exceptions</li>
                        <li>• <code className="text-white">RuntimeException</code> - Unchecked</li>
                        <li>• <code className="text-white">Error</code> - System errors</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Custom Exceptions */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Custom Exceptions</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Create your own exception classes to handle specific business logic errors and provide meaningful error messages.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Creating and Using Custom Exceptions</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`// Custom checked exception
class InsufficientFundsException extends Exception {
    private double amount;
    
    public InsufficientFundsException(double amount) {
        super("Insufficient funds. Required: $" + amount);
        this.amount = amount;
    }
    
    public double getAmount() {
        return amount;
    }
}

// Custom unchecked exception
class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(String message) {
        super(message);
    }
}

// Business logic class
class BankAccount {
    private double balance;
    private String accountNumber;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
        System.out.println("Withdrawn: $" + amount + ". New balance: $" + balance);
    }
    
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        balance += amount;
        System.out.println("Deposited: $" + amount + ". New balance: $" + balance);
    }
    
    public double getBalance() {
        return balance;
    }
}

// Person class with age validation
class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        if (age < 0 || age > 150) {
            throw new InvalidAgeException("Age must be between 0 and 150");
        }
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
}

// Usage example
public class CustomExceptionDemo {
    public static void main(String[] args) {
        // Using custom checked exception
        BankAccount account = new BankAccount("12345", 1000.0);
        
        try {
            account.withdraw(500.0);  // Should work
            account.withdraw(800.0);  // Should throw exception
        } catch (InsufficientFundsException e) {
            System.out.println("Bank error: " + e.getMessage());
            System.out.println("Shortfall: $" + e.getAmount());
        }
        
        // Using custom unchecked exception
        try {
            Person person1 = new Person("Alice", 25);  // Should work
            Person person2 = new Person("Bob", -5);   // Should throw exception
        } catch (InvalidAgeException e) {
            System.out.println("Person error: " + e.getMessage());
        }
        
        // Using IllegalArgumentException
        try {
            account.deposit(-100.0);  // Should throw exception
        } catch (IllegalArgumentException e) {
            System.out.println("Deposit error: " + e.getMessage());
        }
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Custom Exception Benefits</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Specific error handling</li>
                        <li>• Better error messages</li>
                        <li>• Business logic validation</li>
                        <li>• Code maintainability</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Best Practices</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Extend appropriate base class</li>
                        <li>• Provide meaningful messages</li>
                        <li>• Include relevant data</li>
                        <li>• Document exceptions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Try-with-Resources */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">Try-with-Resources</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Try-with-resources automatically manages resource cleanup, ensuring that resources are properly closed even if exceptions occur.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Automatic Resource Management</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`import java.io.*;
import java.util.Scanner;

public class TryWithResourcesDemo {
    public static void main(String[] args) {
        // Traditional try-catch-finally (manual resource management)
        FileInputStream fis = null;
        try {
            fis = new FileInputStream("input.txt");
            int data = fis.read();
            System.out.println("Data: " + data);
        } catch (IOException e) {
            System.out.println("IO Error: " + e.getMessage());
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    System.out.println("Error closing file: " + e.getMessage());
                }
            }
        }
        
        // Try-with-resources (automatic resource management)
        try (FileInputStream fis2 = new FileInputStream("input.txt");
             FileOutputStream fos = new FileOutputStream("output.txt")) {
            
            int data;
            while ((data = fis2.read()) != -1) {
                fos.write(data);
            }
            System.out.println("File copied successfully");
            
        } catch (IOException e) {
            System.out.println("IO Error: " + e.getMessage());
        }
        // Resources are automatically closed here
        
        // Using Scanner with try-with-resources
        try (Scanner scanner = new Scanner(new File("data.txt"))) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                System.out.println("Line: " + line);
            }
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        }
        
        // Custom resource class
        try (MyResource resource = new MyResource()) {
            resource.doSomething();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

// Custom resource class implementing AutoCloseable
class MyResource implements AutoCloseable {
    public void doSomething() {
        System.out.println("Doing something with resource");
    }
    
    @Override
    public void close() throws Exception {
        System.out.println("Resource is being closed");
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Try-with-Resources Benefits</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Automatic resource cleanup</li>
                        <li>• Cleaner code</li>
                        <li>• Prevents resource leaks</li>
                        <li>• Exception suppression</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Requirements</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Implement <code className="text-white">AutoCloseable</code></li>
                        <li>• Resources declared in try</li>
                        <li>• Automatic close() call</li>
                        <li>• Java 7+ feature</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'packages-modules':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="packages-modules" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📦 Packages & Modules
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Organize Java code with packages and explore the Java Platform Module System
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* Packages */}
                <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Java Packages</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Packages in Java provide a way to organize related classes and interfaces into namespaces. 
                    They help avoid naming conflicts and make code more maintainable.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Creating and Using Packages</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`// Package declaration (must be first line)
package com.example.banking;

// Import statements
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;

// Import with alias
import java.util.HashMap;
import java.util.Map;

// Static import
import static java.lang.Math.PI;
import static java.lang.Math.pow;

// Banking package classes
public class BankAccount {
    private String accountNumber;
    private double balance;
    private Date createdDate;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.createdDate = new Date();
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
    
    public double getBalance() {
        return balance;
    }
    
    public String getAccountInfo() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return String.format("Account: %s, Balance: $%.2f, Created: %s", 
                           accountNumber, balance, sdf.format(createdDate));
    }
}

// Another class in the same package
class Transaction {
    private String transactionId;
    private double amount;
    private String type;
    private Date timestamp;
    
    public Transaction(String transactionId, double amount, String type) {
        this.transactionId = transactionId;
        this.amount = amount;
        this.type = type;
        this.timestamp = new Date();
    }
    
    public String getTransactionInfo() {
        return String.format("Transaction %s: %s $%.2f at %s", 
                           transactionId, type, amount, timestamp);
    }
}

// Using the package
// Main.java (in different package)
package com.example.app;

import com.example.banking.BankAccount;
import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // Create bank account
        BankAccount account = new BankAccount("12345", 1000.0);
        
        // Perform transactions
        account.deposit(500.0);
        account.withdraw(200.0);
        
        // Display account info
        System.out.println(account.getAccountInfo());
        
        // Using static imports
        double circleArea = PI * pow(5, 2);
        System.out.println("Circle area: " + circleArea);
        
        // Using collections
        List<String> transactions = new ArrayList<>();
        transactions.add("Deposit: $500.00");
        transactions.add("Withdrawal: $200.00");
        
        for (String transaction : transactions) {
            System.out.println(transaction);
        }
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Package Benefits</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Namespace organization</li>
                        <li>• Avoid naming conflicts</li>
                        <li>• Access control</li>
                        <li>• Code reusability</li>
                        <li>• Logical grouping</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Package Naming</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Reverse domain name</li>
                        <li>• Lowercase letters</li>
                        <li>• Use dots for hierarchy</li>
                        <li>• Avoid reserved words</li>
                        <li>• Descriptive names</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Access Modifiers */}
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">Access Modifiers</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Access modifiers control the visibility and accessibility of classes, methods, and variables in Java.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Access Modifier Examples</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`package com.example.access;

// Public class - accessible from anywhere
public class PublicClass {
    // Public variable - accessible from anywhere
    public String publicVar = "Public Variable";
    
    // Private variable - accessible only within this class
    private String privateVar = "Private Variable";
    
    // Protected variable - accessible within package and subclasses
    protected String protectedVar = "Protected Variable";
    
    // Package-private (default) variable - accessible within package
    String packageVar = "Package Variable";
    
    // Public method - accessible from anywhere
    public void publicMethod() {
        System.out.println("Public method called");
    }
    
    // Private method - accessible only within this class
    private void privateMethod() {
        System.out.println("Private method called");
    }
    
    // Protected method - accessible within package and subclasses
    protected void protectedMethod() {
        System.out.println("Protected method called");
    }
    
    // Package-private method - accessible within package
    void packageMethod() {
        System.out.println("Package method called");
    }
}

// Package-private class - accessible within package
class PackageClass {
    public void method() {
        System.out.println("Package class method");
    }
}

// Protected class (not allowed - classes can only be public or package-private)
// protected class ProtectedClass { }

// Private class (not allowed - classes can only be public or package-private)
// private class PrivateClass { }

// Example of inheritance and access
class ChildClass extends PublicClass {
    public void testAccess() {
        // Can access public and protected members
        System.out.println(publicVar);        // OK
        System.out.println(protectedVar);     // OK
        System.out.println(packageVar);       // OK (same package)
        // System.out.println(privateVar);    // Error - private
        
        publicMethod();        // OK
        protectedMethod();     // OK
        packageMethod();       // OK (same package)
        // privateMethod();    // Error - private
    }
}

// Usage example
public class AccessDemo {
    public static void main(String[] args) {
        PublicClass obj = new PublicClass();
        
        // Can access public members
        System.out.println(obj.publicVar);
        obj.publicMethod();
        
        // Cannot access private members
        // System.out.println(obj.privateVar);    // Error
        // obj.privateMethod();                   // Error
        
        // Cannot access protected members from outside
        // System.out.println(obj.protectedVar);  // Error
        // obj.protectedMethod();                 // Error
        
        // Can access package-private members (same package)
        System.out.println(obj.packageVar);
        obj.packageMethod();
        
        // Test inheritance
        ChildClass child = new ChildClass();
        child.testAccess();
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">public</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Accessible everywhere</li>
                        <li>• No restrictions</li>
                        <li>• Most permissive</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-white mb-3">protected</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Same package</li>
                        <li>• Subclasses</li>
                        <li>• Inheritance access</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">default</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Same package only</li>
                        <li>• No keyword needed</li>
                        <li>• Package-private</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-red-400 mb-3">private</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Same class only</li>
                        <li>• Most restrictive</li>
                        <li>• Encapsulation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Java Modules */}
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">Java Platform Module System (JPMS)</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Java 9 introduced the module system to provide better encapsulation and dependency management at the application level.
                  </p>
                  
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Creating and Using Modules</h3>
                    <pre className="text-green-400 font-mono text-sm">
{`// module-info.java (in src/com.example.banking/module-info.java)
module com.example.banking {
    // Export packages to other modules
    exports com.example.banking;
    exports com.example.banking.model;
    
    // Require other modules
    requires java.base;
    requires java.logging;
    
    // Require transitive (re-export to dependent modules)
    requires transitive java.sql;
    
    // Provide service implementations
    provides com.example.banking.service.BankService 
        with com.example.banking.service.BankServiceImpl;
    
    // Use services
    uses com.example.banking.service.BankService;
}

// Banking module classes
package com.example.banking.model;

public class Account {
    private String accountNumber;
    private double balance;
    
    public Account(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    
    // Getters and setters
    public String getAccountNumber() { return accountNumber; }
    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
}

// Service interface
package com.example.banking.service;

import com.example.banking.model.Account;

public interface BankService {
    void deposit(Account account, double amount);
    void withdraw(Account account, double amount);
    double getBalance(Account account);
}

// Service implementation
package com.example.banking.service;

import com.example.banking.model.Account;

public class BankServiceImpl implements BankService {
    @Override
    public void deposit(Account account, double amount) {
        if (amount > 0) {
            account.setBalance(account.getBalance() + amount);
        }
    }
    
    @Override
    public void withdraw(Account account, double amount) {
        if (amount > 0 && amount <= account.getBalance()) {
            account.setBalance(account.getBalance() - amount);
        }
    }
    
    @Override
    public double getBalance(Account account) {
        return account.getBalance();
    }
}

// Client module
// module-info.java (in src/com.example.app/module-info.java)
module com.example.app {
    requires com.example.banking;
    requires java.base;
}

// Main application
package com.example.app;

import com.example.banking.model.Account;
import com.example.banking.service.BankService;
import java.util.ServiceLoader;

public class Main {
    public static void main(String[] args) {
        // Create account
        Account account = new Account("12345", 1000.0);
        
        // Load service using ServiceLoader
        ServiceLoader<BankService> serviceLoader = ServiceLoader.load(BankService.class);
        BankService bankService = serviceLoader.findFirst().orElse(null);
        
        if (bankService != null) {
            bankService.deposit(account, 500.0);
            bankService.withdraw(account, 200.0);
            System.out.println("Balance: $" + bankService.getBalance(account));
        }
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-green-400 mb-3">Module Benefits</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Strong encapsulation</li>
                        <li>• Explicit dependencies</li>
                        <li>• Smaller runtime</li>
                        <li>• Better security</li>
                        <li>• Service provider pattern</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Module Keywords</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <code className="text-white">module</code> - Define module</li>
                        <li>• <code className="text-white">exports</code> - Export packages</li>
                        <li>• <code className="text-white">requires</code> - Require modules</li>
                        <li>• <code className="text-white">provides</code> - Provide services</li>
                        <li>• <code className="text-white">uses</code> - Use services</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'threads':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="threads" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🧵 Java Multithreading
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Concurrent programming, thread synchronization, and parallel execution</p>
              
              <div className="max-w-6xl mx-auto">
                {/* What is Multithreading */}
                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-blue-400 mb-6">🧵 What is Multithreading?</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">Definition</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        <strong className="text-blue-400">Multithreading</strong> is a Java feature that allows concurrent execution of two or more parts of a program for maximum utilization of CPU. Each part of such a program is called a thread. So, threads are light-weight processes within a process.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Multithreading enables you to write very efficient programs that make maximum use of the CPU, because idle time can be kept to a minimum. This is especially important for interactive, network, and real-time applications.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">Key Concepts</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">🧵 Thread</h4>
                            <p className="text-gray-300 text-sm">A thread is a lightweight sub-process, the smallest unit of processing</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">⚡ Concurrent Execution</h4>
                            <p className="text-gray-300 text-sm">Multiple threads can run simultaneously within a single process</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">🔄 Process</h4>
                            <p className="text-gray-300 text-sm">A process is an instance of a program in execution</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">🎯 Parallelism</h4>
                            <p className="text-gray-300 text-sm">Multiple threads can execute different parts of code simultaneously</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thread Creation */}
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">🚀 Thread Creation</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">Methods to Create Threads</h3>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">1. Extending Thread Class</h4>
                          <div className="bg-gray-700 p-4 rounded-lg">
                            <pre className="text-sm text-gray-300 overflow-x-auto">
{`class MyThread extends Thread {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Thread: " + Thread.currentThread().getName() + " - " + i);
            try {
                Thread.sleep(1000); // Sleep for 1 second
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted");
            }
        }
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread();
        MyThread thread2 = new MyThread();
        
        thread1.start(); // Start first thread
        thread2.start(); // Start second thread
    }
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">2. Implementing Runnable Interface</h4>
                          <div className="bg-gray-700 p-4 rounded-lg">
                            <pre className="text-sm text-gray-300 overflow-x-auto">
{`class MyRunnable implements Runnable {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Runnable: " + Thread.currentThread().getName() + " - " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted");
            }
        }
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        MyRunnable runnable = new MyRunnable();
        Thread thread1 = new Thread(runnable);
        Thread thread2 = new Thread(runnable);
        
        thread1.start();
        thread2.start();
    }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thread States */}
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">🔄 Thread States</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-purple-400 mb-4">Thread Lifecycle</h3>
                      <p className="text-gray-300 mb-4">A thread in Java can be in one of the following states:</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-purple-500/30">
                          <h4 className="text-lg font-bold text-purple-300 mb-2">🆕 NEW</h4>
                          <p className="text-sm text-gray-300">Thread has been created but not yet started</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-purple-500/30">
                          <h4 className="text-lg font-bold text-purple-300 mb-2">🏃 RUNNABLE</h4>
                          <p className="text-sm text-gray-300">Thread is executing or ready to execute</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-purple-500/30">
                          <h4 className="text-lg font-bold text-purple-300 mb-2">⏸️ BLOCKED</h4>
                          <p className="text-sm text-gray-300">Thread is waiting for a monitor lock</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-purple-500/30">
                          <h4 className="text-lg font-bold text-purple-300 mb-2">⏳ WAITING</h4>
                          <p className="text-sm text-gray-300">Thread is waiting indefinitely for another thread</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-purple-500/30">
                          <h4 className="text-lg font-bold text-purple-300 mb-2">⏰ TIMED_WAITING</h4>
                          <p className="text-sm text-gray-300">Thread is waiting for a specified time</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-purple-500/30">
                          <h4 className="text-lg font-bold text-purple-300 mb-2">🏁 TERMINATED</h4>
                          <p className="text-sm text-gray-300">Thread has completed execution</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Synchronization */}
                <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">🔒 Synchronization</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-yellow-400 mb-4">What is Synchronization?</h3>
                      <p className="text-gray-300 mb-4">
                        <strong className="text-yellow-400">Synchronization</strong> in Java is the capability to control the access of multiple threads to any shared resource. It prevents thread interference and consistency problems.
                      </p>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500/30">
                          <h4 className="text-xl font-bold text-yellow-300 mb-4">Synchronized Method</h4>
                          <div className="bg-gray-700 p-4 rounded-lg">
                            <pre className="text-sm text-gray-300 overflow-x-auto">
{`class Counter {
    private int count = 0;
    
    // Synchronized method
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
}

class IncrementThread extends Thread {
    private Counter counter;
    
    public IncrementThread(Counter counter) {
        this.counter = counter;
    }
    
    public void run() {
        for (int i = 0; i < 1000; i++) {
            counter.increment();
        }
    }
}

public class SynchronizationExample {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        
        IncrementThread thread1 = new IncrementThread(counter);
        IncrementThread thread2 = new IncrementThread(counter);
        
        thread1.start();
        thread2.start();
        
        thread1.join();
        thread2.join();
        
        System.out.println("Final count: " + counter.getCount());
    }
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500/30">
                          <h4 className="text-xl font-bold text-yellow-300 mb-4">Synchronized Block</h4>
                          <div className="bg-gray-700 p-4 rounded-lg">
                            <pre className="text-sm text-gray-300 overflow-x-auto">
{`class BankAccount {
    private double balance;
    
    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }
    
    public void deposit(double amount) {
        synchronized(this) { // Synchronized block
            double newBalance = balance + amount;
            balance = newBalance;
        }
    }
    
    public void withdraw(double amount) {
        synchronized(this) { // Synchronized block
            if (balance >= amount) {
                balance -= amount;
            }
        }
    }
    
    public double getBalance() {
        synchronized(this) {
            return balance;
        }
    }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thread Communication */}
                <div className="bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-red-400 mb-6">💬 Thread Communication</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-red-400 mb-4">wait(), notify(), and notifyAll()</h3>
                      <p className="text-gray-300 mb-4">
                        These methods are used for inter-thread communication in Java. They are part of the Object class and must be called from within a synchronized context.
                      </p>
                      
                      <div className="bg-gray-800 p-6 rounded-lg border border-red-500/30">
                        <h4 className="text-xl font-bold text-red-300 mb-4">Producer-Consumer Example</h4>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
{`import java.util.LinkedList;
import java.util.Queue;

class MessageQueue {
    private Queue<String> messages = new LinkedList<>();
    private int capacity;
    
    public MessageQueue(int capacity) {
        this.capacity = capacity;
    }
    
    public synchronized void put(String message) throws InterruptedException {
        while (messages.size() == capacity) {
            wait(); // Wait if queue is full
        }
        messages.add(message);
        notifyAll(); // Notify waiting threads
    }
    
    public synchronized String take() throws InterruptedException {
        while (messages.isEmpty()) {
            wait(); // Wait if queue is empty
        }
        String message = messages.poll();
        notifyAll(); // Notify waiting threads
        return message;
    }
}

class Producer extends Thread {
    private MessageQueue queue;
    
    public Producer(MessageQueue queue) {
        this.queue = queue;
    }
    
    public void run() {
        for (int i = 1; i <= 5; i++) {
            try {
                queue.put("Message " + i);
                System.out.println("Produced: Message " + i);
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

class Consumer extends Thread {
    private MessageQueue queue;
    
    public Consumer(MessageQueue queue) {
        this.queue = queue;
    }
    
    public void run() {
        for (int i = 1; i <= 5; i++) {
            try {
                String message = queue.take();
                System.out.println("Consumed: " + message);
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class ProducerConsumerExample {
    public static void main(String[] args) {
        MessageQueue queue = new MessageQueue(3);
        
        Producer producer = new Producer(queue);
        Consumer consumer = new Consumer(queue);
        
        producer.start();
        consumer.start();
    }
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thread Pool */}
                <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-indigo-400 mb-6">🏊 Thread Pool</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-indigo-400 mb-4">Executor Framework</h3>
                      <p className="text-gray-300 mb-4">
                        The Executor framework provides a higher-level replacement for working directly with threads. It manages thread creation, lifecycle, and execution.
                      </p>
                      
                      <div className="bg-gray-800 p-6 rounded-lg border border-indigo-500/30">
                        <h4 className="text-xl font-bold text-indigo-300 mb-4">ThreadPoolExecutor Example</h4>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
{`import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

class Task implements Runnable {
    private int taskId;
    
    public Task(int taskId) {
        this.taskId = taskId;
    }
    
    public void run() {
        System.out.println("Task " + taskId + " is running on thread: " + 
                          Thread.currentThread().getName());
        try {
            Thread.sleep(2000); // Simulate work
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Task " + taskId + " completed");
    }
}

public class ThreadPoolExample {
    public static void main(String[] args) {
        // Create a thread pool with 3 threads
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // Submit tasks to the thread pool
        for (int i = 1; i <= 5; i++) {
            executor.submit(new Task(i));
        }
        
        // Shutdown the executor
        executor.shutdown();
        
        try {
            // Wait for all tasks to complete
            if (!executor.awaitTermination(10, TimeUnit.SECONDS)) {
                executor.shutdownNow();
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
        }
    }
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gradient-to-r from-teal-600/10 to-green-600/10 border border-teal-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-teal-400 mb-6">⭐ Multithreading Best Practices</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-teal-400 mb-4">Guidelines for Safe Multithreading</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                          <h4 className="text-lg font-bold text-teal-300 mb-2">1. Use Synchronization Properly</h4>
                          <p className="text-sm text-gray-300">Always synchronize access to shared resources to prevent race conditions</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                          <h4 className="text-lg font-bold text-teal-300 mb-2">2. Avoid Deadlocks</h4>
                          <p className="text-sm text-gray-300">Be careful with multiple locks and always acquire them in the same order</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                          <h4 className="text-lg font-bold text-teal-300 mb-2">3. Use Thread-Safe Collections</h4>
                          <p className="text-sm text-gray-300">Use ConcurrentHashMap, CopyOnWriteArrayList, etc., for thread-safe operations</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                          <h4 className="text-lg font-bold text-teal-300 mb-2">4. Handle InterruptedException</h4>
                          <p className="text-sm text-gray-300">Always handle InterruptedException properly in your thread code</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                          <h4 className="text-lg font-bold text-teal-300 mb-2">5. Use Executor Framework</h4>
                          <p className="text-sm text-gray-300">Prefer ExecutorService over manual thread management for better control</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'lambda':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="lambda" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ⚡ Java 8 Features
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Lambda expressions, Stream API, Optional, and modern Java features</p>
              
              <div className="max-w-6xl mx-auto">
                {/* Lambda Expressions */}
                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-blue-400 mb-6">⚡ Lambda Expressions</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">What are Lambda Expressions?</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        <strong className="text-blue-400">Lambda expressions</strong> are a new feature introduced in Java 8 that allows you to treat functionality as a method argument, or code as data. They provide a clear and concise way to represent one method interface using an expression.
                      </p>
                      
                      <div className="bg-gray-800 p-6 rounded-lg border border-blue-500/30">
                        <h4 className="text-xl font-bold text-blue-300 mb-4">Basic Lambda Syntax</h4>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Traditional way
Runnable r1 = new Runnable() {
    public void run() {
        System.out.println("Hello World!");
    }
};

// Lambda expression
Runnable r2 = () -> System.out.println("Hello World!");

// Lambda with parameters
MathOperation addition = (int a, int b) -> a + b;

// Lambda with single parameter (parentheses optional)
GreetingService greetService1 = message -> System.out.println("Hello " + message);

// Lambda with multiple statements
GreetingService greetService2 = (message) -> {
    System.out.println("Hello " + message);
    System.out.println("Welcome to Java 8!");
};`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stream API */}
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">🌊 Stream API</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">What is Stream API?</h3>
                      <p className="text-gray-300 mb-4">
                        The <strong className="text-green-400">Stream API</strong> is used to process collections of objects. A stream is a sequence of objects that supports various methods which can be pipelined to produce the desired result.
                      </p>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">Basic Stream Operations</h4>
                          <div className="bg-gray-700 p-4 rounded-lg">
                            <pre className="text-sm text-gray-300 overflow-x-auto">
{`import java.util.*;
import java.util.stream.*;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");
        
        // Filter names starting with 'A' and convert to uppercase
        List<String> result = names.stream()
            .filter(name -> name.startsWith("A"))
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        
        System.out.println(result); // [ALICE]
        
        // Count names with length > 3
        long count = names.stream()
            .filter(name -> name.length() > 3)
            .count();
        
        System.out.println("Names with length > 3: " + count);
        
        // Find first name starting with 'B'
        Optional<String> firstB = names.stream()
            .filter(name -> name.startsWith("B"))
            .findFirst();
        
        firstB.ifPresent(System.out::println); // Bob
    }
}`}
                        </pre>
                      </div>
                    </div>

                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">Advanced Stream Operations</h4>
                          <div className="bg-gray-700 p-4 rounded-lg">
                            <pre className="text-sm text-gray-300 overflow-x-auto">
{`import java.util.*;
import java.util.stream.*;

public class AdvancedStreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Sum of even numbers
        int sum = numbers.stream()
            .filter(n -> n % 2 == 0)
            .mapToInt(Integer::intValue)
            .sum();
        
        System.out.println("Sum of even numbers: " + sum);
        
        // Group by even/odd
        Map<Boolean, List<Integer>> grouped = numbers.stream()
            .collect(Collectors.groupingBy(n -> n % 2 == 0));
        
        System.out.println("Grouped: " + grouped);
        
        // Find max and min
        Optional<Integer> max = numbers.stream().max(Integer::compareTo);
        Optional<Integer> min = numbers.stream().min(Integer::compareTo);
        
        System.out.println("Max: " + max.get() + ", Min: " + min.get());
        
        // Reduce operation
        int product = numbers.stream()
            .reduce(1, (a, b) -> a * b);
        
        System.out.println("Product: " + product);
    }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional Class */}
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">📦 Optional Class</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-purple-400 mb-4">What is Optional?</h3>
                      <p className="text-gray-300 mb-4">
                        <strong className="text-purple-400">Optional</strong> is a container object which may or may not contain a non-null value. It helps avoid NullPointerException and makes the code more readable.
                      </p>
                      
                      <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/30">
                        <h4 className="text-xl font-bold text-purple-300 mb-4">Optional Examples</h4>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
{`import java.util.*;

public class OptionalExample {
    public static void main(String[] args) {
        // Creating Optional
        Optional<String> empty = Optional.empty();
        Optional<String> nonEmpty = Optional.of("Hello");
        Optional<String> nullable = Optional.ofNullable(null);
        
        // Check if value is present
        if (nonEmpty.isPresent()) {
            System.out.println("Value: " + nonEmpty.get());
        }
        
        // Default value if empty
        String result = empty.orElse("Default Value");
        System.out.println("Result: " + result);
        
        // Lambda with Optional
        nonEmpty.ifPresent(value -> System.out.println("Value is: " + value));
        
        // Filter and map
        Optional<String> filtered = nonEmpty
            .filter(s -> s.length() > 3)
            .map(String::toUpperCase);
        
        filtered.ifPresent(System.out::println);
        
        // Chaining operations
        Optional<String> chained = Optional.of("  hello  ")
            .map(String::trim)
            .filter(s -> s.length() > 0)
            .map(String::toUpperCase);
        
        chained.ifPresent(System.out::println);
    }
}`}
                            </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Method References */}
                <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">🔗 Method References</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-yellow-400 mb-4">Types of Method References</h3>
                      <p className="text-gray-300 mb-4">
                        Method references provide a way to refer to methods without executing them. They are a shorthand notation for lambda expressions.
                      </p>
                      
                      <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500/30">
                        <h4 className="text-xl font-bold text-yellow-300 mb-4">Method Reference Examples</h4>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
{`import java.util.*;
import java.util.stream.*;

public class MethodReferenceExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        
        // 1. Static method reference
        names.stream()
            .map(String::toUpperCase)  // Equivalent to: s -> s.toUpperCase()
            .forEach(System.out::println);
        
        // 2. Instance method reference
        names.stream()
            .map(String::length)  // Equivalent to: s -> s.length()
            .forEach(System.out::println);
        
        // 3. Constructor reference
        List<String> upperNames = names.stream()
            .map(String::new)  // Equivalent to: s -> new String(s)
            .collect(Collectors.toList());
        
        // 4. Arbitrary object method reference
        List<String> words = Arrays.asList("hello", "world", "java");
        words.stream()
            .map(String::toUpperCase)
            .forEach(System.out::println);
        
        // 5. Custom method reference
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        numbers.stream()
            .map(MethodReferenceExample::square)
            .forEach(System.out::println);
    }
    
    public static int square(int n) {
        return n * n;
    }
}`}
                            </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Default Methods */}
                <div className="bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-red-400 mb-6">🔧 Default Methods</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-red-400 mb-4">Interface Default Methods</h3>
                      <p className="text-gray-300 mb-4">
                        <strong className="text-red-400">Default methods</strong> allow you to add new methods to interfaces without breaking the existing implementations.
                      </p>
                      
                      <div className="bg-gray-800 p-6 rounded-lg border border-red-500/30">
                        <h4 className="text-xl font-bold text-red-300 mb-4">Default Method Example</h4>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
{`interface Calculator {
    int add(int a, int b);
    
    // Default method
    default int multiply(int a, int b) {
        return a * b;
    }
    
    // Static method
    static int subtract(int a, int b) {
        return a - b;
    }
}

class BasicCalculator implements Calculator {
    @Override
    public int add(int a, int b) {
        return a + b;
    }
    
    // Can override default method
    @Override
    public int multiply(int a, int b) {
        System.out.println("Custom multiplication");
        return a * b;
    }
}

public class DefaultMethodExample {
    public static void main(String[] args) {
        BasicCalculator calc = new BasicCalculator();
        
        System.out.println("Addition: " + calc.add(5, 3));
        System.out.println("Multiplication: " + calc.multiply(5, 3));
        System.out.println("Subtraction: " + Calculator.subtract(5, 3));
    }
}`}
                        </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Functional Interfaces */}
                <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-indigo-400 mb-6">🎯 Functional Interfaces</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-indigo-400 mb-4">Built-in Functional Interfaces</h3>
                      <p className="text-gray-300 mb-4">
                        Java 8 provides several built-in functional interfaces in the <code className="text-indigo-400">java.util.function</code> package.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                          <h4 className="text-lg font-bold text-indigo-300 mb-2">Predicate&lt;T&gt;</h4>
                          <p className="text-sm text-gray-300">Represents a boolean-valued function of one argument</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                          <h4 className="text-lg font-bold text-indigo-300 mb-2">Function&lt;T,R&gt;</h4>
                          <p className="text-sm text-gray-300">Represents a function that accepts one argument and produces a result</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                          <h4 className="text-lg font-bold text-indigo-300 mb-2">Consumer&lt;T&gt;</h4>
                          <p className="text-sm text-gray-300">Represents an operation that accepts a single input argument and returns no result</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                          <h4 className="text-lg font-bold text-indigo-300 mb-2">Supplier&lt;T&gt;</h4>
                          <p className="text-sm text-gray-300">Represents a supplier of results</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'memory':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="memory" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🧠 Java Memory Management
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Garbage collection, memory allocation, and JVM memory model</p>
              
              <div className="max-w-6xl mx-auto">
                {/* Memory Overview */}
                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-blue-400 mb-6">🧠 Java Memory Model</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">Memory Areas in JVM</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        The Java Virtual Machine (JVM) divides memory into several areas, each serving specific purposes in the execution of Java programs. Understanding these memory areas is crucial for writing efficient and scalable Java applications.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">🏠 Heap Memory</h4>
                            <p className="text-sm text-gray-300">Stores all objects and instance variables. Divided into Young Generation and Old Generation.</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">📚 Method Area</h4>
                            <p className="text-sm text-gray-300">Stores class-level data, static variables, and method bytecode.</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">📋 Stack Memory</h4>
                            <p className="text-sm text-gray-300">Stores method calls, local variables, and method parameters.</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">💾 PC Register</h4>
                            <p className="text-sm text-gray-300">Stores the address of the currently executing instruction.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Garbage Collection */}
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">🗑️ Garbage Collection</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">What is Garbage Collection?</h3>
                      <p className="text-gray-300 mb-4">
                        <strong className="text-green-400">Garbage Collection (GC)</strong> is the automatic memory management process in Java. It automatically reclaims memory occupied by objects that are no longer referenced by the program, preventing memory leaks and manual memory management errors.
                      </p>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">GC Generations</h4>
                          <div className="bg-gray-700 p-4 rounded-lg">
                            <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Young Generation (Eden, Survivor Spaces)
// - New objects are allocated here
// - Short-lived objects are collected frequently
// - Uses Copying GC algorithm

// Old Generation (Tenured Space)
// - Long-lived objects are promoted here
// - Collected less frequently
// - Uses Mark-Sweep-Compact algorithm

// Permanent Generation (Java 8 and earlier)
// - Stores class metadata
// - Replaced by Metaspace in Java 8+

public class MemoryExample {
    public static void main(String[] args) {
        // Objects created in Young Generation
        String str1 = new String("Hello");
        String str2 = new String("World");
        
        // After some time, long-lived objects
        // are promoted to Old Generation
        
        // When objects become unreachable,
        // they become eligible for garbage collection
        str1 = null; // str1 is now eligible for GC
        str2 = null; // str2 is now eligible for GC
        
        // GC will automatically reclaim this memory
    }
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">GC Types</h4>
                          <div className="space-y-4">
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h5 className="text-lg font-bold text-green-300 mb-2">Serial GC</h5>
                              <p className="text-sm text-gray-300">Single-threaded, suitable for small applications and client-side programs.</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h5 className="text-lg font-bold text-green-300 mb-2">Parallel GC</h5>
                              <p className="text-sm text-gray-300">Multi-threaded, default for server applications, good throughput.</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h5 className="text-lg font-bold text-green-300 mb-2">G1 GC</h5>
                              <p className="text-sm text-gray-300">Low-latency collector, suitable for large heap sizes.</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h5 className="text-lg font-bold text-green-300 mb-2">ZGC</h5>
                              <p className="text-sm text-gray-300">Ultra-low latency collector, experimental in Java 11+.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Memory Leaks */}
                <div className="bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-red-400 mb-6">⚠️ Memory Leaks</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-red-400 mb-4">Common Memory Leak Causes</h3>
                      <p className="text-gray-300 mb-4">
                        Even with automatic garbage collection, Java applications can still suffer from memory leaks. These occur when objects are no longer needed but are still referenced, preventing GC from reclaiming their memory.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
                          <h4 className="text-lg font-bold text-red-300 mb-2">1. Static References</h4>
                          <p className="text-sm text-gray-300">Static variables hold references to objects, preventing GC</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
                          <h4 className="text-lg font-bold text-red-300 mb-2">2. Unclosed Resources</h4>
                          <p className="text-sm text-gray-300">Files, streams, and database connections not properly closed</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
                          <h4 className="text-lg font-bold text-red-300 mb-2">3. Listener References</h4>
                          <p className="text-sm text-gray-300">Event listeners not removed from collections</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
                          <h4 className="text-lg font-bold text-red-300 mb-2">4. Thread Local Variables</h4>
                          <p className="text-sm text-gray-300">ThreadLocal variables not cleaned up properly</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-red-400 mb-4">Memory Leak Prevention</h3>
                      <div className="bg-gray-800 p-6 rounded-lg border border-red-500/30">
                        <h4 className="text-xl font-bold text-red-300 mb-4">Best Practices</h4>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
{`// 1. Use try-with-resources for automatic resource management
try (FileInputStream fis = new FileInputStream("file.txt");
     BufferedReader reader = new BufferedReader(new InputStreamReader(fis))) {
    // Process file
} // Resources automatically closed

// 2. Remove listeners when no longer needed
button.removeActionListener(listener);

// 3. Clear collections when done
list.clear();
map.clear();

// 4. Use WeakReference for cache-like structures
Map<String, WeakReference<Object>> cache = new HashMap<>();

// 5. Avoid static collections that grow indefinitely
// Instead use bounded collections or periodic cleanup

// 6. Use profiling tools to detect leaks
// - VisualVM
// - JProfiler
// - Eclipse MAT
// - JConsole`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Memory Optimization */}
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">⚡ Memory Optimization</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-purple-400 mb-4">Optimization Techniques</h3>
                      <p className="text-gray-300 mb-4">
                        Effective memory optimization involves understanding object lifecycle, choosing appropriate data structures, and implementing efficient algorithms.
                      </p>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/30">
                          <h4 className="text-xl font-bold text-purple-300 mb-4">Object Pooling</h4>
                          <div className="bg-gray-700 p-4 rounded-lg">
                            <pre className="text-sm text-gray-300 overflow-x-auto">
{`import java.util.concurrent.ConcurrentLinkedQueue;

public class ObjectPool<T> {
    private final ConcurrentLinkedQueue<T> pool = new ConcurrentLinkedQueue<>();
    private final java.util.function.Supplier<T> factory;
    
    public ObjectPool(java.util.function.Supplier<T> factory) {
        this.factory = factory;
    }
    
    public T borrow() {
        T object = pool.poll();
        if (object == null) {
            object = factory.get();
        }
        return object;
    }
    
    public void returnObject(T object) {
        if (object != null) {
            pool.offer(object);
        }
    }
}

// Usage for expensive objects
ObjectPool<StringBuilder> stringBuilderPool = 
    new ObjectPool<>(StringBuilder::new);

StringBuilder sb = stringBuilderPool.borrow();
sb.append("Hello World");
String result = sb.toString();
sb.setLength(0); // Reset for reuse
stringBuilderPool.returnObject(sb);`}
                            </pre>
                          </div>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/30">
                          <h4 className="text-xl font-bold text-purple-300 mb-4">Memory-Efficient Data Structures</h4>
                          <div className="space-y-4">
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h5 className="text-lg font-bold text-purple-300 mb-2">Use Primitive Arrays</h5>
                              <p className="text-sm text-gray-300">int[] instead of Integer[] for better memory usage</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h5 className="text-lg font-bold text-purple-300 mb-2">StringBuilder for Concatenation</h5>
                              <p className="text-sm text-gray-300">Avoid string concatenation in loops</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h5 className="text-lg font-bold text-purple-300 mb-2">Appropriate Collection Sizes</h5>
                              <p className="text-sm text-gray-300">Initialize collections with expected capacity</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* JVM Tuning */}
                <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">⚙️ JVM Tuning</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-yellow-400 mb-4">Common JVM Parameters</h3>
                      <p className="text-gray-300 mb-4">
                        JVM tuning involves configuring various parameters to optimize memory usage and garbage collection performance for your specific application needs.
                      </p>
                      
                      <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500/30">
                        <h4 className="text-xl font-bold text-yellow-300 mb-4">Memory Configuration</h4>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
{`# Heap Memory Settings
-Xms2g                    # Initial heap size
-Xmx4g                    # Maximum heap size
-XX:NewRatio=2            # Ratio of old to young generation

# Garbage Collection Settings
-XX:+UseG1GC              # Use G1 garbage collector
-XX:MaxGCPauseMillis=200  # Target max GC pause time
-XX:G1HeapRegionSize=16m  # G1 region size

# GC Logging
-XX:+PrintGC              # Print GC information
-XX:+PrintGCDetails       # Detailed GC information
-Xloggc:gc.log            # Log GC to file

# Memory Analysis
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/tmp/heapdump.hprof

# Example JVM startup command
java -Xms2g -Xmx4g -XX:+UseG1GC -XX:MaxGCPauseMillis=200 
     -XX:+PrintGC -XX:+HeapDumpOnOutOfMemoryError 
     -jar MyApplication.jar`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monitoring Tools */}
                <div className="bg-gradient-to-r from-teal-600/10 to-green-600/10 border border-teal-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-teal-400 mb-6">📊 Memory Monitoring Tools</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-teal-400 mb-4">Essential Monitoring Tools</h3>
                      <p className="text-gray-300 mb-4">
                        Proper monitoring and profiling are essential for understanding memory usage patterns and identifying optimization opportunities.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                            <h4 className="text-lg font-bold text-teal-300 mb-2">🔧 JConsole</h4>
                            <p className="text-sm text-gray-300">Built-in JMX monitoring tool for basic memory and GC monitoring</p>
                          </div>
                          
                          <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                            <h4 className="text-lg font-bold text-teal-300 mb-2">📈 VisualVM</h4>
                            <p className="text-sm text-gray-300">Advanced profiling tool with heap dump analysis</p>
                          </div>
                          
                          <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                            <h4 className="text-lg font-bold text-teal-300 mb-2">🔍 Eclipse MAT</h4>
                            <p className="text-sm text-gray-300">Memory Analyzer Tool for detailed heap analysis</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                            <h4 className="text-lg font-bold text-teal-300 mb-2">⚡ JProfiler</h4>
                            <p className="text-sm text-gray-300">Commercial profiler with advanced memory analysis</p>
                          </div>
                          
                          <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                            <h4 className="text-lg font-bold text-teal-300 mb-2">📊 JMC</h4>
                            <p className="text-sm text-gray-300">Java Mission Control for production monitoring</p>
                          </div>
                          
                          <div className="bg-gray-800 p-4 rounded-lg border border-teal-500/30">
                            <h4 className="text-lg font-bold text-teal-300 mb-2">🐳 JStack</h4>
                            <p className="text-sm text-gray-300">Command-line tool for thread and memory analysis</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'advanced':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="advanced" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ☕ Advanced Java
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Enterprise architecture, design patterns, and advanced development concepts
              </p>
              
              <div className="max-w-6xl mx-auto">
                {/* Enterprise Architecture */}
                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-blue-400 mb-6">🏢 Enterprise Architecture</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">Architectural Foundations</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        Enterprise architecture in Java represents the high-level structural design of complex business applications. It encompasses the systematic approach to designing, planning, and implementing software systems that can handle large-scale operations, multiple concurrent users, and complex business requirements.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        The architecture must address scalability, maintainability, security, and performance while supporting the organization's business objectives. Enterprise applications typically involve multiple layers including presentation, business logic, data access, and integration layers.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">Key Architectural Principles</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">🏗️ Layered Architecture</h4>
                            <p className="text-sm text-gray-300">Separation of concerns through distinct layers (presentation, business, data access)</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">🔄 Dependency Injection</h4>
                            <p className="text-sm text-gray-300">Inversion of control for loose coupling and enhanced testability</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">🎯 Single Responsibility</h4>
                            <p className="text-sm text-gray-300">Each component has one reason to change, promoting maintainability</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">🔧 Configuration Management</h4>
                            <p className="text-sm text-gray-300">Externalized configuration for flexibility and environment-specific settings</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">🛡️ Security by Design</h4>
                            <p className="text-sm text-gray-300">Security considerations integrated throughout the application lifecycle</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                            <h4 className="text-lg font-bold text-blue-300 mb-2">📈 Scalability</h4>
                            <p className="text-sm text-gray-300">Ability to handle increased load and data volume efficiently</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Design Patterns */}
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">🎨 Design Patterns</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">Creational Patterns</h3>
                      <p className="text-gray-300 mb-4">
                        Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation. These patterns abstract the instantiation process and help make a system independent of how its objects are created, composed, and represented.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">Singleton Pattern</h4>
                          <p className="text-sm text-gray-300 mb-4">
                            Ensures a class has only one instance and provides global access to it. This pattern is particularly useful for logging, database connections, and configuration management where a single instance should control the entire application.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">Factory Pattern</h4>
                          <p className="text-sm text-gray-300 mb-4">
                            Creates objects without specifying their exact classes. This pattern provides an interface for creating families of related objects without specifying their concrete classes, promoting loose coupling.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">Structural Patterns</h3>
                      <p className="text-gray-300 mb-4">
                        Structural patterns deal with object composition and relationships between entities. They help ensure that when one part of a system changes, the entire structure doesn't need to change, promoting system flexibility and reusability.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">Adapter Pattern</h4>
                          <p className="text-sm text-gray-300 mb-4">
                            Allows incompatible interfaces to work together. Acts as a bridge between two incompatible interfaces by wrapping an existing class with a new interface, enabling legacy code integration.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">Decorator Pattern</h4>
                          <p className="text-sm text-gray-300 mb-4">
                            Adds new functionality to existing objects without altering their structure. Provides a flexible alternative to subclassing for extending functionality, allowing behavior to be added dynamically.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">Behavioral Patterns</h3>
                      <p className="text-gray-300 mb-4">
                        Behavioral patterns focus on communication between objects and the assignment of responsibilities between objects. They describe not just patterns of objects or classes but also the patterns of communication between them.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">Observer Pattern</h4>
                          <p className="text-sm text-gray-300 mb-4">
                            Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. This pattern is fundamental in event-driven architectures.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                          <h4 className="text-xl font-bold text-green-300 mb-4">Strategy Pattern</h4>
                          <p className="text-sm text-gray-300 mb-4">
                            Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it, promoting flexibility and maintainability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enterprise Technologies */}
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">🔧 Enterprise Technologies</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-purple-400 mb-4">Spring Framework Ecosystem</h3>
                      <p className="text-gray-300 mb-4">
                        The Spring Framework is a comprehensive programming and configuration model for modern Java-based enterprise applications. It addresses many aspects of enterprise development, providing a consistent programming model for different environments while promoting best practices.
                      </p>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/30">
                          <h4 className="text-xl font-bold text-purple-300 mb-4">Core Spring Concepts</h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-purple-300 mb-2">Inversion of Control (IoC)</h5>
                                <p className="text-sm text-gray-300">Framework manages object creation and lifecycle, reducing coupling between components and promoting testability</p>
                              </div>
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-purple-300 mb-2">Dependency Injection (DI)</h5>
                                <p className="text-sm text-gray-300">Dependencies are provided to objects rather than created by them, enabling loose coupling and easier testing</p>
                              </div>
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-purple-300 mb-2">Aspect-Oriented Programming (AOP)</h5>
                                <p className="text-sm text-gray-300">Separates cross-cutting concerns like logging, security, and transactions from business logic</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-purple-300 mb-2">Spring MVC</h5>
                                <p className="text-sm text-gray-300">Web framework implementing Model-View-Controller pattern for building web applications</p>
                              </div>
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-purple-300 mb-2">Spring Boot</h5>
                                <p className="text-sm text-gray-300">Auto-configuration and convention-over-configuration approach for rapid application development</p>
                              </div>
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-purple-300 mb-2">Spring Security</h5>
                                <p className="text-sm text-gray-300">Comprehensive security framework for authentication, authorization, and protection against common attacks</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-purple-400 mb-4">Database Integration Strategies</h3>
                      <p className="text-gray-300 mb-4">
                        Enterprise applications require robust database integration strategies that ensure data consistency, performance, and scalability. Java provides multiple approaches for database connectivity and data persistence.
                      </p>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/30">
                          <h4 className="text-xl font-bold text-purple-300 mb-4">JDBC (Java Database Connectivity)</h4>
                          <p className="text-sm text-gray-300 mb-4">
                            JDBC is a Java API that enables Java programs to execute SQL statements. It provides methods to query and update data in a database and is oriented towards relational databases, serving as the foundation for higher-level ORM frameworks.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/30">
                          <h4 className="text-xl font-bold text-purple-300 mb-4">Hibernate ORM Framework</h4>
                          <p className="text-sm text-gray-300 mb-4">
                            Hibernate is an Object-Relational Mapping (ORM) framework that simplifies database interactions by mapping Java objects to database tables. It provides a framework for mapping an object-oriented domain model to a relational database, abstracting away the complexities of SQL.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Microservices Architecture */}
                <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">🔗 Microservices Architecture</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-yellow-400 mb-4">Microservices Principles</h3>
                      <p className="text-gray-300 mb-4">
                        Microservices architecture is a method of developing software systems that focuses on building single-function modules with well-defined interfaces and operations. This architectural style approaches developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/30">
                            <h4 className="text-lg font-bold text-yellow-300 mb-2">🏗️ Single Responsibility</h4>
                            <p className="text-sm text-gray-300">Each service should have a single, well-defined responsibility and business capability</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/30">
                            <h4 className="text-lg font-bold text-yellow-300 mb-2">🔄 Independent Deployment</h4>
                            <p className="text-sm text-gray-300">Services can be deployed independently without affecting other services</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/30">
                            <h4 className="text-lg font-bold text-yellow-300 mb-2">🗄️ Decentralized Data</h4>
                            <p className="text-sm text-gray-300">Each service manages its own database and data storage</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/30">
                            <h4 className="text-lg font-bold text-yellow-300 mb-2">🌐 API-First Design</h4>
                            <p className="text-sm text-gray-300">Services communicate through well-defined APIs and protocols</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/30">
                            <h4 className="text-lg font-bold text-yellow-300 mb-2">🛡️ Fault Tolerance</h4>
                            <p className="text-sm text-gray-300">System continues to function when individual services fail</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/30">
                            <h4 className="text-lg font-bold text-yellow-300 mb-2">📈 Scalability</h4>
                            <p className="text-sm text-gray-300">Individual services can be scaled independently based on demand</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-yellow-400 mb-4">Spring Boot for Microservices</h3>
                      <p className="text-gray-300 mb-4">
                        Spring Boot provides excellent support for building microservices with features like auto-configuration, embedded servers, and production-ready features out of the box. It simplifies the development of microservices by providing sensible defaults and eliminating boilerplate code.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Performance Optimization */}
                <div className="bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-red-400 mb-6">⚡ Performance Optimization</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-red-400 mb-4">JVM Performance Tuning</h3>
                      <p className="text-gray-300 mb-4">
                        Performance optimization in Java enterprise applications involves understanding JVM behavior, garbage collection, memory management, and application-level optimizations. Proper tuning can significantly improve application throughput and reduce latency.
                      </p>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-red-500/30">
                          <h4 className="text-xl font-bold text-red-300 mb-4">Memory Optimization Strategies</h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-red-300 mb-2">Heap Tuning</h5>
                                <p className="text-sm text-gray-300">Optimize heap size based on application requirements and GC patterns</p>
                              </div>
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-red-300 mb-2">Object Pooling</h5>
                                <p className="text-sm text-gray-300">Reuse expensive objects to reduce GC pressure and allocation overhead</p>
                              </div>
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-red-300 mb-2">Collection Optimization</h5>
                                <p className="text-sm text-gray-300">Choose appropriate data structures for specific use cases and access patterns</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-red-300 mb-2">Caching Strategies</h5>
                                <p className="text-sm text-gray-300">Implement multi-level caching for frequently accessed data</p>
                              </div>
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-red-300 mb-2">Connection Pooling</h5>
                                <p className="text-sm text-gray-300">Optimize database connection management and resource utilization</p>
                              </div>
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-lg font-bold text-red-300 mb-2">Lazy Loading</h5>
                                <p className="text-sm text-gray-300">Load data only when needed to improve initial performance</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Considerations */}
                <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-indigo-400 mb-6">🛡️ Security in Enterprise Java</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-indigo-400 mb-4">Security Best Practices</h3>
                      <p className="text-gray-300 mb-4">
                        Enterprise Java applications must implement comprehensive security measures to protect against various threats including unauthorized access, data breaches, injection attacks, and malicious code execution. Security should be considered at every layer of the application.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                            <h4 className="text-lg font-bold text-indigo-300 mb-2">🔐 Authentication</h4>
                            <p className="text-sm text-gray-300">Verify user identity through secure login mechanisms and multi-factor authentication</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                            <h4 className="text-lg font-bold text-indigo-300 mb-2">🎫 Authorization</h4>
                            <p className="text-sm text-gray-300">Control access to resources based on user roles and permissions</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                            <h4 className="text-lg font-bold text-indigo-300 mb-2">🔒 Data Encryption</h4>
                            <p className="text-sm text-gray-300">Protect sensitive data at rest and in transit using strong encryption algorithms</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                            <h4 className="text-lg font-bold text-indigo-300 mb-2">🛡️ Input Validation</h4>
                            <p className="text-sm text-gray-300">Sanitize and validate all user inputs to prevent injection attacks</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                            <h4 className="text-lg font-bold text-indigo-300 mb-2">🔑 Session Management</h4>
                            <p className="text-sm text-gray-300">Secure session handling with proper timeout and invalidation mechanisms</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                            <h4 className="text-lg font-bold text-indigo-300 mb-2">📝 Audit Logging</h4>
                            <p className="text-sm text-gray-300">Track and monitor security-related events for compliance and forensics</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-indigo-400 mb-4">Spring Security Implementation</h3>
                      <p className="text-gray-300 mb-4">
                        Spring Security provides comprehensive security services for Java enterprise applications, including authentication, authorization, and protection against common attacks. It integrates seamlessly with Spring applications and provides declarative security through annotations and configuration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testing Strategies */}
                <div className="bg-gradient-to-r from-teal-600/10 to-green-600/10 border border-teal-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-teal-400 mb-6">🧪 Testing in Enterprise Applications</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-teal-400 mb-4">Testing Pyramid Strategy</h3>
                      <p className="text-gray-300 mb-4">
                        Enterprise applications require comprehensive testing strategies that cover unit tests, integration tests, and end-to-end tests. The testing pyramid provides a framework for organizing different types of tests, ensuring optimal coverage while maintaining development efficiency.
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg border border-teal-500/30">
                          <h4 className="text-xl font-bold text-teal-300 mb-4">🔬 Unit Tests</h4>
                          <p className="text-sm text-gray-300 mb-4">Test individual components in isolation using mocks and stubs to ensure each unit works correctly</p>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg border border-teal-500/30">
                          <h4 className="text-xl font-bold text-teal-300 mb-4">🔗 Integration Tests</h4>
                          <p className="text-sm text-gray-300 mb-4">Test interactions between components using real database and external services</p>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg border border-teal-500/30">
                          <h4 className="text-xl font-bold text-teal-300 mb-4">🌐 End-to-End Tests</h4>
                          <p className="text-sm text-gray-300 mb-4">Test complete user workflows from frontend to backend</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'date-time':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="date-time" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📅 Java Date/Time
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Modern date/time API, LocalDate, LocalTime, LocalDateTime, ZonedDateTime, and comprehensive examples</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-orange-400 mb-6">What is Java Date/Time API?</h2>
                  <p className="text-lg text-gray-300 mb-4">The Java Date/Time API (java.time) provides a comprehensive framework for date and time manipulation. It's immutable, thread-safe, and designed to replace the legacy Date and Calendar classes.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-orange-300">Immutable:</strong> All date/time objects are immutable and thread-safe</li>
                    <li>• <strong className="text-orange-300">Type-Safe:</strong> Separate classes for different time concepts</li>
                    <li>• <strong className="text-orange-300">Fluent API:</strong> Method chaining for easy manipulation</li>
                    <li>• <strong className="text-orange-300">Timezone Support:</strong> Built-in timezone handling</li>
                    <li>• <strong className="text-orange-300">ISO 8601:</strong> Standard date/time format support</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-orange-300 mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        The Java Date/Time API implements the <strong className="text-orange-300">immutable object pattern</strong> and <strong className="text-orange-300">value object pattern</strong> in software design. It provides a robust, thread-safe alternative to legacy date/time classes.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The API follows the <strong className="text-orange-300">ISO 8601 standard</strong> for date and time representation, ensuring international compatibility and consistency across different systems and locales.
                      </p>
                      <p className="text-gray-300">
                        Understanding the Date/Time API is crucial for implementing <strong className="text-orange-300">reliable</strong>, <strong className="text-orange-300">maintainable</strong>, and <strong className="text-orange-300">internationalized</strong> applications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-orange-400 mb-6">Core Date/Time Classes</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-orange-400 mb-4">LocalDate, LocalTime, LocalDateTime</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          The core classes for representing date and time without timezone information:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">LocalDate</h4>
                            <p className="text-sm text-gray-300 mb-2">Date without time</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Year, month, day</li>
                              <li>• No timezone info</li>
                              <li>• ISO format: 2023-12-25</li>
                              <li>• Immutable</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">LocalTime</h4>
                            <p className="text-sm text-gray-300 mb-2">Time without date</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Hour, minute, second</li>
                              <li>• Nanosecond precision</li>
                              <li>• ISO format: 14:30:45</li>
                              <li>• Immutable</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">LocalDateTime</h4>
                            <p className="text-sm text-gray-300 mb-2">Date and time combined</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• LocalDate + LocalTime</li>
                              <li>• No timezone info</li>
                              <li>• ISO format: 2023-12-25T14:30:45</li>
                              <li>• Immutable</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-orange-400 mb-4">ZonedDateTime and Timezone Handling</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          For applications that need timezone awareness:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">ZonedDateTime</h4>
                            <p className="text-sm text-gray-300 mb-2">Date/time with timezone</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• LocalDateTime + ZoneId</li>
                              <li>• Timezone-aware</li>
                              <li>• Handles DST automatically</li>
                              <li>• ISO format with timezone</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">ZoneId</h4>
                            <p className="text-sm text-gray-300 mb-2">Timezone identifier</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• "America/New_York"</li>
                              <li>• "Europe/London"</li>
                              <li>• "Asia/Tokyo"</li>
                              <li>• Handles DST rules</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-orange-400 mb-4">Comprehensive Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.Locale;

public class DateTimeExample {
    public static void main(String[] args) {
        System.out.println("=== Java Date/Time API Examples ===\\n");
        
        // 1. Creating Date/Time Objects
        System.out.println("1. Creating Date/Time Objects:");
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        LocalDateTime dateTime = LocalDateTime.now();
        
        System.out.println("Today: " + today);
        System.out.println("Now: " + now);
        System.out.println("DateTime: " + dateTime);
        
        // 2. Creating Specific Dates/Times
        System.out.println("\\n2. Creating Specific Dates/Times:");
        LocalDate birthday = LocalDate.of(1990, Month.JUNE, 15);
        LocalTime meetingTime = LocalTime.of(14, 30);
        LocalDateTime appointment = LocalDateTime.of(2023, 12, 25, 10, 0);
        
        System.out.println("Birthday: " + birthday);
        System.out.println("Meeting: " + meetingTime);
        System.out.println("Appointment: " + appointment);
        
        // 3. Date/Time Manipulation
        System.out.println("\\n3. Date/Time Manipulation:");
        LocalDate nextWeek = today.plusWeeks(1);
        LocalDate lastMonth = today.minusMonths(1);
        LocalTime inTwoHours = now.plusHours(2);
        
        System.out.println("Next week: " + nextWeek);
        System.out.println("Last month: " + lastMonth);
        System.out.println("In 2 hours: " + inTwoHours);
        
        // 4. Using TemporalAdjusters
        System.out.println("\\n4. Using TemporalAdjusters:");
        LocalDate firstDayOfMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate lastDayOfMonth = today.with(TemporalAdjusters.lastDayOfMonth());
        LocalDate nextMonday = today.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        
        System.out.println("First day of month: " + firstDayOfMonth);
        System.out.println("Last day of month: " + lastDayOfMonth);
        System.out.println("Next Monday: " + nextMonday);
        
        // 5. Timezone Handling
        System.out.println("\\n5. Timezone Handling:");
        ZonedDateTime tokyoTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
        ZonedDateTime newYorkTime = ZonedDateTime.now(ZoneId.of("America/New_York"));
        ZonedDateTime londonTime = ZonedDateTime.now(ZoneId.of("Europe/London"));
        
        System.out.println("Tokyo: " + tokyoTime);
        System.out.println("New York: " + newYorkTime);
        System.out.println("London: " + londonTime);
        
        // 6. Duration and Period
        System.out.println("\\n6. Duration and Period:");
        LocalDateTime start = LocalDateTime.of(2023, 1, 1, 9, 0);
        LocalDateTime end = LocalDateTime.of(2023, 1, 1, 17, 30);
        
        Duration workDuration = Duration.between(start, end);
        Period agePeriod = Period.between(birthday, today);
        
        System.out.println("Work duration: " + workDuration);
        System.out.println("Age period: " + agePeriod);
        System.out.println("Age in years: " + agePeriod.getYears());
        System.out.println("Age in days: " + ChronoUnit.DAYS.between(birthday, today));
        
        // 7. Formatting and Parsing
        System.out.println("\\n7. Formatting and Parsing:");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        DateTimeFormatter customFormatter = DateTimeFormatter.ofPattern("EEEE, MMMM dd, yyyy", Locale.ENGLISH);
        
        String formatted = dateTime.format(formatter);
        String customFormatted = today.format(customFormatter);
        
        System.out.println("Formatted: " + formatted);
        System.out.println("Custom formatted: " + customFormatted);
        
        // Parsing
        LocalDateTime parsed = LocalDateTime.parse("25/12/2023 14:30", formatter);
        System.out.println("Parsed: " + parsed);
        
        // 8. Date/Time Comparison
        System.out.println("\\n8. Date/Time Comparison:");
        LocalDate date1 = LocalDate.of(2023, 12, 25);
        LocalDate date2 = LocalDate.of(2023, 12, 26);
        
        System.out.println("Date1: " + date1);
        System.out.println("Date2: " + date2);
        System.out.println("Date1 is before Date2: " + date1.isBefore(date2));
        System.out.println("Date1 is after Date2: " + date1.isAfter(date2));
        System.out.println("Date1 equals Date2: " + date1.equals(date2));
        
        // 9. Working with Business Days
        System.out.println("\\n9. Working with Business Days:");
        LocalDate businessDate = today;
        int businessDaysAdded = 0;
        int targetBusinessDays = 5;
        
        while (businessDaysAdded < targetBusinessDays) {
            businessDate = businessDate.plusDays(1);
            if (businessDate.getDayOfWeek() != DayOfWeek.SATURDAY && 
                businessDate.getDayOfWeek() != DayOfWeek.SUNDAY) {
                businessDaysAdded++;
            }
        }
        
        System.out.println("Today: " + today);
        System.out.println("5 business days from today: " + businessDate);
        
        // 10. Age Calculation
        System.out.println("\\n10. Age Calculation:");
        LocalDate birthDate = LocalDate.of(1990, 6, 15);
        int age = Period.between(birthDate, today).getYears();
        long daysLived = ChronoUnit.DAYS.between(birthDate, today);
        
        System.out.println("Birth date: " + birthDate);
        System.out.println("Current age: " + age + " years");
        System.out.println("Days lived: " + daysLived);
        
        // 11. Time Zone Conversion
        System.out.println("\\n11. Time Zone Conversion:");
        ZonedDateTime utcTime = ZonedDateTime.now(ZoneId.of("UTC"));
        ZonedDateTime localTime = utcTime.withZoneSameInstant(ZoneId.systemDefault());
        
        System.out.println("UTC Time: " + utcTime);
        System.out.println("Local Time: " + localTime);
        
        // 12. Working with Instants
        System.out.println("\\n12. Working with Instants:");
        Instant instant = Instant.now();
        LocalDateTime fromInstant = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        
        System.out.println("Instant: " + instant);
        System.out.println("Local DateTime from Instant: " + fromInstant);
    }
    
    // Utility method for business day calculation
    public static LocalDate addBusinessDays(LocalDate date, int businessDays) {
        LocalDate result = date;
        int addedDays = 0;
        
        while (addedDays < businessDays) {
            result = result.plusDays(1);
            if (result.getDayOfWeek() != DayOfWeek.SATURDAY && 
                result.getDayOfWeek() != DayOfWeek.SUNDAY) {
                addedDays++;
            }
        }
        
        return result;
    }
    
    // Utility method for age calculation
    public static int calculateAge(LocalDate birthDate, LocalDate currentDate) {
        return Period.between(birthDate, currentDate).getYears();
    }
    
    // Utility method for time zone conversion
    public static ZonedDateTime convertTimeZone(ZonedDateTime dateTime, ZoneId targetZone) {
        return dateTime.withZoneSameInstant(targetZone);
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-orange-400 mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use LocalDate/LocalTime for date-only or time-only values</li>
                      <li>• Use ZonedDateTime for timezone-aware applications</li>
                      <li>• Prefer immutable operations over mutable ones</li>
                      <li>• Use Period for date-based amounts, Duration for time-based</li>
                      <li>• Always specify timezone explicitly in production code</li>
                      <li>• Use DateTimeFormatter for consistent formatting</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-orange-400 mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Mixing legacy Date/Calendar with new API</li>
                      <li>• Not handling timezone conversions properly</li>
                      <li>• Forgetting that all classes are immutable</li>
                      <li>• Not considering DST transitions</li>
                      <li>• Using wrong class for the use case</li>
                      <li>• Not validating date/time inputs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'arraylist':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="arraylist" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📋 Java ArrayList
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Dynamic arrays, resizable arrays, List interface implementation, and comprehensive examples</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-cyan-400 mb-6">What is ArrayList?</h2>
                  <p className="text-lg text-gray-300 mb-4">ArrayList is a resizable array implementation of the List interface. It provides dynamic array functionality with automatic resizing, making it one of the most commonly used data structures in Java.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-cyan-300">Dynamic Size:</strong> Automatically grows and shrinks as needed</li>
                    <li>• <strong className="text-cyan-300">Random Access:</strong> O(1) access time for any element</li>
                    <li>• <strong className="text-cyan-300">Ordered Collection:</strong> Maintains insertion order</li>
                    <li>• <strong className="text-cyan-300">Duplicate Elements:</strong> Allows duplicate values</li>
                    <li>• <strong className="text-cyan-300">Null Values:</strong> Permits null elements</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-cyan-300 mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        ArrayList implements the <strong className="text-cyan-300">dynamic array pattern</strong> and <strong className="text-cyan-300">resizable array pattern</strong> in data structure design. It provides a balance between array performance and list flexibility.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The implementation uses an <strong className="text-cyan-300">internal array</strong> that grows by approximately 50% when capacity is exceeded, ensuring amortized O(1) insertion time while maintaining memory efficiency.
                      </p>
                      <p className="text-gray-300">
                        Understanding ArrayList is crucial for implementing <strong className="text-cyan-300">efficient</strong>, <strong className="text-cyan-300">scalable</strong>, and <strong className="text-cyan-300">maintainable</strong> Java applications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-cyan-400 mb-6">ArrayList Characteristics</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-cyan-400 mb-4">Performance Characteristics</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding ArrayList performance is crucial for choosing the right data structure:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-cyan-300 font-bold mb-2">Time Complexity</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong>Access:</strong> O(1) - Random access by index</li>
                              <li>• <strong>Search:</strong> O(n) - Linear search</li>
                              <li>• <strong>Insertion:</strong> O(1) amortized - End insertion</li>
                              <li>• <strong>Deletion:</strong> O(n) - Element removal</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-cyan-300 font-bold mb-2">Space Complexity</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong>Storage:</strong> O(n) - Linear space</li>
                              <li>• <strong>Overhead:</strong> Minimal - Just array reference</li>
                              <li>• <strong>Memory:</strong> Contiguous allocation</li>
                              <li>• <strong>Growth:</strong> 50% increase when full</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-cyan-400 mb-4">ArrayList vs Array</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Key differences between ArrayList and traditional arrays:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-cyan-300 font-bold mb-2">ArrayList Advantages</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Dynamic resizing</li>
                              <li>• Rich API methods</li>
                              <li>• Type safety with generics</li>
                              <li>• Iterator support</li>
                              <li>• Collection framework integration</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-cyan-300 font-bold mb-2">Array Advantages</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Better performance</li>
                              <li>• Lower memory overhead</li>
                              <li>• Primitive type support</li>
                              <li>• Multidimensional support</li>
                              <li>• No boxing/unboxing</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-cyan-400 mb-6">ArrayList Operations and Methods</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-cyan-400 mb-4">Core Operations</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Essential ArrayList operations for data manipulation:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-cyan-300">add(element):</strong> Add element to end</li>
                          <li>• <strong className="text-cyan-300">add(index, element):</strong> Insert at specific position</li>
                          <li>• <strong className="text-cyan-300">get(index):</strong> Retrieve element by index</li>
                          <li>• <strong className="text-cyan-300">set(index, element):</strong> Replace element at index</li>
                          <li>• <strong className="text-cyan-300">remove(index):</strong> Remove element by index</li>
                          <li>• <strong className="text-cyan-300">remove(element):</strong> Remove first occurrence</li>
                          <li>• <strong className="text-cyan-300">size():</strong> Get number of elements</li>
                          <li>• <strong className="text-cyan-300">isEmpty():</strong> Check if list is empty</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-cyan-400 mb-4">Search and Iteration</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Methods for finding and iterating through elements:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-cyan-300 font-bold mb-2">Search Methods</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• indexOf(element)</li>
                              <li>• lastIndexOf(element)</li>
                              <li>• contains(element)</li>
                              <li>• containsAll(collection)</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-cyan-300 font-bold mb-2">Iteration Methods</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Enhanced for loop</li>
                              <li>• Iterator interface</li>
                              <li>• ListIterator interface</li>
                              <li>• forEach() method</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-cyan-400 mb-6 mt-8">Step-by-Step Examples</h2>
                
                {/* Example 1: Creating ArrayList */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">📝 Example 1: Creating an ArrayList</h3>
                  <p className="text-gray-300 mb-4">
                    Let's learn how to create ArrayList objects in different ways. ArrayList is a generic class, so you specify the type of elements it will hold using angle brackets.
                  </p>
                  
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`import java.util.ArrayList;
import java.util.Arrays;

public class CreateArrayList {
    public static void main(String[] args) {
        // Method 1: Empty ArrayList
        ArrayList<String> fruits = new ArrayList<>();
        
        // Method 2: ArrayList with initial values
        ArrayList<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        
        // Method 3: ArrayList with initial capacity
        ArrayList<String> colors = new ArrayList<>(10);
        
        System.out.println("Empty fruits list: " + fruits);
        System.out.println("Numbers list: " + numbers);
        System.out.println("Colors list: " + colors);
    }
}`}</pre>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Empty fruits list: []
Numbers list: [1, 2, 3, 4, 5]
Colors list: []`}</pre>
                  </div>
                  
                  <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">Line 5:</strong> Creates an empty ArrayList that will store String objects</li>
                      <li>• <strong className="text-white">Line 8:</strong> Creates and initializes ArrayList with values using Arrays.asList()</li>
                      <li>• <strong className="text-white">Line 11:</strong> Creates ArrayList with initial capacity of 10 (optimizes memory for large lists)</li>
                      <li>• <strong className="text-cyan-300">Note:</strong> Initial capacity doesn't add elements, just reserves space to avoid frequent resizing</li>
                    </ul>
                  </div>
                </div>

                {/* Example 2: Adding Elements */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">➕ Example 2: Adding Elements</h3>
                  <p className="text-gray-300 mb-4">
                    ArrayList provides multiple methods to add elements. You can add at the end or insert at a specific position.
                  </p>
                  
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`import java.util.ArrayList;

public class AddElements {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        
        // Adding elements to the end
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        
        System.out.println("After adding: " + fruits);
        System.out.println("Size: " + fruits.size());
        
        // Inserting at specific index
        fruits.add(1, "Grape");
        
        System.out.println("After inserting Grape at index 1: " + fruits);
    }
}`}</pre>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`After adding: [Apple, Banana, Orange]
Size: 3
After inserting Grape at index 1: [Apple, Grape, Banana, Orange]`}</pre>
                  </div>
                  
                  <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">add(element):</strong> Appends element to the end of the list - O(1) amortized time</li>
                      <li>• <strong className="text-white">add(index, element):</strong> Inserts element at specified position, shifting subsequent elements - O(n) time</li>
                      <li>• <strong className="text-white">size():</strong> Returns the number of elements in the list - O(1) time</li>
                      <li>• <strong className="text-cyan-300">Notice:</strong> When inserting at index 1, "Grape" is placed between "Apple" and "Banana"</li>
                    </ul>
                  </div>
                </div>

                {/* Example 3: Accessing Elements */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">🔍 Example 3: Accessing Elements</h3>
                  <p className="text-gray-300 mb-4">
                    Access elements using the get() method with zero-based indexing (first element is at index 0).
                  </p>
                  
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`import java.util.ArrayList;

public class AccessElements {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Mango");
        
        // Access by index
        String firstFruit = fruits.get(0);
        String lastFruit = fruits.get(fruits.size() - 1);
        
        System.out.println("First fruit: " + firstFruit);
        System.out.println("Last fruit: " + lastFruit);
        System.out.println("Second fruit: " + fruits.get(1));
    }
}`}</pre>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`First fruit: Apple
Last fruit: Mango
Second fruit: Banana`}</pre>
                  </div>
                  
                  <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">get(0):</strong> Retrieves the first element (index starts at 0)</li>
                      <li>• <strong className="text-white">get(size() - 1):</strong> Gets the last element using the list size</li>
                      <li>• <strong className="text-cyan-300">Performance:</strong> Random access is O(1) - very fast!</li>
                      <li>• <strong className="text-red-300">Warning:</strong> Accessing invalid index throws IndexOutOfBoundsException</li>
                    </ul>
                  </div>
                </div>

                {/* Example 4: Modifying Elements */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">✏️ Example 4: Modifying Elements</h3>
                  <p className="text-gray-300 mb-4">
                    Use the set() method to replace an element at a specific index.
                  </p>
                  
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`import java.util.ArrayList;

public class ModifyElements {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        
        System.out.println("Original list: " + fruits);
        
        // Replace element at index 1
        String oldValue = fruits.set(1, "Mango");
        
        System.out.println("Replaced '" + oldValue + "' with 'Mango'");
        System.out.println("Updated list: " + fruits);
    }
}`}</pre>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Original list: [Apple, Banana, Orange]
Replaced 'Banana' with 'Mango'
Updated list: [Apple, Mango, Orange]`}</pre>
                  </div>
                  
                  <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">set(index, element):</strong> Replaces the element at the specified index</li>
                      <li>• <strong className="text-white">Returns:</strong> The old value that was replaced (useful for undo operations)</li>
                      <li>• <strong className="text-cyan-300">Performance:</strong> O(1) operation - direct array access</li>
                      <li>• <strong className="text-white">Index 1:</strong> "Banana" is replaced by "Mango", but list size stays the same</li>
                    </ul>
                  </div>
                </div>

                {/* Example 5: Removing Elements */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">🗑️ Example 5: Removing Elements</h3>
                  <p className="text-gray-300 mb-4">
                    ArrayList provides two ways to remove elements: by index or by value.
                  </p>
                  
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`import java.util.ArrayList;

public class RemoveElements {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Mango");
        
        System.out.println("Original: " + fruits);
        
        // Remove by index
        String removed = fruits.remove(2);
        System.out.println("Removed at index 2: " + removed);
        System.out.println("After removal: " + fruits);
        
        // Remove by value
        boolean success = fruits.remove("Banana");
        System.out.println("Removed 'Banana': " + success);
        System.out.println("Final list: " + fruits);
    }
}`}</pre>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Original: [Apple, Banana, Orange, Mango]
Removed at index 2: Orange
After removal: [Apple, Banana, Mango]
Removed 'Banana': true
Final list: [Apple, Mango]`}</pre>
                  </div>
                  
                  <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">remove(index):</strong> Removes element at position 2 ("Orange") and returns it</li>
                      <li>• <strong className="text-white">Shifting:</strong> Elements after index 2 shift left to fill the gap</li>
                      <li>• <strong className="text-white">remove(object):</strong> Finds and removes first occurrence of "Banana"</li>
                      <li>• <strong className="text-white">Returns boolean:</strong> true if element was found and removed, false otherwise</li>
                      <li>• <strong className="text-cyan-300">Performance:</strong> O(n) - may need to shift elements</li>
                    </ul>
                  </div>
                </div>

                {/* Example 6: Searching Elements */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">🔎 Example 6: Searching Elements</h3>
                  <p className="text-gray-300 mb-4">
                    Search for elements using contains(), indexOf(), and lastIndexOf() methods.
                  </p>
                  
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`import java.util.ArrayList;

public class SearchElements {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Apple"); // Duplicate
        
        // Check if element exists
        boolean hasApple = fruits.contains("Apple");
        boolean hasGrape = fruits.contains("Grape");
        
        // Find index of element
        int firstApple = fruits.indexOf("Apple");
        int lastApple = fruits.lastIndexOf("Apple");
        
        System.out.println("Contains 'Apple': " + hasApple);
        System.out.println("Contains 'Grape': " + hasGrape);
        System.out.println("First 'Apple' at index: " + firstApple);
        System.out.println("Last 'Apple' at index: " + lastApple);
    }
}`}</pre>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Contains 'Apple': true
Contains 'Grape': false
First 'Apple' at index: 0
Last 'Apple' at index: 3`}</pre>
                  </div>
                  
                  <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">contains():</strong> Returns true if element exists in the list</li>
                      <li>• <strong className="text-white">indexOf():</strong> Returns first occurrence index, -1 if not found</li>
                      <li>• <strong className="text-white">lastIndexOf():</strong> Returns last occurrence index, -1 if not found</li>
                      <li>• <strong className="text-cyan-300">Use Case:</strong> Useful for validation and finding duplicate elements</li>
                    </ul>
                  </div>
                </div>

                {/* Example 7: Iterating Through ArrayList */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">🔄 Example 7: Iterating Through ArrayList</h3>
                  <p className="text-gray-300 mb-4">
                    There are multiple ways to loop through ArrayList elements. Each method has its use cases.
                  </p>
                  
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`import java.util.ArrayList;

public class IterateArrayList {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        
        // Method 1: Enhanced for loop (recommended)
        System.out.print("Enhanced for: ");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println();
        
        // Method 2: Traditional for loop
        System.out.print("Traditional for: ");
        for (int i = 0; i < fruits.size(); i++) {
            System.out.print(fruits.get(i) + " ");
        }
        System.out.println();
        
        // Method 3: forEach with lambda
        System.out.print("forEach lambda: ");
        fruits.forEach(fruit -> System.out.print(fruit + " "));
    }
}`}</pre>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Enhanced for: Apple Banana Orange 
Traditional for: Apple Banana Orange 
forEach lambda: Apple Banana Orange`}</pre>
                  </div>
                  
                  <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">Enhanced for loop:</strong> Cleanest syntax, best for read-only iteration</li>
                      <li>• <strong className="text-white">Traditional for loop:</strong> Use when you need the index or modify list during iteration</li>
                      <li>• <strong className="text-white">forEach with lambda:</strong> Modern Java 8+ approach, functional style</li>
                      <li>• <strong className="text-cyan-300">Best Practice:</strong> Use enhanced for loop when you don't need the index</li>
                    </ul>
                  </div>
                </div>

                {/* Example 8: Sorting ArrayList */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">📊 Example 8: Sorting ArrayList</h3>
                  <p className="text-gray-300 mb-4">
                    Sort ArrayList elements using Collections.sort() or the list's sort() method.
                  </p>
                  
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`import java.util.ArrayList;
import java.util.Collections;

public class SortArrayList {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Orange");
        fruits.add("Apple");
        fruits.add("Mango");
        fruits.add("Banana");
        
        System.out.println("Before sorting: " + fruits);
        
        // Sort in ascending order
        Collections.sort(fruits);
        System.out.println("After sorting: " + fruits);
        
        // Sort in descending order
        Collections.sort(fruits, Collections.reverseOrder());
        System.out.println("Descending order: " + fruits);
    }
}`}</pre>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Before sorting: [Orange, Apple, Mango, Banana]
After sorting: [Apple, Banana, Mango, Orange]
Descending order: [Orange, Mango, Banana, Apple]`}</pre>
                  </div>
                  
                  <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">Collections.sort():</strong> Sorts list in natural (alphabetical) order</li>
                      <li>• <strong className="text-white">Collections.reverseOrder():</strong> Comparator for descending sort</li>
                      <li>• <strong className="text-cyan-300">For Numbers:</strong> Sorts numerically (1, 2, 10, 20)</li>
                      <li>• <strong className="text-cyan-300">For Strings:</strong> Sorts alphabetically (case-sensitive)</li>
                    </ul>
                  </div>
                </div>

                {/* Continue with rest of examples in a similar pattern...
                The key is: smaller chunks, clear explanations, visible outputs */}
                
                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">📚 More ArrayList Operations</h3>
                  <p className="text-gray-300 mb-4">
                    Here are additional important operations you'll frequently use:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-bold mb-2">Bulk Operations</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• addAll() - Add entire collection</li>
                        <li>• removeAll() - Remove multiple elements</li>
                        <li>• retainAll() - Keep only specified elements</li>
                        <li>• clear() - Remove all elements</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-bold mb-2">Utility Operations</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• isEmpty() - Check if list is empty</li>
                        <li>• toArray() - Convert to array</li>
                        <li>• subList() - Get portion of list</li>
                        <li>• clone() - Create shallow copy</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Summary section with key takeaways */}
                <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 p-6 rounded-xl mt-8">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">🎯 Key Takeaways</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-bold mb-3">When to Use ArrayList</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>✅ Need fast random access by index</li>
                        <li>✅ Mostly reading data, few insertions/deletions</li>
                        <li>✅ Memory efficiency is important</li>
                        <li>✅ Need to store ordered collection</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-3">Performance Overview</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>⚡ get(index): O(1) - Very fast</li>
                        <li>⚡ add(element): O(1) amortized</li>
                        <li>⚠️ add(index, element): O(n) - Slower</li>
                        <li>⚠️ remove(index): O(n) - Slower</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-cyan-400 mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use ArrayList for frequent random access</li>
                      <li>• Specify initial capacity if known</li>
                      <li>• Use generics for type safety</li>
                      <li>• Prefer enhanced for loop for iteration</li>
                      <li>• Use streams for complex operations</li>
                      <li>• Consider LinkedList for frequent insertions/deletions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-cyan-400 mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Using ArrayList for frequent insertions at beginning</li>
                      <li>• Not specifying initial capacity for large lists</li>
                      <li>• Modifying list during iteration</li>
                      <li>• Not handling null values properly</li>
                      <li>• Using raw types instead of generics</li>
                      <li>• Not considering memory usage for large lists</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'linkedlist':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="linkedlist" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔗 Java LinkedList
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Doubly-linked list implementation, node-based structure, efficient insertions/deletions, and comprehensive examples</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">What is LinkedList?</h2>
                  <p className="text-lg text-gray-300 mb-4">LinkedList is a doubly-linked list implementation of the List and Deque interfaces. Unlike ArrayList, it uses nodes to store elements, where each node contains references to both the previous and next nodes.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-purple-300">Node-Based Structure:</strong> Elements stored in nodes with prev/next pointers</li>
                    <li>• <strong className="text-purple-300">Efficient Insertions:</strong> O(1) insertion/deletion at both ends</li>
                    <li>• <strong className="text-purple-300">Sequential Access:</strong> O(n) access time for random elements</li>
                    <li>• <strong className="text-purple-300">Ordered Collection:</strong> Maintains insertion order</li>
                    <li>• <strong className="text-purple-300">Implements Deque:</strong> Can be used as queue, stack, or deque</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-300 mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        LinkedList implements the <strong className="text-purple-300">doubly-linked list pattern</strong> in data structure design. Each node maintains references to both previous and next nodes, enabling efficient bidirectional traversal.
                      </p>
                      <p className="text-gray-300 mb-3">
                        Unlike ArrayList's contiguous memory allocation, LinkedList uses <strong className="text-purple-300">non-contiguous memory</strong>, making it ideal for scenarios with frequent insertions and deletions at arbitrary positions.
                      </p>
                      <p className="text-gray-300">
                        Understanding LinkedList is crucial for implementing <strong className="text-purple-300">queues</strong>, <strong className="text-purple-300">stacks</strong>, and <strong className="text-purple-300">cache systems</strong> like LRU caches.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">LinkedList Characteristics</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Performance Characteristics</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding LinkedList performance helps in choosing between ArrayList and LinkedList:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Time Complexity</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong>Access:</strong> O(n) - Sequential traversal required</li>
                              <li>• <strong>Search:</strong> O(n) - Linear search</li>
                              <li>• <strong>Insertion (at ends):</strong> O(1) - Constant time</li>
                              <li>• <strong>Insertion (middle):</strong> O(n) - Need to traverse</li>
                              <li>• <strong>Deletion (at ends):</strong> O(1) - Constant time</li>
                              <li>• <strong>Deletion (middle):</strong> O(n) - Need to traverse</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Space Complexity</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong>Storage:</strong> O(n) - Linear space</li>
                              <li>• <strong>Overhead:</strong> Higher - Each node stores 2 pointers</li>
                              <li>• <strong>Memory:</strong> Non-contiguous allocation</li>
                              <li>• <strong>Per Element:</strong> ~24 bytes (object + 2 references)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">LinkedList vs ArrayList</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Key differences to help you choose the right data structure:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Use LinkedList When</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Frequent insertions/deletions at beginning/end</li>
                              <li>• Implementing queue or deque</li>
                              <li>• No random access needed</li>
                              <li>• Memory fragmentation is acceptable</li>
                              <li>• Building LRU cache or similar structures</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Use ArrayList When</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Frequent random access by index</li>
                              <li>• Mostly reading, few modifications</li>
                              <li>• Memory efficiency is important</li>
                              <li>• Predictable size or growth pattern</li>
                              <li>• Better cache locality needed</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Internal Structure</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          LinkedList uses a doubly-linked node structure:
                        </p>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <pre className="text-green-400 font-mono text-sm">{`// Internal Node Structure (conceptual)
private static class Node<E> {
    E item;           // The element
    Node<E> next;     // Reference to next node
    Node<E> prev;     // Reference to previous node
    
    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">LinkedList Operations and Methods</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Core List Operations</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Standard List interface operations:
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• <strong className="text-purple-300">add(element):</strong> Add element to end</li>
                          <li>• <strong className="text-purple-300">add(index, element):</strong> Insert at specific position</li>
                          <li>• <strong className="text-purple-300">get(index):</strong> Retrieve element by index (O(n))</li>
                          <li>• <strong className="text-purple-300">set(index, element):</strong> Replace element at index</li>
                          <li>• <strong className="text-purple-300">remove(index):</strong> Remove element by index</li>
                          <li>• <strong className="text-purple-300">size():</strong> Get number of elements</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Deque Operations (Special Features)</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          LinkedList implements Deque interface, providing efficient operations at both ends:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">First Element Operations</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• addFirst(element) - Add at beginning</li>
                              <li>• getFirst() - Get first element</li>
                              <li>• removeFirst() - Remove first element</li>
                              <li>• peekFirst() - Get without removing</li>
                              <li>• offerFirst(element) - Add, returns boolean</li>
                              <li>• pollFirst() - Remove, returns null if empty</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Last Element Operations</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• addLast(element) - Add at end</li>
                              <li>• getLast() - Get last element</li>
                              <li>• removeLast() - Remove last element</li>
                              <li>• peekLast() - Get without removing</li>
                              <li>• offerLast(element) - Add, returns boolean</li>
                              <li>• pollLast() - Remove, returns null if empty</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Queue and Stack Operations</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          LinkedList can be used as a queue or stack:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Queue Operations (FIFO)</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• offer(element) - Add to queue</li>
                              <li>• poll() - Remove and return head</li>
                              <li>• peek() - View head without removing</li>
                              <li>• element() - View head (throws exception)</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-purple-300 font-bold mb-2">Stack Operations (LIFO)</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• push(element) - Add to top</li>
                              <li>• pop() - Remove and return top</li>
                              <li>• peek() - View top without removing</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">Comprehensive LinkedList Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`import java.util.*;

public class LinkedListExample {
    public static void main(String[] args) {
        System.out.println("=== Java LinkedList Examples ===\\n");
        
        // 1. Creating LinkedList
        System.out.println("1. Creating LinkedList:");
        LinkedList<String> animals = new LinkedList<>();
        LinkedList<Integer> numbers = new LinkedList<>(Arrays.asList(1, 2, 3, 4, 5));
        
        System.out.println("Empty animals list: " + animals);
        System.out.println("Numbers list: " + numbers);
        
        // 2. Adding Elements (List Operations)
        System.out.println("\\n2. Adding Elements (List Operations):");
        animals.add("Dog");
        animals.add("Cat");
        animals.add("Horse");
        animals.add(1, "Elephant"); // Insert at index 1
        
        System.out.println("After adding: " + animals);
        System.out.println("Size: " + animals.size());
        
        // 3. Adding at First and Last (Deque Operations)
        System.out.println("\\n3. Adding at First and Last:");
        animals.addFirst("Lion");
        animals.addLast("Tiger");
        
        System.out.println("After addFirst and addLast: " + animals);
        
        // 4. Accessing Elements
        System.out.println("\\n4. Accessing Elements:");
        System.out.println("First animal: " + animals.getFirst());
        System.out.println("Last animal: " + animals.getLast());
        System.out.println("Animal at index 2: " + animals.get(2));
        
        // 5. Peeking (without removing)
        System.out.println("\\n5. Peeking:");
        System.out.println("Peek first: " + animals.peekFirst());
        System.out.println("Peek last: " + animals.peekLast());
        System.out.println("List unchanged: " + animals);
        
        // 6. Removing Elements
        System.out.println("\\n6. Removing Elements:");
        String first = animals.removeFirst();
        String last = animals.removeLast();
        System.out.println("Removed first: " + first);
        System.out.println("Removed last: " + last);
        System.out.println("After removal: " + animals);
        
        String removed = animals.remove(1);
        System.out.println("Removed at index 1: " + removed);
        System.out.println("Final list: " + animals);
        
        // 7. Using as Queue (FIFO)
        System.out.println("\\n7. Using LinkedList as Queue (FIFO):");
        LinkedList<String> queue = new LinkedList<>();
        
        // Enqueue (add to rear)
        queue.offer("Task 1");
        queue.offer("Task 2");
        queue.offer("Task 3");
        System.out.println("Queue after enqueue: " + queue);
        
        // Dequeue (remove from front)
        System.out.println("Dequeue: " + queue.poll());
        System.out.println("Dequeue: " + queue.poll());
        System.out.println("Queue after dequeue: " + queue);
        
        // Peek at front
        System.out.println("Peek front: " + queue.peek());
        System.out.println("Queue unchanged: " + queue);
        
        // 8. Using as Stack (LIFO)
        System.out.println("\\n8. Using LinkedList as Stack (LIFO):");
        LinkedList<String> stack = new LinkedList<>();
        
        // Push (add to top)
        stack.push("Plate 1");
        stack.push("Plate 2");
        stack.push("Plate 3");
        System.out.println("Stack after push: " + stack);
        
        // Pop (remove from top)
        System.out.println("Pop: " + stack.pop());
        System.out.println("Pop: " + stack.pop());
        System.out.println("Stack after pop: " + stack);
        
        // Peek at top
        System.out.println("Peek top: " + stack.peek());
        System.out.println("Stack unchanged: " + stack);
        
        // 9. Iterating Through LinkedList
        System.out.println("\\n9. Iterating Through LinkedList:");
        LinkedList<String> fruits = new LinkedList<>(Arrays.asList("Apple", "Banana", "Orange"));
        
        // Forward iteration
        System.out.print("Forward: ");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println();
        
        // Backward iteration using descendingIterator
        System.out.print("Backward: ");
        Iterator<String> descIterator = fruits.descendingIterator();
        while (descIterator.hasNext()) {
            System.out.print(descIterator.next() + " ");
        }
        System.out.println();
        
        // ListIterator (bidirectional)
        System.out.print("ListIterator forward: ");
        ListIterator<String> listIterator = fruits.listIterator();
        while (listIterator.hasNext()) {
            System.out.print(listIterator.next() + " ");
        }
        System.out.println();
        
        System.out.print("ListIterator backward: ");
        while (listIterator.hasPrevious()) {
            System.out.print(listIterator.previous() + " ");
        }
        System.out.println();
        
        // 10. Searching and Contains
        System.out.println("\\n10. Searching and Contains:");
        System.out.println("Contains 'Banana': " + fruits.contains("Banana"));
        System.out.println("Index of 'Orange': " + fruits.indexOf("Orange"));
        System.out.println("Last index of 'Apple': " + fruits.lastIndexOf("Apple"));
        
        // 11. Converting to Array
        System.out.println("\\n11. Converting to Array:");
        String[] fruitArray = fruits.toArray(new String[0]);
        System.out.println("Array: " + Arrays.toString(fruitArray));
        
        // 12. Cloning and Copying
        System.out.println("\\n12. Cloning and Copying:");
        @SuppressWarnings("unchecked")
        LinkedList<String> clonedList = (LinkedList<String>) fruits.clone();
        System.out.println("Cloned list: " + clonedList);
        
        // 13. Performance Comparison
        System.out.println("\\n13. Performance Comparison:");
        performanceComparison();
        
        // 14. Real-World Use Cases
        System.out.println("\\n14. Real-World Use Cases:");
        demonstrateLRUCache();
        demonstrateBrowserHistory();
    }
    
    private static void performanceComparison() {
        int size = 100000;
        
        // LinkedList insertion at beginning
        LinkedList<Integer> linkedList = new LinkedList<>();
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            linkedList.addFirst(i);
        }
        long endTime = System.currentTimeMillis();
        System.out.println("LinkedList addFirst time: " + (endTime - startTime) + "ms");
        
        // ArrayList insertion at beginning (for comparison)
        ArrayList<Integer> arrayList = new ArrayList<>();
        startTime = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            arrayList.add(0, i);
        }
        endTime = System.currentTimeMillis();
        System.out.println("ArrayList add(0) time: " + (endTime - startTime) + "ms");
        
        // Random access comparison
        startTime = System.currentTimeMillis();
        for (int i = 0; i < 1000; i++) {
            linkedList.get(i);
        }
        endTime = System.currentTimeMillis();
        System.out.println("LinkedList random access time: " + (endTime - startTime) + "ms");
        
        startTime = System.currentTimeMillis();
        for (int i = 0; i < 1000; i++) {
            arrayList.get(i);
        }
        endTime = System.currentTimeMillis();
        System.out.println("ArrayList random access time: " + (endTime - startTime) + "ms");
    }
    
    private static void demonstrateLRUCache() {
        System.out.println("\\nLRU Cache Implementation:");
        LRUCache<String, Integer> cache = new LRUCache<>(3);
        
        cache.put("A", 1);
        cache.put("B", 2);
        cache.put("C", 3);
        System.out.println("Cache after adding A, B, C: " + cache);
        
        cache.get("A"); // Access A, making it most recently used
        System.out.println("After accessing A: " + cache);
        
        cache.put("D", 4); // This should evict B (least recently used)
        System.out.println("After adding D (B evicted): " + cache);
    }
    
    private static void demonstrateBrowserHistory() {
        System.out.println("\\nBrowser History Implementation:");
        BrowserHistory history = new BrowserHistory();
        
        history.visit("google.com");
        history.visit("youtube.com");
        history.visit("github.com");
        System.out.println("Current page: " + history.getCurrentPage());
        
        System.out.println("Back: " + history.back());
        System.out.println("Back: " + history.back());
        System.out.println("Forward: " + history.forward());
        
        history.visit("stackoverflow.com");
        System.out.println("Current page after new visit: " + history.getCurrentPage());
    }
    
    // Simple LRU Cache using LinkedList
    static class LRUCache<K, V> {
        private final int capacity;
        private final LinkedList<Entry<K, V>> cache;
        
        static class Entry<K, V> {
            K key;
            V value;
            
            Entry(K key, V value) {
                this.key = key;
                this.value = value;
            }
            
            @Override
            public String toString() {
                return key + "=" + value;
            }
        }
        
        public LRUCache(int capacity) {
            this.capacity = capacity;
            this.cache = new LinkedList<>();
        }
        
        public V get(K key) {
            for (Entry<K, V> entry : cache) {
                if (entry.key.equals(key)) {
                    // Move to front (most recently used)
                    cache.remove(entry);
                    cache.addFirst(entry);
                    return entry.value;
                }
            }
            return null;
        }
        
        public void put(K key, V value) {
            // Remove if already exists
            cache.removeIf(entry -> entry.key.equals(key));
            
            // Add to front
            cache.addFirst(new Entry<>(key, value));
            
            // Evict least recently used if over capacity
            if (cache.size() > capacity) {
                cache.removeLast();
            }
        }
        
        @Override
        public String toString() {
            return cache.toString();
        }
    }
    
    // Browser History using LinkedList
    static class BrowserHistory {
        private LinkedList<String> history;
        private int currentIndex;
        
        public BrowserHistory() {
            history = new LinkedList<>();
            currentIndex = -1;
        }
        
        public void visit(String url) {
            // Remove all forward history
            while (history.size() > currentIndex + 1) {
                history.removeLast();
            }
            
            history.add(url);
            currentIndex++;
        }
        
        public String back() {
            if (currentIndex > 0) {
                currentIndex--;
                return history.get(currentIndex);
            }
            return "Cannot go back";
        }
        
        public String forward() {
            if (currentIndex < history.size() - 1) {
                currentIndex++;
                return history.get(currentIndex);
            }
            return "Cannot go forward";
        }
        
        public String getCurrentPage() {
            if (currentIndex >= 0 && currentIndex < history.size()) {
                return history.get(currentIndex);
            }
            return "No page";
        }
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-purple-400 mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use LinkedList for frequent insertions/deletions at ends</li>
                      <li>• Prefer LinkedList for implementing queues and deques</li>
                      <li>• Use descendingIterator() for reverse traversal</li>
                      <li>• Avoid random access operations (use get() sparingly)</li>
                      <li>• Consider LinkedList for LRU cache implementations</li>
                      <li>• Use addFirst/addLast instead of add(0) for clarity</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-purple-400 mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Using LinkedList when random access is needed</li>
                      <li>• Not considering memory overhead (24 bytes per node)</li>
                      <li>• Using get(index) in loops (O(n²) complexity)</li>
                      <li>• Forgetting that LinkedList is not synchronized</li>
                      <li>• Not leveraging Deque operations for efficiency</li>
                      <li>• Using LinkedList when ArrayList would be better</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl mb-8">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">When to Use LinkedList</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-purple-300 font-bold mb-2">✅ Good Use Cases</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Implementing queue or deque</li>
                          <li>• Frequent insertions/deletions at both ends</li>
                          <li>• Building LRU cache</li>
                          <li>• Browser history (back/forward navigation)</li>
                          <li>• Undo/redo functionality</li>
                          <li>• Music playlist with frequent reordering</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-purple-300 font-bold mb-2">❌ Bad Use Cases</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Frequent random access by index</li>
                          <li>• Large datasets with memory constraints</li>
                          <li>• Mostly read operations with few modifications</li>
                          <li>• Need for fast search operations</li>
                          <li>• Binary search requirements</li>
                          <li>• Cache-friendly sequential access patterns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'hashmap':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="hashmap" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗺️ Java HashMap
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Hash table implementation, key-value pairs, hashing, collision handling, and comprehensive examples</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-emerald-600/10 to-green-600/10 border border-emerald-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-emerald-400 mb-6">What is HashMap?</h2>
                  <p className="text-lg text-gray-300 mb-4">HashMap is a hash table implementation of the Map interface. It stores key-value pairs and provides constant-time performance for basic operations like get and put.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-emerald-300">Key-Value Pairs:</strong> Stores data as key-value mappings</li>
                    <li>• <strong className="text-emerald-300">Hash Table:</strong> Uses hashing for fast access</li>
                    <li>• <strong className="text-emerald-300">No Order:</strong> Does not maintain insertion order</li>
                    <li>• <strong className="text-emerald-300">Unique Keys:</strong> Keys must be unique</li>
                    <li>• <strong className="text-emerald-300">Null Values:</strong> Allows one null key and multiple null values</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-emerald-300 mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        HashMap implements the <strong className="text-emerald-300">hash table pattern</strong> and <strong className="text-emerald-300">associative array pattern</strong> in data structure design. It provides O(1) average-case performance for basic operations.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The implementation uses <strong className="text-emerald-300">buckets</strong> and <strong className="text-emerald-300">hash codes</strong> to distribute elements evenly, with <strong className="text-emerald-300">collision resolution</strong> using chaining or open addressing.
                      </p>
                      <p className="text-gray-300">
                        Understanding HashMap is crucial for implementing <strong className="text-emerald-300">efficient</strong>, <strong className="text-emerald-300">scalable</strong>, and <strong className="text-emerald-300">high-performance</strong> Java applications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-emerald-400 mb-6">HashMap Characteristics</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-emerald-400 mb-4">Performance Characteristics</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Understanding HashMap performance is crucial for choosing the right data structure:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-emerald-300 font-bold mb-2">Time Complexity</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong>Get:</strong> O(1) average, O(n) worst case</li>
                              <li>• <strong>Put:</strong> O(1) average, O(n) worst case</li>
                              <li>• <strong>Remove:</strong> O(1) average, O(n) worst case</li>
                              <li>• <strong>Contains:</strong> O(1) average, O(n) worst case</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-emerald-300 font-bold mb-2">Space Complexity</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong>Storage:</strong> O(n) - Linear space</li>
                              <li>• <strong>Load Factor:</strong> 0.75 by default</li>
                              <li>• <strong>Buckets:</strong> Array of linked lists</li>
                              <li>• <strong>Resizing:</strong> Doubles capacity when needed</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-emerald-400 mb-4">Hashing and Collision Resolution</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          How HashMap handles key distribution and collisions:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-emerald-300 font-bold mb-2">Hash Function</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Uses hashCode() method</li>
                              <li>• Distributes keys evenly</li>
                              <li>• Consistent for same object</li>
                              <li>• Bucket index calculation</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-emerald-300 font-bold mb-2">Collision Resolution</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Separate chaining</li>
                              <li>• Linked list in buckets</li>
                              <li>• Tree structure for large chains</li>
                              <li>• Load factor threshold</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-emerald-400 mb-4">Comprehensive Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`import java.util.*;
import java.util.stream.Collectors;

public class HashMapExample {
    public static void main(String[] args) {
        System.out.println("=== Java HashMap Examples ===\\n");
        
        // 1. Creating HashMap
        System.out.println("1. Creating HashMap:");
        HashMap<String, Integer> ages = new HashMap<>();
        HashMap<String, String> capitals = new HashMap<>(Map.of(
            "USA", "Washington D.C.",
            "UK", "London",
            "France", "Paris"
        ));
        HashMap<Integer, String> numbers = new HashMap<>(16, 0.75f); // Initial capacity, load factor
        
        System.out.println("Empty ages map: " + ages);
        System.out.println("Capitals map: " + capitals);
        System.out.println("Numbers map: " + numbers);
        
        // 2. Adding Elements
        System.out.println("\\n2. Adding Elements:");
        ages.put("Alice", 25);
        ages.put("Bob", 30);
        ages.put("Charlie", 35);
        ages.put("Alice", 26); // Updates existing key
        
        System.out.println("After adding: " + ages);
        System.out.println("Size: " + ages.size());
        
        // 3. Accessing Elements
        System.out.println("\\n3. Accessing Elements:");
        System.out.println("Alice's age: " + ages.get("Alice"));
        System.out.println("Bob's age: " + ages.get("Bob"));
        System.out.println("David's age: " + ages.get("David")); // null
        
        // Using getOrDefault
        System.out.println("David's age (default): " + ages.getOrDefault("David", 0));
        
        // 4. Checking for Keys and Values
        System.out.println("\\n4. Checking for Keys and Values:");
        System.out.println("Contains key 'Alice': " + ages.containsKey("Alice"));
        System.out.println("Contains value 30: " + ages.containsValue(30));
        System.out.println("Is empty: " + ages.isEmpty());
        
        // 5. Updating Elements
        System.out.println("\\n5. Updating Elements:");
        Integer oldAge = ages.replace("Bob", 31);
        System.out.println("Bob's old age: " + oldAge);
        System.out.println("Bob's new age: " + ages.get("Bob"));
        
        // Using putIfAbsent
        ages.putIfAbsent("David", 28);
        System.out.println("After putIfAbsent: " + ages);
        
        // 6. Removing Elements
        System.out.println("\\n6. Removing Elements:");
        Integer removedAge = ages.remove("Charlie");
        System.out.println("Removed Charlie's age: " + removedAge);
        System.out.println("After removal: " + ages);
        
        boolean removed = ages.remove("Bob", 31);
        System.out.println("Removed Bob (age 31): " + removed);
        System.out.println("Final map: " + ages);
        
        // 7. Iterating Through HashMap
        System.out.println("\\n7. Iterating Through HashMap:");
        
        // Using keySet()
        System.out.print("Keys: ");
        for (String name : ages.keySet()) {
            System.out.print(name + " ");
        }
        System.out.println();
        
        // Using values()
        System.out.print("Values: ");
        for (Integer age : ages.values()) {
            System.out.print(age + " ");
        }
        System.out.println();
        
        // Using entrySet()
        System.out.print("Key-Value pairs: ");
        for (Map.Entry<String, Integer> entry : ages.entrySet()) {
            System.out.print(entry.getKey() + "=" + entry.getValue() + " ");
        }
        System.out.println();
        
        // Using forEach
        System.out.print("forEach: ");
        ages.forEach((name, age) -> System.out.print(name + "=" + age + " "));
        System.out.println();
        
        // 8. Working with Collections
        System.out.println("\\n8. Working with Collections:");
        HashMap<String, Integer> moreAges = new HashMap<>(Map.of("Eve", 27, "Frank", 32));
        ages.putAll(moreAges);
        System.out.println("After putAll: " + ages);
        
        // 9. HashMap Operations
        System.out.println("\\n9. HashMap Operations:");
        System.out.println("Key set: " + ages.keySet());
        System.out.println("Value collection: " + ages.values());
        System.out.println("Entry set: " + ages.entrySet());
        
        // 10. Sorting HashMap
        System.out.println("\\n10. Sorting HashMap:");
        
        // Sort by key
        Map<String, Integer> sortedByKey = ages.entrySet()
            .stream()
            .sorted(Map.Entry.comparingByKey())
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue,
                (e1, e2) -> e1,
                LinkedHashMap::new
            ));
        System.out.println("Sorted by key: " + sortedByKey);
        
        // Sort by value
        Map<String, Integer> sortedByValue = ages.entrySet()
            .stream()
            .sorted(Map.Entry.comparingByValue())
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue,
                (e1, e2) -> e1,
                LinkedHashMap::new
            ));
        System.out.println("Sorted by value: " + sortedByValue);
        
        // 11. Filtering HashMap
        System.out.println("\\n11. Filtering HashMap:");
        Map<String, Integer> youngPeople = ages.entrySet()
            .stream()
            .filter(entry -> entry.getValue() < 30)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue
            ));
        System.out.println("People under 30: " + youngPeople);
        
        // 12. Computing Values
        System.out.println("\\n12. Computing Values:");
        ages.compute("Alice", (key, value) -> value + 1);
        System.out.println("Alice's age after compute: " + ages.get("Alice"));
        
        ages.computeIfAbsent("Grace", key -> 29);
        System.out.println("Grace's age: " + ages.get("Grace"));
        
        ages.computeIfPresent("Bob", (key, value) -> value + 1);
        System.out.println("Bob's age after computeIfPresent: " + ages.get("Bob"));
        
        // 13. Merging Maps
        System.out.println("\\n13. Merging Maps:");
        HashMap<String, Integer> otherAges = new HashMap<>(Map.of("Alice", 30, "Henry", 40));
        otherAges.forEach((key, value) -> 
            ages.merge(key, value, (existing, newValue) -> Math.max(existing, newValue))
        );
        System.out.println("After merge: " + ages);
        
        // 14. Performance Testing
        System.out.println("\\n14. Performance Testing:");
        performanceTest();
        
        // 15. Working with Custom Objects
        System.out.println("\\n15. Working with Custom Objects:");
        workWithCustomObjects();
    }
    
    private static void performanceTest() {
        HashMap<Integer, String> map = new HashMap<>();
        int size = 100000;
        
        // Test insertion performance
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            map.put(i, "Value" + i);
        }
        long endTime = System.currentTimeMillis();
        System.out.println("Insertion time for " + size + " elements: " + (endTime - startTime) + "ms");
        
        // Test access performance
        startTime = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            map.get(i);
        }
        endTime = System.currentTimeMillis();
        System.out.println("Access time for " + size + " elements: " + (endTime - startTime) + "ms");
        
        // Test search performance
        startTime = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            map.containsKey(i);
        }
        endTime = System.currentTimeMillis();
        System.out.println("Search time for " + size + " elements: " + (endTime - startTime) + "ms");
    }
    
    private static void workWithCustomObjects() {
        HashMap<Person, String> personRoles = new HashMap<>();
        
        Person alice = new Person("Alice", 25);
        Person bob = new Person("Bob", 30);
        Person charlie = new Person("Charlie", 35);
        
        personRoles.put(alice, "Developer");
        personRoles.put(bob, "Manager");
        personRoles.put(charlie, "Designer");
        
        System.out.println("Person roles: " + personRoles);
        
        // Search by person
        System.out.println("Alice's role: " + personRoles.get(alice));
        
        // Filter by role
        Map<Person, String> developers = personRoles.entrySet()
            .stream()
            .filter(entry -> entry.getValue().equals("Developer"))
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue
            ));
        System.out.println("Developers: " + developers);
    }
    
    // Custom Person class with proper equals and hashCode
    static class Person {
        private String name;
        private int age;
        
        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
        
        public String getName() { return name; }
        public int getAge() { return age; }
        
        @Override
        public String toString() {
            return name + "(" + age + ")";
        }
        
        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Person person = (Person) obj;
            return age == person.age && Objects.equals(name, person.name);
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(name, age);
        }
    }
    
    // Utility methods for HashMap operations
    public static <K, V> void printHashMap(HashMap<K, V> map, String title) {
        System.out.println(title + ": " + map);
    }
    
    public static <K, V> HashMap<K, V> reverseHashMap(HashMap<K, V> map) {
        HashMap<K, V> reversed = new HashMap<>();
        map.entrySet().stream()
            .sorted(Map.Entry.<K, V>comparingByValue().reversed())
            .forEach(entry -> reversed.put(entry.getKey(), entry.getValue()));
        return reversed;
    }
    
    public static <K, V> HashMap<V, K> invertHashMap(HashMap<K, V> map) {
        HashMap<V, K> inverted = new HashMap<>();
        map.forEach((key, value) -> inverted.put(value, key));
        return inverted;
    }
    
    public static <K, V> HashMap<K, V> filterHashMap(HashMap<K, V> map, java.util.function.Predicate<Map.Entry<K, V>> predicate) {
        return map.entrySet().stream()
            .filter(predicate)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue,
                (e1, e2) -> e1,
                HashMap::new
            ));
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-emerald-400 mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use immutable objects as keys when possible</li>
                      <li>• Override equals() and hashCode() for custom key objects</li>
                      <li>• Choose appropriate initial capacity and load factor</li>
                      <li>• Use entrySet() for iteration when you need both key and value</li>
                      <li>• Consider ConcurrentHashMap for thread-safe operations</li>
                      <li>• Use compute() methods for atomic operations</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-emerald-400 mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Using mutable objects as keys</li>
                      <li>• Not overriding equals() and hashCode() properly</li>
                      <li>• Assuming HashMap maintains insertion order</li>
                      <li>• Not handling null keys/values appropriately</li>
                      <li>• Using HashMap in multi-threaded environments</li>
                      <li>• Not considering memory usage for large maps</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'hashset':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="hashset" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🎯 Java HashSet
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Unique elements, hash-based set implementation, no duplicates, and fast operations</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-orange-400 mb-6">What is HashSet?</h2>
                  <p className="text-lg text-gray-300 mb-4">HashSet is a collection that stores unique elements using a hash table. It implements the Set interface and does not allow duplicate values, making it ideal for scenarios where uniqueness is required.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-orange-300">Unique Elements:</strong> No duplicate values allowed</li>
                    <li>• <strong className="text-orange-300">Hash Table:</strong> Uses hashing for fast operations</li>
                    <li>• <strong className="text-orange-300">No Order:</strong> Does not maintain insertion order</li>
                    <li>• <strong className="text-orange-300">Null Values:</strong> Allows one null element</li>
                    <li>• <strong className="text-orange-300">Fast Operations:</strong> O(1) average time for add, remove, contains</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-orange-300 mb-3">Theoretical Foundation</h3>
                      <p className="text-gray-300 mb-3">
                        HashSet internally uses a <strong className="text-orange-300">HashMap</strong> to store elements. Each element in the HashSet is stored as a key in the HashMap with a dummy constant value.
                      </p>
                      <p className="text-gray-300 mb-3">
                        The uniqueness of elements is guaranteed by the HashMap's key uniqueness property. When you add an element, it's hashed and stored in a bucket, ensuring O(1) average-case performance.
                      </p>
                      <p className="text-gray-300">
                        Understanding HashSet is crucial for implementing <strong className="text-orange-300">deduplication</strong>, <strong className="text-orange-300">membership testing</strong>, and <strong className="text-orange-300">set operations</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-orange-400 mb-6">HashSet Characteristics</h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-orange-400 mb-4">Performance Characteristics</h3>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">Time Complexity</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong>Add:</strong> O(1) average, O(n) worst case</li>
                              <li>• <strong>Remove:</strong> O(1) average, O(n) worst case</li>
                              <li>• <strong>Contains:</strong> O(1) average, O(n) worst case</li>
                              <li>• <strong>Size:</strong> O(1) constant time</li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">Space Complexity</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• <strong>Storage:</strong> O(n) linear space</li>
                              <li>• <strong>Load Factor:</strong> Default 0.75</li>
                              <li>• <strong>Initial Capacity:</strong> Default 16</li>
                              <li>• <strong>Rehashing:</strong> When load factor exceeded</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-orange-400 mb-4">Set Operations</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          HashSet supports mathematical set operations:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">Union</h4>
                            <p className="text-sm text-gray-300">addAll() - Combines two sets</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">Intersection</h4>
                            <p className="text-sm text-gray-300">retainAll() - Common elements</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">Difference</h4>
                            <p className="text-sm text-gray-300">removeAll() - Elements in A but not in B</p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-orange-300 font-bold mb-2">Subset</h4>
                            <p className="text-sm text-gray-300">containsAll() - Check if subset</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-orange-400 mb-4">Comprehensive HashSet Example</h3>
                  <pre className="text-green-400 font-mono text-sm">{`import java.util.*;

public class HashSetExample {
    public static void main(String[] args) {
        System.out.println("=== Java HashSet Examples ===\\n");
        
        // 1. Creating HashSet
        System.out.println("1. Creating HashSet:");
        HashSet<String> fruits = new HashSet<>();
        HashSet<Integer> numbers = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        HashSet<String> colors = new HashSet<>(16, 0.75f); // Initial capacity, load factor
        
        System.out.println("Empty fruits set: " + fruits);
        System.out.println("Numbers set: " + numbers);
        
        // 2. Adding Elements
        System.out.println("\\n2. Adding Elements:");
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Apple"); // Duplicate - won't be added
        
        System.out.println("After adding: " + fruits);
        System.out.println("Size: " + fruits.size());
        
        // 3. Checking for Elements
        System.out.println("\\n3. Checking for Elements:");
        System.out.println("Contains 'Apple': " + fruits.contains("Apple"));
        System.out.println("Contains 'Grape': " + fruits.contains("Grape"));
        System.out.println("Is empty: " + fruits.isEmpty());
        
        // 4. Removing Elements
        System.out.println("\\n4. Removing Elements:");
        boolean removed = fruits.remove("Banana");
        System.out.println("Removed 'Banana': " + removed);
        System.out.println("After removal: " + fruits);
        
        // 5. Iterating Through HashSet
        System.out.println("\\n5. Iterating Through HashSet:");
        
        // Enhanced for loop
        System.out.print("Enhanced for: ");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println();
        
        // Iterator
        System.out.print("Iterator: ");
        Iterator<String> iterator = fruits.iterator();
        while (iterator.hasNext()) {
            System.out.print(iterator.next() + " ");
        }
        System.out.println();
        
        // forEach
        System.out.print("forEach: ");
        fruits.forEach(fruit -> System.out.print(fruit + " "));
        System.out.println();
        
        // 6. Set Operations
        System.out.println("\\n6. Set Operations:");
        HashSet<Integer> setA = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        HashSet<Integer> setB = new HashSet<>(Arrays.asList(4, 5, 6, 7, 8));
        
        // Union
        HashSet<Integer> union = new HashSet<>(setA);
        union.addAll(setB);
        System.out.println("Union: " + union);
        
        // Intersection
        HashSet<Integer> intersection = new HashSet<>(setA);
        intersection.retainAll(setB);
        System.out.println("Intersection: " + intersection);
        
        // Difference
        HashSet<Integer> difference = new HashSet<>(setA);
        difference.removeAll(setB);
        System.out.println("Difference (A - B): " + difference);
        
        // Subset check
        HashSet<Integer> subset = new HashSet<>(Arrays.asList(2, 3));
        System.out.println("Is {2, 3} subset of setA: " + setA.containsAll(subset));
        
        // 7. Converting to Array
        System.out.println("\\n7. Converting to Array:");
        String[] fruitArray = fruits.toArray(new String[0]);
        System.out.println("Array: " + Arrays.toString(fruitArray));
        
        // 8. Bulk Operations
        System.out.println("\\n8. Bulk Operations:");
        HashSet<String> moreFruits = new HashSet<>(Arrays.asList("Mango", "Pineapple"));
        fruits.addAll(moreFruits);
        System.out.println("After addAll: " + fruits);
        
        // 9. Removing Duplicates from List
        System.out.println("\\n9. Removing Duplicates from List:");
        List<Integer> listWithDuplicates = Arrays.asList(1, 2, 2, 3, 3, 3, 4, 4, 5);
        HashSet<Integer> uniqueNumbers = new HashSet<>(listWithDuplicates);
        System.out.println("Original list: " + listWithDuplicates);
        System.out.println("After removing duplicates: " + uniqueNumbers);
        
        // 10. Stream Operations
        System.out.println("\\n10. Stream Operations:");
        HashSet<String> names = new HashSet<>(Arrays.asList("Alice", "Bob", "Charlie", "David"));
        
        // Filter
        Set<String> longNames = names.stream()
            .filter(name -> name.length() > 4)
            .collect(Collectors.toSet());
        System.out.println("Names with length > 4: " + longNames);
        
        // Map
        Set<String> upperNames = names.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toSet());
        System.out.println("Uppercase names: " + upperNames);
        
        // 11. Custom Objects in HashSet
        System.out.println("\\n11. Custom Objects in HashSet:");
        demonstrateCustomObjects();
    }
    
    private static void demonstrateCustomObjects() {
        HashSet<Person> people = new HashSet<>();
        
        people.add(new Person("Alice", 25));
        people.add(new Person("Bob", 30));
        people.add(new Person("Alice", 25)); // Duplicate
        
        System.out.println("People set: " + people);
        System.out.println("Size: " + people.size());
        
        Person searchPerson = new Person("Alice", 25);
        System.out.println("Contains Alice(25): " + people.contains(searchPerson));
    }
    
    // Custom Person class with proper equals() and hashCode()
    static class Person {
        private String name;
        private int age;
        
        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
        
        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Person person = (Person) obj;
            return age == person.age && Objects.equals(name, person.name);
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(name, age);
        }
        
        @Override
        public String toString() {
            return name + "(" + age + ")";
        }
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-orange-400 mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Override equals() and hashCode() for custom objects</li>
                      <li>• Use HashSet for fast membership testing</li>
                      <li>• Consider initial capacity for large sets</li>
                      <li>• Use HashSet to remove duplicates from collections</li>
                      <li>• Prefer LinkedHashSet if insertion order matters</li>
                      <li>• Use TreeSet if sorted order is needed</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-orange-400 mb-3">Common Pitfalls</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Not overriding equals() and hashCode() for custom objects</li>
                      <li>• Assuming HashSet maintains order</li>
                      <li>• Using mutable objects that change after insertion</li>
                      <li>• Not considering thread safety (use ConcurrentHashMap.newKeySet())</li>
                      <li>• Expecting indexed access (use ArrayList instead)</li>
                      <li>• Not handling null values properly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'iterator':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="iterator" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔄 Java Iterator
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Collection traversal, iteration patterns, and safe element removal</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-teal-600/10 to-cyan-600/10 border border-teal-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-teal-400 mb-6">What is Iterator?</h2>
                  <p className="text-lg text-gray-300 mb-4">Iterator is an interface that provides methods to iterate over any Collection. It's a universal way to traverse collections and allows safe removal of elements during iteration.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-teal-300">Universal Traversal:</strong> Works with any Collection type</li>
                    <li>• <strong className="text-teal-300">Safe Removal:</strong> Remove elements during iteration</li>
                    <li>• <strong className="text-teal-300">Forward-Only:</strong> Moves in one direction</li>
                    <li>• <strong className="text-teal-300">Fail-Fast:</strong> Throws ConcurrentModificationException if collection modified</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-teal-300 mb-3">Iterator Methods</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong className="text-teal-300">hasNext():</strong> Returns true if more elements exist</li>
                        <li>• <strong className="text-teal-300">next():</strong> Returns the next element</li>
                        <li>• <strong className="text-teal-300">remove():</strong> Removes the last element returned by next()</li>
                        <li>• <strong className="text-teal-300">forEachRemaining():</strong> Performs action on remaining elements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-teal-400 mb-4">Iterator Examples</h3>
                  <pre className="text-green-400 font-mono text-sm">{`import java.util.*;

public class IteratorExample {
    public static void main(String[] args) {
        System.out.println("=== Java Iterator Examples ===\\n");
        
        // 1. Basic Iterator Usage
        System.out.println("1. Basic Iterator Usage:");
        ArrayList<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Orange", "Mango"));
        
        Iterator<String> iterator = fruits.iterator();
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            System.out.println(fruit);
        }
        
        // 2. Removing Elements During Iteration
        System.out.println("\\n2. Removing Elements During Iteration:");
        iterator = fruits.iterator();
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            if (fruit.startsWith("B")) {
                iterator.remove(); // Safe removal
            }
        }
        System.out.println("After removal: " + fruits);
        
        // 3. ListIterator (Bidirectional)
        System.out.println("\\n3. ListIterator (Bidirectional):");
        ListIterator<String> listIterator = fruits.listIterator();
        
        // Forward iteration
        System.out.print("Forward: ");
        while (listIterator.hasNext()) {
            System.out.print(listIterator.next() + " ");
        }
        System.out.println();
        
        // Backward iteration
        System.out.print("Backward: ");
        while (listIterator.hasPrevious()) {
            System.out.print(listIterator.previous() + " ");
        }
        System.out.println();
        
        // 4. forEachRemaining()
        System.out.println("\\n4. forEachRemaining():");
        iterator = fruits.iterator();
        iterator.forEachRemaining(fruit -> System.out.println("Processing: " + fruit));
        
        // 5. Iterator with HashSet
        System.out.println("\\n5. Iterator with HashSet:");
        HashSet<Integer> numbers = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        Iterator<Integer> numIterator = numbers.iterator();
        while (numIterator.hasNext()) {
            Integer num = numIterator.next();
            if (num % 2 == 0) {
                numIterator.remove();
            }
        }
        System.out.println("Odd numbers only: " + numbers);
        
        // 6. Iterator with HashMap
        System.out.println("\\n6. Iterator with HashMap:");
        HashMap<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 25);
        ages.put("Bob", 30);
        ages.put("Charlie", 35);
        
        Iterator<Map.Entry<String, Integer>> entryIterator = ages.entrySet().iterator();
        while (entryIterator.hasNext()) {
            Map.Entry<String, Integer> entry = entryIterator.next();
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`}</pre>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl mb-8">
                  <h3 className="text-xl font-bold text-teal-400 mb-4">Iterator vs Enhanced For Loop</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-teal-300 font-bold mb-2">Use Iterator When</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Need to remove elements during iteration</li>
                        <li>• Need bidirectional traversal (ListIterator)</li>
                        <li>• Need to modify collection structure</li>
                        <li>• Working with legacy code</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-teal-300 font-bold mb-2">Use Enhanced For When</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Only reading elements</li>
                        <li>• Simpler, more readable code needed</li>
                        <li>• No need to modify collection</li>
                        <li>• Forward-only iteration is sufficient</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'wrapper-classes':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="wrapper-classes" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📦 Java Wrapper Classes
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Primitive to object conversion, autoboxing, unboxing, and utility methods</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-indigo-400 mb-6">What are Wrapper Classes?</h2>
                  <p className="text-lg text-gray-300 mb-4">Wrapper classes provide a way to use primitive data types as objects. They wrap primitive values in an object so they can be used in contexts that require objects, such as collections.</p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-indigo-300 mb-3">Primitive to Wrapper Mapping</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <ul className="text-gray-300 space-y-2">
                            <li>• <code className="text-white">byte</code> → <code className="text-indigo-300">Byte</code></li>
                            <li>• <code className="text-white">short</code> → <code className="text-indigo-300">Short</code></li>
                            <li>• <code className="text-white">int</code> → <code className="text-indigo-300">Integer</code></li>
                            <li>• <code className="text-white">long</code> → <code className="text-indigo-300">Long</code></li>
                          </ul>
                        </div>
                        <div>
                          <ul className="text-gray-300 space-y-2">
                            <li>• <code className="text-white">float</code> → <code className="text-indigo-300">Float</code></li>
                            <li>• <code className="text-white">double</code> → <code className="text-indigo-300">Double</code></li>
                            <li>• <code className="text-white">char</code> → <code className="text-indigo-300">Character</code></li>
                            <li>• <code className="text-white">boolean</code> → <code className="text-indigo-300">Boolean</code></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-indigo-400 mb-4">Wrapper Classes Examples</h3>
                  <pre className="text-green-400 font-mono text-sm">{`import java.util.*;

public class WrapperExample {
    public static void main(String[] args) {
        System.out.println("=== Java Wrapper Classes ===\\n");
        
        // 1. Creating Wrapper Objects
        System.out.println("1. Creating Wrapper Objects:");
        Integer num1 = Integer.valueOf(10);
        Integer num2 = 20; // Autoboxing
        Double d1 = Double.valueOf(3.14);
        Boolean b1 = Boolean.valueOf(true);
        Character c1 = Character.valueOf('A');
        
        System.out.println("Integer: " + num1);
        System.out.println("Double: " + d1);
        System.out.println("Boolean: " + b1);
        System.out.println("Character: " + c1);
        
        // 2. Autoboxing and Unboxing
        System.out.println("\\n2. Autoboxing and Unboxing:");
        // Autoboxing (primitive to wrapper)
        Integer autoBoxed = 100;
        
        // Unboxing (wrapper to primitive)
        int unboxed = autoBoxed;
        
        System.out.println("Autoboxed: " + autoBoxed);
        System.out.println("Unboxed: " + unboxed);
        
        // 3. Parsing Strings to Primitives
        System.out.println("\\n3. Parsing Strings:");
        String numStr = "123";
        int parsedInt = Integer.parseInt(numStr);
        double parsedDouble = Double.parseDouble("45.67");
        boolean parsedBool = Boolean.parseBoolean("true");
        
        System.out.println("Parsed int: " + parsedInt);
        System.out.println("Parsed double: " + parsedDouble);
        System.out.println("Parsed boolean: " + parsedBool);
        
        // 4. Converting to String
        System.out.println("\\n4. Converting to String:");
        Integer number = 456;
        String str1 = number.toString();
        String str2 = Integer.toString(789);
        String str3 = String.valueOf(101112);
        
        System.out.println("toString(): " + str1);
        System.out.println("Integer.toString(): " + str2);
        System.out.println("String.valueOf(): " + str3);
        
        // 5. Comparing Wrapper Objects
        System.out.println("\\n5. Comparing Wrapper Objects:");
        Integer a = 127;
        Integer b = 127;
        Integer c = 128;
        Integer d = 128;
        
        System.out.println("a == b (127): " + (a == b)); // true (cached)
        System.out.println("c == d (128): " + (c == d)); // false (not cached)
        System.out.println("c.equals(d): " + c.equals(d)); // true
        
        // 6. Utility Methods
        System.out.println("\\n6. Utility Methods:");
        System.out.println("MAX_VALUE: " + Integer.MAX_VALUE);
        System.out.println("MIN_VALUE: " + Integer.MIN_VALUE);
        System.out.println("Compare 10 and 20: " + Integer.compare(10, 20));
        System.out.println("Is digit '5': " + Character.isDigit('5'));
        System.out.println("Is letter 'A': " + Character.isLetter('A'));
        System.out.println("To uppercase 'a': " + Character.toUpperCase('a'));
        
        // 7. Using in Collections
        System.out.println("\\n7. Using in Collections:");
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(10); // Autoboxing
        numbers.add(20);
        numbers.add(30);
        
        int sum = 0;
        for (Integer num : numbers) {
            sum += num; // Unboxing
        }
        System.out.println("Sum: " + sum);
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-indigo-400 mb-3">Advantages</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Can be used in collections (ArrayList, HashMap, etc.)</li>
                      <li>• Can be null (primitives cannot)</li>
                      <li>• Provide utility methods for conversion and comparison</li>
                      <li>• Support for generic types</li>
                      <li>• Can be serialized</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-indigo-400 mb-3">Important Notes</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Wrapper objects are immutable</li>
                      <li>• Integer cache: -128 to 127 are cached</li>
                      <li>• Use equals() for comparison, not ==</li>
                      <li>• Autoboxing can cause NullPointerException</li>
                      <li>• Performance overhead compared to primitives</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'exceptions-advanced':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="exceptions-advanced" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ⚠️ Java Exceptions
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Error handling, try-catch-finally, custom exceptions, and best practices</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-red-400 mb-6">What are Exceptions?</h2>
                  <p className="text-lg text-gray-300 mb-4">Exceptions are events that disrupt the normal flow of program execution. Java provides a robust exception handling mechanism to handle runtime errors and maintain normal application flow.</p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-red-300 mb-3">Exception Hierarchy</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• <strong className="text-red-300">Throwable:</strong> Root class for all errors and exceptions</li>
                        <li>• <strong className="text-red-300">Error:</strong> Serious problems (OutOfMemoryError, StackOverflowError)</li>
                        <li>• <strong className="text-red-300">Exception:</strong> Conditions that programs should catch</li>
                        <li>• <strong className="text-red-300">RuntimeException:</strong> Unchecked exceptions (NullPointerException, ArrayIndexOutOfBoundsException)</li>
                        <li>• <strong className="text-red-300">Checked Exceptions:</strong> Must be caught or declared (IOException, SQLException)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">Exception Handling Examples</h3>
                  <pre className="text-green-400 font-mono text-sm">{`import java.io.*;
import java.util.*;

public class ExceptionExample {
    public static void main(String[] args) {
        System.out.println("=== Java Exception Handling ===\\n");
        
        // 1. Basic try-catch
        System.out.println("1. Basic try-catch:");
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // 2. Multiple catch blocks
        System.out.println("\\n2. Multiple catch blocks:");
        try {
            String str = null;
            System.out.println(str.length());
        } catch (NullPointerException e) {
            System.out.println("Null pointer: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("General exception: " + e.getMessage());
        }
        
        // 3. try-catch-finally
        System.out.println("\\n3. try-catch-finally:");
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index error");
        } finally {
            System.out.println("Finally block always executes");
        }
        
        // 4. try-with-resources
        System.out.println("\\n4. try-with-resources:");
        try (BufferedReader br = new BufferedReader(new FileReader("test.txt"))) {
            String line = br.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("File not found or error reading");
        }
        
        // 5. Throwing exceptions
        System.out.println("\\n5. Throwing exceptions:");
        try {
            validateAge(15);
        } catch (IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
        
        // 6. Custom exceptions
        System.out.println("\\n6. Custom exceptions:");
        try {
            processPayment(-100);
        } catch (InsufficientFundsException e) {
            System.out.println("Payment error: " + e.getMessage());
        }
        
        // 7. Chained exceptions
        System.out.println("\\n7. Chained exceptions:");
        try {
            methodWithChainedExceptions();
        } catch (Exception e) {
            System.out.println("Main error: " + e.getMessage());
            System.out.println("Caused by: " + e.getCause());
        }
    }
    
    static void validateAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("Age must be 18 or older");
        }
    }
    
    static void processPayment(double amount) throws InsufficientFundsException {
        if (amount < 0) {
            throw new InsufficientFundsException("Amount cannot be negative: " + amount);
        }
    }
    
    static void methodWithChainedExceptions() throws Exception {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            throw new Exception("Failed to calculate", e);
        }
    }
}

// Custom Exception
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-red-400 mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Catch specific exceptions, not generic Exception</li>
                      <li>• Use try-with-resources for auto-closing resources</li>
                      <li>• Don't catch exceptions you can't handle</li>
                      <li>• Log exceptions with proper context</li>
                      <li>• Create custom exceptions for business logic</li>
                      <li>• Don't use exceptions for control flow</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-red-400 mb-3">Common Exceptions</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• NullPointerException - null reference access</li>
                      <li>• ArrayIndexOutOfBoundsException - invalid array index</li>
                      <li>• NumberFormatException - invalid number format</li>
                      <li>• IOException - I/O operation failed</li>
                      <li>• SQLException - database access error</li>
                      <li>• ClassNotFoundException - class not found</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'regex':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="regex" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔍 Java RegEx
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">Regular expressions, pattern matching, string validation, and text processing</p>
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-pink-600/10 to-purple-600/10 border border-pink-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-pink-400 mb-6">What is RegEx?</h2>
                  <p className="text-lg text-gray-300 mb-4">Regular Expressions (RegEx) are sequences of characters that define search patterns. They're used for string matching, validation, and text processing operations.</p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-pink-300 mb-3">Common RegEx Patterns</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• <code className="text-white">.</code> - Any character</li>
                            <li>• <code className="text-white">^</code> - Start of string</li>
                            <li>• <code className="text-white">$</code> - End of string</li>
                            <li>• <code className="text-white">*</code> - Zero or more</li>
                            <li>• <code className="text-white">+</code> - One or more</li>
                            <li>• <code className="text-white">?</code> - Zero or one</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• <code className="text-white">\\d</code> - Any digit</li>
                            <li>• <code className="text-white">\\w</code> - Any word character</li>
                            <li>• <code className="text-white">\\s</code> - Any whitespace</li>
                            <li>• <code className="text-white">[abc]</code> - Any of a, b, or c</li>
                            <li>• <code className="text-white">[^abc]</code> - Not a, b, or c</li>
                            <li>• <code className="text-white">(a|b)</code> - a or b</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-pink-400 mb-4">RegEx Examples</h3>
                  <pre className="text-green-400 font-mono text-sm">{`import java.util.regex.*;

public class RegExExample {
    public static void main(String[] args) {
        System.out.println("=== Java Regular Expressions ===\\n");
        
        // 1. Basic Pattern Matching
        System.out.println("1. Basic Pattern Matching:");
        String text = "Hello World 123";
        String pattern = "World";
        
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(text);
        
        if (m.find()) {
            System.out.println("Pattern found at index: " + m.start());
        }
        
        // 2. Email Validation
        System.out.println("\\n2. Email Validation:");
        String email1 = "user@example.com";
        String email2 = "invalid-email";
        String emailPattern = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,}$";
        
        System.out.println(email1 + " is valid: " + email1.matches(emailPattern));
        System.out.println(email2 + " is valid: " + email2.matches(emailPattern));
        
        // 3. Phone Number Validation
        System.out.println("\\n3. Phone Number Validation:");
        String phone1 = "123-456-7890";
        String phone2 = "1234567890";
        String phonePattern = "\\\\d{3}-\\\\d{3}-\\\\d{4}";
        
        System.out.println(phone1 + " matches: " + phone1.matches(phonePattern));
        System.out.println(phone2 + " matches: " + phone2.matches(phonePattern));
        
        // 4. Finding All Matches
        System.out.println("\\n4. Finding All Matches:");
        String sentence = "The price is $10, $20, and $30";
        Pattern pricePattern = Pattern.compile("\\\\$\\\\d+");
        Matcher priceMatcher = pricePattern.matcher(sentence);
        
        while (priceMatcher.find()) {
            System.out.println("Found: " + priceMatcher.group());
        }
        
        // 5. String Replacement
        System.out.println("\\n5. String Replacement:");
        String original = "Hello World World";
        String replaced = original.replaceAll("World", "Java");
        System.out.println("Original: " + original);
        System.out.println("Replaced: " + replaced);
        
        // 6. Splitting Strings
        System.out.println("\\n6. Splitting Strings:");
        String csv = "apple,banana,orange,grape";
        String[] fruits = csv.split(",");
        System.out.println("Fruits: " + Arrays.toString(fruits));
        
        // 7. Password Validation
        System.out.println("\\n7. Password Validation:");
        String password = "Pass123!";
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d)(?=.*[@$!%*?&])[A-Za-z\\\\d@$!%*?&]{8,}$";
        System.out.println(password + " is valid: " + password.matches(passwordPattern));
        
        // 8. Extracting Groups
        System.out.println("\\n8. Extracting Groups:");
        String date = "2024-01-15";
        Pattern datePattern = Pattern.compile("(\\\\d{4})-(\\\\d{2})-(\\\\d{2})");
        Matcher dateMatcher = datePattern.matcher(date);
        
        if (dateMatcher.find()) {
            System.out.println("Year: " + dateMatcher.group(1));
            System.out.println("Month: " + dateMatcher.group(2));
            System.out.println("Day: " + dateMatcher.group(3));
        }
    }
}`}</pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-pink-400 mb-3">Common Use Cases</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Email validation</li>
                      <li>• Phone number formatting</li>
                      <li>• Password strength checking</li>
                      <li>• URL validation</li>
                      <li>• Data extraction from text</li>
                      <li>• Input sanitization</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-pink-400 mb-3">Best Practices</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Compile patterns once and reuse</li>
                      <li>• Use raw strings for patterns (avoid escaping)</li>
                      <li>• Test patterns thoroughly</li>
                      <li>• Keep patterns simple and readable</li>
                      <li>• Use named groups for clarity</li>
                      <li>• Consider performance for large texts</li>
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
                ☕ Practice Projects
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Build real-world applications to master Java
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-gray-600">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Bank Management System</h3>
                    <p className="text-gray-300 mb-4">Create a console-based banking application with account management, transactions, and user authentication.</p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Object-oriented design</li>
                      <li>• File I/O for data persistence</li>
                      <li>• Exception handling</li>
                      <li>• Collections framework</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-gray-600">
                    <h3 className="text-xl font-bold text-white mb-4">E-commerce REST API</h3>
                    <p className="text-gray-300 mb-4">Build a RESTful API for an e-commerce platform using Spring Boot, JPA, and MySQL.</p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Spring Boot framework</li>
                      <li>• JPA/Hibernate for data access</li>
                      <li>• RESTful API design</li>
                      <li>• Security with JWT</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-gray-600">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Microservices Architecture</h3>
                    <p className="text-gray-300 mb-4">Design and implement a microservices-based system with Spring Cloud.</p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Spring Cloud Gateway</li>
                      <li>• Service discovery</li>
                      <li>• Circuit breakers</li>
                      <li>• Distributed configuration</li>
                    </ul>
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
                ☕ Java Video Tutorials
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Learn Java through comprehensive video tutorials
              </p>
              
              <div className="max-w-6xl mx-auto">
                <VideoSection videos={[]} title="Java Video Tutorials" />
              </div>
            </div>
          </main>
        );

      case 'arrays-collections':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">Java Collections</h1>
            
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Collections in Java</h2>
              <p className="text-lg text-gray-300 mb-6">
                The Java Collections Framework provides a set of classes and interfaces for storing and manipulating groups of data as a single unit.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Collection Interface</h2>
              <p className="text-gray-300 mb-6">
                The root interface in the collection hierarchy. A collection represents a group of objects, known as its elements.
              </p>
              
              <div className="bg-gray-900/50 border border-emerald-500/30 rounded p-6">
                <h3 className="text-xl font-bold text-white mb-4">Key Methods</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-rose-900/30">
                        <th className="border border-gray-600 px-4 py-3 text-left text-white">Method</th>
                        <th className="border border-gray-600 px-4 py-3 text-left text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="bg-gray-900/30">
                        <td className="border border-gray-600 px-4 py-3"><code className="text-white">add(E e)</code></td>
                        <td className="border border-gray-600 px-4 py-3">Adds an element to the collection</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-3"><code className="text-white">remove(Object o)</code></td>
                        <td className="border border-gray-600 px-4 py-3">Removes an element from the collection</td>
                      </tr>
                      <tr className="bg-gray-900/30">
                        <td className="border border-gray-600 px-4 py-3"><code className="text-white">size()</code></td>
                        <td className="border border-gray-600 px-4 py-3">Returns the number of elements</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-3"><code className="text-white">isEmpty()</code></td>
                        <td className="border border-gray-600 px-4 py-3">Returns true if collection is empty</td>
                      </tr>
                      <tr className="bg-gray-900/30">
                        <td className="border border-gray-600 px-4 py-3"><code className="text-white">contains(Object o)</code></td>
                        <td className="border border-gray-600 px-4 py-3">Returns true if element exists</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Collections Class</h2>
              <p className="text-gray-300 mb-6">
                The Collections class consists exclusively of static methods that operate on or return collections.
              </p>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9);
        
        // Sort the list
        Collections.sort(numbers);
        System.out.println("Sorted: " + numbers); // [1, 2, 5, 8, 9]
        
        // Reverse the list
        Collections.reverse(numbers);
        System.out.println("Reversed: " + numbers); // [9, 8, 5, 2, 1]
        
        // Shuffle the list
        Collections.shuffle(numbers);
        System.out.println("Shuffled: " + numbers);
        
        // Find max and min
        System.out.println("Max: " + Collections.max(numbers));
        System.out.println("Min: " + Collections.min(numbers));
        
        // Fill list with same value
        List<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        Collections.fill(list, "X");
        System.out.println("Filled: " + list); // [X, X]
    }
}`}</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Iterator in Java</h2>
              <p className="text-gray-300 mb-6">
                An Iterator is an interface that provides methods to iterate over any Collection.
              </p>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`import java.util.*;

public class IteratorDemo {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("Apple", "Banana", "Orange");
        
        // Using Iterator
        Iterator<String> iterator = fruits.iterator();
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            System.out.println(fruit);
        }
        
        // Using enhanced for loop (for-each)
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
        
        // Using forEach with lambda
        fruits.forEach(fruit -> System.out.println(fruit));
    }
}`}</code>
              </pre>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Java Comparator Interface</h2>
              <p className="text-gray-300 mb-6">
                A functional interface used for ordering objects of user-defined classes.
              </p>
              
              <pre className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`import java.util.*;

class Student {
    String name;
    int age;
    
    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}

public class ComparatorDemo {
    public static void main(String[] args) {
        List<Student> students = Arrays.asList(
            new Student("Alice", 20),
            new Student("Bob", 18),
            new Student("Charlie", 22)
        );
        
        // Sort by age using Comparator
        Collections.sort(students, new Comparator<Student>() {
            public int compare(Student s1, Student s2) {
                return s1.age - s2.age;
            }
        });
        
        System.out.println("Sorted by age: " + students);
        
        // Sort by name using lambda
        students.sort((s1, s2) -> s1.name.compareTo(s2.name));
        System.out.println("Sorted by name: " + students);
    }
}`}</code>
              </pre>
            </div>
          </div>
        );

      default:
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ☕ Java Learning Hub
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
    <TechLayout onThisPage={pageHeadings} technology="java" activeSection={activeSection} setActiveSection={setActiveSection}>
      <div>
        {renderContent()}
      </div>
    </TechLayout>
  );
}