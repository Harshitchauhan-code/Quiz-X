/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Fade,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  PlayArrow as PlayArrowIcon,
  Add as AddIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

// Import API functions
import {
  fetchQuestions,
  toggleQuestionStatus,
  deleteQuestion,
  addQuestion,
  updateQuestion,
} from "../api/quizApi";

// Import components
import AppHeader from "../components/AppHeader";
import LoadingState from "../components/LoadingState";
import QuestionsTable from "../components/QuestionsTable";
import ErrorDisplay from "../components/ErrorDisplay";

function Home() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    status: "Active",
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const { data, error } = await fetchQuestions();
      if (error) {
        setError(error);
        return;
      }
      setQuestions(data);
    } catch (error) {
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (questionId) => {
    try {
      const { data, error } = await toggleQuestionStatus(questionId);
      if (error) {
        setError(error);
        return;
      }
      setQuestions(
        questions.map((q) =>
          q._id === questionId ? { ...q, status: data.status } : q
        )
      );
    } catch (error) {
      setError("Failed to update question status");
    }
  };

  const handleStartQuiz = () => {
    const activeQuestions = questions.filter((q) => q.status === "Active");
    if (activeQuestions.length === 0) {
      setError("No active questions available to start the quiz");
      return;
    }
    // Store active questions in sessionStorage for quiz page
    sessionStorage.setItem("quizQuestions", JSON.stringify(activeQuestions));
    navigate("/quiz");
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const { error } = await deleteQuestion(questionId);
      if (error) {
        setError(error);
        return;
      }
      setQuestions(questions.filter((q) => q._id !== questionId));
    } catch (error) {
      setError("Failed to delete question");
    }
  };

  const handleEditQuestion = (question) => {
    setIsEditing(true);
    setCurrentQuestion(question);
    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      status: question.status,
    });
    setOpenDialog(true);
  };

  const handleSaveQuestion = async () => {
    try {
      if (isEditing && currentQuestion) {
        // Update existing question
        const { data, error } = await updateQuestion(currentQuestion._id, formData);
        if (error) {
          setError(error);
          return;
        }
        setQuestions(
          questions.map((q) => (q._id === currentQuestion._id ? data : q))
        );
      } else {
        // Add new question
        const { data, error } = await addQuestion(formData);
        if (error) {
          setError(error);
          return;
        }
        setQuestions([data, ...questions]);
      }
      
      // Reset form
      setFormData({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        status: "Active",
      });
      setIsEditing(false);
      setCurrentQuestion(null);
      setOpenDialog(false);
    } catch (error) {
      setError(isEditing ? "Failed to update question" : "Failed to add question");
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const activeQuestions = questions.filter(
    (q) => isAdmin || q.status === "Active"
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <AppHeader isAdmin={isAdmin} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Fade in={loading}>
            <Box>
              <LoadingState />
            </Box>
          </Fade>
        ) : (
          <>
            <ErrorDisplay error={error} onRetry={loadQuestions} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                gap: 2,
                flexWrap: "wrap", 
              }}
            >
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleStartQuiz}
                  startIcon={<PlayArrowIcon />}
                  disabled={
                    questions.filter((q) => q.status === "Active").length === 0
                  }
                  sx={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    },
                  }}
                >
                  Start Quiz
                </Button>
                {isAdmin && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      setIsEditing(false);
                      setCurrentQuestion(null);
                      setFormData({
                        question: "",
                        options: ["", "", "", ""],
                        correctAnswer: "",
                        status: "Active",
                      });
                      setOpenDialog(true);
                    }}
                    startIcon={<AddIcon />}
                    sx={{
                      background:
                        "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                      },
                    }}
                  >
                    Add Question
                  </Button>
                )}
              </Box>
            </Box>

            <QuestionsTable
              questions={activeQuestions}
              isAdmin={isAdmin}
              onStatusToggle={handleStatusToggle}
              onDeleteQuestion={handleDeleteQuestion}
              onEditQuestion={handleEditQuestion}
            />

            <Dialog
              open={openDialog}
              onClose={() => {
                setOpenDialog(false);
                setIsEditing(false);
                setCurrentQuestion(null);
              }}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle sx={{ fontWeight: 600 }}>
                {isEditing ? "Edit Question" : "Add New Question"}
              </DialogTitle>
              <DialogContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mt: 2,
                  }}
                >
                  <TextField
                    label="Question"
                    fullWidth
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        question: e.target.value,
                      })
                    }
                  />
                  {formData.options.map((option, index) => (
                    <TextField
                      key={index}
                      label={`Option ${index + 1}`}
                      fullWidth
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                    />
                  ))}
                  <FormControl fullWidth>
                    <InputLabel>Correct Answer</InputLabel>
                    <Select
                      value={formData.correctAnswer}
                      label="Correct Answer"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          correctAnswer: e.target.value,
                        })
                      }
                    >
                      {formData.options.map((option, index) => (
                        <MenuItem key={index} value={option} disabled={!option}>
                          {option || `Option ${index + 1} (empty)`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button 
                  onClick={() => {
                    setOpenDialog(false);
                    setIsEditing(false);
                    setCurrentQuestion(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveQuestion}
                  disabled={
                    !formData.question ||
                    formData.options.some((opt) => !opt) ||
                    !formData.correctAnswer
                  }
                  startIcon={isEditing ? <EditIcon /> : <AddIcon />}
                >
                  {isEditing ? "Update Question" : "Add Question"}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Container>
    </Box>
  );
}

export default Home;
