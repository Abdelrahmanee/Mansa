import { UserAccountLayout } from './UserAccount'
import { UserProfileDetailsPage } from './Details'
import { Helmet } from 'react-helmet-async'

export const Profile = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className='w-full  md:w-[80%] mx-auto my-4'>
    <UserAccountLayout />
    <UserProfileDetailsPage />
    </div>
    </>
  )
}
