import express from 'express';
import {validateInput} from '../validator';
import { Authentication } from './authController';

const router = express.Router();
const { createAccount } = Authentication;
router.post(
	'/register',
	validateInput('register'),
	createAccount
);

export default router;
