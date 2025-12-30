import DocsLayout from '@/components/docs-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function JenkinsPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'What is Jenkins?' },
    { id: 'why-jenkins-devops', title: 'Why Jenkins in DevOps?' },
    { id: 'jenkins-architecture', title: 'Jenkins Architecture' },
    { id: 'key-concepts', title: 'Key Concepts' },
    { id: 'installation', title: 'Installation' },
    { id: 'jenkins-workflow', title: 'Jenkins Workflow' },
    { id: 'freestyle-vs-pipelines', title: 'Freestyle Jobs vs Pipelines' },
    { id: 'integrations', title: 'Integrations' },
    { id: 'cicd-example', title: 'CI/CD Example' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'intermediate-features', title: 'Intermediate Features' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'practice-exercises', title: 'Practice Exercises' },
    { id: 'summary', title: 'Summary' },
  ];

  const jenkinsVideos = getVideosForTopic('jenkins');

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          🔧 Jenkins (CI/CD)
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-600 p-8 rounded-xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Goal</h2>
            <p className="text-white text-xl">Learn to set up Continuous Integration (CI) and Continuous Deployment (CD) pipelines.</p>
          </div>

          <h2 id="introduction" className="text-3xl font-bold text-white mb-6">1. What is Jenkins?</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Jenkins is an open-source automation server written in Java
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Helps automate build, test, and deployment of applications
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Extensible with 1,800+ plugins (Git, Docker, Kubernetes, AWS, etc.)
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Core of CI/CD pipelines in many organizations
              </li>
            </ul>
          </div>

          <h2 id="why-jenkins-devops" className="text-3xl font-bold text-white mb-6">2. Why Jenkins in DevOps?</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <div className="space-y-4 mb-6">
              <div className="bg-red-900 border border-red-700 p-4 rounded">
                <p className="text-red-300 font-semibold">❌ Manual builds/testing/deployment → slow, error-prone</p>
              </div>
              <div className="bg-green-900 border border-green-700 p-4 rounded">
                <p className="text-green-300 font-semibold">✅ Jenkins automates everything → fast, reliable, repeatable</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4">Benefits:</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>CI</strong> → Every code commit is automatically built/tested
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>CD</strong> → Code is automatically deployed to staging/production
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Flexibility</strong> → Works with almost any tool (Git, Docker, Ansible, Kubernetes, AWS, Azure, etc.)
              </li>
            </ul>
          </div>

          <h2 id="jenkins-architecture" className="text-3xl font-bold text-white mb-6">3. Jenkins Architecture</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-white mb-2">Jenkins Master (Controller)</h4>
                <p className="text-gray-300 text-sm">Runs the web UI & schedules jobs</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Jenkins Agents (Slaves/Nodes)</h4>
                <p className="text-gray-300 text-sm">Execute the jobs on different machines</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Plugins</h4>
                <p className="text-gray-300 text-sm">Extend Jenkins functionality (GitHub, Maven, Docker, Kubernetes, etc.)</p>
              </div>
            </div>
          </div>

          <h2 id="key-concepts" className="text-3xl font-bold text-white mb-6">4. Key Concepts</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-white mb-2">Job / Project</h4>
                <p className="text-gray-300 text-sm">Unit of work (e.g., build + test a project)</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Build</h4>
                <p className="text-gray-300 text-sm">Execution of a job</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Pipeline</h4>
                <p className="text-gray-300 text-sm">Workflow written in code (Groovy DSL)</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-yellow-400 mb-2">Jenkinsfile</h4>
                <p className="text-gray-300 text-sm">File that defines pipeline steps (kept in repo)</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-red-400 mb-2">Plugins</h4>
                <p className="text-gray-300 text-sm">Add integration with external tools</p>
              </div>
            </div>
          </div>

          <h2 id="installation" className="text-3xl font-bold text-white mb-6">5. Installation</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">On Ubuntu/Debian</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600 mb-4">
              <pre className="text-green-400 font-mono text-sm">
{`# Install Java (required)
sudo apt update
sudo apt install openjdk-11-jdk -y

# Add Jenkins repo & key
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \\
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \\
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \\
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt update
sudo apt install jenkins -y

# Start service
sudo systemctl enable jenkins
sudo systemctl start jenkins`}
              </pre>
            </div>
            <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg">
              <p className="text-yellow-300 font-semibold">👉 Access Jenkins at: http://localhost:8080</p>
            </div>
          </div>

          <h2 id="jenkins-workflow" className="text-3xl font-bold text-white mb-6">6. Jenkins Workflow</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">1</div>
                <span className="text-gray-300">Developer pushes code to GitHub/GitLab</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">2</div>
                <span className="text-gray-300">Jenkins detects change (via webhook/polling)</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">3</div>
                <span className="text-gray-300">Jenkins builds project (compile, test, package)</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">4</div>
                <span className="text-gray-300">Jenkins creates artifact (JAR, WAR, Docker image)</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">5</div>
                <span className="text-gray-300">Jenkins deploys artifact (to server, Docker, Kubernetes, cloud)</span>
              </div>
            </div>
          </div>

          <h2 id="freestyle-vs-pipelines" className="text-3xl font-bold text-white mb-6">7. Freestyle Jobs vs Pipelines</h2>
          <div className="space-y-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Freestyle Jobs</h3>
              <p className="text-gray-300 mb-4">GUI-based, simple automation</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Pipeline (Jenkinsfile)</h3>
              <p className="text-gray-300 mb-4">Code-driven, supports complex workflows</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Example Jenkinsfile:</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/user/myapp.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t myapp:latest .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 8080:8080 myapp:latest'
            }
        }
    }
}`}
              </pre>
            </div>
          </div>

          <h2 id="integrations" className="text-3xl font-bold text-white mb-6">8. Integrations</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Version Control</h4>
              <p className="text-gray-300 text-sm">Git, GitHub, GitLab, Bitbucket</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Build Tools</h4>
              <p className="text-gray-300 text-sm">Maven, Gradle, npm</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Containerization</h4>
              <p className="text-gray-300 text-sm">Docker (build & push images)</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Orchestration</h4>
              <p className="text-gray-300 text-sm">Kubernetes (deploy apps at scale)</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Cloud</h4>
              <p className="text-gray-300 text-sm">AWS, Azure, GCP plugins</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Monitoring</h4>
              <p className="text-gray-300 text-sm">Slack/Email notifications for build status</p>
            </div>
          </div>

          <h2 id="cicd-example" className="text-3xl font-bold text-white mb-6">9. CI/CD Example</h2>
          <div className="space-y-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-4">Continuous Integration (CI)</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  Trigger build on every Git commit
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  Run unit tests
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  Package app (JAR/Docker)
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Continuous Deployment (CD)</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">•</span>
                  Deploy automatically to staging server
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">•</span>
                  If tests pass → deploy to production
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">•</span>
                  Rollback if deployment fails
                </li>
              </ul>
            </div>
          </div>

          <h2 id="best-practices" className="text-3xl font-bold text-white mb-6">10. Best Practices</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✅</span>
                Store Jenkinsfile in the repo (Pipeline as Code)
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✅</span>
                Use pipeline libraries for reusability
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✅</span>
                Always run automated tests before deployment
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✅</span>
                Secure Jenkins with RBAC + credentials store
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✅</span>
                Run Jenkins in a container (docker run jenkins/jenkins)
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✅</span>
                Scale Jenkins with agents on Kubernetes
              </li>
            </ul>
          </div>

          <h2 id="intermediate-features" className="text-3xl font-bold text-white mb-6">11. Intermediate Features</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Blue Ocean UI</h4>
              <p className="text-gray-300 text-sm">Modern UI for pipelines</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Multibranch Pipelines</h4>
              <p className="text-gray-300 text-sm">Build all branches/PRs automatically</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Declarative vs Scripted</h4>
              <p className="text-gray-300 text-sm">Declarative preferred for beginners</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Jenkins Shared Libraries</h4>
              <p className="text-gray-300 text-sm">Reusable pipeline code</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Pipeline Triggers</h4>
              <p className="text-gray-300 text-sm">Scheduled jobs, webhooks, poll SCM</p>
            </div>
          </div>

          <VideoSection videos={jenkinsVideos} title="Jenkins Video Tutorials" />

          <h2 id="practice-exercises" className="text-3xl font-bold text-white mb-6">12. Practice Exercises</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Install Jenkins and create a Freestyle Job to clone and build a GitHub repo
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Write a Jenkinsfile for a Java/Maven project
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Configure Jenkins to build Docker image and push to Docker Hub
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Create a multi-stage pipeline (Build → Test → Deploy)
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Integrate Jenkins with Slack for build notifications
              </li>
            </ul>
          </div>

          <h2 id="summary" className="text-3xl font-bold text-white mb-6">✅ Summary</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Jenkins is the most used CI/CD automation tool in DevOps
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Helps automate build → test → deploy pipelines
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Uses pipelines (Jenkinsfile) for automation as code
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Integrates with Git, Docker, Kubernetes, and cloud providers
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Key to enabling continuous delivery in modern software
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
