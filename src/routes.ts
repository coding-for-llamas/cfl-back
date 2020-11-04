import express from 'express';
import inquiry from './model/inquiry';

const router = express.Router();

export default function route(app: any) {
  app.use(router);
  router.use('/inquiry', inquiry);
}
