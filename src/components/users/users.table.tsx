import { useEffect, useState } from 'react';
// import '../../styles/users.css';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface IUser {
  email: string;
  name: string;
  role: string;
  _id: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);

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
      <h2>Users Table</h2>
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
