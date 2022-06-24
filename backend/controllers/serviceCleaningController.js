const Service = require('../models/serviceCleaning');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new service   =>   /api/v1/admin/service/new
exports.newServices = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    service,
  });
});

// Get all services   =>   /api/v1/services?keyword=apple
exports.getServices = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.find();

  res.status(200).json({
    success: true,
    service,
  });
});
// Get single blog   =>   /api/v1/admin/faqs
exports.singleService = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.body.id);
  console.log('ok');
  res.status(200).json({
    success: true,
    service,
  });
});
// update service
exports.updateServices = catchAsyncErrors(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorHandler('service not found', 404));
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    service,
  });
});

// Delete service   =>   /api/v1/admin/service/:id
exports.deleteServices = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorHandler('service not found', 404));
  }

  await service.remove();

  res.status(200).json({
    success: true,
    message: 'service is deleted.',
  });
});
