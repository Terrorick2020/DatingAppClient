import { useNavigate  } from 'react-router-dom';

import Button from '@mui/material/Button';

import SvgArrowDown from '@/assets/icon/arrow-down.svg?react';
import SvgArrowLeft from '@/assets/icon/arrow-left.svg?react';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgOther from '@/assets/icon/other.svg?react';


const DesktopHeadNav = () => {
    const navigate = useNavigate()

    const goBack = () => {
       navigate(-1)
    }

    const closeWindow = () => {
        window.Telegram.WebApp.close()
        window.close()
    }

    const isBack = window.history.state.idx > 1

    return (
        <>
            <div className="desc-head-nav">
                {
                    isBack
                        ?
                        <Button
                            className="btn text-fon rounded"
                            variant="contained"
                            startIcon={ <SvgArrowLeft /> }
                            onClick={ goBack }
                        >
                            Back
                        </Button>
                        :
                        <Button
                            className="btn text-fon rounded"
                            variant="contained"
                            startIcon={ <SvgClose /> }
                            onClick={ closeWindow }
                        >
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

export default DesktopHeadNav
