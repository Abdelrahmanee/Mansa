import VideoPlayer from "../Videos/VedioPlayer"

export const LectureVideo = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="md:w-2/3 w-full h-full md:h-fit">
      <VideoPlayer id="player1" publicId="http://res.cloudinary.com/dnt9dg5dw/video/upload/v1725726988/lectures/videos/ilr9isf0mp3hxq0s5scl.mp4" />
      <h1>description</h1>
      </div>
    </div>
  )
}
