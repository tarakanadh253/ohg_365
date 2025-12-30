import DocsLayout from '@/components/docs-layout';

export default function ToolsPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'plan-tools', title: 'Plan Tools' },
    { id: 'code-tools', title: 'Code Tools' },
    { id: 'build-tools', title: 'Build Tools' },
    { id: 'test-tools', title: 'Test Tools' },
    { id: 'release-tools', title: 'Release Tools' },
    { id: 'deploy-tools', title: 'Deploy Tools' },
    { id: 'operate-tools', title: 'Operate Tools' },
    { id: 'monitor-tools', title: 'Monitor Tools' },
    { id: 'summary-table', title: 'Summary Table' },
  ];

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          🔧 Tools in DevOps
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <p className="text-white text-xl mb-8 text-center">
            DevOps relies on a wide ecosystem of tools. Each stage of the infinite lifecycle (Plan → Code → Build → Test → Release → Deploy → Operate → Monitor) has specialized tools.
          </p>

          {/* Plan Tools */}
          <div className="mb-12">
            <h2 id="plan-tools" className="text-3xl font-bold text-white mb-6">1. Plan</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Goal</h3>
                  <p className="text-gray-300">Define requirements, track progress, and manage collaboration.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Why</h3>
                  <p className="text-gray-300">Helps teams stay aligned and manage backlogs.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Jira</h4>
                <p className="text-gray-300 text-sm">Agile project management, sprint planning, issue tracking</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Trello</h4>
                <p className="text-gray-300 text-sm">Simple kanban-style board for tasks</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Asana</h4>
                <p className="text-gray-300 text-sm">Task & project management with timeline view</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Confluence</h4>
                <p className="text-gray-300 text-sm">Documentation and knowledge sharing</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
                <h4 className="font-bold text-red-400 mb-2">GitHub Projects</h4>
                <p className="text-gray-300 text-sm">Planning inside version control system</p>
              </div>
            </div>
            <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
              <p className="text-green-300 font-semibold">✅ Most Used: Jira (enterprise), Trello (small teams)</p>
            </div>
          </div>

          {/* Code Tools */}
          <div className="mb-12">
            <h2 id="code-tools" className="text-3xl font-bold text-white mb-6">2. Code</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Goal</h3>
                  <p className="text-gray-300">Source code management, collaboration, and version control.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Why</h3>
                  <p className="text-gray-300">Ensures teamwork, history tracking, and safe collaboration.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-rose-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Git</h4>
                <p className="text-gray-300 text-sm">Distributed version control system (foundation for all)</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">GitHub</h4>
                <p className="text-gray-300 text-sm">Cloud platform for hosting Git repositories, PRs, and collaboration</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">GitLab</h4>
                <p className="text-gray-300 text-sm">Git-based platform with integrated CI/CD</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Bitbucket</h4>
                <p className="text-gray-300 text-sm">Git repo hosting with Jira integration</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
                <h4 className="font-bold text-red-400 mb-2">VS Code</h4>
                <p className="text-gray-300 text-sm">IDE for coding and integration with Git</p>
              </div>
            </div>
            <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
              <p className="text-green-300 font-semibold">✅ Most Used: Git + GitHub</p>
            </div>
          </div>

          {/* Build Tools */}
          <div className="mb-12">
            <h2 id="build-tools" className="text-3xl font-bold text-white mb-6">3. Build</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Goal</h3>
                  <p className="text-gray-300">Compile source code, package apps, create builds/containers.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Why</h3>
                  <p className="text-gray-300">Converts code into runnable artifacts.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-rose-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Maven</h4>
                <p className="text-gray-300 text-sm">Java build automation tool</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Gradle</h4>
                <p className="text-gray-300 text-sm">Flexible build automation for multiple languages</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">npm / Yarn</h4>
                <p className="text-gray-300 text-sm">Build/package managers for JavaScript</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Docker</h4>
                <p className="text-gray-300 text-sm">Package applications into containers for consistency</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
                <h4 className="font-bold text-red-400 mb-2">Jenkins</h4>
                <p className="text-gray-300 text-sm">Automates build pipelines</p>
              </div>
            </div>
            <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
              <p className="text-green-300 font-semibold">✅ Most Used: Jenkins + Docker</p>
            </div>
          </div>

          {/* Test Tools */}
          <div className="mb-12">
            <h2 id="test-tools" className="text-3xl font-bold text-white mb-6">4. Test</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Goal</h3>
                  <p className="text-gray-300">Automated testing (unit, integration, security, performance).</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Why</h3>
                  <p className="text-gray-300">Ensures reliability, prevents bugs from reaching production.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-rose-500 transition-colors">
                <h4 className="font-bold text-white mb-2">JUnit / TestNG</h4>
                <p className="text-gray-300 text-sm">Java testing frameworks</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Selenium</h4>
                <p className="text-gray-300 text-sm">Automated browser testing</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Jest / Mocha</h4>
                <p className="text-gray-300 text-sm">JavaScript testing</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">PyTest</h4>
                <p className="text-gray-300 text-sm">Python testing</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
                <h4 className="font-bold text-red-400 mb-2">SonarQube</h4>
                <p className="text-gray-300 text-sm">Code quality and static analysis</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors">
                <h4 className="font-bold text-indigo-400 mb-2">Postman</h4>
                <p className="text-gray-300 text-sm">API testing</p>
              </div>
            </div>
            <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
              <p className="text-green-300 font-semibold">✅ Most Used: Selenium, JUnit, SonarQube</p>
            </div>
          </div>

          {/* Release Tools */}
          <div className="mb-12">
            <h2 id="release-tools" className="text-3xl font-bold text-white mb-6">5. Release</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Goal</h3>
                  <p className="text-gray-300">Control and approve what gets delivered.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Why</h3>
                  <p className="text-gray-300">Ensures stability before production rollout.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-rose-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Jenkins</h4>
                <p className="text-gray-300 text-sm">CI/CD pipeline automation</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">GitLab CI/CD</h4>
                <p className="text-gray-300 text-sm">Integrated with GitLab repos</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">CircleCI</h4>
                <p className="text-gray-300 text-sm">Cloud CI/CD solutions</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Azure DevOps</h4>
                <p className="text-gray-300 text-sm">CI/CD and release pipelines</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
                <h4 className="font-bold text-red-400 mb-2">Spinnaker</h4>
                <p className="text-gray-300 text-sm">Continuous delivery at scale</p>
              </div>
            </div>
            <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
              <p className="text-green-300 font-semibold">✅ Most Used: Jenkins, GitLab CI/CD</p>
            </div>
          </div>

          {/* Deploy Tools */}
          <div className="mb-12">
            <h2 id="deploy-tools" className="text-3xl font-bold text-white mb-6">6. Deploy</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Goal</h3>
                  <p className="text-gray-300">Push applications into production safely.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Why</h3>
                  <p className="text-gray-300">Automates release to environments (staging, prod).</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-rose-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Kubernetes</h4>
                <p className="text-gray-300 text-sm">Container orchestration (auto-scaling, rollback, self-healing)</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Docker Swarm</h4>
                <p className="text-gray-300 text-sm">Lightweight orchestration for Docker</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Ansible</h4>
                <p className="text-gray-300 text-sm">Configuration management & deployment automation</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Terraform</h4>
                <p className="text-gray-300 text-sm">IaC for cloud provisioning</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
                <h4 className="font-bold text-red-400 mb-2">ArgoCD</h4>
                <p className="text-gray-300 text-sm">GitOps-based Kubernetes deployment</p>
              </div>
            </div>
            <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
              <p className="text-green-300 font-semibold">✅ Most Used: Kubernetes + Terraform + Ansible</p>
            </div>
          </div>

          {/* Operate Tools */}
          <div className="mb-12">
            <h2 id="operate-tools" className="text-3xl font-bold text-white mb-6">7. Operate</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Goal</h3>
                  <p className="text-gray-300">Manage applications and infrastructure in production.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Why</h3>
                  <p className="text-gray-300">Ensure uptime, stability, scaling, and infrastructure management.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-rose-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Kubernetes</h4>
                <p className="text-gray-300 text-sm">Manages containers in production</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Docker</h4>
                <p className="text-gray-300 text-sm">Runs isolated application environments</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Ansible / Puppet / Chef</h4>
                <p className="text-gray-300 text-sm">Configuration management</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">AWS / Azure / GCP</h4>
                <p className="text-gray-300 text-sm">Cloud platforms to run workloads</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
                <h4 className="font-bold text-red-400 mb-2">HashiCorp Vault</h4>
                <p className="text-gray-300 text-sm">Secrets management</p>
              </div>
            </div>
            <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
              <p className="text-green-300 font-semibold">✅ Most Used: Kubernetes + Ansible + AWS</p>
            </div>
          </div>

          {/* Monitor Tools */}
          <div className="mb-12">
            <h2 id="monitor-tools" className="text-3xl font-bold text-white mb-6">8. Monitor</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Goal</h3>
                  <p className="text-gray-300">Track application performance, system health, and logs.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Why</h3>
                  <p className="text-gray-300">Early detection of issues, user feedback loop.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-rose-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Prometheus</h4>
                <p className="text-gray-300 text-sm">Metrics collection and monitoring</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Grafana</h4>
                <p className="text-gray-300 text-sm">Visualization of metrics and dashboards</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">ELK Stack</h4>
                <p className="text-gray-300 text-sm">Centralized log management (Elasticsearch, Logstash, Kibana)</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <h4 className="font-bold text-white mb-2">Splunk</h4>
                <p className="text-gray-300 text-sm">Enterprise-grade log monitoring</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors">
                <h4 className="font-bold text-red-400 mb-2">Datadog / New Relic</h4>
                <p className="text-gray-300 text-sm">Cloud-based monitoring and APM</p>
              </div>
            </div>
            <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
              <p className="text-green-300 font-semibold">✅ Most Used: Prometheus + Grafana, ELK Stack</p>
            </div>
          </div>

          {/* Summary Table */}
          <h2 id="summary-table" className="text-3xl font-bold text-white mb-6">📌 Summary Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Stage</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Tools (Common)</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Most Used</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Plan</td>
                  <td className="px-6 py-4 text-sm text-gray-400">Jira, Trello, Asana, Confluence</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Jira</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Code</td>
                  <td className="px-6 py-4 text-sm text-gray-400">Git, GitHub, GitLab, Bitbucket</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Git + GitHub</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Build</td>
                  <td className="px-6 py-4 text-sm text-gray-400">Maven, Gradle, npm, Jenkins, Docker</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Jenkins + Docker</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Test</td>
                  <td className="px-6 py-4 text-sm text-gray-400">JUnit, Selenium, PyTest, SonarQube, Postman</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Selenium, JUnit, SonarQube</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Release</td>
                  <td className="px-6 py-4 text-sm text-gray-400">Jenkins, GitLab CI/CD, CircleCI, Azure DevOps</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Jenkins, GitLab CI/CD</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Deploy</td>
                  <td className="px-6 py-4 text-sm text-gray-400">Kubernetes, Docker Swarm, Ansible, Terraform, ArgoCD</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Kubernetes + Terraform</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Operate</td>
                  <td className="px-6 py-4 text-sm text-gray-400">Kubernetes, Docker, Ansible, AWS/Azure/GCP</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Kubernetes + AWS</td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Monitor</td>
                  <td className="px-6 py-4 text-sm text-gray-400">Prometheus, Grafana, ELK Stack, Splunk, Datadog</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Prometheus + Grafana</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

