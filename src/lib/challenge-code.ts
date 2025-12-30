// Challenge Code System - Encode/Decode user progress without database

export interface UserProgress {
  name: string;
  email: string;
  python: number[];
  java: number[];
  javascript: number[];
  sql: number[];
  createdAt: number;
}

// Characters for code generation (avoiding confusing chars like 0/O, 1/I/l)
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

// Simple hash function for generating consistent codes
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Generate a short alphanumeric code from a number
const numberToCode = (num: number, length: number): string => {
  let result = '';
  let n = num;
  for (let i = 0; i < length; i++) {
    result = CHARS[n % CHARS.length] + result;
    n = Math.floor(n / CHARS.length);
  }
  return result;
};

// Encode completed levels array to a compact string
// Each language gets 2 chars representing a bitmask of completed levels (1-10)
const encodeLevels = (levels: number[]): string => {
  let bitmask = 0;
  levels.forEach(level => {
    if (level >= 1 && level <= 10) {
      bitmask |= (1 << (level - 1));
    }
  });
  // Convert to 2-char code (max 1023 = 10 bits)
  return numberToCode(bitmask, 2);
};

// Decode 2-char code back to levels array
const decodeLevels = (code: string): number[] => {
  let bitmask = 0;
  for (let i = 0; i < code.length; i++) {
    const idx = CHARS.indexOf(code[i]);
    if (idx === -1) return [];
    bitmask = bitmask * CHARS.length + idx;
  }
  
  const levels: number[] = [];
  for (let i = 0; i < 10; i++) {
    if (bitmask & (1 << i)) {
      levels.push(i + 1);
    }
  }
  return levels;
};

/**
 * Encode user progress to a shareable code
 * Format: OHG-XXXXXX-PPJJSSNN
 * - XXXXXX: User identifier (from name + email hash)
 * - PP: Python levels, JJ: Java levels, SS: SQL levels, NN: JavaScript levels
 */
export const encodeProgress = (data: UserProgress): string => {
  // Generate user identifier from name + email
  const userHash = simpleHash(data.email.toLowerCase() + data.name.toLowerCase());
  const userId = numberToCode(userHash, 6);
  
  // Encode each language's progress
  const pythonCode = encodeLevels(data.python);
  const javaCode = encodeLevels(data.java);
  const sqlCode = encodeLevels(data.sql);
  const jsCode = encodeLevels(data.javascript);
  
  return `OHG-${userId}-${pythonCode}${javaCode}${sqlCode}${jsCode}`;
};

/**
 * Decode a progress code back to user data
 * Note: Name and email cannot be recovered from code, only the hash matches
 */
export const decodeProgress = (code: string): Partial<UserProgress> | null => {
  try {
    // Remove any spaces and convert to uppercase
    const cleanCode = code.replace(/\s/g, '').toUpperCase();
    
    // Validate format: OHG-XXXXXX-XXXXXXXX
    const regex = /^OHG-([A-Z2-9]{6})-([A-Z2-9]{8})$/;
    const match = cleanCode.match(regex);
    
    if (!match) return null;
    
    const progressPart = match[2];
    
    // Decode each language (2 chars each)
    const python = decodeLevels(progressPart.slice(0, 2));
    const java = decodeLevels(progressPart.slice(2, 4));
    const sql = decodeLevels(progressPart.slice(4, 6));
    const javascript = decodeLevels(progressPart.slice(6, 8));
    
    return {
      python,
      java,
      javascript,
      sql,
    };
  } catch {
    return null;
  }
};

/**
 * Validate if a code matches a user's name and email
 */
export const validateCode = (code: string, name: string, email: string): boolean => {
  try {
    const cleanCode = code.replace(/\s/g, '').toUpperCase();
    const regex = /^OHG-([A-Z2-9]{6})-([A-Z2-9]{8})$/;
    const match = cleanCode.match(regex);
    
    if (!match) return false;
    
    const codeUserId = match[1];
    const userHash = simpleHash(email.toLowerCase() + name.toLowerCase());
    const expectedUserId = numberToCode(userHash, 6);
    
    return codeUserId === expectedUserId;
  } catch {
    return false;
  }
};

/**
 * Update progress code with new completed level
 */
export const updateProgressCode = (
  currentCode: string,
  language: 'python' | 'java' | 'javascript' | 'sql',
  completedLevel: number
): string => {
  const progress = decodeProgress(currentCode);
  if (!progress) return currentCode;
  
  // Add the completed level if not already present
  const levels = progress[language] || [];
  if (!levels.includes(completedLevel)) {
    levels.push(completedLevel);
    levels.sort((a, b) => a - b);
  }
  
  // Get the user ID part from original code
  const cleanCode = currentCode.replace(/\s/g, '').toUpperCase();
  const userId = cleanCode.slice(4, 10);
  
  // Re-encode with updated progress
  const pythonCode = encodeLevels(language === 'python' ? levels : (progress.python || []));
  const javaCode = encodeLevels(language === 'java' ? levels : (progress.java || []));
  const sqlCode = encodeLevels(language === 'sql' ? levels : (progress.sql || []));
  const jsCode = encodeLevels(language === 'javascript' ? levels : (progress.javascript || []));
  
  return `OHG-${userId}-${pythonCode}${javaCode}${sqlCode}${jsCode}`;
};

/**
 * Create a new progress code for a user
 */
export const createNewCode = (name: string, email: string): string => {
  const progress: UserProgress = {
    name,
    email,
    python: [],
    java: [],
    javascript: [],
    sql: [],
    createdAt: Date.now(),
  };
  return encodeProgress(progress);
};

/**
 * Get completed levels for a specific language from a code
 */
export const getLanguageProgress = (
  code: string,
  language: 'python' | 'java' | 'javascript' | 'sql'
): number[] => {
  const progress = decodeProgress(code);
  if (!progress) return [];
  return progress[language] || [];
};

/**
 * Check if user has completed all levels for a language
 */
export const hasMasterBadge = (code: string, language: 'python' | 'java' | 'javascript' | 'sql'): boolean => {
  const levels = getLanguageProgress(code, language);
  return levels.length === 10;
};

/**
 * Get total progress across all languages
 */
export const getTotalProgress = (code: string): { total: number; completed: number } => {
  const progress = decodeProgress(code);
  if (!progress) return { total: 40, completed: 0 };
  
  const completed = 
    (progress.python?.length || 0) +
    (progress.java?.length || 0) +
    (progress.javascript?.length || 0) +
    (progress.sql?.length || 0);
  
  return { total: 40, completed };
};

