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
import Lectures from './components/Lectures/Lectures'
import { LectureVideo } from './components/Lectures/LectureVideo'
import { LecturePDFs } from './components/Lectures/LecturePDFs'
import LectureDetials from './components/Lectures/LectureDetials'

const queryClient = new QueryClient()


function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <PrivateRoute><Home /></PrivateRoute> },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        {
          path: 'lecture', element: <Lectures />, children: [
            { index: true, element: <LectureDetials /> },
            { path: "vedios", element: <LectureVideo /> },
            { path: "pdfs", element: <LecturePDFs /> },
          ]
        },
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
