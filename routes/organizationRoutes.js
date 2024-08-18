const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const { fetchOrganizations, registerOrganization, fetchOrganization, deleteOrganization } = require('../controllers/organizationController')
const router = express.Router()

router.use(verifyToken)
router.route('/').get(fetchOrganizations)
router.route('/register').post(registerOrganization)
router.route('/:name').get(fetchOrganization).delete(deleteOrganization)

module.exports = router