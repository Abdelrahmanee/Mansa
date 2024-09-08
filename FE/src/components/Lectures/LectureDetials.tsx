import { Col, Image, Row } from "antd"
import Collapses from "./Collapse"


const LectureDetials = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <Row gutter={[16, 16]} className="w-full h-full">
          <Col sm={4} xs={24}>
            <Image src='https://img-b.udemycdn.com/course/240x135/1672410_9ff1_5.jpg' alt='course image' />
          </Col>
          <Col sm={16} xs={24}>
            <h1>Node.js, Express, MongoDB & More: The Complete Bootcamp</h1>
            <p>This is the description of the course.This is the description of the course.This is the description of the course.This is the description of the course.This is the description of the course.</p>
          </Col>
        </Row>
        <Collapses/>
      </div>
    </>
  )
}

export default LectureDetials