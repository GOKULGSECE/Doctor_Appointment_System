import React from 'react';
import '../styles/doctors.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faLocationDot, faVideoCamera, faHospital } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Doctospage = ({ doctor }) => {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    console.log("Navigating to appointment booking");
    navigate("/homepage");
  };

  return (
    <section className='card_container'>
      <img src='https://wallpapercave.com/wp/wp2555019.jpg' alt='doctor name' />

      <p><span className='q'>Name: </span>{doctor.name}</p>
      <p><span className='w'>Qualification: </span>{doctor.qualification}</p>
      <p><span className='e'>Experience: </span>{doctor.experience} Years</p>        
      <p><span className='q'>Main Role: </span>{doctor.title}</p>

      <div>
        <p><span className='r'>Pay Now - </span></p>
        <b>₹{doctor.fees}</b>
      </div>

      <div className='languages_known'>
        <FontAwesomeIcon icon={faAddressCard} />
        <p>{doctor.languages}</p>
      </div>

      <div className='languages_known'>
        <FontAwesomeIcon icon={faLocationDot} />
        <p>{doctor.location}</p>
      </div>

      <div className='digital'>
        <p>Available Tomorrow</p>
        <p>Available within 5-10 Minutes</p>
      </div>

      <div className='hospital'>
        <button className="icon-button1" onClick={handleNavigate}>
          <FontAwesomeIcon icon={faVideoCamera} /> Book Appointment
        </button>
        <button className="icon-button2">
          <FontAwesomeIcon icon={faHospital} /> Book Hospital Visit
        </button>
      </div>
    </section>
  );
};

export default Doctospage;
