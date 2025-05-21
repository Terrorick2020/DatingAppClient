import { useState, memo, useEffect, JSX } from 'react';
import type { PropsPhotosLoadItem } from '@/types/ui.types';

import CircularProgress from '@mui/material/CircularProgress';


const PhotosLoadItem = memo((props: PropsPhotosLoadItem): JSX.Element => {
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
        <li
            className="photos__item load"
            key={`photos__load-item-${props.photo}`}
            style={{ backgroundImage: `url(${props.photo})` }}
        >
            <CircularProgress variant="determinate" value={progress} />
        </li>
    )
})

export default PhotosLoadItem;
