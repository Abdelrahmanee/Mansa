import { Col, Image, Row } from "antd"
import Collapses from "./Collapse"
import { useAppSelector } from "../../Hooks/StoreHooks"
import { Lecture } from "../../utils/types"


const LectureDetials = () => {

  const lecture: Lecture = useAppSelector((state) => state.lecture.data)

  return (
    <>
      <div className=" w-full md:w-[80%] mx-auto h-full flex flex-col justify-start items-center">
        <Row gutter={[16, 16]} className="w-full  my-5">
          <Col sm={8} xs={24} className="md:w-[350px] flex justify-end items-center">
            <img src={lecture.logo} alt='course image' width={250} />
          </Col>
          <Col sm={16} xs={24} className="flex flex-col justify-center items-start">
            <h1 className="font-extrabold font-QuickStand mb-2 md:text-2xl w-2/3">{lecture.title}</h1>
            <p className="text-sm text-gray-500 font-QuickStand text-left w-2/3">{lecture.description}</p>
          </Col>
        </Row>
        <h1 className="font-Roboto font-bold md:text-2xl text-left my-2">Course Content : </h1>
        <Collapses />
      </div>
    </>
  )
}

export default LectureDetials