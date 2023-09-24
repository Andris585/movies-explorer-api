require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { NODE_ENV } = process.env;

const { PORT = 4000, DB_URL } = process.env;

const app = express();

const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

if (NODE_ENV === 'production') {
  mongoose.connect(DB_URL);
} else {
  mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb_dev');
}

app.use(helmet());

app.use(express.json());

app.use(cors({ credentials: true, origin: 'https://movie585.nomoredomainsrocks.ru', exposedHeaders: ['set-cookie'] }));

app.use(cookieParser());

app.use(limiter);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Прослушивается порт: ${PORT}`);
});
