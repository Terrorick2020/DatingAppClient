import { NavLink } from 'react-router-dom'

import Button from '@mui/material/Button'

import SvgArrowDown from '@/assets/icon/arrow-down.svg?react'
import SvgArrowLeft from '@/assets/icon/arrow-left.svg?react'
import SvgClose from '@/assets/icon/close.svg?react'
import SvgOther from '@/assets/icon/other.svg?react'


const DesctopHeadNav = () => {

    const isCloseVariant = true

    return (
        <>
            <div className="desc-head-nav">
                {
                    isCloseVariant
                        ?
                        <NavLink to={ '' } >
                            <Button className="btn text-fon rounded" variant="contained" startIcon={<SvgArrowLeft />}>
                                Back
                            </Button>
                        </NavLink>
                        :
                        <Button className="btn text-fon rounded" variant="contained" startIcon={<SvgClose />}>
                            Close
                        </Button>
                }
                <Button 
                    className="btn text-fon rounded"
                    variant="contained"
                    startIcon={<SvgArrowDown />}
                    endIcon={<SvgOther />}
                ></Button>
            </div>
        </>
    )
}

export default DesctopHeadNav