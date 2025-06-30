import React from 'react';
import StatusToggle from './StatusToggle';
import ActionButtons from './ActionButtons';
import QuestionOptions from './QuestionOptions';

const QuestionTableRow = ({ 
  question, 
  index, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {question.question}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        <QuestionOptions options={question.options} />
      </td>
      <td className="px-6 py-4 text-sm text-green-600 font-medium">
        {question.correctAnswer}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <StatusToggle 
          status={question.status} 
          onToggle={() => onToggleStatus(question._id)} 
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <ActionButtons 
          onEdit={() => onEdit(question)} 
          onDelete={() => onDelete(question._id)}
          isDeleted={question.status === 'Deleted'}
        />
      </td>
    </tr>
  );
};

export default QuestionTableRow;