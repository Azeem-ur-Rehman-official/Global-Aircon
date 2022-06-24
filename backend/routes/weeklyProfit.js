const express = require('express');
const router = express.Router();

const {
  createWeeklyProfit,
  allWeeklyProfit,
  weeklyProfitUpdate,
} = require('../controllers/weeklyProfitController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
router
  .route('/admin/weekly/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createWeeklyProfit);
router.route('/weekly').get(allWeeklyProfit);
router
  .route('/admin/weekly/update')
  .put(isAuthenticatedUser, authorizeRoles('admin'), weeklyProfitUpdate)
module.exports = router;
