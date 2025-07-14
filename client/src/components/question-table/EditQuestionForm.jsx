import React from "react";
import QuestionForm from "../question-form/QuestionForm";

const EditQuestionForm = ({
  formData,
  onQuestionChange,
  onOptionChange,
  onCorrectAnswerSelect,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Edit Question
      </h3>
      <QuestionForm
        formData={formData}
        onQuestionChange={onQuestionChange}
        onOptionChange={onOptionChange}
        onCorrectAnswerSelect={onCorrectAnswerSelect}
        onSubmit={onSubmit}
        onCancel={onCancel}
        submitButtonText="Save Changes"
      />
    </div>
  );
};

export default EditQuestionForm;
