import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import archievesUploadConfig from '@config/archievesUpload';
import globalExceptionHandler from '@shared/infra/http/middlewares/globalExceptionHandler';

import { errors } from 'celebrate';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/photos', express.static(archievesUploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use(globalExceptionHandler);

app.listen(3333, () => {
  console.log('🛸 Server started on port 3333!');
});
