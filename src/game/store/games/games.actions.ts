import { AppDispatch, RootState } from '../index';
import gamesStore from './games.store';
import dictionary from '../../../assets/words/word-list-comprehensive.json';
import HelperService from '../../service/helper';
import uiStore from '../ui/ui.store';

const gamesActions = {
  addChar: (key: string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
      const currentGame = getState().games.currentGame;
      const game = currentGame?.clone();
      if (!game) {
        return;
      }
      const char = key.toLowerCase();
      const rows = game.rows;
      const currentRow = rows.filter(row => row.status === 'CURRENT')[0];

      const selectedTileIndex = currentRow.tiles.findIndex(
        tile => tile.status === 'SELECTED'
      );

      const selectedTile = currentRow.tiles[selectedTileIndex];

      if (selectedTileIndex < currentRow.tiles.length - 1) {
        selectedTile.status = 'NEW';
        currentRow.tiles[selectedTileIndex + 1].status = 'SELECTED';
        selectedTile.value = char;
      }
      if (
        selectedTileIndex === currentRow.tiles.length - 1 &&
        selectedTile.value === ''
      ) {
        selectedTile.value = char;
      }

      dispatch(gamesStore.actions.updateCurrentGame(game));
    };
  },

  removeLastChar: () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
      const currentGame = getState().games.currentGame;
      const game = currentGame?.clone();
      if (!game) {
        return;
      }
      const rows = game.rows;
      const currentRow = rows.filter(row => row.status === 'CURRENT')[0];
      const selectedTileIndex = currentRow.tiles.findIndex(
        tile => tile.status === 'SELECTED'
      );
      const selectedTile = currentRow.tiles[selectedTileIndex];
      const lastTileIndex = currentRow.tiles.length - 1;

      if (selectedTileIndex === lastTileIndex && selectedTile.value !== '') {
        selectedTile.value = '';
      } else if (selectedTileIndex > 0) {
        selectedTile.status = 'NEW';
        currentRow.tiles[selectedTileIndex - 1].value = '';
        currentRow.tiles[selectedTileIndex - 1].status = 'SELECTED';
      } else if (selectedTileIndex === 0 && selectedTile.value !== '') {
        selectedTile.value = '';
      } else if (
        selectedTileIndex === lastTileIndex &&
        selectedTile.value === ''
      ) {
        currentRow.tiles[selectedTileIndex - 1].value = '';
        currentRow.tiles[selectedTileIndex - 1].status = 'SELECTED';
      }

      dispatch(gamesStore.actions.updateCurrentGame(game));
    };
  },

  checkAnswer: () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
      dispatch(uiStore.actions.clearNotification());
      const currentGame = getState().games.currentGame;
      const game = currentGame?.clone();
      if (!game) {
        return;
      }
      const rows = game.rows;
      const answer = game.answer;
      const currentRowIndex = rows.findIndex(row => row.status === 'CURRENT');
      const currentRow = rows[currentRowIndex];

      const guess = currentRow.tiles
        .map(tile => tile.value)
        .join('')
        .toLowerCase();
      if (guess.length !== currentRow.tiles.length) {
        dispatch(uiStore.actions.warn('Need all 5 letters of the word.'));
        return;
      }

      if (dictionary.indexOf(guess.toLowerCase()) === -1) {
        dispatch(
          uiStore.actions.warn(`${guess.toUpperCase()} is not in dictionary.`)
        );
        return;
      }

      for (let i = 0; i < currentRow.tiles.length; i++) {
        const tile = currentRow.tiles[i];
        tile.status = HelperService.getTileStatus(i, guess, answer);
      }

      if (guess === answer) {
        currentRow.status = 'EVALUATED';

        for (let i = currentRowIndex + 1; i < rows.length; i++) {
          const row = rows[i];
          row.status = 'DISABLED';
          row.tiles.forEach(tile => (tile.status = 'DISABLED'));
        }

        game.status = 'WON';
        dispatch(
          uiStore.actions.success(
            `You Guessed it! The answer was "${answer.toUpperCase()}". Press enter to start a new game.`
          )
        );
      } else if (currentRowIndex === rows.length - 1) {
        game.status = 'LOST';
        dispatch(
          uiStore.actions.error(
            `The word was "${answer.toUpperCase()}". Press enter to start a new game.`
          )
        );
      } else {
        currentRow.status = 'EVALUATED';
        const nextRow = rows[currentRowIndex + 1];
        nextRow.status = 'CURRENT';
        nextRow.tiles[0].status = 'SELECTED';
      }

      game.rows = rows;
      game.seed = game.seed + 1;
      dispatch(gamesStore.actions.updateCurrentGame(game));
    };
  },

  newGame: () => {
    return (dispatch: AppDispatch) => {
      const game = HelperService.createGame();
      dispatch(gamesStore.actions.updateCurrentGame(game));
      dispatch(uiStore.actions.clearNotification());
    };
  },
};

export default gamesActions;
