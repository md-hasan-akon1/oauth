import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import passport from 'passport';
import session from 'express-session';
const app: Application = express();

//parsers 
app.use(express.json());
app.use(cookieParser());
// 1. Setup session middleware to handle sessions
app.use(session({
  secret: 'your-secret-key', // Secret key for session encryption
  resave: false, // Prevents session from being saved back to store if not modified
  saveUninitialized: true // Save new sessions even if not modified
}));

// 2. Initialize passport and session
app.use(passport.initialize()); // Start passport middleware
app.use(passport.session()); // Enable session management with passport
app.use(cors({origin: ['https://celebrated-kitten-1b6ccf.netlify.app',"https://celebrated-kitten-1b6ccf.netlify.app"], credentials: true }));

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hi Developer !');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;