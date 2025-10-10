import { JSX } from 'react';

import UserInfoContent from "@/components/Admin/UserInfo";


const AdminUserInfoPage = (): JSX.Element => {
    return (
        <div className="user-info" id="user-info">
            <UserInfoContent />
        </div>
    )
}

export default AdminUserInfoPage;
