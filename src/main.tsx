import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { router } from './routes'
import { store } from './store'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position='top-right'
        autoClose={4000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
      />
    </Provider>
  </React.StrictMode>
)
