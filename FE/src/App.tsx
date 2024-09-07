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
// import PrivateRoute from './components/ProtectedRoute/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()


function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <PrivateRoute><Home /></PrivateRoute> },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        {path:"*" ,element: <Error10/>}
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
