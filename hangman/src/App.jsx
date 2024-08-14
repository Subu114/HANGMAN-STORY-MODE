import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ScenePage from './page/game/ScenePage';
import Home from './Home';
import Clue from './page/game/Clue';
import Hangman from './page/game/Hangman';
import ScenesDisplay from './routes/admin/ScenesDisplay';
import ScenesSet from './routes/admin/ScenesSet';
import SignUp from './page/SignUp';
import SignIn from './page/SignIn';
import Admin from './routes/admin/Admin';
import User from './routes/user/User';
import GameWon from './page/game/GameWon';
import GameFiles from './routes/admin/GameFiles';
import Levels from './page/Levels';
import AdminLevels from './routes/admin/AdminLevels';
import LevelsDisplay from './routes/admin/LevelsDisplay';
import LevelSet from './routes/admin/LevelSet';


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
        {/* ADD AUTH */}
        <Route path="/adminlevels" element={<AdminLevels />} />
        <Route path="/levelsdisplay" element={<LevelsDisplay />} />
        <Route path="/levelset" element={<LevelSet />} />


        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />


        <Route path="/user" element={<User />} />
        <Route path="/gamewon" element={<GameWon />} />


      </Routes>
    </Router>
  );
}

export default App;
