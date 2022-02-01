import classes from './Game.module.css';
import { useEffect, useState } from 'react';

import dictionary from '../assets/words/word-list-comprehensive.json';
import Board from './board/Board';
import Message from './message/Message';
import Keyboard from './keyboard/Keyboard';
import HelperService from './service/helper';
import TileModel, { StatusType } from './models/tile.model';
import RowModel from './models/row.model';
import MessageModel from './models/message.model';
import GameModel from './models/game.model';

const initTiles = (): TileModel[] => {
  const tiles: TileModel[] = [];
  for (let i = 0; i < 5; i++) {
    tiles.push(new TileModel(`t${i}`, '', 'NEW'));
  }
  return tiles;
};

const initRows = (): RowModel[] => {
  const rows: RowModel[] = [];

  for (let i = 0; i < 6; i++) {
    rows.push({
      id: `r${i}`,
      tiles: initTiles(),
      status: 'UNSOLVED',
    });
  }

  rows[0].status = 'CURRENT';
  rows[0].tiles[0].status = 'SELECTED';

  return rows;
};

const createGame = (): GameModel => {
  const id = HelperService.getNewId();
  const rows = initRows();
  const [seed, answer] = HelperService.getNewWord();
  const game = new GameModel(id, rows, 'PLAYING', answer, seed);
  console.log(game);
  return game;
};

const initialGame = createGame();

const Game = () => {
  const [message, setMessage] = useState<MessageModel | null>(null);
  const [game, setGame] = useState<GameModel>(initialGame);
  const [keyStatus, setKeyStatus] = useState<{ [key: string]: StatusType }>({});

  const addChar = (key: string) => {
    const updatedGame = game.clone();
    const char = key.toLowerCase();
    const updatedRows = [...updatedGame.rows];
    const currentRow = updatedRows.filter(row => row.status === 'CURRENT')[0];

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
    updatedGame.rows = [...updatedRows];
    setGame(updatedGame);
  };

  const removeLastChar = () => {
    const updatedGame = game.clone();
    const updatedRows = [...updatedGame.rows];
    const currentRow = updatedRows.filter(row => row.status === 'CURRENT')[0];
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
    updatedGame.rows = updatedRows;
    setGame(updatedGame);
  };

  const checkAnswer = () => {
    const updatedGame = game.clone();
    const updatedRows = [...updatedGame.rows];
    const answer = updatedGame.answer;

    setMessage(null);
    const currentRowIndex = updatedRows.findIndex(
      row => row.status === 'CURRENT'
    );
    const currentRow = updatedRows[currentRowIndex];

    const guess = currentRow.tiles
      .map(tile => tile.value)
      .join('')
      .toLowerCase();
    if (guess.length !== currentRow.tiles.length) {
      const message = new MessageModel(
        'Need all 5 letters of the word.',
        'warn'
      );
      setMessage(message);
      console.warn('incomplete answer', guess);
      return;
    }

    if (dictionary.indexOf(guess.toLowerCase()) === -1) {
      setMessage({ type: 'warn', text: `${guess} is not in dictionary.` });
      console.warn(`${guess} is not in dictionary!`);
      return;
    }

    for (let i = 0; i < currentRow.tiles.length; i++) {
      const tile = currentRow.tiles[i];
      tile.status = HelperService.getTileStatus(i, guess, answer);
    }

    if (guess === answer) {
      setMessage({ type: 'success', text: 'You Guessed it!' });
      currentRow.status = 'EVALUATED';
      for (let i = currentRowIndex + 1; i < updatedRows.length; i++) {
        const row = updatedRows[i];
        row.status = 'DISABLED';
        row.tiles.forEach(tile => (tile.status = 'DISABLED'));
      }
    } else if (currentRowIndex === updatedRows.length - 1) {
      setMessage({ type: 'error', text: `The word was ${answer}` });
      console.warn(`😞 game lost! the word was ${answer}`);
    } else {
      currentRow.status = 'EVALUATED';
      const nextRow = updatedRows[currentRowIndex + 1];
      nextRow.status = 'CURRENT';
      nextRow.tiles[0].status = 'SELECTED';
    }

    updatedGame.rows = updatedRows;
    setGame(updatedGame);
  };

  const handleKey = (key: string) => {
    const isAlpha = key.length === 1 && /[a-zA-Z]/i.test(key);
    const isBackspace = key === 'Backspace';
    const isEnter = key === 'Enter';

    if (isAlpha) {
      addChar(key);
    } else if (isBackspace) {
      removeLastChar();
    } else if (isEnter) {
      checkAnswer();
    }
  };

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      handleKey(event.key);
    };
    document.addEventListener('keydown', keydownListener);
    return () => {
      document.removeEventListener('keydown', keydownListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setKeyStatus(prevStatus => {
      const keyStatus = { ...prevStatus };

      for (const row of game.rows) {
        if (row.status === 'UNSOLVED') {
          continue;
        }
        for (const tile of row.tiles) {
          const currentKeyStatus = keyStatus[tile.value];
          if (tile.status === 'CORRECT') {
            keyStatus[tile.value] = 'CORRECT';
          } else if (tile.status === 'WARN' && currentKeyStatus !== 'CORRECT') {
            keyStatus[tile.value] = 'WARN';
          } else if (
            tile.status === 'INCORRECT' &&
            currentKeyStatus !== 'CORRECT' &&
            currentKeyStatus !== 'WARN'
          ) {
            keyStatus[tile.value] = 'INCORRECT';
          }
        }
      }
      return keyStatus;
    });
  }, [game]);

  return (
    <div className={classes.game}>
      <div className={classes['board-container']}>
        <Board rows={game.rows} />
        {message && <Message message={message} />}
      </div>
      <Keyboard keyStatus={keyStatus} onKey={handleKey} />
    </div>
  );
};

export default Game;
