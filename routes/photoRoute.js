import express from 'express';
import * as photoController from '../controllers/photoController.js';

const router = express.Router();

router
    .route('/')
    .post(photoController.createPhoto)
    .get(photoController.getAllPhotos); // post isteği yapıyoruz route('/') -> /photos/  buna denk geliyor aslında

export default router;
