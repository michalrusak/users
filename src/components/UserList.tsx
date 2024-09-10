import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import { AppDispatch, RootState } from "../store/store";
import FilterComponent from "./FilterComponent";
import TableComponent from "./TableComponent";
import SpinnerLoading from "./SpinnerLoading";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  return (
    <div className="p-4" style={{ minHeight: "calc(90vh - 56px )" }}>
      <h2>Users List</h2>
      {status === "loading" && <SpinnerLoading />}
      {status === "failed" && (
        <p className="text-danger">Failed to load users.</p>
      )}
      {status === "succeeded" && (
        <div>
          <FilterComponent />
          <TableComponent />
        </div>
      )}
    </div>
  );
};

export default UserList;
