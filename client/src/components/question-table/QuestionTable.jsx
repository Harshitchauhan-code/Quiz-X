import React, { useState, useEffect } from "react";
import { useQuiz } from "../../context/QuizContext";
import QuestionTableHeader from "./QuestionTableHeader";
import QuestionTableRow from "./QuestionTableRow";
import EditQuestionForm from "./EditQuestionForm";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import StatusFilter from "./StatusFilter";

const QuestionTable = ({ setIsEditing }) => {
  const { questions, editQuestion, deleteQuestion, toggleQuestionStatus } =
    useQuiz();
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const questionsPerPage = 5;

  // Filter questions by status
  const filteredQuestions =
    selectedStatus === "all"
      ? questions
      : questions.filter((question) => question.status === selectedStatus);

  // Calculate pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  useEffect(() => {
    // Notify parent component about editing state
    if (setIsEditing) {
      setIsEditing(!!editingQuestion);
    }
  }, [editingQuestion, setIsEditing]);

  const handleEdit = (question) => {
    setEditingQuestion(question._id);
    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
    });
  };

  const handleQuestionChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({
      ...formData,
      options: newOptions,
    });
  };

  const handleCorrectAnswerSelect = (option) => {
    setFormData({
      ...formData,
      correctAnswer: option,
    });
  };

  const handleSubmit = () => {
    // Update the question
    editQuestion(editingQuestion, formData);

    // Reset form and editing state
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setEditingQuestion(null);
  };

  const handleCancel = () => {
    setEditingQuestion(null);
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      deleteQuestion(id);

      // Adjust current page if needed after deletion
      if (currentQuestions.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Show empty state if there are no questions or no questions match the filter
  if (questions.length === 0 || filteredQuestions.length === 0) {
    return (
      <EmptyState
        hasQuestions={questions.length > 0}
        filteredStatus={selectedStatus}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {editingQuestion && (
        <EditQuestionForm
          formData={formData}
          onQuestionChange={handleQuestionChange}
          onOptionChange={handleOptionChange}
          onCorrectAnswerSelect={handleCorrectAnswerSelect}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="p-4 border-b border-gray-200">
        <StatusFilter
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <QuestionTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {currentQuestions.map((question, index) => (
              <QuestionTableRow
                key={question._id}
                question={question}
                index={indexOfFirstQuestion + index + 1}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={toggleQuestionStatus}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default QuestionTable;
