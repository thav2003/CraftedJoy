import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider } from 'antd'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FECEDA',
          colorPrimaryActive: '#FECEDA',
          colorPrimaryHover: '#FECEDA'
        },
        components: {
          Button: {
            defaultBg: '#F27280',
            defaultColor: 'black',
            defaultHoverBg: '#F27280',
            defaultActiveBg: '#F27280'
          },
          Input: {}
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
