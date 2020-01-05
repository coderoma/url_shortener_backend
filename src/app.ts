import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import auth from './routes/auth.routes';

const app = express();

app.use('/api/auth', auth);

const PORT = config.get('port') || 5000;

const start = async (): Promise<any> => {
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
