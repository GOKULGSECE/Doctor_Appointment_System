const express = require('express');
const router = express.Router();
const userModel = require('../models/userModels');
const appointment = require('../models/appointment');

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const getAppointments = async (req, res) => {
  try {
    const appointments = await appointment.find({ status: "pending" });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const getAppointmentId = async (req, res) => {
  // console.log(req.body.scheduledTime);
  try {
    const appointmentq = await appointment.findByIdAndUpdate(req.params.id, { status: req.body.status,scheduledTime:req.body.scheduledTime }, { new: true });
    res.status(200).json({ success: true, data: appointmentq });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {getUsers,getAppointments,getAppointmentId};
