import landing from '/assets/landing1.png'

export const Header = () => {
  return (
    <>

      <div className='min-h-[80vh] w-full md:px-10 md:pe-0 flex flex-col-reverse md:flex-row justify-between items-center'>
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
          <img  loading="lazy" src={landing} alt='mansa' className='w-full h-full' />
        </div>
      </div>
    </>
  )
}
