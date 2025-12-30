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

const advancedProjects: Project[] = [
  {
    title: 'SCD Type-2 Dimension',
    concepts: [
      'SCD2',
      'Historical tracking',
      'Delta MERGE'
    ],
    tasks: [
      'Load customer dimension',
      'Track changes using SCD Type-2 logic',
      'Maintain start/end date columns',
      'Use Delta MERGE INTO for updates/inserts'
    ],
    interviewQuestions: [
      {
        question: 'What is SCD Type-2?',
        options: [
          'Slowly Changing Dimension Type-2 maintains historical data by creating new records',
          'It tracks changes by adding new rows with start/end dates',
          'Preserves full history of dimension changes',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'SCD Type-2 is a data warehousing technique that maintains historical data by creating new records for each change, tracking them with start/end dates, and preserving full history.'
      },
      {
        question: 'How does Delta MERGE work?',
        options: [
          'MERGE INTO performs upsert operations (update existing, insert new)',
          'Matches records based on join condition and updates or inserts accordingly',
          'More efficient than separate update and insert operations',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Delta MERGE INTO performs upsert operations efficiently by matching records on join conditions and updating existing records or inserting new ones in a single atomic operation.'
      },
      {
        question: 'How to implement SCD Type-2 in Delta?',
        options: [
          'Use MERGE INTO with WHEN MATCHED and WHEN NOT MATCHED clauses',
          'Set end_date for old records and start_date for new records',
          'Maintain current_flag to identify active records',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'SCD Type-2 in Delta uses MERGE INTO with conditional clauses to update end dates for old records and insert new records with start dates, while maintaining a current flag.'
      }
    ]
  },
  {
    title: 'Bronze → Silver → Gold Architecture',
    concepts: [
      'Medallion architecture',
      'Layered ETL'
    ],
    tasks: [
      'Bronze: store raw files as-is',
      'Silver: clean/transform data',
      'Gold: aggregated reporting tables',
      'Build complete pipeline'
    ],
    interviewQuestions: [
      {
        question: 'What is Medallion architecture?',
        options: [
          'A data architecture pattern with Bronze, Silver, and Gold layers',
          'Bronze stores raw data, Silver stores cleaned data, Gold stores aggregated data',
          'A best practice for organizing data lakes',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Medallion architecture is a data lakehouse pattern with three layers: Bronze (raw), Silver (cleaned), and Gold (aggregated), providing a structured approach to data organization.'
      },
      {
        question: 'Bronze vs Silver vs Gold differences?',
        options: [
          'Bronze: raw data as-is, Silver: cleaned/validated, Gold: business-ready aggregates',
          'Each layer serves different purposes in the data pipeline',
          'Data quality improves as it moves through layers',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Bronze stores raw data unchanged, Silver applies cleaning and validation, and Gold provides business-ready aggregated data for analytics and reporting.'
      },
      {
        question: 'Why use layered architecture?',
        options: [
          'Enables data lineage and traceability',
          'Allows reprocessing at different layers',
          'Improves data quality incrementally',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Layered architecture provides data lineage, enables reprocessing at specific layers, and allows incremental improvement of data quality through the pipeline.'
      }
    ]
  },
  {
    title: 'Deduplication Using Window Functions',
    concepts: [
      'Window functions',
      'Ranking',
      'Row_number()'
    ],
    tasks: [
      'Identify duplicate transactions',
      'Apply window function to find latest record',
      'Keep only row_number=1 records',
      'Save deduped dataset in Delta'
    ],
    interviewQuestions: [
      {
        question: 'What is row_number()?',
        options: [
          'A window function that assigns sequential numbers to rows within a partition',
          'Numbers rows based on ORDER BY clause within each partition',
          'Useful for identifying and removing duplicates',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'row_number() is a window function that assigns sequential integers to rows within a partition based on ORDER BY, making it ideal for deduplication by keeping row_number=1.'
      },
      {
        question: 'How do window functions work?',
        options: [
          'Perform calculations across a set of rows related to the current row',
          'Use PARTITION BY to define groups and ORDER BY to sort within groups',
          'Do not collapse rows like GROUP BY does',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Window functions perform calculations over related rows using PARTITION BY for grouping and ORDER BY for sorting, while preserving all rows unlike GROUP BY aggregations.'
      },
      {
        question: 'How to deduplicate using row_number()?',
        options: [
          'Use row_number() OVER (PARTITION BY key ORDER BY timestamp DESC)',
          'Filter where row_number = 1 to keep only the latest record',
          'Apply to each partition to get unique records per key',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Deduplication uses row_number() with PARTITION BY on the key column and ORDER BY on timestamp (DESC), then filters for row_number=1 to keep the latest record per key.'
      }
    ]
  },
  {
    title: 'Exception Handling & Logging',
    concepts: [
      'Pipeline failure handling',
      'Logging frameworks'
    ],
    tasks: [
      'Add try/except to ETL',
      'Store success/failure logs into Delta',
      'Capture file name, timestamp, error details',
      'Build audit table'
    ],
    interviewQuestions: [
      {
        question: 'How do you log failures?',
        options: [
          'Use try/except blocks to catch exceptions',
          'Log error details to a Delta audit table',
          'Capture file name, timestamp, and error message',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Log failures by using try/except to catch exceptions, writing error details to a Delta audit table with metadata like file name, timestamp, and error messages.'
      },
      {
        question: 'What is exception handling?',
        options: [
          'A mechanism to catch and handle errors gracefully',
          'Prevents pipeline from crashing on errors',
          'Allows logging and recovery from failures',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Exception handling catches errors, prevents crashes, and enables logging and recovery, making pipelines more robust and maintainable.'
      },
      {
        question: 'What should an audit table contain?',
        options: [
          'File name, processing timestamp, status (success/failure)',
          'Error message, row count, processing duration',
          'Pipeline name, environment, retry count',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'An audit table should contain comprehensive metadata including file names, timestamps, status, error details, row counts, and pipeline information for monitoring and debugging.'
      }
    ]
  },
  {
    title: 'Analytical Reporting Using Spark SQL',
    concepts: [
      'SQL queries',
      'CTEs',
      'Subqueries'
    ],
    tasks: [
      'Trend analysis',
      'Month-over-month reports',
      'Top customers',
      'Category-level sales'
    ],
    interviewQuestions: [
      {
        question: 'What are CTEs?',
        options: [
          'Common Table Expressions - named temporary result sets',
          'Defined using WITH clause and referenced in main query',
          'Improve query readability and reusability',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'CTEs (Common Table Expressions) are named temporary result sets defined with WITH clause, making complex queries more readable and maintainable.'
      },
      {
        question: 'Difference between subquery and join?',
        options: [
          'Subquery returns a result set used in WHERE/HAVING, join combines tables',
          'Subqueries can be correlated or non-correlated',
          'Joins are generally more efficient for combining data',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Subqueries return result sets for filtering, while joins combine tables. Subqueries can be correlated, but joins are typically more efficient for data combination.'
      },
      {
        question: 'How to calculate month-over-month growth?',
        options: [
          'Use LAG() window function to get previous month value',
          'Calculate percentage change: (current - previous) / previous * 100',
          'Partition by dimension and order by month',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Month-over-month growth uses LAG() to get previous month values, calculates percentage change, and partitions by dimensions while ordering by time periods.'
      }
    ]
  },
  {
    title: 'Date & Time Dimension',
    concepts: [
      'Star schema',
      'Dimension tables'
    ],
    tasks: [
      'Create date dimension',
      'Generate fields: week, month, quarter, fiscal year',
      'Join with fact table',
      'Write to Delta'
    ],
    interviewQuestions: [
      {
        question: 'What is a star schema?',
        options: [
          'A data warehouse schema with fact table in center and dimension tables around it',
          'Fact table contains measures, dimension tables contain descriptive attributes',
          'Simplifies queries and improves performance',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Star schema is a data warehouse design with a central fact table containing measures, surrounded by dimension tables with descriptive attributes, simplifying queries and improving performance.'
      },
      {
        question: 'Why do we need a date dimension?',
        options: [
          'Enables time-based analysis (week, month, quarter, year)',
          'Provides consistent date attributes across all fact tables',
          'Simplifies date calculations and reporting',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Date dimension provides consistent time-based attributes (week, month, quarter, fiscal year) across fact tables, enabling easier time-based analysis and reporting.'
      },
      {
        question: 'What fields should a date dimension contain?',
        options: [
          'Date key, calendar date, day of week, week number',
          'Month name, quarter, year, fiscal year, holidays flag',
          'All date-related attributes needed for reporting',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Date dimension should contain comprehensive date attributes including date key, calendar fields, week/month/quarter/year, fiscal periods, and business-specific attributes like holidays.'
      }
    ]
  },
  {
    title: 'Incremental Aggregation Tables',
    concepts: [
      'Incremental reporting',
      'Accumulative aggregates'
    ],
    tasks: [
      'Build daily summary',
      'Update only new days',
      'Merge into summary table',
      'Avoid full recomputation'
    ],
    interviewQuestions: [
      {
        question: 'What is incremental aggregation?',
        options: [
          'Updating aggregate tables with only new data instead of full recomputation',
          'Processing only delta changes since last run',
          'More efficient than recalculating entire aggregates',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Incremental aggregation processes only new or changed data to update aggregate tables, avoiding expensive full recomputation and improving performance.'
      },
      {
        question: 'What is MERGE used for?',
        options: [
          'Performing upsert operations (update existing, insert new)',
          'Efficiently updating aggregate tables with new data',
          'Avoiding duplicate records in summary tables',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'MERGE is used for upsert operations, efficiently updating existing records and inserting new ones, which is perfect for maintaining incremental aggregation tables.'
      },
      {
        question: 'How to implement incremental aggregation?',
        options: [
          'Track last processed date in control table',
          'Process only records after last processed date',
          'MERGE new aggregates into summary table',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Implement incremental aggregation by tracking last processed dates, filtering new records, and using MERGE to update summary tables efficiently.'
      }
    ]
  },
  {
    title: 'Data Masking (PII Protection)',
    concepts: [
      'Security & privacy',
      'Masking PII'
    ],
    tasks: [
      'Read customer data',
      'Mask email/phone numbers',
      'Create secure masked table',
      'Store original table separately'
    ],
    interviewQuestions: [
      {
        question: 'What is PII?',
        options: [
          'Personally Identifiable Information - data that can identify individuals',
          'Includes names, emails, phone numbers, SSN, addresses',
          'Requires protection under privacy regulations',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'PII (Personally Identifiable Information) is any data that can identify individuals, including names, emails, phone numbers, and requires protection under privacy laws.'
      },
      {
        question: 'How to mask data?',
        options: [
          'Replace sensitive characters with asterisks or X',
          'Use hash functions for irreversible masking',
          'Apply format-preserving masking to maintain data structure',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Data masking can use character replacement, hashing, or format-preserving techniques to protect sensitive information while maintaining data usability for testing.'
      },
      {
        question: 'Why separate original and masked tables?',
        options: [
          'Original data requires restricted access',
          'Masked data can be used for development/testing',
          'Compliance with data privacy regulations',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Separating original and masked tables ensures restricted access to sensitive data, enables safe use of masked data for testing, and helps comply with privacy regulations.'
      }
    ]
  },
  {
    title: 'Autoloader Streaming Ingestion',
    concepts: [
      'Databricks Autoloader',
      'Streaming ingestion',
      'Schema evolution'
    ],
    tasks: [
      'Configure Autoloader on a directory',
      'Read streaming files',
      'Handle schema changes automatically',
      'Write to Delta in Bronze layer'
    ],
    interviewQuestions: [
      {
        question: 'What is Autoloader?',
        options: [
          'Databricks feature for incremental file ingestion',
          'Automatically detects and processes new files in a directory',
          'Supports schema inference and evolution',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Autoloader is a Databricks feature that automatically detects and processes new files incrementally, with built-in support for schema inference and evolution.'
      },
      {
        question: 'Difference between batch and streaming?',
        options: [
          'Batch processes data in fixed intervals, streaming processes continuously',
          'Streaming provides lower latency, batch provides higher throughput',
          'Streaming handles real-time data, batch handles historical data',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Batch processing runs at fixed intervals with higher throughput, while streaming processes data continuously with lower latency for real-time use cases.'
      },
      {
        question: 'How does schema evolution work in Autoloader?',
        options: [
          'Autoloader can detect new columns automatically',
          'Uses mergeSchema option to add new columns',
          'Handles schema changes without breaking pipelines',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Autoloader supports schema evolution by automatically detecting new columns, using mergeSchema to add them, and handling schema changes gracefully without pipeline failures.'
      }
    ]
  },
  {
    title: 'Parameterized Databricks Jobs',
    concepts: [
      'Jobs',
      'Notebook parameters'
    ],
    tasks: [
      'Create Databricks Job',
      'Add parameters (date, env, file path)',
      'Schedule job',
      'Monitor job run history'
    ],
    interviewQuestions: [
      {
        question: 'How to pass parameters to notebook?',
        options: [
          'Use widgets: dbutils.widgets.get("param_name")',
          'Pass parameters when creating or running jobs',
          'Parameters can be strings, numbers, or dropdowns',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Pass parameters to notebooks using dbutils.widgets, configure them in job settings, and support various parameter types including strings, numbers, and dropdowns.'
      },
      {
        question: 'What is a Databricks Job?',
        options: [
          'A scheduled or triggered execution of notebooks or scripts',
          'Can run on a schedule or be triggered manually/API',
          'Provides monitoring, retry logic, and notifications',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Databricks Jobs are scheduled or triggered executions of notebooks/scripts with built-in monitoring, retry logic, and notification capabilities.'
      },
      {
        question: 'Why use parameterized jobs?',
        options: [
          'Reuse same notebook for different environments or dates',
          'Make pipelines flexible and configurable',
          'Enable dynamic file paths and processing dates',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Parameterized jobs enable code reuse across environments, make pipelines flexible and configurable, and allow dynamic values for dates, paths, and other variables.'
      }
    ]
  },
  {
    title: 'Metadata-Driven ETL Framework',
    concepts: [
      'Config tables',
      'Dynamic ETL',
      'Scalable ingestion'
    ],
    tasks: [
      'Create metadata table (source, target, schema, format)',
      'Write generic ingestion code',
      'Pipeline should dynamically ingest any file based on metadata',
      'Store logs in audit table'
    ],
    interviewQuestions: [
      {
        question: 'What is metadata-driven ETL?',
        options: [
          'ETL logic driven by configuration metadata rather than hardcoded',
          'Uses config tables to define source, target, and transformation rules',
          'Enables scalable and maintainable data pipelines',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Metadata-driven ETL uses configuration tables to define pipeline behavior, making it scalable, maintainable, and adaptable without code changes.'
      },
      {
        question: 'Why use config tables?',
        options: [
          'Centralize pipeline configuration',
          'Enable adding new sources without code changes',
          'Make pipelines more maintainable and scalable',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Config tables centralize configuration, enable adding new sources through metadata changes, and make pipelines more maintainable and scalable.'
      },
      {
        question: 'What should metadata table contain?',
        options: [
          'Source path, target path, file format, schema definition',
          'Transformation rules, validation rules, error handling',
          'Schedule information, environment settings',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Metadata tables should contain comprehensive configuration including source/target paths, formats, schemas, transformation rules, validation, and scheduling information.'
      }
    ]
  },
  {
    title: 'End-to-End Enterprise Data Platform',
    concepts: [
      'Everything together',
      'Enterprise architecture'
    ],
    tasks: [
      'Multi-source ingestion (CSV, JSON, API, Autoloader)',
      'DQ checks',
      'SCD implementation',
      'Bronze → Silver → Gold',
      'Aggregations & analytics',
      'Logging & auditing',
      'Develop Databricks Jobs',
      'Full pipeline orchestration'
    ],
    interviewQuestions: [
      {
        question: 'Explain full data pipeline architecture',
        options: [
          'Ingestion → Validation → Transformation → Aggregation → Reporting',
          'Bronze (raw) → Silver (cleaned) → Gold (aggregated) layers',
          'Includes DQ checks, SCD, logging, and orchestration',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Full data pipeline architecture includes multi-stage ingestion, validation, transformation through Bronze/Silver/Gold layers, with DQ checks, SCD, logging, and orchestration.'
      },
      {
        question: 'How do you build enterprise-grade ETL?',
        options: [
          'Implement error handling, logging, and monitoring',
          'Use Medallion architecture with proper data quality checks',
          'Include SCD, incremental processing, and audit trails',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Enterprise-grade ETL requires robust error handling, comprehensive logging, Medallion architecture, data quality checks, SCD implementation, incremental processing, and audit trails.'
      },
      {
        question: 'What components are essential for enterprise ETL?',
        options: [
          'Multi-source ingestion, data quality, and validation',
          'SCD for historical tracking, incremental processing',
          'Orchestration, monitoring, and audit logging',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Essential enterprise ETL components include multi-source ingestion, data quality checks, SCD implementation, incremental processing, orchestration, monitoring, and comprehensive audit logging.'
      }
    ]
  }
];

export default function AdvancedDatabricksProjectsPage() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({});
  const [showQuizResults, setShowQuizResults] = useState<{ [key: number]: boolean }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});

  const currentProject = advancedProjects[currentProjectIndex];
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
    if (currentProjectIndex < advancedProjects.length - 1) {
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
              className="mb-4 flex items-center text-red-400 hover:text-red-300 transition-colors"
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
              <span className="px-3 py-1 rounded-full text-sm font-semibold border bg-red-500/20 text-red-400 border-red-500/30">
                Project {currentProjectIndex + 1} of {advancedProjects.length}
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
                      <span className="text-lg font-bold text-red-400 mr-3">Q{qIndex + 1}:</span>
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
                          ? 'bg-red-500/20 border-red-500 text-red-300' 
                          : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-red-500 hover:bg-red-500/10 cursor-pointer';
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
                                <span className="text-red-400 text-sm font-semibold">Selected</span>
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
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-red-500/30"
                      >
                        Show Correct Answer
                      </button>
                    </div>
                  )}

                  {hasAnswered && question.explanation && (
                    <div className={`mt-4 p-4 rounded-lg ${
                      isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                    }`}>
                      <p className="text-sm text-gray-300">
                        <span className="font-semibold text-red-400">Explanation: </span>
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
            {currentProjectIndex < advancedProjects.length - 1 ? (
              <button
                onClick={handleNextProject}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-purple-600 transition-all duration-300"
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
            <span className="ml-4 px-3 py-1 rounded-full text-sm font-semibold border bg-red-500/20 text-red-400 border-red-500/30">
              Advanced
            </span>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Master expert-level Azure Databricks concepts with advanced projects. Build complex data pipelines, implement enterprise architectures, and architect scalable solutions.
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
          <span className="px-4 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg border border-red-500/30">
            Project {currentProjectIndex + 1} of {advancedProjects.length}
          </span>
          <button
            onClick={handleNextProject}
            disabled={currentProjectIndex === advancedProjects.length - 1}
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
              <span className="text-2xl font-bold text-red-400 mr-3">PROJECT {currentProjectIndex + 1}:</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{currentProject.title}</h2>
            </div>
          </div>

          {/* Concepts Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Concepts
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentProject.concepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm border border-red-500/30"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Tasks Roadmap */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-red-400 mb-6 flex items-center">
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
                              : 'bg-gray-700 border-gray-500 hover:border-red-400 hover:bg-gray-600'
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
                              : 'bg-gray-700/50 border-gray-600 hover:border-red-500/50'
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
                  ? 'bg-gradient-to-r from-red-500 to-purple-500 text-white hover:from-red-600 hover:to-purple-600 shadow-lg shadow-red-500/30 hover:scale-105'
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

