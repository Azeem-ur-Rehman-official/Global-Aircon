const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require('path');

const errorMiddleware = require('./middlewares/errors');

// Setting up config file
if (process.env.NODE_ENV === 'PRODUCTION')
  require('dotenv').config({ path: 'backend/config/config.env' });
dotenv.config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');
const blog = require('./routes/blog');
const faq = require('./routes/faq');
const weeklyProfit = require('./routes/weeklyProfit');
const commentRout = require('./routes/commentRouter');
const services = require('./routes/serviceRoute');
const subscription = require('./routes/subscriptionRouter');
const notification = require('./routes/notificationRouter');
const ButSubscription = require('./routes/subscriptionBuyRouter');
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', payment);
app.use('/api/v1', order);
app.use('/api/v1', blog);
app.use('/api/v1', faq);
app.use('/api/v1', weeklyProfit);
app.use('/api/v1', notification);
app.use('/api/v1', commentRout);
app.use('/api/v1', services);
app.use('/api/v1', subscription);
app.use('/api/v1', ButSubscription);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
