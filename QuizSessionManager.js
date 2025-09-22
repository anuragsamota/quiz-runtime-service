// QuizSessionManager.js
// Handles quiz sessions, user connections, and persistent state in MongoDB

import QuizSession from "./models/quizSession.js";

class QuizSessionManager {
  async createSession(sessionId, quizId) {
    const exists = await QuizSession.findOne({ sessionId });
    if (exists) return false;
    await QuizSession.create({ sessionId, quizId });
    return true;
  }

  async joinSession(sessionId, userId) {
    const session = await QuizSession.findOne({ sessionId });
    if (!session) return false;
    if (!session.users.includes(userId)) {
      session.users.push(userId);
      await session.save();
    }
    return true;
  }

  async leaveSession(sessionId, userId) {
    const session = await QuizSession.findOne({ sessionId });
    if (!session) return false;
    session.users = session.users.filter(u => u !== userId);
    await session.save();
    return true;
  }

  async submitAnswer(sessionId, userId, answer) {
    const session = await QuizSession.findOne({ sessionId });
    if (!session) return false;
    session.answers.set(userId, answer);
    await session.save();
    return true;
  }

  async getSession(sessionId) {
    return QuizSession.findOne({ sessionId });
  }

  async endSession(sessionId) {
    const res = await QuizSession.deleteOne({ sessionId });
    return res.deletedCount > 0;
  }
}

export default new QuizSessionManager();
