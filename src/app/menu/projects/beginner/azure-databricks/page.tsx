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

const databricksProjects: Project[] = [
  {
    title: 'CSV File to Delta Lake',
    concepts: [
      'Databricks Workspace',
      'DBFS (Databricks File System)',
      'PySpark / SQL',
      'Delta Lake'
    ],
    tasks: [
      'Create a Databricks workspace (or use existing one)',
      'Upload a CSV file into DBFS (using UI or dbutils.fs.cp)',
      'Read the CSV file using PySpark',
      'Create a new database or use default',
      'Write the DataFrame into Delta format inside the database'
    ],
    interviewQuestions: [
      {
        question: 'How to read a CSV using PySpark?',
        options: [
          'spark.read.csv("path/to/file.csv")',
          'spark.read.format("csv").load("path/to/file.csv")',
          'Both A and B are correct',
          'pd.read_csv("path/to/file.csv")'
        ],
        correctAnswer: 2,
        explanation: 'Both spark.read.csv() and spark.read.format("csv").load() are valid ways to read CSV files in PySpark.'
      },
      {
        question: 'How to write CSV/Delta using PySpark?',
        options: [
          'df.write.csv("path")',
          'df.write.format("delta").save("path")',
          'df.write.mode("overwrite").format("delta").save("path")',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'All methods are valid. For Delta format, use format("delta"), and you can specify mode like "overwrite" or "append".'
      },
      {
        question: 'What is DBFS?',
        options: [
          'Databricks File System - a distributed file system',
          'Database File System',
          'Data Backup File System',
          'None of the above'
        ],
        correctAnswer: 0,
        explanation: 'DBFS (Databricks File System) is a distributed file system mounted into a Databricks workspace and available on Databricks clusters.'
      },
      {
        question: 'What is Delta Lake?',
        options: [
          'An open-source storage layer',
          'Provides ACID transactions and time travel',
          'Built on top of Parquet files',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Delta Lake is an open-source storage layer that brings ACID transactions, time travel, and schema enforcement to data lakes, built on Parquet.'
      },
      {
        question: 'What is PySpark?',
        options: [
          'Python API for Apache Spark',
          'A Python library for data processing',
          'Enables distributed data processing with Python',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'PySpark is the Python API for Apache Spark, allowing you to use Python for distributed data processing.'
      }
    ]
  },
  {
    title: 'Data Cleaning & Data Processing',
    concepts: [
      'Databricks workspace',
      'DBFS',
      'PySpark DataFrames',
      'Data Cleaning'
    ],
    tasks: [
      'Read CSV file from DBFS (customer/product data)',
      'Check schema of the file',
      'Read file using inferSchema=True',
      'Validate and fix incorrect datatypes',
      'Remove duplicate rows',
      'Handle null values (drop or fill)',
      'Write cleaned data into Delta table (default / custom database)'
    ],
    interviewQuestions: [
      {
        question: 'How to read a file using inferSchema?',
        options: [
          'spark.read.option("inferSchema", "true").csv("path")',
          'spark.read.csv("path", inferSchema=True)',
          'Both A and B are correct',
          'None of the above'
        ],
        correctAnswer: 2,
        explanation: 'Both methods work. The option() method and the parameter in csv() both allow you to infer schema automatically.'
      },
      {
        question: 'How to change datatypes in an existing DataFrame?',
        options: [
          'df.withColumn("col", df["col"].cast("int"))',
          'df.select(df["col"].cast("string").alias("col"))',
          'Both A and B are correct',
          'df.changeType("col", "int")'
        ],
        correctAnswer: 2,
        explanation: 'You can use withColumn() or select() with cast() to change column data types in PySpark.'
      },
      {
        question: 'How to handle duplicates in DataFrame?',
        options: [
          'df.dropDuplicates()',
          'df.distinct()',
          'Both A and B are correct',
          'df.removeDuplicates()'
        ],
        correctAnswer: 2,
        explanation: 'Both dropDuplicates() and distinct() can be used to remove duplicate rows from a DataFrame.'
      },
      {
        question: 'How to handle null values in DataFrame?',
        options: [
          'df.dropna() - to drop rows with null values',
          'df.fillna(value) - to fill null values',
          'Both A and B are correct',
          'df.removeNull()'
        ],
        correctAnswer: 2,
        explanation: 'dropna() removes rows with null values, while fillna() fills null values with specified values.'
      }
    ]
  },
  {
    title: 'Aggregation & Reporting',
    concepts: [
      'DBFS',
      'PySpark',
      'SQL',
      'Group By',
      'Aggregations'
    ],
    tasks: [
      'Read CSV file from DBFS',
      'Calculate daily-wise purchased products',
      'Calculate monthly-wise purchased products',
      'Calculate monthly sales for each product',
      'Write the aggregated tables into Delta'
    ],
    interviewQuestions: [
      {
        question: 'What is Group By in PySpark?',
        options: [
          'Groups rows that have the same values in specified columns',
          'Used for aggregations like sum, count, avg',
          'Both A and B are correct',
          'None of the above'
        ],
        correctAnswer: 2,
        explanation: 'Group By groups rows with the same values and is typically used with aggregation functions like sum(), count(), avg(), etc.'
      },
      {
        question: 'How to perform aggregations (sum, count)?',
        options: [
          'df.groupBy("col").sum("col2")',
          'df.groupBy("col").agg({"col2": "sum", "col3": "count"})',
          'Both A and B are correct',
          'df.aggregate("col")'
        ],
        correctAnswer: 2,
        explanation: 'You can use specific aggregation methods like sum() or use agg() with a dictionary of column-aggregation pairs.'
      },
      {
        question: 'How to extract date, month, year from timestamp?',
        options: [
          'from pyspark.sql.functions import year, month, dayofmonth',
          'df.withColumn("year", year("timestamp_col"))',
          'Both A and B are correct',
          'df.extract("year", "timestamp_col")'
        ],
        correctAnswer: 2,
        explanation: 'Use functions from pyspark.sql.functions like year(), month(), dayofmonth() to extract date components from timestamp columns.'
      }
    ]
  }
];

export default function BeginnerDatabricksProjectsPage() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({});
  const [showQuizResults, setShowQuizResults] = useState<{ [key: number]: boolean }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});

  const currentProject = databricksProjects[currentProjectIndex];
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
    if (currentProjectIndex < databricksProjects.length - 1) {
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
              <span className="px-3 py-1 rounded-full text-sm font-semibold border bg-green-500/20 text-green-400 border-green-500/30">
                Project {currentProjectIndex + 1} of {databricksProjects.length}
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
            {currentProjectIndex < databricksProjects.length - 1 ? (
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
            <span className="ml-4 px-3 py-1 rounded-full text-sm font-semibold border bg-green-500/20 text-green-400 border-green-500/30">
              Beginner
            </span>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Master Azure Databricks with hands-on projects. Complete tasks step-by-step and test your knowledge.
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
          <span className="px-4 py-2 bg-blue-500/20 text-blue-400 font-semibold rounded-lg border border-blue-500/30">
            Project {currentProjectIndex + 1} of {databricksProjects.length}
          </span>
          <button
            onClick={handleNextProject}
            disabled={currentProjectIndex === databricksProjects.length - 1}
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
              <span className="text-2xl font-bold text-blue-400 mr-3">PROJECT {currentProjectIndex + 1}:</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{currentProject.title}</h2>
            </div>
          </div>

          {/* Concepts Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Concepts
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentProject.concepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30"
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

