import { JSX, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toNotFoud } from '@/config/routes.config';
import { Outlet } from 'react-router-dom';
import { type IState, EProfileRoles } from '@/types/store.types';


const AdminLayout = (): JSX.Element => {
    const role = useSelector((state: IState) => state.profile.info.role);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Администратор";
    }, []);

    // if( role !== EProfileRoles.Admin) {
    //     navigate(toNotFoud);

    //     return (<></>);
    // }

    return (
        <div className="admin-layout">
            <Outlet />
        </div>
    )
}

export default AdminLayout;
