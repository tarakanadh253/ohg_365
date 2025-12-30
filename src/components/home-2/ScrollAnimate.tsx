'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollAnimateProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-scale';
  delay?: number;
  className?: string;
  triggerOnce?: boolean;
  stagger?: boolean;
}

export default function ScrollAnimate({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  triggerOnce = false,
  stagger = false,
}: ScrollAnimateProps) {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    triggerOnce 
  });

  const animationClass = `scroll-${animation.replace('-', '-')}`;
  const containerClass = stagger ? 'stagger-container' : '';

  return (
    <div
      ref={ref}
      className={`scroll-animate ${animationClass} ${containerClass} ${className} ${isVisible ? 'visible' : ''}`}
      style={{
        animationDelay: delay > 0 ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}

