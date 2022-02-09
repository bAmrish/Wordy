import classes from './App.module.css';
import Header from './header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

function App() {
  const Stats = lazy(() => import('./stats/Stats'));
  const Game = lazy(() => import('./game/Game'));
  return (
    <div className={classes.app}>
      <div className={classes['main-container']}>
        <Header />
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
