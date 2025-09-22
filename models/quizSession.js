import mongoose from "mongoose";

const QuizSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  quizId: { type: String, required: true },
  users: { type: [String], default: [] },
  state: { type: String, default: "waiting" }, // waiting, running, finished
  currentQuestion: { type: Number, default: 0 },
  scores: { type: Map, of: Number, default: {} },
  answers: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
  startedAt: { type: Date, default: Date.now },
});

const QuizSession = mongoose.model("QuizSession", QuizSessionSchema);

export default QuizSession;
