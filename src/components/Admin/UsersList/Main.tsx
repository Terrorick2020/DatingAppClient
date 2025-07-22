import { JSX, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toUserInfo } from '@/config/routes.config';
import { initialArgs } from '@/constant/quest';
import { createSelector } from 'reselect';
import { getProfilesListAsync } from '@/store/slices/adminSlice';
import type { InitSliderData } from '@/types/quest.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import ListBlock from '@/components/UI/ListBlock';
import UsersListDialog from './Dialog';
import MyLoader from '@/components/UI/MyLoader';
import UserListItem from './Item';


const selectSettings = (state: IState) => state.settings;
const selectAdmin = (state: IState) => state.admin;

const selectAdmineUserList = createSelector(
    [selectSettings, selectAdmin],
    (settings, admin) => ({
      isLoad: settings.load,
      adminState: admin,
    })
);

const UsersListMain = (): JSX.Element => {
    const { isLoad, adminState } = useSelector(selectAdmineUserList);

    const [openDel, setOpenDel] = useState<boolean>(false);

    const block = useRef<InitSliderData>(initialArgs);
    const maxInd = useRef<number>(0);
    const isDopLoad = useRef<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleDopLoad = async (): Promise<void> => {
        if(adminState.profilesList.length % initialArgs.limit !== 0) return;

        isDopLoad.current = true;

        const newData: InitSliderData = {
            limit: block.current.limit,
            offset: block.current.offset + initialArgs.offset,
        };

        const response = await dispatch(getProfilesListAsync(newData)).unwrap();

        if(response && response !== 'error') {
            block.current = newData;
        }

        isDopLoad.current = false;
    }

    const handleView = (value: number): void => {
        if(maxInd.current >= value) return;

        maxInd.current = value;
        
        const buffer = 4;
        const shouldLoadMore = adminState.profilesList.length > 0 && 
            value >= adminState.profilesList.length - buffer;

        if(!shouldLoadMore || isDopLoad.current) return;

        handleDopLoad();
    };

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
                    (adminState.profilesList.map((item, index) => (
                        <ListBlock
                            img={item.avatar}
                            route={`${toUserInfo.replace(':id', '')}${item.id}`}
                            key={`admin-profile-${item.id}`}
                            data-id={index}
                            prefAlt={item.name}
                            view={{
                                id: index,
                                handleView: handleView,
                            }}
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
