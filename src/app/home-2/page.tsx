'use client';

import { useEffect } from 'react';
import HeroWithNav from '@/components/home-2/HeroWithNav';
import ProcessPath from '@/components/home-2/ProcessPath';
import CompactTechnologies from '@/components/home-2/CompactTechnologies';
import CompactStats from '@/components/home-2/CompactStats';
import CompactCourses from '@/components/home-2/CompactCourses';
import CompactAlumni from '@/components/home-2/CompactAlumni';
import VisionRoadmap from '@/components/home-2/VisionRoadmap';
import CompactFeatures from '@/components/home-2/CompactFeatures';
import CompactCertifications from '@/components/home-2/CompactCertifications';
import CompactWeeklyTests from '@/components/home-2/CompactWeeklyTests';
import CompactTrusted from '@/components/home-2/CompactTrusted';
import CompactFooter from '@/components/home-2/CompactFooter';
import ScrollAnimate from '@/components/home-2/ScrollAnimate';
import { useTheme } from '@/hooks/useTheme';

export default function Home2Page() {
  const { mounted } = useTheme();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'OHG 365 - Your Career Journey Starts Here';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute(
            'content',
          'Find job opportunities and enhance your skills to achieve your career goals. Learn, grow, and succeed with OHG 365.'
          );
      }
    }
  }, []);

  if (!mounted) {
    return null; // Prevent flash of unstyled content
  }

  return (
    <main className="min-h-screen home-2-page" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <HeroWithNav />
      
      <ScrollAnimate animation="fade-up" delay={200} triggerOnce={true}>
        <div className="section-wrapper py-4">
          <CompactTrusted />
        </div>
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-scale" delay={300} triggerOnce={true}>
        <div id="vision" className="section-wrapper py-4">
          <VisionRoadmap />
        </div>
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-left" delay={200} triggerOnce={true}>
        <div className="section-wrapper py-4">
          <ProcessPath />
        </div>
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-up" delay={250} triggerOnce={true}>
        <div className="section-wrapper py-4">
          <CompactTechnologies />
        </div>
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-scale" delay={200} triggerOnce={true}>
        <div className="section-wrapper py-4">
          <CompactStats />
        </div>
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-up" delay={200} triggerOnce={true}>
        <div className="section-wrapper py-4">
          <CompactAlumni />
        </div>
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-right" delay={250} triggerOnce={true}>
        <div className="section-wrapper py-4">
          <CompactFeatures />
        </div>
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-up" delay={300} triggerOnce={true}>
        <div className="section-wrapper py-4">
          <CompactCourses />
        </div>
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-scale" delay={250} triggerOnce={true}>
        <div className="section-wrapper py-4">
          <CompactCertifications />
        </div>
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-up" delay={200} triggerOnce={true}>
        <div className="section-wrapper py-4">
          <CompactWeeklyTests />
        </div>
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-up" delay={100} triggerOnce={true}>
        <CompactFooter />
      </ScrollAnimate>
    </main>
  );
}
