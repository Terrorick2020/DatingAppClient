import { useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';


interface PropsPhotosLoadItem {
    photo: string
}
const PhotosLoadItem = (props: PropsPhotosLoadItem) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 180);
    
        return () => {
          clearInterval(timer);
        };
      }, []
    );

    return (
        <>
            <li
                className="photos__item load"
                key={`photos__load-item-${props.photo}`}
                style={{ backgroundImage: `url(${props.photo})` }}
            >
                <CircularProgress variant="determinate" value={progress} />
            </li>
        </>
    )
}

export default PhotosLoadItem;
