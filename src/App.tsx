import React from 'react';
import { ConfigProvider } from 'antd';

import '../static/css/style.scss';
import { AppRoutes } from './components/routes';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="sb-app">
      <ConfigProvider theme={{ token: {
        colorPrimary: '#08a652',
        colorWarning: '#f6650a',
        colorError: '#cc0000',
        borderRadius: 5,
      },
      }}>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
