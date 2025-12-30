import CodeExecutionTerminal from '@/components/code-execution-terminal';
import TechLayout from '@/components/tech-layout';

export default function CodeTerminalPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Code Execution Terminal' },
    { id: 'features', title: 'Features' },
    { id: 'learning-tips', title: 'Learning Tips' }
  ];

  return (
    <TechLayout onThisPage={pageHeadings} technology="code-terminal">
      <main>
      <section id="introduction" className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          💻 Code Execution Terminal
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Write, edit, and execute code online for multiple programming languages
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div id="features" className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Online Code Execution</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Supported Languages</h3>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🐍</div>
                  <h4 className="text-white font-semibold">Python</h4>
                  <p className="text-gray-400 text-sm">Write and run Python scripts with print statements and functions</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🟨</div>
                  <h4 className="text-white font-semibold">JavaScript</h4>
                  <p className="text-gray-400 text-sm">Execute JavaScript code with console.log and modern ES6+ features</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl mb-2">☕</div>
                  <h4 className="text-white font-semibold">Java</h4>
                  <p className="text-gray-400 text-sm">Compile and run Java programs with full class structure</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🗄️</div>
                  <h4 className="text-white font-semibold">SQL</h4>
                  <p className="text-gray-400 text-sm">Execute SQL queries with table creation and data manipulation</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🐧</div>
                  <h4 className="text-white font-semibold">Bash/Linux</h4>
                  <p className="text-gray-400 text-sm">Run shell scripts and Linux commands with system interactions</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Features</h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="text-green-400 text-xl">✅</div>
                    <div>
                      <h4 className="text-white font-semibold">Live Code Execution</h4>
                      <p className="text-gray-400 text-sm">Write code and see results instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-green-400 text-xl">✅</div>
                    <div>
                      <h4 className="text-white font-semibold">Multiple Languages</h4>
                      <p className="text-gray-400 text-sm">Switch between Python, JavaScript, Java, SQL, and Bash</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-green-400 text-xl">✅</div>
                    <div>
                      <h4 className="text-white font-semibold">Code Templates</h4>
                      <p className="text-gray-400 text-sm">Start with example code for each language</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="text-green-400 text-xl">✅</div>
                    <div>
                      <h4 className="text-white font-semibold">Execution History</h4>
                      <p className="text-gray-400 text-sm">Keep track of all your code executions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-green-400 text-xl">✅</div>
                    <div>
                      <h4 className="text-white font-semibold">Safe Environment</h4>
                      <p className="text-gray-400 text-sm">Execute code without affecting your system</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-green-400 text-xl">✅</div>
                    <div>
                      <h4 className="text-white font-semibold">Syntax Highlighting</h4>
                      <p className="text-gray-400 text-sm">Professional code editor experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Execution Terminal */}
        <div className="mb-8">
          <CodeExecutionTerminal className="w-full" />
        </div>

        {/* Learning Tips */}
        <div id="learning-tips" className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Learning Tips</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">🚀 Getting Started</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Select a programming language from the tabs above</li>
                <li>• Click "Load Example" to see sample code</li>
                <li>• Modify the code or write your own</li>
                <li>• Click "Run Code" to execute and see output</li>
                <li>• Use "Clear" to start fresh</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">💡 Best Practices</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Start with simple examples and build complexity</li>
                <li>• Experiment with different language features</li>
                <li>• Use the execution history to track progress</li>
                <li>• Try solving coding challenges</li>
                <li>• Practice debugging with error messages</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-rose-900/20 border border-rose-500/30 rounded-lg">
            <h4 className="text-white font-semibold mb-2">💻 Try These Examples:</h4>
            <div className="space-y-4 text-sm">
              <div>
                <strong className="text-white">Python:</strong>
                <div className="text-gray-300">print("Hello World")</div>
              </div>
              <div>
                <strong className="text-white">JavaScript:</strong>
                <div className="text-gray-300">console.log("Hello World")</div>
              </div>
              <div>
                <strong className="text-white">Java:</strong>
                <div className="text-gray-300">System.out.println("Hello World")</div>
              </div>
              <div>
                <strong className="text-white">SQL:</strong>
                <div className="text-gray-300">SELECT 'Hello World'</div>
              </div>
              <div>
                <strong className="text-white">Bash:</strong>
                <div className="text-gray-300">echo "Hello World"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
    </TechLayout>
  );
}
