import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
const authToken = localStorage.getItem("authToken");
const user = localStorage.getItem("user");

const initialState = {
  isLoggedIn: authToken === null ? false : true,
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  authToken: authToken ? authToken : null,
  errorMessage: null,
};

export const AuthSignup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      // console.log(userData);
      const response = await authService.signup(userData);
      if (response.success) return response;
      else {
        throw new Error(response.error.error);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const AuthLogin = createAsyncThunk(
  "auth/login",
  async (userDetail, thunkAPI) => {
    try {
      console.log(userDetail);
      const response = await authService.login(userDetail);
      if (response.success) return response;
      else {
        throw new Error(response.error.error);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.user = null;
      state.authToken = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
    setErrorValueNull: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AuthSignup.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.user = action.payload.user;
          state.authToken = action.payload.authToken;
          localStorage.setItem("authToken", state.authToken);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(AuthSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.errorMessage = "error: " + action.payload;
      })
      .addCase(AuthLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AuthLogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.user = action.payload.user;
          state.authToken = action.payload.authToken;
          localStorage.setItem("authToken", state.authToken);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(AuthLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.errorMessage = "error: " + action.payload;
      });
  },
});

export const { logout, setErrorValueNull } = authSlice.actions;
export default authSlice.reducer;
