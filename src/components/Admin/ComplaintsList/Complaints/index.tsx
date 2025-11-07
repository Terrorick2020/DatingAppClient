import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { URL_MARK } from '@/config/env.config';
import { toUserInfo } from '@/config/routes.config';
import { EProfileRoles, type IState } from '@/types/store.types';

import ComplaintsListCtxItem from './Item';
import ListBlock from '@/components/UI/ListBlock';


const ComplaintsList = (): JSX.Element => {
    const complaintsList = useSelector((state: IState) => state.admin.complaintsList);

    const handleDopLoad = async (_index: number): Promise<void> => {}

    if(!complaintsList.length) return (
        <div className="not-found">
            <h2 className="text">Ничего не найдено</h2>
        </div>
    )

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
    )
}

export default ComplaintsList;
