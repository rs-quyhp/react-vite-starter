import { useEffect } from "react";
import "../../styles/users.css";

const UsersTable = () => {
  const getData = async () => {
    // Get access token
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin@gmail.com",
        password: "123456",
      }),
    });

    const data = await res.json();

    const accessToken = data?.data?.access_token;

    // Fetch list user
    const usersRes = await fetch("http://localhost:8000/api/v1/users/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const usersData = await usersRes.json();

    console.log("usersData", usersData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2>HTML Table</h2>

      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>
    </div>
  );
};

export default UsersTable;
