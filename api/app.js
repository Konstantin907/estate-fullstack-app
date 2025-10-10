import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import testRoutes from './routes/test.route.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  /\.vercel\.app$/,
  "https://estate-fullstack.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      if (/\.vercel\.app$/.test(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);
app.use('/api/test', testRoutes);
app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);



app.listen(8800, ()=>{
    console.log('Server is running!');
})

