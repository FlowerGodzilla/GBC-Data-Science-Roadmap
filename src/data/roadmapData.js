export const initialRoadmap = [
  {
    id: 'repo-1',
    name: 'mathematical-foundations',
    difficulty: 'Medium',
    description: 'Focus: Linear Algebra, Statistics, Probabilities',
    issues: [
      { id: 'i1-1', title: 'Linear Algebra Refresher', description: 'Vectors, matrices, eigenvalues', difficulty: 'Medium', state: 'unstarted' },
      { id: 'i1-2', title: 'Probability Theory', description: 'Distributions, Bayes Theorem', difficulty: 'Medium', state: 'unstarted' },
      { id: 'i1-3', title: 'Statistical Inference', description: 'Hypothesis testing, p-values', difficulty: 'Hard', state: 'unstarted' },
    ]
  },
  {
    id: 'repo-2',
    name: 'programming-and-data-wrangling',
    difficulty: 'Easy',
    description: 'Focus: Python, SQL, Pandas/NumPy pipelines',
    issues: [
      { id: 'i2-1', title: 'Python Basics & Data Structures', description: 'Lists, dicts, OOP', difficulty: 'Easy', state: 'unstarted' },
      { id: 'i2-2', title: 'SQL & Database Queries', description: 'Joins, aggregations, CTEs', difficulty: 'Easy', state: 'unstarted' },
      { id: 'i2-3', title: 'Pandas & NumPy', description: 'Dataframes, vectorization', difficulty: 'Medium', state: 'unstarted' },
    ]
  },
  {
    id: 'repo-3',
    name: 'machine-learning-production',
    difficulty: 'Hard',
    description: 'Focus: Scikit-Learn, XGBoost, MLOps, Containerization',
    issues: [
      { id: 'i3-1', title: 'Supervised Learning', description: 'Regression, classification models', difficulty: 'Medium', state: 'unstarted' },
      { id: 'i3-2', title: 'Advanced Ensembles', description: 'XGBoost, LightGBM', difficulty: 'Hard', state: 'unstarted' },
      { id: 'i3-3', title: 'Model Deployment', description: 'Docker, FastAPI, MLflow', difficulty: 'Hard', state: 'unstarted' },
    ]
  }
];
