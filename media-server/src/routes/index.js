// Route table for the media server.
import { Router } from 'express';
import { videosRouter } from './videos.routes.js';
import { imagesRouter } from './images.routes.js';

export const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/videos', videosRouter);
router.use('/images', imagesRouter);
