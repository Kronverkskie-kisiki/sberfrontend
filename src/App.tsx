import React from 'react';
import { ConfigProvider } from 'antd';

import '../static/css/style.scss';
import { AppRoutes } from './components/routes';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const queryClient = new QueryClient();

  return (
    <div className='sb-app'>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#08a652',
              colorSuccess: '#08a652',
              colorWarning: '#f6650a',
              colorError: '#cc0000',
              borderRadius: 5,
            }, components: {
              Form: {
                verticalLabelMargin: '0 8px 8px',
              },
              InputNumber: {
                controlWidth: 200,
              },
              Progress: {
                defaultColor: '#f6650a',
              },
            },
          }}>
          <BrowserRouter>
            <AppRoutes/>
          </BrowserRouter>
        </ConfigProvider>
      </QueryClientProvider>
    </div>
  )
  ;
}

export default App;
