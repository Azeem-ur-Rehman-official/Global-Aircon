const Subscription = require('../models/subscriptionBuy');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
// Create new subscription   =>   /api/v1/user/subscription/buy
exports.subscriptionBuyuser = catchAsyncErrors(async (req, res, next) => {
  const subscription = await Subscription.create(req.body);

  res.status(201).json({
    success: true,
    subscription,
  });
});
// Create get single subscription   =>   /api/v1/user/subscription/single
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id);
  const subscription = await Subscription.find({ user: req.params.id })
    .populate('user', 'name email')
    .populate('subscriptionId', 'duration discount createdAt');

  if (!subscription) {
    return next(new ErrorHandler('No Order found with this ID', 404));
  }

  res.status(200).json({
    success: true,
    subscription,
  });
});
