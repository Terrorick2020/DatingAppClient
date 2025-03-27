import LikeBtn from '@/components/UI/LikeBtn';
import Button from '@mui/material/Button';


const DetailsFixed = () => {
    const id = 1;
    const clickLike = (id: number) => console.log( `clickLike - ${ id }` );
    const toSlider = () => console.log( 'toSlider' );

    return (
        <>
            <div className="btns">
                <Button
                    className="lemon-fon"
                    variant="contained"
                    onClick={ toSlider }
                >
                    Назад
                </Button>
                <LikeBtn id={id} clickLike={clickLike} />
            </div>
            <div className="void"></div>
        </>
    )
}

export default DetailsFixed
