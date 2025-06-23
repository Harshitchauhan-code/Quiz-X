import React from 'react';
import HomeActions from '../components/home/HomeActions';
import QuestionManager from '../components/home/QuestionManager';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <HomeActions />
      <QuestionManager />
    </div>
  );
};

export default Home;