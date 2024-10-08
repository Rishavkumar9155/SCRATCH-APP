import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import Paste from './Pages/Paste';
import ViewPaste from './Pages/ViewPaste';

import Loading from "./Pages/Loading"
// Assuming you have a separate CSS file for styling

const App = () => {
  return (
    <Router>
      <div className="relative h-screen overflow-hidden text-blackd">
       
       
        <Routes>
          <Route path="/" element={<><Navbar/><Home /></> } />
          <Route path="/Paste" element={<><Navbar/><Paste /></>} />
          <Route path="/pastes/:id" element={<><Navbar/><ViewPaste />   <Loading/></>} />
       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
