import { UserAccountLayout } from './UserAccount'
import { UserProfileDetailsPage } from './Details'

export const Profile = () => {
  return (
    <>
    <div className='w-full  md:w-[80%] mx-auto my-4'>
    <UserAccountLayout />
    <UserProfileDetailsPage />
    </div>
    </>
  )
}
