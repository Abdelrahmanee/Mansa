import { Header } from './Header'
import { MainFeature } from './MainFeature'
import NewsLatter from './NewsLetter'
import { AboutUs } from './AboutUs'
import Cards from './Cards'
import { Helmet } from 'react-helmet-async'


function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>E-learning</title>
        <meta name="description" content="E-learning website" />
      </Helmet>
      <Header />
      <MainFeature />
      <Cards />
      <AboutUs />
      <NewsLatter />

    </>
  )
}

export default Home