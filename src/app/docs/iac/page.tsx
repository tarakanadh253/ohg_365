import DocsLayout from '@/components/docs-layout';

export default function IacPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Introduction to IaC' },
    { id: 'terraform-basics', title: 'Terraform Basics' },
    { id: 'ansible-basics', title: 'Ansible Basics' },
    { id: 'hcl-syntax', title: 'HCL Syntax' },
    { id: 'cloud-resources', title: 'Cloud Resources' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'summary', title: 'Summary' },
  ];

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          🏗️ Infrastructure as Code (IaC)
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-600 p-8 rounded-xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Goal</h2>
            <p className="text-white text-xl">Manage infrastructure through code for consistency, repeatability, and version control.</p>
          </div>

          <h2 id="terraform-basics" className="text-3xl font-bold text-white mb-6">1. Terraform</h2>
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-600 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">HashiCorp Terraform</h3>
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                Declarative infrastructure provisioning
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                Multi-cloud support (AWS, Azure, GCP)
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                State management and planning
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                HCL (HashiCorp Configuration Language)
              </li>
            </ul>
          </div>

          <h2 id="ansible-basics" className="text-3xl font-bold text-white mb-6">2. Ansible</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <h3 className="text-2xl font-bold text-red-400 mb-6 neon-glow">Configuration Management</h3>
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Agentless automation
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                YAML-based playbooks
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Configuration management and orchestration
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Idempotent operations
              </li>
            </ul>
          </div>

          <h2 id="summary" className="text-3xl font-bold text-white mb-6">✅ Summary</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                IaC enables infrastructure management through code
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Terraform for infrastructure provisioning
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Ansible for configuration management
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Version control and collaboration on infrastructure
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}