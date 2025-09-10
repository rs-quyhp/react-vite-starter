import { useEffect, useState } from 'react';
// import '../../styles/users.css';
import {
  Button,
  message,
  notification,
  Popconfirm,
  PopconfirmProps,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';
import DeleteUserButton from './delete.user.button';

export interface IUser {
  email: string;
  name: string;
  role: string;
  _id: string;
  address: string;
  age: string;
  gender: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [record, setRecord] = useState<null | IUser>(null);

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

    if (!usersData.data) {
      notification.error({
        message: 'Error',
        description: JSON.stringify(usersData?.message),
      });
    }

    setListUsers(usersData.data.result);
  };

  const onClickUpdate = (record: IUser) => {
    setRecord(record);
    setIsUpdateModalOpen(true);
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
    {
      title: 'Actions',
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', gap: '5px' }}>
            <Button
              type="default"
              icon={<EditFilled />}
              onClick={() => onClickUpdate(record)}
            >
              Edit
            </Button>
            <DeleteUserButton record={record} getData={getData} />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <CreateUserModal
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <UpdateUserModal
        getData={getData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        record={record}
        setRecord={setRecord}
      />
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
          onClick={() => setIsCreateModalOpen(true)}
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
