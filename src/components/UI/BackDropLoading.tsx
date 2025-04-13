import { useSelector } from 'react-redux';
import type { IState } from '@/types/store.types';

import Backdrop from '@mui/material/Backdrop';
import MyLoader from '@/components/UI/MyLoader';


const BackDropLoading = () => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoad}
            >
                <MyLoader />
            </Backdrop>
        </>
    )
}

export default BackDropLoading;
