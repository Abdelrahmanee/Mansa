import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './Store/Store'
import Layout from './components/Layout/Layout'
import PrivateRoute from './components/ProtectedRoute/ProtectedRoute'
import Home from './components/Home/Home'
import { Login } from './components/Login/Login'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Error10 from './components/NotFound/NotFound'
import { Signup } from './components/Signup/Signup'
import 'react-toastify/dist/ReactToastify.css';
import { LectureVideo } from './components/Lectures/LectureVideo'
import { LecturePDFs } from './components/Lectures/LecturePDFs'
import LectureDetials from './components/Lectures/LectureDetials'
import { LectureRoute } from './components/Lectures/LectureRoute'
import { AccessCode } from './components/AccessCode/AccessCode'
import AllLectures from './components/AllLectures/AllLectures'
import { Contactus } from './components/ContactUs/Contactus'
import { Profile } from './components/Profile/Profile'

const queryClient = new QueryClient()


function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <PrivateRoute><Home /></PrivateRoute> },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        { path: 'AllLectures', element: <PrivateRoute><AllLectures /></PrivateRoute> },
        { path: 'contact', element:<PrivateRoute> <Contactus /></PrivateRoute> },
        { path: 'profile', element:<PrivateRoute> <Profile /></PrivateRoute> },
        {
          path: 'lecture/:lectureId',
          element: <LectureRoute />,  
          children: [
            { index: true, element: <LectureDetials /> },   
            { path: "videos", element: <LectureVideo /> },  
            { path: "pdfs", element: <LecturePDFs /> },        
          ]
        },
        { path: "lecture/:lectureId/access-code", element: <AccessCode /> },
        { path: "*", element: <Error10 /> }
      ]
    }
  ])

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer autoClose={2000} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
