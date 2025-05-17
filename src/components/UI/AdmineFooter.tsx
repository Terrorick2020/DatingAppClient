import { JSX, memo } from 'react';

import Button from '@mui/material/Button';


interface PropsAdmineFotter {
    handleSearch: () => void
}
const AdmineFooter = memo((props: PropsAdmineFotter): JSX.Element => {
    return (
        <>
            <footer className="admine-footer">
                <div className="link">
                    <Button className="link__btn" variant="contained" onClick={ props.handleSearch }>Найти</Button>
                </div>
            </footer>
        </>
    )
})

export default AdmineFooter;