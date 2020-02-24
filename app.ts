import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import cors from 'cors';

import auth from './routes/auth.routes';
import link from './routes/link.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/link', link);

const PORT = config.get('port') || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => console.log(`server started at port ${PORT}`));
  } catch (error) {
    console.log(`server error ${error.message}`);
    process.exit(1);
  }
};

start();
