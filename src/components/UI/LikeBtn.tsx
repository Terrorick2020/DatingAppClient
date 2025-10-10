import { JSX, memo, useState, useEffect, useMemo, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { acceptLikingAsync, rejectLikingAsync } from '@/store/slices/likesSlice';
import { ERejectLikingType } from '@/types/likes.types';
import type { PropsLikeBtn } from '@/types/ui.types';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import SvgHeartsBtn from '@/assets/icon/hearts-btn.svg';
import SvgClose from '@/assets/icon/close.svg';
import CircularProgress from '@mui/material/CircularProgress';


const LikeBtn = memo((props: PropsLikeBtn): JSX.Element => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [isReject, setIsReject] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(() => {
        if(!props.isReject) return;

        setIsReject(props.isReject);
    }, []);

    const animatedBtn = (): Promise<void> => {
        return new Promise((resolve) => {
            const heartHtml = document.getElementById(`heart-${props.id}`);

            if (!heartHtml) return resolve();

            const handleAnimationEnd = () => {
                heartHtml!.style.animation = 'none';
                heartHtml!.removeEventListener('animationend', handleAnimationEnd);
                resolve();
            };

            heartHtml.addEventListener('animationend', handleAnimationEnd);
            void heartHtml.offsetWidth;
            heartHtml.style.animation = 'heart-top 1.5s ease-in-out forwards';
        });
    };

    const sendLiking = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.currentTarget.blur();

        setDisabled(true);
        setLoad(true);

        const acceptRes = isReject
            ? await dispatch(rejectLikingAsync({
                id: props.id,
                type: ERejectLikingType.Direct,
              })).unwrap()
            : await dispatch(acceptLikingAsync(props.id)).unwrap();

        if(acceptRes && acceptRes !== 'error') {
            await animatedBtn();

            setIsReject(!isReject);

            if(props.clickLike) props.clickLike();
        };

        setLoad(false);
        setDisabled(false);
    };

    const SvgIcon = useMemo(() => {
        if(load) return <CircularProgress size="22px" />;
        const imgUrl = isReject ? SvgClose :  SvgHeartsBtn;
        const addClass = isReject ? 'reject' : 'accept';
        
        return <img className={ addClass } src={ imgUrl } alt="like-btn" loading="lazy" decoding="async" />;
    }, [load, isReject]);

    const AnimeIcon = useMemo(() => {
        if(isReject) return <img src={ SvgClose } className="close" alt="anime-icon" loading="lazy" decoding="async" />;

        return <i className="fa-solid fa-heart" />;
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z"/></svg>
    }, [isReject]);

    return (
        <>
            <div
                className="heart"
                id={ `heart-${props.id}` }
            >
                { AnimeIcon }
            </div>
            <Button
                disabled={ disabled }
                className={ `icon-btn like-btn ${isReject ? 'purple' : ''}` }
                variant="contained"
                onClick={ sendLiking }
            >   
                { SvgIcon }
            </Button>
        </>
    )
})

export default LikeBtn;
