import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentDetailsForm from "../components/quiz/StudentDetailsForm";

const StudentDetailsPage = () => {
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState(null);

  const handleSubmit = (details) => {
    setStudentDetails(details);
    // Save to localStorage or context if needed
    localStorage.setItem("studentDetails", JSON.stringify(details));
    navigate("/quiz");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <StudentDetailsForm onSubmit={handleSubmit} />
    </div>
  );
};

export default StudentDetailsPage;
