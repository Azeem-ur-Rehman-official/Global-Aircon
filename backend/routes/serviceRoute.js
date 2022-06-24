const express = require('express');
const router = express.Router();

const {
  getServices,

  newServices,
  singleService,
  updateServices,
  deleteServices,
} = require('../controllers/serviceCleaningController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router
  .route('/admin/services')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getServices);

router.route('/services/new').post(newServices);
router
  .route('/admin/single/service')
  .post(isAuthenticatedUser, authorizeRoles('admin'), singleService);
router
  .route('/admin/services/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateServices)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteServices);

module.exports = router;
