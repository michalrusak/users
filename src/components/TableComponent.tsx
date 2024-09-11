import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IUser } from "../interfaces/user.interface";

const TableComponent: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.filteredUsers);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof IUser;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedUsers = useMemo(() => {
    const sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const handleSort = (key: keyof IUser) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

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
            <th
              onClick={() => handleSort("name")}
              style={{ cursor: "pointer" }}
            >
              Name{" "}
              {sortConfig?.key === "name"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : null}
            </th>
            <th
              onClick={() => handleSort("username")}
              style={{ cursor: "pointer" }}
            >
              Username{" "}
              {sortConfig?.key === "username"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : null}
            </th>
            <th
              onClick={() => handleSort("email")}
              style={{ cursor: "pointer" }}
            >
              Email{" "}
              {sortConfig?.key === "email"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : null}
            </th>
            <th
              onClick={() => handleSort("phone")}
              style={{ cursor: "pointer" }}
            >
              Phone{" "}
              {sortConfig?.key === "phone"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
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
