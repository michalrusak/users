import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserArray } from "../interfaces/user.interface";
import { config } from "../config/config";

interface UserState {
  users: IUserArray;
  filteredUsers: IUserArray;
  filter: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(config.apiURL);
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

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  filter: "",
  status: "idle",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        Object.values(user).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(state.filter.toLowerCase())
        )
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;
