import './Home.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import content from './info';
import { message } from 'antd';
import axios from 'axios';
import { serverUrl } from './config/serverUrl';
import { token } from './config/userData';
const Home = () => {
  const navigate = useNavigate();
  const handlePlay = async () =>{
    try {
      const res = await axios({
        method : "POST",
        url : `${serverUrl}/users/auth`,
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      navigate("/user")
    } catch (error) {
      if(error.response.status === 403)
      {
        console.log("User not authenticated")
        message.error("Session expired")
        navigate("/signin")
      }
      else{
        message.error(error.response ? error.response.message : error.message)
        console.log("error : ", error.response ? error.response.message : error.message)
        navigate("/")
      }
    }
  }
  return (
    <>
      <div className="scrollable-container" >

        <div className='navbar'>
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

        <div className='space'>
        </div>
        <div className='space'>
        </div>
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
