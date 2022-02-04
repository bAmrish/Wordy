import classes from './App.module.css';
import Game from './game/Game';
import Header from './header/Header';

function App() {
  return (
    <div className={classes.app}>
      <div className={classes['main-container']}>
        <Header />
        <Game />
      </div>
    </div>
  );
}

export default App;
