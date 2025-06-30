# Quiz-X Application Documentation

## Overview
Quiz-X is a web-based quiz application that allows users to take quizzes, view results, and manage questions. The application is built with a modern React stack, using Vite for development and Tailwind CSS for styling. It provides a clean, responsive UI and a modular codebase for easy maintenance and extension.

## Technologies Used
- **React 19**: Core UI library for building interactive user interfaces.
- **React Router DOM 7**: Handles client-side routing for navigation between pages.
- **Vite**: Fast development server and build tool.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

## Application Structure
- **src/App.jsx**: Main application component. Sets up routing and context providers.
- **src/main.jsx**: Entry point. Renders the App component.
- **src/context/QuizContext.jsx**: Provides global state management for quiz data.
- **src/data/questions.js**: Contains the quiz questions data.
- **src/pages/**: Contains main page components:
  - `Home.jsx`: Home page for quiz management and starting a quiz.
  - `Quiz.jsx`: Quiz-taking interface.
  - `Result.jsx`: Displays quiz results and analytics.
- **src/components/**: Contains reusable UI components, organized by feature:
  - **Header/Footer**: App header and footer.
  - **add-question/**: Components for adding new questions.
  - **home/**: Home page actions and question management.
  - **question-form/**: Components for creating and editing questions.
  - **question-table/**: Table and controls for listing and managing questions.
  - **quiz/**: Components for quiz navigation and answering questions.
  - **result/**: Components for displaying detailed quiz results.

## Core Functionalities

### 1. Home Page
- **Displays all quiz questions** in a table format.
- **Add Question**: Button and form to add new quiz questions.
- **Edit/Delete Question**: Edit and remove existing questions.
- **Status Filter**: Filter questions by their status (active/inactive/deleted).
- **Pagination**: Navigate through multiple pages of questions if present.
- **Start Quiz**: Button to begin a new quiz session.

### 2. Quiz Flow
- **Quiz Header**: Shows quiz progress and navigation.
- **Quiz Navigation**: Move between questions during the quiz.
- **Quiz Question**: Displays the current question and options.
- **Quiz Options**: Select an answer for each question.
- **Submit Quiz**: Complete the quiz and view results.

### 3. Results Page
- **Result Summary**: Shows overall quiz performance (score, correct/incorrect count).
- **Result Question List**: List of all questions with user answers and correct answers.
- **Result Detailed Question**: Detailed view for each question, showing selected and correct options.
- **Result Filters**: Filter results by correctness or other criteria.
- **Result Navigation**: Move between detailed results for each question.

### 4. Question Management
- **Add/Edit/Delete Questions**: Full CRUD operations for quiz questions.
- **Status Toggle**: Activate or deactivate questions.
- **Option Management**: Add, edit, or remove options for each question.

## Routing
- `/` - Home page (question management, start quiz)
- `/quiz` - Quiz interface
- `/result` - Results and analytics

## Styling
- **Tailwind CSS** is used for all layout and styling.

## State Management
- **QuizContext** provides global state for quiz questions, user answers, and quiz progress.

## Build & Development
- **Development**: `npm run dev` (starts Vite dev server)
- **Build**: `npm run build` (builds for production)
- **Lint**: `npm run lint` (runs ESLint)

## Summary
Quiz-X is a feature-rich quiz application with a focus on usability and maintainability. All features described above are implemented in the codebase. No extraneous or unimplemented features are documented here.
