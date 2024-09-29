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
import { ForgetPassword } from './components/ForgetPassword/ForgetPassword'
import { ResetPassword } from './components/ForgetPassword/ResetPassword'
import { Mylectures } from './components/MyLectures/Mylectures'
import Dashboard from './components/Dashbaord/Dashboard'
import Statistics from './components/Dashbaord/Statistics'
import SudentsTable from './components/Dashbaord/StudentsTable'
import LecturesTable from './components/Dashbaord/LectureTable'
import { HelmetProvider } from 'react-helmet-async'



const queryClient = new QueryClient()


function App() {



  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <PrivateRoute><Home /></PrivateRoute> },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        { path: 'forgetPassword', element: <ForgetPassword /> },
        { path: 'resetPassword', element: <ResetPassword /> },
        { path: 'AllLectures', element: <PrivateRoute><AllLectures /></PrivateRoute> },
        { path: 'contact', element: <PrivateRoute> <Contactus /></PrivateRoute> },
        { path: 'profile', element: <PrivateRoute> <Profile /></PrivateRoute> },
        { path: 'mylectures', element: <PrivateRoute> <Mylectures /></PrivateRoute> },
        {
          path: 'lecture/:lectureId',
          element: <LectureRoute />,
          children: [
            { index: true, element: <LectureDetials /> },
            { path: "videos", element: <LectureVideo /> },
            { path: "pdfs", element: <LecturePDFs /> },
          ]
        },
        {
          path: 'Dashboard',
          element: <Dashboard />,
          children: [
            { index: true, element: <Statistics /> },
            { path: "students", element: <SudentsTable /> },
            { path: "lecturers", element: <LecturesTable /> },
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
          <HelmetProvider>
            <RouterProvider router={router} />
            <ToastContainer autoClose={2000} />
          </HelmetProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
