import React, { useEffect, useState } from 'react'
import "./User.css"
import GradientButton from '../../components/GradientButton'
import { gameFolder } from '../../config/serverFolders'
import LoadingPage from '../../components/LoadingPage'
import PersonalDetails from './PersonalDetails'
import StatBox from './StatBox'
import { useNavigate } from 'react-router-dom'
import { isAuth } from '../../auth'
import useFetchImage from '../../hooks/useFetchImage'


const User = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if(!isAuth())
      return navigate("/signin")

  }, [])
  const {loading, data} = useFetchImage(gameFolder, "user_portal")
  return (
    <LoadingPage loading={loading}>
      
      <div className='main-container' style={{ backgroundImage: `url(${data})` }}>
       
            <div className='header'>
              <button onClick={() => navigate("/")}>HOME</button>
            </div>

            <div className='body'>

              <PersonalDetails />
              
              <div className='continue-button'>
                <GradientButton onClick = {() => navigate("/game")}>CONTINUE</GradientButton>
              </div>

              <div className='stats'>
                <StatBox navigate={navigate} />
              </div>

            </div>
          
      </div>
    </LoadingPage>
  )
}

export default User