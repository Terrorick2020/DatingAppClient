import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { URL_MARK } from '@/config/env.config';
import { toUserInfo } from '@/config/routes.config';
import type { IState } from '@/types/store.types';

import ComplaintsListCtxItem from './Item';
import ListBlock from '@/components/UI/ListBlock';


const ComplaintsList = (): JSX.Element => {
    const complaintsList = useSelector((state: IState) => state.admin.complaintsList);

    if(!complaintsList.length) return (
        <div className="not-found">
            <h2 className="text">Ничего не найдено</h2>
        </div>
    )

    return (
        <>
            {complaintsList.map(item => (
                <ListBlock
                    img={item.avatar}
                    route={`${toUserInfo.replace(`:${URL_MARK}`, `${item.id}`)}`}
                    key={`complaints-list__item-${item.id}`}
                    prefAlt={item.name}
                >
                    <ComplaintsListCtxItem
                        name={item.name}
                        date={item.date}
                        complText={`${item.complGlob}, ${item.complTarget}`}
                    />
                </ListBlock>
            ))}
        </>
    )
}

export default ComplaintsList;
