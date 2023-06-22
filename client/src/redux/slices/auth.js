import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchIsAuth = createAsyncThunk("auth/login", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchIsAuthMe = createAsyncThunk("auth/me", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/register",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchIsAuth.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchIsAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchIsAuth.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchIsAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchIsAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchIsAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const AuthReducer = authSlice.reducer;

export const { logOut } = authSlice.actions;
