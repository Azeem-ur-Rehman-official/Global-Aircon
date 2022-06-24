const weeklyProfit = require('../models/weeklyProfit');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const spawn = require('child_process').spawn;

// Admin Routes

// Register a weeklyProfit   => /api/v1/admin/weekly/new
exports.createWeeklyProfit = catchAsyncErrors(async (req, res, next) => {
  const { day, profit } = req.body;

  console.log(req.body.day);

  const weeklyProf = await weeklyProfit.create({
    day,
    profit,
  });

  res.status(201).json({
    success: true,
    weeklyProf,
  });
});

// Get all weeklyProfit   =>   /api/v1/admin/weeklyProfit
exports.allWeeklyProfit = catchAsyncErrors(async (req, res, next) => {
  const weeklyProf = await weeklyProfit.find();

  res.status(200).json({
    success: true,
    weeklyProf,
  });
});

exports.weeklyProfitUpdate = catchAsyncErrors(async () => {
  const weeklyProf = await weeklyProfit.find();
  const date = new Date();
  let currentDate = new Date();
  currentDate.setDate(date.getDate() + 7);
  let day = currentDate.getDay();
  const process = spawn('python', ['./predict.py', currentDate.getDate(), day + 1, currentDate.getMonth()]);
  process.stdout.on('data', data => {
    weeklyProf.filter(async (weekly) => {
      if(weekly.day===dayAsString(day)) {

        const newWeeklyProfit = {
          day: weekly.day,
          profit: data.toString(),
        };

        const weeklyProfitData = await weeklyProfit.findByIdAndUpdate(weekly._id, newWeeklyProfit, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });

        res.status(200).json({
          success: true,
          weeklyProfitData,
        });
      }
      return true;
    });
  });
  return weeklyProf;
});


