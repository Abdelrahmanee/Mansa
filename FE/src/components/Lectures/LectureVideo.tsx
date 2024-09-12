import { useAppSelector } from "../../Hooks/StoreHooks"
import { Lecture } from "../../utils/types"
import VideoPlayer from "../Videos/VedioPlayer"

export const LectureVideo = () => {

  const lecture: Lecture = useAppSelector((state) => state.lecture.data)

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="md:w-2/3 w-full h-full md:h-fit">
      <VideoPlayer id="player1" publicId={lecture.videos[0]} />
      <h1 className="p-5  font-QuickStand text-xl">{lecture.title}</h1>
      </div>
    </div>
  )
}
