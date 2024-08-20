import React from 'react';
import { CircleLoader } from 'react-spinners';

const LoadingPage = ({children, loading}) => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {loading && (
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
              <CircleLoader color="#ffffff" />
            </div>
          )}
          <div style={{ pointerEvents: loading ? 'none' : 'all' }}>
            {children}
          </div>
        </div>
      );
}

export default LoadingPage;
