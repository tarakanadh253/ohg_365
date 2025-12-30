'use client';

import React, { useState } from 'react';

interface CodeEditorProps {
  language: 'python' | 'java';
  onExecute: (code: string) => void;
  className?: string;
}

export default function CodeEditor({ language, onExecute, className = '' }: CodeEditorProps) {
  const [code, setCode] = useState(
    language === 'python' 
      ? 'print("Hello, World!")\nfor i in range(5):\n    print(f"Number: {i}")'
      : 'System.out.println("Hello, World!");\nfor(int i = 0; i < 5; i++) {\n    System.out.println("Number: " + i);\n}'
  );
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      await onExecute(code);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleClear = () => {
    setCode('');
  };

  const handleReset = () => {
    setCode(
      language === 'python' 
        ? 'print("Hello, World!")\nfor i in range(5):\n    print(f"Number: {i}")'
        : 'System.out.println("Hello, World!");\nfor(int i = 0; i < 5; i++) {\n    System.out.println("Number: " + i);\n}'
    );
  };

  return (
    <div className={`bg-gray-900 rounded-lg border border-gray-700 ${className}`}>
      {/* Editor Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-white">
            {language === 'python' ? '🐍 Python Editor' : '☕ Java Editor'}
          </span>
          <span className="text-xs text-gray-400">
            {language === 'python' ? 'Live Python Code Execution' : 'Live Java Compilation & Execution'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleExecute}
            disabled={isExecuting || !code.trim()}
            className="px-4 py-1 text-xs bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors font-semibold"
          >
            {isExecuting ? 'Executing...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="p-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 bg-black text-green-400 font-mono text-sm p-4 rounded border border-gray-600 resize-none focus:outline-none focus:border-green-500"
          placeholder={`Enter your ${language} code here...`}
          spellCheck={false}
        />
      </div>

      {/* Editor Footer */}
      <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Lines: {code.split('\n').length}</span>
            <span>Characters: {code.length}</span>
            <span>Language: {language}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">●</span>
            <span>Live Execution Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
