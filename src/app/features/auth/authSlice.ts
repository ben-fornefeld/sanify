import { createSlice } from "@reduxjs/toolkit";
import {
  changeAuthState,
  signInWithGoogle,
  signOut,
  updateUser,
} from "./authActions";

import AppUser, { User } from "@/models/validators/User";
import toast from "react-hot-toast";

export interface AuthState {
  user: User | null;
  authStateLoading: boolean;
  signInLoading: boolean;
  updateUserLoading: boolean;
}

export const initialState: AuthState = {
  user: null,
  authStateLoading: true,
  signInLoading: false,
  updateUserLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    changeAuthState: (state, { payload }) => {
      state.authStateLoading = false;
      state.signInLoading = false;
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    // signInWithGoogle

    builder.addCase(signInWithGoogle.pending, (state) => {
      state.signInLoading = true;
    });

    builder.addCase(signInWithGoogle.rejected, (state) => {
      state.signInLoading = false;
    });

    // signOut

    builder.addCase(signOut.pending, (state) => {
      state.signInLoading = true;
    });

    builder.addCase(signOut.rejected, (state) => {
      state.signInLoading = false;
    });

    // updateUser

    builder.addCase(updateUser.pending, (state) => {
      state.updateUserLoading = true;
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.updateUserLoading = false;
      state.user = payload;
      toast.success("Account updated");
    });

    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.updateUserLoading = false;
      toast.error(`${payload}`);
    });
  },
});

export default authSlice;
