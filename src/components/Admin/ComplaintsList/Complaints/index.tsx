import { type JSX, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialQuery } from '@/constant/chats';
import { initComplaintListAsync } from '@/store/slices/adminSlice';
import { URL_MARK } from '@/config/env.config';
import { toUserInfo } from '@/config/routes.config';
import { EProfileRoles, type IState } from '@/types/store.types';
import type { RootDispatch } from '@/store';

import ComplaintsListCtxItem from './Item';
import ListBlock from '@/components/UI/ListBlock';


const ComplaintsList = (): JSX.Element => {
    const complaintsList = useSelector((state: IState) => state.admin.complaintsList);

    const initData = useRef<typeof initialQuery>(initialQuery);
    const isLoad = useRef<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleDopLoad = async (index: number): Promise<void> => {
        if(
            isLoad.current ||
            complaintsList.length >= initData.current.offset * initData.current.limit ||
            index + 3 < complaintsList.length
        ) return;

        isLoad.current = true;
        
        const newData = {
            ...initData.current,
            offset: initData.current.offset + 1
        };

        const response = await dispatch(initComplaintListAsync(newData)).unwrap();

        if(response && response !== 'error') {
            initData.current = newData;
        };

        isLoad.current = false;
    };

    if(!complaintsList.length) return (
        <div className="not-found">
            <h2 className="text">Ничего не найдено</h2>
        </div>
    );

    return (
        <>
            {complaintsList.map((item, index) => (
                <ListBlock
                    img={item.avatar}
                    route={`${toUserInfo.replace(`:${URL_MARK}`, `${item.id}`)}?type=${EProfileRoles.User}`}
                    key={`complaints-list__item-${item.id}`}
                    prefAlt={item.name}
                >
                    <ComplaintsListCtxItem
                        name={item.name}
                        date={item.date}
                        complText={`${item.complGlob}, ${item.complTarget}`}
                        index={index}
                        dopLoad={handleDopLoad}
                    />
                </ListBlock>
            ))}
        </>
    );
}

export default ComplaintsList;
