import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
const userRoutes = require('./routes/userRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const middlewares = require('./middleware/middlewares');

const ErrorResponse = require('./middleware/ErrorResponse');

dotenv.config();

const port = process.env.PORT || 4000;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
  bufferMaxEntries: 0,
  useFindAndModify: false,
  useCreateIndex: true
};

const startServer = async () => {
  const app = express();

  await mongoose.connect(process.env.MONGO_URI, options);

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

  app.use(ErrorResponse);
  app.use('/user', userRoutes);
  app.use('/posts', postsRoutes);
  app.use('/comments', commentsRoutes);

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);
};

startServer();
