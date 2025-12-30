import DocsLayout from '@/components/docs-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function LinuxPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Introduction to Linux' },
    { id: 'file-system', title: 'Linux File System Structure' },
    { id: 'navigation', title: 'Basic Navigation Commands' },
    { id: 'file-management', title: 'File & Directory Management' },
    { id: 'viewing-editing', title: 'Viewing & Editing Files' },
    { id: 'permissions', title: 'User & Permission Management' },
    { id: 'process-management', title: 'Process & System Management' },
    { id: 'networking', title: 'Networking Basics' },
    { id: 'package-management', title: 'Package Management' },
    { id: 'shell-scripting', title: 'Shell Scripting Basics' },
    { id: 'logs-monitoring', title: 'Logs & Monitoring' },
    { id: 'shortcuts', title: 'Essential Linux Shortcuts' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'summary', title: 'Summary' },
  ];

  const linuxVideos = getVideosForTopic('linux-basics');

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          🐧 Linux Basics for DevOps
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-600 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Goal</h2>
            <p className="text-gray-300 text-lg">Go from zero to intermediate with the Linux command line – the backbone of servers, cloud systems, and automation.</p>
          </div>

          <h2 id="introduction" className="text-3xl font-bold text-white mb-6">1. Introduction to Linux</h2>
          
          <div className="space-y-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">What is Linux?</h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  Open-source operating system kernel (created by Linus Torvalds in 1991)
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  Forms the core of most server operating systems (Ubuntu, CentOS, RedHat, Debian)
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  Used in cloud, containers (Docker/Kubernetes), DevOps automation
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Why DevOps Engineers Need Linux?</h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  Most production servers run on Linux
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  Automation tools (Ansible, Terraform, Jenkins) run commands on Linux hosts
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  Containers (Docker/K8s) use Linux kernel features
                </li>
      </ul>
            </div>
          </div>

          <h2 id="file-system" className="text-3xl font-bold text-white mb-6">2. Linux File System Structure</h2>
          <p className="text-gray-300 text-lg mb-6">Linux has a tree-like structure starting from / (root).</p>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Key directories:</h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/</code>
                  <span className="text-gray-300">Root directory (everything starts here)</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/home</code>
                  <span className="text-gray-300">User home directories</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/etc</code>
                  <span className="text-gray-300">Configuration files</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/bin</code>
                  <span className="text-gray-300">Essential commands (ls, cp, mv, etc.)</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/var</code>
                  <span className="text-gray-300">Logs and variable data</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/tmp</code>
                  <span className="text-gray-300">Temporary files</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/usr</code>
                  <span className="text-gray-300">User binaries, libraries</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-8">
            <p className="text-yellow-300 font-semibold">📌 Command to check file system:</p>
            <code className="text-gray-300 text-lg">ls /</code>
          </div>

          <h2 id="navigation" className="text-3xl font-bold text-white mb-6">3. Basic Navigation Commands</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">pwd</code>
              <p className="text-gray-300 text-sm mt-2">Print working directory (where you are)</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">ls</code>
              <p className="text-gray-300 text-sm mt-2">List files</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">ls -l</code>
              <p className="text-gray-300 text-sm mt-2">Detailed list</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">ls -a</code>
              <p className="text-gray-300 text-sm mt-2">Show hidden files</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">cd directory</code>
              <p className="text-gray-300 text-sm mt-2">Change directory</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">cd ..</code>
              <p className="text-gray-300 text-sm mt-2">Move one level up</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">cd ~</code>
              <p className="text-gray-300 text-sm mt-2">Go to home directory</p>
            </div>
          </div>

          <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-8">
            <p className="text-yellow-300 font-semibold">📌 Practice: Navigate from /home → / → /etc → back to /home</p>
          </div>

          <h2 id="file-management" className="text-3xl font-bold text-white mb-6">4. File & Directory Management</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">touch file.txt</code>
              <p className="text-gray-300 text-sm mt-2">Create empty file</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">mkdir folder</code>
              <p className="text-gray-300 text-sm mt-2">Create directory</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">rm file.txt</code>
              <p className="text-gray-300 text-sm mt-2">Delete file</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">rm -r folder</code>
              <p className="text-gray-300 text-sm mt-2">Delete directory (recursively)</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">cp file1 file2</code>
              <p className="text-gray-300 text-sm mt-2">Copy file</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">mv file1 newfile</code>
              <p className="text-gray-300 text-sm mt-2">Move/rename file</p>
            </div>
          </div>

          <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-8">
            <p className="text-yellow-300 font-semibold">📌 Practice: Create a folder devops, add files inside it, copy/move them</p>
          </div>

          <h2 id="viewing-editing" className="text-3xl font-bold text-white mb-6">5. Viewing & Editing Files</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">cat file.txt</code>
              <p className="text-gray-300 text-sm mt-2">View file content</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">more file.txt</code>
              <p className="text-gray-300 text-sm mt-2">View large files (scroll)</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">less file.txt</code>
              <p className="text-gray-300 text-sm mt-2">View large files (scroll)</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">head -n 5 file.txt</code>
              <p className="text-gray-300 text-sm mt-2">Show first 5 lines</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">tail -n 5 file.txt</code>
              <p className="text-gray-300 text-sm mt-2">Show last 5 lines</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">nano file.txt</code>
              <p className="text-gray-300 text-sm mt-2">Edit file in nano editor</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">vim file.txt</code>
              <p className="text-gray-300 text-sm mt-2">Edit file in vim editor</p>
            </div>
          </div>

          <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-8">
            <p className="text-yellow-300 font-semibold">📌 Practice: Create a file with nano and write some notes</p>
          </div>

          <h2 id="permissions" className="text-3xl font-bold text-white mb-6">6. User & Permission Management</h2>
          <div className="space-y-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">User Commands</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">whoami</code>
                  <span className="text-gray-300">Show current user</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">id</code>
                  <span className="text-gray-300">Show user details</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">adduser newuser</code>
                  <span className="text-gray-300">Add new user</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">passwd user</code>
                  <span className="text-gray-300">Change password</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">File Permissions</h3>
              <p className="text-gray-300 mb-4">Each file has 3 types of permissions:</p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>Read (r), Write (w), Execute (x)</li>
                <li>For owner, group, others</li>
      </ul>
              <div className="space-y-2">
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">ls -l</code>
                  <span className="text-gray-300">Check permissions</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">chmod 755 script.sh</code>
                  <span className="text-gray-300">Change permissions</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">chown user:group file.txt</code>
                  <span className="text-gray-300">Change ownership</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-8">
            <p className="text-yellow-300 font-semibold">📌 Practice: Create a script file and set it executable</p>
          </div>

          <h2 id="process-management" className="text-3xl font-bold text-white mb-6">7. Process & System Management</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">ps</code>
              <p className="text-gray-300 text-sm mt-2">Show running processes</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">top / htop</code>
              <p className="text-gray-300 text-sm mt-2">Live process view</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">kill PID</code>
              <p className="text-gray-300 text-sm mt-2">Kill a process</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">df -h</code>
              <p className="text-gray-300 text-sm mt-2">Show disk usage</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">du -sh folder</code>
              <p className="text-gray-300 text-sm mt-2">Show folder size</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">free -m</code>
              <p className="text-gray-300 text-sm mt-2">Show memory usage</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">uptime</code>
              <p className="text-gray-300 text-sm mt-2">Show system uptime</p>
            </div>
          </div>

          <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-8">
            <p className="text-yellow-300 font-semibold">📌 Practice: Open two terminals, run a process in one, kill it from another</p>
          </div>

          <h2 id="networking" className="text-3xl font-bold text-white mb-6">8. Networking Basics</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">ifconfig / ip a</code>
              <p className="text-gray-300 text-sm mt-2">Show network interfaces</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">ping google.com</code>
              <p className="text-gray-300 text-sm mt-2">Test connectivity</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">curl http://example.com</code>
              <p className="text-gray-300 text-sm mt-2">Get web response</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">wget URL</code>
              <p className="text-gray-300 text-sm mt-2">Download file</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">netstat -tulnp</code>
              <p className="text-gray-300 text-sm mt-2">Show listening ports</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">ssh user@host</code>
              <p className="text-gray-300 text-sm mt-2">Remote login</p>
            </div>
          </div>

          <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-8">
            <p className="text-yellow-300 font-semibold">📌 Practice: Ping a website, then SSH into another Linux machine (if available)</p>
          </div>

          <h2 id="package-management" className="text-3xl font-bold text-white mb-6">9. Package Management</h2>
          <div className="space-y-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Debian/Ubuntu (apt)</h3>
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">sudo apt update && sudo apt upgrade</code>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">sudo apt install nginx</code>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">sudo apt remove nginx</code>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">RedHat/CentOS (yum/dnf)</h3>
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">sudo yum install nginx</code>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">sudo yum remove nginx</code>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-8">
            <p className="text-yellow-300 font-semibold">📌 Practice: Install & remove a package (like tree)</p>
          </div>

          <h2 id="shell-scripting" className="text-3xl font-bold text-white mb-6">10. Shell Scripting Basics</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <p className="text-gray-300 mb-4">Shell scripts automate tasks. Example:</p>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`#!/bin/bash
echo "Hello DevOps Engineer!"
DATE=$(date)
echo "Today is $DATE"`}
              </pre>
            </div>
            <p className="text-gray-300 mt-4 mb-4">Run it:</p>
            <div className="space-y-2">
              <div className="bg-gray-700 p-3 rounded">
                <code className="text-green-400">chmod +x script.sh</code>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <code className="text-green-400">./script.sh</code>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-8">
            <p className="text-yellow-300 font-semibold">📌 Practice: Write a script that backs up files from /home/user/docs to /backup</p>
          </div>

          <h2 id="logs-monitoring" className="text-3xl font-bold text-white mb-6">11. Logs & Monitoring</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <p className="text-gray-300 mb-4">System logs are stored in /var/log.</p>
            <div className="space-y-3">
              <div className="flex items-center">
                <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">tail -f /var/log/syslog</code>
                <span className="text-gray-300">Check logs</span>
              </div>
            </div>
            <p className="text-gray-300 mt-4">Useful for debugging servers (e.g., Nginx, Apache, Docker).</p>
          </div>

          <h2 id="shortcuts" className="text-3xl font-bold text-white mb-6">12. Essential Linux Shortcuts</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">Ctrl + C</code>
              <p className="text-gray-300 text-sm mt-2">Kill process</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">Ctrl + Z</code>
              <p className="text-gray-300 text-sm mt-2">Suspend process</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">Ctrl + R</code>
              <p className="text-gray-300 text-sm mt-2">Search command history</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">!!</code>
              <p className="text-gray-300 text-sm mt-2">Run last command again</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <code className="text-green-400 font-mono">!abc</code>
              <p className="text-gray-300 text-sm mt-2">Run last command starting with abc</p>
            </div>
          </div>

          <VideoSection videos={linuxVideos} title="Linux Basics Video Tutorials" />

          <h2 id="summary" className="text-3xl font-bold text-white mb-6">✅ Summary</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <p className="text-gray-300 text-lg mb-4">By mastering these topics, you'll move from zero → intermediate in Linux:</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Filesystem & navigation</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">File management</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Permissions</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Processes</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Networking</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Packages</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Shell scripting</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Logs</span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-rose-900 border border-blue-700 rounded-lg">
              <p className="text-white font-semibold">Linux is the core skill for DevOps — everything (Docker, Kubernetes, CI/CD, Cloud) builds on it.</p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

