import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DatabaseList from './pages/DatabaseList';
import DatabaseDetails from './pages/DatabaseDetails';
import { DialogProvider } from './contexts/DialogContext';
import { SnackbarProvider } from './contexts/SnackbarContext';

const App: React.FC = () => {
  return (
    <DialogProvider>
      <SnackbarProvider>
        <Router>
          <Routes>
            <Route path="/" Component={DatabaseList} />
            <Route path="/database/:id" Component={DatabaseDetails} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </DialogProvider>
  );
};

export default App;