import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Signup from "./Components/Signup/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";


const queryClient = new QueryClient()

function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: 'signup', element: <Signup /> }
      ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
