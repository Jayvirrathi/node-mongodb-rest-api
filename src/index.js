import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
const userRoutes = require('./routes/userRoutes');
const middlewares = require('./middlewares');

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
  app.use(cors());
  app.use(express.json());
  await mongoose.connect('mongodb://localhost:27017/test4', options);

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

  app.use('/user', userRoutes);

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );

  //   app.use(middlewares.notFound);
  //   app.use(middlewares.errorHandler);
};

startServer();
