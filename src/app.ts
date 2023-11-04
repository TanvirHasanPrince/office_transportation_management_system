import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';

//app.ts
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';

//Using cors
app.use(cors());

//parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
