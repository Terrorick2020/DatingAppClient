import type { PhotoItem } from '@/types/profile.types';
import type { DelDialogState } from '.';

import SvgClose from '@/assets/icon/close.svg?react';


interface PropsPhotosItem {
    item: PhotoItem
    setDelDialogState: (value: DelDialogState) => void
}
const PhotosItem = (props: PropsPhotosItem) => {
    const handleClick = (): void => {
        props.setDelDialogState({
            open: true,
            targetId: props.item.id,
        })
    }

    return (
        <>
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
        </>
    )
}

export default PhotosItem;