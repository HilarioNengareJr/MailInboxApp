import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import InboxPage from './components/InboxPage';
import MessagePage from './components/MessagePage';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/user/:userId/messages" element={<InboxPage />} />
        <Route path="/message/:messageId" element={<MessagePage />} />
      </Routes>
    </Router>
  );
};

export default App;
