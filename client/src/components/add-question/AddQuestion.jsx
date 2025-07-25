import React, { useState } from "react";
import { useQuiz } from "../../context/QuizContext";
import AddQuestionButton from "./AddQuestionButton";
import QuestionForm from "../question-form/QuestionForm";
import StatusDropdown from "./StatusDropdown";

const AddQuestion = () => {
  const { addQuestion } = useQuiz();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    status: "Active",
  });

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

  const handleStatusChange = (status) => {
    setFormData({
      ...formData,
      status,
    });
  };

  const handleSubmit = () => {
    // Add the question
    addQuestion({
      ...formData,
      // ID is generated in the addQuestion function in QuizContext
    });

    // Reset form
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      status: "Active",
    });

    // Hide form
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    // Reset form
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      status: "Active",
    });
  };

  return (
    <div className="mb-8">
      {!showForm ? (
        <AddQuestionButton onClick={() => setShowForm(true)} />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Question
          </h3>
          <div className="mb-4">
            <StatusDropdown
              selectedStatus={formData.status}
              onStatusChange={handleStatusChange}
            />
          </div>
          <QuestionForm
            formData={formData}
            onQuestionChange={handleQuestionChange}
            onOptionChange={handleOptionChange}
            onCorrectAnswerSelect={handleCorrectAnswerSelect}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Save Question"
          />
        </div>
      )}
    </div>
  );
};

export default AddQuestion;
