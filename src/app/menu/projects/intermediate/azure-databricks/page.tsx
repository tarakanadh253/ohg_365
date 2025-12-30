'use client';

import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
}

interface Project {
  title: string;
  concepts: string[];
  tasks: string[];
  interviewQuestions: QuizQuestion[];
}

const intermediateProjects: Project[] = [
  {
    title: 'File-Based ETL Using Functions',
    concepts: [
      'Modular coding',
      'Reusable functions',
      'Error handling'
    ],
    tasks: [
      'Create a Python function to ingest files',
      'Validate file existence in DBFS',
      'Separate success vs reject records',
      'Write success records to Delta',
      'Log rejected records'
    ],
    interviewQuestions: [
      {
        question: 'How to create reusable functions in PySpark?',
        options: [
          'Define functions using def keyword',
          'Use functions to encapsulate logic and avoid code duplication',
          'Pass parameters to make functions flexible',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Reusable functions in PySpark are created using Python def keyword, encapsulate logic to avoid duplication, and accept parameters for flexibility.'
      },
      {
        question: 'How to handle missing files?',
        options: [
          'Use try/except blocks to catch FileNotFoundError',
          'Check file existence using dbutils.fs.ls() or os.path.exists()',
          'Use if-else conditions before reading files',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Handle missing files by using try/except for error handling, checking file existence before reading, and using conditional logic.'
      },
      {
        question: 'What is try/except in Python?',
        options: [
          'Error handling mechanism',
          'Allows code to continue execution when errors occur',
          'Catches and handles exceptions gracefully',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'try/except is Python\'s error handling mechanism that allows code to catch exceptions and handle them gracefully without stopping execution.'
      }
    ]
  },
  {
    title: 'Multi-Source Ingestion (CSV + JSON)',
    concepts: [
      'Multiple input formats',
      'Schema alignment',
      'Data merging'
    ],
    tasks: [
      'Read transactions from CSV',
      'Read customers from JSON',
      'Standardize column names and datatypes',
      'Join/merge datasets',
      'Store combined output in Delta'
    ],
    interviewQuestions: [
      {
        question: 'How to read JSON in PySpark?',
        options: [
          'spark.read.json("path/to/file.json")',
          'spark.read.format("json").load("path/to/file.json")',
          'Both A and B are correct',
          'pd.read_json("path/to/file.json")'
        ],
        correctAnswer: 2,
        explanation: 'Both spark.read.json() and spark.read.format("json").load() are valid ways to read JSON files in PySpark.'
      },
      {
        question: 'How to align schemas?',
        options: [
          'Use select() to choose and rename columns',
          'Use withColumnRenamed() to standardize column names',
          'Use cast() to ensure consistent data types',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Schema alignment involves selecting, renaming columns, and casting data types to ensure consistency across different data sources.'
      },
      {
        question: 'How to join datasets in PySpark?',
        options: [
          'df1.join(df2, on="common_column")',
          'df1.join(df2, df1.col == df2.col, "inner")',
          'Use join() with join type (inner, left, right, outer)',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'PySpark supports various join operations using join() method with column names or conditions, and different join types (inner, left, right, outer).'
      }
    ]
  },
  {
    title: 'Incremental Load Using Date Column',
    concepts: [
      'Incremental ETL',
      'Control tables',
      'Avoiding full reloads'
    ],
    tasks: [
      'Create control table with last processed date',
      'Read only new records based on date column',
      'Append new records to Delta table',
      'Update control table with latest processed date'
    ],
    interviewQuestions: [
      {
        question: 'How to implement incremental load?',
        options: [
          'Track last processed date in a control table',
          'Filter source data based on date column',
          'Append only new records to target table',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Incremental load involves tracking processed dates, filtering new records, and appending them to avoid full reloads.'
      },
      {
        question: 'How to maintain last updated date?',
        options: [
          'Store in a separate control/metadata table',
          'Use Delta table properties',
          'Use a configuration file or database',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Last updated date can be maintained in control tables, Delta properties, or configuration files for tracking incremental loads.'
      },
      {
        question: 'How to append data in Delta?',
        options: [
          'df.write.mode("append").format("delta").save("path")',
          'df.write.mode("append").option("mergeSchema", "true").format("delta").save("path")',
          'Both A and B are correct',
          'df.append("path")'
        ],
        correctAnswer: 2,
        explanation: 'Use write mode "append" with Delta format. Optionally use mergeSchema to handle schema evolution.'
      }
    ]
  },
  {
    title: 'Partitioning & Performance Optimization',
    concepts: [
      'Partitioning',
      'File pruning',
      'Performance improvement'
    ],
    tasks: [
      'Read large dataset from DBFS',
      'Write Delta table partitioned by date/region',
      'Run queries and compare speed (partition vs non-partition)',
      'Validate number of files created'
    ],
    interviewQuestions: [
      {
        question: 'What is partitioning?',
        options: [
          'Dividing data into smaller, manageable chunks',
          'Organizing data by column values for faster queries',
          'Storing data in separate directories based on partition columns',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Partitioning divides data into smaller chunks organized by column values, stored in separate directories for improved query performance.'
      },
      {
        question: 'How does file pruning work?',
        options: [
          'Spark skips reading files in irrelevant partitions',
          'Only reads partitions that match query filters',
          'Reduces I/O operations and improves query speed',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'File pruning allows Spark to skip irrelevant partitions based on query filters, reducing I/O and improving performance.'
      },
      {
        question: 'When not to partition?',
        options: [
          'When partition column has low cardinality (few unique values)',
          'When data size is very small',
          'When partition creates too many small files',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Avoid partitioning when columns have low cardinality, data is small, or it creates too many small files (small file problem).'
      }
    ]
  },
  {
    title: 'Data Quality Checks',
    concepts: [
      'DQ rules',
      'Reject handling',
      'DQ summary table'
    ],
    tasks: [
      'Read raw data',
      'Apply DQ rules (null checks, range checks, datatype checks)',
      'Split good/bad records',
      'Create DQ summary Delta table',
      'Store rejected records separately'
    ],
    interviewQuestions: [
      {
        question: 'What is data quality?',
        options: [
          'Ensuring data accuracy, completeness, and consistency',
          'Validating data against business rules',
          'Checking for errors, duplicates, and missing values',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Data quality involves ensuring accuracy, completeness, consistency, and validating data against business rules and constraints.'
      },
      {
        question: 'How do you handle bad records?',
        options: [
          'Filter and separate bad records from good ones',
          'Store rejected records in a separate reject table',
          'Log rejections with reasons for tracking',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Handle bad records by filtering them out, storing in reject tables, and logging rejection reasons for analysis and correction.'
      },
      {
        question: 'What is a reject table?',
        options: [
          'A table storing records that failed data quality checks',
          'Contains rejected records with rejection reasons',
          'Used for analysis and reprocessing of bad data',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'A reject table stores records that failed DQ checks, includes rejection reasons, and enables analysis and reprocessing.'
      }
    ]
  }
];

export default function IntermediateDatabricksProjectsPage() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({});
  const [showQuizResults, setShowQuizResults] = useState<{ [key: number]: boolean }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});

  const currentProject = intermediateProjects[currentProjectIndex];
  const allTasksCompleted = currentProject.tasks.length === completedTasks.size;

  const handleTaskToggle = (taskIndex: number) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskIndex)) {
      newCompleted.delete(taskIndex);
    } else {
      newCompleted.add(taskIndex);
    }
    setCompletedTasks(newCompleted);
  };

  const handleTaskCompleted = () => {
    if (allTasksCompleted) {
      setShowQuiz(true);
      setQuizAnswers({});
      setShowQuizResults({});
      setSelectedOptions({});
    }
  };

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleShowAnswer = (questionIndex: number) => {
    const selectedOption = selectedOptions[questionIndex];
    if (selectedOption !== null && selectedOption !== undefined) {
      setQuizAnswers(prev => ({
        ...prev,
        [questionIndex]: selectedOption
      }));
      
      const isCorrect = selectedOption === currentProject.interviewQuestions[questionIndex].correctAnswer;
      setShowQuizResults(prev => ({
        ...prev,
        [questionIndex]: isCorrect
      }));
    }
  };

  const handleNextProject = () => {
    if (currentProjectIndex < intermediateProjects.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
      setCompletedTasks(new Set());
      setShowQuiz(false);
      setQuizAnswers({});
      setShowQuizResults({});
      setSelectedOptions({});
    }
  };

  const handlePreviousProject = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
      setCompletedTasks(new Set());
      setShowQuiz(false);
      setQuizAnswers({});
      setShowQuizResults({});
      setSelectedOptions({});
    }
  };

  const handleBackToTasks = () => {
    setShowQuiz(false);
    setQuizAnswers({});
    setShowQuizResults({});
    setSelectedOptions({});
  };

  if (showQuiz) {
    return (
      <main className="min-h-screen pt-28 pb-20" style={{ backgroundColor: '#000000' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <button
              onClick={handleBackToTasks}
              className="mb-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tasks
            </button>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Interview Questions - {currentProject.title}
                </h1>
                <p className="text-gray-400">Test your knowledge with these interview questions</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-semibold border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Project {currentProjectIndex + 1} of {intermediateProjects.length}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {currentProject.interviewQuestions.map((question, qIndex) => {
              const selectedOption = selectedOptions[qIndex];
              const selectedAnswer = quizAnswers[qIndex];
              const isCorrect = showQuizResults[qIndex];
              const correctAnswerIndex = question.correctAnswer;
              const hasAnswered = selectedAnswer !== null && selectedAnswer !== undefined;
              const hasSelected = selectedOption !== null && selectedOption !== undefined;

              return (
                <div
                  key={qIndex}
                  className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-600 p-6"
                >
                  <div className="mb-4">
                    <div className="flex items-start mb-2">
                      <span className="text-lg font-bold text-blue-400 mr-3">Q{qIndex + 1}:</span>
                      <h3 className="text-lg font-semibold text-white flex-1">{question.question}</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {question.options.map((option, oIndex) => {
                      const isSelected = selectedOption === oIndex;
                      const isCorrectOption = oIndex === correctAnswerIndex;
                      let optionStyle = '';

                      if (hasAnswered) {
                        if (isCorrectOption) {
                          optionStyle = 'bg-green-500/20 border-green-500 text-green-300';
                        } else if (isSelected && !isCorrectOption) {
                          optionStyle = 'bg-red-500/20 border-red-500 text-red-300';
                        } else {
                          optionStyle = 'bg-gray-700/50 border-gray-600 text-gray-400';
                        }
                      } else {
                        optionStyle = isSelected 
                          ? 'bg-blue-500/20 border-blue-500 text-blue-300' 
                          : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-blue-500 hover:bg-blue-500/10 cursor-pointer';
                      }

                      return (
                        <button
                          key={oIndex}
                          onClick={() => {
                            if (!hasAnswered) {
                              handleOptionSelect(qIndex, oIndex);
                            }
                          }}
                          disabled={hasAnswered}
                          className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${optionStyle} ${
                            !hasAnswered ? 'hover:scale-[1.02] cursor-pointer' : 'cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="font-semibold mr-3">
                              {String.fromCharCode(65 + oIndex)}.
                            </span>
                            <span>{option}</span>
                            {hasAnswered && isCorrectOption && (
                              <div className="ml-auto flex items-center">
                                <span className="text-green-400 text-sm font-semibold mr-2">Correct Answer</span>
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                            {hasAnswered && isSelected && !isCorrectOption && (
                              <div className="ml-auto flex items-center">
                                <span className="text-red-400 text-sm font-semibold mr-2">Your Selection</span>
                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </div>
                            )}
                            {!hasAnswered && isSelected && (
                              <div className="ml-auto flex items-center">
                                <span className="text-blue-400 text-sm font-semibold">Selected</span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {!hasAnswered && hasSelected && (
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => handleShowAnswer(qIndex)}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-green-500/30"
                      >
                        Show Correct Answer
                      </button>
                    </div>
                  )}

                  {hasAnswered && question.explanation && (
                    <div className={`mt-4 p-4 rounded-lg ${
                      isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-blue-500/10 border border-blue-500/30'
                    }`}>
                      <p className="text-sm text-gray-300">
                        <span className="font-semibold text-blue-400">Explanation: </span>
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePreviousProject}
              disabled={currentProjectIndex === 0}
              className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Project
            </button>
            {currentProjectIndex < intermediateProjects.length - 1 ? (
              <button
                onClick={handleNextProject}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
              >
                Next Project
              </button>
            ) : (
              <div className="px-6 py-3 bg-green-500/20 text-green-400 font-semibold rounded-lg border border-green-500/30">
                All Projects Completed! 🎉
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Azure Databricks Projects</h1>
            <span className="ml-4 px-3 py-1 rounded-full text-sm font-semibold border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              Intermediate
            </span>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Master advanced Azure Databricks concepts with intermediate projects. Build ETL pipelines, handle multiple data sources, and optimize performance.
          </p>
        </div>

        {/* Project Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handlePreviousProject}
            disabled={currentProjectIndex === 0}
            className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <span className="px-4 py-2 bg-yellow-500/20 text-yellow-400 font-semibold rounded-lg border border-yellow-500/30">
            Project {currentProjectIndex + 1} of {intermediateProjects.length}
          </span>
          <button
            onClick={handleNextProject}
            disabled={currentProjectIndex === intermediateProjects.length - 1}
            className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            Next
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Project Card */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-600 p-8">
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-yellow-400 mr-3">PROJECT {currentProjectIndex + 1}:</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{currentProject.title}</h2>
            </div>
          </div>

          {/* Concepts Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Concepts
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentProject.concepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm border border-yellow-500/30"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Tasks Roadmap */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-yellow-400 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Tasks Roadmap
            </h3>
            
            <div className="space-y-4">
              {currentProject.tasks.map((task, taskIndex) => {
                const isCompleted = completedTasks.has(taskIndex);
                return (
                  <div key={taskIndex} className="relative">
                    {/* Connecting Line */}
                    {taskIndex < currentProject.tasks.length - 1 && (
                      <div
                        className={`absolute left-6 top-12 w-0.5 h-8 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                        style={{ zIndex: 0 }}
                      />
                    )}
                    
                    {/* Task Item */}
                    <div className="relative flex items-start">
                      {/* Checkbox Circle */}
                      <div className="relative z-10 flex-shrink-0">
                        <button
                          onClick={() => handleTaskToggle(taskIndex)}
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isCompleted
                              ? 'bg-green-500 border-green-500 hover:bg-green-600'
                              : 'bg-gray-700 border-gray-500 hover:border-yellow-400 hover:bg-gray-600'
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-gray-400 font-bold">{taskIndex + 1}</span>
                          )}
                        </button>
                      </div>
                      
                      {/* Task Content */}
                      <div className="ml-4 flex-1 pt-2">
                        <div
                          className={`p-4 rounded-lg border transition-all duration-300 ${
                            isCompleted
                              ? 'bg-green-500/10 border-green-500/30'
                              : 'bg-gray-700/50 border-gray-600 hover:border-yellow-500/50'
                          }`}
                        >
                          <p
                            className={`text-sm ${
                              isCompleted ? 'text-green-300 line-through' : 'text-gray-300'
                            }`}
                          >
                            {task}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task Completed Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleTaskCompleted}
              disabled={!allTasksCompleted}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                allTasksCompleted
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/30 hover:scale-105'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {allTasksCompleted ? (
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  All Tasks Completed - View Interview Questions
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Complete All Tasks ({completedTasks.size}/{currentProject.tasks.length})
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

