import './Home.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import hangmanImage from './assets/game_title.png';  // Replace with the actual hangman image path
import content from './info';
import { Button } from 'antd';
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="scrollable-container" >

        <div className='navbar'>
          <div className='btn-left'>
            <button onClick={() => navigate("/user")}>MENU</button>
            <button>LEVEL</button>
            <button>STORY</button>
          </div>
          <div className='btn-right'>
            <button>ABOUT</button>
            <button>HELP</button>
            <button>SETTING</button>
          </div>
        </div>

        <div className='space'>
        </div>
        <div className='space'>
        </div>
        <div className='play-button'>
          <button onClick={() => navigate("/user")}>PLAY</button>
        </div>
      </div>
      <div className='story-container'>
        {content}
      </div>
    </>

  );
};

export default Home;
