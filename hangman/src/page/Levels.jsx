import React, { useState, useEffect, useRef } from 'react';
import './Levels.css';
import Level from '../components/Level';
import bg from '../assets/level_bg.png';
import { message } from 'antd';
import axios from 'axios';
import { serverUrl } from '../config/serverUrl';
import LoadingPage from '../components/LoadingPage';
import { getUserId, isAuth } from '../auth';

const Levels = () => {
  const [activeLevel, setActiveLevel] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const levelsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      const controller = new AbortController();
      const { signal } = controller;
      setLoading(true);

      try {
        const res = await axios.get(`${serverUrl}/levels/`,
          {
            signal,
            params : {_id : getUserId() ? getUserId() : null }
          }
        );
        setData(res.data.levels);
        console.log(res.data.levels);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          message.error(error.response ? error.response.data.message : error.message);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }

      return () => {
        controller.abort();
      };
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight / 2;

      levelsRef.current.forEach((level, index) => {
        const rect = level.getBoundingClientRect();

        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveLevel(index);
        }
      });
    };

    const scrollContainer = document.querySelector('.levels-scroll');
    scrollContainer.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <LoadingPage loading={loading}>
      <div className="level-main-container" style={{ backgroundImage: `url(${bg})` }}>
        <div className="level-header-wrapper">
          <div className="level-header">
            <div className="level-title">DESCEND INTO THE DARKNESS:</div>
            <hr />
            <div className="level-description">UNLOCK YOUR FATE</div>
          </div>
        </div>
        <div className="level-body">
          <div className="levels-scroll">
            <div style={{ marginTop: "3%", border: "2px solid transparent" }} />
            <div style={{ width: "300px", marginTop: "5%", border: "2px solid transparent" }} />
            {data.map((level, index) => (
              <Level
                key={index}
                ref={el => levelsRef.current[index] = el}
                className={activeLevel === index ? 'active' : ''}
                level={level}
              />
            ))}
            <div style={{ width: "300px", marginBottom: "20%", border: "2px solid transparent" }} />
          </div>
        </div>
      </div>
    </LoadingPage>
  );
};

export default Levels;
