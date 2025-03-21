import { useState } from "react";
import SvgAdd from '@/assets/icon/add.svg'
import SvgClose from "@/assets/icon/close.svg?react";
import PngWoman from "@/assets/img/woman.jpg";


interface ImageItem {
  id: number;
  img: string;
}

const initialImgsList: ImageItem[] = [
  { id: 1, img: PngWoman },
  { id: 2, img: PngWoman },
  { id: 3, img: PngWoman },
]

const Photos = () => {
  const [imgsList, setImgsList] = useState(initialImgsList);

  const handleDelete = (id: number) => {
    setImgsList(imgsList.filter(item => item.id !== id));
  };

  const handleAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Проверка типа файла и размера
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validImageTypes.includes(file.type)) {
      alert('Разрешены только изображения в форматах JPG, PNG и GIF');
      return;
    }
    
    if (file.size > maxSize) {
      alert('Файл слишком большой. Максимальный размер 5MB');
      return;
    }

    // Создаем URL для нового изображения
    const imageUrl = URL.createObjectURL(file);
    
    // Добавляем новое изображение в список
    const newItem: ImageItem = {
      id: Date.now(),
      img: imageUrl
    };
    
    setImgsList([...imgsList, newItem]);
    
    // Очищаем input после добавления файла
    event.target.value = '';
  };

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
      {
        imgsList.length < 3 &&
        <li className="photos__item add">
          <input
            className="btn"
            type="file"
            accept="image/*"
            onChange={handleAdd}
          />
          <img src={SvgAdd} alt="camera" />
        </li>
      }
    </ul>
  )
}

export default Photos
