import React from 'react';
import GameWonOverlay from './GameWonOverlay';
import GameLostOverlay from './GameLostOverlay';

const GameState = ({children, gameState, navigate}) => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {gameState === "won" && (
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
              <GameWonOverlay onMenuClick={() => {navigate("/")}} onRestartClick={()  => {navigate("/user")}}/>
            </div>
          )}
          {gameState === "as" && (
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
              <GameWonOverlay/>
            </div>
          )}
          <div style={{ pointerEvents: 'none'}}>
            {children}
          </div>
        </div>
      );
}

export default GameState;
