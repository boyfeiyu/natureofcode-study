import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'virtual:uno.css'
import './index.css'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            contentBg: '#f3f3f3',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
)
