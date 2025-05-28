import { JSX } from 'react';
import { Outlet } from 'react-router-dom';


const RegisterLayout = (): JSX.Element => {
    return (
        <div className="reg-layout">
            <Outlet />
        </div>
    )
}

export default RegisterLayout;
