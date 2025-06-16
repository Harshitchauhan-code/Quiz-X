import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/questions`);
    if (response.data && response.data.length > 0) {
      return { data: response.data, error: null };
    } else {
      return {
        data: [],
        error:
          "No questions found in the database. Please add some questions first.",
      };
    }
  } catch (err) {
    console.error("Error fetching questions:", err);
    let errorMessage = "Failed to fetch questions. Please try again later.";

    if (err.code === "ECONNREFUSED" || err.message.includes("Network Error")) {
      errorMessage =
        "Unable to connect to the server. Please make sure the server is running.";
    }

    return { data: [], error: errorMessage };
  }
};

export const toggleQuestionStatus = async (questionId) => {
  try {
    const response = await axios.patch(
      `${API_URL}/questions/${questionId}/status`
    );
    return { data: response.data, error: null };
  } catch (err) {
    console.error("Error updating question status:", err);
    return { data: null, error: "Failed to update question status" };
  }
};
