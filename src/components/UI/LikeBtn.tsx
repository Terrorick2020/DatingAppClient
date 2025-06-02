import { JSX, memo, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { acceptLikingAsync } from '@/store/slices/likesSlice';
import type { PropsLikeBtn } from '@/types/ui.types';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import SvgHeartsBtn from '@/assets/icon/hearts-btn.svg';


const LikeBtn = memo((props: PropsLikeBtn): JSX.Element => {
    const [disabled, setDisabled] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

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
            heartHtml.style.animation = 'heart-top 1.5s ease-in-out forwards';
        });
    };

    const sendLiking = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.currentTarget.blur();

        setDisabled(true);

        const [_, _acceptRes] = await Promise.all([
            animatedBtn(),
            dispatch(acceptLikingAsync( props.id )).unwrap(),
        ])

        if(props.clickLike) props.clickLike();

        setDisabled(false);
    }

    return (
        <>
            <div
                className="heart"
                id={ `heart-${ props.id }` }
            >
                <i className="fa-solid fa-heart"></i>
            </div>
            <Button
                disabled={disabled}
                className="icon-btn like-btn"
                variant="contained"
                onClick={ sendLiking }
            >
                <img src={ SvgHeartsBtn } alt="hearts-btn" />
            </Button>
        </>
    )
})

export default LikeBtn;
