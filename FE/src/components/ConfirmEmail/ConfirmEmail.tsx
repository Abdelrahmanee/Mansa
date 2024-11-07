import { useQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import { confirmEmail } from "../../utils/api";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

const ConfirmEmail = () => {
  const params = useParams()
  const nav = useNavigate()


  const { data, error, isError } = useQuery<AxiosResponse, Error>({
    queryKey: ["confirmEmail", params.token],
    queryFn: async () => confirmEmail(params.token as string),
    staleTime: 100000,
    retry: false,
  });



  useEffect(() => {
    if (data?.data) {
      nav('/login');
    }
  }, [data?.data, nav]);



  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center gap-5">
      {error ? <h1 className="font-QuickStand md:text-3xl font-bold text-gray-700">An error occuer please try again</h1>
        : <><RotatingLines
          width="150"
          strokeColor="#3b82f6"
          visible={true}
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
          <h1 className="font-QuickStand md:text-3xl font-bold text-gray-700">Verifying Your Email</h1>
        </>}
    </div>
  )
}

export default ConfirmEmail