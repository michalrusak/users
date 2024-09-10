import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserArray } from "../interfaces/user.interface";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: IUserArray = await response.json();

  const filteredData: IUserArray = data.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    phone: user.phone,
    email: user.email,
  }));

  return filteredData;
});

interface UserState {
  users: IUserArray;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  users: [],
  status: "idle",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
