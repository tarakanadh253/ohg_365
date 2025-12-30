export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  platform: 'youtube' | 'vimeo' | 'direct';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface TopicVideos {
  topicId: string;
  topicName: string;
  videos: VideoTutorial[];
}

export const videoTutorialsData: TopicVideos[] = [
  {
    topicId: 'what-is-devops',
    topicName: 'What is DevOps?',
    videos: [
      {
        id: 'devops-intro-1',
        title: 'DevOps Explained in 5 Minutes',
        description: 'A quick introduction to DevOps concepts and why it matters in modern software development.',
        duration: '5:30',
        thumbnail: 'https://img.youtube.com/vi/Xrgk023l4lI/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=Xrgk023l4lI',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['introduction', 'basics', 'concepts']
      },
      {
        id: 'devops-intro-2',
        title: 'DevOps Culture and Mindset',
        description: 'Understanding the cultural shift and collaborative mindset that drives DevOps success.',
        duration: '8:15',
        thumbnail: 'https://img.youtube.com/vi/0yWAtQ6wY5Y/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=0yWAtQ6wY5Y',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['culture', 'mindset', 'collaboration']
      }
    ]
  },
  {
    topicId: 'docker',
    topicName: 'Docker',
    videos: [
      {
        id: 'docker-intro-1',
        title: 'Docker Tutorial for Beginners',
        description: 'Complete Docker tutorial covering containers, images, and basic commands.',
        duration: '12:45',
        thumbnail: 'https://img.youtube.com/vi/pTFZFxd4hOI/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=pTFZFxd4hOI',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['containers', 'basics', 'commands']
      },
      {
        id: 'docker-intro-2',
        title: 'Dockerfile Best Practices',
        description: 'Learn how to write efficient and secure Dockerfiles for production applications.',
        duration: '15:20',
        thumbnail: 'https://img.youtube.com/vi/JofsaZ3H1qM/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=JofsaZ3H1qM',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['dockerfile', 'best-practices', 'production']
      },
      {
        id: 'docker-intro-3',
        title: 'Docker Compose Tutorial',
        description: 'Multi-container applications with Docker Compose - from development to production.',
        duration: '18:30',
        thumbnail: 'https://img.youtube.com/vi/ComXVG1_5Bw/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=ComXVG1_5Bw',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['docker-compose', 'multi-container', 'orchestration']
      }
    ]
  },
  {
    topicId: 'kubernetes',
    topicName: 'Kubernetes',
    videos: [
      {
        id: 'k8s-intro-1',
        title: 'Kubernetes Tutorial for Beginners',
        description: 'Complete Kubernetes tutorial covering pods, services, deployments, and more.',
        duration: '25:10',
        thumbnail: 'https://img.youtube.com/vi/X48VuDVv0do/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['orchestration', 'pods', 'deployments']
      },
      {
        id: 'k8s-intro-2',
        title: 'Kubernetes Architecture Explained',
        description: 'Deep dive into Kubernetes architecture, control plane, and worker nodes.',
        duration: '20:45',
        thumbnail: 'https://img.youtube.com/vi/PH-2FfFD9PU/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=PH-2FfFD9PU',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['architecture', 'control-plane', 'worker-nodes']
      },
      {
        id: 'k8s-intro-3',
        title: 'Kubernetes Networking Deep Dive',
        description: 'Understanding Kubernetes networking, services, ingress, and CNI plugins.',
        duration: '22:15',
        thumbnail: 'https://img.youtube.com/vi/0jvTWS9QimY/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=0jvTWS9QimY',
        platform: 'youtube',
        difficulty: 'advanced',
        tags: ['networking', 'services', 'ingress']
      }
    ]
  },
  {
    topicId: 'jenkins',
    topicName: 'Jenkins',
    videos: [
      {
        id: 'jenkins-intro-1',
        title: 'Jenkins CI/CD Pipeline Tutorial',
        description: 'Complete guide to setting up Jenkins and creating your first CI/CD pipeline.',
        duration: '30:20',
        thumbnail: 'https://img.youtube.com/vi/6YZvp2GwSh0/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=6YZvp2GwSh0',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['ci-cd', 'pipeline', 'automation']
      },
      {
        id: 'jenkins-intro-2',
        title: 'Jenkins with Docker Integration',
        description: 'Learn how to integrate Jenkins with Docker for containerized CI/CD workflows.',
        duration: '18:45',
        thumbnail: 'https://img.youtube.com/vi/7K4VqPqQhY4/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=7K4VqPqQhY4',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['docker', 'integration', 'workflows']
      }
    ]
  },
  {
    topicId: 'linux-basics',
    topicName: 'Linux Basics',
    videos: [
      {
        id: 'linux-intro-1',
        title: 'Linux Command Line Basics',
        description: 'Essential Linux commands every DevOps engineer should know.',
        duration: '35:10',
        thumbnail: 'https://img.youtube.com/vi/ROjZy1WbCIA/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=ROjZy1WbCIA',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['command-line', 'basics', 'essential']
      },
      {
        id: 'linux-intro-2',
        title: 'Linux System Administration',
        description: 'System administration tasks, process management, and troubleshooting.',
        duration: '28:30',
        thumbnail: 'https://img.youtube.com/vi/ROjZy1WbCIA/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=ROjZy1WbCIA',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['system-admin', 'processes', 'troubleshooting']
      }
    ]
  },
  {
    topicId: 'version-control',
    topicName: 'Version Control',
    videos: [
      {
        id: 'git-intro-1',
        title: 'Git and GitHub Complete Tutorial',
        description: 'Master Git version control and GitHub collaboration for DevOps workflows.',
        duration: '40:15',
        thumbnail: 'https://img.youtube.com/vi/RGOj5yH7evk/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['git', 'github', 'version-control']
      },
      {
        id: 'git-intro-2',
        title: 'Git Branching Strategies',
        description: 'Learn GitFlow, GitHub Flow, and other branching strategies for teams.',
        duration: '25:45',
        thumbnail: 'https://img.youtube.com/vi/1SXpE08hvGs/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=1SXpE08hvGs',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['branching', 'strategies', 'collaboration']
      }
    ]
  },
  {
    topicId: 'monitoring',
    topicName: 'Monitoring',
    videos: [
      {
        id: 'monitoring-intro-1',
        title: 'Prometheus and Grafana Tutorial',
        description: 'Complete monitoring setup with Prometheus for metrics collection and Grafana for visualization.',
        duration: '32:20',
        thumbnail: 'https://img.youtube.com/vi/h4Sl21AKiDg/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=h4Sl21AKiDg',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['prometheus', 'grafana', 'monitoring']
      },
      {
        id: 'monitoring-intro-2',
        title: 'ELK Stack for Log Management',
        description: 'Elasticsearch, Logstash, and Kibana for centralized log management and analysis.',
        duration: '28:10',
        thumbnail: 'https://img.youtube.com/vi/4X0WLpLT3ck/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=4X0WLpLT3ck',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['elk-stack', 'logging', 'analysis']
      }
    ]
  },
  {
    topicId: 'iac',
    topicName: 'Infrastructure as Code',
    videos: [
      {
        id: 'iac-intro-1',
        title: 'Terraform Tutorial for Beginners',
        description: 'Learn Infrastructure as Code with Terraform - from basics to advanced concepts.',
        duration: '45:30',
        thumbnail: 'https://img.youtube.com/vi/tomUWcQ0P3k/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=tomUWcQ0P3k',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['terraform', 'iac', 'infrastructure']
      },
      {
        id: 'iac-intro-2',
        title: 'Ansible Automation Tutorial',
        description: 'Configuration management and automation with Ansible playbooks.',
        duration: '38:15',
        thumbnail: 'https://img.youtube.com/vi/5hycyr-8EKs/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=5hycyr-8EKs',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['ansible', 'automation', 'configuration']
      }
    ]
  },
  {
    topicId: 'cloud',
    topicName: 'Cloud Computing',
    videos: [
      {
        id: 'cloud-intro-1',
        title: 'AWS Fundamentals for DevOps',
        description: 'Essential AWS services and concepts for DevOps engineers.',
        duration: '50:20',
        thumbnail: 'https://img.youtube.com/vi/ulprqHHWlng/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=ulprqHHWlng',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['aws', 'cloud', 'fundamentals']
      },
      {
        id: 'cloud-intro-2',
        title: 'Azure DevOps Services',
        description: 'Microsoft Azure DevOps platform for CI/CD and project management.',
        duration: '35:45',
        thumbnail: 'https://img.youtube.com/vi/Toa1uQnq1qg/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=Toa1uQnq1qg',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['azure', 'devops', 'ci-cd']
      }
    ]
  },
  {
    topicId: 'scripting-languages',
    topicName: 'Scripting Languages',
    videos: [
      {
        id: 'scripting-intro-1',
        title: 'Bash Scripting for DevOps',
        description: 'Essential bash scripting skills for automation and DevOps tasks.',
        duration: '42:15',
        thumbnail: 'https://img.youtube.com/vi/e7BufAVwDiM/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=e7BufAVwDiM',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['bash', 'scripting', 'automation']
      },
      {
        id: 'scripting-intro-2',
        title: 'Python for DevOps Automation',
        description: 'Using Python for DevOps automation, API interactions, and infrastructure management.',
        duration: '48:30',
        thumbnail: 'https://img.youtube.com/vi/4F2m91eKmts/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=4F2m91eKmts',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['python', 'automation', 'devops']
      }
    ]
  },
  {
    topicId: 'tools',
    topicName: 'DevOps Tools',
    videos: [
      {
        id: 'tools-intro-1',
        title: 'Essential DevOps Tools Overview',
        description: 'Comprehensive overview of the most important DevOps tools and their use cases.',
        duration: '25:20',
        thumbnail: 'https://img.youtube.com/vi/0yWAtQ6wY5Y/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=0yWAtQ6wY5Y',
        platform: 'youtube',
        difficulty: 'beginner',
        tags: ['tools', 'overview', 'ecosystem']
      },
      {
        id: 'tools-intro-2',
        title: 'DevOps Toolchain Integration',
        description: 'How to integrate different DevOps tools for a complete workflow.',
        duration: '30:45',
        thumbnail: 'https://img.youtube.com/vi/0yWAtQ6wY5Y/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=0yWAtQ6wY5Y',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['integration', 'workflow', 'toolchain']
      }
    ]
  },
  {
    topicId: 'concepts',
    topicName: 'DevOps Concepts',
    videos: [
      {
        id: 'concepts-intro-1',
        title: 'Microservices Architecture',
        description: 'Understanding microservices architecture and its role in modern DevOps practices.',
        duration: '28:15',
        thumbnail: 'https://img.youtube.com/vi/0yWAtQ6wY5Y/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=0yWAtQ6wY5Y',
        platform: 'youtube',
        difficulty: 'intermediate',
        tags: ['microservices', 'architecture', 'modern']
      },
      {
        id: 'concepts-intro-2',
        title: 'Site Reliability Engineering (SRE)',
        description: 'Introduction to SRE principles and practices for reliable systems.',
        duration: '35:20',
        thumbnail: 'https://img.youtube.com/vi/0yWAtQ6wY5Y/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=0yWAtQ6wY5Y',
        platform: 'youtube',
        difficulty: 'advanced',
        tags: ['sre', 'reliability', 'engineering']
      }
    ]
  }
];

// Helper function to get videos for a specific topic
export function getVideosForTopic(topicId: string): VideoTutorial[] {
  const topic = videoTutorialsData.find(topic => topic.topicId === topicId);
  return topic ? topic.videos : [];
}

// Helper function to get all topics with video counts
export function getAllTopicsWithVideoCounts(): Array<{ topicId: string; topicName: string; videoCount: number }> {
  return videoTutorialsData.map(topic => ({
    topicId: topic.topicId,
    topicName: topic.topicName,
    videoCount: topic.videos.length
  }));
}
