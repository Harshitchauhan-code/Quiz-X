import React, { useEffect } from "react";
import HomeActions from "../components/home/HomeActions";
import QuestionManager from "../components/home/QuestionManager";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("studentDetails");
  }, []);

  const handleStartQuiz = () => {
    navigate("/student-details");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <HomeActions />
      <QuestionManager />
      <div className="flex justify-center mt-8">
        <button
          onClick={handleStartQuiz}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
