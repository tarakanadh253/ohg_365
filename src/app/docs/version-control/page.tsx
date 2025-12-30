import DocsLayout from '@/components/docs-layout';

export default function VersionControlPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'What is Version Control?' },
    { id: 'what-is-git', title: 'What is Git?' },
    { id: 'why-git-devops', title: 'Why Git in DevOps?' },
    { id: 'git-architecture', title: 'Git Architecture' },
    { id: 'git-workflow', title: 'Git Basic Workflow' },
    { id: 'git-commands', title: 'Important Git Commands' },
    { id: 'branching-merging', title: 'Branching & Merging' },
    { id: 'remote-repositories', title: 'Remote Repositories' },
    { id: 'collaboration', title: 'Collaboration & Pull Requests' },
    { id: 'git-hooks', title: 'Git Hooks' },
    { id: 'git-devops', title: 'Git in DevOps' },
    { id: 'advanced-concepts', title: 'Advanced Concepts' },
    { id: 'practice-exercises', title: 'Practice Exercises' },
    { id: 'summary', title: 'Summary' },
  ];

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          📚 Git (Version Control)
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-600 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Goal</h2>
            <p className="text-gray-300 text-lg">Master Git for version control and collaborative development in DevOps.</p>
          </div>

          <h2 id="introduction" className="text-3xl font-bold text-white mb-6">1. What is Version Control?</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Problem without version control:</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-700 border border-gray-500 p-4 rounded">
                <p className="text-white font-semibold">❌ Code scattered across folders</p>
              </div>
              <div className="bg-gray-700 border border-gray-500 p-4 rounded">
                <p className="text-white font-semibold">❌ No history of changes</p>
              </div>
              <div className="bg-gray-700 border border-gray-500 p-4 rounded">
                <p className="text-white font-semibold">❌ Team collaboration chaos</p>
              </div>
              <div className="bg-gray-700 border border-gray-500 p-4 rounded">
                <p className="text-white font-semibold">❌ Can't rollback mistakes</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-green-400 mb-4">Version Control solves this:</h3>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Tracks all changes to files over time
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Enables multiple developers to work together
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Allows reverting to previous versions
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Maintains a complete history of who changed what and when
              </li>
            </ul>
            
            <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg">
              <p className="text-yellow-300 font-semibold">📌 Think of version control as a time machine for your code</p>
            </div>
          </div>

          <h2 id="what-is-git" className="text-3xl font-bold text-white mb-6">2. What is Git?</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Distributed version control system created by Linus Torvalds (2005)
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Most popular version control system in the world
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Every developer has a complete copy of the repository
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Works offline - no internet required for most operations
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Extremely fast and efficient
              </li>
            </ul>
          </div>

          <h2 id="why-git-devops" className="text-3xl font-bold text-white mb-6">3. Why Git in DevOps?</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Infrastructure as Code</h4>
              <p className="text-gray-300 text-sm">Version control for Terraform, Ansible, etc.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">CI/CD Integration</h4>
              <p className="text-gray-300 text-sm">Automated builds triggered by commits</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Code Review</h4>
              <p className="text-gray-300 text-sm">Pull requests for quality assurance</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Deployment Tracking</h4>
              <p className="text-gray-300 text-sm">Know exactly what's deployed where</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Rollback Capability</h4>
              <p className="text-gray-300 text-sm">Quickly revert problematic deployments</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Collaboration</h4>
              <p className="text-gray-300 text-sm">Multiple teams working on same codebase</p>
            </div>
          </div>

          <h2 id="git-architecture" className="text-3xl font-bold text-white mb-6">4. Git Architecture</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-white mb-2">Working Directory</h4>
                <p className="text-gray-300 text-sm">Files you're currently editing</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Staging Area (Index)</h4>
                <p className="text-gray-300 text-sm">Files ready to be committed</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Repository (.git)</h4>
                <p className="text-gray-300 text-sm">Complete history and metadata</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-yellow-400 mb-2">Branches</h4>
                <p className="text-gray-300 text-sm">Parallel lines of development</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-white mb-2">Commits</h4>
                <p className="text-gray-300 text-sm">Snapshots of your code</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-indigo-400 mb-2">Remote</h4>
                <p className="text-gray-300 text-sm">Shared repository (GitHub, GitLab)</p>
              </div>
            </div>
          </div>

          <h2 id="git-workflow" className="text-3xl font-bold text-white mb-6">5. Git Basic Workflow</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">1</div>
                <span className="text-gray-300">Edit files in working directory</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">2</div>
                <code className="text-green-400 font-mono">git add</code>
                <span className="text-gray-300 ml-3">Stage changes</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">3</div>
                <code className="text-green-400 font-mono">git commit</code>
                <span className="text-gray-300 ml-3">Save snapshot</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">4</div>
                <code className="text-green-400 font-mono">git push</code>
                <span className="text-gray-300 ml-3">Share with team</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">5</div>
                <code className="text-green-400 font-mono">git pull</code>
                <span className="text-gray-300 ml-3">Get latest changes</span>
              </div>
            </div>
          </div>

          <h2 id="git-commands" className="text-3xl font-bold text-white mb-6">6. Important Git Commands</h2>
          <div className="space-y-8 mb-8">
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-xl font-bold text-purple-400 mb-4">🔹 Repository Setup</h3>
                <div className="space-y-2">
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git init</code>
                    <span className="text-gray-300 ml-3"># Initialize new repository</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git clone https://github.com/user/repo.git</code>
                    <span className="text-gray-300 ml-3"># Clone existing repository</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git config --global user.name "Your Name"</code>
                    <span className="text-gray-300 ml-3"># Set your name</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git config --global user.email "your@email.com"</code>
                    <span className="text-gray-300 ml-3"># Set your email</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-xl font-bold text-purple-400 mb-4">🔹 Basic Workflow</h3>
                <div className="space-y-2">
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git status</code>
                    <span className="text-gray-300 ml-3"># Check repository status</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git add .</code>
                    <span className="text-gray-300 ml-3"># Stage all changes</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git add filename</code>
                    <span className="text-gray-300 ml-3"># Stage specific file</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git commit -m "Add new feature"</code>
                    <span className="text-gray-300 ml-3"># Commit with message</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-xl font-bold text-purple-400 mb-4">🔹 Remote Operations</h3>
                <div className="space-y-2">
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git remote -v</code>
                    <span className="text-gray-300 ml-3"># List remotes</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git push origin main</code>
                    <span className="text-gray-300 ml-3"># Push to remote</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git pull origin main</code>
                    <span className="text-gray-300 ml-3"># Pull latest changes</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git fetch</code>
                    <span className="text-gray-300 ml-3"># Download without merging</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-xl font-bold text-purple-400 mb-4">🔹 History & Inspection</h3>
                <div className="space-y-2">
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git log</code>
                    <span className="text-gray-300 ml-3"># View commit history</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git log --oneline</code>
                    <span className="text-gray-300 ml-3"># Compact history</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git show commit_hash</code>
                    <span className="text-gray-300 ml-3"># Show specific commit</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git diff</code>
                    <span className="text-gray-300 ml-3"># Show unstaged changes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 id="branching-merging" className="text-3xl font-bold text-white mb-6">7. Branching & Merging</h2>
          <div className="space-y-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Branching</h3>
              <div className="space-y-2 mb-4">
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">git branch</code>
                  <span className="text-gray-300 ml-3"># List branches</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">git branch feature-branch</code>
                  <span className="text-gray-300 ml-3"># Create new branch</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">git checkout feature-branch</code>
                  <span className="text-gray-300 ml-3"># Switch to branch</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">git checkout -b feature-branch</code>
                  <span className="text-gray-300 ml-3"># Create and switch</span>
                </div>
              </div>
              <p className="text-gray-300">Branches allow parallel development without conflicts</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Merging</h3>
              <div className="space-y-2 mb-4">
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">git checkout main</code>
                  <span className="text-gray-300 ml-3"># Switch to main branch</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">git merge feature-branch</code>
                  <span className="text-gray-300 ml-3"># Merge feature into main</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">git branch -d feature-branch</code>
                  <span className="text-gray-300 ml-3"># Delete merged branch</span>
                </div>
              </div>
              <p className="text-gray-300">Merging combines changes from different branches</p>
            </div>
          </div>

          <h2 id="remote-repositories" className="text-3xl font-bold text-white mb-6">8. Remote Repositories</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Popular Git Hosting</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    GitHub - Most popular, great for open source
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    GitLab - Built-in CI/CD, self-hosted options
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    Bitbucket - Good for enterprise, Jira integration
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    Azure DevOps - Microsoft ecosystem integration
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Remote Commands</h3>
                <div className="space-y-2">
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git remote add origin URL</code>
                    <span className="text-gray-300 ml-3"># Add remote</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git remote remove origin</code>
                    <span className="text-gray-300 ml-3"># Remove remote</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <code className="text-green-400">git push -u origin main</code>
                    <span className="text-gray-300 ml-3"># Set upstream</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 id="collaboration" className="text-3xl font-bold text-white mb-6">9. Collaboration & Pull Requests</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Pull Request Workflow</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">1</div>
                <span className="text-gray-300">Create feature branch from main</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">2</div>
                <span className="text-gray-300">Make changes and commit</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">3</div>
                <span className="text-gray-300">Push branch to remote</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">4</div>
                <span className="text-gray-300">Create Pull Request</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">5</div>
                <span className="text-gray-300">Code review and discussion</span>
              </div>
              <div className="flex items-center">
                <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">6</div>
                <span className="text-gray-300">Merge after approval</span>
              </div>
            </div>
            
            <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mt-6">
              <p className="text-yellow-300 font-semibold">📌 Pull Requests enable code review, automated testing, and controlled integration</p>
            </div>
          </div>

          <h2 id="git-hooks" className="text-3xl font-bold text-white mb-6">10. Git Hooks</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <p className="text-gray-300 mb-4">Git hooks are scripts that run automatically at certain points in the Git workflow.</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Client-side Hooks</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    pre-commit: Run tests before commit
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    commit-msg: Validate commit message format
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    pre-push: Run full test suite before push
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Server-side Hooks</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    pre-receive: Validate pushes to repository
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    post-receive: Trigger deployments
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    update: Control branch updates
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 id="git-devops" className="text-3xl font-bold text-white mb-6">11. Git in DevOps</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Infrastructure as Code</h4>
              <p className="text-gray-300">Version control Terraform, Ansible, CloudFormation</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">CI/CD Pipelines</h4>
              <p className="text-gray-300">Jenkins, GitHub Actions, GitLab CI triggered by commits</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">GitOps</h4>
              <p className="text-gray-300">Git as single source of truth for deployments</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Environment Promotion</h4>
              <p className="text-gray-300">Deploy same code across dev → staging → prod</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Configuration Management</h4>
              <p className="text-gray-300">Version control application configs</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Release Management</h4>
              <p className="text-gray-300">Git tags for versioning and releases</p>
            </div>
          </div>

          <h2 id="advanced-concepts" className="text-3xl font-bold text-white mb-6">12. Advanced Concepts</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Rebasing</h4>
              <p className="text-gray-300 text-sm">Cleaner history by replaying commits</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Cherry-picking</h4>
              <p className="text-gray-300 text-sm">Apply specific commits to other branches</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Stashing</h4>
              <p className="text-gray-300 text-sm">Temporarily save uncommitted changes</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Submodules</h4>
              <p className="text-gray-300 text-sm">Include other repositories as dependencies</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">Git Flow</h4>
              <p className="text-gray-300 text-sm">Branching strategy for releases</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-purple-400 mb-2">GitHub Flow</h4>
              <p className="text-gray-300 text-sm">Simpler branching for continuous deployment</p>
            </div>
          </div>

          <h2 id="practice-exercises" className="text-3xl font-bold text-white mb-6">13. Practice Exercises</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Create a new repository and make your first commit
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Create a feature branch, make changes, and merge back to main
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Practice resolving merge conflicts
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Set up a GitHub repository and push your code
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Create a Pull Request and practice code review
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Use git tags to mark a release version
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Practice reverting commits and resetting branches
              </li>
            </ul>
          </div>

          <h2 id="summary" className="text-3xl font-bold text-white mb-6">✅ Summary</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Git → Distributed version control system for tracking code changes
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Core Concepts → Commits, Branches, Merging, Remote repositories
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Key Skills → Branching strategies, Pull Requests, Git hooks
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                In DevOps → Infrastructure as Code, CI/CD, GitOps, Release management
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
