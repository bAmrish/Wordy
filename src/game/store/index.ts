import { configureStore } from '@reduxjs/toolkit';
import gamesStore, { AppState } from './games/games.store';
import uiStore, {
  initialState as uiInitialState,
  UIState,
} from './ui/ui.store';
import HelperService from '../service/helper';

const getInitialState = () => {
  const serializedState = localStorage.getItem('app-state');
  if (!serializedState) {
    return;
  }
  const stateObject = JSON.parse(serializedState);

  let ui: UIState = { ...uiInitialState };

  if (stateObject.ui) {
    if (stateObject.ui.notification) {
      ui.notification = stateObject.ui.notification;
    }
    if (stateObject.ui.theme) {
      ui.theme = stateObject.ui.theme;
    }
    if (stateObject.ui.animationsEnabled) {
      ui.animationsEnabled = stateObject.ui.animationsEnabled;
    }
    if (stateObject.ui.roundedTile) {
      ui.roundedTile = stateObject.ui.roundedTile;
    }
  }

  const gamesObject: AppState = stateObject.games;

  if (!gamesObject || !gamesObject.currentGame || !gamesObject.games) {
    return;
  }
  const currentGame = HelperService.cloneGame(gamesObject.currentGame);
  const games = gamesObject.games.map(game => HelperService.cloneGame(game));

  const appState: AppState = { currentGame, games };

  return { ui, games: appState };
};

const store = configureStore({
  reducer: {
    games: gamesStore.reducer,
    ui: uiStore.reducer,
  },
  preloadedState: getInitialState(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('app-state', JSON.stringify(state));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
