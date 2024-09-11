import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setFilter } from "../features/userSlice";

const FilterComponent: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.users.filter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="m-2 w-50" style={{ minWidth: "250px", maxWidth: "500px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Filter users by keyword..."
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterComponent;
