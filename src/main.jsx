import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import './poppins.css'
import HomePage from './pages/Home'
import DetailPage from './pages/Detail'
import EditPage from './pages/Edit'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/users/:id',
    element: <DetailPage />,
  },
  {
    path: '/users/:id/edit',
    element: <EditPage />,
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
