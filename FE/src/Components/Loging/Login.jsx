import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, Input, Typography } from "@material-tailwind/react"
import { useForm } from "react-hook-form"
import { loginSchema } from "./validation"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { login } from "../../utils/api"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { setUser } from "../../Store/AuthSlice"

function Login() {

  const [isLoading, setIsLoading] = useState(false)
  const nav = useNavigate()
  const dispatch = useDispatch()

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await login(data)
    },
    onError: (error) => {
      console.log('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
      setIsLoading(false)
    },
    onSuccess: (data) => {
      dispatch(setUser(data.user))
      nav('/')
      toast.success('login successfully!',{autoClose: 1500});
      setIsLoading(false)
    },
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const res = await mutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='w-full min-h-[80vh]  flex flex-col md:flex-row justify-center items-center font-QuickSand'>
      <Card color="transparent" shadow={true} className="shadow-xl   px-8 py-6 border border-main-100 min-w-[95%] md:min-w-[450px]">
        <div className=' md:block'>
          <h1 className=' text-2xl sm:text-3xl mb-1 sm:mb-2 font-QuickSand font-bold text-blue-800  '>Welcome Back</h1>
          <Typography color="gray" className="my-1  font-normal text-[0.7rem] sm:text-[0.9rem] font-QuickSand">
            Nice to meet you! Enter your details to Login.
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}
          autoComplete="false"
          className="flex flex-col justify-center items-center gap-3 my-3">
          <div className="w-[100%]">
            <Input
              className='w-full'
              type="email"
              label="Email"
              variant='standard'
              {...register("identifier")}
              error={!!errors.identifier}
            />
            {errors.identifier && <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal text-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.identifier?.message}
            </Typography>}
          </div>

          <div className="w-[100%]">
            <Input
              className='w-full'
              type="password"
              label="Password"
              variant='standard'
              {...register("password")}
              error={!!errors.password}
            />
            {errors.password && <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal text-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.password?.message}
            </Typography>}
          </div>
          {isLoading ? <Button type="submit" loading={isLoading} className="w-[90%] mt-4 bg-blue-500 text-white flex justify-center items-center" >loading</Button> :<Button type="submit" className="w-[90%] mt-4 bg-blue-500 text-white" >Login</Button> }
        </form>

        <div className="flex flex-row justify-center items-center gap-3 my-2">
          <Link to="/forgot-password" className="hover:text-blue-500 transition-all duration-300">Forgot Password?</Link>
        </div>


        <div className="flex flex-row justify-center items-center gap-3 my-2">
          <p>Don't have an account ?</p>
          <Link to="/signup" className="text-blue-500 transition-all duration-300 font-bold">Sign up </Link>
        </div>


      </Card>

    </div>
  )
}

export default Login