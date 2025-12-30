'use client';

import { useState, useEffect, useRef } from 'react';
import { AUTH_SYSTEM_AVAILABLE } from '@/config/authStatus';

const slides = [
  {
    id: 1,
    title: 'DevOps',
    subtitle: '< AWS, Azure & GCP',
    description: 'Master DevOps across all major cloud platforms. Learn Docker, Kubernetes, CI/CD pipelines, and infrastructure automation with real-world projects.',
    buttonText: 'Learn DevOps',
    buttonLink: '/devops',
    icon: '🚀',
    backgroundGradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'Python Full Stack',
    subtitle: '< Build Modern Web Applications',
    description: 'Master Python full stack development with Django, Flask, React, and modern frameworks. Build complete web applications from database to UI.',
    buttonText: 'Explore Python',
    buttonLink: '/tutorials/python-fullstack',
    icon: '🐍',
    backgroundGradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 3,
    title: 'Java Full Stack',
    subtitle: '< Enterprise-Grade Development',
    description: 'Master Java full stack development from frontend to backend. Learn Spring Boot, React, microservices, and build scalable enterprise applications.',
    buttonText: 'Learn Java',
    buttonLink: '/tutorials/java-fullstack',
    icon: '☕',
    backgroundGradient: 'from-orange-500 to-red-600',
  },
  {
    id: 4,
    title: 'Web Development',
    subtitle: '< Create Stunning Websites',
    description: 'Build modern, responsive web applications with React, Node.js, and cutting-edge technologies. From frontend to full-stack development.',
    buttonText: 'Start Web Dev',
    buttonLink: '/web-dev',
    icon: '🌐',
    backgroundGradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 5,
    title: 'SQL & Databases',
    subtitle: '< SQL & NoSQL Mastery',
    description: 'Master database design, optimization, and management. Learn SQL, NoSQL databases, data modeling, and advanced querying techniques.',
    buttonText: 'Explore Databases',
    buttonLink: '/sql',
    icon: '🗄️',
    backgroundGradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 6,
    title: 'Data Engineering',
    subtitle: '< Azure, AWS & GCP',
    description: 'Become a data engineering expert across cloud platforms. Master data pipelines, ETL processes, data warehousing, and big data technologies.',
    buttonText: 'Start Learning',
    buttonLink: '/tutorials/data-engineering',
    icon: '📊',
    backgroundGradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 7,
    title: 'Data Science',
    subtitle: '< Analytics & Machine Learning',
    description: 'Master data science and analytics. Learn machine learning, data analysis, visualization, and build data-driven applications.',
    buttonText: 'Explore Data Science',
    buttonLink: '/tutorials/data-science-ai',
    icon: '📊',
    backgroundGradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 8,
    title: 'Artificial Intelligence',
    subtitle: '< Future of Technology',
    description: 'Dive deep into artificial intelligence. Learn neural networks, deep learning, natural language processing, computer vision, and build cutting-edge AI solutions.',
    buttonText: 'Learn AI',
    buttonLink: '/tutorials/ai',
    icon: '🤖',
    backgroundGradient: 'from-cyan-500 to-teal-600',
  },
  {
    id: 9,
    title: 'SAP',
    subtitle: '< Enterprise Solutions',
    description: 'Master SAP systems and enterprise resource planning. Learn SAP modules, implementation, configuration, and become a certified SAP professional.',
    buttonText: 'Explore SAP',
    buttonLink: '/tutorials/sap',
    icon: '💼',
    backgroundGradient: 'from-yellow-500 to-orange-600',
  },
  {
    id: 10,
    title: 'Microsoft Fabric',
    subtitle: '< Unified Analytics Platform',
    description: 'Master Microsoft Fabric for modern analytics. Learn data integration, warehousing, real-time analytics, and build comprehensive data solutions.',
    buttonText: 'Start Learning',
    buttonLink: '/tutorials/microsoft-fabric',
    icon: '📈',
    backgroundGradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 11,
    title: 'Medical Coding',
    subtitle: '< Healthcare Documentation',
    description: 'Master medical coding and billing. Learn ICD-10, CPT codes, healthcare documentation, and become a certified medical coding professional.',
    buttonText: 'Learn Medical Coding',
    buttonLink: '/tutorials/medical-coding',
    icon: '🏥',
    backgroundGradient: 'from-red-500 to-pink-600',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to validate JWT token
  const isValidToken = (): boolean => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') return false;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      if (payload && payload.exp && typeof payload.exp === 'number') {
        const now = Math.floor(Date.now() / 1000);
        if (now >= payload.exp) {
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  };


  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000); // Change slide every 5 seconds
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoPlay(); // Reset autoplay on manual navigation
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoPlay(); // Reset autoplay on manual navigation
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    startAutoPlay(); // Reset autoplay on manual navigation
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-[55vh] min-h-[450px] overflow-hidden" style={{ marginTop: 0 }}>
      {/* Professional Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 z-5"></div>

      {/* Main Carousel Container */}
      <div
        className="relative w-full h-full transition-all duration-1000 ease-in-out flex z-20"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full h-full flex items-center justify-between p-6 md:p-12 text-white"
            style={{
              background: `linear-gradient(135deg, ${slide.backgroundGradient.includes('blue') && slide.backgroundGradient.includes('indigo') ? '#0c1220, #1e3a8a, #3b82f6, #60a5fa' :
                slide.backgroundGradient.includes('blue') && slide.backgroundGradient.includes('cyan') ? '#083344, #0e7490, #06b6d4, #22d3ee' :
                  slide.backgroundGradient.includes('green') ? '#052e16, #166534, #16a34a, #4ade80' :
                    slide.backgroundGradient.includes('red') ? '#450a0a, #991b1b, #dc2626, #f87171' :
                      slide.backgroundGradient.includes('orange') ? '#7c2d12, #ea580c, #f97316, #fb923c' :
                        slide.backgroundGradient.includes('purple') ? '#3b0764, #7c3aed, #a855f7, #c084fc' :
                          slide.backgroundGradient.includes('indigo') ? '#1e1b4b, #4338ca, #6366f1, #818cf8' :
                            slide.backgroundGradient.includes('cyan') ? '#083344, #0e7490, #06b6d4, #22d3ee' :
                              slide.backgroundGradient.includes('teal') ? '#042f2e, #0f766e, #14b8a6, #5eead4' :
                                slide.backgroundGradient.includes('yellow') ? '#713f12, #ca8a04, #eab308, #fde047' :
                                  slide.backgroundGradient.includes('pink') ? '#831843, #be185d, #ec4899, #f9a8d4' :
                                    '#0f0f0f'})`
            }}
          >
            <div className="max-w-2xl text-left relative z-30" style={{ paddingTop: '90px', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}>

              <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tight">
                <span className="block text-white">{slide.title}</span>
                <span className="block text-2xl md:text-4xl font-bold text-white/80 mt-1">{slide.subtitle}</span>
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-xl text-white/90 leading-relaxed font-light">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-30 mt-6">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!AUTH_SYSTEM_AVAILABLE) {
                      window.location.href = slide.buttonLink;
                      return;
                    }
                    const authed = isValidToken();
                    if (!authed) {
                      const redirectUrl = `/register?redirect=${encodeURIComponent(slide.buttonLink)}`;
                      console.log('[HERO_CAROUSEL] onClick - Not authenticated, redirecting to:', redirectUrl);
                      window.location.replace(redirectUrl);
                      return;
                    }
                    console.log('[HERO_CAROUSEL] onClick - Authenticated, navigating to:', slide.buttonLink);
                    window.location.href = slide.buttonLink;
                  }}
                  onMouseDown={(e: React.MouseEvent) => {
                    const authed = isValidToken();
                    if (!authed) {
                      e.preventDefault();
                      e.stopPropagation();
                      const nativeEvent = e.nativeEvent;
                      if (nativeEvent && typeof nativeEvent.stopImmediatePropagation === 'function') {
                        nativeEvent.stopImmediatePropagation();
                      }
                      const redirectUrl = `/register?redirect=${encodeURIComponent(slide.buttonLink)}`;
                      console.log('[HERO_CAROUSEL] onMouseDown - Not authenticated, redirecting to:', redirectUrl);
                      window.location.replace(redirectUrl);
                    }
                  }}
                  className="inline-flex items-center justify-center bg-white text-gray-900 font-bold px-8 py-4 rounded-xl shadow-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 text-base min-w-[180px] relative z-40 pointer-events-auto cursor-pointer"
                >
                  {slide.buttonText}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!AUTH_SYSTEM_AVAILABLE) {
                      window.location.href = slide.buttonLink;
                      return;
                    }
                    const authed = isValidToken();
                    if (!authed) {
                      const redirectUrl = `/register?redirect=${encodeURIComponent(slide.buttonLink)}`;
                      console.log('[HERO_CAROUSEL] onClick - Not authenticated, redirecting to:', redirectUrl);
                      window.location.replace(redirectUrl);
                      return;
                    }
                    console.log('[HERO_CAROUSEL] onClick - Authenticated, navigating to:', slide.buttonLink);
                    window.location.href = slide.buttonLink;
                  }}
                  onMouseDown={(e: React.MouseEvent) => {
                    const authed = isValidToken();
                    if (!authed) {
                      e.preventDefault();
                      e.stopPropagation();
                      const nativeEvent = e.nativeEvent;
                      if (nativeEvent && typeof nativeEvent.stopImmediatePropagation === 'function') {
                        nativeEvent.stopImmediatePropagation();
                      }
                      const redirectUrl = `/register?redirect=${encodeURIComponent(slide.buttonLink)}`;
                      console.log('[HERO_CAROUSEL] onMouseDown - Not authenticated, redirecting to:', redirectUrl);
                      window.location.replace(redirectUrl);
                    }
                  }}
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-base min-w-[180px] relative z-40 pointer-events-auto cursor-pointer"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"></path>
                  </svg>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg p-3 rounded-xl text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-30 border border-white/20 shadow-lg group"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg p-3 rounded-xl text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-30 border border-white/20 shadow-lg group"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      {/* Professional Progress Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-white shadow-lg scale-125'
                : 'bg-white/40 hover:bg-white/60 hover:scale-110'
              }`}
          ></button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-lg px-3 py-1.5 rounded-full border border-white/20 z-30">
        <span className="text-white text-xs font-medium">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
}
