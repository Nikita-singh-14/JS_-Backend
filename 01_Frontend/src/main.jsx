import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { Home, Login, Signup, Terms,  VideoListing } from './components/index.js'

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='login' element={<Login/>} />
      <Route path='signup' element={<Signup/>} />
      <Route path='termsandcondition' element={<Terms/>} />
      <Route path='videolisting' element={<VideoListing/>} />
      {/* <Route path='subscribers' element={<About/>}/>
      <Route path='my-content' element={<User/>}/>
      <Route path='like-videos' element={<Contact/>}/> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
