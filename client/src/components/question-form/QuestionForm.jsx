import React from "react";
import OptionItem from "./OptionItem";
import FormActions from "./FormActions";

const QuestionForm = ({
  formData,
  onQuestionChange,
  onOptionChange,
  onCorrectAnswerSelect,
  onSubmit,
  onCancel,
  submitButtonText = "Save Question",
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.question.trim()) {
      alert("Please enter a question");
      return;
    }

    if (formData.options.some((option) => !option.trim())) {
      alert("Please fill in all options");
      return;
    }

    if (!formData.correctAnswer) {
      alert("Please select a correct answer");
      return;
    }

    // Submit the form
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="question"
        >
          Question
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={onQuestionChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your question"
          required
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-700 font-medium">Options</label>
          <span className="text-sm text-gray-600 font-medium">
            Select Correct Answer
          </span>
        </div>

        {formData.options.map((option, index) => (
          <OptionItem
            key={index}
            option={option}
            index={index}
            isCorrect={formData.correctAnswer === option}
            onChange={(value) => onOptionChange(index, value)}
            onSelectCorrect={() => onCorrectAnswerSelect(option)}
          />
        ))}
      </div>

      <FormActions onCancel={onCancel} submitButtonText={submitButtonText} />
    </form>
  );
};

export default QuestionForm;
