import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MessageModel from '../../models/message.model';

export interface UIState {
  notification: MessageModel | null;
}

const initialState: UIState = {
  notification: null,
};
const uiStore = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    notify: (state: UIState, action: PayloadAction<string>) => {
      state.notification = new MessageModel(action.payload, 'info');
    },

    warn: (state: UIState, action: PayloadAction<string>) => {
      state.notification = new MessageModel(action.payload, 'warn');
    },

    error: (state: UIState, action: PayloadAction<string>) => {
      state.notification = new MessageModel(action.payload, 'error');
    },

    success: (state: UIState, action: PayloadAction<string>) => {
      state.notification = new MessageModel(action.payload, 'success');
    },

    clearNotification: (state: UIState) => {
      state.notification = null;
    },
  },
});

export default uiStore;
