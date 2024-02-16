import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import httpStatus from 'http-status';
import compression from 'compression';

import { COMPRESSION_LEVEL, COMPRESSION_THRESHOLD } from './common/constants/index.js';
import { errorHandler } from './common/middlewares/index.js';
import apiRouter from './router.js';
import docsRouter from './docs-router.js';
// import listEndpoints from 'express-list-endpoints';

const { NOT_FOUND } = httpStatus;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(compression({ level: COMPRESSION_LEVEL, threshold: COMPRESSION_THRESHOLD }));

// TODO: replace v0 to be added automatically based on the actual version of the endpoint
app.use('/api/v0', apiRouter);

app.use(docsRouter);

app.use(errorHandler);

// If requested endpoint is not found then reply with not found
app.use((req, res) => { res.status(NOT_FOUND).json({ message: `Cannot ${req.method} ${req.originalUrl}` }); });

// TODO: remove this debug log
// console.log(listEndpoints(app));

export default app;
