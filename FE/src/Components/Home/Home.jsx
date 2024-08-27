import React from 'react'
import landing from '../../Assets/Landing.png'
import { Button } from '@material-tailwind/react'

function Home() {
  return (
    <>

{/* <!--Start Background Animation Body--> */}
		<div className="area">
			<ul className="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
		{/* <!--End Background Animation Body--> */}
    
    <div className='h-[80vh] mt-10 md:mt-0 w-full md:px-10 flex flex-col-reverse md:flex-row justify-between items-center'>
      <div className='md:w-1/2 text-center md:text-left'>
        <h1 className='text-6xl font-Poppins font-bold text-transparent bg-clip-text bg-gradient-to-tr to-cyan-500 from-blue-600'>
          Online <br />
          Education
        </h1>
        <p className='text-lg font-QuickSand font-medium text-gray-700 md:w-[90%] mb-2'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iure error natus consequatur ea fuga, quisquam autem eos dolor vitae distinctio aliquid. Dolor, aliquid vero.
        </p>

        <a href=""
          className="animate-bounce  focus:animate-none hover:animate-none inline-flex text-md font-medium bg-red-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-white">
          <span className="ml-2">Explore more ✍️</span>
        </a>
      </div>
      <div className='md:w-1/2'>
        <img src={landing} alt='mansa' className='w-full' />
      </div>
    </div>
            </>
  )
}

export default Home