import React from "react";

const users = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "Editor" },
  { id: 3, name: "Charlie", role: "Viewer" },
];

const UsersList = () => {
  return (
    <div style={{
      padding: "20px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      marginBottom: "20px"
    }}>
      <h2>👥 User Management</h2>
      <table style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;