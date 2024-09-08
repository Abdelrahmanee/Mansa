import { Header } from './Header'
import { MainFeature } from './MainFeature'
import NewsLatter from './NewsLetter'
import { AboutUs } from './AboutUs'
import Cards from './Cards'



function Home() {
  return (
    <>
    <Header />
    <MainFeature />
    <Cards />
    <AboutUs />
    <NewsLatter />

    </>
  )
}

export default Home