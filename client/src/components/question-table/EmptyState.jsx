import React from "react";
import StatusFilter from "./StatusFilter";

const EmptyState = ({
  hasQuestions,
  filteredStatus,
  selectedStatus,
  onStatusChange,
}) => {
  let message = "No questions added yet. Add your first question above!";

  if (hasQuestions) {
    message = `No ${
      filteredStatus !== "all" ? filteredStatus : ""
    } questions found with the current filter.`;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {hasQuestions && (
        <div className="p-4 border-b border-gray-200">
          <StatusFilter
            selectedStatus={selectedStatus}
            onStatusChange={onStatusChange}
          />
        </div>
      )}
      <div className="text-center p-8">
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;
