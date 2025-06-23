import React from 'react';
import HomeHeader from './HomeHeader';
import StartQuizButton from './StartQuizButton';

const HomeActions = () => {
  return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
      <HomeHeader title="Quiz Questions" />
      <StartQuizButton />
    </div>
  );
};

export default HomeActions;