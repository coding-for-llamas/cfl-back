import express, { Express } from 'express';
import inquiry from './model/inquiry';

const router = express.Router();

export default function route(app: Express): void {
  app.use(router);
  router.use('/inquiry', inquiry);
}
