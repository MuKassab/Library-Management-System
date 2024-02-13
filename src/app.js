import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import httpStatus from 'http-status';
import compression from 'compression';

import { COMPRESSION_LEVEL, COMPRESSION_THRESHOLD } from './common/constants/index.js';

const { NOT_FOUND } = httpStatus;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(compression({ level: COMPRESSION_LEVEL, threshold: COMPRESSION_THRESHOLD }));

// If requested endpoint is not found then reply with not found
app.use((req, res) => { res.status(NOT_FOUND).json({ message: `Cannot ${req.method} ${req.originalUrl}` }); });

export default app;
