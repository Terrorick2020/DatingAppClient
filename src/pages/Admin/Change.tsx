import { JSX } from 'react';

import ChangeContent from '@/components/Admin/Change';


const AdminChangePage = (): JSX.Element => {
    return (
        <div className="change" id="change">
            <ChangeContent />
        </div>
    )
}

export default AdminChangePage;
