import { JSX } from 'react';
import { Outlet } from 'react-router-dom';


const AdminLayout = (): JSX.Element => {
    return (
        <div className="admin-layout">
            <Outlet />
        </div>
    )
}

export default AdminLayout;
