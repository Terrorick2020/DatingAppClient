import { JSX, memo, useCallback  } from 'react';
import type { PropsPhotosItem } from '@/types/ui.types';

import SvgClose from '@/assets/icon/close.svg?react';


const PhotosItem = memo((props: PropsPhotosItem): JSX.Element => {
    const handleClick = useCallback((): void => {
        props.setDelDialogState({
            open: true,
            targetId: props.item.id,
        })
    }, [props.setDelDialogState, props.item.id]);

    return (
        <li
            className="photos__item custom"
            style={{ backgroundImage: `url(${props.item.photo})` }}
        >
            <span
                className="delete"
                onClick={handleClick}
            >
                <SvgClose />
            </span>
        </li>
    )
})

export default PhotosItem;