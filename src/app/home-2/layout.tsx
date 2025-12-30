import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OHG 365 - Your Career Journey Starts Here',
  description:
    'Find job opportunities and enhance your skills to achieve your career goals. Learn, grow, and succeed with OHG 365.',
  keywords: [
    'OHG 365',
    'career development',
    'online learning',
    'job opportunities',
    'skill enhancement',
    'professional growth',
  ],
};

export default function Home2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
