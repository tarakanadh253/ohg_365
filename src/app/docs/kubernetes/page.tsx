import DocsLayout from '@/components/docs-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function KubernetesPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Introduction to Kubernetes' },
    { id: 'core-concepts', title: 'Core Concepts' },
    { id: 'pods-deployments', title: 'Pods & Deployments' },
    { id: 'services-networking', title: 'Services & Networking' },
    { id: 'cluster-management', title: 'Cluster Management' },
    { id: 'application-deployment', title: 'Application Deployment' },
    { id: 'configurations', title: 'Configurations' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'summary', title: 'Summary' },
  ];

  const kubernetesVideos = getVideosForTopic('kubernetes');

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          ⚙️ Kubernetes (Orchestration)
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-600 p-8 rounded-xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Goal</h2>
            <p className="text-white text-xl">Master container orchestration and management with Kubernetes.</p>
          </div>

          <h2 id="core-concepts" className="text-3xl font-bold text-white mb-6">1. Core Concepts</h2>
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-600 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Kubernetes Architecture</h3>
            <div className="space-y-6">
              <div className="bg-gray-700 border border-gray-500 p-6 rounded-xl">
                <h4 className="text-white font-bold text-lg mb-3">Control Plane</h4>
                <p className="text-white">API Server, etcd, Scheduler, Controller Manager</p>
              </div>
              <div className="bg-gray-700 border border-gray-500 p-6 rounded-xl">
                <h4 className="text-white font-bold text-lg mb-3">Worker Nodes</h4>
                <p className="text-white">kubelet, kube-proxy, container runtime</p>
              </div>
            </div>
          </div>

          <h2 id="pods-deployments" className="text-3xl font-bold text-white mb-6">2. Pods & Deployments</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <h3 className="text-2xl font-bold text-purple-400 mb-6 neon-glow">Container Management</h3>
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                Pods: Smallest deployable units in Kubernetes
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                Deployments: Manage replica sets and rolling updates
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                ReplicaSets: Ensure desired number of pod replicas
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                StatefulSets: Manage stateful applications
              </li>
            </ul>
          </div>

          <VideoSection videos={kubernetesVideos} title="Kubernetes Video Tutorials" />

          <h2 id="summary" className="text-3xl font-bold text-white mb-6">✅ Summary</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Kubernetes is the leading container orchestration platform
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Manages containerized applications at scale
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Provides self-healing and auto-scaling capabilities
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Essential for modern DevOps and cloud-native applications
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}