import express from 'express';
import { runCode, submitCode } from '../../../../controllers/judge/judge-controller.js';

export const judgeRoutes = express.Router();

judgeRoutes.post('/run', runCode);
judgeRoutes.post('/submit', submitCode);