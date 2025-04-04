import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button,message} from 'antd'; 
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    message.success("Logged out successfully");
    // console.log("Logging out...");
    navigate('/');
  };
  const handleappoint = () => {
    message.success("Appointment page");
    navigate('/appointment');
  }
  const handleservices = () => {
    message.success("Services page");
    navigate('/doctorspage');
  }
  return (
    <>
    <nav className="section__container nav__container">
        <div className="nav__logo-container">
            <div className="nav__logo">Health<span>Booker</span></div>
        </div>
        <div className="nav__buttons">
        <Button className="nav__button" onClick={handleappoint}>Appointment</Button>
        <Button className="nav__button" onClick={handleservices}>Services</Button>
        {/* <Button className="nav__button">Contact Us</Button> */}
        <Button className="nav__button" onClick={handleLogout}>Logout</Button>
    </div>
    </nav>
    </>
  );
};

export default Navbar;
