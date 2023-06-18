const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const corsOptions = require('./consts/cors-options');

require('dotenv').config();

const app = express();
const { PORT = 3000, DATABASE = 'mongodb://127.0.0.1:27017/' } = process.env;

mongoose.connect(`${DATABASE}bitfilmsdb`, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(cors(corsOptions));
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/errors-handler'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
