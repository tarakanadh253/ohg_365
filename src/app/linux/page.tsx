'use client';

import { useState, useEffect } from 'react';
import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function LinuxPage() {
  const [activeSection, setActiveSection] = useState('introduction');

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

  // Handle URL hash changes to set active section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash && pageHeadings.some(heading => heading.id === hash)) {
        setActiveSection(hash);
      }
    };

    // Set initial section from URL hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🐧 Linux Basics for DevOps
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master the Linux command line - the foundation of modern DevOps
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/30 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">🎯 Our Linux Learning Goal</h2>
                  <p className="text-white text-xl mb-4">Go from zero to intermediate with the Linux command line – the backbone of servers, cloud systems, and automation.</p>
                  <div className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3">What You'll Achieve</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• <strong className="text-white">Command Line Mastery:</strong> Navigate and manage files efficiently</li>
                      <li>• <strong className="text-white">System Administration:</strong> Manage processes, users, and permissions</li>
                      <li>• <strong className="text-white">Automation Skills:</strong> Write shell scripts for task automation</li>
                      <li>• <strong className="text-white">DevOps Foundation:</strong> Build the skills needed for containerization and cloud</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📚 What is Linux? A Comprehensive Guide</h2>
                  
                  <div className="space-y-8">
                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                      <h3 className="text-2xl font-bold text-white mb-4">🔍 Linux Definition & History</h3>
                      <p className="text-lg text-gray-300 mb-4">
                        <strong className="text-white">Linux</strong> is an open-source operating system kernel created by Linus Torvalds in 1991. 
                        It forms the core of most server operating systems and is the foundation of modern cloud computing and DevOps practices.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-white mb-3">📈 Historical Context</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>1991:</strong> Linus Torvalds creates Linux kernel</li>
                            <li>• <strong>1992:</strong> First distributions (Debian, Slackware)</li>
                            <li>• <strong>2004:</strong> Ubuntu launches, making Linux user-friendly</li>
                            <li>• <strong>2010s:</strong> Linux dominates cloud and containers</li>
                          </ul>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-white mb-3">🎯 Key Characteristics</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>Open Source:</strong> Free to use and modify</li>
                            <li>• <strong>Multi-user:</strong> Multiple users can work simultaneously</li>
                            <li>• <strong>Multitasking:</strong> Run multiple processes at once</li>
                            <li>• <strong>Secure:</strong> Built-in security features and permissions</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl">
                      <h3 className="text-2xl font-bold text-white mb-4">💡 Why DevOps Engineers Need Linux</h3>
                      <p className="text-lg text-gray-300 mb-4">
                        Linux is the backbone of modern DevOps. Understanding Linux is crucial for success in cloud computing, 
                        containerization, and automation. Here's why it matters:
                      </p>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-green-400 mb-3">☁️ Cloud Computing</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• Most cloud servers run Linux</li>
                            <li>• AWS, Azure, GCP use Linux instances</li>
                            <li>• Container platforms built on Linux</li>
                            <li>• Microservices deployment</li>
                          </ul>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-blue-400 mb-3">🐳 Containerization</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• Docker runs on Linux kernel</li>
                            <li>• Kubernetes orchestrates Linux containers</li>
                            <li>• Container security and isolation</li>
                            <li>• Resource management and optimization</li>
                          </ul>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-purple-400 mb-3">⚙️ Automation Tools</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• Ansible manages Linux hosts</li>
                            <li>• Terraform provisions Linux infrastructure</li>
                            <li>• Jenkins runs on Linux servers</li>
                            <li>• Shell scripting for automation</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-xl">
                      <h3 className="text-2xl font-bold text-white mb-4">🏆 Popular Linux Distributions</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-yellow-400 mb-3">🐧 Debian-based (Ubuntu, Debian)</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>Ubuntu:</strong> Most popular for beginners and servers</li>
                            <li>• <strong>Debian:</strong> Stable, reliable, foundation for many distros</li>
                            <li>• <strong>Package Manager:</strong> apt (Advanced Package Tool)</li>
                            <li>• <strong>Use Cases:</strong> Desktop, servers, cloud instances</li>
                          </ul>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-red-400 mb-3">🎩 Red Hat-based (RHEL, CentOS, Fedora)</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>RHEL:</strong> Enterprise-grade, commercial support</li>
                            <li>• <strong>CentOS:</strong> Free version of RHEL</li>
                            <li>• <strong>Package Manager:</strong> yum/dnf (Yellowdog Updater)</li>
                            <li>• <strong>Use Cases:</strong> Enterprise servers, enterprise applications</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'file-system':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="file-system" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📁 Linux File System Structure
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Understand the hierarchical file system that organizes everything in Linux
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🌳 Linux File System Hierarchy</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Linux has a tree-like structure starting from <code className="bg-gray-700 px-2 py-1 rounded text-green-400">/</code> (root). 
                    Everything in Linux is a file or directory, and the file system is organized in a logical hierarchy.
                  </p>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">🏗️ Essential Directory Structure</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/</code>
                            <span className="text-white font-bold">Root Directory</span>
                          </div>
                          <p className="text-gray-300 text-sm">The top-level directory where everything starts</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/home</code>
                            <span className="text-white font-bold">User Home Directories</span>
                          </div>
                          <p className="text-gray-300 text-sm">Personal directories for each user (/home/username)</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/etc</code>
                            <span className="text-white font-bold">Configuration Files</span>
                          </div>
                          <p className="text-gray-300 text-sm">System-wide configuration files and settings</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/bin</code>
                            <span className="text-white font-bold">Essential Commands</span>
                          </div>
                          <p className="text-gray-300 text-sm">Basic commands like ls, cp, mv, rm</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/var</code>
                            <span className="text-white font-bold">Variable Data</span>
                          </div>
                          <p className="text-gray-300 text-sm">Logs, cache, and variable data files</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/tmp</code>
                            <span className="text-white font-bold">Temporary Files</span>
                          </div>
                          <p className="text-gray-300 text-sm">Temporary files (cleared on reboot)</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/usr</code>
                            <span className="text-white font-bold">User Programs</span>
                          </div>
                          <p className="text-gray-300 text-sm">User binaries, libraries, and documentation</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">/opt</code>
                            <span className="text-white font-bold">Optional Software</span>
                          </div>
                          <p className="text-gray-300 text-sm">Third-party applications and software</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-white mb-4">🔍 File System Navigation Commands</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">ls /</code>
                          <span className="text-white font-bold">List Root Directory</span>
                        </div>
                        <p className="text-gray-300 text-sm">See all top-level directories in the file system</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">tree /</code>
                          <span className="text-white font-bold">Tree View</span>
                        </div>
                        <p className="text-gray-300 text-sm">Display directory structure in tree format (if tree is installed)</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <code className="bg-gray-700 px-3 py-1 rounded text-green-400 mr-3">find / -name "filename"</code>
                          <span className="text-white font-bold">Find Files</span>
                        </div>
                        <p className="text-gray-300 text-sm">Search for files by name throughout the system</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-xl mt-6">
                    <h3 className="text-2xl font-bold text-white mb-4">📌 Practice Exercise</h3>
                    <p className="text-gray-300 mb-4">Navigate through the file system and explore different directories:</p>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <code className="text-green-400">
                        cd / && ls -la<br/>
                        cd /etc && ls<br/>
                        cd /var/log && ls<br/>
                        cd ~ && pwd
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'navigation':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="navigation" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🧭 Navigation Commands
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Master the essential commands to navigate the Linux file system
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 Essential Navigation Commands</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">🏠 Basic Navigation</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Show current directory<br/>
                          pwd<br/><br/>
                          # List directory contents<br/>
                          ls<br/><br/>
                          # Change directory<br/>
                          cd /path/to/directory<br/><br/>
                          # Go to home directory<br/>
                          cd ~<br/><br/>
                          # Go to parent directory<br/>
                          cd ..
                        </code>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">📋 Advanced Listing</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Detailed listing<br/>
                          ls -l<br/><br/>
                          # Show hidden files<br/>
                          ls -a<br/><br/>
                          # Human readable sizes<br/>
                          ls -lh<br/><br/>
                          # Sort by time<br/>
                          ls -lt<br/><br/>
                          # Recursive listing<br/>
                          ls -R
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'file-management':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="file-management" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📁 File & Directory Management
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Create, copy, move, and delete files and directories efficiently
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 File Management Commands</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">📄 File Operations</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Create empty file<br/>
                          touch filename.txt<br/><br/>
                          # Copy file<br/>
                          cp source.txt dest.txt<br/><br/>
                          # Move/rename file<br/>
                          mv oldname.txt newname.txt<br/><br/>
                          # Remove file<br/>
                          rm filename.txt<br/><br/>
                          # Remove directory<br/>
                          rm -rf directory/
                        </code>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">📂 Directory Operations</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Create directory<br/>
                          mkdir newdir<br/><br/>
                          # Create nested directories<br/>
                          mkdir -p path/to/dir<br/><br/>
                          # Copy directory<br/>
                          cp -r sourcedir destdir<br/><br/>
                          # Move directory<br/>
                          mv olddir newdir<br/><br/>
                          # Remove empty directory<br/>
                          rmdir emptydir
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'viewing-editing':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="viewing-editing" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                👁️ Viewing & Editing Files
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                View, edit, and manipulate file contents effectively
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 File Viewing & Editing Commands</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">👀 Viewing Files</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Display entire file<br/>
                          cat filename.txt<br/><br/>
                          # View file page by page<br/>
                          less filename.txt<br/><br/>
                          # View first 10 lines<br/>
                          head filename.txt<br/><br/>
                          # View last 10 lines<br/>
                          tail filename.txt<br/><br/>
                          # View last 20 lines<br/>
                          tail -n 20 filename.txt
                        </code>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">✏️ Editing Files</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Edit with nano (beginner)<br/>
                          nano filename.txt<br/><br/>
                          # Edit with vim (advanced)<br/>
                          vim filename.txt<br/><br/>
                          # Edit with emacs<br/>
                          emacs filename.txt<br/><br/>
                          # Search in files<br/>
                          grep "search_term" *.txt<br/><br/>
                          # Replace text<br/>
                          sed 's/old/new/g' file.txt
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'permissions':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="permissions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🔐 User & Permission Management
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Understand and manage Linux file permissions and user accounts
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 Permission System</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">👤 Permission Types</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # View permissions<br/>
                          ls -l<br/><br/>
                          # Change permissions<br/>
                          chmod 755 filename<br/><br/>
                          # Symbolic permissions<br/>
                          chmod u+x filename<br/><br/>
                          # Change ownership<br/>
                          chown user:group file<br/><br/>
                          # Change group<br/>
                          chgrp groupname file
                        </code>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">🔢 Permission Numbers</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Read = 4, Write = 2, Execute = 1<br/>
                          7 = 4+2+1 (rwx)<br/>
                          6 = 4+2 (rw-)<br/>
                          5 = 4+1 (r-x)<br/>
                          4 = 4 (r--)<br/><br/>
                          # Common permissions:<br/>
                          755 = rwxr-xr-x<br/>
                          644 = rw-r--r--<br/>
                          600 = rw-------
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'process-management':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="process-management" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ⚙️ Process & System Management
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Monitor and manage running processes and system resources
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 Process Management Commands</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">📊 Process Monitoring</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # List running processes<br/>
                          ps aux<br/><br/>
                          # Interactive process viewer<br/>
                          top<br/><br/>
                          # Modern process viewer<br/>
                          htop<br/><br/>
                          # Show process tree<br/>
                          pstree<br/><br/>
                          # Find process by name<br/>
                          pgrep process_name
                        </code>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">🛑 Process Control</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Kill process by PID<br/>
                          kill PID<br/><br/>
                          # Force kill process<br/>
                          kill -9 PID<br/><br/>
                          # Kill process by name<br/>
                          killall process_name<br/><br/>
                          # Run process in background<br/>
                          command &<br/><br/>
                          # Bring background job to foreground<br/>
                          fg
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'networking':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="networking" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🌐 Networking Basics
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Network configuration, connectivity, and troubleshooting
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 Networking Commands</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">🔍 Network Information</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Show network interfaces<br/>
                          ip addr<br/><br/>
                          # Show routing table<br/>
                          ip route<br/><br/>
                          # Show network statistics<br/>
                          netstat -tuln<br/><br/>
                          # Show listening ports<br/>
                          ss -tuln<br/><br/>
                          # Show network connections<br/>
                          lsof -i
                        </code>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">🌍 Connectivity Testing</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Test connectivity<br/>
                          ping google.com<br/><br/>
                          # Test port connectivity<br/>
                          telnet host port<br/><br/>
                          # Download files<br/>
                          wget URL<br/><br/>
                          # Transfer files<br/>
                          scp file user@host:/path<br/><br/>
                          # Remote shell<br/>
                          ssh user@host
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'package-management':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="package-management" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📦 Package Management
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Install, update, and manage software packages
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 Package Managers</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">🐧 Debian/Ubuntu (APT)</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Update package list<br/>
                          sudo apt update<br/><br/>
                          # Install package<br/>
                          sudo apt install package<br/><br/>
                          # Remove package<br/>
                          sudo apt remove package<br/><br/>
                          # Search packages<br/>
                          apt search keyword<br/><br/>
                          # Show package info<br/>
                          apt show package
                        </code>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">🎩 Red Hat/CentOS (YUM/DNF)</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Install package<br/>
                          sudo yum install package<br/><br/>
                          # Update package<br/>
                          sudo yum update package<br/><br/>
                          # Remove package<br/>
                          sudo yum remove package<br/><br/>
                          # Search packages<br/>
                          yum search keyword<br/><br/>
                          # List installed packages<br/>
                          yum list installed
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'shell-scripting':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="shell-scripting" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🐚 Shell Scripting Basics
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Automate tasks with shell scripts
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 Shell Scripting Fundamentals</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">📝 Basic Script Structure</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          #!/bin/bash<br/>
                          # This is a comment<br/><br/>
                          echo "Hello World"<br/><br/>
                          # Variables<br/>
                          NAME="DevOps"<br/>
                          echo "Welcome to $NAME"<br/><br/>
                          # Make script executable<br/>
                          chmod +x script.sh
                        </code>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">🔄 Control Structures</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # If statement<br/>
                          if [ $1 -gt 10 ]; then<br/>
                          &nbsp;&nbsp;echo "Greater than 10"<br/>
                          fi<br/><br/>
                          # For loop<br/>
                          for i in {'{'}{'1..5'}{'}'}; do<br/>
                          &nbsp;&nbsp;echo $i<br/>
                          done<br/><br/>
                          # While loop<br/>
                          while [ $i -lt 5 ]; do<br/>
                          &nbsp;&nbsp;echo $i<br/>
                          done
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'logs-monitoring':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="logs-monitoring" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                📋 Logs & Monitoring
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Monitor system logs and performance
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 System Monitoring</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">📄 Log Files</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # System logs<br/>
                          tail -f /var/log/syslog<br/><br/>
                          # Authentication logs<br/>
                          tail -f /var/log/auth.log<br/><br/>
                          # Application logs<br/>
                          journalctl -f<br/><br/>
                          # Search logs<br/>
                          grep "error" /var/log/syslog<br/><br/>
                          # Log rotation<br/>
                          logrotate -d /etc/logrotate.conf
                        </code>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">📊 System Monitoring</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # System information<br/>
                          uname -a<br/><br/>
                          # Disk usage<br/>
                          df -h<br/><br/>
                          # Memory usage<br/>
                          free -h<br/><br/>
                          # CPU usage<br/>
                          iostat 1<br/><br/>
                          # System load<br/>
                          uptime
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'shortcuts':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="shortcuts" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                ⚡ Essential Linux Shortcuts
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Speed up your workflow with keyboard shortcuts and aliases
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">📘 Command Line Shortcuts</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">⌨️ Keyboard Shortcuts</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # History navigation<br/>
                          ↑/↓ - Previous/Next command<br/>
                          Ctrl+R - Search history<br/>
                          !! - Repeat last command<br/><br/>
                          # Line editing<br/>
                          Ctrl+A - Beginning of line<br/>
                          Ctrl+E - End of line<br/>
                          Ctrl+U - Clear to beginning<br/>
                          Ctrl+K - Clear to end
                        </code>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-3">🔧 Useful Aliases</h3>
                      <div className="bg-gray-900 p-4 rounded">
                        <code className="text-green-400">
                          # Add to ~/.bashrc<br/>
                          alias ll='ls -la'<br/>
                          alias la='ls -A'<br/>
                          alias l='ls -CF'<br/>
                          alias ..='cd ..'<br/>
                          alias ...='cd ../..'<br/>
                          alias grep='grep --color=auto'
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      case 'video-tutorials':
        return <VideoSection videos={linuxVideos} title="Linux Basics Video Tutorials" />;

      case 'summary':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="summary" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🎯 Linux Basics Summary
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Consolidate your Linux knowledge and prepare for DevOps
              </p>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">✅ Linux Fundamentals Checklist</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-400 mb-4">✅ Basic Commands</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>✓ Navigate directories (cd, pwd, ls)</li>
                        <li>✓ Manage files (touch, cp, mv, rm)</li>
                        <li>✓ View file contents (cat, less, head, tail)</li>
                        <li>✓ Edit files (nano, vim)</li>
                        <li>✓ Understand permissions (chmod, chown)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-400 mb-4">✅ System Administration</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>✓ Monitor processes (ps, top, htop)</li>
                        <li>✓ Manage users and groups</li>
                        <li>✓ Network configuration (ip, netstat)</li>
                        <li>✓ Package management (apt, yum)</li>
                        <li>✓ Log monitoring and analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-8 rounded-2xl mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">🚀 Next Steps for DevOps</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-3">🐳 Containerization</h3>
                      <p className="text-gray-300">
                        With Linux basics mastered, you're ready to learn Docker and containerization - 
                        the foundation of modern DevOps practices.
                      </p>
                    </div>
                    
                    <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-3">☸️ Orchestration</h3>
                      <p className="text-gray-300">
                        Kubernetes and container orchestration build on Linux fundamentals to 
                        manage distributed applications at scale.
                      </p>
                    </div>
                    
                    <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-3">🔄 Automation</h3>
                      <p className="text-gray-300">
                        Shell scripting and Linux commands are essential for building 
                        CI/CD pipelines and infrastructure automation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );

      default:
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🐧 Linux Basics for DevOps
              </h1>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-gray-900/50 border border-gray-600 p-8 rounded-xl">
                  <h2 className="text-3xl font-bold text-white mb-4">Goal</h2>
                  <p className="text-white text-xl">Go from zero to intermediate with the Linux command line – the backbone of servers, cloud systems, and automation.</p>
                </div>
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <TechLayout 
      technology="linux"
      activeSection={activeSection}
      setActiveSection={setActiveSection}
    >
      {renderContent()}
    </TechLayout>
  );
}
