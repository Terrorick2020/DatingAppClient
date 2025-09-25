import { JSX, useEffect } from 'react';
import { Outlet } from 'react-router-dom';


const RegisterLayout = (): JSX.Element => {
    useEffect(() => {
        document.title = "Регистрация";
    }, []);
    
    return (
        <div className="reg-layout">
            <Outlet />
        </div>
    )
}

export default RegisterLayout;
