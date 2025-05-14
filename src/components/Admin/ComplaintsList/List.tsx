import { JSX, memo } from 'react';
import type { ComplaintListItem } from '@/types/admin.types';

import ComplaintsListCtxItem from './Item';


interface PropsComplaintsListCtx {
    complaintsList: ComplaintListItem[]
}
const ComplaintsListCtx = memo((props: PropsComplaintsListCtx): JSX.Element => {
    return (
        <>
            <div className="complaints-list">
                {props.complaintsList.map(item => (
                    <ComplaintsListCtxItem key={`complaints-list__item-${item.id}`} />
                ))}
            </div>
        </>
    )
})

export default ComplaintsListCtx;
