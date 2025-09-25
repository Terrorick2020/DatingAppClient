import { JSX, useState, useEffect } from 'react';

import Skeleton from '@mui/material/Skeleton';
import JpgPlayerPreview from '@/assets/img/player-preview.jpg';


interface PropsMyPlayerPreview {
    imgUrl: string
}
const MyPlayerPreview = (props: PropsMyPlayerPreview): JSX.Element => {
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [src, setSrc] = useState<string>('');

    useEffect(() => {
        const img = new Image();
        img.src = props.imgUrl;

        img.onload = () => {
            setIsLoad(false);
            setSrc(props.imgUrl);
        };
        img.onerror = () => {
            setIsLoad(false);
            setSrc(JpgPlayerPreview);
        };
    }, []);

    return (
        <div className="my-player-preview">
            { isLoad
                ? <Skeleton variant="rectangular" />
                : <div
                    className="my-player-preview__bg"
                    style={{
                        backgroundImage: `url(${src})`
                    }}
                />
            }
        </div>
    )
};

export default MyPlayerPreview;
