import express from 'express';
import * as pageController from '../controllers/pageController.js';

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(pageController.getRegisterPage);
router.route('/login').get(pageController.getLoginPage);
router.route('/logout').get(pageController.getLogoutPage);
router
    .route('/contact')
    .get(pageController.getContactPage)
    .post(pageController.sendMail);

export default router;
