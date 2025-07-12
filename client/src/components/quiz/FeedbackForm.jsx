import React, { useState } from "react";

const FeedbackForm = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit({ feedback, rating });
  };

  if (submitted) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Thank you for your feedback!
        </h2>
        <p className="text-gray-700">
          Your feedback helps us improve the quiz experience.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 mt-8"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        We value your feedback!
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          How would you rate your quiz experience?
        </label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((val) => (
            <option key={val} value={val}>
              {val} -{" "}
              {
                ["Excellent", "Good", "Average", "Below Average", "Poor"][
                  5 - val
                ]
              }
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Additional comments:</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Let us know what you liked or what can be improved..."
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
