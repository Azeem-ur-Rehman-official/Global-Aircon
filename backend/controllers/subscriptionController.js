const Subscription = require('../models/subscription');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new subscription   =>   /api/v1/admin/subscription/new
exports.newSubscription = catchAsyncErrors(async (req, res, next) => {
  const subscription = await Subscription.create(req.body);

  res.status(201).json({
    success: true,
    subscription,
  });
});

// Get all Subscription   =>   /api/v1/Subscription?keyword=apple
exports.getSubscription = catchAsyncErrors(async (req, res, next) => {
  const subscription = await Subscription.find();

  res.status(200).json({
    success: true,
    subscription,
  });
});
// update subscription
exports.updateSubscription = catchAsyncErrors(async (req, res, next) => {
  let subscription = await Subscription.findById(req.params.id);

  if (!subscription) {
    return next(new ErrorHandler('subscription not found', 404));
  }

  subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    subscription,
  });
});
// get single subscription   =>   /api/v1/admin/subscription/:id
exports.singleSubscription = catchAsyncErrors(async (req, res, next) => {
  const subscription = await Subscription.find({ _id: req.body.id });

  if (!subscription) {
    return next(new ErrorHandler('subscription not found', 404));
  }

  res.status(200).json({
    success: true,
    subscription,
  });
});
// Delete subscription   =>   /api/v1/admin/subscription/:id
exports.deleteSubscription = catchAsyncErrors(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id);

  if (!subscription) {
    return next(new ErrorHandler('subscription not found', 404));
  }

  await subscription.remove();

  res.status(200).json({
    success: true,
    message: 'subscription is deleted.',
  });
});
