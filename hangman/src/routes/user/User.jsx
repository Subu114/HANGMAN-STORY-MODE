import React, { useEffect, useState } from 'react'
import "./User.css"
import GradientButton from '../../components/GradientButton'
import { gameFolder } from '../../config/serverFolders'
import LoadingPage from '../../components/LoadingPage'
import PersonalDetails from './PersonalDetails'
import StatBox from './StatBox'
import { useNavigate } from 'react-router-dom'
import { isAdmin, isAuth } from '../../auth'
import useFetchImage from '../../hooks/useFetchImage'
import { game } from '../../page/game/game'


const User = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!isAuth())
      return navigate("/signin")

  }, [])
  const { loading: l, data } = useFetchImage(gameFolder, "user_portal")
  return (
    <LoadingPage loading={loading || l}>

      <div className='main-container' style={{ backgroundImage: `url(${data})` }}>

        <div className='header'>
          <button onClick={() => navigate("/")}>HOME</button>
        </div>

        <div className='body'>

          <PersonalDetails />

          <div className='continue-button'>
            <GradientButton text={"CONTINUE"} onClick={async () => {
              if (isAdmin()) {
                return navigate("/admin")
              }
              setLoading(true)
              const val = await game()
              if (val === 100) {
                navigate("/hangman")
              }
              else if(val){
                setLoading(false)
                navigate('/scenepage')
              }
              setLoading(false)

            }}>CONTINUE</GradientButton>

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