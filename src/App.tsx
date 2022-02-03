import classes from './App.module.css';
import Game from './game/Game';
import Header from './header/Header';

function App() {
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes['main-container']}>
        <Game />
      </div>
    </div>
  );
}

export default App;
