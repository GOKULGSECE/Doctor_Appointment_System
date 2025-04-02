import React from "react";
import Doctospage from "../components/Doctospage";
import "../styles/doctors.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

const Doctors = () => {
  const [doctorsData, setdoctorsData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await axios.get("http://localhost:5006/doctor/");
      setdoctorsData(data.doctors);
      console.log(data.doctors);
    };
    fetchdata();
  }, []);

  // const doctorsData = [
  //     {
  //       name: 'Nirmal Kolte J',
  //       qualification: 'MBBS, MD - General Medicine',
  //       title: 'Cardiologist',
  //       experience:"8 Years",
  //       languages: 'English, Hindi',
  //       location: 'Mumbai',
  //       fees: 500,
  //       imageUrl: 'https://example.com/doctor-images/nirmal-kolte.jpg',
  //     },
  //     {
  //       name: 'Priya Sharma A',
  //       qualification: 'BDS - Dentistry',
  //       title: 'Dentist',
  //       experience:'2 Years',
  //       languages: 'English, Marathi',
  //       location: 'Pune',
  //       fees:1000,
  //       imageUrl: 'https://example.com/doctor-images/priya-sharma.jpg',
  //     },
  //     {
  //       name: 'Akhil Kapoor G',
  //       qualification: 'MD - Pediatrics',
  //       title: 'Pediatrician',
  //       experience:'3 Years',
  //       languages: 'English, Tamil',
  //       location: 'Chennai',
  //       fees:500,
  //       imageUrl: 'https://example.com/doctor-images/akhil-kapoor.jpg',
  //     },
  //     {
  //         name: 'Akhil Kapoor K',
  //         qualification: 'MD - Pediatrics',
  //         title: 'Pediatrician',
  //         experience:'6 Years',
  //         languages: 'English, Tamil',
  //         location: 'Chennai',
  //         fees:500,
  //         imageUrl: 'https://example.com/doctor-images/akhil-kapoor.jpg',
  //     },
  //     {
  //         name: 'Nirmal Kolte S',
  //         qualification: 'MBBS, MD - General Medicine',
  //         title: 'Cardiologist',
  //         experience:"8 Years",
  //         languages: 'English, Hindi',
  //         location: 'Mumbai',
  //         fees: 500,
  //         imageUrl: 'https://example.com/doctor-images/nirmal-kolte.jpg',
  //     }
  //   ];

  return (
    <>
      <Navbar></Navbar>
      <div className="doctors_page">
        <div className="all-doctors-container">
          <div className="doctor-cards">
            {doctorsData.map((doctor) => (
              <Doctospage key={doctor.name} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
