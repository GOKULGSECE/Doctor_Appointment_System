import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Modal, Input, Button, Typography } from "antd";

const { Title, Text } = Typography;

const DoctorPage = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        name: "",
        qualification: "",
        title: "",
        experience: "",
        languages: "",
        location: "",
        fees: ""
    });

    const loggedInDoctorName = "Nirmal Kolte";

    useEffect(() => {
        axios.get("http://localhost:5006/doctor")
            .then(response => {
                console.log(response.data);
                const doctorsList = response.data.doctors;
                const matchedDoctor = doctorsList.find(doctor => doctor.name === loggedInDoctorName);

                if (matchedDoctor) {
                    setDoctorData(matchedDoctor);
                } else {
                    setIsModalVisible(true); 
                }
            })
            .catch(error => console.error("Error fetching doctor data:", error));
    }, []);

    const handleInputChange = (e) => {
        setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        axios.post("http://localhost:5006/doctor/add-doctors", newDoctor)
            .then(response => {
                console.log("Doctor added:", response.data);
                setDoctorData(response.data);
                setIsModalVisible(false);
            })
            .catch(error => console.error("Error adding doctor:", error));
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f4f4" }}>
            {doctorData ? (
                <Card
                    style={{ width: 400, textAlign: "center", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                    cover={<img alt="Doctor" src={doctorData.imageUrl} style={{ width: "100px", height: "100px", borderRadius: "50%", margin: "20px auto" }} />}
                >
                    <Title level={3}>Dr. {doctorData.name}</Title>
                    <Text type="secondary">{doctorData.qualification}</Text>
                    <p><strong>Specialization:</strong> {doctorData.title}</p>
                    <p><strong>Experience:</strong> {doctorData.experience}</p>
                    <p><strong>Languages:</strong> {doctorData.languages}</p>
                    <p><strong>Location:</strong> {doctorData.location}</p>
                    <p><strong>Consultation Fees:</strong> ₹{doctorData.fees}</p>
                </Card>
            ) : null}
            <Modal title="Fill Your Details" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                <Input name="name" placeholder="Full Name" onChange={handleInputChange} style={{ marginBottom: 10 }} />
                <Input name="qualification" placeholder="Qualification" onChange={handleInputChange} style={{ marginBottom: 10 }} />
                <Input name="title" placeholder="Specialization" onChange={handleInputChange} style={{ marginBottom: 10 }} />
                <Input name="experience" placeholder="Experience (Years)" onChange={handleInputChange} style={{ marginBottom: 10 }} />
                <Input name="languages" placeholder="Languages Known" onChange={handleInputChange} style={{ marginBottom: 10 }} />
                <Input name="location" placeholder="Location" onChange={handleInputChange} style={{ marginBottom: 10 }} />
                <Input name="fees" placeholder="Consultation Fees (₹)" type="number" onChange={handleInputChange} style={{ marginBottom: 10 }} />
                <Button type="primary" onClick={handleSubmit} block>Submit</Button>
            </Modal>
        </div>
    );
};

export default DoctorPage;
