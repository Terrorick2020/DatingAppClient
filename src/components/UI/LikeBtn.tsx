import { JSX, memo } from 'react';
import { type PropsLikeBtn } from '@/types/ui.types';

import Button from '@mui/material/Button';
import SvgHeartsBtn from '@/assets/icon/hearts-btn.svg';


const LikeBtn = memo((props: PropsLikeBtn): JSX.Element => {
    return (
        <>
            <div
                className="heart"
                id={ `heart-${ props.id }` }
            >
                <i className="fa-solid fa-heart"></i>
            </div>
            <Button
                className="icon-btn like-btn"
                variant="contained"
                onClick={ () => props.clickLike( props.id ) }
            >
                <img src={ SvgHeartsBtn } alt="hearts-btn" />
            </Button>
        </>
    )
})

export default LikeBtn;
