import { Col, Image, Row } from "antd"
import Collapses from "./Collapse"
import { useAppSelector } from "../../Hooks/StoreHooks"
import { Lecture } from "../../utils/types"


const LectureDetials = () => {

  const lecture: Lecture = useAppSelector((state) => state.lecture.data)

  return (
    <>
      <div className=" w-full md:w-[80%] mx-auto h-full flex flex-col justify-center items-center">
        <Row gutter={[16, 16]} className="w-full  my-5">
          <Col sm={4} xs={24}>
            <Image src={lecture.logo} alt='course image' />
          </Col>
          <Col sm={16} xs={24}>
            <h1 className="font-extrabold font-QuickStand mb-2 md:text-2xl">{lecture.title}</h1>
            <p>{lecture.description}</p>
          </Col>
        </Row>
        <h1 className="font-Roboto font-bold md:text-2xl text-left my-2">Course Content : </h1>
        <Collapses />
      </div>
    </>
  )
}

export default LectureDetials