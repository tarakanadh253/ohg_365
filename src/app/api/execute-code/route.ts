import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { writeFileSync, unlinkSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { language, code } = await request.json();

    if (!language || !code) {
      return NextResponse.json({ error: 'Language and code are required' }, { status: 400 });
    }

    // Security: Basic code validation
    const dangerousPatterns = [
      /import\s+os/,
      /import\s+subprocess/,
      /import\s+sys/,
      /__import__/,
      /eval\(/,
      /exec\(/,
      /open\(/,
      /file\(/,
      /input\(/,
      /raw_input\(/,
      /System\.exit/,
      /Runtime\.getRuntime/,
      /ProcessBuilder/,
      /Process/,
      /File/,
      /Files/,
      /Paths/,
      /Files\./,
      /\.exec/,
      /\.getRuntime/,
      /\.exit/,
    ];

    const hasDangerousCode = dangerousPatterns.some(pattern => pattern.test(code));
    if (hasDangerousCode) {
      return NextResponse.json({ 
        error: 'Code contains potentially unsafe operations. Please use safe code only.',
        output: 'SecurityError: Unsafe code detected'
      }, { status: 400 });
    }

    const tempDir = '/tmp/onehub-code-exec';
    const sessionId = randomUUID();
    const sessionDir = join(tempDir, sessionId);
    
    // Create session directory
    mkdirSync(sessionDir, { recursive: true });

    let result: string = '';
    let error: string = '';

    if (language === 'python') {
      const pythonFile = join(sessionDir, 'main.py');
      writeFileSync(pythonFile, code, 'utf8');

      const pythonProcess = spawn('python3', [pythonFile], {
        cwd: sessionDir,
        timeout: 5000, // 5 second timeout
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          result = stdout || 'Code executed successfully (no output)';
        } else {
          error = stderr || `Process exited with code ${code}`;
        }
      });

      pythonProcess.on('error', (err) => {
        error = `Execution error: ${err.message}`;
      });

      // Wait for process to complete
      await new Promise((resolve) => {
        pythonProcess.on('close', resolve);
        pythonProcess.on('error', resolve);
      });

      // Cleanup
      try {
        unlinkSync(pythonFile);
      } catch {
        // Ignore cleanup errors
      }

    } else if (language === 'java') {
      const className = 'Main';
      const javaFile = join(sessionDir, `${className}.java`);
      
      // Wrap code in a main class if it's not already wrapped
      let javaCode = code;
      if (!code.includes('public class') && !code.includes('class Main')) {
        javaCode = `public class Main {\n    public static void main(String[] args) {\n        ${code.replace(/\n/g, '\n        ')}\n    }\n}`;
      }
      
      writeFileSync(javaFile, javaCode, 'utf8');

      // Compile Java code
      const compileProcess = spawn('javac', [javaFile], {
        cwd: sessionDir,
        timeout: 5000
      });

      let compileError = '';
      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      const compileSuccess = await new Promise((resolve) => {
        compileProcess.on('close', (code) => {
          resolve(code === 0);
        });
        compileProcess.on('error', () => resolve(false));
      });

      if (!compileSuccess) {
        error = `Compilation error:\n${compileError}`;
      } else {
        // Run compiled Java code
        const runProcess = spawn('java', ['-cp', sessionDir, className], {
          cwd: sessionDir,
          timeout: 5000,
          stdio: ['pipe', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        runProcess.stdout.on('data', (data) => {
          stdout += data.toString();
        });

        runProcess.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        runProcess.on('close', (code) => {
          if (code === 0) {
            result = stdout || 'Code executed successfully (no output)';
          } else {
            error = stderr || `Process exited with code ${code}`;
          }
        });

        runProcess.on('error', (err) => {
          error = `Execution error: ${err.message}`;
        });

        // Wait for process to complete
        await new Promise((resolve) => {
          runProcess.on('close', resolve);
          runProcess.on('error', resolve);
        });

        // Cleanup
        try {
          unlinkSync(javaFile);
          unlinkSync(join(sessionDir, `${className}.class`));
        } catch {
          // Ignore cleanup errors
        }
      }
    } else {
      return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
    }

    // Cleanup session directory
    try {
      rmSync(sessionDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }

    return NextResponse.json({
      output: result || error,
      success: !error,
      language,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Code execution error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      output: 'Error: Failed to execute code'
    }, { status: 500 });
  }
}
