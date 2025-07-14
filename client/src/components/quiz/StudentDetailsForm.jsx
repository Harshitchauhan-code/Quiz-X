import React, { useState } from "react";

const interests = ["Science", "Mathematics", "History", "Technology"];

const StudentDetailsForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!age || isNaN(age) || age < 1) newErrors.age = "Valid age is required";
    if (!interest) newErrors.interest = "Please select an interest";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({ name, age, interest });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 mt-8"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Enter Your Details
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Age</label>
        <input
          type="number"
          min="1"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
        />
        {errors.age && (
          <p className="text-red-500 text-xs mt-1">{errors.age}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Interest:</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        >
          <option value="">Select an interest</option>
          {interests.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.interest && (
          <p className="text-red-500 text-xs mt-1">{errors.interest}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Start Quiz
      </button>
    </form>
  );
};

export default StudentDetailsForm;
