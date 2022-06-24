const express = require('express');
const router = express.Router();

const {
  getSubscription,

  newSubscription,

  updateSubscription,
  deleteSubscription,
  singleSubscription,
} = require('../controllers/subscriptionController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/subscription').get(getSubscription);
router.route('/single/subscription').post(singleSubscription);
router
  .route('/admin/subscription/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newSubscription);

router
  .route('/admin/subscription/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateSubscription)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSubscription);

module.exports = router;
