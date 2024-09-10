import { useParams } from "react-router-dom";
import { ProtectedLectureRoute } from "./ProtectedLectureRoute";
import Lectures from "./Lectures";

export const LectureRoute = () => {

  const { lectureId } = useParams<{ lectureId: string }>();


  if (!lectureId) {
    return <div>Error: Lecture ID is missing</div>; 
  }




  return (
    <ProtectedLectureRoute lectureId={lectureId}>
      <Lectures />
    </ProtectedLectureRoute>
  )
}
