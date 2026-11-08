import { Router } from 'express';
import { verifySignature } from '../middlewares/verifySignature.js';
import { streamVideo } from '../controllers/videos.controller.js';

export const videosRouter = Router();

videosRouter.get('/:slug', verifySignature, streamVideo);
