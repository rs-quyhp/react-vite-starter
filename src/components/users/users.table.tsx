import { useEffect, useState } from 'react';
// import '../../styles/users.css';
import {
  Button,
  Dropdown,
  Input,
  message,
  Modal,
  notification,
  Space,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';

interface IUser {
  email: string;
  name: string;
  role: string;
  _id: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('ADMIN');

  const handleOk = async () => {
    const data = {
      name,
      email,
      password,
      age,
      gender,
      address,
      role,
    };

    // Get access token
    const res = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin@gmail.com',
        password: '123456',
      }),
    });

    const authData = await res.json();

    const accessToken = authData?.data?.access_token;

    // Create user
    const response = await fetch('http://localhost:8000/api/v1/users', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.data) {
      getData();
      notification.success({
        message: 'User created successfully',
      });
      handleCloseModal();
    } else {
      notification.error({
        message: 'Error',
        description: JSON.stringify(responseData.message),
      });
    }
  };

  const handleCloseModal = () => {
    setName('');
    setEmail('');
    setPassword('');
    setAge('');
    setGender('male');
    setAddress('');
    setRole('ADMIN');
    setIsModalOpen(false);
  };

  const getData = async () => {
    // Get access token
    const res = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin@gmail.com',
        password: '123456',
      }),
    });

    const data = await res.json();

    const accessToken = data?.data?.access_token;

    // Fetch list user
    const usersRes = await fetch('http://localhost:8000/api/v1/users/all', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const usersData = await usersRes.json();
    setListUsers(usersData.data.result);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns: ColumnsType<IUser> = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: (value, record) => {
        // return <a>{value}</a>;
        return <a>{record.email}</a>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
  ];
  return (
    <div>
      <Modal
        title="Add new user"
        closable={true}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCloseModal}
        maskClosable={false}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label>Name:</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <div>
            <label>Age:</label>
            <Input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
            />
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <label>Gender:</label>
            <Dropdown
              menu={{
                items: [
                  { label: 'Male', key: 'male' },
                  { label: 'Female', key: 'female' },
                ],
                onClick: ({ key }) => {
                  setGender(key);
                },
                defaultValue: gender,
              }}
            >
              <Button>
                <Space>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div>
            <label>Address:</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <label>Role:</label>
            <Dropdown
              menu={{
                items: [
                  { label: 'ADMIN', key: 'ADMIN' },
                  { label: 'USER', key: 'USER' },
                ],
                onClick: ({ key }) => {
                  setRole(key);
                },
                defaultValue: role,
              }}
            >
              <Button>
                <Space>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
      </Modal>
      <div
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <h2>Users Table</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          New user
        </Button>
      </div>
      <Table columns={columns} dataSource={listUsers} rowKey={'_id'} />
      {/* <table>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
        {listUsers.map((user: IUser) => {
          return (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          );
        })}
      </table> */}
    </div>
  );
};

export default UsersTable;
