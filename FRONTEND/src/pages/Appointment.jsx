import React, { useState, useEffect } from "react";
import "../styles/appointment.css";
import { message } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAltSlash, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/navbar";

const Appointment = () => {
  const [response, setResponse] = useState([]);

  const handleAppointment = async () => {
    try {
      const { data } = await axios.get("http://localhost:5006/appoint/showbookings");
      setResponse(data.appointments);
      // console.log("one")
      message.success("Appointment fetching successful");
    } catch (error) {
      message.error("Error fetching appointments");
    }
  };

  useEffect(() => {
    handleAppointment();
  }, []);

  return (
    <>
      {/* <div className="Main_div">
        <div className="header-content">
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.W1TeJ8gVLIM7SZi2dv9CvwHaHa?w=195&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="hospital_logo"
            className="hospital_logo"
          />
          <div className="title-content">
            <h2 className="Main_div_title">
              Health<span>Booker</span>
            </h2>
            <h5>Appointments Page</h5>
          </div>
        </div>
      </div> */}
      <Navbar></Navbar>
      <div className="container">
        {response.map((appointment, index) => (
          <div key={index} className="appointment-card">
            <h4>
              {appointment.firstName} {appointment.lastName}
            </h4>
            <p>Address: {appointment.address}</p>
            <p>Phone: {appointment.phoneNumber}</p>
            <p>Doctor: {appointment.doctorname}</p>
            <p>Date: {new Date(appointment.createdAt).toLocaleDateString()}</p>
            <p>Time: {appointment.scheduledTime || "Not Scheduled"}</p>
            <div className="icon-right">
              {appointment.status === "approved" ? (
                <FontAwesomeIcon icon={faUserCheck} />
              ) : (
                <FontAwesomeIcon icon={faUserAltSlash} />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Appointment;
