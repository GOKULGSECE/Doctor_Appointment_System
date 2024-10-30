const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String},
  address: { type: String },
  phoneNumber: { type: String},
  doctorname:{ type:String },
  status:{
    type:String,
    enum:['pending','approved','rejected'],
    default:'pending'
  },
  createdAt: { type: Date, default: Date.now },
  scheduledTime:{type:String,default:null}
});

const appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = appointment