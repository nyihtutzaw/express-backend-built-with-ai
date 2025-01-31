const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const {router:userRoutes } = require('./routes/users');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// Routes
app.use('/api/v1/users', (req, res, next) => {
  if (userRoutes && typeof userRoutes === 'function') {
    return userRoutes(req, res, next);
  }
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});