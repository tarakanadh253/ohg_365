import DocsLayout from '@/components/docs-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';




export default function DockerPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'What is Containerization?' },
    { id: 'what-is-docker', title: 'What is Docker?' },
    { id: 'why-docker-devops', title: 'Why Docker in DevOps?' },
    { id: 'docker-architecture', title: 'Docker Architecture' },
    { id: 'docker-workflow', title: 'Docker Basic Workflow' },
    { id: 'docker-commands', title: 'Important Docker Commands' },
    { id: 'dockerfile', title: 'Dockerfile (Key Instructions)' },
    { id: 'volumes-networking', title: 'Docker Volumes & Networking' },
    { id: 'docker-compose', title: 'Docker Compose' },
    { id: 'docker-registry', title: 'Docker Registry' },
    { id: 'docker-devops', title: 'Docker in DevOps' },
    { id: 'intermediate-concepts', title: 'Intermediate Concepts' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'practice-exercises', title: 'Practice Exercises' },
    { id: 'summary', title: 'Summary' },
  ];

  const dockerVideos = getVideosForTopic('docker');

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          🐳 Docker (Containers)
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-600 p-8 rounded-xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Goal</h2>
            <p className="text-white text-xl">Learn containerization with Docker for consistent deployments.</p>
          </div>

          <h2 id="introduction" className="text-3xl font-bold text-white mb-6">1. What is Containerization?</h2>
          
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-600 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Traditional deployment problem:</h3>
            <div className="space-y-6 mb-8">
              <div className="bg-gray-700 border border-gray-500 p-6 rounded-xl">
                <p className="text-white font-semibold text-lg">✅ Works on developer machine</p>
              </div>
              <div className="bg-gray-700 border border-gray-500 p-6 rounded-xl">
                <p className="text-red-300 font-semibold text-lg">❌ Fails on production (due to dependency/version mismatch)</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-green-400 mb-4">Containerization solves this:</h3>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Packages app + dependencies into lightweight, isolated containers
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Runs the same way on any environment (dev, test, prod)
              </li>
            </ul>
            
            <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg">
              <p className="text-yellow-300 font-semibold">📌 Think of containers as lightweight VMs – but faster and sharing the same OS kernel</p>
            </div>
          </div>

          <h2 id="what-is-docker" className="text-3xl font-bold text-white mb-6">2. What is Docker?</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Open-source containerization platform
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Created in 2013 by Docker Inc
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Uses Docker Engine to build, run, and manage containers
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Containers are built from Docker Images
              </li>
            </ul>
          </div>

          <h2 id="why-docker-devops" className="text-3xl font-bold text-white mb-6">3. Why Docker in DevOps?</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Consistency</h4>
              <p className="text-gray-300 text-sm">Same environment across dev → QA → prod</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Speed</h4>
              <p className="text-gray-300 text-sm">Faster than VMs</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Portability</h4>
              <p className="text-gray-300 text-sm">Runs on Linux, Windows, Cloud, Kubernetes</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Scalability</h4>
              <p className="text-gray-300 text-sm">Easily scaled using orchestration tools</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">CI/CD Integration</h4>
              <p className="text-gray-300 text-sm">Build once, deploy everywhere</p>
            </div>
          </div>

          <h2 id="docker-architecture" className="text-3xl font-bold text-white mb-6">4. Docker Architecture</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-white mb-2">Docker Client</h4>
                <p className="text-gray-300 text-sm">CLI (docker) used by developers</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Docker Daemon (dockerd)</h4>
                <p className="text-gray-300 text-sm">Runs in background, manages containers</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Docker Images</h4>
                <p className="text-gray-300 text-sm">Templates (read-only) for containers</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-yellow-400 mb-2">Docker Containers</h4>
                <p className="text-gray-300 text-sm">Running instances of images</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-red-400 mb-2">Docker Hub/Registry</h4>
                <p className="text-gray-300 text-sm">Store & share images</p>
              </div>
            </div>
          </div>

          <h2 id="docker-workflow" className="text-3xl font-bold text-white mb-6">5. Docker Basic Workflow</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">1</div>
                <span className="text-gray-300">Write app code</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">2</div>
                <span className="text-gray-300">Create a Dockerfile (instructions for building image)</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">3</div>
                <code className="text-green-400 font-mono">docker build</code>
                <span className="text-gray-300 ml-3">Build image</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">4</div>
                <code className="text-green-400 font-mono">docker run</code>
                <span className="text-gray-300 ml-3">Run container</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">5</div>
                <code className="text-green-400 font-mono">docker push</code>
                <span className="text-gray-300 ml-3">Push to Docker Hub</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">6</div>
                <span className="text-gray-300">Deploy container anywhere</span>
              </div>
            </div>
          </div>

          <h2 id="docker-commands" className="text-3xl font-bold text-white mb-6">6. Important Docker Commands</h2>
          <div className="space-y-8 mb-8">
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-purple-400 mb-4">🔹 Working with Images</h3>
                <div className="space-y-2">
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker pull nginx</code>
                    <span className="text-gray-300 ml-3"># Download image from Docker Hub</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker images</code>
                    <span className="text-gray-300 ml-3"># List local images</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker rmi image_id</code>
                    <span className="text-gray-300 ml-3"># Remove image</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-purple-400 mb-4">🔹 Working with Containers</h3>
                <div className="space-y-2">
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker run -d -p 8080:80 nginx</code>
                    <span className="text-gray-300 ml-3"># Run nginx in detached mode</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker ps</code>
                    <span className="text-gray-300 ml-3"># List running containers</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker stop container_id</code>
                    <span className="text-gray-300 ml-3"># Stop container</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker rm container_id</code>
                    <span className="text-gray-300 ml-3"># Remove container</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-purple-400 mb-4">🔹 Build Your Own Image</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600 mb-4">
                  <p className="text-gray-300 mb-2"># Dockerfile example</p>
                  <pre className="text-green-400 font-mono text-sm">
{`FROM python:3.9
COPY app.py /app/
WORKDIR /app
RUN pip install flask
CMD ["python", "app.py"]`}
                  </pre>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker build -t myapp .</code>
                    <span className="text-gray-300 ml-3"># Build & run</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker run -p 5000:5000 myapp</code>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-purple-400 mb-4">🔹 Debugging</h3>
                <div className="space-y-2">
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker logs container_id</code>
                    <span className="text-gray-300 ml-3"># View logs</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">docker exec -it container_id bash</code>
                    <span className="text-gray-300 ml-3"># Access container shell</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 id="dockerfile" className="text-3xl font-bold text-white mb-6">7. Dockerfile (Key Instructions)</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-white mb-2">FROM</h4>
                <p className="text-gray-300 text-sm">Base image (e.g., Ubuntu, Python)</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">COPY</h4>
                <p className="text-gray-300 text-sm">Copy files into image</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">RUN</h4>
                <p className="text-gray-300 text-sm">Execute commands (install packages)</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-yellow-400 mb-2">WORKDIR</h4>
                <p className="text-gray-300 text-sm">Set working directory</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-red-400 mb-2">CMD</h4>
                <p className="text-gray-300 text-sm">Default command to run container</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-indigo-400 mb-2">EXPOSE</h4>
                <p className="text-gray-300 text-sm">Ports to expose</p>
              </div>
            </div>
          </div>

          <h2 id="volumes-networking" className="text-3xl font-bold text-white mb-6">8. Docker Volumes & Networking</h2>
          <div className="space-y-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Volumes (Persistent Storage)</h3>
              <div className="bg-gray-700 p-3 rounded mb-4">
                <code className="text-green-400">docker run -v /host/data:/container/data myapp</code>
              </div>
              <p className="text-gray-300">Data stored outside container → survives restart</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Networking</h3>
              <div className="space-y-2 mb-4">
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">docker network create mynet</code>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">docker run --network=mynet myapp</code>
                </div>
              </div>
              <p className="text-gray-300">Containers talk to each other inside a network</p>
            </div>
          </div>

          <h2 id="docker-compose" className="text-3xl font-bold text-white mb-6">9. Docker Compose</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <p className="text-gray-300 mb-4">Used to run multi-container apps (like web + db).</p>
            <p className="text-gray-300 mb-4">Defined in docker-compose.yml.</p>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4">Example:</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600 mb-4">
              <pre className="text-green-400 font-mono text-sm">
{`version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root`}
              </pre>
            </div>
            
            <p className="text-gray-300 mb-2">Run:</p>
            <div className="bg-gray-700 p-3 rounded">
              <code className="text-green-400">docker-compose up -d</code>
            </div>
          </div>

          <h2 id="docker-registry" className="text-3xl font-bold text-white mb-6">10. Docker Registry</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Docker Hub</h3>
                <p className="text-gray-300 mb-4">Public registry</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Private Registry</h3>
                <p className="text-gray-300 mb-4">Store private images</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-700 p-3 rounded">
                <code className="text-green-400">docker login</code>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <code className="text-green-400">docker tag myapp username/myapp:v1</code>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <code className="text-green-400">docker push username/myapp:v1</code>
              </div>
            </div>
          </div>

          <h2 id="docker-devops" className="text-3xl font-bold text-white mb-6">11. Docker in DevOps</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">CI/CD Pipelines</h4>
              <p className="text-gray-300">Build & push Docker images</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Kubernetes</h4>
              <p className="text-gray-300">Deploy containers at scale</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Monitoring</h4>
              <p className="text-gray-300">Via Prometheus, Grafana, ELK</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Infrastructure Automation</h4>
              <p className="text-gray-300">With Terraform + Docker</p>
            </div>
          </div>

          <h2 id="intermediate-concepts" className="text-3xl font-bold text-white mb-6">12. Intermediate Concepts</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Multi-stage Builds</h4>
              <p className="text-gray-300 text-sm">Reduce image size</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Health Checks</h4>
              <p className="text-gray-300 text-sm">Monitor container status</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Alpine Images</h4>
              <p className="text-gray-300 text-sm">Lightweight images</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Security</h4>
              <p className="text-gray-300 text-sm">Use minimal base images, scan with trivy</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2">Orchestration</h4>
              <p className="text-gray-300 text-sm">Use Kubernetes or Docker Swarm for scaling</p>
            </div>
          </div>

          <VideoSection videos={dockerVideos} title="Docker Video Tutorials" />

          <h2 id="practice-exercises" className="text-3xl font-bold text-white mb-6">13. Practice Exercises</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Pull and run nginx container on port 8080
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Build a custom Python Flask app image and run it
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Use Docker volumes to persist MySQL database data
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Deploy a 2-service app (Flask + MySQL) using Docker Compose
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Push an image to Docker Hub and run it on another machine
              </li>
            </ul>
          </div>

          <h2 id="summary" className="text-3xl font-bold text-white mb-6">✅ Summary</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Docker → Containerization platform for consistent deployments
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Core Components → Images, Containers, Registries
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Key Skills → Dockerfile, Volumes, Networking, Docker Compose
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                In DevOps → Used in CI/CD, cloud deployments, microservices
              </li>
      </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

