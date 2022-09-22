import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.route('/register').post(userController.createUser); // http://localhost:3000/users/register adres bu olacak.
router.route('/login').post(userController.loginUser);

export default router;
