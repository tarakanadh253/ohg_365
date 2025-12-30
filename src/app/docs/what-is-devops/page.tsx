import DocsLayout from '@/components/docs-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function WhatIsDevOpsPage() {
  const pageHeadings = [
    { id: 'definition', title: 'Definition' },
    { id: 'why-devops', title: 'Why DevOps?' },
    { id: 'key-principles', title: 'Key Principles' },
    { id: 'devops-lifecycle', title: 'DevOps Lifecycle' },
    { id: 'benefits', title: 'Benefits' },
    { id: 'popular-tools', title: 'Popular Tools' },
    { id: 'devops-vs-traditional', title: 'DevOps vs Traditional IT' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'summary', title: 'Summary' },
  ];

  const devopsVideos = getVideosForTopic('what-is-devops');

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="definition" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          📘 What is DevOps?
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <h2 id="definition" className="text-3xl font-bold text-white mb-6">1. Definition</h2>
          <p className="text-gray-300 text-lg mb-6">DevOps is a set of practices, cultural philosophies, and tools that combines software development (Dev) and IT operations (Ops).</p>
          
          <p className="text-gray-300 text-lg mb-4">Its main goal is to:</p>
          <ul className="text-gray-300 text-lg mb-8 space-y-2">
            <li className="flex items-center">
              <span className="text-white mr-3">•</span>
              Shorten the software development lifecycle
            </li>
            <li className="flex items-center">
              <span className="text-white mr-3">•</span>
              Deliver high-quality software continuously
            </li>
            <li className="flex items-center">
              <span className="text-white mr-3">•</span>
              Ensure faster and reliable releases
            </li>
          </ul>

          <div className="bg-gray-800 border-l-4 border-rose-500 p-6 my-8 rounded-r-lg">
            <p className="text-white text-lg font-semibold mb-2">In simple words:</p>
            <p className="text-gray-300 text-lg">👉 DevOps is a bridge between developers who write the code and operations teams who deploy and maintain it.</p>
          </div>

          <h2 id="why-devops" className="text-3xl font-bold text-white mb-6">2. Why DevOps?</h2>
          <p className="text-gray-300 text-lg mb-4">Traditionally, development and operations worked in silos:</p>
          <ul className="text-gray-300 text-lg mb-6 space-y-2">
            <li className="flex items-center">
              <span className="text-red-400 mr-3">•</span>
              Developers wrote code and "threw it over the wall"
            </li>
            <li className="flex items-center">
              <span className="text-red-400 mr-3">•</span>
              Operations struggled with deploying and maintaining it
            </li>
            <li className="flex items-center">
              <span className="text-red-400 mr-3">•</span>
              This caused delays, miscommunication, and poor reliability
            </li>
          </ul>
          
          <p className="text-gray-300 text-lg mb-8">DevOps solves this by promoting collaboration, automation, and continuous improvement.</p>

          <h2 id="key-principles" className="text-3xl font-bold text-white mb-6">3. Key Principles of DevOps</h2>
          
          <div className="space-y-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Collaboration & Communication</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  Developers, testers, and operations work together
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  Shared responsibility for product success
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Automation</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  Automating repetitive tasks like builds, testing, deployments
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  Reduces human errors and speeds up delivery
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">CI/CD</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  Code changes frequently integrated, tested, and deployed
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  Ensures faster feedback and quicker releases
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Monitoring & Feedback</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  Systems monitored in real time
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  Issues identified early and resolved quickly
                </li>
      </ul>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Infrastructure as Code (IaC)</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center">
                <span className="text-green-400 mr-3">✓</span>
                Infrastructure (servers, networks) managed through code (Terraform, Ansible)
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-3">✓</span>
                Consistency across environments
              </li>
      </ul>
          </div>

          <h2 id="devops-lifecycle" className="text-3xl font-bold text-white mb-6">4. DevOps Lifecycle</h2>
          <p className="text-gray-300 text-lg mb-6">The DevOps lifecycle is usually represented as an infinity loop:</p>
          
          <div className="bg-gray-800 p-8 rounded-lg my-8 border border-gray-700">
            <div className="space-y-4 text-center">
              <div className="bg-rose-900 p-4 rounded-lg border border-blue-700">
                <strong className="text-white">Plan</strong><br />
                <small className="text-gray-400">Define requirements, plan features</small>
              </div>
              <div className="bg-green-900 p-4 rounded-lg border border-green-700">
                <strong className="text-green-300">Code</strong><br />
                <small className="text-gray-400">Write application code</small>
              </div>
              <div className="bg-yellow-900 p-4 rounded-lg border border-yellow-700">
                <strong className="text-yellow-300">Build</strong><br />
                <small className="text-gray-400">Compile, package, and prepare artifacts</small>
              </div>
              <div className="bg-purple-900 p-4 rounded-lg border border-purple-700">
                <strong className="text-purple-300">Test</strong><br />
                <small className="text-gray-400">Automated/unit/integration testing</small>
              </div>
              <div className="bg-red-900 p-4 rounded-lg border border-red-700">
                <strong className="text-red-300">Release</strong><br />
                <small className="text-gray-400">Prepare for deployment</small>
              </div>
              <div className="bg-indigo-900 p-4 rounded-lg border border-indigo-700">
                <strong className="text-indigo-300">Deploy</strong><br />
                <small className="text-gray-400">Push changes to production</small>
              </div>
              <div className="bg-pink-900 p-4 rounded-lg border border-pink-700">
                <strong className="text-pink-300">Operate</strong><br />
                <small className="text-gray-400">Manage infrastructure, scaling, availability</small>
              </div>
              <div className="bg-orange-900 p-4 rounded-lg border border-orange-700">
                <strong className="text-orange-300">Monitor</strong><br />
                <small className="text-gray-400">Collect feedback, analyze system health, performance</small>
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg mb-8">This loop is continuous, improving with every cycle.</p>

          <h2 id="benefits" className="text-3xl font-bold text-white mb-6">5. Benefits of DevOps</h2>
          <div className="space-y-6 my-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-colors">
              <h4 className="font-bold text-green-400 text-xl mb-3">Faster Delivery</h4>
              <p className="text-gray-300">Frequent releases and updates</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-rose-500 transition-colors">
              <h4 className="font-bold text-white text-xl mb-3">Improved Quality</h4>
              <p className="text-gray-300">Automated testing ensures fewer bugs</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
              <h4 className="font-bold text-purple-400 text-xl mb-3">Reliability</h4>
              <p className="text-gray-300">Stable and consistent environments</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
              <h4 className="font-bold text-yellow-400 text-xl mb-3">Scalability</h4>
              <p className="text-gray-300">Infrastructure managed as code</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
              <h4 className="font-bold text-red-400 text-xl mb-3">Better Collaboration</h4>
              <p className="text-gray-300">Teams work together seamlessly</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors">
              <h4 className="font-bold text-indigo-400 text-xl mb-3">Continuous Improvement</h4>
              <p className="text-gray-300">Feedback-driven culture</p>
            </div>
          </div>

          <h2 id="popular-tools" className="text-3xl font-bold text-white mb-6">6. Popular DevOps Tools</h2>
          <div className="space-y-6 my-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-rose-500 transition-colors">
              <h4 className="font-bold text-white text-lg mb-3">Version Control</h4>
              <p className="text-gray-300">Git, GitHub, GitLab</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-colors">
              <h4 className="font-bold text-green-400 text-lg mb-3">CI/CD</h4>
              <p className="text-gray-300">Jenkins, GitHub Actions, GitLab CI, CircleCI</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
              <h4 className="font-bold text-purple-400 text-lg mb-3">Containerization</h4>
              <p className="text-gray-300">Docker, Podman</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
              <h4 className="font-bold text-yellow-400 text-lg mb-3">Orchestration</h4>
              <p className="text-gray-300">Kubernetes</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
              <h4 className="font-bold text-red-400 text-lg mb-3">IaC</h4>
              <p className="text-gray-300">Terraform, Ansible, AWS CloudFormation</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors">
              <h4 className="font-bold text-indigo-400 text-lg mb-3">Monitoring</h4>
              <p className="text-gray-300">Prometheus, Grafana, ELK Stack</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-pink-500 transition-colors">
              <h4 className="font-bold text-pink-400 text-lg mb-3">Collaboration</h4>
              <p className="text-gray-300">Slack, Microsoft Teams, Jira</p>
            </div>
          </div>

          <h2 id="devops-vs-traditional" className="text-3xl font-bold text-white mb-6">7. DevOps vs Traditional IT</h2>
          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Aspect</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-red-400 uppercase tracking-wider">Traditional Model</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-green-400 uppercase tracking-wider">DevOps Model</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Team Structure</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">Developers vs Ops (silos)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Collaborative, cross-functional</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Deployment Frequency</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">Weeks/Months</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Daily/Multiple times per day</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Testing</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">Manual, late stage</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Automated, early & continuous</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Infrastructure</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">Manual provisioning</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Automated (IaC)</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Feedback</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">Slow</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Continuous, real-time</td>
                </tr>
              </tbody>
            </table>
          </div>

          <VideoSection videos={devopsVideos} title="DevOps Video Tutorials" />

          <div className="bg-gray-800 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
            <h3 id="summary" className="text-green-400 font-bold text-xl mb-3">✅ Summary for Students:</h3>
            <p className="text-gray-300 text-lg">DevOps is not just about tools. It's a mindset and a culture of collaboration, supported by automation and modern practices, aimed at delivering better software faster.</p>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}