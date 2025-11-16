import { JSX, memo } from 'react';
import type { PropsAdmineFotter } from '@/types/ui.types';

import Button from '@mui/material/Button';


const AdmineFooter = memo((props: PropsAdmineFotter): JSX.Element => {
    return (
        <footer className="admine-footer">
            <div className="link">
                <Button
                    className="link__btn"
                    variant="contained"
                    disabled={ props.disable }
                    onClick={ props.handleSearch }
                >Найти</Button>
            </div>
        </footer>
    )
})

export default AdmineFooter;
