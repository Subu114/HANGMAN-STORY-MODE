import React from 'react';
import GameWonOverlay from './GameWonOverlay';
import GameLostOverlay from './GameLostOverlay';

const GameState = ({children, gameState, navigate}) => {
  console.log(gameState)
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {gameState === "lost" && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10
            }}>
              <GameLostOverlay onMenuClick={() => {navigate("/")}} onRestartClick={()  => {navigate("/user")}}/>
            </div>
          )}
          {gameState === "finished" && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10
            }}>
              <GameWonOverlay onMenuClick={() => {navigate("/")}} onRestartClick={()  => {}}/>
              </div>
          )}
          <div style={{ pointerEvents: (gameState == "pending" || gameState == "won") ?'all' : 'none'}}>
            {children}
          </div>
        </div>
      );
}

export default GameState;
