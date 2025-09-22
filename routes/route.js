import express from "express";
import {
	createSession,
	joinSession,
	leaveSession,
	submitAnswer,
	getSession,
	endSession
} from "../controllers/sessionController.js";

const router = express.Router();

// Session management endpoints
router.post('/api/session', createSession);
router.post('/api/session/join', joinSession);
router.post('/api/session/leave', leaveSession);
router.post('/api/session/answer', submitAnswer);
router.get('/api/session/:sessionId', getSession);
router.delete('/api/session/:sessionId', endSession);

export default router;
