import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DatabaseList from './pages/DatabaseList';
import DatabaseDetails from './pages/DatabaseDetails';
import { DialogProvider } from './contexts/DialogContext';

const App: React.FC = () => {
  return (
    <DialogProvider>
    <Router>
      <Routes>
        <Route path="/" Component={DatabaseList} />
        <Route path="/database/:id" Component={DatabaseDetails} />
      </Routes>
    </Router>
    </DialogProvider>
  );
};

export default App;