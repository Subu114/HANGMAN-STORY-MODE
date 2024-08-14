import './Home.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import content from './info';
import { message } from 'antd';
import axios from 'axios';
import { serverUrl } from './config/serverUrl';
import { token } from './config/userData';
import { isAuth, userDataRemove } from './auth';

const Home = () => {
  const navigate = useNavigate();
  const [isNavbarVisible, setNavbarVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      console.log(window.scrollY)
      // Check if the user is at the top of the page
      if (window.scrollY === 0 || e.clientY < 50) {
        setNavbarVisible(true); // Show navbar
      } else {
        setNavbarVisible(false); // Hide navbar when not at the top and cursor is away
      }
    };
  
    window.addEventListener('mousemove', handleMouseMove);
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  

  useEffect(() => {
    const scrollToPosition = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight * 0.28,
        behavior: 'smooth',
      });
    };

    const timeoutId = setTimeout(()=>{scrollToPosition()}, 1500); // Delay the scroll by 500ms

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, []);

  const handlePlay = async () => {
    if (!isAuth()) {
      navigate("/signin");
      return;
    }
    try {
      const res = await axios({
        method: "POST",
        url: `${serverUrl}/users/auth`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/user");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log("User not authenticated");
        message.error("Session expired");
        userDataRemove();
      } else {
        message.error(error.response ? error.response.message : error.message);
        console.log("error: ", error.response ? error.response.message : error.message);
      }
      navigate("/signin");
    }
  };

  return (
    <>
      <div className={`navbar ${isNavbarVisible ? 'visible' : ''}`}>
        <div className='btn-left'>
          <button onClick={() => navigate("/user")}>MENU</button>
          <button onClick={() => navigate("/levels")}>LEVELS</button>
          <button>STORY</button>
        </div>
        <div className='btn-right'>
          <button>ABOUT</button>
          <button>HELP</button>
          <button>SETTING</button>
        </div>
      </div>

      <div className="scrollable-container">
        <div className='space'></div>
        <div className='space'></div>
        <div className='play-button'>
          <button onClick={handlePlay}>PLAY</button>
        </div>
      </div>
      <div className='story-container'>
        {content}
      </div>
    </>
  );
};

export default Home;
