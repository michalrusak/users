import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const TableComponent: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.filteredUsers);

  return (
    <div
      style={{
        overflowX: "scroll",
        scrollbarWidth: "none",
        minHeight: "min-content",
      }}
    >
      <table className="table table-striped table-hover mx-2 my-3 p-2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <p className="d-flex align-items-center justify-content-center">N/A</p>
      )}
    </div>
  );
};

export default TableComponent;
