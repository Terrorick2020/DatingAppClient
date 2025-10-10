import { JSX } from 'react';

import UsersListContent from '@/components/Admin/UsersList';


const AdminUsersListPage = (): JSX.Element => {
    return (
        <div className="users-list" id="users-list">
            <UsersListContent />
        </div>
    )
}

export default AdminUsersListPage;
