'use client';

import MultiTerminal from '@/components/multi-terminal';
import CodeEditor from '@/components/code-editor';

export default function TerminalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-500/30">
              <span className="text-green-400 font-semibold">🚀 Interactive Learning Terminal</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 animate-fade-in-up">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-gradient">
                Code Terminal
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-semibold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Practice Real Commands in a Safe Environment
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Master Linux, Python, Java, and SQL commands with our interactive terminal simulator. 
              Switch between technologies, run real commands, and learn without breaking anything.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-sm border border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-2">
              <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">🐧</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-500 transition-all duration-300">
                Linux/DevOps
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Docker, Git, Systemctl, and more Linux commands
              </p>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2" style={{ transitionDelay: '0.1s' }}>
              <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">🐍</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-500 transition-all duration-300">
                Python
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Python scripts, pip packages, and virtual environments
              </p>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-sm border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-2" style={{ transitionDelay: '0.2s' }}>
              <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">☕</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-300">
                Java & SQL
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Java compilation, Maven, Gradle, and database commands
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Section */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pb-16">
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm rounded-3xl border border-gray-600/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-6 border-b border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-white font-bold text-lg">OneHubGlobal Terminal</span>
              </div>
              <div className="flex items-center space-x-3 text-green-400 text-base">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Terminal</span>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="mb-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="text-blue-400 text-lg">💡</div>
                <div>
                  <h4 className="text-blue-300 font-semibold mb-2">How to Use the Terminal:</h4>
                  <ul className="text-sm text-blue-200 space-y-1">
                    <li>• Type commands and press <strong>Enter</strong> or click <strong>Run</strong> to execute</li>
                    <li>• Use <code className="bg-gray-700 text-green-400 px-1 rounded">help</code> to see available commands</li>
                    <li>• Try <code className="bg-gray-700 text-green-400 px-1 rounded">python -c "print('Hello World')"</code> for Python execution</li>
                    <li>• Try <code className="bg-gray-700 text-green-400 px-1 rounded">compile System.out.println("Hello World");</code> for Java execution</li>
                  </ul>
                </div>
              </div>
            </div>
            <MultiTerminal className="w-full" />
          </div>
        </div>
      </div>

      {/* Code Editor Section */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Live Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">Editor</span>
          </h2>
          <p className="text-gray-400 text-lg">Write and execute Python & Java code in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">🐍 Python Editor</h3>
            <CodeEditor 
              language="python" 
              onExecute={async (code) => {
                try {
                  const response = await fetch('/api/execute-code', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ language: 'python', code })
                  });
                  const result = await response.json();
                  console.log('Python execution result:', result);
                  // You could display this result in the terminal or a separate output area
                } catch (error) {
                  console.error('Python execution error:', error);
                }
              }}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">☕ Java Editor</h3>
            <CodeEditor 
              language="java" 
              onExecute={async (code) => {
                try {
                  const response = await fetch('/api/execute-code', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ language: 'java', code })
                  });
                  const result = await response.json();
                  console.log('Java execution result:', result);
                  // You could display this result in the terminal or a separate output area
                } catch (error) {
                  console.error('Java execution error:', error);
                }
              }}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">How to Use the Code Editor</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Write your Python or Java code in the editor above</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Click "Run Code" to execute your code in real-time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Use "Reset" to restore the default example code</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Or use terminal commands like <code className="bg-gray-700 text-green-400 px-1 rounded">python -c "print('Hello')"</code> or <code className="bg-gray-700 text-green-400 px-1 rounded">run print('Hello')</code></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Command Reference Section */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Reference</span>
          </h2>
          <p className="text-gray-400 text-lg">Essential commands for each technology</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Linux/DevOps Commands */}
          <div className="group bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4 transform group-hover:scale-110 transition-transform duration-500">🐧</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Linux/DevOps</h3>
                <p className="text-gray-400">System administration and containerization</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-green-400 font-mono">docker ps</code>
                <span className="text-gray-300 text-sm">List containers</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-green-400 font-mono">git status</code>
                <span className="text-gray-300 text-sm">Git repository status</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-green-400 font-mono">systemctl status</code>
                <span className="text-gray-300 text-sm">Service status</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-green-400 font-mono">chmod +x file</code>
                <span className="text-gray-300 text-sm">Make executable</span>
              </div>
            </div>
          </div>

          {/* Python Commands */}
          <div className="group bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4 transform group-hover:scale-110 transition-transform duration-500">🐍</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Python</h3>
                <p className="text-gray-400">Scripting and package management</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-blue-400 font-mono">python --version</code>
                <span className="text-gray-300 text-sm">Check version</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-blue-400 font-mono">pip install pkg</code>
                <span className="text-gray-300 text-sm">Install package</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-blue-400 font-mono">pip list</code>
                <span className="text-gray-300 text-sm">List packages</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-blue-400 font-mono">python script.py</code>
                <span className="text-gray-300 text-sm">Run script</span>
              </div>
            </div>
          </div>

          {/* Java Commands */}
          <div className="group bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4 transform group-hover:scale-110 transition-transform duration-500">☕</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Java</h3>
                <p className="text-gray-400">Compilation and build tools</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-orange-400 font-mono">javac Main.java</code>
                <span className="text-gray-300 text-sm">Compile Java</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-orange-400 font-mono">java Main</code>
                <span className="text-gray-300 text-sm">Run class</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-orange-400 font-mono">mvn compile</code>
                <span className="text-gray-300 text-sm">Maven build</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-orange-400 font-mono">gradle build</code>
                <span className="text-gray-300 text-sm">Gradle build</span>
              </div>
            </div>
          </div>

          {/* SQL Commands */}
          <div className="group bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4 transform group-hover:scale-110 transition-transform duration-500">🗄️</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">SQL</h3>
                <p className="text-gray-400">Database operations</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-purple-400 font-mono">mysql -u user</code>
                <span className="text-gray-300 text-sm">Connect MySQL</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-purple-400 font-mono">psql -U user</code>
                <span className="text-gray-300 text-sm">Connect PostgreSQL</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-purple-400 font-mono">sqlite3 db.sqlite</code>
                <span className="text-gray-300 text-sm">Open SQLite</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <code className="text-purple-400 font-mono">show databases</code>
                <span className="text-gray-300 text-sm">List databases</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Tips Section */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Tips</span>
          </h2>
          <p className="text-gray-400 text-lg">Pro tips to master the terminal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-gradient-to-br from-yellow-500/10 to-orange-600/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/20 hover:-translate-y-2">
            <div className="text-5xl mb-6 text-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300">
              Getting Started
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Start with <code className="bg-gray-700 text-green-400 px-2 py-1 rounded text-sm">help</code> to see all commands
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Try <code className="bg-gray-700 text-green-400 px-2 py-1 rounded text-sm">ls</code> to explore directories
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Use <code className="bg-gray-700 text-green-400 px-2 py-1 rounded text-sm">pwd</code> to see your location
              </li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2" style={{ transitionDelay: '0.1s' }}>
            <div className="text-5xl mb-6 text-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">📁</div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
              File Operations
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Create files with <code className="bg-gray-700 text-blue-400 px-2 py-1 rounded text-sm">touch</code>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Make directories with <code className="bg-gray-700 text-blue-400 px-2 py-1 rounded text-sm">mkdir</code>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Read files with <code className="bg-gray-700 text-blue-400 px-2 py-1 rounded text-sm">cat</code>
              </li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-green-500/10 to-teal-600/10 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-2" style={{ transitionDelay: '0.2s' }}>
            <div className="text-5xl mb-6 text-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-teal-500 transition-all duration-300">
              System Monitoring
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Check system with <code className="bg-gray-700 text-green-400 px-2 py-1 rounded text-sm">uname -a</code>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Monitor processes with <code className="bg-gray-700 text-green-400 px-2 py-1 rounded text-sm">ps</code>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Check disk space with <code className="bg-gray-700 text-green-400 px-2 py-1 rounded text-sm">df -h</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

