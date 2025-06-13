import { createSlice } from "@reduxjs/toolkit";

export interface AccountState {
  isSettingsModalOpen: boolean;
}

const initialState: AccountState = {
  isSettingsModalOpen: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    openSettingsModal: (state) => {
      state.isSettingsModalOpen = true;
    },
    closeSettingsModal: (state) => {
      state.isSettingsModalOpen = false;
    },
  },
});

export default accountSlice;
