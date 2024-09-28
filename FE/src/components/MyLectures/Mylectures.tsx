import { useQuery } from "@tanstack/react-query"
import { getUserLectures } from "../../utils/api"
import { Button, Col, Row, Spin } from "antd";
import { StudentLecturesResponse } from "../../utils/types";
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


export const Mylectures = () => {

  const { data, isError, isLoading, error } = useQuery<StudentLecturesResponse>({
    queryKey: ['student-lectures'],
    queryFn: () => getUserLectures(),
    staleTime: 50000,
  })

  if (isError) {
    toast.error(error.message)
    return <div>{error.message}</div>
  }


  return (
    <div className="w-[80%] py-10  md:p-10 mx-auto">
      <div className='w-full flex justify-center items-center mb-5'>
        <div className='relative w-fit mx-auto md:mx-0'>
          <h1
            className='relative font-Acme font-bold font-QuickStand text-3xl md:text-4xl  mb-5 pb-0  text-shadow text-black'
          >My Lectures
          </h1>
          <div className='w-3/4 h-1/4 bg-secondary-200 absolute top-[35%]
          left-[12.5%] -z-10'></div>
        </div>
      </div>
      {isLoading ? <div className='w-[80%] mx-auto mt-10 min-h-[250px] flex justify-center items-center'><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} size="large" /></div> : (data?.lectures.map((lecture) => <Row gutter={0} key={lecture._id} className="mb-4 md:w-[70%] mx-auto border border-blue-200 hover:border-blue-500 transition-all duration-300 rounded-md shadow border-spacing-1">
        <Col xs={24} md={9} className=" p-3">
          <img className="w-full h-full rounded" src={lecture.logo} alt={lecture.title} />
        </Col>
        <Col xs={24} md={15} className="p-3 flex flex-col justify-center ">
          <h1 className="font-QuickStand text-xl font-bold">{lecture.title}</h1>
          <p className="">{lecture.description}</p>
          <Link to={`/lecture/${lecture._id}`} className="w-full ">
            <Button className="mt-3" block>Go to course</Button>
          </Link>
        </Col>
      </Row>))}



    </div>
  )
}
