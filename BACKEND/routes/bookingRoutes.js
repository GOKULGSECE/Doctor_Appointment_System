const express = require("express");
const router = express.Router();
const {createAppointment, getAppointments,} = require("../controllers/appointmentsController")

router.post("/book",createAppointment);
router.get("/showbookings",getAppointments);

module.exports = router 