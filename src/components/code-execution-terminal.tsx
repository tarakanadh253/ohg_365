'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  className?: string;
}

interface CodeExecution {
  code: string;
  output: string;
  timestamp: Date;
  language: string;
}

export default function CodeExecutionTerminal({ className = '' }: TerminalProps) {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState<CodeExecution[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState('python');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const languages = {
    python: {
      name: 'Python',
      icon: '🐍',
      extension: '.py',
      template: `# Python Code Example
print("Hello, World!")

# Variables and operations
name = "OneHubGlobal"
age = 25
print(f"Name: {name}, Age: {age}")

# List operations
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(f"Squared numbers: {squared}")

# Function example
def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))`
    },
    javascript: {
      name: 'JavaScript',
      icon: '🟨',
      extension: '.js',
      template: `// JavaScript Code Example
console.log("Hello, World!");

// Variables and operations
const name = "OneHubGlobal";
const age = 25;
console.log(\`Name: \${name}, Age: \${age}\`);

// Array operations
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(x => x * x);
console.log(\`Squared numbers: \${squared}\`);

// Function example
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("Developer"));`
    },
    java: {
      name: 'Java',
      icon: '☕',
      extension: '.java',
      template: `// Java Code Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variables and operations
        String name = "OneHubGlobal";
        int age = 25;
        System.out.println("Name: " + name + ", Age: " + age);
        
        // Array operations
        int[] numbers = {1, 2, 3, 4, 5};
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = numbers[i] * numbers[i];
        }
        System.out.println("Squared numbers: " + java.util.Arrays.toString(numbers));
        
        // Method example
        System.out.println(greet("Developer"));
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`
    },
    sql: {
      name: 'SQL',
      icon: '🗄️',
      extension: '.sql',
      template: `-- SQL Code Example
-- Create and populate a sample table
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    grade CHAR(1)
);

INSERT INTO students VALUES 
(1, 'Alice', 20, 'A'),
(2, 'Bob', 22, 'B'),
(3, 'Charlie', 19, 'A'),
(4, 'Diana', 21, 'C');

-- Query examples
SELECT * FROM students;

SELECT name, grade 
FROM students 
WHERE grade = 'A'
ORDER BY name;

SELECT AVG(age) as average_age 
FROM students;

SELECT grade, COUNT(*) as count 
FROM students 
GROUP BY grade;`
    },
    bash: {
      name: 'Bash/Linux',
      icon: '🐧',
      extension: '.sh',
      template: `#!/bin/bash
# Bash Script Example
echo "Hello, World!"

# Variables and operations
NAME="OneHubGlobal"
AGE=25
echo "Name: $NAME, Age: $AGE"

# Array operations
numbers=(1 2 3 4 5)
for i in {0..4}; do
    numbers[i]=$((numbers[i] * numbers[i]))
done
echo "Squared numbers:" \${numbers[*]}

# Function example
greet() {
    echo "Hello, $1!"
}

greet "Developer"

# System commands
echo "Current user:" $(whoami)
echo "Current directory:" $(pwd)
echo "Date:" $(date)`
    }
  };

  const executeCode = async () => {
    if (!code.trim()) return;

    setIsExecuting(true);
    
    // Simulate code execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let result = '';
    const lang = languages[currentLanguage as keyof typeof languages];

    try {
      switch (currentLanguage) {
        case 'python':
          result = executePythonCode(code);
          break;
        case 'javascript':
          result = executeJavaScriptCode(code);
          break;
        case 'java':
          result = executeJavaCode(code);
          break;
        case 'sql':
          result = executeSQLCode(code);
          break;
        case 'bash':
          result = executeBashCode(code);
          break;
        default:
          result = 'Language not supported yet';
      }
    } catch (error) {
      result = `Error: ${error}`;
    }

    const execution: CodeExecution = {
      code,
      output: result,
      timestamp: new Date(),
      language: currentLanguage
    };

    setHistory(prev => [...prev, execution]);
    setOutput(result);
    setIsExecuting(false);
  };

  const executePythonCode = (code: string): string => {
    // Simulate Python execution
    const lines = code.split('\n');
    let output = '';
    
    for (const line of lines) {
      if (line.includes('print(')) {
        const match = line.match(/print\(["'](.*?)["']\)/);
        if (match) {
          output += match[1] + '\n';
        } else {
          const fMatch = line.match(/print\(f["'](.*?)["']\)/);
          if (fMatch) {
            output += fMatch[1].replace(/\{([^}]+)\}/g, (match, varName) => {
              if (varName === 'name') return 'OneHubGlobal';
              if (varName === 'age') return '25';
              return match;
            }) + '\n';
          }
        }
      }
    }
    
    if (!output) {
      output = 'Code executed successfully (no output)\n';
    }
    
    return output.trim();
  };

  const executeJavaScriptCode = (code: string): string => {
    // Simulate JavaScript execution
    const lines = code.split('\n');
    let output = '';
    
    for (const line of lines) {
      if (line.includes('console.log(')) {
        const match = line.match(/console\.log\(["'](.*?)["']\)/);
        if (match) {
          output += match[1] + '\n';
        } else {
          const templateMatch = line.match(/console\.log\(`(.*?)`\)/);
          if (templateMatch) {
            output += templateMatch[1].replace(/\$\{([^}]+)\}/g, (match, varName) => {
              if (varName === 'name') return 'OneHubGlobal';
              if (varName === 'age') return '25';
              return match;
            }) + '\n';
          }
        }
      }
    }
    
    if (!output) {
      output = 'Code executed successfully (no output)\n';
    }
    
    return output.trim();
  };

  const executeJavaCode = (code: string): string => {
    // Simulate Java execution
    return `Compiling Main.java...
Compilation successful.
Running Main.class...

Hello, World!
Name: OneHubGlobal, Age: 25
Squared numbers: [1, 4, 9, 16, 25]
Hello, Developer!`;
  };

  const executeSQLCode = (code: string): string => {
    // Simulate SQL execution
    if (code.includes('CREATE TABLE')) {
      return `Table 'students' created successfully.`;
    } else if (code.includes('INSERT INTO')) {
      return `4 rows inserted successfully.`;
    } else if (code.includes('SELECT * FROM students')) {
      return `+----+---------+------+-------+
| id | name    | age  | grade |
+----+---------+------+-------+
|  1 | Alice   |   20 | A     |
|  2 | Bob     |   22 | B     |
|  3 | Charlie |   19 | A     |
|  4 | Diana   |   21 | C     |
+----+---------+------+-------+`;
    } else if (code.includes('AVG(age)')) {
      return `+-------------+
| average_age |
+-------------+
|     20.5000 |
+-------------+`;
    } else if (code.includes('GROUP BY')) {
      return `+-------+-------+
| grade | count |
+-------+-------+
| A     |     2 |
| B     |     1 |
| C     |     1 |
+-------+-------+`;
    }
    return 'Query executed successfully.';
  };

  const executeBashCode = (code: string): string => {
    // Simulate Bash execution
    const lines = code.split('\n');
    let output = '';
    
    for (const line of lines) {
      if (line.includes('echo "Hello, World!"')) {
        output += 'Hello, World!\n';
      } else if (line.includes('echo "Name: $NAME, Age: $AGE"')) {
        output += 'Name: OneHubGlobal, Age: 25\n';
      } else if (line.includes('echo "Squared numbers:"')) {
        output += 'Squared numbers: 1 4 9 16 25\n';
      } else if (line.includes('greet "Developer"')) {
        output += 'Hello, Developer!\n';
      } else if (line.includes('echo "Current user:"')) {
        output += 'Current user: devops\n';
      } else if (line.includes('echo "Current directory:"')) {
        output += 'Current directory: /home/devops\n';
      } else if (line.includes('echo "Date:"')) {
        output += `Date: ${new Date().toString()}\n`;
      }
    }
    
    if (!output) {
      output = 'Bash script executed successfully\n';
    }
    
    return output.trim();
  };

  const switchLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    setCode(languages[lang as keyof typeof languages].template);
    setOutput('');
  };

  const clearCode = () => {
    setCode('');
    setOutput('');
    setHistory([]);
  };

  const runExample = () => {
    setCode(languages[currentLanguage as keyof typeof languages].template);
  };

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, history]);

  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentLanguage]);

  const currentLang = languages[currentLanguage as keyof typeof languages];

  return (
    <div className={`bg-black text-green-400 font-mono rounded-lg overflow-hidden ${className}`}>
      {/* Language Switcher */}
      <div className="bg-gray-900 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm">Language:</span>
            {Object.entries(languages).map(([key, lang]) => (
              <button
                key={key}
                onClick={() => switchLanguage(key)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentLanguage === key
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {lang.icon} {lang.name}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={runExample}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
            >
              📝 Load Example
            </button>
            <button
              onClick={clearCode}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-300 text-sm">{currentLang.name} Code Execution Terminal</div>
        <div className="w-16"></div>
      </div>

      {/* Code Editor */}
      <div className="bg-gray-900 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">Code Editor ({currentLang.extension})</span>
          <button
            onClick={executeCode}
            disabled={isExecuting || !code.trim()}
            className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {isExecuting ? '⏳ Executing...' : '▶️ Run Code'}
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 bg-black text-green-400 font-mono p-4 rounded border border-gray-600 resize-none focus:outline-none focus:border-rose-500"
          placeholder={`Enter your ${currentLang.name} code here...`}
          spellCheck={false}
        />
      </div>

      {/* Output Terminal */}
      <div 
        ref={terminalRef}
        className="p-4 h-64 overflow-y-auto"
      >
        {history.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            <div className="text-4xl mb-4">🚀</div>
            <div>Welcome to the Code Execution Terminal!</div>
            <div className="text-sm mt-2">Write code and click "Run Code" to see the output.</div>
          </div>
        )}
        
        {history.map((execution, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2 text-white">
              <span className="text-sm">Execution #{index + 1} - {languages[execution.language as keyof typeof languages].name} - {execution.timestamp.toLocaleTimeString()}</span>
            </div>
            <div className="bg-gray-900 p-3 rounded mb-2">
              <div className="text-gray-300 text-sm mb-1">Code:</div>
              <pre className="text-green-400 text-sm whitespace-pre-wrap">{execution.code}</pre>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-gray-300 text-sm mb-1">Output:</div>
              <pre className="text-white text-sm whitespace-pre-wrap">{execution.output}</pre>
            </div>
          </div>
        ))}
        
        {isExecuting && (
          <div className="text-yellow-400 animate-pulse">
            ⏳ Executing {currentLang.name} code...
          </div>
        )}
      </div>
    </div>
  );
}
