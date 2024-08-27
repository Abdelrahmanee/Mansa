import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Signup from "./Components/Signup/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Loging/Login";
import Home from "./Components/Home/Home";
import { Provider } from "react-redux";
import { store } from "./Store/Strore";
import PrivateRoute from "./Components/ProtectedRoutes/ProtectedRoutes";
import Error10 from "./Components/NotFound/NotFound";


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
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
