import { BrowserRouter, Route,Routes }   from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Appointment from "./pages/Appointment"
import "antd/dist/reset.css";
import "./index.css";
import { useState } from "react";
import Doctospage from "./pages/Doctospage";
import Admin from "./pages/Admin";
import Doctors from "./pages/doctors";

function App() {
  const {name,setName} = useState('');
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register setName={setName}/>} />
        <Route path="/homepage" element={<HomePage name = {name} />}/>
        <Route path="/appointment" element={<Appointment setName={setName} />}/>
        <Route path="/" element={<Login />} />
        <Route path="/doctorspage" element={<Doctors></Doctors>}></Route>
        <Route path="/adminhomepage" element={<Admin></Admin>}></Route>
      </Routes> 
      </BrowserRouter>
    </>
  );
}

export default App;
