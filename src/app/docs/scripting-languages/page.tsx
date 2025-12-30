import DocsLayout from '@/components/docs-layout';

export default function ScriptingPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Introduction to Scripting' },
    { id: 'python-basics', title: 'Python Basics' },
    { id: 'bash-scripting', title: 'Bash Scripting' },
    { id: 'automation', title: 'Automation Scripts' },
    { id: 'file-handling', title: 'File Handling' },
    { id: 'process-management', title: 'Process Management' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'summary', title: 'Summary' },
  ];

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          🐍 Scripting Languages for DevOps
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-600 p-8 rounded-xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Goal</h2>
            <p className="text-white text-xl">Master scripting languages to automate DevOps tasks and processes.</p>
          </div>

          <h2 id="python-basics" className="text-3xl font-bold text-white mb-6">1. Python for DevOps</h2>
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-600 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Why Python?</h3>
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Simple syntax and easy to learn
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Extensive libraries for automation
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Great for API integrations and cloud automation
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Used by major DevOps tools (Ansible, SaltStack)
              </li>
            </ul>
          </div>

          <h2 id="bash-scripting" className="text-3xl font-bold text-white mb-6">2. Bash Scripting</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 neon-glow">Essential for Linux Automation</h3>
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                System administration tasks
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                File operations and text processing
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                Process monitoring and management
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                CI/CD pipeline scripts
              </li>
            </ul>
          </div>

          <h2 id="automation" className="text-3xl font-bold text-white mb-6">3. Automation Scripts</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <h3 className="text-2xl font-bold text-purple-400 mb-6 neon-glow">Common Automation Tasks</h3>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 p-6 rounded-xl hover-glow-secondary">
                <h4 className="text-purple-400 font-bold text-lg mb-3">Deployment Scripts</h4>
                <p className="text-white">Automate application deployments and rollbacks</p>
              </div>
              <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/30 p-6 rounded-xl hover-glow-accent">
                <h4 className="text-green-400 font-bold text-lg mb-3">Monitoring Scripts</h4>
                <p className="text-white">Health checks and system monitoring</p>
              </div>
              <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/30 p-6 rounded-xl hover-glow-warning">
                <h4 className="text-orange-400 font-bold text-lg mb-3">Backup Scripts</h4>
                <p className="text-white">Automated backups and data management</p>
              </div>
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-rose-500/30 p-6 rounded-xl hover-glow-primary">
                <h4 className="text-white font-bold text-lg mb-3">Configuration Scripts</h4>
                <p className="text-white">Environment setup and configuration</p>
              </div>
            </div>
          </div>

          <h2 id="summary" className="text-3xl font-bold text-white mb-6">✅ Summary</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Python and Bash are essential scripting languages for DevOps
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Use Python for complex automation and API integrations
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Use Bash for system administration and simple automation
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Scripting enables automation of repetitive DevOps tasks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}