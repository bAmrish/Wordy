import classes from './App.module.css';
import Header from './header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAppSelector } from './game/store/store.hooks';
import { DialogProvider } from './ui/dialog/Dialog';

function App() {
  const Stats = lazy(() => import('./stats/Stats'));
  const Game = lazy(() => import('./game/Game'));
  const Settings = lazy(() => import('./settings/Settings'));
  const theme = useAppSelector(state => state.ui.theme);
  return (
    <div className={`${classes.app} theme ${theme}`}>
      <DialogProvider>
        <Header />
        <div className={classes['main-container']}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/game" replace />} />
              <Route path="/game" element={<Game />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </div>
      </DialogProvider>
    </div>
  );
}

export default App;
