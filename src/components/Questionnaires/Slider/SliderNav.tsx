import Button from '@mui/material/Button'

import SvgHeartColor from '@/assets/icon/heart-color.svg'
import SvgPalmHand from '@/assets/icon/palm-hand.svg?react'
import SvgPuzzle from '@/assets/icon/puzzle.svg?react'
import SvgGhost from '@/assets/icon/ghost.svg?react'


const SliderHeader = () => {
    return (
        <>
            <div className="nav-items">
                <Button className="text-fon icon rounded-light" variant="contained">
                    <SvgGhost />
                </Button>
                <Button className="text-fon  icon rounded-light" variant="contained">
                    <SvgPuzzle />
                </Button>
                <Button className="text-fon  icon rounded-light" variant="contained">
                    <SvgPalmHand />
                </Button>
            </div>
            <div className="nav-likes">
                <Button
                    className="text-fon rounded-light"
                    variant="contained"
                    startIcon={
                        <img src={ SvgHeartColor } alt="svg-color-hert" />
                    }
                >
                    0
                </Button>
            </div>
        </>
    )
}

export default SliderHeader