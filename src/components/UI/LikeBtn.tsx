import Button from '@mui/material/Button';
import SvgHeartsBtn from '@/assets/icon/hearts-btn.svg';


interface PropsLikeBtn {
    id: number
    clickLike: (id: number) => void
}

const LikeBtn = (props: PropsLikeBtn) => {
    return (
        <>
            <Button
                className="icon-btn like-btn"
                variant="contained"
                onClick={ () => props.clickLike( props.id ) }
            >
                <div className="heart" id={ `heart-${ props.id }` }>
                    <i className="fa-solid fa-heart"></i>
                </div>
                <img src={ SvgHeartsBtn } alt="hearts-btn" />
            </Button>
        </>
    )
}

export default LikeBtn
