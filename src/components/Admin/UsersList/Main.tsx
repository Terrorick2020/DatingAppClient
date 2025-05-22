import { JSX, useState } from 'react';
import { useSelector } from 'react-redux';
import { appRoutes } from '@/config/routes.config';
import { type IState } from '@/types/store.types';

import ListBlock from '@/components/UI/ListBlock';
import UsersListDialog from './Dialog';
import MyLoader from '@/components/UI/MyLoader';
import UserListItem from './Item';


const adminGlobRoute      = appRoutes.admin.global;
const adminUserInfoRoute  = appRoutes.admin.inner.userInfo;
const toUserInfo          = `${adminGlobRoute}/${adminUserInfoRoute}`;

const UsersListMain = (): JSX.Element => {
    const adminState = useSelector((state: IState) => state.admin);
    const isLoad = useSelector((state: IState) => state.settings.load);

    const [openDel, setOpenDel] = useState<boolean>(false);

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    if(!adminState.profilesList.length && !isLoad) return (
        <div className="not-found">
            <h2 className="text">Ничего не найдено</h2>
        </div>
    )

    return (
        <>
            <div className="search-list">
                {
                    (adminState.profilesList.map(item => (
                        <ListBlock
                            img={item.avatar}
                            route={`${toUserInfo.replace(':id', '')}${item.id}`}
                            key={`admin-profile-${item.id}`}
                        >
                            <UserListItem
                                item={item}
                                toUserInfo={`${toUserInfo.replace(':id', '')}${item.id}`}
                                setOpenDel={setOpenDel}
                            />
                        </ListBlock>
                    )))
                }
            </div>
            <UsersListDialog open={openDel} hadleClose={() => setOpenDel(false)} />
        </>
    )
}

export default UsersListMain;
