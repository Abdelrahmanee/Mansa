import { useParams } from "react-router-dom";
import { ProtectedLectureRoute } from "./ProtectedLectureRoute";
import Lectures from "./Lectures";
import { useQuery } from "@tanstack/react-query";
import { getLectureByID } from "../../utils/api";
import { LectureByID } from "../../utils/types";
import { useAppDispatch } from "../../Hooks/StoreHooks";
import { setLecture } from "../../Store/LecuteSlice";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";

export const LectureRoute = () => {

  const { lectureId } = useParams<{ lectureId: string }>();
  const dispatch = useAppDispatch()


  const { data, isLoading } = useQuery<LectureByID>({
    queryKey: ['lectureByID', lectureId],
    queryFn: () => getLectureByID(lectureId as string),
    refetchOnWindowFocus: false,
    enabled: !!lectureId,
    retry: 1,
  })

  if (!lectureId) {
    return <div>Error: Lecture ID is missing</div>;
  }

  if (data?.status === 'success') {
    dispatch(setLecture(data))
  }

  return (
    <>
      {
        isLoading ? <div className='w-full h-screen flex justify-center items-center'>
          <Spin indicator={<LoadingOutlined spin />} size='large' />
        </div> : <ProtectedLectureRoute lectureId={lectureId}>
          <Lectures />
        </ProtectedLectureRoute>
      }

    </>
  )
}
