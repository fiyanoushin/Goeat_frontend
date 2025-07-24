import React from 'react';

const Stats = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-2xl text-center border hover:shadow-lg transition-all">
      <div className="text-4xl mb-2">{icon}</div>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default Stats;
