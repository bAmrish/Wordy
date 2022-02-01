import classes from './App.module.css';
import Game from "./game/Game";

function App() {
  return (
    <div className={classes.app}>
      <header className={classes["app-header"]}><h1>Wordy</h1></header>
      <Game />
    </div>
  );
}

export default App;
