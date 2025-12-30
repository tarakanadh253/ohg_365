import DocsLayout from '@/components/docs-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function MonitoringPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Introduction to Monitoring' },
    { id: 'prometheus', title: 'Prometheus' },
    { id: 'grafana', title: 'Grafana' },
    { id: 'data-collection', title: 'Data Collection' },
    { id: 'metrics-monitoring', title: 'Metrics Monitoring' },
    { id: 'logging', title: 'Logging' },
    { id: 'cloudwatch', title: 'AWS CloudWatch' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'summary', title: 'Summary' },
  ];

  const monitoringVideos = getVideosForTopic('monitoring');

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          📊 Monitoring & Logging
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-600 p-8 rounded-xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Goal</h2>
            <p className="text-white text-xl">Implement comprehensive monitoring and logging solutions for observability.</p>
          </div>

          <h2 id="prometheus" className="text-3xl font-bold text-white mb-6">1. Prometheus</h2>
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-600 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Metrics Collection & Storage</h3>
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Time-series database for metrics
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Pull-based metrics collection
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Powerful query language (PromQL)
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Alerting and notification system
              </li>
            </ul>
          </div>

          <h2 id="grafana" className="text-3xl font-bold text-white mb-6">2. Grafana</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <h3 className="text-2xl font-bold text-orange-400 mb-6 neon-glow">Visualization & Dashboards</h3>
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">•</span>
                Interactive dashboards and visualizations
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">•</span>
                Multiple data source support
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">•</span>
                Real-time monitoring and alerting
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">•</span>
                Custom panels and plugins
              </li>
            </ul>
          </div>

          <h2 id="cloudwatch" className="text-3xl font-bold text-white mb-6">3. AWS CloudWatch</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 neon-glow">Cloud-Native Monitoring</h3>
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                AWS service monitoring and metrics
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                Log aggregation and analysis
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                Automated scaling and alerting
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                Integration with AWS services
              </li>
            </ul>
          </div>

          <VideoSection videos={monitoringVideos} title="Monitoring Video Tutorials" />

          <h2 id="summary" className="text-3xl font-bold text-white mb-6">✅ Summary</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Monitoring ensures system reliability and performance
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Prometheus + Grafana for comprehensive observability
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                AWS CloudWatch for cloud-native monitoring
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Logging provides insights into system behavior
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}