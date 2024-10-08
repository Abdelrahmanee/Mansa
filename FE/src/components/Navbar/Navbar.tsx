import logo from '/assets/group.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Hooks/StoreHooks';
import { clearUser } from '../../Store/AuthSlice';
import { UserOutlined, PoweroffOutlined, SettingOutlined } from '@ant-design/icons'
import { handlelogout } from '../../utils/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

function Navbar() {

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user)
  const dispath = useAppDispatch()
  const nav = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: async () => await handlelogout(),
    onSuccess: () => {
      dispath(clearUser())
      nav('/login')
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    }
  })

  const handleLogout = async () => {
    await mutateAsync()
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
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/allLectures'>Lectures</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl">
          <img src={logo} className='w-[80%] h-[80%] md:w-full md:h-full' alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/allLectures'>Lectures</Link></li>
          <li><Link to='/mylectures'>My Lectures</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </div>
      <div className="navbar-end gap-2">


        {isAuthenticated ?
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {user?.profilePicture ? <img
                  alt="Tailwind CSS Navbar component"
                  src={user.profilePicture} /> : <img
                  alt="Tailwind CSS Navbar component"
                  src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg" />}


              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to='/profile' className="justify-between">
                  <span className='flex gap-1'>
                    <UserOutlined />
                    <span>Profile</span>
                  </span>
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to='/dashboard' className="justify-between">
                <span className='flex gap-1'>
                  <SettingOutlined />
                  <span>Admin</span>
                </span>
              </Link></li>
              <li><button onClick={handleLogout} className="justify-between font-poppins text-alternative-500 font-medium ">
                <span className='flex gap-1 items-center justify-center'>
                  <PoweroffOutlined className='text-red-500' />
                  <span>Log out</span>
                </span>
              </button></li>
            </ul>
          </div>
          : <>
            <Link to='/login' >
              <Button >Login </Button>
            </Link>
            <Link to='/signup' >
              <Button type='primary' className='bg-blue-600' >Sign up</Button>
            </Link></>}

      </div>
    </div >
  )
}

export default Navbar