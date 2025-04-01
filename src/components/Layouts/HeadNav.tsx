import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { dellRoute } from '@/store/slices/settingsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { closingBehavior, backButton } from '@telegram-apps/sdk';

import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';

import SvgArrowDown from '@/assets/icon/arrow-down.svg?react';
import SvgArrowLeft from '@/assets/icon/arrow-left.svg?react';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgOther from '@/assets/icon/other.svg?react';


const DesktopHeadNav = () => {
    const setRoutes = useSelector((state: IState) => state.settings.routes);
    const [isBack, setIsBack] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setIsBack( !!setRoutes.length );
    }, [setRoutes]);

    const userAgent = navigator.userAgent.toLowerCase()

    const predMobile  = userAgent.includes('iphone') || userAgent.includes('android')
    const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win')
    const isDesktop   = !predMobile || predDesktop

    const goBack = () => {
        navigate(setRoutes.slice(-1)[0]);
        dispatch(dellRoute());
    };
    const closeWindow = () => window.close();

    !isDesktop && useEffect(() => {
        if( isBack ) {
            if (closingBehavior.isMounted()) closingBehavior.unmount();
            if (backButton.mount.isAvailable()) backButton.mount();
            if (backButton.show.isAvailable()) backButton.show();

            if (backButton.onClick.isAvailable()) {
                backButton.onClick(goBack);
                backButton.offClick(goBack);
            }
        } else {
            if (backButton.isMounted()) backButton.unmount();
            if (closingBehavior.mount.isAvailable()) closingBehavior.mount();
            if (closingBehavior.enableConfirmation.isAvailable()) closingBehavior.enableConfirmation();
        }
    }, [isBack]);

    return (
        <>
            {
                isDesktop
                    ?
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
                    :
                    null
            }
        </>
    )
}

export default DesktopHeadNav
