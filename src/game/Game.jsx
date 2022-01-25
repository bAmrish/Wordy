import classes from "./Game.module.css";
import { useEffect, useState } from "react";
import words from "../assets/words/word-list.json";
import dictionary from "../assets/words/word-list-comprehensive.json";
import Board from "./board/Board";
import Message from "./message/Message";

const initRows = () => {
  const initTiles = () => {
    const tiles = [];
    for (let i = 0; i < 5; i++) {
      tiles.push({ id: `t${i}`, value: "", status: "NEW" });
    }
    return tiles;
  };

  const rows = [];

  for (let i = 0; i < 6; i++) {
    rows.push({
      id: `r${i}`,
      tiles: initTiles(),
      status: "UNSOLVED",
    });
  }

  rows[0].status = "CURRENT";
  rows[0].tiles[0].status = "SELECTED";

  return rows;
};

const getNewWord = () => {
  const totalWords = words.length;
  const random = Math.floor(Math.random() * totalWords);
  const word = words[random];
  console.log({ totalWords, random, word });
  return word.word;
};
const word = getNewWord().toUpperCase();

const Game = () => {
  const [message, setMessage] = useState(null);
  const [answer] = useState(word);
  const [rows, setRows] = useState(initRows());

  const addChar = (key) => {
    const char = key.toUpperCase();
    const updatedRows = [...rows];
    const currentRow = updatedRows.filter((row) => row.status === "CURRENT")[0];
    const selectedTileIndex = currentRow.tiles.findIndex(
      (tile) => tile.status === "SELECTED"
    );
    const selectedTile = currentRow.tiles[selectedTileIndex];
    if (selectedTileIndex < currentRow.tiles.length - 1) {
      selectedTile.status = "NEW";
      currentRow.tiles[selectedTileIndex + 1].status = "SELECTED";
      selectedTile.value = char;
    }
    if (
      selectedTileIndex === currentRow.tiles.length - 1 &&
      selectedTile.value === ""
    ) {
      selectedTile.value = char;
    }
    setRows(updatedRows);
  };

  const removeLastChar = () => {
    const updatedRows = [...rows];
    const currentRow = updatedRows.filter((row) => row.status === "CURRENT")[0];
    const selectedTileIndex = currentRow.tiles.findIndex(
      (tile) => tile.status === "SELECTED"
    );
    const selectedTile = currentRow.tiles[selectedTileIndex];
    const lastTileIndex = currentRow.tiles.length - 1;

    if (selectedTileIndex === lastTileIndex && selectedTile.value !== "") {
      selectedTile.value = "";
    } else if (selectedTileIndex > 0) {
      selectedTile.status = "NEW";
      currentRow.tiles[selectedTileIndex - 1].value = "";
      currentRow.tiles[selectedTileIndex - 1].status = "SELECTED";
    } else if (selectedTileIndex === 0 && selectedTile.value !== "") {
      selectedTile.value = "";
    } else if (
      selectedTileIndex === lastTileIndex &&
      selectedTile.value === ""
    ) {
      currentRow.tiles[selectedTileIndex - 1].value = "";
      currentRow.tiles[selectedTileIndex - 1].status = "SELECTED";
    }
    setRows(updatedRows);
  };

  const checkAnswer = () => {
    setMessage(null);
    const updatedRows = [...rows];
    const currentRowIndex = updatedRows.findIndex(
      (row) => row.status === "CURRENT"
    );
    const currentRow = updatedRows[currentRowIndex];

    const guess = currentRow.tiles
      .map((tile) => tile.value)
      .join("")
      .toUpperCase();
    if (guess.length !== currentRow.tiles.length) {
      setMessage({ type: "warn", text: "Need all 5 letters of the word." });
      console.warn("incomplete answer", guess);
      return;
    }

    if (dictionary.indexOf(guess.toLowerCase()) === -1) {
      setMessage({ type: "warn", text: `${guess} is not in dictionary.` });
      console.warn(`${guess} is not in dictionary!`);
      return;
    }

    for (let i = 0; i < currentRow.tiles.length; i++) {
      const tile = currentRow.tiles[i];
      const guessIndex = answer.indexOf(tile.value);
      if (guessIndex === i) {
        tile.status = "CORRECT";
      } else if (guessIndex > -1) {
        tile.status = "WARN";
      } else {
        tile.status = "INCORRECT";
      }
    }

    if (guess === answer) {
      setMessage({ type: "success", text: "You Guessed it!" });
      currentRow.status = "EVALUATED";
      for (let i = currentRowIndex + 1; i < updatedRows.length; i++) {
        const row = updatedRows[i];
        row.status = "DISABLED";
        row.tiles.forEach((tile) => (tile.status = "DISABLED"));
      }
    } else if (currentRowIndex === updatedRows.length - 1) {
      setMessage({ type: "error", text: `The word was ${answer}` });
      console.warn(`😞 game lost! the word was ${answer}`);
    } else {
      currentRow.status = "EVALUATED";
      const nextRow = updatedRows[currentRowIndex + 1];
      nextRow.status = "CURRENT";
      nextRow.tiles[0].status = "SELECTED";
    }

    setRows(updatedRows);
  };

  const handleKey = (key) => {
    const isAlpha = key.length === 1 && /[a-zA-Z]/i.test(key);
    const isBackspace = key === "Backspace";
    const isEnter = key === "Enter";

    if (isAlpha) {
      addChar(key);
    } else if (isBackspace) {
      removeLastChar();
    } else if (isEnter) {
      checkAnswer();
    }
  };

  useEffect(() => {
    const keydownListener = (event) => {
      handleKey(event.key);
    };
    document.addEventListener("keydown", keydownListener);
    return () => {
      document.removeEventListener("keydown", keydownListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.game}>
      <div className={classes["board-container"]}>
        {message && <Message message={message} />}
        <Board rows={rows} />
      </div>
    </div>
  );
};

export default Game;
