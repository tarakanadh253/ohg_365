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

interface Technology {
  id: string;
  name: string;
  icon: string;
  prompt: string;
  path: string;
  commands: { [key: string]: (args: string[]) => string | Promise<string> };
}

export default function MultiTerminal({ className = '' }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [currentTech, setCurrentTech] = useState<string>('linux');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Technology configurations
  const technologies: { [key: string]: Technology } = {
    linux: {
      id: 'linux',
      name: 'Linux/DevOps',
      icon: '🐧',
      prompt: 'devops@learning',
      path: '/home/devops',
      commands: {
        help: () => `Linux/DevOps Commands:
  ls [dir]         - List directory contents
  pwd              - Print working directory
  cd [dir]         - Change directory
  mkdir [name]     - Create directory
  touch [file]     - Create file
  cat [file]       - Display file contents
  nano [file]      - Edit file
  chmod [mode]     - Change permissions
  ps               - Running processes
  docker ps        - Docker containers
  git status       - Git repository status
  systemctl status - Service status
  clear            - Clear terminal
  exit             - Exit terminal`,

        ls: () => `total 12
drwxr-xr-x 2 devops devops 4096 Dec 15 10:30 .
drwxr-xr-x 3 root   root   4096 Dec 15 10:00 ..
drwxr-xr-x 2 devops devops 4096 Dec 15 10:25 projects
drwxr-xr-x 2 devops devops 4096 Dec 15 10:20 scripts
-rw-r--r-- 1 devops devops  123 Dec 15 10:15 Dockerfile
-rw-r--r-- 1 devops devops  456 Dec 15 10:10 docker-compose.yml
-rw-r--r-- 1 devops devops  789 Dec 15 10:05 deploy.sh`,

        'docker': (args) => {
          if (args[0] === 'ps') {
            return `CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
a1b2c3d4e5f6   nginx     "nginx"   2 hours ago   Up 2 hours   80/tcp    web-server
f6e5d4c3b2a1   mysql     "mysql"   3 hours ago   Up 3 hours   3306/tcp  database`;
          }
          return `Docker commands:
  docker ps        - List containers
  docker images    - List images
  docker build     - Build image
  docker run       - Run container
  docker stop      - Stop container`;
        },

        git: (args) => {
          if (args[0] === 'status') {
            return `On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   Dockerfile
        modified:   docker-compose.yml

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        deploy.sh`;
          }
          return `Git commands:
  git status       - Show repository status
  git add          - Add files to staging
  git commit       - Commit changes
  git push         - Push to remote
  git pull         - Pull from remote`;
        },

        pwd: () => '/home/devops',
        clear: () => { setHistory([]); return ''; }
      }
    },

    python: {
      id: 'python',
      name: 'Python',
      icon: '🐍',
      prompt: 'python@learning',
      path: '/home/python',
      commands: {
        help: () => `Python Commands:
  python --version - Check Python version
  pip list         - List installed packages
  pip install [pkg] - Install package
  python [file]    - Run Python script
  python -c [code] - Execute Python code (REAL EXECUTION!)
  run [code]       - Execute Python code directly (REAL EXECUTION!)
  pip freeze       - Show installed packages
  virtualenv [env] - Create virtual environment
  activate [env]   - Activate virtual environment
  jupyter notebook - Start Jupyter notebook
  pytest [file]    - Run tests
  clear            - Clear terminal
  exit             - Exit terminal`,

        python: async (args) => {
          if (args[0] === '--version') {
            return `Python 3.9.7
[GCC 7.5.0] on linux
Type "help", "copyright", "credits" or "license" for more information.`;
          }
          if (args[0] === '-c' && args[1]) {
            const code = args.slice(1).join(' ');
            try {
              const response = await fetch('/api/execute-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language: 'python', code })
              });
              const result = await response.json();
              return `>>> ${code}\n${result.output}`;
            } catch (error) {
              return `>>> ${code}\nError: Failed to execute code`;
            }
          }
          if (args[0] && args[0].endsWith('.py')) {
            // Simulate running a Python file
            return `Running ${args[0]}...
Output: Python script executed successfully`;
          }
          return `Python 3.9.7 interactive shell
Type "help()" for help.
>>> `;
        },

        'run': async (args) => {
          if (args.length === 0) {
            return `Usage: run <code>
Example: run print("Hello World")`;
          }
          const code = args.join(' ');
          try {
            const response = await fetch('/api/execute-code', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ language: 'python', code })
            });
            const result = await response.json();
            return `Executing Python code:\n${code}\n\nOutput:\n${result.output}`;
          } catch (error) {
            return `Error: Failed to execute code`;
          }
        },

        pip: (args) => {
          if (args[0] === 'list') {
            return `Package    Version
---------- -------
numpy      1.21.0
pandas     1.3.0
requests   2.25.1
flask      2.0.1
pytest     6.2.4
jupyter    1.0.0`;
          }
          if (args[0] === 'install') {
            return `Collecting ${args[1]}
  Downloading ${args[1]}-1.0.0-py3-none-any.whl
Installing collected packages: ${args[1]}
Successfully installed ${args[1]}-1.0.0`;
          }
          return `pip commands:
  pip list         - List installed packages
  pip install [pkg] - Install package
  pip freeze       - Show requirements
  pip uninstall    - Remove package`;
        },

        ls: () => `total 8
drwxr-xr-x 2 python python 4096 Dec 15 10:30 .
drwxr-xr-x 3 root   root   4096 Dec 15 10:00 ..
-rw-r--r-- 1 python python  123 Dec 15 10:15 app.py
-rw-r--r-- 1 python python  456 Dec 15 10:10 requirements.txt
-rw-r--r-- 1 python python  789 Dec 15 10:05 test_app.py
drwxr-xr-x 2 python python 4096 Dec 15 10:20 venv`,

        pwd: () => '/home/python',
        clear: () => { setHistory([]); return ''; }
      }
    },

    java: {
      id: 'java',
      name: 'Java',
      icon: '☕',
      prompt: 'java@learning',
      path: '/home/java',
      commands: {
        help: () => `Java Commands:
  java --version   - Check Java version
  javac [file]     - Compile Java file
  java [class]     - Run Java class
  compile [code]   - Compile & execute Java code (REAL EXECUTION!)
  mvn compile      - Maven compile
  mvn test         - Maven run tests
  mvn package      - Maven build package
  mvn clean        - Maven clean
  gradle build     - Gradle build
  gradle test      - Gradle run tests
  jps              - List Java processes
  jstack [pid]     - Thread dump
  clear            - Clear terminal
  exit             - Exit terminal`,

        java: (args) => {
          if (args[0] === '--version') {
            return `openjdk 11.0.12 2021-07-20
OpenJDK Runtime Environment (build 11.0.12+7-Ubuntu-0ubuntu1.20.04)
OpenJDK 64-Bit Server VM (build 11.0.12+7-Ubuntu-0ubuntu1.20.04, mixed mode, sharing)`;
          }
          return `Usage: java [options] <mainclass> [args...]
       java [options] -jar <jarfile> [args...]
       java [options] --module <module>[/<mainclass>] [args...]`;
        },

        javac: async (args) => {
          if (args.length === 0) {
            return 'javac: no source files given';
          }
          // Simulate compilation - in real implementation, this would compile the file
          return `Compiling ${args[0]}...
Generated ${args[0].replace('.java', '.class')}`;
        },

        'compile': async (args) => {
          if (args.length === 0) {
            return `Usage: compile <java_code>
Example: compile System.out.println("Hello World");`;
          }
          const code = args.join(' ');
          try {
            const response = await fetch('/api/execute-code', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ language: 'java', code })
            });
            const result = await response.json();
            return `Compiling and executing Java code:\n${code}\n\nOutput:\n${result.output}`;
          } catch (error) {
            return `Error: Failed to compile/execute code`;
          }
        },

        mvn: (args) => {
          if (args[0] === 'compile') {
            return `[INFO] Scanning for projects...
[INFO] Building MyApp 1.0-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] Compiling source files...
[INFO] BUILD SUCCESS
[INFO] Total time: 2.345 s`;
          }
          if (args[0] === 'test') {
            return `[INFO] Running tests...
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS`;
          }
          return `Maven commands:
  mvn compile      - Compile source code
  mvn test         - Run tests
  mvn package      - Build package
  mvn clean        - Clean build`;
        },

        ls: () => `total 12
drwxr-xr-x 2 java java 4096 Dec 15 10:30 .
drwxr-xr-x 3 root root 4096 Dec 15 10:00 ..
-rw-r--r-- 1 java java  123 Dec 15 10:15 HelloWorld.java
-rw-r--r-- 1 java java  456 Dec 15 10:10 pom.xml
-rw-r--r-- 1 java java  789 Dec 15 10:05 Main.java
drwxr-xr-x 2 java java 4096 Dec 15 10:20 target`,

        pwd: () => '/home/java',
        clear: () => { setHistory([]); return ''; }
      }
    },

    sql: {
      id: 'sql',
      name: 'SQL/Database',
      icon: '🗄️',
      prompt: 'sql@learning',
      path: '/home/sql',
      commands: {
        help: () => `SQL/Database Commands:
  mysql -u [user]  - Connect to MySQL
  psql -U [user]   - Connect to PostgreSQL
  sqlite3 [db]     - Open SQLite database
  mysqldump [db]   - MySQL database backup
  pg_dump [db]     - PostgreSQL backup
  show databases   - List databases (MySQL)
  \\l               - List databases (PostgreSQL)
  use [db]         - Select database
  \\dt              - List tables
  describe [table] - Show table structure
  select * from [table] - Query data
  clear            - Clear terminal
  exit             - Exit terminal`,

        mysql: (args) => {
          if (args[0] === '-u') {
            return `Welcome to the MySQL monitor. Commands end with ; or \\g.
Your MySQL connection id is 8
Server version: 8.0.25 MySQL Community Server

mysql> `;
          }
          return `MySQL client commands:
  mysql -u [user]  - Connect to MySQL server
  mysql -u [user] -p - Connect with password prompt`;
        },

        psql: (args) => {
          if (args[0] === '-U') {
            return `psql (12.9 (Ubuntu 12.9-0ubuntu0.20.04.1))
Type "help" for help.

postgres=# `;
          }
          return `PostgreSQL client commands:
  psql -U [user]   - Connect to PostgreSQL server
  psql -U [user] -d [db] - Connect to specific database`;
        },

        sqlite3: (args) => {
          if (args.length > 0) {
            return `SQLite version 3.31.1 2020-01-27 19:55:54
Enter ".help" for usage hints.
sqlite> `;
          }
          return `Usage: sqlite3 [database] [SQL commands]`;
        },

        'show': (args) => {
          if (args[0] === 'databases') {
            return `+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| learning_db        |
+--------------------+`;
          }
          return `Available show commands:
  show databases    - List all databases
  show tables       - List tables in current database`;
        },

        ls: () => `total 8
drwxr-xr-x 2 sql sql 4096 Dec 15 10:30 .
drwxr-xr-x 3 root root 4096 Dec 15 10:00 ..
-rw-r--r-- 1 sql sql  123 Dec 15 10:15 schema.sql
-rw-r--r-- 1 sql sql  456 Dec 15 10:10 data.sql
-rw-r--r-- 1 sql sql  789 Dec 15 10:05 queries.sql
-rw-r--r-- 1 sql sql  321 Dec 15 10:20 learning.db`,

        pwd: () => '/home/sql',
        clear: () => { setHistory([]); return ''; }
      }
    }
  };

  const executeCommand = async (command: string) => {
    if (!command.trim()) return;

    const [cmd, ...args] = command.trim().split(' ');
    const commandKey = cmd.toLowerCase();
    const tech = technologies[currentTech];

    setIsProcessing(true);

    // Simulate command processing delay for non-async commands
    await new Promise(resolve => setTimeout(resolve, 100));

    let output = '';
    if (tech.commands[commandKey]) {
      const commandFunction = tech.commands[commandKey];
      if (typeof commandFunction === 'function') {
        try {
          // Check if the function is async
          const result = commandFunction(args);
          if (result instanceof Promise) {
            output = await result;
          } else {
            output = result;
          }
        } catch (error) {
          output = `Error executing command: ${error}`;
        }
      }
    } else {
      output = `${cmd}: command not found\nType 'help' to see available commands for ${tech.name}.`;
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

  const switchTechnology = (techId: string) => {
    setCurrentTech(techId);
    setHistory([]);
    const tech = technologies[techId];
    setHistory([{
      command: 'welcome',
      output: `Welcome to ${tech.name} Terminal! ${tech.icon}\n\nThis is a simulated ${tech.name} environment.\nType "help" to see available commands.\n\n`,
      timestamp: new Date()
    }]);
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
  }, [currentTech]);

  const currentTechnology = technologies[currentTech];

  return (
    <div className={`bg-black text-green-400 font-mono rounded-lg overflow-hidden text-lg border border-gray-700 ${className}`}>
      {/* Technology Switcher */}
      <div className="bg-gray-900 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm">Technology:</span>
            {Object.values(technologies).map((tech) => (
              <button
                key={tech.id}
                onClick={() => switchTechnology(tech.id)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentTech === tech.id
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tech.icon} {tech.name}
              </button>
            ))}
          </div>
          <div className="text-gray-300 text-sm">{currentTechnology.name} Terminal</div>
        </div>
      </div>

      {/* Terminal Header */}
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-300 text-base font-semibold">{currentTechnology.name} Learning Environment</div>
        <div className="w-16"></div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-6 h-[600px] overflow-y-auto"
      >
        {history.map((entry, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <span className="text-white text-lg">{currentTechnology.prompt}</span>
              <span className="text-white text-lg">:</span>
              <span className="text-yellow-400 text-lg">{currentTechnology.path}</span>
              <span className="text-white text-lg">$</span>
              <span className="ml-2 text-green-400 text-lg">{entry.command}</span>
            </div>
            {entry.output && (
              <div className="text-green-400 whitespace-pre-wrap ml-4 text-base leading-relaxed">
                {entry.output}
              </div>
            )}
          </div>
        ))}
        
        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-white text-lg">{currentTechnology.prompt}</span>
          <span className="text-white text-lg">:</span>
          <span className="text-yellow-400 text-lg">{currentTechnology.path}</span>
          <span className="text-white text-lg">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-2 bg-transparent text-green-400 border-none outline-none flex-1 text-lg focus:outline-none focus:ring-0"
            placeholder="Enter command..."
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="ml-3 px-4 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors font-semibold"
          >
            {isProcessing ? '⏳' : 'Run'}
          </button>
        </form>
      </div>
    </div>
  );
}
