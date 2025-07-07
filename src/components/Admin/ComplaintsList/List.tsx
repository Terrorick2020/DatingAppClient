import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { toUserInfo } from '@/config/routes.config';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import ListBlock from '@/components/UI/ListBlock';
import ComplaintsListCtxItem from './Item';


const selectSettings = (state: IState) => state.settings;
const selectAdmin = (state: IState) => state.admin;

const selectComplListState = createSelector(
    [selectSettings, selectAdmin],
    (settings, admin) => ({
      isLoad: settings.load,
      complaintsList: admin.complaintsList,
    })
);

const ComplaintsListCtx = (): JSX.Element => {
    const { isLoad, complaintsList } = useSelector(selectComplListState);

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    if(!complaintsList.length) return (
        <div className="not-found">
            <h2 className="text">Ничего не найдено</h2>
        </div>
    )

    return (
        <div className="search-list">
            {complaintsList.map(item => (
                <ListBlock
                    img={item.avatar}
                    route={`${toUserInfo.replace(':id', '')}${item.id}`}
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
        </div>
    )
}

export default ComplaintsListCtx;
