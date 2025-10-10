import { JSX } from 'react';

import ComplaintsListContent from '@/components/Admin/ComplaintsList';


const AdminComplaintsListPage = (): JSX.Element => {
    return (
        <div className="complaints-list" id="complaints-list">
            <ComplaintsListContent />
        </div>
    )
}

export default AdminComplaintsListPage;
