'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  className?: string;
}

interface CommandHistory {
  command: string;
  output: string;
  timestamp: Date;
}

export default function Terminal({ className = '' }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: 'Welcome to the OneHubGlobal Terminal! 🚀\n\nThis is a simulated Linux terminal where you can practice commands.\nType "help" to see available commands or "clear" to clear the screen.\n\n',
      timestamp: new Date()
    }
  ]);
  const [currentPath, setCurrentPath] = useState('/home/devops');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Available commands
  const commands: { [key: string]: (args: string[]) => string } = {
    help: () => `Available commands:
  ls [directory]     - List directory contents
  pwd               - Print working directory
  cd [directory]    - Change directory
  cat [file]        - Display file contents
  mkdir [name]      - Create directory
  touch [file]      - Create file
  echo [text]       - Display text
  whoami            - Display current user
  date              - Display current date/time
  uname -a          - Display system information
  ps                - Display running processes
  df -h             - Display disk usage
  free -h           - Display memory usage
  clear             - Clear terminal
  history           - Show command history
  exit              - Exit terminal

Note: This is a simulated terminal for learning purposes.`,

    ls: (args) => {
      const dir = args[0] || currentPath;
      return `total 8
drwxr-xr-x 2 devops devops 4096 Dec 15 10:30 .
drwxr-xr-x 3 root   root   4096 Dec 15 10:00 ..
drwxr-xr-x 2 devops devops 4096 Dec 15 10:25 projects
drwxr-xr-x 2 devops devops 4096 Dec 15 10:20 scripts
-rw-r--r-- 1 devops devops  123 Dec 15 10:15 README.md
-rw-r--r-- 1 devops devops  456 Dec 15 10:10 config.txt`;
    },

    pwd: () => currentPath,

    cd: (args) => {
      const targetDir = args[0];
      if (!targetDir) {
        setCurrentPath('/home/devops');
        return 'Changed to home directory';
      }
      if (targetDir === '..') {
        setCurrentPath('/home');
        return 'Changed to parent directory';
      }
      if (targetDir === 'projects' || targetDir === 'scripts') {
        setCurrentPath(`/home/devops/${targetDir}`);
        return `Changed to /home/devops/${targetDir}`;
      }
      return `cd: ${targetDir}: No such file or directory`;
    },

    cat: (args) => {
      const file = args[0];
      if (!file) return 'cat: missing file operand';
      
      const files: { [key: string]: string } = {
        'README.md': `# OneHubGlobal Project

Welcome to your DevOps learning journey!

This is a simulated environment where you can practice:
- Linux commands
- File system navigation
- Basic scripting
- System administration

Happy learning! 🚀`,
        'config.txt': `# Configuration File
server_name=devops-learning
port=3000
environment=development
debug=true
log_level=info`
      };
      
      return files[file] || `cat: ${file}: No such file or directory`;
    },

    mkdir: (args) => {
      const dirName = args[0];
      if (!dirName) return 'mkdir: missing operand';
      return `Created directory '${dirName}'`;
    },

    touch: (args) => {
      const fileName = args[0];
      if (!fileName) return 'touch: missing file operand';
      return `Created file '${fileName}'`;
    },

    echo: (args) => {
      return args.join(' ');
    },

    whoami: () => 'devops',

    date: () => new Date().toString(),

    'uname': (args) => {
      if (args[0] === '-a') {
        return 'Linux devops-learning 5.4.0-74-generic #83-Ubuntu SMP Sat May 8 02:35:39 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux';
      }
      return 'Linux';
    },

    ps: () => `    PID TTY          TIME CMD
      1 ?        00:00:01 systemd
    123 ?        00:00:02 bash
    456 ?        00:00:01 node
    789 ?        00:00:00 ps`,

    df: (args) => {
      if (args[0] === '-h') {
        return `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G  8.5G   11G  45% /
/dev/sda2       100G   45G   50G  48% /home
tmpfs           2.0G     0  2.0G   0% /dev/shm`;
      }
      return 'df: missing -h option';
    },

    free: (args) => {
      if (args[0] === '-h') {
        return `              total        used        free      shared  buff/cache   available
Mem:           7.8G        2.1G        4.2G        123M        1.5G        5.4G
Swap:          2.0G          0B        2.0G`;
      }
      return 'free: missing -h option';
    },

    clear: () => {
      setHistory([]);
      return '';
    },

    history: () => {
      return history.map((h, i) => `${i + 1}  ${h.command}`).join('\n');
    },

    exit: () => {
      return 'Goodbye! Thanks for using the OneHubGlobal Terminal.';
    }
  };

  const executeCommand = async (command: string) => {
    if (!command.trim()) return;

    const [cmd, ...args] = command.trim().split(' ');
    const commandKey = cmd.toLowerCase();

    setIsProcessing(true);

    // Simulate command processing delay
    await new Promise(resolve => setTimeout(resolve, 100));

    let output = '';
    if (commands[commandKey]) {
      output = commands[commandKey](args);
    } else {
      output = `${cmd}: command not found\nType 'help' to see available commands.`;
    }

    const newEntry: CommandHistory = {
      command,
      output,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, newEntry]);
    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Could implement command history navigation here
    }
  };

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={`bg-black text-green-400 font-mono rounded-lg overflow-hidden ${className}`}>
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-300 text-sm">OneHubGlobal Terminal</div>
        <div className="w-16"></div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto"
      >
        {history.map((entry, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center mb-1">
              <span className="text-white">devops@learning</span>
              <span className="text-white">:</span>
              <span className="text-yellow-400">{currentPath}</span>
              <span className="text-white">$</span>
              <span className="ml-2 text-white">{entry.command}</span>
            </div>
            {entry.output && (
              <div className="text-green-400 whitespace-pre-wrap ml-4">
                {entry.output}
              </div>
            )}
          </div>
        ))}
        
        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-white">devops@learning</span>
          <span className="text-white">:</span>
          <span className="text-yellow-400">{currentPath}</span>
          <span className="text-white">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ml-2 bg-transparent text-white outline-none flex-1"
            placeholder="Enter command..."
            disabled={isProcessing}
          />
          {isProcessing && <span className="text-yellow-400 animate-pulse">⏳</span>}
        </form>
      </div>
    </div>
  );
}
