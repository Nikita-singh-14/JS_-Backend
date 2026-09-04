import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import './index.css'
import { ChannelTop, Home, Login, Signup, Terms, VideoList, VideoListing } from './components/index.js'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='termsandcondition' element={<Terms />} />
      <Route path='videolisting' element={<VideoListing />} />
      <Route path='videolistview' element={<VideoList />} />

      <Route path='channeltop' element={<ChannelTop />} />
      {/* <Route path='like-videos' element={<Contact/>}/> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
