import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import routes from './routes/index.js';
import  errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.use(errorHandler);

export default app;
