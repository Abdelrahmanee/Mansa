import about from '/assets/about.png'
export const AboutUs = () => {
  return (
    <section className='w-full md:w-[80%] mx-auto my-10'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
        <div className='w-full md:w-1/2'>
          <img src={about} alt="" />
        </div>
        <div className='w-full text-center md:text-left md:w-1/2'>
        <div>
          <div className='relative w-fit mx-auto md:mx-0'>
            <h1
              className='relative font-Acme font-bold   text-4xl  mb-5 pb-0  text-shadow text-black'
            >About Us
            </h1>
            <div className='w-3/4 h-1/3 bg-secondary-200 absolute top-[65%]
          left-[0%] -z-10'></div>
          </div>
          <p className=' text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur ducimus ipsum esse soluta illum amet quam necessitatibus rem quas a debitis porro, totam aperiam ad! Fuga accusantium odit ad! Ea?</p>


          <p className=' mt-5 text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur ducimus ipsum esse soluta illum amet quam necessitatibus rem quas a debitis porro, totam aperiam ad! Fuga accusantium odit ad! Ea?</p>
        </div>
        </div>
      </div>

    </section>
  )
}
