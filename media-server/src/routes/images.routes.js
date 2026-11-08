import { Router } from 'express';
import { serveImage } from '../controllers/images.controller.js';

export const imagesRouter = Router();

imagesRouter.get('/:kind/:size/:name', serveImage);
