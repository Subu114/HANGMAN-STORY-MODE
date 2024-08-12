import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ScenePage from './page/ScenePage';
import Home from './Home';
import Clue from './page/Clue';
import Hangman from './page/Hangman';
import ScenesDisplay from './routes/admin/ScenesDisplay';
import ScenesSet from './routes/admin/ScenesSet';
import SignUp from './page/SignUp';
import SignIn from './page/SignIn';
import Admin from './routes/admin/Admin';
import User from './routes/user/User';
import Game from './page/Game';
import GameWon from './page/GameWon';
import GameFiles from './routes/admin/GameFiles';
import Levels from './page/Levels';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/levels" element={<Levels />} />
        


        <Route path="/scenepage" element={<ScenePage />} />
        <Route path="/clue" element={<Clue />} />
        <Route path="/hangman" element={<Hangman />} />


        <Route path="/admin" element={<Admin />} />
        <Route path="/scenedisplay" element={<ScenesDisplay />} />
        <Route path="/sceneset" element={<ScenesSet />} />
        <Route path="/gamefiles" element={<GameFiles />} />


        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />


        <Route path="/user" element={<User />} />
        <Route path="/gamewon" element={<GameWon />} />
        <Route path="/game" element={<Game />} />


      </Routes>
    </Router>
  );
}

export default App;
