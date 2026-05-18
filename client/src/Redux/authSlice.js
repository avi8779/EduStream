import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

const rawData = localStorage.getItem('data');

let parsedData = {};
try {
  parsedData = rawData ? JSON.parse(rawData) : {};
} catch (error) {
  console.error('Error parsing data:', error);
}

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  role: localStorage.getItem('role') || "",
  data: parsedData
};

// function to handle signup
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    let res = axiosInstance.post("user/register", data);

    await toast.promise(res, {
      loading: "Wait! Creating your account",
      success: (data) => data?.data?.message,
      error: (err) => err?.response?.data?.message || "Failed to create account",
    });

    res = await res;
    return res.data;
  } catch (error) {
    return null;
  }
});

// function to handle login
export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    let res = axiosInstance.post("/user/login", data);

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => data?.data?.message,
      error: (err) => err?.response?.data?.message || "Failed to log in",
    });

    res = await res;
    return res.data;
  } catch (error) {
    return null;
  }
});

// function to handle logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    let res = axiosInstance.post("/user/logout");

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => data?.data?.message,
      error: (err) => err?.response?.data?.message || "Failed to log out",
    });

    res = await res;
    return res.data;
  } catch (error) {
    return null;
  }
});

// function to fetch user data
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = await axiosInstance.get("/user/me");
    return res?.data;
  } catch (error) {
    return null;
  }
});

// function to change user password
export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async (userPassword) => {
    try {
      let res = axiosInstance.post("/user/change-password", userPassword);

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => data?.data?.message,
        error: (err) => err?.response?.data?.message || "Failed to change password",
      });

      res = await res;
      return res.data;
    } catch (error) {
      return null;
    }
  }
);

// function to handle forget password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email) => {
    try {
      let res = axiosInstance.post("/user/reset", { email });

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => data?.data?.message,
        error: (err) => err?.response?.data?.message || "Failed to send verification email",
      });

      res = await res;
      return res.data;
    } catch (error) {
      return null;
    }
  }
);

// function to update user profile
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      let res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);

      await toast.promise(res, {
        loading: "Updating...",
        success: (data) => data?.data?.message,
        error: (err) => err?.response?.data?.message || "Failed to update profile",
      });

      res = await res;
      return res.data;
    } catch (error) {
      return null;
    }
  }
);

// function to reset the password
export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
  try {
    let res = axiosInstance.post(`/user/reset/${data.resetToken}`, {
      password: data.password,
    });

    await toast.promise(res, {
      loading: "Resetting...",
      success: (data) => data?.data?.message,
      error: (err) => err?.response?.data?.message || "Failed to reset password",
    });

    res = await res;
    return res.data;
  } catch (error) {
    return null;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for user login
      .addCase(login.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      // for user logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
      })
      // for user details
      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
