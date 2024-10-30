const express = require('express');
const { getUsers, getAppointments, getAppointmentId } = require('../controllers/admin');
const router = express.Router();

router.get('/users',getUsers);
router.get('/getappointments',getAppointments);
router.put('/appointment/:id',getAppointmentId)

module.exports = router