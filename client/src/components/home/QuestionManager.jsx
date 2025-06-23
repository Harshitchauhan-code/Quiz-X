import React, { useState } from 'react';
import AddQuestion from '../add-question/AddQuestion';
import QuestionTable from '../question-table/QuestionTable';

const QuestionManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div>
      {!isEditing && <AddQuestion />}
      
      <QuestionTable setIsEditing={setIsEditing} />
    </div>
  );
};

export default QuestionManager;