import { createAction, createReducer } from "@reduxjs/toolkit";

export const openSettingsModal = createAction<void>(
  "account/openSettingsModal"
);

export const closeSettingsModal = createAction<void>(
  "account/closeSettingsModal"
);
