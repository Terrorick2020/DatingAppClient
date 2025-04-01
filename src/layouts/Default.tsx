import { Outlet } from 'react-router-dom';

import HeadNav from '@/components/Layouts/HeadNav';
import LogoHeader from '@/components/Layouts/LogoHeader';


const DefaultLayout = () => {
    return (
        <>
            <div className="default-layout">
                <div className="box">
                    <HeadNav />
                    <LogoHeader />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DefaultLayout
