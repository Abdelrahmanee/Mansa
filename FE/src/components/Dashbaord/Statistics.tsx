import StatCards from './StatCards'
import { Col, Row } from 'antd'
import BarChart from './BarChart'
import BieChart from './BieChart'
import LineChart from './LineChart'

const Statistics = () => {
  return (
    <div className='w-full h-full'>
      <StatCards />
      <Row gutter={[16, 16]} className='justify-between' >
        <Col xl={11} lg={24} md={24} sm={24} xs={24} className='h-96  mt-4  border-[1px] flex flex-col justify-center items-center border-gray-300 rounded-md'>
          <h1 className='text-2xl font-semibold mb-4 mt-2 text-center'>Students per Government</h1>
        <div className='w-full h-full'>
          <BarChart  />
        </div>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24} className='h-96 mt-4 border-[1px] flex flex-col justify-center items-center border-gray-300 rounded-md'>
          {/* <BieChart /> */}
          <LineChart />
        </Col>
        <Col span={24} className='h-96 mt-4 border-[1px] flex flex-col justify-center items-center border-gray-300 rounded-md'>
          <BieChart />
          {/* <LineChart /> */}
        </Col>
      </Row>
    </div>
  )
}

export default Statistics