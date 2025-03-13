import { useState } from "react"
import SvgClose from "@/assets/icon/close.svg?react"
import PngWoman from "@/assets/img/woman.jpg"


const initialImgsList = [
  { id: 1, img: PngWoman },
  { id: 2, img: PngWoman },
  { id: 3, img: PngWoman },
]

const Photos = () => {
  const [imgsList, setImgsList] = useState(initialImgsList)

  const handleDelete = (id: number) => {
    setImgsList(imgsList.filter(item => item.id !== id))
  }

  return (
    <ul className="photos" id="photos">
      {imgsList.map(item => (
        <li
          className="photos__item"
          key={item.id}
          style={{ backgroundImage: `url(${item.img})` }}
        >
          <span
            className="delete"
            onClick={() => handleDelete(item.id)}
          >
            <SvgClose />
          </span>
        </li>
      ))}
    </ul>
  )
}

export default Photos
