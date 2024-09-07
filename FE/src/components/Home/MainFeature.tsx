import feature1 from "../../Assets/feature1.png"
import feature2 from "../../Assets/feature2.png"
import feature3 from "../../Assets/feature3.png"
import feature4 from "../../Assets/feature4.png"

export const MainFeature = () => {
  return <>
    <section className='my-10'>
      <div className='w-full p-5'>
        {/* <div className='w-fit mx-auto'>
          <Chip color='blue' value='Features' className='!opacity-80 mb-2' />
        </div> */}
        <div className='relative w-fit mx-auto'>
          <h1
            className='relative font-Acme font-bold   text-5xl text-center  pb-0  text-shadow text-gray-800'
          >Main Feature
          </h1>
          <div className='w-3/4 h-1/3 bg-main-200 absolute top-[65%]
            left-[12.5%] -z-10'></div>
        </div>


        <p className='text-center text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
      </div>


      <div className='w-full md:w-[80%] mx-auto p-5' >
        <div className='w-full flex flex-col justify-center items-start gap-10 lg:gap-y-16'>

          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-4">


            <div className='w-full md:w-1/2 flex items-center justify-center'>
              <div className=" w-[100px] relative ">
                <div className="w-[70px] h-[70px] p-3 border border-spacing-1 border-main-100  rounded-2xl rotate-[45deg]">
                </div>
                <img src={feature1} className="w-[85px] top-[5%] left-0  absolute" alt="" />
              </div>

              <div className="w-1/2">
                <h1 className="text-xl">+100</h1>
                <h2 className="text-xl font-QuickSand">HD Videos</h2>
              </div>

            </div>

            <div className='w-full md:w-1/2 flex items-center justify-center'>
              <div className=" w-[100px] relative ">
                <div className="w-[70px] h-[70px] p-3 border border-spacing-1 border-main-100  rounded-2xl rotate-[45deg]">
                </div>
                <img src={feature2} className="w-[80px] top-[5%] left-0  absolute" alt="" />
              </div>

              <div className="w-1/2">
                <h1 className="text-xl">+200</h1>
                <h2 className="text-xl font-QuickSand">Profission</h2>
              </div>

            </div>

          </div>

          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-4">


            <div className='w-full md:w-1/2 flex items-center justify-center'>
              <div className=" w-[100px] relative ">
                <div className="w-[70px] h-[70px] p-3 border border-spacing-1 border-main-100  rounded-2xl rotate-[45deg]">
                </div>
                <img src={feature3} className="w-[65px] top-[5%] left-[2%]  absolute" alt="" />
              </div>

              <div className="w-1/2">
                <h1 className="text-xl">$400</h1>
                <h2 className="text-xl  font-QuickSand">Saves per year</h2>
              </div>

            </div>

            <div className='w-full md:w-1/2 flex items-center justify-center'>
              <div className=" w-[100px] relative ">
                <div className="w-[70px] h-[70px] p-3 border border-spacing-1 border-main-100  rounded-2xl rotate-[45deg]">
                </div>
                <img src={feature4} className="w-[85px] top-[5%] left-[-5%]  absolute" alt="" />
              </div>

              <div className="w-1/2">
                <h1 className="text-xl">Free</h1>
                <h2 className="text-xl w-[85px] md:w-full font-QuickSand">Life Time Access</h2>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  </>

}
