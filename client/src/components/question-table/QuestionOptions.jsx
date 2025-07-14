import React from "react";

const QuestionOptions = ({ options }) => {
  return (
    <ul className="list-disc pl-5 space-y-1">
      {options.map((option, i) => (
        <li key={i}>{option}</li>
      ))}
    </ul>
  );
};

export default QuestionOptions;
