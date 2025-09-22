
import QuizSessionManager from "../QuizSessionManager.js";
import Quiz from "../models/quizSchema.js";
export const createSession = async (req, res) => {
  const { sessionId, quizId } = req.body;
  if (!sessionId || !quizId) return res.status(400).json({ error: 'sessionId and quizId required' });
  // Check if quiz exists
  const quiz = await Quiz.findById(quizId);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found for given quizId' });
  const created = await QuizSessionManager.createSession(sessionId, quizId);
  if (!created) return res.status(409).json({ error: 'Session already exists' });
  res.json({ sessionId, quizId, created: true });
};

export const joinSession = async (req, res) => {
  const { sessionId, userId } = req.body;
  if (!sessionId || !userId) return res.status(400).json({ error: 'sessionId and userId required' });
  const joined = await QuizSessionManager.joinSession(sessionId, userId);
  if (!joined) return res.status(404).json({ error: 'Session not found' });
  res.json({ sessionId, userId, joined: true });
};

export const leaveSession = async (req, res) => {
  const { sessionId, userId } = req.body;
  if (!sessionId || !userId) return res.status(400).json({ error: 'sessionId and userId required' });
  const left = await QuizSessionManager.leaveSession(sessionId, userId);
  if (!left) return res.status(404).json({ error: 'Session not found' });
  res.json({ sessionId, userId, left: true });
};

export const submitAnswer = async (req, res) => {
  const { sessionId, userId, answer } = req.body;
  if (!sessionId || !userId || answer === undefined) return res.status(400).json({ error: 'sessionId, userId, and answer required' });
  const submitted = await QuizSessionManager.submitAnswer(sessionId, userId, answer);
  if (!submitted) return res.status(404).json({ error: 'Session not found' });
  res.json({ sessionId, userId, answer, submitted: true });
};

export const getSession = async (req, res) => {
  const { sessionId } = req.params;
  const session = await QuizSessionManager.getSession(sessionId);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json(session);
};

export const endSession = async (req, res) => {
  const { sessionId } = req.params;
  const ended = await QuizSessionManager.endSession(sessionId);
  if (!ended) return res.status(404).json({ error: 'Session not found' });
  res.json({ sessionId, ended: true });
};
