'use client';

import { useState, useEffect } from 'react';
import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';
import { AUTH_SYSTEM_AVAILABLE } from '@/config/authStatus';

export default function PythonPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    AUTH_SYSTEM_AVAILABLE ? null : true
  );

  // Note: isAuthenticated is used in conditional return below

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
    { id: 'introduction', title: 'Python Tutorial' },
    { id: 'basics', title: 'Python Basics' },
    { id: 'syntax', title: 'Python Syntax' },
    { id: 'comments', title: 'Python Comments' },
    { id: 'variables', title: 'Python Variables' },
    { id: 'data-types', title: 'Python Data Types' },
    { id: 'numbers', title: 'Python Numbers' },
    { id: 'casting', title: 'Python Casting' },
    { id: 'strings', title: 'Python Strings' },
    { id: 'booleans', title: 'Python Booleans' },
    { id: 'operators', title: 'Python Operators' },
    { id: 'lists', title: 'Python Lists' },
    { id: 'tuples', title: 'Python Tuples' },
    { id: 'sets', title: 'Python Sets' },
    { id: 'dictionaries', title: 'Python Dictionaries' },
    { id: 'if-else', title: 'Python If...Else' },
    { id: 'while-loops', title: 'Python While Loops' },
    { id: 'for-loops', title: 'Python For Loops' },
    { id: 'functions', title: 'Python Functions' },
    { id: 'lambda', title: 'Python Lambda' },
    { id: 'arrays', title: 'Python Arrays' },
    { id: 'classes-objects', title: 'Python Classes/Objects' },
    { id: 'inheritance', title: 'Python Inheritance' },
    { id: 'iterators', title: 'Python Iterators' },
    { id: 'scope', title: 'Python Scope' },
    { id: 'modules', title: 'Python Modules' },
    { id: 'dates', title: 'Python Dates' },
    { id: 'json', title: 'Python JSON' },
    { id: 'regex', title: 'Python RegEx' },
    { id: 'pip', title: 'Python PIP' },
    { id: 'try-except', title: 'Python Try...Except' },
    { id: 'file-handling', title: 'Python File Handling' },
    { id: 'advanced', title: 'Python Advanced' },
    { id: 'practice-projects', title: 'Practice Projects' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    // New comprehensive sections
    { id: 'python-versions', title: 'Python Versions & Installation' },
    { id: 'virtual-environments', title: 'Virtual Environments' },
    { id: 'string-methods', title: 'Python String Methods' },
    { id: 'list-methods', title: 'Python List Methods' },
    { id: 'dict-methods', title: 'Python Dictionary Methods' },
    { id: 'set-methods', title: 'Python Set Methods' },
    { id: 'tuple-methods', title: 'Python Tuple Methods' },
    { id: 'built-in-functions', title: 'Python Built-in Functions' },
    { id: 'user-input', title: 'Python User Input' },
    { id: 'math-operations', title: 'Python Math Operations' },
    { id: 'random-module', title: 'Python Random Module' },
    { id: 'datetime-module', title: 'Python DateTime Module' },
    { id: 'os-module', title: 'Python OS Module' },
    { id: 'sys-module', title: 'Python Sys Module' },
    { id: 'collections-module', title: 'Python Collections Module' },
    { id: 'itertools-module', title: 'Python Itertools Module' },
    { id: 'functools-module', title: 'Python Functools Module' },
    { id: 'generators', title: 'Python Generators' },
    { id: 'decorators', title: 'Python Decorators' },
    { id: 'context-managers', title: 'Python Context Managers' },
    { id: 'metaclasses', title: 'Python Metaclasses' },
    { id: 'descriptors', title: 'Python Descriptors' },
    { id: 'properties', title: 'Python Properties' },
    { id: 'abstract-base-classes', title: 'Python Abstract Base Classes' },
    { id: 'protocols', title: 'Python Protocols' },
    { id: 'dataclasses', title: 'Python Dataclasses' },
    { id: 'enums', title: 'Python Enums' },
    { id: 'typing-module', title: 'Python Typing Module' },
    { id: 'type-hints', title: 'Python Type Hints' },
    { id: 'pathlib', title: 'Python Pathlib' },
    { id: 'logging', title: 'Python Logging' },
    { id: 'unittest', title: 'Python Unit Testing' },
    { id: 'pytest', title: 'Python Pytest' },
    { id: 'asyncio', title: 'Python AsyncIO' },
    { id: 'multiprocessing', title: 'Python Multiprocessing' },
    { id: 'threading', title: 'Python Threading' },
    { id: 'concurrent-futures', title: 'Python Concurrent Futures' },
    { id: 'queue-module', title: 'Python Queue Module' },
    { id: 'socket-programming', title: 'Python Socket Programming' },
    { id: 'http-requests', title: 'Python HTTP Requests' },
    { id: 'web-scraping', title: 'Python Web Scraping' },
    { id: 'data-analysis', title: 'Python Data Analysis' },
    { id: 'machine-learning', title: 'Python Machine Learning' },
    { id: 'web-frameworks', title: 'Python Web Frameworks' },
    { id: 'database-connectivity', title: 'Python Database Connectivity' },
    { id: 'gui-programming', title: 'Python GUI Programming' },
    { id: 'game-development', title: 'Python Game Development' },
    { id: 'automation-scripts', title: 'Python Automation Scripts' },
    { id: 'devops-tools', title: 'Python DevOps Tools' },
    { id: 'performance-optimization', title: 'Python Performance Optimization' },
    { id: 'memory-management', title: 'Python Memory Management' },
    { id: 'profiling', title: 'Python Profiling' },
    { id: 'debugging', title: 'Python Debugging' },
    { id: 'packaging', title: 'Python Packaging' },
    { id: 'distribution', title: 'Python Distribution' },
    { id: 'best-practices', title: 'Python Best Practices' },
    { id: 'code-style', title: 'Python Code Style (PEP 8)' },
    { id: 'documentation', title: 'Python Documentation' },
    { id: 'error-handling', title: 'Python Error Handling' },
    { id: 'security', title: 'Python Security' },
    { id: 'intermediate-projects', title: 'Intermediate Python Projects' },
    { id: 'advanced-projects', title: 'Advanced Python Projects' },
    { id: 'real-world-applications', title: 'Real-World Python Applications' },
    { id: 'career-path', title: 'Python Career Path' },
    { id: 'resources', title: 'Python Learning Resources' }
  ];

  const pythonVideos = getVideosForTopic('python');

  // Get navigation for current section
  const getNavigation = () => {
    const currentIndex = pageHeadings.findIndex(h => h.id === activeSection);
    const previousSection = currentIndex > 0 ? pageHeadings[currentIndex - 1] : null;
    const nextSection = currentIndex < pageHeadings.length - 1 ? pageHeadings[currentIndex + 1] : null;

    return {
      previous: previousSection ? {
        href: `/python/#${previousSection.id}`,
        title: previousSection.title,
        isSection: true
      } : {
        href: '/java',
        title: 'Java Programming',
        isSection: false
      },
      next: nextSection ? {
        href: `/python/#${nextSection.id}`,
        title: nextSection.title,
        isSection: true
      } : {
        href: '/sql',
        title: 'SQL & Databases',
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
              <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 p-12 rounded-lg mb-12">
                <h1 id="introduction" className="text-5xl md:text-6xl font-bold mb-6 text-center text-white">
                  🐍 Python Tutorial
                </h1>
                <p className="text-xl text-gray-300 mb-6 text-center max-w-4xl mx-auto">
                  Python is a popular programming language, created by Guido van Rossum and released in 1991.
                </p>
                <p className="text-lg text-gray-300 mb-8 text-center max-w-4xl mx-auto">
                  Master Python programming from fundamentals to advanced development.
                  Learn to build web applications, data science projects, AI/ML models, automation scripts, and much more!
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <button
                    onClick={() => setActiveSection('basics')}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Start Learning Python →
                  </button>
                </div>

                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 text-center">
                  <p className="text-gray-300 text-lg">
                    <strong className="text-white">Most Popular</strong> programming language for beginners and professionals.
                    Used by Google, NASA, Netflix, Instagram, and millions of developers worldwide!
                  </p>
                </div>
              </div>

              {/* Overview Section */}
              <div id="overview" className="bg-gray-800/50 border border-gray-600 p-8 rounded-lg mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">📋 Python Course Overview</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-4">What You'll Learn</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Python syntax and fundamentals</li>
                      <li>• Data structures and algorithms</li>
                      <li>• Object-oriented programming</li>
                      <li>• Web development with Django/Flask</li>
                      <li>• Data science and analysis</li>
                      <li>• Machine learning basics</li>
                      <li>• Automation and scripting</li>
                      <li>• Best practices and debugging</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-4">Career Opportunities</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Software Developer</li>
                      <li>• Data Scientist</li>
                      <li>• Web Developer</li>
                      <li>• Machine Learning Engineer</li>
                      <li>• DevOps Engineer</li>
                      <li>• Automation Engineer</li>
                      <li>• Research Scientist</li>
                      <li>• Technical Consultant</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Why Learn Python */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Why Learn Python?</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4 text-gray-300">
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span><strong className="text-white">Easy to Learn:</strong> Simple, readable syntax similar to English</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span><strong className="text-white">Versatile:</strong> Web development, data science, AI, automation, and more</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span><strong className="text-white">High Demand:</strong> Top 3 most in-demand programming languages</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span><strong className="text-white">Large Community:</strong> Millions of developers and extensive resources</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span><strong className="text-white">Open Source:</strong> Free to use with rich ecosystem of libraries</span>
                      </div>
                    </div>
                    <div className="space-y-4 text-gray-300">
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span><strong className="text-white">Cross-Platform:</strong> Works on Windows, Mac, Linux, Raspberry Pi</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span><strong className="text-white">Huge Library:</strong> 300,000+ packages for any task imaginable</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span><strong className="text-white">Rapid Development:</strong> Write less code, accomplish more</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white mr-3 text-xl">✓</span>
                        <span><strong className="text-white">Great for Prototyping:</strong> Quick to build and test ideas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Understanding Python */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Understanding Python Programming Language</h2>

                  <div className="space-y-6 text-gray-300">
                    <p className="text-lg leading-relaxed">
                      <strong className="text-white">Python</strong> is a high-level, interpreted, object-oriented programming language created by <strong className="text-white">Guido van Rossum</strong> and first released in 1991. The language was named after the British comedy series "Monty Python's Flying Circus," reflecting its creator's desire to make programming fun.
                    </p>

                    <p className="text-lg leading-relaxed">
                      Python emphasizes code readability and simplicity, using <strong className="text-white">significant indentation</strong> instead of curly braces or keywords to delimit blocks. This design philosophy makes Python code easy to read and write, which is why it's often recommended as the first programming language for beginners.
                    </p>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">🎯 The Zen of Python</h3>
                      <p className="text-gray-300 mb-4">
                        Python's design philosophy is summarized in "The Zen of Python" (PEP 20). Key principles include:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Beautiful is better than ugly:</strong> Code should be aesthetically pleasing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Explicit is better than implicit:</strong> Code should be clear about what it does</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Simple is better than complex:</strong> Prefer straightforward solutions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Readability counts:</strong> Code is read more often than it's written</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">There should be one obvious way to do it:</strong> Consistency over multiple approaches</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">🏗️ How Python Works</h3>
                      <p className="text-gray-300 mb-4">
                        Python is an interpreted language, which means it executes code line by line:
                      </p>

                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
                          <h4 className="text-white font-bold mb-2">📊 Python Execution Process</h4>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p><strong className="text-white">Step 1:</strong> Write Python code in .py files</p>
                            <p><strong className="text-white">Step 2:</strong> Python interpreter reads the source code</p>
                            <p><strong className="text-white">Step 3:</strong> Code is compiled to bytecode (.pyc files)</p>
                            <p><strong className="text-white">Step 4:</strong> Python Virtual Machine (PVM) executes the bytecode</p>
                            <p><strong className="text-white">Step 5:</strong> Results are displayed or returned</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Python Interpreter</h4>
                            <p className="text-gray-300 text-sm">
                              The interpreter reads and executes Python code. Multiple implementations exist: CPython (default), PyPy, Jython, IronPython.
                            </p>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-2">Dynamic Typing</h4>
                            <p className="text-gray-300 text-sm">
                              Variables don't need type declarations. Python determines types at runtime, making code more flexible.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Key Characteristics of Python</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Interpreted:</strong> No compilation step needed - write and run immediately</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Dynamically Typed:</strong> Variable types determined at runtime, no explicit declarations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Object-Oriented:</strong> Everything is an object, supports OOP principles</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Multi-Paradigm:</strong> Supports procedural, OOP, and functional programming</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Automatic Memory Management:</strong> Built-in garbage collection handles memory</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-white mr-3 text-xl">•</span>
                          <span><strong className="text-white">Extensive Libraries:</strong> Rich ecosystem of third-party packages via PyPI</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Python is Used For */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-white mb-6">What is Python Used For?</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-all">
                      <div className="text-4xl mb-4">🌐</div>
                      <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
                      <p className="text-gray-300">
                        Build powerful web applications with Django, Flask, and FastAPI frameworks.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-all">
                      <div className="text-4xl mb-4">📊</div>
                      <h3 className="text-xl font-bold text-white mb-3">Data Science</h3>
                      <p className="text-gray-300">
                        Analyze data with pandas, NumPy, and visualize with Matplotlib, Seaborn.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-all">
                      <div className="text-4xl mb-4">🤖</div>
                      <h3 className="text-xl font-bold text-white mb-3">Machine Learning & AI</h3>
                      <p className="text-gray-300">
                        Create ML models with TensorFlow, PyTorch, scikit-learn, and Keras.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-all">
                      <div className="text-4xl mb-4">⚙️</div>
                      <h3 className="text-xl font-bold text-white mb-3">Automation & Scripting</h3>
                      <p className="text-gray-300">
                        Automate repetitive tasks, system administration, and DevOps workflows.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-all">
                      <div className="text-4xl mb-4">🎮</div>
                      <h3 className="text-xl font-bold text-white mb-3">Game Development</h3>
                      <p className="text-gray-300">
                        Create games using Pygame and other game development libraries.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-all">
                      <div className="text-4xl mb-4">🔬</div>
                      <h3 className="text-xl font-bold text-white mb-3">Scientific Computing</h3>
                      <p className="text-gray-300">
                        Perform complex scientific calculations and research with SciPy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Python Features Deep Dive */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Python's Unique Features</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">📝 Significant Indentation</h3>
                      <p className="text-gray-300 mb-4">
                        Unlike most programming languages that use braces {`{}`} to define code blocks, Python uses indentation (spaces or tabs). This forces clean, readable code structure.
                      </p>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <pre className="text-green-400 font-mono text-sm">{`# Python uses indentation to define blocks
if x > 0:
    print("Positive")  # This line is indented (part of if block)
    print("Number")    # This line is also indented
print("Done")          # Not indented (outside if block)`}</pre>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">🔤 Dynamic Typing</h3>
                      <p className="text-gray-300 mb-4">
                        Python determines variable types automatically at runtime. You don't declare types explicitly.
                      </p>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <pre className="text-green-400 font-mono text-sm">{`# No type declaration needed
x = 5           # x is an integer
x = "Hello"     # Now x is a string (type can change)
x = [1, 2, 3]   # Now x is a list`}</pre>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">📚 Rich Standard Library</h3>
                      <p className="text-gray-300 mb-4">
                        Python's standard library includes modules for file I/O, system calls, sockets, databases, web services, email, and much more—all without installing additional packages.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold text-sm mb-2">File & System</h4>
                          <p className="text-gray-300 text-xs">os, sys, pathlib, shutil</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold text-sm mb-2">Data Processing</h4>
                          <p className="text-gray-300 text-xs">json, csv, xml, sqlite3</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold text-sm mb-2">Web & Network</h4>
                          <p className="text-gray-300 text-xs">http, urllib, socket</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Started */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-lg p-8 text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Get Started with Python</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    This tutorial will teach you Python from basics to advanced. No prior programming experience needed!
                  </p>
                  <button
                    onClick={() => setActiveSection('basics')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    Start Learning Python →
                  </button>
                </div>
              </div>
            </div>
          </main>
        );

      case 'basics':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="basics" className="text-4xl md:text-5xl font-bold mb-6 text-center text-white">
                Python Basics
              </h1>
              <p className="text-lg text-gray-300 mb-8 text-center">
                Master the essential building blocks of Python programming
              </p>

              <div className="max-w-6xl mx-auto">
                {/* Your First Python Program */}
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">👋 Your First Python Program</h2>

                  <p className="text-gray-300 mb-6 text-lg">
                    Let's start with the classic "Hello, World!" program. This simple program demonstrates Python's clean syntax.
                  </p>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`print("Hello, World!")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Hello, World!`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">print():</strong> Built-in function that displays output</li>
                      <li>• <strong className="text-white">No semicolons:</strong> Python doesn't require semicolons at line ends</li>
                      <li>• <strong className="text-white">No main method:</strong> Unlike Java/C++, Python runs from top to bottom</li>
                    </ul>
                  </div>
                </div>

                {/* Python Syntax Rules */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Python Syntax Rules</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">1. Indentation is Mandatory</h3>
                      <p className="text-gray-300 mb-4">
                        Python uses indentation (whitespace) to define code blocks. This is not just for readability—it's part of the syntax!
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-green-400 font-semibold mb-2">✅ Correct:</p>
                          <pre className="bg-gray-800 p-4 rounded-lg text-green-400 font-mono text-sm">{`if True:
    print("This works!")
    print("Properly indented")`}</pre>
                        </div>
                        <div>
                          <p className="text-red-400 font-semibold mb-2">❌ Incorrect:</p>
                          <pre className="bg-gray-800 p-4 rounded-lg text-red-400 font-mono text-sm">{`if True:
print("Error!")
# IndentationError!`}</pre>
                        </div>
                      </div>

                      <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <strong className="text-white">Standard:</strong> Use 4 spaces per indentation level (PEP 8 style guide)
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">2. Case Sensitive</h3>
                      <p className="text-gray-300 mb-4">
                        Python treats uppercase and lowercase as different characters.
                      </p>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <pre className="text-green-400 font-mono text-sm">{`name = "Alice"    # Variable 'name'
Name = "Bob"      # Different variable 'Name'
NAME = "Charlie"  # Yet another variable 'NAME'

print(name)  # Output: Alice
print(Name)  # Output: Bob
print(NAME)  # Output: Charlie`}</pre>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4">3. Comments</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">Single-line Comments</h4>
                          <pre className="text-green-400 font-mono text-sm">{`# This is a comment
print("Hello")  # Comment after code`}</pre>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">Multi-line Comments</h4>
                          <pre className="text-green-400 font-mono text-sm">{`"""
This is a multi-line comment
Used for documentation
"""
print("Hello")`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Python Keywords */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Python Keywords</h2>
                  <p className="text-gray-300 mb-6">
                    Python has 35 reserved keywords that cannot be used as variable names. These keywords have special meanings in Python.
                  </p>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'False', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'True', 'try', 'while', 'with', 'yield', 'async', 'await'].map((keyword) => (
                        <div key={keyword} className="bg-gray-800 px-3 py-2 rounded text-center">
                          <code className="text-green-400 text-sm">{keyword}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'syntax':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="syntax" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📝 Python Syntax - Complete Guide
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master Python's syntax rules, code structure, and programming conventions
              </p>

              <div className="max-w-6xl mx-auto">
                {/* Comprehensive Syntax Theory */}
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">📚 Understanding Python Syntax</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">What is Syntax in Programming?</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        <strong className="text-white">Syntax</strong> is the set of rules that defines how a Python program will be written and interpreted.
                        Just like human languages have grammar rules, programming languages have syntax rules that must be followed for the code to be valid.
                      </p>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        Think of syntax as the "grammar" of programming. Just as you can't write an English sentence without following grammar rules,
                        you can't write Python code without following its syntax rules. Even a small syntax error (like forgetting a colon or using
                        incorrect indentation) will prevent your program from running.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Python's syntax is designed to be <strong className="text-white">clean and readable</strong>, emphasizing simplicity and clarity.
                        Guido van Rossum, Python's creator, wanted the language to be easy to read and write, which is why Python uses
                        <strong className="text-white"> significant whitespace</strong> instead of braces or keywords to delimit code blocks.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Python's Unique Syntax Features</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-green-400 font-bold mb-3">1. Indentation-Based Structure</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            Python uses <strong className="text-white">indentation</strong> (whitespace at the beginning of lines) to define code blocks,
                            unlike languages like Java, C++, or JavaScript that use curly braces { }.
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-green-400 text-xs font-bold mb-2">Python (Indentation)</p>
                              <div className="bg-gray-900 p-3 rounded">
                                <pre className="text-green-400 font-mono text-xs">
                                  {`if x > 0:
    print("Positive")
    print("Number")
print("Done")`}
                                </pre>
                              </div>
                            </div>
                            <div>
                              <p className="text-yellow-400 text-xs font-bold mb-2">Java (Braces)</p>
                              <div className="bg-gray-900 p-3 rounded">
                                <pre className="text-yellow-400 font-mono text-xs">
                                  {`if (x > 0) {
    System.out.println("Positive");
    System.out.println("Number");
}
System.out.println("Done");`}
                                </pre>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 bg-blue-900/20 border border-blue-500/30 p-3 rounded">
                            <p className="text-gray-300 text-xs">
                              <strong className="text-white">PEP 8 Standard:</strong> Use 4 spaces per indentation level. Never mix tabs and spaces!
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-green-400 font-bold mb-3">2. No Semicolons Required</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            Unlike C, Java, or JavaScript, Python doesn't require semicolons (;) at the end of statements.
                            Each new line is treated as a new statement.
                          </p>
                          <div className="bg-gray-900 p-3 rounded">
                            <pre className="text-green-400 font-mono text-xs">
                              {`# Python - No semicolons needed
x = 5
y = 10
print(x + y)

# JavaScript - Semicolons required
// let x = 5;
// let y = 10;
// console.log(x + y);`}
                            </pre>
                          </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-green-400 font-bold mb-3">3. Colon Usage</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            Colons (:) are used to start code blocks in control structures, functions, classes, and loops.
                            This is a mandatory part of Python syntax.
                          </p>
                          <div className="bg-gray-900 p-3 rounded">
                            <pre className="text-green-400 font-mono text-xs">
                              {`# Colon starts a new block
if condition:       # ← Colon here
    do_something()  # ← Indented block

def function():     # ← Colon here
    return value    # ← Indented block

for i in range(10): # ← Colon here
    print(i)        # ← Indented block`}
                            </pre>
                          </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-green-400 font-bold mb-3">4. Case Sensitivity</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            Python is <strong className="text-white">case-sensitive</strong>, meaning uppercase and lowercase letters are treated as different characters.
                          </p>
                          <div className="bg-gray-900 p-3 rounded">
                            <pre className="text-green-400 font-mono text-xs">
                              {`Variable = 10    # Different from 'variable'
variable = 20    # Different from 'Variable'
VARIABLE = 30    # Different from both above

print(Variable)  # Output: 10
print(variable)  # Output: 20
print(VARIABLE)  # Output: 30`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Statement Types in Python</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-3">Simple Statements</h4>
                          <p className="text-gray-300 text-sm mb-2">Single line statements:</p>
                          <div className="bg-gray-900 p-2 rounded">
                            <pre className="text-green-400 font-mono text-xs">
                              {`x = 5          # Assignment
print("Hi")    # Function call
return value   # Return statement
break          # Loop control
continue       # Loop control
pass           # Placeholder`}
                            </pre>
                          </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-3">Compound Statements</h4>
                          <p className="text-gray-300 text-sm mb-2">Multiple line structures:</p>
                          <div className="bg-gray-900 p-2 rounded">
                            <pre className="text-green-400 font-mono text-xs">
                              {`if condition:      # if-else
    statement
    
for item in list:  # loops
    statement
    
def function():    # functions
    statement
    
class MyClass:     # classes
    statement`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Line Continuation in Python</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Method 1: Backslash (\\)</h4>
                          <div className="bg-gray-900 p-3 rounded">
                            <pre className="text-green-400 font-mono text-xs">
                              {`# Long statement split across lines
total = 1 + 2 + 3 + \\
        4 + 5 + 6 + \\
        7 + 8 + 9

message = "This is a very long string " + \\
          "that spans multiple lines"

print(total)    # Output: 45
print(message)  # Output: This is a very long string that spans multiple lines`}
                            </pre>
                          </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Method 2: Implicit Line Continuation (Preferred)</h4>
                          <div className="bg-gray-900 p-3 rounded">
                            <pre className="text-green-400 font-mono text-xs">
                              {`# Inside parentheses, brackets, or braces
numbers = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10
]

result = (1 + 2 + 3 +
          4 + 5 + 6)

function_call(
    argument1,
    argument2,
    argument3
)`}
                            </pre>
                          </div>
                          <p className="text-gray-300 text-xs mt-2">✅ This method is preferred as it's cleaner and more readable</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Execute Python Syntax */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">How to Execute Python Code</h2>
                  <p className="text-gray-300 mb-4">
                    Python code can be executed in multiple ways, each suited for different purposes:
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-bold mb-2">Interactive Mode</h4>
                      <p className="text-gray-300 text-sm mb-2">Type <code className="text-green-400">python</code> in terminal</p>
                      <pre className="text-green-400 font-mono text-xs">{`>>> print("Hello")
Hello`}</pre>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-bold mb-2">Script Mode</h4>
                      <p className="text-gray-300 text-sm mb-2">Save as .py file and run</p>
                      <pre className="text-green-400 font-mono text-xs">{`python script.py`}</pre>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-bold mb-2">IDE/Editor</h4>
                      <p className="text-gray-300 text-sm mb-2">Use PyCharm, VS Code, Jupyter</p>
                      <pre className="text-green-400 font-mono text-xs">{`# Write and run directly`}</pre>
                    </div>
                  </div>
                </div>

                {/* Python Statements */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Python Statements</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-white mb-4">Single Statement</h3>
                      <pre className="text-green-400 font-mono text-sm mb-4">{`print("Hello World")    # One statement per line
x = 10                  # Another statement
y = 20                  # And another`}</pre>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-white mb-4">Multiple Statements (Same Line)</h3>
                      <pre className="text-green-400 font-mono text-sm mb-4">{`x = 10; y = 20; z = 30    # Use semicolon to separate
print(x, y, z)             # Output: 10 20 30`}</pre>
                      <p className="text-gray-300 text-sm">⚠️ Not recommended - reduces readability</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-white mb-4">Multi-line Statements</h3>
                      <pre className="text-green-400 font-mono text-sm mb-4">{`# Using backslash
total = 1 + 2 + 3 + \\
        4 + 5 + 6

# Using parentheses (preferred)
fruits = ("apple", "banana",
          "orange", "grape")`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'comments':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="comments" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                💬 Python Comments
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Document your code for better understanding and maintenance
              </p>

              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Why Use Comments?</h2>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Explain complex logic</li>
                    <li>• Document function purposes</li>
                    <li>• Temporarily disable code during debugging</li>
                    <li>• Help others (and future you) understand your code</li>
                  </ul>
                </div>

                {/* Single-line Comments */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Single-line Comments</h3>
                  <p className="text-gray-300 mb-4">
                    Use the hash symbol (#) for single-line comments.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# This is a comment
print("Hello")  # This prints Hello

# Calculate sum
x = 5  # First number
y = 10  # Second number
sum = x + y  # Add them together
print(sum)  # Display result`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Hello
15`}</pre>
                  </div>
                </div>

                {/* Multi-line Comments */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📄 Multi-line Comments</h3>
                  <p className="text-gray-300 mb-4">
                    Use triple quotes (''' or """) for multi-line comments or docstrings.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <pre className="text-green-400 font-mono text-sm">{`"""
This is a multi-line comment.
It can span multiple lines.
Used for documentation strings (docstrings).
"""

def greet(name):
    """
    This function greets the person passed in as parameter.
    
    Parameters:
    name (str): The name of the person
    
    Returns:
    str: A greeting message
    """
    return f"Hello, {name}!"

print(greet("Alice"))`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'variables':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="variables" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📊 Python Variables - Complete Guide
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master variables, memory management, and data storage in Python
              </p>

              <div className="max-w-6xl mx-auto">
                {/* Comprehensive Theory Section */}
                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-blue-400 mb-6">📚 Understanding Variables in Depth</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">What Are Variables? - Complete Definition</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        A <strong className="text-white">variable</strong> is a named location in computer memory that stores a value. Think of it like a labeled box
                        where you can store information and retrieve it later by referring to the box's label (the variable name).
                      </p>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        In programming terms, variables are <strong className="text-white">symbolic references</strong> to memory addresses where data is stored.
                        When you create a variable in Python, you're essentially creating a reference to an object in memory, not just a storage container.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Unlike languages like C or Java where you must declare the type of data a variable will hold, Python uses
                        <strong className="text-white"> dynamic typing</strong>, which means the interpreter automatically determines the variable's type
                        based on the value assigned to it at runtime. This makes Python more flexible and easier to write, but requires developers
                        to be mindful of type conversions.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">How Variables Work in Memory</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-3">Memory Allocation Process:</h4>
                          <ol className="text-gray-300 text-sm space-y-2 list-decimal ml-5">
                            <li><strong className="text-white">Value Creation:</strong> Python creates an object in memory to store the value</li>
                            <li><strong className="text-white">Memory Address:</strong> The object is assigned a unique memory address</li>
                            <li><strong className="text-white">Reference Creation:</strong> The variable name becomes a reference to that memory address</li>
                            <li><strong className="text-white">Binding:</strong> The variable name is bound to the object</li>
                            <li><strong className="text-white">Access:</strong> When you use the variable, Python follows the reference to get the value</li>
                          </ol>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-3">Visual Representation:</h4>
                          <div className="bg-gray-900 p-4 rounded font-mono text-xs">
                            <pre className="text-green-400">
                              {`x = 42

Memory:
┌─────────────┬──────────┬─────────┐
│ Variable    │ Address  │ Value   │
├─────────────┼──────────┼─────────┤
│ x ───────► │ 0x7f3c   │   42    │
└─────────────┴──────────┴─────────┘

# When you reassign:
x = "Hello"

New Memory:
┌─────────────┬──────────┬──────────┐
│ Variable    │ Address  │ Value    │
├─────────────┼──────────┼──────────┤
│ x ───────► │ 0x8a2d   │ "Hello"  │
└─────────────┴──────────┴──────────┘
# Old object (42) may be garbage collected`}
                            </pre>
                          </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-3">Python's Object Model:</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            In Python, <strong className="text-white">everything is an object</strong>. When you write <code className="text-green-400">x = 5</code>,
                            Python creates an integer object with value 5, and <code className="text-green-400">x</code> becomes a reference to that object.
                          </p>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Object Identity:</strong> Every object has a unique ID (memory address) - use <code className="text-green-400">id()</code></li>
                            <li>• <strong className="text-white">Object Type:</strong> Every object has a type - use <code className="text-green-400">type()</code></li>
                            <li>• <strong className="text-white">Object Value:</strong> The actual data stored in the object</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Dynamic Typing Explained</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-green-400 font-bold mb-3">Python (Dynamic Typing)</h4>
                          <pre className="text-green-400 font-mono text-xs mb-3">
                            {`# No type declaration needed
x = 5           # x is int
x = "Hello"     # x is now str
x = [1, 2, 3]   # x is now list
x = 3.14        # x is now float`}
                          </pre>
                          <ul className="text-gray-300 text-xs space-y-1">
                            <li>✅ More flexible</li>
                            <li>✅ Less code to write</li>
                            <li>✅ Faster development</li>
                            <li>⚠️ Type errors at runtime</li>
                          </ul>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-yellow-400 font-bold mb-3">Java (Static Typing)</h4>
                          <pre className="text-yellow-400 font-mono text-xs mb-3">
                            {`// Must declare type
int x = 5;
// x = "Hello";  ❌ Error!
// Can't change type

String y = "Hello";
// y = 5;  ❌ Error!`}
                          </pre>
                          <ul className="text-gray-300 text-xs space-y-1">
                            <li>✅ Type errors caught early</li>
                            <li>✅ Better IDE support</li>
                            <li>✅ More predictable</li>
                            <li>⚠️ More verbose code</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Why Variables Are Essential</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">🎯 Practical Uses</h4>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong>Store user input:</strong> name = input("Enter name: ")</li>
                            <li>• <strong>Save calculations:</strong> total = price * quantity</li>
                            <li>• <strong>Track state:</strong> is_logged_in = True</li>
                            <li>• <strong>Store API data:</strong> users = fetch_users()</li>
                            <li>• <strong>Configuration:</strong> MAX_ATTEMPTS = 3</li>
                            <li>• <strong>Intermediate values:</strong> temp = a; a = b; b = temp</li>
                          </ul>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">💡 Benefits</h4>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong>Readability:</strong> Code is self-documenting</li>
                            <li>• <strong>Reusability:</strong> Use same value multiple times</li>
                            <li>• <strong>Maintainability:</strong> Change value in one place</li>
                            <li>• <strong>Flexibility:</strong> Values can change at runtime</li>
                            <li>• <strong>Abstraction:</strong> Hide complex values behind names</li>
                            <li>• <strong>Memory efficiency:</strong> Reference same object multiple times</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Variable Lifetime and Scope</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Lifetime of a Variable:</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            A variable's lifetime is the period during which it exists in memory:
                          </p>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li>• <strong className="text-white">Creation:</strong> When first assigned a value</li>
                            <li>• <strong className="text-white">Usage:</strong> While the variable is in scope and referenced</li>
                            <li>• <strong className="text-white">Destruction:</strong> When no more references exist (garbage collection)</li>
                          </ul>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Scope Levels:</h4>
                          <div className="bg-gray-900 p-3 rounded font-mono text-xs text-green-400 mb-3">
                            {`# Global scope
global_var = "I'm global"

def my_function():
    # Local scope
    local_var = "I'm local"
    print(global_var)  # ✅ Can access global
    print(local_var)   # ✅ Can access local

my_function()
print(global_var)  # ✅ Can access global
# print(local_var) # ❌ Error! Local var doesn't exist here`}
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• <strong className="text-white">Global:</strong> Accessible everywhere in the file</li>
                            <li>• <strong className="text-white">Local:</strong> Only inside the function where defined</li>
                            <li>• <strong className="text-white">Enclosing:</strong> In nested functions</li>
                            <li>• <strong className="text-white">Built-in:</strong> Python's built-in names</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creating Variables */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Creating Variables</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Creating variables
x = 5            # Integer
y = "Hello"      # String
z = 3.14         # Float
is_active = True # Boolean

# Print variables
print(x)
print(y)
print(z)
print(is_active)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`5
Hello
3.14
True`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• No type declaration needed—Python determines types automatically</li>
                      <li>• Variable names are case-sensitive (x and X are different)</li>
                      <li>• Can change type later: x = "now I'm a string"</li>
                    </ul>
                  </div>
                </div>

                {/* Variable Naming Rules */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Variable Naming Rules</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-green-400 font-bold mb-4">✅ Valid Names</h3>
                      <pre className="text-green-400 font-mono text-sm">{`my_var = 1
myVar = 2
_my_var = 3
MYVAR = 4
myVar2 = 5`}</pre>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-red-400 font-bold mb-4">❌ Invalid Names</h3>
                      <pre className="text-red-400 font-mono text-sm">{`2myvar = 1    # Can't start with number
my-var = 2    # No hyphens allowed
my var = 3    # No spaces allowed
for = 4       # Can't use keywords`}</pre>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="text-white font-bold mb-2">Naming Conventions (PEP 8):</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <strong>snake_case</strong> for variables and functions: <code className="text-green-400">user_name</code></li>
                      <li>• <strong>PascalCase</strong> for classes: <code className="text-green-400">MyClass</code></li>
                      <li>• <strong>UPPER_CASE</strong> for constants: <code className="text-green-400">MAX_SIZE</code></li>
                    </ul>
                  </div>
                </div>

                {/* Multiple Assignment */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 2: Multiple Assignment</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Assign multiple variables in one line
x, y, z = 5, 10, 15

print("x =", x)
print("y =", y)
print("z =", z)

# Assign same value to multiple variables
a = b = c = 100
print("a, b, c:", a, b, c)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`x = 5
y = 10
z = 15
a, b, c: 100 100 100`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Python allows assigning multiple variables in a single line</li>
                      <li>• Values are assigned in order: x gets 5, y gets 10, z gets 15</li>
                      <li>• Can also assign the same value to multiple variables</li>
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
                🔢 Python Data Types
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Understanding Python's built-in data types and type system
              </p>

              <div className="max-w-6xl mx-auto">
                {/* Understanding Data Types */}
                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-blue-400 mb-6">📚 Understanding Python Data Types</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">What are Data Types?</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        Data types are classifications that specify which type of value a variable can hold and what operations can be performed on it. Python is a <strong className="text-white">dynamically typed language</strong>, meaning you don't need to explicitly declare the data type—Python automatically determines it based on the assigned value.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Unlike statically-typed languages like Java or C++, where you must declare types (e.g., <code className="text-white">int x = 5;</code>), Python infers types at runtime. This makes Python more flexible but requires developers to be aware of type conversions and potential type-related errors.
                      </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">Python's Built-in Data Types</h3>
                      <p className="text-gray-300 mb-4">
                        Python has several built-in data types, categorized into different groups:
                      </p>

                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">📝 Text Type</h4>
                          <p className="text-gray-300 text-sm"><code className="text-green-400">str</code> - Strings (text data)</p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">🔢 Numeric Types</h4>
                          <p className="text-gray-300 text-sm">
                            <code className="text-green-400">int</code> (integers),
                            <code className="text-green-400 ml-2">float</code> (decimals),
                            <code className="text-green-400 ml-2">complex</code> (complex numbers)
                          </p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">📋 Sequence Types</h4>
                          <p className="text-gray-300 text-sm">
                            <code className="text-green-400">list</code> (mutable sequences),
                            <code className="text-green-400 ml-2">tuple</code> (immutable sequences),
                            <code className="text-green-400 ml-2">range</code> (number sequences)
                          </p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">🗺️ Mapping Type</h4>
                          <p className="text-gray-300 text-sm"><code className="text-green-400">dict</code> - Dictionaries (key-value pairs)</p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">🎯 Set Types</h4>
                          <p className="text-gray-300 text-sm">
                            <code className="text-green-400">set</code> (unique elements),
                            <code className="text-green-400 ml-2">frozenset</code> (immutable sets)
                          </p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">✅ Boolean Type</h4>
                          <p className="text-gray-300 text-sm"><code className="text-green-400">bool</code> - True or False values</p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">💾 Binary Types</h4>
                          <p className="text-gray-300 text-sm">
                            <code className="text-green-400">bytes</code>,
                            <code className="text-green-400 ml-2">bytearray</code>,
                            <code className="text-green-400 ml-2">memoryview</code>
                          </p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">⚪ None Type</h4>
                          <p className="text-gray-300 text-sm"><code className="text-green-400">NoneType</code> - Represents absence of value</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Getting Data Type */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔍 Example 1: Getting the Data Type</h3>
                  <p className="text-gray-300 mb-4">
                    Use the <code className="text-white">type()</code> function to find out what data type a variable holds.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`x = 5
y = "Hello"
z = 3.14
w = True
v = [1, 2, 3]
u = {"name": "Alice"}

print(type(x))  # Check type of x
print(type(y))  # Check type of y
print(type(z))  # Check type of z
print(type(w))  # Check type of w
print(type(v))  # Check type of v
print(type(u))  # Check type of u`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`<class 'int'>
<class 'str'>
<class 'float'>
<class 'bool'>
<class 'list'>
<class 'dict'>`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">type():</strong> Built-in function that returns the class type of an object</li>
                      <li>• Everything in Python is an object, including basic data types</li>
                      <li>• <code className="text-white">&lt;class 'int'&gt;</code> means the value is an integer object</li>
                      <li>• Useful for debugging and type checking in your programs</li>
                    </ul>
                  </div>
                </div>

                {/* Data Types Examples */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Data Types with Examples</h2>

                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-3 text-left text-white">Type</th>
                            <th className="border border-gray-600 px-4 py-3 text-left text-white">Example</th>
                            <th className="border border-gray-600 px-4 py-3 text-left text-white">Description</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="bg-gray-800/50">
                            <td className="border border-gray-600 px-4 py-3"><code className="text-green-400">str</code></td>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-white">"Hello"</code></td>
                            <td className="border border-gray-600 px-4 py-3">Text/string data</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-green-400">int</code></td>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-white">20</code></td>
                            <td className="border border-gray-600 px-4 py-3">Integer numbers</td>
                          </tr>
                          <tr className="bg-gray-800/50">
                            <td className="border border-gray-600 px-4 py-3"><code className="text-green-400">float</code></td>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-white">20.5</code></td>
                            <td className="border border-gray-600 px-4 py-3">Decimal numbers</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-green-400">complex</code></td>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-white">1j</code></td>
                            <td className="border border-gray-600 px-4 py-3">Complex numbers</td>
                          </tr>
                          <tr className="bg-gray-800/50">
                            <td className="border border-gray-600 px-4 py-3"><code className="text-green-400">list</code></td>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-white">["a", "b", "c"]</code></td>
                            <td className="border border-gray-600 px-4 py-3">Ordered, mutable collection</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-green-400">tuple</code></td>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-white">("a", "b", "c")</code></td>
                            <td className="border border-gray-600 px-4 py-3">Ordered, immutable collection</td>
                          </tr>
                          <tr className="bg-gray-800/50">
                            <td className="border border-gray-600 px-4 py-3"><code className="text-green-400">range</code></td>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-white">range(6)</code></td>
                            <td className="border border-gray-600 px-4 py-3">Sequence of numbers</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-green-400">dict</code></td>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-white">{`{"name": "John"}`}</code></td>
                            <td className="border border-gray-600 px-4 py-3">Key-value pairs</td>
                          </tr>
                          <tr className="bg-gray-800/50">
                            <td className="border border-gray-600 px-4 py-3"><code className="text-green-400">set</code></td>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-white">{`{"a", "b", "c"}`}</code></td>
                            <td className="border border-gray-600 px-4 py-3">Unordered, unique elements</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-green-400">bool</code></td>
                            <td className="border border-gray-600 px-4 py-3"><code className="text-white">True/False</code></td>
                            <td className="border border-gray-600 px-4 py-3">Boolean values</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Mutable vs Immutable */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">🔒 Mutable vs Immutable Types</h2>
                  <p className="text-gray-300 mb-6 text-lg">
                    Understanding mutability is crucial in Python. It affects how data is stored in memory and how it behaves when passed to functions.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-green-400 font-bold mb-4">✏️ Mutable (Can be Changed)</h3>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong className="text-white">Lists:</strong> Can add, remove, modify elements</li>
                        <li>• <strong className="text-white">Dictionaries:</strong> Can add, remove, modify key-value pairs</li>
                        <li>• <strong className="text-white">Sets:</strong> Can add, remove elements</li>
                        <li>• <strong className="text-white">Byte Arrays:</strong> Can modify individual bytes</li>
                      </ul>
                      <div className="mt-4 bg-gray-800 p-3 rounded">
                        <pre className="text-green-400 font-mono text-xs">{`# List is mutable
my_list = [1, 2, 3]
my_list[0] = 10  # Changes first element
print(my_list)   # [10, 2, 3]`}</pre>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-red-400 font-bold mb-4">🔒 Immutable (Cannot be Changed)</h3>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong className="text-white">Strings:</strong> Cannot modify individual characters</li>
                        <li>• <strong className="text-white">Tuples:</strong> Cannot add, remove, or change elements</li>
                        <li>• <strong className="text-white">Numbers:</strong> int, float, complex are immutable</li>
                        <li>• <strong className="text-white">Frozen Sets:</strong> Immutable version of sets</li>
                      </ul>
                      <div className="mt-4 bg-gray-800 p-3 rounded">
                        <pre className="text-red-400 font-mono text-xs">{`# String is immutable
text = "Hello"
# text[0] = "h"  # Error! Can't modify
text = "hello"   # Must create new string`}</pre>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">🎯 Why This Matters:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">Performance:</strong> Immutable objects can be cached and optimized</li>
                      <li>• <strong className="text-white">Thread Safety:</strong> Immutable objects are inherently thread-safe</li>
                      <li>• <strong className="text-white">Dictionary Keys:</strong> Only immutable types can be dictionary keys</li>
                      <li>• <strong className="text-white">Function Arguments:</strong> Mutable objects can be modified inside functions</li>
                    </ul>
                  </div>
                </div>

                {/* Type Conversion */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔄 Example 2: Type Conversion (Casting)</h3>
                  <p className="text-gray-300 mb-4">
                    Python allows you to convert between different data types using constructor functions like <code className="text-white">int()</code>, <code className="text-white">str()</code>, <code className="text-white">float()</code>, etc.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Integer to String
x = 10
x_str = str(x)
print("Type of x_str:", type(x_str))
print("Value:", x_str)

# String to Integer
y = "25"
y_int = int(y)
print("Type of y_int:", type(y_int))
print("Value:", y_int)

# String to Float
z = "3.14"
z_float = float(z)
print("Type of z_float:", type(z_float))
print("Value:", z_float)

# Float to Integer (loses decimal part)
a = 9.99
a_int = int(a)
print("9.99 as int:", a_int)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Type of x_str: <class 'str'>
Value: 10
Type of y_int: <class 'int'>
Value: 25
Type of z_float: <class 'float'>
Value: 3.14
9.99 as int: 9`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">str():</strong> Converts any value to string representation</li>
                      <li>• <strong className="text-white">int():</strong> Converts to integer (truncates decimals, doesn't round)</li>
                      <li>• <strong className="text-white">float():</strong> Converts to floating-point number</li>
                      <li>• <strong className="text-red-300">Warning:</strong> Converting invalid strings raises ValueError (e.g., int("hello"))</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'numbers':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="numbers" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔢 Python Numbers
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Working with numeric data types in Python
              </p>

              <div className="max-w-6xl mx-auto">
                {/* Number Types Theory */}
                <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">📊 Python Number Types</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-purple-400 mb-4">Understanding Numeric Types</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        Python provides three built-in numeric types: <strong className="text-white">int</strong>, <strong className="text-white">float</strong>, and <strong className="text-white">complex</strong>. Unlike some languages that have multiple integer types (byte, short, int, long), Python's int type can handle arbitrarily large numbers limited only by available memory.
                      </p>

                      <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Integer (int)</h4>
                          <p className="text-gray-300 text-sm mb-2">Whole numbers, positive or negative, without decimals</p>
                          <p className="text-green-400 text-xs">Range: Unlimited (memory bound)</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Float (float)</h4>
                          <p className="text-gray-300 text-sm mb-2">Numbers with decimal points</p>
                          <p className="text-green-400 text-xs">Precision: ~15-17 decimal places</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Complex (complex)</h4>
                          <p className="text-gray-300 text-sm mb-2">Numbers with real and imaginary parts</p>
                          <p className="text-green-400 text-xs">Format: a + bj</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integer Examples */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Working with Integers</h3>
                  <p className="text-gray-300 mb-4">
                    Python integers can be positive, negative, or zero. Unlike other languages, Python int has unlimited precision.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Different integer values
x = 1
y = 35656222554887711
z = -3255522

print(x)
print(y)
print(z)
print(type(x))
print(type(y))
print(type(z))`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`1
35656222554887711
-3255522
<class 'int'>
<class 'int'>
<class 'int'>`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Python's int can handle extremely large numbers (35 trillion+)</li>
                      <li>• No overflow errors—only limited by available memory</li>
                      <li>• All three variables are type <code className="text-white">int</code> despite different magnitudes</li>
                    </ul>
                  </div>
                </div>

                {/* Float Examples */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 2: Working with Floats</h3>
                  <p className="text-gray-300 mb-4">
                    Floats are numbers with decimal points. Can also be scientific notation with 'e' for powers of 10.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Different float values
x = 1.10
y = 1.0
z = -35.59

# Scientific notation
a = 35e3      # 35 * 10^3 = 35000
b = 12E4      # 12 * 10^4 = 120000
c = -87.7e100 # Very large negative number

print(x, type(x))
print(y, type(y))
print(z, type(z))
print(a, type(a))
print(b, type(b))
print(c, type(c))`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`1.1 <class 'float'>
1.0 <class 'float'>
-35.59 <class 'float'>
35000.0 <class 'float'>
120000.0 <class 'float'>
-8.77e+101 <class 'float'>`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Even whole numbers with decimal point (1.0) are floats</li>
                      <li>• Scientific notation: <code className="text-white">35e3</code> = 35 × 1000 = 35000.0</li>
                      <li>• 'e' or 'E' indicates power of 10</li>
                      <li>• Floats can represent very large or very small numbers</li>
                    </ul>
                  </div>
                </div>

                {/* Complex Numbers */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 3: Complex Numbers</h3>
                  <p className="text-gray-300 mb-4">
                    Complex numbers have a real part and an imaginary part, written with 'j' suffix. Used in scientific and engineering calculations.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Complex numbers
x = 3 + 5j
y = 5j
z = -5j

print(x, type(x))
print(y, type(y))

# Access real and imaginary parts
print("Real part:", x.real)
print("Imaginary part:", x.imag)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`(3+5j) <class 'complex'>
5j <class 'complex'>
Real part: 3.0
Imaginary part: 5.0`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• 'j' or 'J' represents the imaginary unit (√-1)</li>
                      <li>• Format: <code className="text-white">real + imaginaryj</code></li>
                      <li>• Access parts using <code className="text-white">.real</code> and <code className="text-white">.imag</code> attributes</li>
                      <li>• Used in signal processing, quantum mechanics, electrical engineering</li>
                    </ul>
                  </div>
                </div>

                {/* Type Conversion Between Numbers */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔄 Example 4: Number Type Conversion</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Convert from int to float
x = 1
float_x = float(x)

# Convert from float to int
y = 2.8
int_y = int(y)

# Convert from int to complex
z = 1
complex_z = complex(z)

print(f"Int to Float: {x} -> {float_x}")
print(f"Float to Int: {y} -> {int_y}")
print(f"Int to Complex: {z} -> {complex_z}")

# Note: Cannot convert complex to other types
# int(3+5j) would raise TypeError`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Int to Float: 1 -> 1.0
Float to Int: 2.8 -> 2
Int to Complex: 1 -> (1+0j)`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">float()</code> adds decimal point: 1 becomes 1.0</li>
                      <li>• <code className="text-white">int()</code> truncates (doesn't round): 2.8 becomes 2</li>
                      <li>• <code className="text-white">complex()</code> creates complex with 0 imaginary part</li>
                      <li>• <strong className="text-red-300">Cannot convert complex to int or float</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Q&A Section from PDF Documentation */}
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 p-8 rounded-2xl mb-8">
                <h3 className="text-2xl font-bold text-green-300 mb-6">🧠 Variables & Data Types - Knowledge Check</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Test your understanding with these theoretical questions from Python documentation and best practices.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q1. What will be the output of the following code?</h4>
                      <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`x = 10
y = 10.0
print(x == y, x is y)`}</pre>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">True True</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-green-300 font-semibold">True False ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-gray-300">False True</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">False False</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> == compares values (10 == 10.0 is True), but 'is' compares object identity (different objects).
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q2. Which of the following is a valid complex number in Python?</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">3 + 4i</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-green-300 font-semibold">3 + 4j ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-gray-300">3 + 4k</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">complex(3, -4i)</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> Python uses 'j' for imaginary numbers, not 'i'. The syntax is real + imaginary*j.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q3. What will type(True + 5) return?</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">bool</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-green-300 font-semibold">int ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-gray-300">float</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">TypeError</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> True equals 1 in arithmetic operations, so True + 5 = 1 + 5 = 6, which is an int.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q4. What is the output of the following?</h4>
                      <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`a=2
b = 2.0
print(type(a/b))`}</pre>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">&lt;class 'int'&gt;</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-green-300 font-semibold">&lt;class 'float'&gt; ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-gray-300">&lt;class 'decimal.Decimal'&gt;</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">&lt;class 'complex'&gt;</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> Division (/) always returns a float in Python 3, even when dividing integers.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q5. Which of the following statements is TRUE about Python variables?</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">Python variables need explicit declaration before use</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-green-300 font-semibold">Python variables are dynamically typed ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-gray-300">Python variables are statically typed</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">Variable type cannot change once assigned</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> Python uses dynamic typing - variables can hold values of any type and can change type during execution.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q6. What will this code print?</h4>
                      <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`x = 3 + 4j
print(x.real, x.imag)`}</pre>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">3 4</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-green-300 font-semibold">3.0 4.0 ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-gray-300">3j 4j</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">Error</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> The .real and .imag attributes of complex numbers return float values.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q7. Which of the following is immutable in Python?</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">list</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-gray-300">dict</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-green-300 font-semibold">str ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">set</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> Strings are immutable in Python. Lists, dictionaries, and sets are mutable.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q8. Which of the following is TRUE about Python's int type?</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">It is limited to 32-bit values</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-gray-300">It is limited to 64-bit values</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-green-300 font-semibold">It can hold arbitrarily large numbers ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">It automatically converts to float on overflow</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> Python integers have arbitrary precision - they can be as large as memory allows.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h4 className="font-bold text-blue-300 mb-2">📖 Theoretical Deep Dive</h4>
                  <p className="text-gray-300 text-sm">
                    <strong>References:</strong> These questions are based on official Python documentation (docs.python.org),
                    Python's type system specification, and PEP 484 (Type Hints). Understanding Python's dynamic typing,
                    immutability concepts, and numeric type behavior is essential for writing robust Python applications.
                  </p>
                </div>
              </div>
            </div>
          </main>
        );

      case 'casting':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="casting" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔄 Python Type Casting
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Converting between different data types
              </p>

              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">What is Type Casting?</h2>
                  <p className="text-gray-300 text-lg mb-4">
                    Type casting (or type conversion) is the process of converting a value from one data type to another. Python provides constructor functions to explicitly convert types.
                  </p>
                  <p className="text-gray-300">
                    There are two types of conversions: <strong className="text-white">Implicit</strong> (automatic by Python) and <strong className="text-white">Explicit</strong> (manual using functions).
                  </p>
                </div>

                {/* Implicit vs Explicit */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Implicit vs Explicit Conversion</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-green-400 font-bold mb-4">Implicit (Automatic)</h3>
                      <p className="text-gray-300 text-sm mb-3">Python automatically converts smaller types to larger types to avoid data loss</p>
                      <pre className="text-green-400 font-mono text-xs">{`x = 10    # int
y = 5.5   # float
z = x + y # Result is float
print(z, type(z))
# Output: 15.5 <class 'float'>`}</pre>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-blue-400 font-bold mb-4">Explicit (Manual)</h3>
                      <p className="text-gray-300 text-sm mb-3">You manually convert using constructor functions</p>
                      <pre className="text-green-400 font-mono text-xs">{`x = "10"     # string
y = int(x)   # Convert to int
print(y, type(y))
# Output: 10 <class 'int'>`}</pre>
                    </div>
                  </div>
                </div>

                {/* Casting Examples */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example: Common Type Casting Operations</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# String to Integer
age_str = "25"
age = int(age_str)
print(f"Age: {age}, Type: {type(age)}")

# String to Float  
price_str = "19.99"
price = float(price_str)
print(f"Price: {price}, Type: {type(price)}")

# Number to String
count = 100
count_str = str(count)
print(f"Count: '{count_str}', Type: {type(count_str)}")

# String concatenation requires same types
x = 10
y = " items"
result = str(x) + y  # Convert x to string first
print(result)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Age: 25, Type: <class 'int'>
Price: 19.99, Type: <class 'float'>
Count: '100', Type: <class 'str'>
10 items`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">int("25")</code> converts string "25" to integer 25</li>
                      <li>• <code className="text-white">str(100)</code> converts number 100 to string "100"</li>
                      <li>• Must convert types before concatenation: can't do <code className="text-red-300">10 + " items"</code></li>
                      <li>• <strong className="text-red-300">Error:</strong> int("hello") raises ValueError</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'syntax-indentation':
        return (
          <div className="animate-fade-in-up">
            <h1 id="syntax-indentation" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Syntax & Indentation
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn Python's unique syntax and indentation rules
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="syntax-indentation" className="text-3xl font-bold text-white mb-6">2. Syntax & Indentation</h2>

              <div className="bg-gray-800 p-8 rounded-2xl border border-gray-600 mb-8 hover:ring-2 hover:ring-green-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 ">What Makes Python Special?</h3>

                <div className="space-y-6 mb-8">
                  <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-blue-300 mb-4">🎯 Core Design Philosophy</h4>
                    <p className="text-gray-300 mb-4 text-lg">
                      Python's syntax is designed to be readable and straightforward. Unlike many programming languages that use braces { } to define code blocks,
                      Python uses indentation (whitespace) to indicate the structure of code. This makes Python code more readable and forces programmers to write clean, well-formatted code.
                    </p>
                    <p className="text-gray-300 mb-4 text-lg">
                      <strong className="text-white">The Zen of Python</strong> (PEP 20) states: "Readability counts" and "Beautiful is better than ugly."
                      This philosophy permeates every aspect of Python's design, from its syntax to its standard library.
                    </p>
                    <p className="text-gray-300 text-lg">
                      Python's creator, Guido van Rossum, designed the language with the principle that code should be intuitive and self-documenting.
                      This is why Python uses English keywords like <code className="bg-gray-700 px-2 py-1 rounded">if</code>, <code className="bg-gray-700 px-2 py-1 rounded">else</code>, <code className="bg-gray-700 px-2 py-1 rounded">for</code>, and <code className="bg-gray-700 px-2 py-1 rounded">while</code> instead of cryptic symbols.
                    </p>
                  </div>

                  <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                    <p className="text-yellow-300 font-semibold">📌 Python's philosophy: "Code is read more often than it is written." This is why Python emphasizes readability and clean syntax.</p>
                  </div>

                  <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-green-300 mb-4">📚 Theoretical Foundation</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h5 className="font-bold text-white mb-2">Dynamic Typing vs Static Typing</h5>
                        <p className="text-gray-300 text-sm">
                          Python uses dynamic typing, meaning variable types are determined at runtime rather than compile time.
                          This provides flexibility but requires careful understanding of type behavior and potential runtime errors.
                        </p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h5 className="font-bold text-white mb-2">Interpreted vs Compiled Languages</h5>
                        <p className="text-gray-300 text-sm">
                          Python is an interpreted language, meaning code is executed line by line by the Python interpreter.
                          This enables rapid development and testing but may result in slower execution compared to compiled languages.
                        </p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h5 className="font-bold text-white mb-2">Object-Oriented Nature</h5>
                        <p className="text-gray-300 text-sm">
                          Everything in Python is an object, including numbers, strings, and functions. This consistent object model
                          provides a uniform interface for all data types and operations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. Indentation Rules</h3>
                <p className="text-gray-300 mb-6">Indentation is crucial in Python - it defines code blocks instead of braces.</p>

                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Basic Indentation</h4>
                    <p className="text-gray-300 mb-4">Use 4 spaces (recommended) or 1 tab for each indentation level. Be consistent!</p>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Correct indentation
if x > 0:
    print("Positive")  # 4 spaces
    print("Number is greater than 0")  # 4 spaces
    if x > 10:
        print("Very positive")  # 8 spaces (2 levels)
else:
    print("Negative or zero")  # 4 spaces

# Incorrect indentation (will cause IndentationError)
if x > 0:
print("This will cause an error")  # No indentation`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Indentation in Functions</h4>
                    <p className="text-gray-300 mb-4">Function bodies must be indented to define the function's scope.</p>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`def greet(name):
    """This is a docstring - also indented"""
    message = f"Hello, {name}!"  # Function body indented
    print(message)
    return message

def calculate_area(length, width):
    area = length * width  # Function body indented
    if area > 100:
        print("Large area!")  # Nested indentation
    return area

# Function call (not indented)
result = greet("Alice")
area = calculate_area(10, 20)`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. Comments and Docstrings</h3>
                <p className="text-gray-300 mb-6">Python supports different types of comments for documentation and code explanation.</p>

                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Single-line Comments</h4>
                    <p className="text-gray-300 mb-4">Use # for single-line comments. Everything after # on that line is ignored.</p>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# This is a single-line comment
name = "Python"  # Inline comment
age = 30

# Multiple single-line comments
# for longer explanations
# that span multiple lines

# Variables don't need type declaration
# Python infers types automatically
price = 19.99  # float
is_available = True  # boolean
items = ["apple", "banana"]  # list`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Multi-line Comments & Docstrings</h4>
                    <p className="text-gray-300 mb-4">Use triple quotes for multi-line comments and docstrings.</p>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`"""
This is a multi-line comment
or docstring at the module level
It can span multiple lines
"""

def calculate_tax(amount, rate=0.1):
    """
    Calculate tax on an amount.
    
    Args:
        amount (float): The base amount
        rate (float): Tax rate (default 0.1)
    
    Returns:
        float: The calculated tax amount
    
    Example:
        >>> calculate_tax(100, 0.15)
        15.0
    """
    return amount * rate

# Multi-line comment for complex logic
"""
This function handles complex calculations
that require multiple steps:
1. Validate input
2. Perform calculation
3. Format result
"""`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Q&A Section from PDF Documentation */}
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 p-8 rounded-2xl mb-8">
                <h3 className="text-2xl font-bold text-purple-300 mb-6">🧠 Syntax & Indentation - Knowledge Check</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Test your understanding with these theoretical questions from Python documentation and best practices.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q1. Which of the following is correct for printing in Python 3?</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">print "Hello"</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-gray-300">print(Hello)</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-green-300 font-semibold">print("Hello") ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">echo("Hello")</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> Python 3 requires parentheses for print function calls.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q2. What happens if you mix tabs and spaces for indentation?</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">Nothing happens</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-gray-300">It gives unexpected results</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-green-300 font-semibold">It raises IndentationError ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">It ignores indentation</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> Python is strict about consistent indentation. Mixing tabs and spaces causes errors.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q3. Python uses ______ to define code blocks.</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">Curly braces { }</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-gray-300">Square brackets []</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-green-300 font-semibold">Indentation ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">Semi colons ;</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> Python uses indentation (whitespace) to define code blocks, not braces.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q4. What is the recommended indentation size in Python (PEP 8)?</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">2 spaces</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-gray-300">3 spaces</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-green-300 font-semibold">4 spaces ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">Tab character</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> PEP 8 recommends 4 spaces for each indentation level.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q5. What will this code do?</h4>
                      <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`if True:
print("Hi")`}</pre>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">Print Hi</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-gray-300">Nothing</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-green-300 font-semibold">Raise IndentationError ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">Print blank line</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> The print statement is not properly indented under the if block.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="font-bold text-white mb-2">Q6. Python syntax is designed to be:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">a)</span>
                          <span className="text-gray-300">Confusing and strict</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">b)</span>
                          <span className="text-green-300 font-semibold">Clear and easy to read ✓</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">c)</span>
                          <span className="text-gray-300">Similar to Java</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2 text-gray-400">d)</span>
                          <span className="text-gray-300">Based on semicolons</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Explanation:</strong> Python's design philosophy emphasizes readability and simplicity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h4 className="font-bold text-blue-300 mb-2">📖 Theoretical Deep Dive</h4>
                  <p className="text-gray-300 text-sm">
                    <strong>References:</strong> These questions are based on official Python documentation (docs.python.org),
                    PEP 8 style guide, and Python's design philosophy. Understanding these concepts is crucial for writing
                    clean, maintainable Python code that follows industry standards.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. Python Keywords and Identifiers</h3>
                <p className="text-gray-300 mb-6">Understanding Python's reserved words and naming conventions.</p>

                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Python Keywords</h4>
                    <p className="text-gray-300 mb-4">These are reserved words that have special meaning in Python.</p>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Common Python keywords
# Control flow
if, elif, else, for, while, break, continue, pass

# Function and class definition
def, class, return, yield, lambda

# Exception handling
try, except, finally, raise, assert

# Import and module
import, from, as, with

# Logical operators
and, or, not, in, is

# Data types
True, False, None

# Example usage
if True and not False:
    for i in range(5):
        if i == 3:
            break
        print(i)`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Naming Conventions</h4>
                    <p className="text-gray-300 mb-4">Follow PEP 8 naming conventions for clean, readable code.</p>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Variable names: snake_case
user_name = "Alice"
total_count = 100
is_valid = True

# Function names: snake_case
def calculate_total():
    pass

def get_user_info():
    pass

# Class names: PascalCase
class UserAccount:
    pass

class DatabaseConnection:
    pass

# Constants: UPPER_SNAKE_CASE
MAX_CONNECTIONS = 100
DEFAULT_TIMEOUT = 30

# Private attributes: leading underscore
class MyClass:
    def __init__(self):
        self._private_var = "hidden"
        self.__very_private = "very hidden"`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">4. Line Continuation and Multiple Statements</h3>
                <p className="text-gray-300 mb-6">Python provides several ways to handle long lines and multiple statements.</p>

                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Line Continuation</h4>
                    <p className="text-gray-300 mb-4">Break long lines using backslash or parentheses.</p>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Using backslash for line continuation
total = 10 + 20 + 30 + 40 + 50 + \
        60 + 70 + 80 + 90 + 100

# Using parentheses (preferred)
total = (10 + 20 + 30 + 40 + 50 +
         60 + 70 + 80 + 90 + 100)

# Long function call
result = some_function(
    argument1,
    argument2,
    argument3,
    argument4
)

# Long string
message = ("This is a very long string "
          "that spans multiple lines "
          "for better readability")`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Multiple Statements</h4>
                    <p className="text-gray-300 mb-4">Use semicolons to put multiple statements on one line.</p>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Multiple statements on one line
x = 10; y = 20; z = 30

# Multiple assignments
a, b, c = 1, 2, 3

# Swap variables
x, y = y, x

# Multiple return values
def get_name_and_age():
    return "Alice", 25

name, age = get_name_and_age()

# Unpacking
numbers = [1, 2, 3, 4, 5]
first, *middle, last = numbers
print(first)    # 1
print(middle)   # [2, 3, 4]
print(last)     # 5`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-rose-500/30 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Best Practices</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>Use 4 spaces for indentation</strong> - never mix spaces and tabs</li>
                  <li>• <strong>Keep lines under 79 characters</strong> for better readability</li>
                  <li>• <strong>Use meaningful variable names</strong> that describe their purpose</li>
                  <li>• <strong>Write docstrings</strong> for functions, classes, and modules</li>
                  <li>• <strong>Follow PEP 8 style guide</strong> for consistent code formatting</li>
                  <li>• <strong>Use comments sparingly</strong> - code should be self-explanatory</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-8 rounded-2xl border border-gray-600 mb-8 hover:ring-2 hover:ring-green-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 ">Practical Example: Python Syntax in Action</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
                  <h4 className="text-lg font-bold text-white mb-4">syntax_example.py</h4>
                  <pre className="text-white font-mono text-sm overflow-x-auto">
                    {`#!/usr/bin/env python3
"""
Python Syntax Example
Demonstrates proper indentation, comments, and naming conventions
"""

# Constants
MAX_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30

class UserManager:
    """Manages user operations with proper syntax and documentation."""
    
    def __init__(self):
        self.users = []
        self._current_user = None
    
    def add_user(self, name, email, age):
        """
        Add a new user to the system.
        
        Args:
            name (str): User's full name
            email (str): User's email address
            age (int): User's age
        
        Returns:
            bool: True if user was added successfully
        """
        # Validate input
        if not name or not email:
            print("Error: Name and email are required")
            return False
        
        if age < 0 or age > 150:
            print("Error: Invalid age")
            return False
        
        # Create user dictionary
        user = {
            'name': name,
            'email': email,
            'age': age,
            'active': True
        }
        
        self.users.append(user)
        print(f"User {name} added successfully")
        return True
    
    def find_user(self, email):
        """Find user by email address."""
        for user in self.users:
            if user['email'] == email:
                return user
        return None
    
    def activate_user(self, email):
        """Activate a user account."""
        user = self.find_user(email)
        if user:
            user['active'] = True
            print(f"User {user['name']} activated")
            return True
        else:
            print("User not found")
            return False

def main():
    """Main function demonstrating Python syntax."""
    print("=== Python Syntax Example ===")
    
    # Create user manager instance
    manager = UserManager()
    
    # Add users with proper indentation
    users_data = [
        ("Alice Johnson", "alice@example.com", 25),
        ("Bob Smith", "bob@example.com", 30),
        ("Charlie Brown", "charlie@example.com", 28)
    ]
    
    # Process users
    for name, email, age in users_data:
        success = manager.add_user(name, email, age)
        if success:
            print(f"✓ {name} registered")
        else:
            print(f"✗ Failed to register {name}")
    
    # Demonstrate control flow with proper indentation
    print("\\n=== User Search ===")
    search_emails = ["alice@example.com", "nonexistent@example.com"]
    
    for email in search_emails:
        user = manager.find_user(email)
        if user:
            print(f"Found: {user['name']} ({user['age']} years old)")
        else:
            print(f"User with email {email} not found")
    
    # Demonstrate conditional logic
    print("\\n=== User Status Check ===")
    for user in manager.users:
        status = "Active" if user['active'] else "Inactive"
        print(f"{user['name']}: {status}")

if __name__ == "__main__":
    main()`}
                  </pre>
                </div>

                <div className="space-y-6">
                  <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-bold mb-2">🎯 Key Syntax Elements</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Proper indentation (4 spaces)</li>
                      <li>• Docstrings for documentation</li>
                      <li>• Snake_case naming convention</li>
                      <li>• Type hints in docstrings</li>
                      <li>• Proper comment usage</li>
                      <li>• Clean function structure</li>
                    </ul>
                  </div>

                  <div className="bg-rose-900/30 border border-rose-500/30 p-4 rounded-lg">
                    <h4 className="text-white font-bold mb-2">📊 Sample Output</h4>
                    <div className="bg-gray-900 p-3 rounded text-sm">
                      <pre className="text-white font-mono">
                        {`=== Python Syntax Example ===
User Alice Johnson added successfully
✓ Alice Johnson registered
User Bob Smith added successfully
✓ Bob Smith registered
User Charlie Brown added successfully
✓ Charlie Brown registered

=== User Search ===
Found: Alice Johnson (25 years old)
User with email nonexistent@example.com not found

=== User Status Check ===
Alice Johnson: Active
Bob Smith: Active
Charlie Brown: Active`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'strings':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="strings" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📝 Python Strings
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Working with text data in Python
              </p>

              <div className="max-w-6xl mx-auto">
                {/* String Theory */}
                <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">📚 Understanding Strings</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-yellow-400 mb-4">What are Strings?</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        Strings in Python are <strong className="text-white">immutable sequences of Unicode characters</strong>. They are used to store and manipulate text data. Strings are one of the most commonly used data types in Python programming.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        In Python, strings can be enclosed in single quotes ('...'), double quotes ("..."), or triple quotes ('''...''' or """..."""). Triple quotes allow strings to span multiple lines and are often used for docstrings.
                      </p>

                      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Key Characteristics:</h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-white">Immutable:</strong> Cannot change individual characters after creation</li>
                          <li>• <strong className="text-white">Indexed:</strong> Access characters by position (0-based indexing)</li>
                          <li>• <strong className="text-white">Iterable:</strong> Can loop through characters</li>
                          <li>• <strong className="text-white">Unicode:</strong> Supports international characters by default</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creating Strings */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Creating Strings</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Different ways to create strings
single = 'Hello'
double = "World"
triple_single = '''Multi-line
string using
triple quotes'''
triple_double = """Another
multi-line string"""

print(single)
print(double)
print(triple_single)
print(type(single))`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Hello
World
Multi-line
string using
triple quotes
<class 'str'>`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Single and double quotes are interchangeable for single-line strings</li>
                      <li>• Triple quotes preserve line breaks and formatting</li>
                      <li>• All string types are <code className="text-white">str</code> class</li>
                      <li>• Use quotes inside strings: <code className="text-white">"He said 'hello'"</code></li>
                    </ul>
                  </div>
                </div>

                {/* String Indexing */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔍 Example 2: String Indexing</h3>
                  <p className="text-gray-300 mb-4">
                    Access individual characters using square brackets. Python uses 0-based indexing and also supports negative indexing.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`text = "Python"

# Positive indexing (from start)
print("First character:", text[0])
print("Third character:", text[2])

# Negative indexing (from end)
print("Last character:", text[-1])
print("Second to last:", text[-2])

# String length
print("Length:", len(text))`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`First character: P
Third character: t
Last character: n
Second to last: o
Length: 6`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Index 0 is first character: 'P'</li>
                      <li>• Index -1 is last character: 'n'</li>
                      <li>• Index -2 is second from end: 'o'</li>
                      <li>• <code className="text-white">len()</code> returns total number of characters</li>
                    </ul>
                  </div>
                </div>

                {/* String Slicing */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">✂️ Example 3: String Slicing</h3>
                  <p className="text-gray-300 mb-4">
                    Extract portions of strings using slicing syntax: <code className="text-white">string[start:end:step]</code>
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`text = "Hello World"

# Basic slicing
print("First 5 chars:", text[0:5])
print("From index 6:", text[6:])
print("Up to index 5:", text[:5])

# Negative slicing
print("Last 5 chars:", text[-5:])

# Step slicing
print("Every 2nd char:", text[::2])
print("Reverse string:", text[::-1])`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`First 5 chars: Hello
From index 6: World
Up to index 5: Hello
Last 5 chars: World
Every 2nd char: HloWrd
Reverse string: dlroW olleH`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">[0:5]</code> extracts characters from index 0 to 4 (5 is excluded)</li>
                      <li>• <code className="text-white">[6:]</code> from index 6 to end</li>
                      <li>• <code className="text-white">[:5]</code> from start to index 4</li>
                      <li>• <code className="text-white">[::2]</code> every 2nd character</li>
                      <li>• <code className="text-white">[::-1]</code> reverses the string (step = -1)</li>
                    </ul>
                  </div>
                </div>

                {/* String Methods */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔧 Example 4: Common String Methods</h3>
                  <p className="text-gray-300 mb-4">
                    Python provides numerous built-in methods for string manipulation.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`text = "  Hello World  "

# Case conversion
print(text.upper())
print(text.lower())
print(text.title())

# Remove whitespace
print(text.strip())
print(text.lstrip())
print(text.rstrip())

# Replace
print(text.replace("World", "Python"))

# Split into list
words = "apple,banana,orange".split(",")
print(words)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`  HELLO WORLD  
  hello world  
  Hello World  
Hello World
Hello World  
  Hello World
  Hello Python  
['apple', 'banana', 'orange']`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">upper()</code> converts all to uppercase</li>
                      <li>• <code className="text-white">strip()</code> removes leading/trailing whitespace</li>
                      <li>• <code className="text-white">replace(old, new)</code> replaces all occurrences</li>
                      <li>• <code className="text-white">split(delimiter)</code> divides string into list</li>
                      <li>• Original string is unchanged (strings are immutable)</li>
                    </ul>
                  </div>
                </div>

                {/* String Formatting */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🎨 Example 5: String Formatting</h3>
                  <p className="text-gray-300 mb-4">
                    Python offers multiple ways to format strings: f-strings (modern), format(), and % formatting (legacy).
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`name = "Alice"
age = 25
salary = 75000.50

# f-strings (Python 3.6+) - Recommended
print(f"Name: {name}, Age: {age}")
print(f"Salary: $75000.50")

# format() method
print("Name: {}, Age: {}".format(name, age))
print("Name: {0}, Age: {1}".format(name, age))

# % formatting (old style)
print("Name: %s, Age: %d" % (name, age))`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Name: Alice, Age: 25
Salary: $75000.50
Name: Alice, Age: 25
Name: Alice, Age: 25
Name: Alice, Age: 25`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">f"text {`{variable}`}"</code> - Most readable and modern (Python 3.6+)</li>
                      <li>• <code className="text-white">{`{:.2f}`}</code> formats float to 2 decimal places</li>
                      <li>• <code className="text-white">format()</code> - More flexible, works in older Python versions</li>
                      <li>• <code className="text-white">%s</code> string, <code className="text-white">%d</code> integer, <code className="text-white">%f</code> float</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'booleans':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="booleans" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ✅ Python Booleans
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Working with True and False values
              </p>

              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Understanding Booleans</h2>
                  <p className="text-gray-300 text-lg mb-4">
                    Booleans represent one of two values: <code className="text-white">True</code> or <code className="text-white">False</code>. They are fundamental for decision-making in programs through conditional statements and logical operations.
                  </p>
                  <p className="text-gray-300">
                    In Python, <code className="text-white">True</code> and <code className="text-white">False</code> are keywords and must be capitalized. Internally, True equals 1 and False equals 0.
                  </p>
                </div>

                {/* Boolean Examples */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Boolean Values and Comparison</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Boolean values
is_python_fun = True
is_difficult = False

print(is_python_fun)
print(is_difficult)
print(type(is_python_fun))

# Comparison operators return booleans
print(10 > 5)
print(10 == 5)
print(10 < 5)

# Boolean in numeric context
print(True + True)   # 1 + 1 = 2
print(True * 10)     # 1 * 10 = 10`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`True
False
<class 'bool'>
True
False
False
2
10`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Comparison operators (&gt;, &lt;, ==, !=) always return boolean values</li>
                      <li>• <code className="text-white">True</code> equals 1, <code className="text-white">False</code> equals 0 in numeric operations</li>
                      <li>• <code className="text-white">bool</code> is a subclass of <code className="text-white">int</code></li>
                    </ul>
                  </div>
                </div>

                {/* Truthy and Falsy */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">⚡ Example 2: Truthy and Falsy Values</h3>
                  <p className="text-gray-300 mb-4">
                    In Python, any value can be evaluated in a boolean context. Some values are considered "falsy" (evaluate to False) and others are "truthy" (evaluate to True).
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Falsy values (evaluate to False)
print(bool(False))      # False itself
print(bool(0))          # Zero
print(bool(0.0))        # Zero float
print(bool(""))         # Empty string
print(bool([]))         # Empty list
print(bool({}))         # Empty dictionary
print(bool(None))       # None

# Truthy values (evaluate to True)
print(bool(True))       # True itself
print(bool(1))          # Any non-zero number
print(bool("text"))     # Any non-empty string
print(bool([1, 2]))     # Any non-empty list`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`False
False
False
False
False
False
False
True
True
True
True`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-red-300">Falsy:</strong> False, 0, 0.0, "", [], {`{}`}, None</li>
                      <li>• <strong className="text-green-300">Truthy:</strong> Everything else (non-zero numbers, non-empty containers)</li>
                      <li>• <code className="text-white">bool()</code> function converts any value to boolean</li>
                      <li>• Useful in if statements: <code className="text-white">if my_list:</code> checks if list is not empty</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'operators':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="operators" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ⚙️ Python Operators
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Perform operations on variables and values
              </p>

              <div className="max-w-6xl mx-auto">
                {/* Operators Overview */}
                <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-cyan-400 mb-6">📊 Understanding Python Operators</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-cyan-400 mb-4">What are Operators?</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        Operators are special symbols that perform operations on variables and values. Python supports various types of operators for arithmetic, comparison, logical operations, and more.
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Arithmetic Operators</h4>
                          <p className="text-gray-300 text-sm">+, -, *, /, {'//'}, %, **</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Comparison Operators</h4>
                          <p className="text-gray-300 text-sm">==, !=, &gt;, &lt;, &gt;=, &lt;=</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Logical Operators</h4>
                          <p className="text-gray-300 text-sm">and, or, not</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Assignment Operators</h4>
                          <p className="text-gray-300 text-sm">=, +=, -=, *=, /=</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arithmetic Operators */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">➕ Example 1: Arithmetic Operators</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`x = 10
y = 3

print("Addition:", x + y)
print("Subtraction:", x - y)
print("Multiplication:", x * y)
print("Division:", x / y)
print("Floor Division:", x {'//'} y)
print("Modulus:", x % y)
print("Exponentiation:", x ** y)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Addition: 13
Subtraction: 7
Multiplication: 30
Division: 3.3333333333333335
Floor Division: 3
Modulus: 1
Exponentiation: 1000`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">/</code> always returns float (3.333...)</li>
                      <li>• <code className="text-white">{'//'}</code> floor division returns integer part (3)</li>
                      <li>• <code className="text-white">%</code> modulus returns remainder (10 ÷ 3 = 3 remainder 1)</li>
                      <li>• <code className="text-white">**</code> exponentiation: 10³ = 1000</li>
                    </ul>
                  </div>
                </div>

                {/* Comparison Operators */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">⚖️ Example 2: Comparison Operators</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`x = 10
y = 5

print(x == y)   # Equal to
print(x != y)   # Not equal to
print(x > y)    # Greater than
print(x < y)    # Less than
print(x >= y)   # Greater than or equal
print(x <= y)   # Less than or equal

# Chain comparisons
print(1 < x < 20)  # True if x is between 1 and 20`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`False
True
True
False
True
False
True`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• All comparison operators return boolean (True/False)</li>
                      <li>• <code className="text-white">==</code> tests equality, <code className="text-white">!=</code> tests inequality</li>
                      <li>• Python allows chained comparisons: <code className="text-white">1 &lt; x &lt; 20</code></li>
                      <li>• Very useful in if statements and loops</li>
                    </ul>
                  </div>
                </div>

                {/* Logical Operators */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔗 Example 3: Logical Operators</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`x = 10
y = 5

# and - both conditions must be True
print(x > 5 and y > 2)   # True and True = True
print(x > 5 and y > 10)  # True and False = False

# or - at least one condition must be True
print(x > 5 or y > 10)   # True or False = True
print(x < 5 or y > 10)   # False or False = False

# not - reverses the boolean value
print(not True)
print(not False)
print(not (x > 5))`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`True
False
True
False
False
True
False`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">and</code> returns True only if both conditions are True</li>
                      <li>• <code className="text-white">or</code> returns True if at least one condition is True</li>
                      <li>• <code className="text-white">not</code> reverses the boolean value</li>
                      <li>• Used to combine multiple conditions in if statements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'variables-data-types':
        return (
          <div className="animate-fade-in-up">
            <h1 id="variables-data-types" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Variables & Data Types
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about Python variables and data types
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="variables-data-types" className="text-3xl font-bold text-white mb-6">3. Variables & Data Types</h2>

              <div className="bg-gray-800 p-8 rounded-2xl border border-gray-600 mb-8 hover:ring-2 hover:ring-green-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 ">Understanding Python Variables and Data Types</h3>

                <div className="space-y-6 mb-8">
                  <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-blue-300 mb-4">🎯 What Are Variables in Python?</h4>
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                      In Python, a <strong className="text-white">variable</strong> is a symbolic name that serves as a reference or pointer to an object stored in memory.
                      Unlike some programming languages, Python variables don't store the actual data - they store references to objects.
                    </p>
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                      Think of a variable like a <strong className="text-white">label</strong> or <strong className="text-white">tag</strong> that you attach to an object.
                      The object exists in memory, and the variable name is just a convenient way to access it. This reference-based system
                      is fundamental to understanding Python's behavior.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">Key Concepts:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Reference System:</strong> Variables point to objects, not store them directly</li>
                        <li>• <strong className="text-white">Dynamic Typing:</strong> Variable types are determined at runtime</li>
                        <li>• <strong className="text-white">Object Identity:</strong> Each object has a unique identity in memory</li>
                        <li>• <strong className="text-white">Memory Efficiency:</strong> Multiple variables can reference the same object</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-green-300 mb-4">🧠 Dynamic Typing vs Static Typing</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h5 className="font-bold text-green-400 mb-3">Dynamic Typing (Python)</h5>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• Types are checked at <strong className="text-white">runtime</strong></li>
                          <li>• Variables can change type during execution</li>
                          <li>• More flexible but requires careful testing</li>
                          <li>• Faster development, potential runtime errors</li>
                          <li>• Example: <code className="text-green-400">x = 5</code> then <code className="text-green-400">x = "hello"</code></li>
                        </ul>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h5 className="font-bold text-red-400 mb-3">Static Typing (Java, C++)</h5>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• Types are checked at <strong className="text-white">compile time</strong></li>
                          <li>• Variable types are fixed after declaration</li>
                          <li>• More rigid but catches errors early</li>
                          <li>• Slower development, fewer runtime errors</li>
                          <li>• Example: <code className="text-red-400">int x = 5;</code> (x must stay int)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">🔬 Memory Management and Object Identity</h4>
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                      Python's memory management is automatic through <strong className="text-white">garbage collection</strong>.
                      Objects are created in memory when assigned to variables and automatically cleaned up when no longer referenced.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">Memory Concepts:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Object Identity:</strong> Unique identifier for each object (id() function)</li>
                        <li>• <strong className="text-white">Reference Counting:</strong> Python tracks how many variables reference each object</li>
                        <li>• <strong className="text-white">Garbage Collection:</strong> Automatic cleanup of unreferenced objects</li>
                        <li>• <strong className="text-white">Immutability:</strong> Some objects (strings, tuples) cannot be changed after creation</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-orange-900/20 border border-orange-500/30 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-orange-300 mb-4">📊 Python's Data Type Hierarchy</h4>
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                      Python organizes data types in a hierarchical structure. Every value in Python is an object, and every object has:
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-bold text-white mb-2">Object Properties:</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Identity:</strong> Unique memory address (never changes)</li>
                        <li>• <strong className="text-white">Type:</strong> Determines supported operations and methods</li>
                        <li>• <strong className="text-white">Value:</strong> The actual data content</li>
                        <li>• <strong className="text-white">Mutability:</strong> Whether the object can be changed after creation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-300 font-semibold">📌 Python variables are references to objects in memory. Understanding data types is crucial for writing efficient and correct Python code.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. Numeric Data Types</h3>

                <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-bold text-blue-300 mb-3">🔢 Understanding Numeric Types in Python</h4>
                  <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                    Python provides three distinct numeric types, each designed for specific mathematical operations and use cases.
                    Understanding these types is crucial for scientific computing, data analysis, and general programming tasks.
                  </p>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h5 className="font-bold text-white mb-2">Numeric Type Characteristics:</h5>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">Integers (int):</strong> Whole numbers with unlimited precision</li>
                      <li>• <strong className="text-white">Floats (float):</strong> Decimal numbers with fixed precision (IEEE 754 double precision)</li>
                      <li>• <strong className="text-white">Complex (complex):</strong> Numbers with real and imaginary parts</li>
                      <li>• <strong className="text-white">Type Coercion:</strong> Automatic conversion between compatible numeric types</li>
                      <li>• <strong className="text-white">Memory Efficiency:</strong> Different types use different amounts of memory</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg mb-4">
                      <h4 className="font-bold text-green-300 mb-3">🔢 Integer (int) - The Foundation of Counting</h4>
                      <p className="text-gray-300 mb-3 text-sm leading-relaxed">
                        Integers in Python represent whole numbers and are implemented with <strong className="text-white">unlimited precision</strong>.
                        Unlike many programming languages that have fixed-size integer types, Python's integers can grow as large as your system's memory allows.
                      </p>
                      <div className="bg-gray-700/50 p-3 rounded-lg">
                        <h5 className="font-bold text-white mb-2 text-xs">Key Integer Properties:</h5>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• <strong className="text-white">Unlimited Precision:</strong> No maximum or minimum value limits</li>
                          <li>• <strong className="text-white">Memory Efficient:</strong> Uses variable-length representation internally</li>
                          <li>• <strong className="text-white">Immutable:</strong> Cannot be changed after creation</li>
                          <li>• <strong className="text-white">Mathematical Operations:</strong> Support all basic arithmetic operations</li>
                          <li>• <strong className="text-white">Number Bases:</strong> Support binary, octal, and hexadecimal literals</li>
                        </ul>
                      </div>
                    </div>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Integer examples
age = 25                    # Positive integer
temperature = -10           # Negative integer
population = 1000000        # Large integer
binary = 0b1010            # Binary literal (10 in decimal)
octal = 0o755              # Octal literal (493 in decimal)
hexadecimal = 0xFF         # Hexadecimal literal (255 in decimal)

# Integer operations
a = 10
b = 3
print(a + b)               # 13 (addition)
print(a - b)               # 7 (subtraction)
print(a * b)               # 30 (multiplication)
print(a / b)               # 3.333... (division - returns float)
print(a {'//'} b)              # 3 (floor division)
print(a % b)               # 1 (modulo)
print(a ** b)              # 1000 (exponentiation)

# Type checking
print(type(age))           # <class 'int'>
print(isinstance(age, int)) # True`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg mb-4">
                      <h4 className="font-bold text-blue-300 mb-3">🌊 Float (float) - Precision in Decimal Numbers</h4>
                      <p className="text-gray-300 mb-3 text-sm leading-relaxed">
                        Floating-point numbers in Python represent real numbers and are implemented using <strong className="text-white">IEEE 754 double precision</strong>
                        standard. This provides approximately 15-17 decimal digits of precision, which is sufficient for most scientific and engineering applications.
                      </p>
                      <div className="bg-gray-700/50 p-3 rounded-lg">
                        <h5 className="font-bold text-white mb-2 text-xs">Float Characteristics:</h5>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• <strong className="text-white">Fixed Precision:</strong> Limited to ~15-17 significant digits</li>
                          <li>• <strong className="text-white">IEEE 754 Standard:</strong> Follows international floating-point standard</li>
                          <li>• <strong className="text-white">Rounding Errors:</strong> Some decimal numbers cannot be exactly represented</li>
                          <li>• <strong className="text-white">Special Values:</strong> Supports infinity (inf) and Not a Number (NaN)</li>
                          <li>• <strong className="text-white">Scientific Notation:</strong> Supports exponential notation for large/small numbers</li>
                        </ul>
                      </div>
                    </div>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Float examples
pi = 3.14159               # Standard float
e = 2.718281828459045      # High precision float
scientific = 1.23e4        # Scientific notation (12300.0)
negative = -0.5            # Negative float
zero = 0.0                 # Zero as float

# Float operations
x = 10.5
y = 3.2
print(x + y)               # 13.7
print(x - y)               # 7.3
print(x * y)               # 33.6
print(x / y)               # 3.28125
print(x {'//'} y)              # 3.0 (floor division)
print(x % y)               # 0.9 (modulo)
print(x ** y)              # 1334.96... (exponentiation)

# Float precision issues
result = 0.1 + 0.2
print(result)              # 0.30000000000000004 (floating point precision)
print(round(result, 2))    # 0.3 (round to 2 decimal places)

# Type conversion
int_value = int(3.9)       # 3 (truncates decimal)
float_value = float(42)    # 42.0`}
                    </pre>
                  </div>
                </div>

                <div className="bg-gray-700 p-6 rounded border border-gray-600">
                  <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-purple-300 mb-3">🔮 Complex Numbers - Beyond the Real World</h4>
                    <p className="text-gray-300 mb-3 text-sm leading-relaxed">
                      Complex numbers extend the real number system to include numbers with both real and imaginary parts.
                      They are essential in advanced mathematics, physics, engineering, and signal processing applications.
                    </p>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <h5 className="font-bold text-white mb-2 text-xs">Complex Number Properties:</h5>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• <strong className="text-white">Two Components:</strong> Real part and imaginary part</li>
                        <li>• <strong className="text-white">Mathematical Foundation:</strong> Based on the imaginary unit 'i' (j in Python)</li>
                        <li>• <strong className="text-white">Practical Applications:</strong> Signal processing, quantum mechanics, electrical engineering</li>
                        <li>• <strong className="text-white">Built-in Support:</strong> Native complex arithmetic operations</li>
                        <li>• <strong className="text-white">Polar Form:</strong> Can be represented in magnitude and phase form</li>
                      </ul>
                    </div>
                  </div>
                  <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                    {`# Complex number examples
z1 = 3 + 4j                # Complex number (3 + 4i)
z2 = complex(2, 5)         # Using complex() constructor
z3 = 1j                    # Pure imaginary number

# Complex number operations
print(z1 + z2)             # (5+9j) - addition
print(z1 - z2)             # (1-1j) - subtraction
print(z1 * z2)             # (-14+23j) - multiplication
print(z1 / z2)             # (0.6896551724137931+0.1724137931034483j) - division
print(z1 ** 2)             # (-7+24j) - exponentiation

# Accessing real and imaginary parts
print(z1.real)             # 3.0 - real part
print(z1.imag)             # 4.0 - imaginary part
print(abs(z1))             # 5.0 - magnitude (sqrt(3² + 4²))

# Type checking
print(type(z1))            # <class 'complex'>`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. Text Data Type (String)</h3>
                <p className="text-gray-300 mb-6">Strings in Python are sequences of characters and are immutable.</p>

                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">String Creation</h4>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Different ways to create strings
single_quote = 'Hello World'
double_quote = "Hello World"
triple_quote = """Multi-line
string with
line breaks"""
raw_string = r"C:\\Users\\Name"  # Raw string (no escape processing)

# String concatenation
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name  # "John Doe"

# String repetition
stars = "*" * 10            # "**********"
separator = "-" * 50        # "--------------------------------------------------"

# String formatting (f-strings - Python 3.6+)
name = "Alice"
age = 30
message = f"Hello, {name}! You are {age} years old."

# String formatting (format method)
message2 = "Hello, {}! You are {} years old.".format(name, age)
message3 = "Hello, {name}! You are {age} years old.".format(name=name, age=age)

# String formatting (old style - %)
message4 = "Hello, %s! You are %d years old." % (name, age)`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">String Methods</h4>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`text = "  Hello World  "

# Case methods
print(text.upper())         # "  HELLO WORLD  "
print(text.lower())         # "  hello world  "
print(text.title())         # "  Hello World  "
print(text.capitalize())    # "  hello world  "
print(text.swapcase())      # "  hELLO wORLD  "

# Whitespace methods
print(text.strip())         # "Hello World" - remove leading/trailing whitespace
print(text.lstrip())        # "Hello World  " - remove leading whitespace
print(text.rstrip())        # "  Hello World" - remove trailing whitespace

# Search methods
print(text.find("World"))   # 8 - find substring
print(text.count("l"))      # 3 - count occurrences
print(text.startswith("Hello")) # False (due to leading spaces)
print(text.endswith("World"))   # False (due to trailing spaces)

# Replace and split
print(text.replace("World", "Python"))  # "  Hello Python  "
words = text.strip().split()            # ["Hello", "World"]
joined = "-".join(words)                # "Hello-World"

# String properties
print(len(text))            # 14 - length
print(text[0])              # " " - first character
print(text[-1])             # " " - last character
print(text[2:7])            # "Hello" - slicing`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. Boolean Data Type</h3>
                <p className="text-gray-300 mb-6">Boolean values represent truth values: True or False.</p>

                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Boolean Values and Operations</h4>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Boolean values
is_student = True
is_working = False

# Boolean operations
print(True and True)        # True
print(True and False)       # False
print(True or False)        # True
print(not True)             # False
print(not False)            # True

# Truthiness in Python
print(bool(1))              # True - non-zero numbers are truthy
print(bool(0))              # False - zero is falsy
print(bool("hello"))        # True - non-empty strings are truthy
print(bool(""))             # False - empty strings are falsy
print(bool([]))             # False - empty lists are falsy
print(bool([1, 2, 3]))      # True - non-empty lists are truthy
print(bool(None))           # False - None is falsy

# Comparison operators return booleans
age = 25
print(age > 18)             # True
print(age == 25)            # True
print(age != 30)            # True
print(age >= 25)            # True
print(age < 30)             # True
print(age <= 25)            # True`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Boolean in Control Flow</h4>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Boolean in conditional statements
def check_age(age):
    if age >= 18:
        return True
    else:
        return False

# Shorter version
def check_age_short(age):
    return age >= 18

# Boolean with if statements
name = "Alice"
if name:  # This checks if name is truthy
    print(f"Hello, {name}!")

# Boolean with while loops
count = 0
while count < 5:  # This continues while count < 5 is True
    print(f"Count: {count}")
    count += 1

# Boolean with list comprehensions
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = [x for x in numbers if x % 2 == 0]  # [2, 4, 6, 8, 10]

# Boolean functions
def is_even(number):
    return number % 2 == 0

def is_positive(number):
    return number > 0

# Usage
print(is_even(4))           # True
print(is_even(7))           # False
print(is_positive(5))       # True
print(is_positive(-3))      # False`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">4. Sequence Data Types</h3>
                <p className="text-gray-300 mb-6">Python has several built-in sequence types: lists, tuples, and ranges.</p>

                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">List (Mutable Sequence)</h4>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# List creation
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# List operations
fruits.append("grape")      # Add to end
fruits.insert(1, "mango")   # Insert at index 1
fruits.remove("banana")     # Remove first occurrence
fruits.pop()                # Remove and return last item
fruits.pop(0)               # Remove and return item at index 0

# List slicing
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[2:5])         # [2, 3, 4] - slice from index 2 to 4
print(numbers[:3])          # [0, 1, 2] - slice from start to index 2
print(numbers[3:])          # [3, 4, 5, 6, 7, 8, 9] - slice from index 3 to end
print(numbers[::2])         # [0, 2, 4, 6, 8] - every second element
print(numbers[::-1])        # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] - reverse

# List methods
numbers.sort()              # Sort in place
numbers.reverse()           # Reverse in place
print(len(numbers))         # Length
print(numbers.count(5))     # Count occurrences
print(numbers.index(3))     # Find index of first occurrence`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Tuple (Immutable Sequence)</h4>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Tuple creation
coordinates = (10, 20)
colors = ("red", "green", "blue")
single_item = (42,)         # Note the comma for single-item tuple
empty_tuple = ()

# Tuple operations
print(coordinates[0])       # 10 - access by index
print(coordinates[1])       # 20
print(len(coordinates))     # 2 - length
print(colors.count("red"))  # 1 - count occurrences
print(colors.index("green")) # 1 - find index

# Tuple unpacking
x, y = coordinates          # x = 10, y = 20
r, g, b = colors            # r = "red", g = "green", b = "blue"

# Multiple assignment
a, b, c = 1, 2, 3           # a = 1, b = 2, c = 3

# Tuple concatenation
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)
combined = tuple1 + tuple2  # (1, 2, 3, 4, 5, 6)

# Tuple repetition
repeated = (1, 2) * 3       # (1, 2, 1, 2, 1, 2)

# Tuple slicing (same as lists)
numbers = (0, 1, 2, 3, 4, 5)
print(numbers[2:4])         # (2, 3)
print(numbers[:3])          # (0, 1, 2)
print(numbers[3:])          # (3, 4, 5)`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">5. Mapping and Set Data Types</h3>
                <p className="text-gray-300 mb-6">Python provides dictionaries for key-value mappings and sets for unique collections.</p>

                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Dictionary (dict)</h4>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Dictionary creation
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Dictionary operations
person["email"] = "alice@example.com"  # Add new key-value pair
person["age"] = 31                     # Update existing value
print(person["name"])                  # "Alice" - access value
print(person.get("phone", "N/A"))      # "N/A" - get with default

# Dictionary methods
print(person.keys())                   # dict_keys(['name', 'age', 'city', 'email'])
print(person.values())                 # dict_values(['Alice', 31, 'New York', 'alice@example.com'])
print(person.items())                  # dict_items([('name', 'Alice'), ('age', 31), ...])

# Dictionary iteration
for key in person:
    print(f"{key}: {person[key]}")

for key, value in person.items():
    print(f"{key}: {value}")

# Dictionary comprehension
squares = {x: x**2 for x in range(1, 6)}  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}`}
                    </pre>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Set (frozenset)</h4>
                    <pre className="text-white font-mono text-sm bg-gray-900 p-4 rounded">
                      {`# Set creation
fruits = {"apple", "banana", "orange"}
numbers = {1, 2, 3, 4, 5}
empty_set = set()           # Note: {} creates empty dict, not set

# Set operations
fruits.add("grape")         # Add element
fruits.remove("banana")     # Remove element (raises KeyError if not found)
fruits.discard("kiwi")      # Remove element (no error if not found)
fruits.pop()                # Remove and return arbitrary element

# Set methods
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

print(set1.union(set2))         # {1, 2, 3, 4, 5, 6, 7, 8}
print(set1.intersection(set2))  # {4, 5}
print(set1.difference(set2))    # {1, 2, 3}
print(set1.symmetric_difference(set2))  # {1, 2, 3, 6, 7, 8}

# Set membership
print(3 in set1)             # True
print(9 not in set1)         # True

# Set comprehension
even_squares = {x**2 for x in range(1, 11) if x % 2 == 0}  # {4, 16, 36, 64, 100}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-rose-500/30 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Type Checking and Conversion</h3>
                <div className="space-y-6">
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-white font-bold mb-2">Type Checking</h4>
                    <pre className="text-white font-mono text-sm">
                      {`# Check variable type
x = 42
print(type(x))              # <class 'int'>
print(isinstance(x, int))   # True
print(isinstance(x, str))   # False

# Check multiple types
value = "hello"
print(isinstance(value, (str, int)))  # True`}
                    </pre>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-white font-bold mb-2">Type Conversion</h4>
                    <pre className="text-white font-mono text-sm">
                      {`# Convert between types
num_str = "123"
num_int = int(num_str)      # 123
num_float = float(num_str)  # 123.0

# Convert to string
age = 25
age_str = str(age)          # "25"

# Convert to boolean
print(bool(1))              # True
print(bool(0))              # False
print(bool(""))             # False
print(bool("hello"))        # True`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-8 rounded-2xl border border-gray-600 mb-8 hover:ring-2 hover:ring-green-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 ">Practical Example: Data Type Analyzer</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
                  <h4 className="text-lg font-bold text-white mb-4">data_type_analyzer.py</h4>
                  <pre className="text-white font-mono text-sm overflow-x-auto">
                    {`#!/usr/bin/env python3
"""
Comprehensive data type analyzer demonstrating Python's dynamic typing
"""

def analyze_data_type(value, name="value"):
    """Analyze and display information about a Python data type"""
    print(f"\\n=== Analyzing {name} ===")
    print(f"Value: {value}")
    print(f"Type: {type(value)}")
    print(f"Type name: {type(value).__name__}")
    print(f"Memory address: {id(value)}")
    
    # Type-specific analysis
    if isinstance(value, (int, float, complex)):
        print(f"Numeric type: {type(value).__name__}")
        if isinstance(value, int):
            print(f"Binary: {bin(value)}")
            print(f"Octal: {oct(value)}")
            print(f"Hexadecimal: {hex(value)}")
        elif isinstance(value, float):
            print(f"Scientific notation: {{value}}")
            print(f"Fixed point: {{value}}")
        elif isinstance(value, complex):
            print(f"Real part: {value.real}")
            print(f"Imaginary part: {value.imag}")
            print(f"Magnitude: {abs(value)}")
    
    elif isinstance(value, str):
        print(f"Length: {len(value)}")
        print(f"Character count: {len(value)}")
        print(f"Word count: {len(value.split())}")
        print(f"Uppercase: {value.upper()}")
        print(f"Lowercase: {value.lower()}")
        print(f"Is digit: {value.isdigit()}")
        print(f"Is alpha: {value.isalpha()}")
        print(f"Is alnum: {value.isalnum()}")
    
    elif isinstance(value, (list, tuple)):
        print(f"Length: {len(value)}")
        print(f"Element types: {[type(item).__name__ for item in value]}")
        if value:
            print(f"First element: {value[0]}")
            print(f"Last element: {value[-1]}")
    
    elif isinstance(value, dict):
        print(f"Number of keys: {len(value)}")
        print(f"Keys: {list(value.keys())}")
        print(f"Values: {list(value.values())}")
        print(f"Items: {list(value.items())}")
    
    elif isinstance(value, set):
        print(f"Number of elements: {len(value)}")
        print(f"Elements: {sorted(value) if value else 'Empty set'}")
    
    elif isinstance(value, bool):
        print(f"Boolean value: {value}")
        print(f"Truthiness: {bool(value)}")
    
    else:
        print(f"Custom or unknown type: {type(value)}")

def demonstrate_type_conversion():
    """Demonstrate various type conversions"""
    print("\\n" + "="*50)
    print("TYPE CONVERSION EXAMPLES")
    print("="*50)
    
    # String to numeric
    num_str = "123"
    print(f"\\nString '{num_str}' conversions:")
    print(f"int('{num_str}'): {int(num_str)}")
    print(f"float('{num_str}'): {{float(num_str)}}")
    
    # Numeric to string
    number = 42
    print(f"\\nNumber {number} conversions:")
    print(f"str({number}): '{str(number)}'")
    print(f"repr({number}): {repr(number)}")
    
    # List conversions
    data = [1, 2, 3, 4, 5]
    print(f"\\nList {data} conversions:")
    print(f"tuple(data): {tuple(data)}")
    print(f"set(data): {set(data)}")
    print(f"str(data): '{str(data)}'")
    
    # String to list
    text = "hello world"
    print(f"\\nString '{text}' conversions:")
    print(f"list(text): {list(text)}")
    print(f"text.split(): {text.split()}")

def demonstrate_truthiness():
    """Demonstrate Python's truthiness concept"""
    print("\\n" + "="*50)
    print("TRUTHINESS EXAMPLES")
    print("="*50)
    
    test_values = [
        0, 1, -1, 0.0, 3.14,
        "", "hello", " ",
        [], [1, 2, 3],
        {}, {"key": "value"},
        set(), {1, 2, 3},
        None, True, False
    ]
    
    for value in test_values:
        print(f"{{repr(value):>15}} -> {bool(value)}")

def main():
    """Main function to demonstrate data type analysis"""
    print("🐍 PYTHON DATA TYPE ANALYZER")
    print("="*50)
    
    # Analyze different data types
    analyze_data_type(42, "integer")
    analyze_data_type(3.14159, "float")
    analyze_data_type(3 + 4j, "complex")
    analyze_data_type("Hello, World!", "string")
    analyze_data_type(True, "boolean")
    analyze_data_type([1, 2, 3, "hello"], "list")
    analyze_data_type((1, 2, 3, "hello"), "tuple")
    analyze_data_type({"name": "Alice", "age": 30}, "dictionary")
    analyze_data_type({1, 2, 3, 4, 5}, "set")
    analyze_data_type(None, "None")
    
    # Demonstrate type conversion
    demonstrate_type_conversion()
    
    # Demonstrate truthiness
    demonstrate_truthiness()
    
    print("\\n" + "="*50)
    print("ANALYSIS COMPLETE!")
    print("="*50)

if __name__ == "__main__":
    main()`}
                  </pre>
                </div>

                <div className="space-y-6">
                  <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-bold mb-2">🎯 Features Demonstrated</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Dynamic type checking and analysis</li>
                      <li>• Type conversion between different types</li>
                      <li>• Truthiness evaluation</li>
                      <li>• Memory address inspection</li>
                      <li>• Type-specific operations and methods</li>
                      <li>• Comprehensive data type exploration</li>
                    </ul>
                  </div>

                  <div className="bg-rose-900/30 border border-rose-500/30 p-4 rounded-lg">
                    <h4 className="text-white font-bold mb-2">📊 Sample Output</h4>
                    <div className="bg-gray-900 p-3 rounded text-sm">
                      <pre className="text-white font-mono">
                        {`🐍 PYTHON DATA TYPE ANALYZER
==================================================

=== Analyzing integer ===
Value: 42
Type: <class 'int'>
Type name: int
Memory address: 140123456789
Numeric type: int
Binary: 0b101010
Octal: 0o52
Hexadecimal: 0x2a

=== Analyzing string ===
Value: Hello, World!
Type: <class 'str'>
Type name: str
Memory address: 140123456790
Length: 13
Character count: 13
Word count: 2
Uppercase: HELLO, WORLD!
Lowercase: hello, world!
Is digit: False
Is alpha: False
Is alnum: False`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'operators':
        return (
          <div className="animate-fade-in-up">
            <h1 id="operators" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Type Casting & Operators
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about Python operators and type casting
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="operators" className="text-3xl font-bold text-white mb-6">4. Type Casting & Operators</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">🔄 Type Casting - Data Transformation</h3>
                  <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                    Type casting, also known as type conversion, is the process of converting a value from one data type to another.
                    Python provides both <strong className="text-white">implicit</strong> (automatic) and <strong className="text-white">explicit</strong> (manual) type conversion mechanisms.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-400 mb-3">Implicit Type Conversion</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Automatic:</strong> Python handles conversion automatically</li>
                        <li>• <strong className="text-white">Safe Operations:</strong> Only when no data loss occurs</li>
                        <li>• <strong className="text-white">Widening Conversion:</strong> int → float → complex</li>
                        <li>• <strong className="text-white">Example:</strong> <code className="text-green-400">3 + 4.5</code> becomes <code className="text-green-400">7.5</code></li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-bold text-orange-400 mb-3">Explicit Type Conversion</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Manual:</strong> Programmer controls the conversion</li>
                        <li>• <strong className="text-white">Built-in Functions:</strong> int(), float(), str(), bool()</li>
                        <li>• <strong className="text-white">Potential Data Loss:</strong> May truncate or modify values</li>
                        <li>• <strong className="text-white">Example:</strong> <code className="text-orange-400">int(3.9)</code> becomes <code className="text-orange-400">3</code></li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h5 className="font-bold text-white mb-2">Type Conversion Rules:</h5>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">String to Number:</strong> Must contain valid numeric characters</li>
                      <li>• <strong className="text-white">Float to Int:</strong> Truncates decimal part (doesn't round)</li>
                      <li>• <strong className="text-white">Boolean Conversion:</strong> False values: 0, "", [], None, False</li>
                      <li>• <strong className="text-white">Error Handling:</strong> Invalid conversions raise ValueError</li>
                      <li>• <strong className="text-white">Memory Considerations:</strong> Different types use different amounts of memory</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded border border-gray-600 mb-4">
                  <pre className="text-white font-mono text-sm">
                    {`# Type conversion examples
x = "123"
y = int(x)      # Convert to integer
z = float(x)    # Convert to float
w = str(y)      # Convert to string

# Type casting functions
int(), float(), str(), bool()`}
                  </pre>
                </div>

                <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold text-green-300 mb-4">⚡ Operators - The Building Blocks of Logic</h3>
                  <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                    Operators are special symbols that perform specific operations on one or more operands (values).
                    Python supports various types of operators that enable mathematical calculations, comparisons, logical operations, and more.
                  </p>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h5 className="font-bold text-white mb-2">Operator Categories:</h5>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong className="text-white">Arithmetic:</strong> Mathematical operations (+, -, *, /, %, **)</li>
                      <li>• <strong className="text-white">Comparison:</strong> Relational operations (==, !=, {'>'}, {'<'}, {'>='}, {'<='})</li>
                      <li>• <strong className="text-white">Logical:</strong> Boolean operations (and, or, not)</li>
                      <li>• <strong className="text-white">Assignment:</strong> Value assignment (=, +=, -=, *=, /=)</li>
                      <li>• <strong className="text-white">Identity:</strong> Object identity checks (is, is not)</li>
                      <li>• <strong className="text-white">Membership:</strong> Container membership (in, not in)</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg mb-3">
                      <h4 className="font-bold text-blue-300 mb-2">🔢 Arithmetic Operators</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        Perform mathematical operations between numeric operands. Python supports all basic arithmetic operations
                        with automatic type promotion for mixed-type operations.
                      </p>
                    </div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <strong className="text-white">+ Addition:</strong> Combines two numbers (3 + 4 = 7)</li>
                      <li>• <strong className="text-white">- Subtraction:</strong> Subtracts second from first (10 - 3 = 7)</li>
                      <li>• <strong className="text-white">* Multiplication:</strong> Multiplies two numbers (3 * 4 = 12)</li>
                      <li>• <strong className="text-white">/ Division:</strong> Returns float division (10 / 3 = 3.333...)</li>
                      <li>• <strong className="text-white">% Modulus:</strong> Returns remainder (10 % 3 = 1)</li>
                      <li>• <strong className="text-white">** Exponentiation:</strong> Raises to power (2 ** 3 = 8)</li>
                      <li>• <strong className="text-white">{'//'} Floor Division:</strong> Integer division (10 {'//'} 3 = 3)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <div className="bg-green-900/20 border border-green-500/30 p-3 rounded-lg mb-3">
                      <h4 className="font-bold text-green-300 mb-2">⚖️ Comparison Operators</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        Compare two values and return a boolean result (True or False). These operators are essential for
                        conditional statements, loops, and decision-making in programs.
                      </p>
                    </div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <strong className="text-white">== Equal to:</strong> Checks if values are equal (5 == 5 → True)</li>
                      <li>• <strong className="text-white">!= Not equal:</strong> Checks if values are different (5 != 3 → True)</li>
                      <li>• <strong className="text-white">{'>'} Greater than:</strong> Left operand larger (7 {'>'} 3 → True)</li>
                      <li>• <strong className="text-white">{'<'} Less than:</strong> Left operand smaller (2 {'<'} 5 → True)</li>
                      <li>• <strong className="text-white">{'>='} Greater or equal:</strong> Left operand larger or equal (5 {'>='} 5 → True)</li>
                      <li>• <strong className="text-white">{'<='} Less or equal:</strong> Left operand smaller or equal (4 {'<='} 4 → True)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded-lg mb-3">
                      <h4 className="font-bold text-purple-300 mb-2">🧠 Logical Operators</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        Combine boolean values and expressions to create complex logical conditions. Python uses short-circuit
                        evaluation, meaning it stops evaluating as soon as the result is determined.
                      </p>
                    </div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <strong className="text-white">and:</strong> Both conditions must be True (True and False → False)</li>
                      <li>• <strong className="text-white">or:</strong> At least one condition must be True (True or False → True)</li>
                      <li>• <strong className="text-white">not:</strong> Inverts the boolean value (not True → False)</li>
                    </ul>
                    <div className="bg-gray-700/50 p-3 rounded-lg mt-3">
                      <h5 className="font-bold text-white mb-2 text-xs">Short-Circuit Behavior:</h5>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• <strong className="text-white">and:</strong> Stops at first False value</li>
                        <li>• <strong className="text-white">or:</strong> Stops at first True value</li>
                        <li>• <strong className="text-white">Performance:</strong> Can improve efficiency in complex expressions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'if-else':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="if-else" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔀 Python If-Else Statements
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Make decisions in your programs with conditional logic
              </p>

              <div className="max-w-6xl mx-auto">
                {/* If-Else Theory */}
                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-blue-400 mb-6">📚 Understanding Conditionals</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">What are Conditionals?</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        Conditional statements allow your program to <strong className="text-white">make decisions</strong> based on certain conditions. The <code className="text-white">if-elif-else</code> structure is fundamental to control flow in Python.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Python evaluates conditions as <code className="text-white">True</code> or <code className="text-white">False</code>. If the condition is True, the indented code block executes. Python uses <strong className="text-white">indentation</strong> (not braces) to define code blocks.
                      </p>

                      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Conditional Statement Types:</h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <code className="text-white">if</code> - Execute code if condition is True</li>
                          <li>• <code className="text-white">elif</code> - Check another condition if previous was False</li>
                          <li>• <code className="text-white">else</code> - Execute if all previous conditions were False</li>
                          <li>• <code className="text-white">nested if</code> - if statements inside other if statements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Basic If */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Basic If Statement</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`age = 18

if age >= 18:
    print("You are an adult")
    print("You can vote")

print("This always prints")

# Another example
temperature = 30
if temperature > 25:
    print("It's hot outside!")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`You are an adult
You can vote
This always prints
It's hot outside!`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Condition <code className="text-white">age &gt;= 18</code> evaluates to True</li>
                      <li>• Indented code (4 spaces or 1 tab) runs when condition is True</li>
                      <li>• Code outside if block always executes</li>
                      <li>• Colon <code className="text-white">:</code> is required after condition</li>
                    </ul>
                  </div>
                </div>

                {/* If-Else */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔄 Example 2: If-Else Statement</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`age = 15

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")

# Another example with number check
number = -5
if number >= 0:
    print("Positive number")
else:
    print("Negative number")

print("Number is:", number)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`You are a minor
Negative number
Number is: -5`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• If condition is False, <code className="text-white">else</code> block executes</li>
                      <li>• Only one block (if or else) runs, never both</li>
                      <li>• <code className="text-white">else</code> doesn't have a condition</li>
                      <li>• First example: age &lt; 18, so else block runs</li>
                    </ul>
                  </div>
                </div>

                {/* If-Elif-Else */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔀 Example 3: If-Elif-Else Statement</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`score = 75

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score: {score}, Grade: {grade}")

# Traffic light example
light = "yellow"
if light == "red":
    print("Stop")
elif light == "yellow":
    print("Slow down")
elif light == "green":
    print("Go")
else:
    print("Invalid light color")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Score: 75, Grade: C
Slow down`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">elif</code> (else if) checks multiple conditions</li>
                      <li>• Conditions checked top-to-bottom, first True executes</li>
                      <li>• Score 75: first two conditions fail, third succeeds (75 &gt;= 70), grade = "C"</li>
                      <li>• Once one block runs, remaining conditions are skipped</li>
                    </ul>
                  </div>
                </div>

                {/* Nested If */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🎯 Example 4: Nested If Statements</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`age = 20
has_license = True

if age >= 18:
    print("You are old enough to drive")
    if has_license:
        print("You can drive!")
    else:
        print("You need to get a license")
else:
    print("You are too young to drive")

# Login example
username = "admin"
password = "secret123"

if username == "admin":
    if password == "secret123":
        print("Login successful!")
    else:
        print("Incorrect password")
else:
    print("User not found")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`You are old enough to drive
You can drive!
Login successful!`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Nested if: if statement inside another if statement</li>
                      <li>• Inner if only checked if outer if is True</li>
                      <li>• First example: age &gt;= 18 is True, then checks has_license</li>
                      <li>• Use additional indentation for nested blocks</li>
                    </ul>
                  </div>
                </div>

                {/* Logical Operators */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔗 Example 5: Combining Conditions</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`age = 20
has_license = True

# Using 'and' - both must be True
if age >= 18 and has_license:
    print("You can drive")

# Using 'or' - at least one must be True
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("No work today!")

# Using 'not' - reverses the condition
is_raining = False
if not is_raining:
    print("You don't need an umbrella")

# Complex condition
temperature = 28
is_sunny = True
if temperature > 25 and is_sunny and not is_raining:
    print("Perfect beach weather!")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`You can drive
No work today!
You don't need an umbrella
Perfect beach weather!`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">and</code> requires all conditions to be True</li>
                      <li>• <code className="text-white">or</code> requires at least one condition to be True</li>
                      <li>• <code className="text-white">not</code> reverses the boolean value</li>
                      <li>• Can combine multiple operators for complex logic</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'conditionals':
        return (
          <div className="animate-fade-in-up">
            <h1 id="conditionals" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Conditionals
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about if, elif, and else statements in Python
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="conditionals" className="text-3xl font-bold text-white mb-6">5. Conditionals (if, elif, else)</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Conditional Statements</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600">
                  <pre className="text-white font-mono text-sm">
                    {`# Basic if statement
if age >= 18:
    print("Adult")
else:
    print("Minor")

# Multiple conditions
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

# Nested conditions
if x > 0:
    if y > 0:
        print("Both positive")
    else:
        print("x positive, y negative")`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'for-loops':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="for-loops" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔄 Python For Loops
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Iterate through sequences and collections
              </p>

              <div className="max-w-6xl mx-auto">
                {/* For Loop Theory */}
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">📚 Understanding For Loops</h2>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">What are For Loops?</h3>
                    <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                      For loops are used to <strong className="text-white">iterate over sequences</strong> (lists, tuples, strings, dictionaries, sets, or ranges). They execute a block of code for each item in the sequence.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Python's for loop is different from other languages—it's more like a <strong className="text-white">for-each loop</strong>. You don't need to manually increment a counter; Python handles iteration automatically.
                    </p>

                    <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-bold mb-2">Common Use Cases:</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• Iterate through lists, tuples, strings</li>
                        <li>• Process dictionary items</li>
                        <li>• Repeat actions a specific number of times</li>
                        <li>• Generate sequences with range()</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Basic For Loop */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Basic For Loop</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Loop through list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}")

# Loop through string
for char in "Python":
    print(char)

# Loop through range
for i in range(5):
    print(f"Number: {i}")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`I like apple
I like banana
I like cherry
P
y
t
h
o
n
Number: 0
Number: 1
Number: 2
Number: 3
Number: 4`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">for fruit in fruits:</code> iterates through each item</li>
                      <li>• Strings are iterable—loop through each character</li>
                      <li>• <code className="text-white">range(5)</code> generates numbers 0 to 4</li>
                      <li>• Loop variable (fruit, char, i) changes each iteration</li>
                    </ul>
                  </div>
                </div>

                {/* Range Function */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔢 Example 2: Using range()</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# range(stop) - from 0 to stop-1
for i in range(5):
    print(i, end=" ")
print()

# range(start, stop) - from start to stop-1
for i in range(2, 7):
    print(i, end=" ")
print()

# range(start, stop, step) - with step
for i in range(0, 10, 2):
    print(i, end=" ")
print()

# Reverse range
for i in range(5, 0, -1):
    print(i, end=" ")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`0 1 2 3 4 
2 3 4 5 6 
0 2 4 6 8 
5 4 3 2 1 `}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">range(5)</code> generates 0, 1, 2, 3, 4</li>
                      <li>• <code className="text-white">range(2, 7)</code> generates 2, 3, 4, 5, 6</li>
                      <li>• <code className="text-white">range(0, 10, 2)</code> steps by 2: 0, 2, 4, 6, 8</li>
                      <li>• Negative step counts backwards</li>
                    </ul>
                  </div>
                </div>

                {/* Enumerate */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📊 Example 3: Loop with Index (enumerate)</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`fruits = ["apple", "banana", "cherry"]

# Using enumerate to get index and value
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Start index from 1 instead of 0
print("\\nStarting from 1:")
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`0: apple
1: banana
2: cherry

Starting from 1:
1. apple
2. banana
3. cherry`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">enumerate()</code> returns both index and value</li>
                      <li>• Default index starts at 0</li>
                      <li>• <code className="text-white">start=1</code> parameter begins indexing from 1</li>
                      <li>• Useful when you need both position and item</li>
                    </ul>
                  </div>
                </div>

                {/* Break and Continue */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">⏭️ Example 4: Break and Continue</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# break - exit loop early
for i in range(10):
    if i == 5:
        print("Breaking at 5")
        break
    print(i)

print()

# continue - skip current iteration
for i in range(5):
    if i == 2:
        print("Skipping 2")
        continue
    print(i)

print()

# Practical example: search
numbers = [1, 3, 5, 7, 9, 12, 15]
for num in numbers:
    if num % 2 == 0:
        print(f"Found even number: {num}")
        break
else:
    print("No even number found")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`0
1
2
3
4
Breaking at 5

0
1
Skipping 2
3
4

Found even number: 12`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">break</code> exits the loop immediately</li>
                      <li>• <code className="text-white">continue</code> skips to next iteration</li>
                      <li>• <code className="text-white">else</code> clause runs if loop completes without break</li>
                      <li>• Useful for search operations and conditional skipping</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'while-loops':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="while-loops" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔁 Python While Loops
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Repeat code while a condition is true
              </p>

              <div className="max-w-6xl mx-auto">
                {/* While Loop Theory */}
                <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-red-400 mb-6">📚 Understanding While Loops</h2>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">What are While Loops?</h3>
                    <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                      While loops <strong className="text-white">repeat a block of code as long as a condition is True</strong>. Unlike for loops, they don't iterate through a sequence—they continue until the condition becomes False.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      While loops are ideal when you don't know in advance how many iterations you need. <strong className="text-white">⚠️ Be careful:</strong> if the condition never becomes False, you'll create an infinite loop!
                    </p>

                    <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-bold mb-2">When to Use While Loops:</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• Unknown number of iterations</li>
                        <li>• Wait for user input or event</li>
                        <li>• Repeat until specific condition met</li>
                        <li>• Game loops, input validation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Basic While Loop */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Basic While Loop</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Count from 1 to 5
count = 1
while count <= 5:
    print(f"Count: {count}")
    count += 1

print("Done!")

# Countdown
countdown = 5
while countdown > 0:
    print(countdown)
    countdown -= 1
print("Blast off!")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
Done!
5
4
3
2
1
Blast off!`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Condition <code className="text-white">count &lt;= 5</code> checked before each iteration</li>
                      <li>• <code className="text-white">count += 1</code> updates variable (must change or infinite loop!)</li>
                      <li>• When condition becomes False, loop exits</li>
                      <li>• Second example counts down from 5 to 1</li>
                    </ul>
                  </div>
                </div>

                {/* While with Break */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🛑 Example 2: While with Break</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Infinite loop with break
count = 0
while True:
    print(count)
    count += 1
    if count >= 5:
        break

print("\\nGuess the number:")
secret = 7
attempts = 0

while True:
    guess = int(input("Enter guess (1-10): "))
    attempts += 1
    
    if guess == secret:
        print(f"Correct! Took {attempts} attempts")
        break
    elif guess < secret:
        print("Too low!")
    else:
        print("Too high!")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output (first example):</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`0
1
2
3
4`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">while True:</code> creates infinite loop</li>
                      <li>• <code className="text-white">break</code> is used to exit when condition met</li>
                      <li>• Second example: guessing game runs until correct answer</li>
                      <li>• Common pattern for input validation and games</li>
                    </ul>
                  </div>
                </div>

                {/* While with Continue */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">⏭️ Example 3: While with Continue</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Skip even numbers
num = 0
while num < 10:
    num += 1
    if num % 2 == 0:
        continue  # Skip even numbers
    print(num)

print("\\nOnly positive:")
count = -5
while count < 5:
    count += 1
    if count <= 0:
        continue
    print(count)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`1
3
5
7
9

Only positive:
1
2
3
4
5`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">continue</code> skips rest of current iteration</li>
                      <li>• First example: skip even numbers, print only odd</li>
                      <li>• Second example: skip non-positive numbers</li>
                      <li>• ⚠️ Increment BEFORE continue to avoid infinite loop</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'loops':
        return (
          <div className="animate-fade-in-up">
            <h1 id="loops" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Loops
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about for and while loops in Python
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="loops" className="text-3xl font-bold text-white mb-6">6. Loops</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Loop Types</h3>
                <div className="space-y-6">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-2">for Loop</h4>
                    <div className="bg-gray-900 p-3 rounded">
                      <pre className="text-white font-mono text-sm">
                        {`# Iterate through range
for i in range(5):
    print(i)

# Iterate through list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)

# With index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")`}
                      </pre>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-2">while Loop</h4>
                    <div className="bg-gray-900 p-3 rounded">
                      <pre className="text-white font-mono text-sm">
                        {`# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1

# Break and continue
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == 'quit':
        break
    elif user_input == 'skip':
        continue
    print(f"You entered: {user_input}")`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'strings':
        return (
          <div className="animate-fade-in-up">
            <h1 id="strings" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Strings
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about string manipulation in Python
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="strings" className="text-3xl font-bold text-white mb-6">7. Strings</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">String Operations</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="bg-gray-700 p-3 rounded">
                      <code className="text-white">len(string)</code>
                      <span className="text-gray-300 ml-3"># Get string length</span>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <code className="text-white">string.upper()</code>
                      <span className="text-gray-300 ml-3"># Convert to uppercase</span>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <code className="text-white">string.lower()</code>
                      <span className="text-gray-300 ml-3"># Convert to lowercase</span>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <code className="text-white">string.strip()</code>
                      <span className="text-gray-300 ml-3"># Remove whitespace</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gray-700 p-3 rounded">
                      <code className="text-white">string.split()</code>
                      <span className="text-gray-300 ml-3"># Split into list</span>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <code className="text-white">string.replace()</code>
                      <span className="text-gray-300 ml-3"># Replace substring</span>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <code className="text-white">string.find()</code>
                      <span className="text-gray-300 ml-3"># Find substring</span>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <code className="text-white">string.format()</code>
                      <span className="text-gray-300 ml-3"># Format string</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">String Formatting</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600">
                  <pre className="text-white font-mono text-sm">
                    {`# f-strings (Python 3.6+)
name = "Alice"
age = 25
message = f"Hello, {name}! You are {age} years old."

# .format() method
message = "Hello, {}! You are {} years old.".format(name, age)

# % formatting
message = "Hello, %s! You are %d years old." % (name, age)`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Q&A Section from PDF Documentation */}
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold text-green-300 mb-6">🧠 Strings - Knowledge Check</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Test your understanding with these theoretical questions from Python documentation and best practices.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q1. What will be the output of the following code?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`s = "Python"
print(s[::-1])`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Python</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">nohtyP ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Error</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">None</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> [::-1] reverses the string by slicing with step -1.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q2. Which of the following is immutable in Python?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-green-300 font-semibold">String ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">List</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Dictionary</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">Set</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> Strings are immutable in Python - once created, they cannot be changed.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q3. What will the following code print?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`s = "OpenAI"
print(s[1:5:2])`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Oe</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">pn ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">pe</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">pA</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> s[1:5:2] starts at index 1 ("p"), takes every 2nd character, so "p" and "n".
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q4. Which method removes whitespace from both ends of a string?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-green-300 font-semibold">strip() ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">lstrip()</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">rstrip()</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">trim()</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> strip() removes whitespace from both ends, lstrip() from left, rstrip() from right.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q5. Output of the code below?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`s = "banana"
print(s.count("na"))`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">1</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">2 ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">3</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">0</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> "na" appears twice in "banana" at positions 2-3 and 4-5.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q6. What will print("Python".upper().isupper()) return?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-green-300 font-semibold">True ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">False</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Error</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">None</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> upper() converts to "PYTHON", then isupper() returns True.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q7. What is the output of this code?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`text = "Hello World"
print(text.split())`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Hello World</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">['Hello', 'World'] ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Error</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">None</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> split() without arguments splits on whitespace and returns a list.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q8. Which of the following is FALSE about Python strings?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Strings are immutable</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">Strings can be indexed</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Strings can be concatenated</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-green-300 font-semibold">Strings can be changed in-place ✓</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> Strings are immutable - they cannot be changed in-place. You must create new strings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="font-bold text-blue-300 mb-2">📖 Theoretical Deep Dive</h4>
                <p className="text-gray-300 text-sm">
                  <strong>References:</strong> These questions are based on official Python documentation (docs.python.org),
                  string methods reference, and Python's immutable string type. Understanding string immutability,
                  slicing, and string methods is essential for effective text processing in Python.
                </p>
              </div>
            </div>
          </div>
        );

      case 'lists':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="lists" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📋 Python Lists
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Ordered, mutable collections that can store multiple items
              </p>

              <div className="max-w-6xl mx-auto">
                {/* Lists Theory */}
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-6">📚 Understanding Lists</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-400 mb-4">What are Lists?</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        Lists are one of the most versatile and commonly used data structures in Python. They are <strong className="text-white">ordered, mutable collections</strong> that can store items of different data types. Lists are created using square brackets <code className="text-white">[]</code>.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Unlike arrays in other languages, Python lists can contain mixed types (integers, strings, objects, even other lists). Lists are <strong className="text-white">dynamic</strong>, meaning they can grow or shrink in size as needed.
                      </p>

                      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Key Characteristics:</h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-white">Ordered:</strong> Elements maintain their insertion order</li>
                          <li>• <strong className="text-white">Mutable:</strong> Can add, remove, or modify elements</li>
                          <li>• <strong className="text-white">Allow Duplicates:</strong> Can have repeated values</li>
                          <li>• <strong className="text-white">Indexed:</strong> Access by position (0-based indexing)</li>
                          <li>• <strong className="text-white">Dynamic Size:</strong> Automatically grows/shrinks</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creating Lists */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Creating Lists</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Empty list
empty_list = []

# List with items
fruits = ["apple", "banana", "cherry"]

# Mixed data types
mixed = [1, "hello", 3.14, True, [1, 2, 3]]

# Using list() constructor
numbers = list((1, 2, 3, 4, 5))

print(fruits)
print(mixed)
print(type(fruits))
print("Length:", len(fruits))`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`['apple', 'banana', 'cherry']
[1, 'hello', 3.14, True, [1, 2, 3]]
<class 'list'>
Length: 3`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Lists can contain any data types, including other lists (nested lists)</li>
                      <li>• <code className="text-white">len()</code> returns number of items in the list</li>
                      <li>• <code className="text-white">list()</code> constructor can convert other sequences to lists</li>
                    </ul>
                  </div>
                </div>

                {/* Accessing Lists */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔍 Example 2: Accessing List Items</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`fruits = ["apple", "banana", "cherry", "orange"]

# Access by index
print("First item:", fruits[0])
print("Second item:", fruits[1])

# Negative indexing
print("Last item:", fruits[-1])
print("Second to last:", fruits[-2])

# Slicing
print("First two items:", fruits[0:2])
print("From index 1:", fruits[1:])
print("Last two items:", fruits[-2:])`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`First item: apple
Second item: banana
Last item: orange
Second to last: cherry
First two items: ['apple', 'banana']
From index 1: ['banana', 'cherry', 'orange']
Last two items: ['cherry', 'orange']`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Index starts at 0: first item is <code className="text-white">fruits[0]</code></li>
                      <li>• Negative indexing: -1 is last item, -2 is second to last</li>
                      <li>• Slicing <code className="text-white">[0:2]</code> returns items at index 0 and 1 (2 is excluded)</li>
                      <li>• Slicing returns a new list (doesn't modify original)</li>
                    </ul>
                  </div>
                </div>

                {/* Modifying Lists */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">✏️ Example 3: Modifying Lists</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`fruits = ["apple", "banana", "cherry"]

# Change item
fruits[1] = "mango"
print("After change:", fruits)

# Add item to end
fruits.append("orange")
print("After append:", fruits)

# Insert at specific position
fruits.insert(1, "grape")
print("After insert:", fruits)

# Remove item
fruits.remove("apple")
print("After remove:", fruits)

# Remove by index
removed = fruits.pop(0)
print(f"Popped: {removed}, List: {fruits}")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`After change: ['apple', 'mango', 'cherry']
After append: ['apple', 'mango', 'cherry', 'orange']
After insert: ['apple', 'grape', 'mango', 'cherry', 'orange']
After remove: ['grape', 'mango', 'cherry', 'orange']
Popped: grape, List: ['mango', 'cherry', 'orange']`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">append()</code> adds item to end of list</li>
                      <li>• <code className="text-white">insert(index, item)</code> adds item at specific position</li>
                      <li>• <code className="text-white">remove(item)</code> removes first occurrence of item</li>
                      <li>• <code className="text-white">pop(index)</code> removes and returns item at index</li>
                      <li>• Lists are mutable - operations modify the original list</li>
                    </ul>
                  </div>
                </div>

                {/* List Methods */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Common List Methods</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-3">Adding Elements</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <code className="text-green-400">append(item)</code> - Add to end</li>
                        <li>• <code className="text-green-400">insert(index, item)</code> - Add at position</li>
                        <li>• <code className="text-green-400">extend(list)</code> - Add multiple items</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-3">Removing Elements</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <code className="text-green-400">remove(item)</code> - Remove by value</li>
                        <li>• <code className="text-green-400">pop(index)</code> - Remove by index</li>
                        <li>• <code className="text-green-400">clear()</code> - Remove all items</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-3">Searching</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <code className="text-green-400">index(item)</code> - Find position</li>
                        <li>• <code className="text-green-400">count(item)</code> - Count occurrences</li>
                        <li>• <code className="text-green-400">in</code> - Check if exists</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-3">Sorting</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <code className="text-green-400">sort()</code> - Sort in place</li>
                        <li>• <code className="text-green-400">reverse()</code> - Reverse order</li>
                        <li>• <code className="text-green-400">sorted(list)</code> - Return sorted copy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'tuples':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="tuples" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📦 Python Tuples
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Ordered, immutable collections for storing related data
              </p>

              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6">📚 Understanding Tuples</h2>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">What are Tuples?</h3>
                    <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                      Tuples are <strong className="text-white">ordered, immutable sequences</strong> created using parentheses <code className="text-white">()</code>. Once created, tuples cannot be modified—you can't add, remove, or change elements.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Tuples are faster than lists and protect data from accidental modification. They're commonly used for <strong className="text-white">fixed collections of related items</strong>, like coordinates (x, y), RGB colors (r, g, b), or database records.
                    </p>

                    <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-bold mb-2">Tuple vs List:</h4>
                      <div className="grid md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-white font-semibold text-sm mb-1">Tuple (Immutable)</p>
                          <ul className="text-gray-300 text-xs space-y-1">
                            <li>✅ Faster performance</li>
                            <li>✅ Can be dictionary keys</li>
                            <li>✅ Data protection</li>
                            <li>❌ Cannot modify</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm mb-1">List (Mutable)</p>
                          <ul className="text-gray-300 text-xs space-y-1">
                            <li>✅ Can add/remove items</li>
                            <li>✅ More flexible</li>
                            <li>❌ Slower than tuples</li>
                            <li>❌ Cannot be dict keys</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tuple Examples */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Creating and Using Tuples</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Creating tuples
fruits = ("apple", "banana", "cherry")
coordinates = (10, 20)
single_item = ("hello",)  # Note the comma
mixed = (1, "text", 3.14, True)

print(fruits)
print(coordinates)
print(single_item)
print(type(fruits))

# Accessing elements
print("First fruit:", fruits[0])
print("Last fruit:", fruits[-1])

# Tuple unpacking
x, y = coordinates
print(f"x = {x}, y = {y}")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`('apple', 'banana', 'cherry')
(10, 20)
('hello',)
<class 'tuple'>
First fruit: apple
Last fruit: cherry
x = 10, y = 20`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Single-item tuples need comma: <code className="text-white">("hello",)</code></li>
                      <li>• Access like lists: index starts at 0, supports negative indexing</li>
                      <li>• <strong className="text-white">Tuple unpacking:</strong> assign tuple values to variables</li>
                      <li>• Cannot modify: <code className="text-red-300">fruits[0] = "orange"</code> raises TypeError</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'sets':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="sets" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🎯 Python Sets
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Unordered collections of unique elements
              </p>

              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-orange-400 mb-6">📚 Understanding Sets</h2>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-orange-400 mb-4">What are Sets?</h3>
                    <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                      Sets are <strong className="text-white">unordered collections of unique elements</strong>. They automatically remove duplicates and are created using curly braces <code className="text-white">{`{}`}</code> or the <code className="text-white">set()</code> constructor.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Sets are perfect for <strong className="text-white">membership testing</strong>, <strong className="text-white">removing duplicates</strong>, and performing <strong className="text-white">mathematical set operations</strong> like union, intersection, and difference.
                    </p>

                    <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-bold mb-2">Key Characteristics:</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Unordered:</strong> No index access, no guaranteed order</li>
                        <li>• <strong className="text-white">Unique Elements:</strong> Automatically removes duplicates</li>
                        <li>• <strong className="text-white">Mutable:</strong> Can add/remove items</li>
                        <li>• <strong className="text-white">Fast Membership Testing:</strong> O(1) lookup time</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Set Examples */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Creating Sets and Removing Duplicates</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Create set with duplicates
numbers = {1, 2, 3, 2, 1, 4, 5, 3}
print("Set (duplicates removed):", numbers)

# Create set from list (removes duplicates)
my_list = [1, 2, 2, 3, 3, 3, 4, 4, 5]
unique_numbers = set(my_list)
print("Unique from list:", unique_numbers)

# Empty set (must use set(), not {})
empty = set()
print("Empty set:", empty)

# Check membership
print("Is 3 in set?", 3 in numbers)
print("Is 10 in set?", 10 in numbers)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Set (duplicates removed): {1, 2, 3, 4, 5}
Unique from list: {1, 2, 3, 4, 5}
Empty set: set()
Is 3 in set? True
Is 10 in set? False`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Sets automatically remove duplicate values</li>
                      <li>• Order is not guaranteed (may print in different order)</li>
                      <li>• <code className="text-white">in</code> operator is very fast with sets (O(1))</li>
                      <li>• <code className="text-white">{`{}`}</code> creates empty dictionary, use <code className="text-white">set()</code> for empty set</li>
                    </ul>
                  </div>
                </div>

                {/* Set Operations */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔧 Example 2: Set Operations</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# Union (all elements from both sets)
print("Union:", set1 | set2)
print("Union:", set1.union(set2))

# Intersection (common elements)
print("Intersection:", set1 & set2)
print("Intersection:", set1.intersection(set2))

# Difference (in set1 but not set2)
print("Difference:", set1 - set2)

# Symmetric Difference (in either but not both)
print("Symmetric Diff:", set1 ^ set2)`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Union: {1, 2, 3, 4, 5, 6, 7, 8}
Union: {1, 2, 3, 4, 5, 6, 7, 8}
Intersection: {4, 5}
Intersection: {4, 5}
Difference: {1, 2, 3}
Symmetric Diff: {1, 2, 3, 6, 7, 8}`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">|</code> or <code className="text-white">union()</code> combines all unique elements</li>
                      <li>• <code className="text-white">&</code> or <code className="text-white">intersection()</code> finds common elements</li>
                      <li>• <code className="text-white">-</code> finds elements in first set but not second</li>
                      <li>• <code className="text-white">^</code> finds elements in either set but not both</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'dictionaries':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="dictionaries" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🗺️ Python Dictionaries
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Key-value pairs for storing and retrieving data efficiently
              </p>

              <div className="max-w-6xl mx-auto">
                {/* Dictionary Theory */}
                <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-indigo-400 mb-6">📚 Understanding Dictionaries</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-indigo-400 mb-4">What are Dictionaries?</h3>
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        Dictionaries are <strong className="text-white">unordered collections of key-value pairs</strong>. They are Python's implementation of hash tables/hash maps, providing fast O(1) lookup time. Created using curly braces <code className="text-white">{`{}`}</code> with <code className="text-white">key: value</code> pairs.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Dictionaries are extremely versatile and are used for storing related data (like a person's attributes), caching, counting occurrences, and representing complex data structures like JSON.
                      </p>

                      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Key Characteristics:</h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-white">Key-Value Pairs:</strong> Each key maps to a value</li>
                          <li>• <strong className="text-white">Unique Keys:</strong> Keys must be unique and immutable</li>
                          <li>• <strong className="text-white">Mutable:</strong> Can add, modify, delete pairs</li>
                          <li>• <strong className="text-white">Fast Lookup:</strong> O(1) average case for accessing values</li>
                          <li>• <strong className="text-white">Ordered (Python 3.7+):</strong> Maintains insertion order</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creating Dictionaries */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">📝 Example 1: Creating and Accessing Dictionaries</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`# Create dictionary
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

print(person)
print(type(person))

# Access values by key
print("Name:", person["name"])
print("Age:", person["age"])

# Using get() method (safer)
print("City:", person.get("city"))
print("Country:", person.get("country", "USA"))  # Default value`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`{'name': 'Alice', 'age': 25, 'city': 'New York'}
<class 'dict'>
Name: Alice
Age: 25
City: New York
Country: USA`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <code className="text-white">dict["key"]</code> accesses value, raises KeyError if key doesn't exist</li>
                      <li>• <code className="text-white">get("key", default)</code> returns default if key not found (safer)</li>
                      <li>• Keys can be strings, numbers, tuples (must be immutable)</li>
                      <li>• Values can be any type (including lists, dicts, objects)</li>
                    </ul>
                  </div>
                </div>

                {/* Modifying Dictionaries */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">✏️ Example 2: Modifying Dictionaries</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`person = {"name": "Alice", "age": 25}

# Add new key-value pair
person["city"] = "New York"
print("After adding city:", person)

# Modify existing value
person["age"] = 26
print("After updating age:", person)

# Remove item
del person["city"]
print("After deleting city:", person)

# Remove and return value
age = person.pop("age")
print(f"Popped age: {age}, Dict: {person}")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`After adding city: {'name': 'Alice', 'age': 25, 'city': 'New York'}
After updating age: {'name': 'Alice', 'age': 26, 'city': 'New York'}
After deleting city: {'name': 'Alice', 'age': 26}
Popped age: 26, Dict: {'name': 'Alice'}`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Assign to new key to add: <code className="text-white">dict["new_key"] = value</code></li>
                      <li>• Assign to existing key to update value</li>
                      <li>• <code className="text-white">del</code> removes key-value pair</li>
                      <li>• <code className="text-white">pop(key)</code> removes and returns the value</li>
                    </ul>
                  </div>
                </div>

                {/* Dictionary Methods */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🔄 Example 3: Looping Through Dictionaries</h3>

                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Code:</p>
                    <pre className="text-green-400 font-mono text-sm">{`person = {"name": "Alice", "age": 25, "city": "NYC"}

# Loop through keys
print("Keys:")
for key in person:
    print(key)

# Loop through values
print("\\nValues:")
for value in person.values():
    print(value)

# Loop through key-value pairs
print("\\nKey-Value pairs:")
for key, value in person.items():
    print(f"{key}: {value}")`}</pre>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Output:</p>
                    <pre className="text-yellow-300 font-mono text-sm">{`Keys:
name
age
city

Values:
Alice
25
NYC

Key-Value pairs:
name: Alice
age: 25
city: NYC`}</pre>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">💡 Explanation:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Looping through dict directly gives keys</li>
                      <li>• <code className="text-white">.values()</code> returns all values</li>
                      <li>• <code className="text-white">.items()</code> returns key-value pairs as tuples</li>
                      <li>• Can unpack in loop: <code className="text-white">for key, value in dict.items()</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'data-structures':
        return (
          <div className="animate-fade-in-up">
            <h1 id="data-structures" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Data Structures
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about lists, tuples, dictionaries, and sets
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="data-structures" className="text-3xl font-bold text-white mb-6">8. Data Structures</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Lists, Tuples, Sets, Dictionaries</h3>
                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Lists</h4>
                    <p className="text-gray-300 text-sm mb-2">Ordered, mutable</p>
                    <div className="bg-gray-900 p-2 rounded">
                      <pre className="text-white font-mono text-xs">
                        {`fruits = ["apple", "banana"]
fruits.append("orange")
fruits[0] = "grape"`}
                      </pre>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Tuples</h4>
                    <p className="text-gray-300 text-sm mb-2">Ordered, immutable</p>
                    <div className="bg-gray-900 p-2 rounded">
                      <pre className="text-white font-mono text-xs">
                        {`coordinates = (10, 20)
x, y = coordinates`}
                      </pre>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-purple-400 mb-2">Sets</h4>
                    <p className="text-gray-300 text-sm mb-2">Unordered, unique elements</p>
                    <div className="bg-gray-900 p-2 rounded">
                      <pre className="text-white font-mono text-xs">
                        {`numbers = {1, 2, 3}
numbers.add(4)`}
                      </pre>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-yellow-400 mb-2">Dictionaries</h4>
                    <p className="text-gray-300 text-sm mb-2">Key-value pairs</p>
                    <div className="bg-gray-900 p-2 rounded">
                      <pre className="text-white font-mono text-xs">
                        {`person = {"name": "Alice", "age": 25}
person["city"] = "NYC"`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Q&A Section from PDF Documentation */}
            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold text-orange-300 mb-6">🧠 Loops - Knowledge Check</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Test your understanding with these theoretical questions from Python documentation and best practices.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q1. Which loop in Python is more suitable when the number of iterations is not known in advance?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">for loop</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">while loop ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">do-while loop</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">foreach loop</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> While loops are ideal when you don't know how many iterations you need in advance.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q2. What does the pass statement do inside a loop?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Skips the current iteration</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">Exits the loop</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-green-300 font-semibold">Does nothing (acts as a placeholder) ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">Raises an error</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> 'pass' is a null operation - it does nothing but serves as a placeholder for syntactically required code.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q3. What will this code output?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`for i in range(5):
if i == 3:
    break
print(i, end=" ")`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">0 1 2 3</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">0 1 2 ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">0 1 2 3 4</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">Nothing</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> 'break' exits the loop when i equals 3, so only 0, 1, 2 are printed.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q4. What will this code output?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`for i in range(5):
if i == 2:
    continue
print(i, end=" ")`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-green-300 font-semibold">0 1 3 4 ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">0 1 2 3 4</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">0 1</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">2 3 4</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> 'continue' skips the current iteration when i equals 2, so 2 is not printed.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q5. What is the output of this code?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`for i in range(3):
pass
print("Done")`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Nothing</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">Done ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Error</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">pass</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> 'pass' does nothing, so the loop runs 3 times doing nothing, then prints "Done".
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q6. Which statement is true about nested loops?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">They are not allowed in Python</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">Inner loop completes fully for each outer loop iteration ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Only while loops can be nested</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">They always create infinite loops</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> In nested loops, the inner loop runs completely for each iteration of the outer loop.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q7. What happens if you don't update the loop variable in a while loop?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">The loop runs once and stops</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">Python automatically updates it</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-green-300 font-semibold">You get an infinite loop ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">The loop doesn't run at all</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> If the condition never changes, the while loop will run forever.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q8. What is the difference between break and continue?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">They do the same thing</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">break exits the loop, continue skips to next iteration ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">continue exits the loop, break skips to next iteration</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">Both exit the loop</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> 'break' completely exits the loop, while 'continue' skips the rest of the current iteration and continues with the next one.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="font-bold text-blue-300 mb-2">📖 Theoretical Deep Dive</h4>
                <p className="text-gray-300 text-sm">
                  <strong>References:</strong> These questions are based on official Python documentation (docs.python.org),
                  control flow concepts, and Python's loop mechanisms. Understanding loop control statements (break, continue, pass)
                  and the difference between for and while loops is crucial for writing efficient Python programs.
                </p>
              </div>
            </div>
          </div>
        );

      case 'functions':
        return (
          <div className="animate-fade-in-up">
            <h1 id="functions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Functions - Complete Guide
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Master functions from basics to advanced concepts with comprehensive examples
            </p>

            <div className="max-w-6xl mx-auto">
              {/* Complete Theory Section */}
              <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 p-8 rounded-2xl mb-8">
                <h2 className="text-3xl font-bold text-purple-400 mb-6">📚 What Are Functions?</h2>

                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Complete Definition & Theory</h3>
                    <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                      A <strong className="text-white">function</strong> is a self-contained block of code that performs a specific task or related group of tasks.
                      Functions are fundamental building blocks in Python programming that allow you to organize code into reusable, modular components.
                    </p>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      Think of a function like a recipe in cooking: you define the steps once (the function definition), and then you can use
                      that recipe many times (function calls) to make the dish whenever you need it. Just like a recipe can take ingredients
                      (parameters) and produce a finished dish (return value), functions take inputs and produce outputs.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      In computer science terms, functions implement the principle of <strong className="text-white">procedural abstraction</strong> -
                      they hide the complexity of how a task is performed while providing a simple interface to use that functionality.
                    </p>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Why Functions Are Essential</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-green-400 font-bold mb-3">✅ Advantages</h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-white">Code Reusability:</strong> Write once, use everywhere</li>
                          <li>• <strong className="text-white">Modularity:</strong> Break complex programs into manageable pieces</li>
                          <li>• <strong className="text-white">Maintainability:</strong> Fix bugs in one place</li>
                          <li>• <strong className="text-white">Readability:</strong> Self-documenting code with meaningful names</li>
                          <li>• <strong className="text-white">Testing:</strong> Test individual functions in isolation</li>
                          <li>• <strong className="text-white">Abstraction:</strong> Hide implementation details</li>
                          <li>• <strong className="text-white">Namespace:</strong> Avoid variable name conflicts</li>
                          <li>• <strong className="text-white">Collaboration:</strong> Team members can work on different functions</li>
                        </ul>
                      </div>

                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-yellow-400 font-bold mb-3">🎯 Real-World Examples</h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• <strong className="text-white">calculate_tax():</strong> Compute tax on purchases</li>
                          <li>• <strong className="text-white">send_email():</strong> Send emails to users</li>
                          <li>• <strong className="text-white">validate_password():</strong> Check password strength</li>
                          <li>• <strong className="text-white">process_payment():</strong> Handle transactions</li>
                          <li>• <strong className="text-white">generate_report():</strong> Create business reports</li>
                          <li>• <strong className="text-white">resize_image():</strong> Process image files</li>
                          <li>• <strong className="text-white">fetch_data():</strong> Get data from APIs</li>
                          <li>• <strong className="text-white">encrypt_data():</strong> Secure sensitive information</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">How Functions Work Internally</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Step-by-Step Execution Process:</h4>
                        <ol className="text-gray-300 text-sm space-y-2 list-decimal ml-5">
                          <li><strong className="text-white">Function Definition:</strong> Python stores the function code in memory</li>
                          <li><strong className="text-white">Function Call:</strong> Program execution jumps to the function</li>
                          <li><strong className="text-white">Parameter Binding:</strong> Arguments are assigned to parameters</li>
                          <li><strong className="text-white">Local Scope Creation:</strong> New namespace created for function variables</li>
                          <li><strong className="text-white">Code Execution:</strong> Function body code runs line by line</li>
                          <li><strong className="text-white">Return Value:</strong> Function sends result back to caller</li>
                          <li><strong className="text-white">Scope Cleanup:</strong> Local variables are destroyed</li>
                          <li><strong className="text-white">Resume Execution:</strong> Program continues after the function call</li>
                        </ol>
                      </div>

                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">Memory and Stack Frames:</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          When you call a function, Python creates a <strong className="text-white">stack frame</strong> (also called activation record)
                          that contains the function's local variables, parameters, and return address. This frame is pushed onto the
                          <strong className="text-white"> call stack</strong>. When the function returns, the frame is popped off the stack.
                        </p>
                        <div className="bg-gray-900 p-3 rounded font-mono text-xs text-green-400">
                          {`# Visual representation of call stack
main() starts                    ← Bottom of stack
  ↓ calls function_a()
    ↓ calls function_b()
      ↓ calls function_c()       ← Top of stack (current execution)
      ↓ function_c() returns
    ↓ function_b() returns
  ↓ function_a() returns
main() continues`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Function Examples */}
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">🔰 Basic Functions - Step by Step</h2>

                <div className="space-y-8">
                  {/* Example 1 */}
                  <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-green-400 mb-4">Example 1: Simple Function Without Parameters</h3>
                    <p className="text-gray-300 mb-4">
                      The simplest type of function takes no input and just performs an action.
                    </p>

                    <div className="bg-gray-900 p-4 rounded-lg mb-4">
                      <p className="text-white font-semibold mb-2">Code:</p>
                      <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                        {`# Define a simple function
def say_hello():
    """This function prints a greeting message"""
    print("Hello, World!")
    print("Welcome to Python Functions!")
    print("Let's learn together!")

# Call the function
say_hello()

# Call it multiple times
say_hello()
say_hello()`}
                      </pre>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg mb-4">
                      <p className="text-white font-semibold mb-2">Output:</p>
                      <pre className="text-yellow-300 font-mono text-sm">
                        {`Hello, World!
Welcome to Python Functions!
Let's learn together!
Hello, World!
Welcome to Python Functions!
Let's learn together!
Hello, World!
Welcome to Python Functions!
Let's learn together!`}
                      </pre>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                      <p className="text-white font-semibold mb-2">💡 Detailed Explanation:</p>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">def:</strong> Keyword that starts function definition</li>
                        <li>• <strong className="text-white">say_hello:</strong> Function name (follows snake_case convention)</li>
                        <li>• <strong className="text-white">():</strong> Empty parentheses mean no parameters needed</li>
                        <li>• <strong className="text-white">"""docstring""":</strong> Documentation explaining what function does</li>
                        <li>• <strong className="text-white">Indentation:</strong> Function body must be indented (usually 4 spaces)</li>
                        <li>• <strong className="text-white">Function call:</strong> say_hello() executes the code inside the function</li>
                        <li>• <strong className="text-white">Reusability:</strong> Can call same function many times</li>
                      </ul>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">Example 2: Function With Parameters</h3>
                    <p className="text-gray-300 mb-4">
                      Parameters allow functions to accept input values and work with different data each time they're called.
                    </p>

                    <div className="bg-gray-900 p-4 rounded-lg mb-4">
                      <p className="text-white font-semibold mb-2">Code:</p>
                      <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                        {`# Function with one parameter
def greet_person(name):
    """Greets a person by name"""
    print(f"Hello, {name}!")
    print(f"Nice to meet you, {name}!")

# Call with different arguments
greet_person("Alice")
greet_person("Bob")
greet_person("Charlie")

# Function with multiple parameters
def introduce_person(name, age, city):
    """Introduces a person with details"""
    print(f"My name is {name}.")
    print(f"I am {age} years old.")
    print(f"I live in {city}.")
    print("-" * 30)

# Call with multiple arguments
introduce_person("Alice", 25, "New York")
introduce_person("Bob", 30, "London")
introduce_person("Diana", 28, "Tokyo")`}
                      </pre>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg mb-4">
                      <p className="text-white font-semibold mb-2">Output:</p>
                      <pre className="text-yellow-300 font-mono text-sm">
                        {`Hello, Alice!
Nice to meet you, Alice!
Hello, Bob!
Nice to meet you, Bob!
Hello, Charlie!
Nice to meet you, Charlie!
My name is Alice.
I am 25 years old.
I live in New York.
------------------------------
My name is Bob.
I am 30 years old.
I live in London.
------------------------------
My name is Diana.
I am 28 years old.
I live in Tokyo.
------------------------------`}
                      </pre>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                      <p className="text-white font-semibold mb-2">💡 Detailed Explanation:</p>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">Parameters:</strong> Variables defined in function parentheses (name, age, city)</li>
                        <li>• <strong className="text-white">Arguments:</strong> Actual values passed when calling ("Alice", 25, "New York")</li>
                        <li>• <strong className="text-white">Positional Arguments:</strong> Order matters - first argument goes to first parameter</li>
                        <li>• <strong className="text-white">Local Scope:</strong> Parameters only exist inside the function</li>
                        <li>• <strong className="text-white">F-strings:</strong> Used for formatting output with variable values</li>
                        <li>• <strong className="text-white">Flexibility:</strong> Same function works with different data</li>
                      </ul>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">Example 3: Functions That Return Values</h3>
                    <p className="text-gray-300 mb-4">
                      Return statements allow functions to send results back to the code that called them.
                    </p>

                    <div className="bg-gray-900 p-4 rounded-lg mb-4">
                      <p className="text-white font-semibold mb-2">Code:</p>
                      <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                        {`# Function that returns a value
def add_numbers(a, b):
    """Adds two numbers and returns the sum"""
    total = a + b
    return total

# Call and store the return value
result1 = add_numbers(5, 3)
result2 = add_numbers(10, 20)
result3 = add_numbers(100, 250)

print(f"5 + 3 = {result1}")
print(f"10 + 20 = {result2}")
print(f"100 + 250 = {result3}")

# Use return value directly in expressions
double_sum = add_numbers(5, 10) * 2
print(f"(5 + 10) * 2 = {double_sum}")

# Function with multiple return values
def get_rectangle_info(length, width):
    """Calculates area and perimeter of rectangle"""
    area = length * width
    perimeter = 2 * (length + width)
    return area, perimeter  # Returns tuple

# Unpack multiple return values
rect_area, rect_perimeter = get_rectangle_info(10, 5)
print(f"Rectangle (10x5):")
print(f"  Area = {rect_area}")
print(f"  Perimeter = {rect_perimeter}")

# Function with conditional returns
def get_grade(score):
    """Returns letter grade based on score"""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

# Use the function
grade1 = get_grade(95)
grade2 = get_grade(82)
grade3 = get_grade(58)
print(f"Score 95: Grade {grade1}")
print(f"Score 82: Grade {grade2}")
print(f"Score 58: Grade {grade3}")`}
                      </pre>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg mb-4">
                      <p className="text-white font-semibold mb-2">Output:</p>
                      <pre className="text-yellow-300 font-mono text-sm">
                        {`5 + 3 = 8
10 + 20 = 30
100 + 250 = 350
(5 + 10) * 2 = 30
Rectangle (10x5):
  Area = 50
  Perimeter = 30
Score 95: Grade A
Score 82: Grade B
Score 58: Grade F`}
                      </pre>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                      <p className="text-white font-semibold mb-2">💡 Detailed Explanation:</p>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• <strong className="text-white">return keyword:</strong> Sends value back to caller and exits function</li>
                        <li>• <strong className="text-white">Return value:</strong> Can be any data type (int, string, list, tuple, etc.)</li>
                        <li>• <strong className="text-white">Multiple returns:</strong> Return tuple to send multiple values</li>
                        <li>• <strong className="text-white">Tuple unpacking:</strong> Assign multiple return values to multiple variables</li>
                        <li>• <strong className="text-white">Conditional returns:</strong> Different return values based on logic</li>
                        <li>• <strong className="text-white">No return:</strong> Function returns None by default if no return statement</li>
                        <li>• <strong className="text-white">Using returns:</strong> Can store in variables or use directly in expressions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. What are Functions and Why Use Them?</h3>
                <p className="text-gray-300 mb-6">
                  A <strong>function</strong> is a named block of code that performs a specific task. When you call a function, Python executes
                  the code inside it and can optionally return a value. Functions make your code more organized, reusable, and easier to debug.
                </p>

                <div className="space-y-6 mb-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Benefits of Using Functions</h4>
                    <div className="mb-4">
                      <ul className="text-gray-300 text-sm space-y-2 ml-4">
                        <li>• <strong>Code Reusability:</strong> Write once, use many times</li>
                        <li>• <strong>Modularity:</strong> Break complex problems into smaller, manageable pieces</li>
                        <li>• <strong>Maintainability:</strong> Easy to update and fix bugs in one place</li>
                        <li>• <strong>Readability:</strong> Code becomes more self-documenting</li>
                        <li>• <strong>Testing:</strong> Easier to test individual functions</li>
                        <li>• <strong>Abstraction:</strong> Hide complex implementation details</li>
                      </ul>
                    </div>
                    <h5 className="font-bold text-white mb-2">Basic Function Structure</h5>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-white font-mono text-sm">
                        {`# Function definition syntax
def function_name(parameters):
    """
    Docstring - describes what the function does
    """
    # Function body - code that executes
    return value  # Optional return statement

# Function call
result = function_name(arguments)`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Function Components Explained</h4>
                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">
                        <strong>def keyword:</strong> Tells Python you're defining a function
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong>Function name:</strong> Follows the same rules as variable names (use snake_case)
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong>Parameters:</strong> Variables that receive values when the function is called
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong>Function body:</strong> The code that runs when the function is called
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong>Return statement:</strong> Sends a value back to the caller (optional)
                      </p>
                    </div>
                    <h5 className="font-bold text-white mb-2">Simple Function Examples</h5>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-white font-mono text-sm">
                        {`# Example 1: Simple greeting function
def greet():
    """Prints a greeting message"""
    print("Hello, World!")

# Call the function
greet()  # Output: Hello, World!

# Example 2: Function with parameters
def greet_person(name):
    """Greets a specific person"""
    print(f"Hello, {name}!")

# Call with argument
greet_person("Alice")  # Output: Hello, Alice!

# Example 3: Function that returns a value
def add_numbers(a, b):
    """Adds two numbers and returns the result"""
    result = a + b
    return result

# Call and use the return value
sum_result = add_numbers(5, 3)
print(f"5 + 3 = {sum_result}")  # Output: 5 + 3 = 8

# Example 4: Function with multiple parameters
def calculate_rectangle_area(length, width):
    """Calculates the area of a rectangle"""
    area = length * width
    return area

# Call with multiple arguments
area = calculate_rectangle_area(10, 5)
print(f"Rectangle area: {area}")  # Output: Rectangle area: 50`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 p-6 rounded border border-gray-600">
                  <h4 className="font-bold text-purple-400 mb-4 text-lg">Advanced Function Concepts</h4>
                  <div className="mb-4">
                    <p className="text-gray-300 mb-3">
                      Python functions support many advanced features that make them powerful and flexible:
                    </p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded">
                    <pre className="text-white font-mono text-sm">
                      {`# Default Parameters - Parameters with default values
def greet_with_title(name, title="Mr."):
    """Greets someone with an optional title"""
    return f"Hello, {title} {name}!"

# Call without title (uses default)
print(greet_with_title("Smith"))  # Output: Hello, Mr. Smith!

# Call with custom title
print(greet_with_title("Smith", "Dr."))  # Output: Hello, Dr. Smith!

# Keyword Arguments - Specify parameters by name
def create_profile(name, age, city, country="USA"):
    """Creates a user profile"""
    return f"Name: {name}, Age: {age}, City: {city}, Country: {country}"

# Call with keyword arguments (order doesn't matter)
profile = create_profile(age=25, city="New York", name="John")
print(profile)  # Output: Name: John, Age: 25, City: New York, Country: USA

# Variable Arguments - *args for positional arguments
def sum_all(*numbers):
    """Sums all provided numbers"""
    total = 0
    for num in numbers:
        total += num
    return total

# Call with any number of arguments
print(sum_all(1, 2, 3))  # Output: 6
print(sum_all(1, 2, 3, 4, 5))  # Output: 15

# Keyword Arguments - **kwargs for keyword arguments
def create_user(**user_info):
    """Creates a user with any number of attributes"""
    for key, value in user_info.items():
        print(f"{key}: {value}")

# Call with any keyword arguments
create_user(name="Alice", age=30, city="Boston", occupation="Developer")

# Lambda Functions - Anonymous functions
# Syntax: lambda parameters: expression
square = lambda x: x ** 2
print(square(5))  # Output: 25

# Lambda with multiple parameters
multiply = lambda x, y: x * y
print(multiply(3, 4))  # Output: 12

# Using lambda with built-in functions
numbers = [1, 2, 3, 4, 5]
squared_numbers = list(map(lambda x: x ** 2, numbers))
print(squared_numbers)  # Output: [1, 4, 9, 16, 25]

# Filter with lambda
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # Output: [2, 4]`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. Real-World Function Examples</h3>
                <p className="text-gray-300 mb-6">
                  Here are practical examples that demonstrate how functions are used in real-world applications:
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Example 1: Calculator Functions</h4>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-white font-mono text-sm">
                        {`# Calculator with multiple functions
def add(a, b):
    """Adds two numbers"""
    return a + b

def subtract(a, b):
    """Subtracts b from a"""
    return a - b

def multiply(a, b):
    """Multiplies two numbers"""
    return a * b

def divide(a, b):
    """Divides a by b, handles division by zero"""
    if b == 0:
        return "Error: Division by zero!"
    return a / b

def calculator(operation, a, b):
    """Main calculator function"""
    if operation == "add":
        return add(a, b)
    elif operation == "subtract":
        return subtract(a, b)
    elif operation == "multiply":
        return multiply(a, b)
    elif operation == "divide":
        return divide(a, b)
    else:
        return "Error: Invalid operation!"

# Test the calculator
print(calculator("add", 10, 5))      # Output: 15
print(calculator("multiply", 3, 4))  # Output: 12
print(calculator("divide", 10, 0))   # Output: Error: Division by zero!`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-4 text-lg">Example 2: Data Processing Functions</h4>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-white font-mono text-sm">
                        {`# Data processing functions
def calculate_statistics(numbers):
    """Calculates basic statistics for a list of numbers"""
    if not numbers:
        return "Error: Empty list provided"
    
    total = sum(numbers)
    count = len(numbers)
    average = total / count
    maximum = max(numbers)
    minimum = min(numbers)
    
    return {
        "total": total,
        "count": count,
        "average": average,
        "maximum": maximum,
        "minimum": minimum
    }

def process_text(text):
    """Processes text and returns various statistics"""
    words = text.split()
    word_count = len(words)
    char_count = len(text)
    char_count_no_spaces = len(text.replace(" ", ""))
    
    return {
        "word_count": word_count,
        "character_count": char_count,
        "character_count_no_spaces": char_count_no_spaces,
        "average_word_length": char_count_no_spaces / word_count if word_count > 0 else 0
    }

# Test data processing
scores = [85, 92, 78, 96, 88, 91, 87]
stats = calculate_statistics(scores)
print("Test Scores Statistics:")
for key, value in stats.items():
    print(f"{key}: {value}")

text = "Python is a powerful programming language"
text_stats = process_text(text)
print("\\nText Statistics:")
for key, value in text_stats.items():
    print(f"{key}: {value}")`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-purple-400 mb-4 text-lg">Example 3: File Processing Functions</h4>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-white font-mono text-sm">
                        {`# File processing functions
def read_file_lines(filename):
    """Reads all lines from a file and returns them as a list"""
    try:
        with open(filename, 'r') as file:
            lines = file.readlines()
        return [line.strip() for line in lines]
    except FileNotFoundError:
        return f"Error: File '{filename}' not found"
    except Exception as e:
        return f"Error reading file: {e}"

def count_words_in_file(filename):
    """Counts words in a file"""
    lines = read_file_lines(filename)
    if isinstance(lines, str):  # Error message
        return lines
    
    total_words = 0
    for line in lines:
        words = line.split()
        total_words += len(words)
    
    return total_words

def find_longest_word_in_file(filename):
    """Finds the longest word in a file"""
    lines = read_file_lines(filename)
    if isinstance(lines, str):  # Error message
        return lines
    
    longest_word = ""
    for line in lines:
        words = line.split()
        for word in words:
            if len(word) > len(longest_word):
                longest_word = word
    
    return longest_word

# Example usage (would work with actual files)
# word_count = count_words_in_file("sample.txt")
# longest = find_longest_word_in_file("sample.txt")`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Q&A Section from PDF Documentation */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold text-purple-300 mb-6">🧠 Functions - Knowledge Check</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Test your understanding with these theoretical questions from Python documentation and best practices.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q1. Which keyword is used to define a function in Python?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">func</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">def ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">function</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">define</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> The 'def' keyword is used to define functions in Python.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q2. What is the output of the following code?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`def add(a, b=2):
return a + b
print(add(3))`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">3</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">5 ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Error</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">None</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> b has a default value of 2, so add(3) = 3 + 2 = 5.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q3. What is the default return value of a function that doesn't return anything explicitly?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">0</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">None ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">False</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">Empty string</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> Functions without explicit return statements return None by default.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q4. Which of the following are valid function arguments in Python?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Positional arguments</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">Keyword arguments</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Default arguments</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-green-300 font-semibold">All of the above ✓</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> Python supports all types of function arguments: positional, keyword, and default.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q5. What will be the output of this code?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`def func(x, y=10):
return x * y
print(func(5))`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">10</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">15</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-green-300 font-semibold">50 ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">Error</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> y defaults to 10, so func(5) = 5 * 10 = 50.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q6. Which statement is true about *args in functions?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Collects variable keyword arguments</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">Collects variable positional arguments ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Creates a list of arguments</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">Creates a dictionary of arguments</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> *args collects variable positional arguments into a tuple.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q7. What does **kwargs represent in Python functions?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Arbitrary positional arguments</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">Arbitrary keyword arguments as dictionary ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Default arguments</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">Local variables</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> **kwargs collects keyword arguments into a dictionary.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q8. Which of the following is NOT a valid function name?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">my_func</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">_func</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-green-300 font-semibold">1func ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">func1</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> Function names cannot start with a digit. They must start with a letter or underscore.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="font-bold text-blue-300 mb-2">📖 Theoretical Deep Dive</h4>
                <p className="text-gray-300 text-sm">
                  <strong>References:</strong> These questions are based on official Python documentation (docs.python.org),
                  function definition syntax, and Python's callable object system. Understanding function parameters,
                  return values, and scope is essential for writing modular and reusable Python code.
                </p>
              </div>
            </div>
          </div>
        );

      case 'oop':
        return (
          <div className="animate-fade-in-up">
            <h1 id="oop" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Object-Oriented Programming
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about classes and objects in Python
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="oop" className="text-3xl font-bold text-white mb-6">10. Object-Oriented Programming</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Classes and Objects</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600">
                  <pre className="text-white font-mono text-sm">
                    {`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name} and I'm {self.age} years old"
    
    def have_birthday(self):
        self.age += 1

# Create object
person = Person("Alice", 25)
print(person.greet())
person.have_birthday()
print(person.age)  # 26`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Q&A Section from PDF Documentation */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold text-blue-300 mb-6">🧠 Object-Oriented Programming - Knowledge Check</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Test your understanding with these theoretical questions from Python documentation and best practices.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q1. What is the correct syntax to create a class in Python?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">class MyClass { }</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">class MyClass: ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">def MyClass():</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">new MyClass()</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> Python uses 'class ClassName:' syntax, not braces or parentheses.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q2. What is the name of the special method used to initialize a class instance?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">__init__()</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">__init__ ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">constructor()</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">__new__()</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> __init__ is the constructor method in Python classes.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q3. What will be the output of this code?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`class Person:
    def __init__(self, name):
        self.name = name

p = Person("Alice")
print(p.name)`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Error</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">Alice ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">None</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">Person</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> The instance variable self.name is set to "Alice" and can be accessed.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q4. Which keyword is used for inheritance in Python?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">extends</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">No keyword needed ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">inherits</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">super</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> Python uses parentheses: class Child(Parent): instead of a keyword.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q5. What is the output of this code?</h4>
                    <pre className="text-gray-300 text-xs bg-gray-900 p-2 rounded mb-2">{`class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof!"

d = Dog()
print(d.speak())`}</pre>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Some sound</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">Woof! ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Error</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">None</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> Method overriding - Dog's speak() method overrides Animal's speak().
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q6. What does 'self' represent in Python classes?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">The class itself</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">The instance of the class ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">A reserved keyword</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">The parent class</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> 'self' refers to the current instance of the class.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q7. Which of the following is NOT a principle of OOP?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Encapsulation</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-gray-300">Inheritance</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Polymorphism</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-green-300 font-semibold">Recursion ✓</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> The four pillars of OOP are Encapsulation, Inheritance, Polymorphism, and Abstraction.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Q8. What is the purpose of the super() function?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">a)</span>
                        <span className="text-gray-300">Create a new instance</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">b)</span>
                        <span className="text-green-300 font-semibold">Access parent class methods ✓</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">c)</span>
                        <span className="text-gray-300">Delete an object</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-gray-400">d)</span>
                        <span className="text-gray-300">Override methods</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Explanation:</strong> super() allows access to methods in the parent class from the child class.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="font-bold text-blue-300 mb-2">📖 Theoretical Deep Dive</h4>
                <p className="text-gray-300 text-sm">
                  <strong>References:</strong> These questions are based on official Python documentation (docs.python.org),
                  OOP principles, and Python's object model. Understanding classes, inheritance, polymorphism, and
                  encapsulation is essential for writing maintainable and scalable Python applications.
                </p>
              </div>
            </div>
          </div>
        );

      case 'file-handling':
        return (
          <div className="animate-fade-in-up">
            <h1 id="file-handling" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 File Handling
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about file operations in Python
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="file-handling" className="text-3xl font-bold text-white mb-6">11. File Handling</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">File Operations</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600">
                  <pre className="text-white font-mono text-sm">
                    {`# Reading files
with open("file.txt", "r") as file:
    content = file.read()
    print(content)

# Writing files
with open("output.txt", "w") as file:
    file.write("Hello, World!")

# Appending to files
with open("log.txt", "a") as file:
    file.write("New log entry\\n")`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'exception-handling':
        return (
          <div className="animate-fade-in-up">
            <h1 id="exception-handling" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Exception Handling
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about error handling in Python
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="exception-handling" className="text-3xl font-bold text-white mb-6">12. Exception Handling</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Try-Except Blocks</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600">
                  <pre className="text-white font-mono text-sm">
                    {`try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"An error occurred: {e}")
else:
    print("No errors occurred")
finally:
    print("This always executes")

# Custom exceptions
class CustomError(Exception):
    pass

try:
    raise CustomError("Something went wrong")
except CustomError as e:
    print(f"Custom error: {e}")`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'modules-packages':
        return (
          <div className="animate-fade-in-up">
            <h1 id="modules-packages" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Modules & Packages
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about Python modules and packages
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="modules-packages" className="text-3xl font-bold text-white mb-6">13. Modules & Packages</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Importing Modules</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600">
                  <pre className="text-white font-mono text-sm">
                    {`# Import entire module
import math
print(math.pi)

# Import specific function
from math import sqrt
print(sqrt(16))

# Import with alias
import numpy as np
array = np.array([1, 2, 3])

# Import from custom module
from mymodule import my_function`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'advanced-concepts':
        return (
          <div className="animate-fade-in-up">
            <h1 id="advanced-concepts" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Advanced Concepts
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about advanced Python concepts
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="advanced-concepts" className="text-3xl font-bold text-white mb-6">14. Advanced Concepts</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Key Advanced Topics</h3>
                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Decorators</h4>
                    <p className="text-gray-300 text-sm">Functions that modify other functions</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-white mb-2">Generators</h4>
                    <p className="text-gray-300 text-sm">Memory-efficient iterators</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-purple-400 mb-2">Context Managers</h4>
                    <p className="text-gray-300 text-sm">Resource management with 'with'</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-yellow-400 mb-2">Multithreading</h4>
                    <p className="text-gray-300 text-sm">Concurrent programming</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-red-400 mb-2">AsyncIO</h4>
                    <p className="text-gray-300 text-sm">Asynchronous programming</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-indigo-400 mb-2">Memory Management</h4>
                    <p className="text-gray-300 text-sm">Garbage collection and optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // New comprehensive sections
      case 'python-versions':
        return (
          <div className="animate-fade-in-up">
            <h1 id="python-versions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Versions & Installation
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">Python Version History</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Python 2.x (Legacy)</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Released: 2000-2020</li>
                      <li>• Final version: 2.7.18</li>
                      <li>• End of life: January 1, 2020</li>
                      <li>• Legacy support only</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Python 3.x (Current)</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Released: 2008-Present</li>
                      <li>• Current version: 3.12.x</li>
                      <li>• Active development</li>
                      <li>• Recommended for all new projects</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Major Python 3.x Releases</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-800 p-4 rounded">
                      <h4 className="text-white font-bold">Python 3.8</h4>
                      <p className="text-gray-300 text-sm">Walrus operator, positional-only parameters</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded">
                      <h4 className="text-white font-bold">Python 3.9</h4>
                      <p className="text-gray-300 text-sm">Dictionary merge operators, type hints</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded">
                      <h4 className="text-white font-bold">Python 3.10</h4>
                      <p className="text-gray-300 text-sm">Structural pattern matching</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded">
                      <h4 className="text-white font-bold">Python 3.11</h4>
                      <p className="text-gray-300 text-sm">Exception groups, self type</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded">
                      <h4 className="text-white font-bold">Python 3.12</h4>
                      <p className="text-gray-300 text-sm">F-strings improvements, typing enhancements</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">Installation Methods</h2>

                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">🐍 Official Python.org</h3>
                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <p className="text-gray-300 mb-2">Download from python.org:</p>
                      <code className="text-green-400">https://www.python.org/downloads/</code>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Official installer for Windows, macOS, Linux</li>
                      <li>• Includes pip package manager</li>
                      <li>• Comes with IDLE development environment</li>
                      <li>• Most reliable installation method</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">📦 Package Managers</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="text-white font-bold">Windows</h4>
                        <code className="text-green-400 text-sm">choco install python</code>
                      </div>
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="text-white font-bold">macOS</h4>
                        <code className="text-green-400 text-sm">brew install python</code>
                      </div>
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="text-white font-bold">Ubuntu/Debian</h4>
                        <code className="text-green-400 text-sm">sudo apt install python3</code>
                      </div>
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="text-white font-bold">CentOS/RHEL</h4>
                        <code className="text-green-400 text-sm">sudo yum install python3</code>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">🐍 pyenv (Python Version Management)</h3>
                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <p className="text-gray-300 mb-2">Install and manage multiple Python versions:</p>
                      <div className="space-y-2">
                        <code className="text-green-400 block">curl https://pyenv.run | bash</code>
                        <code className="text-green-400 block">pyenv install 3.12.0</code>
                        <code className="text-green-400 block">pyenv global 3.12.0</code>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Switch between Python versions easily</li>
                      <li>• Project-specific Python versions</li>
                      <li>• No system-wide Python conflicts</li>
                      <li>• Essential for professional development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'virtual-environments':
        return (
          <div className="animate-fade-in-up">
            <h1 id="virtual-environments" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Virtual Environments
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">What are Virtual Environments?</h2>

                <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6 mb-6">
                  <p className="text-gray-300 text-lg mb-4">
                    A virtual environment is an isolated Python environment that allows you to install packages
                    and dependencies separately for each project, preventing conflicts between different projects.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-4 rounded">
                      <h3 className="text-white font-bold mb-3">✅ Benefits</h3>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Isolated package installations</li>
                        <li>• No version conflicts</li>
                        <li>• Reproducible environments</li>
                        <li>• Easy project cleanup</li>
                        <li>• Professional development practice</li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 p-4 rounded">
                      <h3 className="text-white font-bold mb-3">❌ Without Virtual Environments</h3>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Global package conflicts</li>
                        <li>• Different project requirements clash</li>
                        <li>• Difficult to reproduce environments</li>
                        <li>• System-wide package pollution</li>
                        <li>• Deployment issues</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">venv (Built-in Virtual Environment)</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <h4 className="text-white font-bold mb-2">Basic Usage:</h4>
                      <div className="space-y-2">
                        <code className="text-green-400 block"># Create virtual environment</code>
                        <code className="text-green-400 block">python -m venv myproject_env</code>
                        <code className="text-green-400 block"># Activate (Windows)</code>
                        <code className="text-green-400 block">myproject_env\Scripts\activate</code>
                        <code className="text-green-400 block"># Activate (macOS/Linux)</code>
                        <code className="text-green-400 block">source myproject_env/bin/activate</code>
                        <code className="text-green-400 block"># Deactivate</code>
                        <code className="text-green-400 block">deactivate</code>
                      </div>
                    </div>

                    <ul className="space-y-2 text-gray-300">
                      <li>• Built into Python 3.3+</li>
                      <li>• No additional installation required</li>
                      <li>• Standard tool for virtual environments</li>
                      <li>• Works across all platforms</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">conda (Anaconda/Miniconda)</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <h4 className="text-white font-bold mb-2">Conda Commands:</h4>
                      <div className="space-y-2">
                        <code className="text-green-400 block"># Create environment</code>
                        <code className="text-green-400 block">conda create -n myenv python=3.11</code>
                        <code className="text-green-400 block"># Activate environment</code>
                        <code className="text-green-400 block">conda activate myenv</code>
                        <code className="text-green-400 block"># Install packages</code>
                        <code className="text-green-400 block">conda install numpy pandas</code>
                        <code className="text-green-400 block"># Deactivate</code>
                        <code className="text-green-400 block">conda deactivate</code>
                      </div>
                    </div>

                    <ul className="space-y-2 text-gray-300">
                      <li>• Great for data science projects</li>
                      <li>• Manages both Python and non-Python packages</li>
                      <li>• Pre-built scientific computing packages</li>
                      <li>• Cross-platform package management</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">pipenv (Modern Package Management)</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <h4 className="text-white font-bold mb-2">Pipenv Workflow:</h4>
                      <div className="space-y-2">
                        <code className="text-green-400 block"># Install pipenv</code>
                        <code className="text-green-400 block">pip install pipenv</code>
                        <code className="text-green-400 block"># Create Pipfile</code>
                        <code className="text-green-400 block">pipenv install</code>
                        <code className="text-green-400 block"># Install packages</code>
                        <code className="text-green-400 block">pipenv install requests</code>
                        <code className="text-green-400 block"># Activate shell</code>
                        <code className="text-green-400 block">pipenv shell</code>
                      </div>
                    </div>

                    <ul className="space-y-2 text-gray-300">
                      <li>• Combines pip and virtualenv</li>
                      <li>• Automatic dependency resolution</li>
                      <li>• Pipfile for dependency tracking</li>
                      <li>• Lockfile for reproducible builds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'string-methods':
        return (
          <div className="animate-fade-in-up">
            <h1 id="string-methods" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python String Methods
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">Essential String Methods</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Case Methods</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.upper()</code>
                        <p className="text-gray-300 text-sm mt-1">Convert to uppercase</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.lower()</code>
                        <p className="text-gray-300 text-sm mt-1">Convert to lowercase</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.title()</code>
                        <p className="text-gray-300 text-sm mt-1">Title case</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.capitalize()</code>
                        <p className="text-gray-300 text-sm mt-1">Capitalize first letter</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Search & Replace</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.find(substring)</code>
                        <p className="text-gray-300 text-sm mt-1">Find substring index</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.replace(old, new)</code>
                        <p className="text-gray-300 text-sm mt-1">Replace substring</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.startswith(prefix)</code>
                        <p className="text-gray-300 text-sm mt-1">Check if starts with</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.endswith(suffix)</code>
                        <p className="text-gray-300 text-sm mt-1">Check if ends with</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Formatting</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.strip()</code>
                        <p className="text-gray-300 text-sm mt-1">Remove whitespace</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.split(separator)</code>
                        <p className="text-gray-300 text-sm mt-1">Split into list</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.join(iterable)</code>
                        <p className="text-gray-300 text-sm mt-1">Join elements</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.center(width)</code>
                        <p className="text-gray-300 text-sm mt-1">Center string</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">Validation</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.isdigit()</code>
                        <p className="text-gray-300 text-sm mt-1">Check if all digits</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.isalpha()</code>
                        <p className="text-gray-300 text-sm mt-1">Check if all letters</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.isalnum()</code>
                        <p className="text-gray-300 text-sm mt-1">Check if alphanumeric</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400">text.isspace()</code>
                        <p className="text-gray-300 text-sm mt-1">Check if all spaces</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6 mt-6">
                  <h3 className="text-xl font-bold text-white mb-4">Practical Examples</h3>

                  <div className="bg-gray-800 p-4 rounded mb-4">
                    <h4 className="text-white font-bold mb-2">String Processing Example:</h4>
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      {`# String manipulation example
text = "  Hello, World!  "
print(f"Original: '{text}'")
print(f"Upper: '{text.upper()}'")
print(f"Lower: '{text.lower()}'")
print(f"Stripped: '{text.strip()}'")
print(f"Title: '{text.strip().title()}'")
print(f"Replace: '{text.replace('World', 'Python')}'")

# Output:
# Original: '  Hello, World!  '
# Upper: '  HELLO, WORLD!  '
# Lower: '  hello, world!  '
# Stripped: 'Hello, World!'
# Title: 'Hello, World!'
# Replace: '  Hello, Python!  '`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'decorators':
        return (
          <div className="animate-fade-in-up">
            <h1 id="decorators" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Decorators
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">Understanding Decorators</h2>

                <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6 mb-6">
                  <p className="text-gray-300 text-lg mb-4">
                    Decorators are a powerful Python feature that allows you to modify or enhance functions
                    without changing their original code. They are essentially functions that take another
                    function as input and return a modified version of that function.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Basic Decorator Example</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`# Simple decorator
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()

# Output:
# Something is happening before the function is called.
# Hello!
# Something is happening after the function is called.`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Decorators with Arguments</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`# Decorator with arguments
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")

# Output:
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Built-in Decorators</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="text-white font-bold mb-2">@property</h4>
                        <p className="text-gray-300 text-sm">Makes methods behave like attributes</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="text-white font-bold mb-2">@staticmethod</h4>
                        <p className="text-gray-300 text-sm">Static methods that don't need self</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="text-white font-bold mb-2">@classmethod</h4>
                        <p className="text-gray-300 text-sm">Methods that work with the class</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="text-white font-bold mb-2">@functools.wraps</h4>
                        <p className="text-gray-300 text-sm">Preserves function metadata</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">Real-World Decorator Examples</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`# Timing decorator
import time
from functools import wraps

def timing_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.4f} seconds")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(1)
    return "Done!"

# Caching decorator
def memoize(func):
    cache = {}
    @wraps(func)
    def wrapper(*args):
        if args in cache:
            return cache[args]
        result = func(*args)
        cache[args] = result
        return result
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'generators':
        return (
          <div className="animate-fade-in-up">
            <h1 id="generators" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Generators
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">Understanding Generators</h2>

                <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 mb-6">
                  <p className="text-gray-300 text-lg mb-4">
                    Generators are a special type of iterator that allow you to iterate over a sequence
                    of values without storing them all in memory at once. They use the `yield` keyword
                    to produce values one at a time, making them memory-efficient for large datasets.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Basic Generator Function</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`# Simple generator function
def count_up_to(max_count):
    count = 1
    while count <= max_count:
        yield count
        count += 1

# Using the generator
counter = count_up_to(5)
for num in counter:
    print(num)

# Output:
# 1
# 2
# 3
# 4
# 5`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Generator Expressions</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`# Generator expression (similar to list comprehension)
squares = (x**2 for x in range(10))
print(list(squares))  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Memory efficient - doesn't create the entire list in memory
# until you consume the generator

# Compare with list comprehension (creates entire list in memory)
squares_list = [x**2 for x in range(10)]
print(squares_list)  # Same result, but uses more memory`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Advanced Generator Features</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`# Generator with send() method
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is not None:
            total += value

acc = accumulator()
next(acc)  # Start the generator
print(acc.send(10))  # 10
print(acc.send(5))   # 15
print(acc.send(3))   # 18

# Generator with throw() and close()
def safe_generator():
    try:
        while True:
            value = yield
            print(f"Received: {value}")
    except GeneratorExit:
        print("Generator closed")
    except Exception as e:
        print(f"Exception caught: {e}")

gen = safe_generator()
next(gen)
gen.send("Hello")
gen.throw(ValueError, "Test exception")
gen.close()`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">Real-World Generator Examples</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`# Reading large files efficiently
def read_large_file(filename):
    with open(filename, 'r') as file:
        for line in file:
            yield line.strip()

# Process each line without loading entire file into memory
for line in read_large_file('huge_file.txt'):
    process(line)

# Fibonacci generator
def fibonacci_generator():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Get first 10 Fibonacci numbers
fib = fibonacci_generator()
for i in range(10):
    print(next(fib))

# Infinite sequence generator
def infinite_counter(start=0, step=1):
    current = start
    while True:
        yield current
        current += step

counter = infinite_counter(10, 2)
print([next(counter) for _ in range(5)])  # [10, 12, 14, 16, 18]`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'web-frameworks':
        return (
          <div className="animate-fade-in-up">
            <h1 id="web-frameworks" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Web Frameworks
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">Popular Python Web Frameworks</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">🌶️ Django</h3>
                    <p className="text-gray-300 mb-4">
                      High-level, full-featured web framework with batteries included.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Built-in admin interface</li>
                      <li>• ORM (Object-Relational Mapping)</li>
                      <li>• Authentication system</li>
                      <li>• URL routing</li>
                      <li>• Template engine</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">🔥 Flask</h3>
                    <p className="text-gray-300 mb-4">
                      Lightweight, micro web framework for quick development.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Minimal core</li>
                      <li>• Extensible with extensions</li>
                      <li>• Jinja2 templating</li>
                      <li>• Werkzeug WSGI toolkit</li>
                      <li>• Great for APIs</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">⚡ FastAPI</h3>
                    <p className="text-gray-300 mb-4">
                      Modern, fast web framework for building APIs with automatic documentation.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Automatic API documentation</li>
                      <li>• Type hints integration</li>
                      <li>• Async support</li>
                      <li>• High performance</li>
                      <li>• Pydantic validation</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Django Example</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`# Django models.py
from django.db import models

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

# Django views.py
from django.shortcuts import render
from .models import BlogPost

def blog_list(request):
    posts = BlogPost.objects.all()
    return render(request, 'blog/list.html', {'posts': posts})

# Django urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('blog/', views.blog_list, name='blog_list'),
]`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Flask Example</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`# Flask app.py
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        data = request.json
        # Process user data
        return jsonify({'message': 'User created', 'id': 1})
    
    return jsonify({'users': ['Alice', 'Bob', 'Charlie']})

@app.route('/user/<int:user_id>')
def get_user(user_id):
    return jsonify({'id': user_id, 'name': f'User {user_id}'})

if __name__ == '__main__':
    app.run(debug=True)`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">FastAPI Example</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`# FastAPI main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="My API", version="1.0.0")

class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    age: int

class UserCreate(BaseModel):
    name: str
    email: str
    age: int

# In-memory storage (use database in production)
users_db = []

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/users", response_model=List[User])
async def get_users():
    return users_db

@app.post("/users", response_model=User)
async def create_user(user: UserCreate):
    new_user = User(
        id=len(users_db) + 1,
        name=user.name,
        email=user.email,
        age=user.age
    )
    users_db.append(new_user)
    return new_user

@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    user = next((u for u in users_db if u.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data-analysis':
        return (
          <div className="animate-fade-in-up">
            <h1 id="data-analysis" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Data Analysis
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">Essential Data Analysis Libraries</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">📊 NumPy</h3>
                    <p className="text-gray-300 mb-4">
                      Fundamental package for numerical computing with Python.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• N-dimensional arrays</li>
                      <li>• Mathematical functions</li>
                      <li>• Linear algebra</li>
                      <li>• Random number generation</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">🐼 Pandas</h3>
                    <p className="text-gray-300 mb-4">
                      Data manipulation and analysis library with DataFrame structures.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• DataFrames and Series</li>
                      <li>• Data cleaning</li>
                      <li>• Data aggregation</li>
                      <li>• File I/O (CSV, Excel, JSON)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">📈 Matplotlib</h3>
                    <p className="text-gray-300 mb-4">
                      Comprehensive plotting library for creating visualizations.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Line plots, bar charts</li>
                      <li>• Histograms, scatter plots</li>
                      <li>• Customizable styling</li>
                      <li>• Publication-quality figures</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">NumPy Example</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`import numpy as np

# Create arrays
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.array([[1, 2, 3], [4, 5, 6]])

print("Array 1:", arr1)
print("Array 2 shape:", arr2.shape)
print("Array 2:", arr2)

# Mathematical operations
print("Sum:", np.sum(arr1))
print("Mean:", np.mean(arr1))
print("Max:", np.max(arr1))
print("Min:", np.min(arr1))

# Array operations
squared = arr1 ** 2
print("Squared:", squared)

# Random arrays
random_arr = np.random.randn(3, 3)
print("Random array:", random_arr)

# Linear algebra
matrix = np.array([[1, 2], [3, 4]])
inverse = np.linalg.inv(matrix)
print("Matrix:", matrix)
print("Inverse:", inverse)`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Pandas Example</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`import pandas as pd
import numpy as np

# Create DataFrame
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'City': ['New York', 'London', 'Tokyo', 'Paris'],
    'Salary': [50000, 60000, 70000, 55000]
}

df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)

# Data operations
print("\\nBasic Statistics:")
print(df.describe())

print("\\nFilter by Age > 30:")
print(df[df['Age'] > 30])

print("\\nGroup by City and calculate mean salary:")
print(df.groupby('City')['Salary'].mean())

# Data manipulation
df['Salary_Adjusted'] = df['Salary'] * 1.1
print("\\nWith adjusted salary:")
print(df[['Name', 'Salary', 'Salary_Adjusted']])

# Reading and writing files
# df.to_csv('employees.csv', index=False)
# df_read = pd.read_csv('employees.csv')`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Data Visualization Example</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`import matplotlib.pyplot as plt
import numpy as np

# Create sample data
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# Create plots
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8))

# Line plot
ax1.plot(x, y1, label='sin(x)', color='blue')
ax1.plot(x, y2, label='cos(x)', color='red')
ax1.set_title('Trigonometric Functions')
ax1.set_xlabel('X')
ax1.set_ylabel('Y')
ax1.legend()
ax1.grid(True)

# Scatter plot
x_scatter = np.random.randn(100)
y_scatter = 2 * x_scatter + np.random.randn(100)
ax2.scatter(x_scatter, y_scatter, alpha=0.6, color='green')
ax2.set_title('Scatter Plot')
ax2.set_xlabel('X')
ax2.set_ylabel('Y')
ax2.grid(True)

plt.tight_layout()
plt.show()

# Bar chart example
categories = ['A', 'B', 'C', 'D']
values = [23, 45, 56, 78]

plt.figure(figsize=(8, 6))
plt.bar(categories, values, color=['red', 'green', 'blue', 'orange'])
plt.title('Bar Chart Example')
plt.xlabel('Categories')
plt.ylabel('Values')
plt.show()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'machine-learning':
        return (
          <div className="animate-fade-in-up">
            <h1 id="machine-learning" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Machine Learning
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">Essential ML Libraries</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">🤖 Scikit-learn</h3>
                    <p className="text-gray-300 mb-4">
                      Comprehensive machine learning library for Python.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Classification algorithms</li>
                      <li>• Regression models</li>
                      <li>• Clustering techniques</li>
                      <li>• Model evaluation tools</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">🧠 TensorFlow</h3>
                    <p className="text-gray-300 mb-4">
                      Open-source platform for machine learning and AI.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Deep learning models</li>
                      <li>• Neural networks</li>
                      <li>• Keras integration</li>
                      <li>• GPU acceleration</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">🔥 PyTorch</h3>
                    <p className="text-gray-300 mb-4">
                      Dynamic neural network framework for research and production.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Dynamic computation graphs</li>
                      <li>• Research-friendly</li>
                      <li>• Strong community</li>
                      <li>• Mobile deployment</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Scikit-learn Example</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`from sklearn import datasets, model_selection, metrics
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import pandas as pd

# Load dataset
iris = datasets.load_iris()
X, y = iris.data, iris.target

# Split data
X_train, X_test, y_train, y_test = model_selection.train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = LogisticRegression(random_state=42)
model.fit(X_train_scaled, y_train)

# Make predictions
y_pred = model.predict(X_test_scaled)

# Evaluate model
accuracy = metrics.accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")

# Classification report
print(metrics.classification_report(y_test, y_pred))`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">TensorFlow/Keras Example</h3>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        {`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Load and prepare data
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# Normalize pixel values
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# Build model
model = keras.Sequential([
    layers.Flatten(input_shape=(28, 28)),
    layers.Dense(128, activation="relu"),
    layers.Dropout(0.2),
    layers.Dense(10, activation="softmax")
])

# Compile model
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# Train model
model.fit(x_train, y_train, epochs=5, validation_split=0.1)

# Evaluate model
test_loss, test_acc = model.evaluate(x_test, y_test)
print(f"Test accuracy: {test_acc:.2f}")`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'career-path':
        return (
          <div className="animate-fade-in-up">
            <h1 id="career-path" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Career Path
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">Python Career Opportunities</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">🌐 Web Developer</h3>
                    <p className="text-gray-300 mb-4">
                      Build web applications using Django, Flask, or FastAPI.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Full-stack development</li>
                      <li>• API development</li>
                      <li>• Database design</li>
                      <li>• Frontend integration</li>
                    </ul>
                    <div className="mt-4 text-yellow-400 font-bold">
                      Salary: $60,000 - $120,000
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">📊 Data Scientist</h3>
                    <p className="text-gray-300 mb-4">
                      Analyze data and build predictive models using Python.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Statistical analysis</li>
                      <li>• Machine learning</li>
                      <li>• Data visualization</li>
                      <li>• Business insights</li>
                    </ul>
                    <div className="mt-4 text-yellow-400 font-bold">
                      Salary: $70,000 - $140,000
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">🤖 AI/ML Engineer</h3>
                    <p className="text-gray-300 mb-4">
                      Develop artificial intelligence and machine learning solutions.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Deep learning models</li>
                      <li>• Neural networks</li>
                      <li>• Model deployment</li>
                      <li>• AI research</li>
                    </ul>
                    <div className="mt-4 text-yellow-400 font-bold">
                      Salary: $80,000 - $160,000
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4">🔧 DevOps Engineer</h3>
                    <p className="text-gray-300 mb-4">
                      Automate infrastructure and deployment using Python scripts.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Automation scripts</li>
                      <li>• CI/CD pipelines</li>
                      <li>• Infrastructure as code</li>
                      <li>• Monitoring systems</li>
                    </ul>
                    <div className="mt-4 text-yellow-400 font-bold">
                      Salary: $70,000 - $130,000
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-yellow-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">🎮 Game Developer</h3>
                    <p className="text-gray-300 mb-4">
                      Create games using Python frameworks like Pygame.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Game mechanics</li>
                      <li>• Graphics programming</li>
                      <li>• Physics simulation</li>
                      <li>• User interface</li>
                    </ul>
                    <div className="mt-4 text-yellow-400 font-bold">
                      Salary: $50,000 - $100,000
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-indigo-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-indigo-400 mb-4">🔒 Cybersecurity Analyst</h3>
                    <p className="text-gray-300 mb-4">
                      Use Python for security analysis and penetration testing.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Security scripts</li>
                      <li>• Vulnerability assessment</li>
                      <li>• Network analysis</li>
                      <li>• Incident response</li>
                    </ul>
                    <div className="mt-4 text-yellow-400 font-bold">
                      Salary: $65,000 - $125,000
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Career Progression Path</h3>

                  <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded border-l-4 border-green-500">
                      <h4 className="text-white font-bold">Junior Python Developer (0-2 years)</h4>
                      <p className="text-gray-300 text-sm">
                        Focus on learning Python fundamentals, basic frameworks, and working with teams.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-500">
                      <h4 className="text-white font-bold">Mid-Level Developer (2-5 years)</h4>
                      <p className="text-gray-300 text-sm">
                        Specialize in specific domains, lead small projects, mentor junior developers.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded border-l-4 border-purple-500">
                      <h4 className="text-white font-bold">Senior Developer (5+ years)</h4>
                      <p className="text-gray-300 text-sm">
                        Architect complex systems, lead large projects, make technical decisions.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded border-l-4 border-yellow-500">
                      <h4 className="text-white font-bold">Tech Lead/Principal Engineer (7+ years)</h4>
                      <p className="text-gray-300 text-sm">
                        Set technical direction, manage engineering teams, drive innovation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="animate-fade-in-up">
            <h1 id="resources" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Learning Resources
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">Essential Learning Resources</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">📚 Official Documentation</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>
                        <a href="https://docs.python.org/" className="text-green-400 hover:text-green-300">
                          Python Official Documentation
                        </a>
                      </li>
                      <li>
                        <a href="https://pep.python.org/" className="text-green-400 hover:text-green-300">
                          Python Enhancement Proposals (PEPs)
                        </a>
                      </li>
                      <li>
                        <a href="https://www.python.org/dev/peps/pep-0008/" className="text-green-400 hover:text-green-300">
                          PEP 8 - Style Guide
                        </a>
                      </li>
                      <li>
                        <a href="https://docs.python.org/tutorial/" className="text-green-400 hover:text-green-300">
                          Python Tutorial
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">🎓 Online Courses</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>
                        <a href="https://www.coursera.org/learn/python" className="text-green-400 hover:text-green-300">
                          Coursera - Python for Everybody
                        </a>
                      </li>
                      <li>
                        <a href="https://www.edx.org/course/introduction-to-computer-science-and-programming-7" className="text-green-400 hover:text-green-300">
                          MITx - Introduction to Computer Science
                        </a>
                      </li>
                      <li>
                        <a href="https://www.udemy.com/course/complete-python-bootcamp/" className="text-green-400 hover:text-green-300">
                          Udemy - Complete Python Bootcamp
                        </a>
                      </li>
                      <li>
                        <a href="https://www.freecodecamp.org/" className="text-green-400 hover:text-green-300">
                          FreeCodeCamp - Python Courses
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">📖 Books</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>
                        <span className="text-white font-bold">"Python Crash Course"</span> by Eric Matthes
                      </li>
                      <li>
                        <span className="text-white font-bold">"Automate the Boring Stuff"</span> by Al Sweigart
                      </li>
                      <li>
                        <span className="text-white font-bold">"Fluent Python"</span> by Luciano Ramalho
                      </li>
                      <li>
                        <span className="text-white font-bold">"Effective Python"</span> by Brett Slatkin
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">🌐 Practice Platforms</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>
                        <a href="https://leetcode.com/" className="text-green-400 hover:text-green-300">
                          LeetCode - Coding Challenges
                        </a>
                      </li>
                      <li>
                        <a href="https://www.hackerrank.com/domains/python" className="text-green-400 hover:text-green-300">
                          HackerRank - Python Challenges
                        </a>
                      </li>
                      <li>
                        <a href="https://www.codewars.com/" className="text-green-400 hover:text-green-300">
                          Codewars - Programming Puzzles
                        </a>
                      </li>
                      <li>
                        <a href="https://projecteuler.net/" className="text-green-400 hover:text-green-300">
                          Project Euler - Mathematical Problems
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Community & Forums</h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 p-4 rounded">
                      <h4 className="text-white font-bold mb-2">Reddit</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• r/Python</li>
                        <li>• r/learnpython</li>
                        <li>• r/MachineLearning</li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 p-4 rounded">
                      <h4 className="text-white font-bold mb-2">Stack Overflow</h4>
                      <p className="text-gray-300 text-sm">
                        Q&A platform for programming questions and answers.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded">
                      <h4 className="text-white font-bold mb-2">Discord/Slack</h4>
                      <p className="text-gray-300 text-sm">
                        Real-time chat communities for Python developers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'video-tutorials':
        return (
          <div className="animate-fade-in-up">
            <h1 id="video-tutorials" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Video Tutorials
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn Python through comprehensive video tutorials
            </p>

            <div className="max-w-6xl mx-auto">
              <VideoSection videos={pythonVideos} title="Python Video Tutorials" />
            </div>
          </div>
        );

      case 'practice-projects':
        return (
          <div className="animate-fade-in-up">
            <h1 id="practice-projects" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Practice Projects
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Build real-world projects to master Python
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="practice-projects" className="text-3xl font-bold text-white mb-6">15. Practice Projects</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-white mr-3 mt-1">•</span>
                    <strong>Calculator:</strong> Build a command-line calculator
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3 mt-1">•</span>
                    <strong>To-Do List:</strong> Create a task management application
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3 mt-1">•</span>
                    <strong>Web Scraper:</strong> Extract data from websites
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3 mt-1">•</span>
                    <strong>Data Analysis:</strong> Analyze datasets with pandas
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3 mt-1">•</span>
                    <strong>API Development:</strong> Build REST APIs with Flask/FastAPI
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="animate-fade-in-up">
            <h1 id="summary" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Summary
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Key takeaways from Python programming
            </p>

            <div className="max-w-6xl mx-auto">
              <h2 id="summary" className="text-3xl font-bold text-white mb-6">✅ Summary</h2>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-white mr-3 mt-1">•</span>
                    Python is a versatile, high-level programming language
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3 mt-1">•</span>
                    Key features include simple syntax, dynamic typing, and extensive libraries
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3 mt-1">•</span>
                    Used in web development, data science, AI/ML, and automation
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3 mt-1">•</span>
                    Practice with real projects to master Python programming
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="animate-fade-in-up">
            <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Programming
            </h1>

            <div className="max-w-6xl mx-auto">
              <div className="gradient-border hover-lift mb-8">
                <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 p-8 rounded-xl">
                  <h2 className="text-3xl font-bold text-white mb-4 ">Goal</h2>
                  <p className="text-white text-xl">Master Python programming from basics to advanced concepts and applications.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <TechLayout onThisPage={pageHeadings} technology="python" activeSection={activeSection} setActiveSection={setActiveSection}>
      <div>
        {renderContent()}
      </div>
    </TechLayout>
  );
}

