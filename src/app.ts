import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import appRouter from './routes/index.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use('/api', appRouter);

// System fallback boundaries hooks
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;