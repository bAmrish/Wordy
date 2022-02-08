import classes from './App.module.css';
import Game from './game/Game';
import Header from './header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import Stats from './stats/Stats';

function App() {
  return (
    <div className={classes.app}>
      <div className={classes['main-container']}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/game" replace />} />
          <Route path="/game" element={<Game />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
