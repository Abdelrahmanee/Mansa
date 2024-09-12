import { Button } from "antd"
import { useAppSelector } from "../../Hooks/StoreHooks"
import { Lecture } from "../../utils/types"

export const LecturePDFs = () => {

  const lecture: Lecture = useAppSelector((state) => state.lecture.data)

  return (
    <div className="flex justify-center items-center">
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Name</th>
              <th>Lecture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {lecture.pdfs.map((pdf, index) => (
              <tr key={index} className="text-center">
                <th>{index + 1}</th>
                <td>{lecture.title}</td>
                <td>
                  <a href={pdf} target="_blank" rel="noopener noreferrer">
                    View PDF
                  </a>
                </td>
                <td>
                  <Button><a href={pdf} target="_blank" rel="noopener noreferrer">
                    download
                  </a></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
