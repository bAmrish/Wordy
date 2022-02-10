import classes from './App.module.css';
import Header from './header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAppSelector } from './game/store/store.hooks';

function App() {
  const Stats = lazy(() => import('./stats/Stats'));
  const Game = lazy(() => import('./game/Game'));
  const theme = useAppSelector(state => state.ui.theme);
  return (
    <div className={`${classes.app} theme ${theme}`}>
      <Header />
      <div className={classes['main-container']}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/game" replace />} />
            <Route path="/game" element={<Game />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
