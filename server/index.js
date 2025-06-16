import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from './routes/questions.js';
import questions from './seed.js';
import Question from './models/Question.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003; // Using 5002 as default since 5000 is in use

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use('/api/questions', questionRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    // Seed data if the database is empty
    const count = await Question.countDocuments();
    if (count === 0) {
      await Question.insertMany(questions);
      console.log('Database seeded with questions');
    }
  })
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
