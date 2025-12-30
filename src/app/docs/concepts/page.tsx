import DocsLayout from '@/components/docs-layout';

export default function ConceptsPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'key-concepts', title: 'Key Concepts' },
    { id: 'devops-lifecycle', title: 'DevOps Lifecycle' },
    { id: 'why-infinite', title: 'Why is the DevOps Lifecycle Infinite?' },
    { id: 'summary', title: 'Summary' },
  ];

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          📘 Concepts in DevOps
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-white text-xl mb-8 text-center">
            DevOps is not just a set of tools, it is built around core concepts that guide how development and operations teams collaborate and deliver software effectively.
          </p>

          <h2 id="key-concepts" className="text-3xl font-bold text-white mb-8">1. Key Concepts in DevOps</h2>
          
          <div className="space-y-8 mb-12">
            {/* Collaboration & Culture */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl mr-3">🔹</span>
                Collaboration & Culture
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  DevOps encourages breaking down silos between teams
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Everyone (developers, testers, operations, QA, security) shares responsibility for the product
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Culture shift: from "my job ends here" to "we own it together"
                </li>
              </ul>
            </div>

            {/* Automation */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl mr-3">🔹</span>
                Automation
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Automating repetitive tasks such as building, testing, deploying, and monitoring
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Ensures consistency, reduces errors, and speeds up delivery
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Example: using CI/CD pipelines to automatically test and deploy code
                </li>
              </ul>
            </div>

            {/* Continuous Integration */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl mr-3">🔹</span>
                Continuous Integration (CI)
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Developers integrate code into a shared repository frequently (daily or multiple times a day)
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Each change is automatically tested
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Helps detect bugs early and avoids "integration hell"
                </li>
              </ul>
            </div>

            {/* Continuous Delivery */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl mr-3">🔹</span>
                Continuous Delivery (CD)
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Ensures that code is always in a deployable state
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Every change passes automated testing and can be deployed anytime with minimal effort
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Extends CI by focusing on reliable, frequent releases
                </li>
              </ul>
            </div>

            {/* Continuous Deployment */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl mr-3">🔹</span>
                Continuous Deployment
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  A step further than continuous delivery
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Every change that passes tests is automatically deployed to production without manual approval
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Example: Netflix deploys thousands of updates per day using continuous deployment
                </li>
              </ul>
            </div>

            {/* Infrastructure as Code */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl mr-3">🔹</span>
                Infrastructure as Code (IaC)
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Infrastructure (servers, networks, storage) is defined and managed using code/config files instead of manual setup
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Benefits: consistency, version control, easy rollback
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Tools: Terraform, Ansible, AWS CloudFormation
                </li>
              </ul>
            </div>

            {/* Monitoring & Feedback */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl mr-3">🔹</span>
                Monitoring & Feedback
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Real-time monitoring of applications and infrastructure
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Ensures performance, security, and uptime
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Feedback loops help improve software continuously
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Tools: Prometheus, Grafana, ELK stack
                </li>
              </ul>
            </div>

            {/* Security (DevSecOps) */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl mr-3">🔹</span>
                Security (DevSecOps)
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Security is integrated into every phase of DevOps (not added at the end)
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1">✓</span>
                  Automated security scans, compliance checks, and secure coding practices
                </li>
              </ul>
            </div>
          </div>

          <h2 id="devops-lifecycle" className="text-3xl font-bold text-white mb-6">2. The Infinite DevOps Lifecycle</h2>
          <p className="text-gray-300 text-lg mb-6">The DevOps process is visualized as an infinity loop (∞), representing continuous improvement.</p>
          
          <div className="bg-gray-800 p-8 rounded-lg my-8 border border-gray-600">
            <h3 className="text-xl font-bold text-white mb-6 text-center">🔄 The main stages are:</h3>
            <div className="space-y-4">
              <div className="bg-rose-900 p-4 rounded-lg border border-blue-700 text-center">
                <strong className="text-white text-lg">Plan</strong><br />
                <small className="text-gray-400">Define requirements, plan features, track work using tools like Jira/Trello</small>
              </div>
              <div className="bg-green-900 p-4 rounded-lg border border-green-700 text-center">
                <strong className="text-green-300 text-lg">Code</strong><br />
                <small className="text-gray-400">Write application code using Git/GitHub/GitLab</small>
              </div>
              <div className="bg-yellow-900 p-4 rounded-lg border border-yellow-700 text-center">
                <strong className="text-yellow-300 text-lg">Build</strong><br />
                <small className="text-gray-400">Compile source code, package into binaries, create containers</small>
              </div>
              <div className="bg-purple-900 p-4 rounded-lg border border-purple-700 text-center">
                <strong className="text-purple-300 text-lg">Test</strong><br />
                <small className="text-gray-400">Automated unit tests, integration tests, and security scans</small>
              </div>
              <div className="bg-red-900 p-4 rounded-lg border border-red-700 text-center">
                <strong className="text-red-300 text-lg">Release</strong><br />
                <small className="text-gray-400">Approve and prepare code for deployment</small>
              </div>
              <div className="bg-indigo-900 p-4 rounded-lg border border-indigo-700 text-center">
                <strong className="text-indigo-300 text-lg">Deploy</strong><br />
                <small className="text-gray-400">Push changes to production (via CD pipelines, Docker, Kubernetes)</small>
              </div>
              <div className="bg-pink-900 p-4 rounded-lg border border-pink-700 text-center">
                <strong className="text-pink-300 text-lg">Operate</strong><br />
                <small className="text-gray-400">Run the application in production, ensure uptime and scaling</small>
              </div>
              <div className="bg-orange-900 p-4 rounded-lg border border-orange-700 text-center">
                <strong className="text-orange-300 text-lg">Monitor</strong><br />
                <small className="text-gray-400">Observe system health, collect metrics, gather user feedback</small>
              </div>
            </div>
            <p className="text-gray-300 text-center mt-6">After monitoring, feedback goes back to planning, completing the continuous loop.</p>
          </div>

          <h2 id="why-infinite" className="text-3xl font-bold text-white mb-6">3. Why is the DevOps Lifecycle Infinite?</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <ul className="text-gray-300 space-y-4">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                Because software is never "finished"
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                Continuous updates, bug fixes, performance improvements, and new features are always needed
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                The loop ensures ongoing improvement and faster delivery of value to users
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
            <h3 id="summary" className="text-white font-bold text-xl mb-3">✅ Summary for Students</h3>
            <ul className="text-gray-300 space-y-2">
              <li>Concepts in DevOps revolve around collaboration, automation, CI/CD, IaC, monitoring, and security</li>
              <li>The DevOps lifecycle is an infinite loop: Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Plan again</li>
              <li>This ensures continuous development, delivery, and feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

