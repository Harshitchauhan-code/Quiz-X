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
    </div>
  );
};

export default Home;
