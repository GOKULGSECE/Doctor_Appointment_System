import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Button, Modal, Input, message, Breadcrumb } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/admin.css';

const { Header, Content, Sider } = Layout;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [scheduledTime, setScheduledTime] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchAppointments();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5006/admin/users");
      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        message.error("Failed to fetch users");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5006/admin/getappointments");
      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        message.error("Failed to fetch appointments");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const handleAppointmentApproval = async () => {
    try {
      const res = await axios.put(`http://localhost:5006/admin/appointment/${selectedAppointment._id}`, {
        status: "approved",
        scheduledTime: scheduledTime,
      });

      if (res.data.success) {
        message.success("Appointment approved successfully");
        fetchAppointments();
        setIsModalVisible(false); 
      } else {
        message.error("Failed to approve appointment");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const showApprovalModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  const columnsUsers = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
  ];

  const columnsAppointments = [
    { title: 'User Name', dataIndex: 'firstName', key: 'firstName' },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => showApprovalModal(record)}>
          Approve
        </Button>
      ),
    },
  ];
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} className="site-layout-background">
        <div className="logo"><span>Health</span>Booker</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            Appointments
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><b>Admin Dashboard</b></Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          <h3>Registered Users</h3>
          <Table dataSource={users} columns={columnsUsers} rowKey="_id" />

          <h3 style={{ marginTop: '24px' }}>Pending Appointments</h3>
          <Table dataSource={appointments} columns={columnsAppointments} rowKey="_id" />

          <Modal
            title="Approve Appointment"
            visible={isModalVisible}
            onOk={handleAppointmentApproval}
            onCancel={() => setIsModalVisible(false)}
          >
            <p>Set Scheduled Time:</p>
            <Input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
