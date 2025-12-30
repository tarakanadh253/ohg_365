// Challenge System Types

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  explanation?: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  expectedOutput: string;
  testCases: {
    input?: string;
    expectedOutput: string;
  }[];
  hints?: string[];
}

export interface LevelData {
  level: number;
  title: string;
  description: string;
  mcqs: MCQQuestion[];
  codingChallenges: CodingChallenge[];
  passingScore: number; // Percentage needed to pass MCQs (e.g., 70)
}

export interface LanguageChallenge {
  language: string;
  displayName: string;
  icon: string;
  color: string;
  levels: LevelData[];
}

export interface UserProgress {
  name: string;
  language: string;
  completedLevels: number[];
  currentLevel: number;
  badges: string[];
  hasMasterBadge: boolean;
}

export interface QuizResult {
  userName: string;
  language: string;
  level: number;
  mcqScore: number;
  mcqTotal: number;
  codingPassed: boolean[];
  passed: boolean;
  completedAt: string;
}

