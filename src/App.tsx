import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DatabaseList from './pages/DatabaseList';
import DatabaseDetails from './pages/DatabaseDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={DatabaseList} />
        <Route path="/database/:id" Component={DatabaseDetails} />
      </Routes>
    </Router>
  );
};

export default App;