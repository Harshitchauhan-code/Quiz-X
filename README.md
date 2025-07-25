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
  - `StudentDetailsPage.jsx`: Page to collect student details before starting the quiz.
  - `Quiz.jsx`: Quiz-taking interface.
  - `Result.jsx`: Displays quiz results and analytics.
- **src/components/**: Contains reusable UI components, organized by feature:
  - **Header/Footer**: App header and footer.
  - **add-question/**: Components for adding new questions.
  - **home/**: Home page actions and question management.
  - **question-form/**: Components for creating and editing questions.
  - **question-table/**: Table and controls for listing and managing questions.
  - **quiz/**: Components for quiz navigation, answering questions, feedback, and student details forms.
  - **result/**: Components for displaying detailed quiz results.

## Core Functionalities

### 1. Home Page
- **Displays all quiz questions** in a table format.
- **Add Question**: Button and form to add new quiz questions.
- **Edit/Delete Question**: Edit and remove existing questions.
- **Status Filter**: Filter questions by their status (active/inactive/deleted).
- **Pagination**: Navigate through multiple pages of questions if present.
- **Start Quiz**: Button to begin a new quiz session. Redirects to the student details form.

### 2. Student Details Page
- **Student Details Form**: Before starting the quiz, users must fill out a form with their name, age, and interest (dropdown).
- **Validation**: All fields are required. The quiz cannot be started without submitting valid details.

### 3. Quiz Flow
- **Quiz Header**: Shows quiz progress and navigation.
- **Quiz Navigation**: Move between questions during the quiz.
- **Quiz Question**: Displays the current question and options.
- **Quiz Options**: Select an answer for each question.
- **Submit Quiz**: Complete the quiz and view results. Users must attempt all questions to submit.
- **Instruction Message**: A message above the quiz card reminds users to attempt all questions before submitting.

### 4. Feedback Form (After Quiz Submission)
- **Feedback Form**: After submitting the quiz, users are prompted to provide feedback on their quiz experience.
- **Fields**: Includes a rating (dropdown) and a comment/suggestion box.
- **Validation**: Feedback can be submitted only if all required fields are filled, or the user can choose to skip feedback.
- **Skip Option**: Users can skip the feedback form and proceed directly to the results page.

### 5. Results Page
- **Result Summary**: Shows overall quiz performance (score, correct/incorrect count).
- **Result Question List**: List of all questions with user answers and correct answers.
- **Result Detailed Question**: Detailed view for each question, showing selected and correct options.
- **Result Filters**: Filter results by correctness or other criteria.
- **Result Navigation**: Move between detailed results for each question.

### 6. Question Management
- **Add/Edit/Delete Questions**: Full CRUD operations for quiz questions.
- **Status Toggle**: Activate or deactivate questions.
- **Option Management**: Add, edit, or remove options for each question.

## Routing
- `/` - Home page (question management, start quiz)
- `/student-details` - Student details form (required before quiz)
- `/quiz` - Quiz interface
- `/result` - Results and analytics

## Styling
- **Tailwind CSS** is used for all layout and styling.

## State Management
- **QuizContext** provides global state for quiz questions, user answers, and quiz progress.
- **Student details** are stored in localStorage and required before quiz access.

## Build & Development
- **Development**: `npm run dev` (starts Vite dev server)
- **Build**: `npm run build` (builds for production)
- **Lint**: `npm run lint` (runs ESLint)

## Summary
Quiz-X is a feature-rich quiz application with a focus on usability and maintainability. All features described above are implemented in the codebase, including the student details form and feedback form. No extraneous or unimplemented features are documented here.



