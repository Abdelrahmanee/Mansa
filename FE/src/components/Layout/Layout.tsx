import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'
import { useEffect } from 'react'
import { checkAuthToken } from '../../utils/checkAuthToken'
import { useAppDispatch } from '../../Hooks/StoreHooks'
import { logOut } from '../../Store/AuthSlice'


function Layout() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    const tokenIsValid: boolean = checkAuthToken()
    if (!tokenIsValid) {
      dispatch(logOut())
    }

  }, [dispatch])

  
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout