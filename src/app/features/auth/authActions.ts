import authApi from "@/api/authApi";
import { firebaseAuth, googleAuthProvider } from "@/api/firebase";
import store, { RootState } from "@/app/store";
import { User } from "@/models/validators/User";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";

export const changeAuthState = createAction(
  "auth/changeAuthState",
  (user: User | null) => {
    return {
      payload: user,
    };
  }
);

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (args, thunkApi) => {
    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider);
    } catch (e) {
      thunkApi.rejectWithValue(e);
      return null;
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (args, thunkApi) => {
    try {
      await firebaseAuth.signOut();
    } catch (e) {
      thunkApi.rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  User,
  {
    state: RootState;
  }
>("auth/updateUser", async (user, thunkApi) => {
  try {
    if (thunkApi.getState().auth.user!.email !== user.email) {
      await authApi.updateEmail(user.email);
    }

    await authApi.updateFirestoreUser(user);

    return thunkApi.fulfillWithValue(user);
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});
