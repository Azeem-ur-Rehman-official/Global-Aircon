const express = require('express');
const {
  subscriptionBuyuser,
  getSingleOrder,
} = require('../controllers/subscriptionBuyController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
router
  .route('/user/subscription/buy')
  .post(isAuthenticatedUser, subscriptionBuyuser);
router.route('/user/subscription/single/:id').get(getSingleOrder);
module.exports = router;
