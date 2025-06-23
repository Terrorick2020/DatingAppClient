import { JSX, memo } from 'react';
import type { PropsPhotosLoadItem } from '@/types/ui.types';

import CircularProgress from '@mui/material/CircularProgress';


const PhotosLoadItem = memo((props: PropsPhotosLoadItem): JSX.Element => {
    return (
        <li
            className="photos__item load"
            key={`photos__load-item-${props.photo}`}
            style={{ backgroundImage: `url(${props.photo})` }}
        >
            <CircularProgress variant="determinate" value={props.progress} />
        </li>
    )
})

export default PhotosLoadItem;
