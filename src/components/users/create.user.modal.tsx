import { DownOutlined } from '@ant-design/icons';
import { Modal, Input, Dropdown, Button, Space, notification } from 'antd';
import { useState } from 'react';

interface IProps {
  getData: () => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: IProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('ADMIN');
  const { getData, isCreateModalOpen, setIsCreateModalOpen } = props;

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

    const accessToken = localStorage.getItem('access_token');

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
    setIsCreateModalOpen(false);
  };

  return (
    <Modal
      title="Add new user"
      closable={true}
      open={isCreateModalOpen}
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
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
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
  );
};

export default CreateUserModal;
