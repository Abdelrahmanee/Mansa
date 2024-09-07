import logo from '../../Assets/Group.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Hooks/StoreHooks';
import { clearUser } from '../../Store/AuthSlice';


function Navbar() {

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispath = useAppDispatch()
  const nav = useNavigate()

  const handleLogout = () => {
    dispath(clearUser())
    nav('/login')
  }

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl">
          <img src={logo} className='w-[80%] h-[80%] md:w-full md:h-full' alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {isAuthenticated ?
          <Button
            onClick={handleLogout}
            className='hover:bg-red-700 hover:text-white transition-all duration-300'>Logout </Button>
          : <>
            <Link to='/login' >
              <Button >Login </Button>
            </Link>
            <Link to='/signup' >
              <Button type='primary' className='bg-blue-600' >Sign up</Button>
            </Link></>}

      </div>
    </div>
  )
}

export default Navbar