import { configureStore } from '@reduxjs/toolkit';
import gamesStore from './games/games.store';
import uiStore from './ui/ui.store';

const store = configureStore({
  reducer: {
    games: gamesStore.reducer,
    ui: uiStore.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
