import express from 'express';
// import raven from 'raven';
import benefit from './benefit.routes';
import { pageNotFoundMiddleware, errorMiddleware } from '../components/errors';

const router = express.Router();

router.use('/benefit', benefit);

router.use(pageNotFoundMiddleware);
// router.use(raven.middleware.express.errorHandler(sentryClient));
router.use(errorMiddleware);

export default router;
