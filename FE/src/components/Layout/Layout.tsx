import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'


function Layout() {
  return (
    <>
    <Navbar />
    {/* <div className='mt-[65px]'> */}
    <Outlet />
    {/* </div> */}
    </>
  )
}

export default Layout