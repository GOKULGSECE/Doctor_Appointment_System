const userModel = require('../models/appointment');

const createAppointment = async (req, res) => {
  try {
    
    const appointment = new userModel(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await userModel.find({});
    res.status(200).json({msg:"documents retrived successfully",appointments});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};



// exports.getAppointmentById = async (req, res) => {
//   try {
//     const appointment = await Appointment.findById(req.params.id);
//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }
//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching appointment', error });
//   }
// };

// exports.updateAppointment = async (req, res) => {try {
//     const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }
//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating appointment', error });
//   }
// };

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};
module.exports = {createAppointment,getAppointments,deleteAppointment}