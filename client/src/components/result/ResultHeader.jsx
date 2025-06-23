import React from 'react';

const ResultHeader = ({ title }) => {
  return (
    <div className="bg-blue-600 text-white p-4">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
};

export default ResultHeader;