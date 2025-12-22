// This is a common schema for all 
import express, { response } from 'express';
import {doLogin, doRegister} from '../../../../controllers/user/user-controller.js';
import { validation } from '../../../../utils/middlewares/validation-middleware.js';
import { registerSchema } from '../../../../validations/user-validation.js';
import { loginSchema } from '../../../../validations/user-validation.js';
import { authenticate } from '../../../../utils/middlewares/authenticate-middleware.js';
import { checkRole } from '../../../../utils/middlewares/authorization-middleware.js';

export const userRoutes = express.Router();
userRoutes.post('/register', validation(registerSchema), doRegister);
userRoutes.post('/login', validation(loginSchema), doLogin);
userRoutes.get('/teacher/dashboard', authenticate, checkRole('teacher'), (request, response) => {
    response.json({message: 'Welcome to the Teachers DashBoard', user : request.userInfo});
});

userRoutes.get('/student/dashboard', authenticate, checkRole('student'), (request, response) => {
    response.json({message: 'Welcome to the Student DashBoard', user : request.userInfo});
});