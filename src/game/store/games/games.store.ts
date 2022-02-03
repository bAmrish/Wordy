import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import GameModel from '../../models/game.model';

interface AppState {
  currentGame: GameModel | null;
  games: GameModel[];
}

const initialState: AppState = { currentGame: null, games: [] };

const gamesStore = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateCurrentGame: (state: AppState, action: PayloadAction<GameModel>) => {
      const game = action.payload;
      state.currentGame = game;
      const index = state.games.findIndex(g => g.id === game.id);
      if (index > -1) {
        state.games.splice(index, 1, game);
      } else {
        state.games.push(game);
      }
    },

    newGame: (state: AppState, action: PayloadAction<GameModel>) => {
      const game = action.payload;
      state.currentGame = game;
      state.games.push(game);
    },
  },
});

export default gamesStore;
