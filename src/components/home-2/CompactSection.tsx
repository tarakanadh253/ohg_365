'use client';

import { ReactNode } from 'react';
import ScrollAnimate from './ScrollAnimate';

interface CompactSectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  backgroundColor?: string;
  className?: string;
  stagger?: boolean;
}

export default function CompactSection({
  title,
  subtitle,
  children,
  backgroundColor,
  className = '',
  stagger = false,
}: CompactSectionProps) {
  const isSecondary = backgroundColor === 'var(--bg-secondary)';
  
  return (
    <section 
      className={`compact-section relative overflow-hidden ${className}`}
      style={{ 
        backgroundColor: backgroundColor || 'var(--bg-primary)',
        padding: '3rem 0',
        position: 'relative',
      }}
    >
      {/* Decorative Background Elements */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: isSecondary 
            ? 'radial-gradient(circle at 20% 50%, rgba(8, 61, 119, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(122, 148, 165, 0.3) 0%, transparent 50%)'
            : 'radial-gradient(circle at 80% 20%, rgba(122, 148, 165, 0.2) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(8, 61, 119, 0.2) 0%, transparent 50%)',
        }}
      />
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(8, 61, 119, 0.5), transparent)',
        }}
      />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {(title || subtitle) && (
          <ScrollAnimate animation="fade-up" triggerOnce={false}>
            <div className="text-center mb-8">
              {title && (
                <div className="relative inline-block mb-3">
                  <h2 
                    className="compact-heading font-bold mb-2 relative z-10"
                    style={{ 
                      color: 'var(--text-primary)', 
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {title}
                  </h2>
                  {/* Underline decoration */}
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-16 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(8, 61, 119, 0.3), rgba(122, 148, 165, 0.5), rgba(8, 61, 119, 0.3))',
                    }}
                  />
                </div>
              )}
              {subtitle && (
                <p 
                  className="compact-text text-sm max-w-2xl mx-auto leading-relaxed"
                  style={{ 
                    color: 'var(--text-secondary)',
                    fontSize: '0.9375rem',
                    lineHeight: '1.6',
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </ScrollAnimate>
        )}
        <ScrollAnimate animation="fade-up" triggerOnce={false} stagger={stagger}>
          {children}
        </ScrollAnimate>
      </div>
      
      {/* Bottom decorative line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(8, 61, 119, 0.3), transparent)',
        }}
      />
    </section>
  );
}

