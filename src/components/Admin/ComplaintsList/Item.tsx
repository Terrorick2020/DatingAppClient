import { JSX, memo } from 'react';


interface PropsComplaintsListCtxItem {
    name: string
    date: string
    complText: string
}
const ComplaintsListCtxItem = memo((props: PropsComplaintsListCtxItem): JSX.Element => {
    return (
        <div className='complaints-list__item'>
            <div className="text">
                <h3 className="pre-headline">Жалоба</h3>
                <h3 className="name">{props.name}</h3>
                <h6 className="compl">{props.complText}</h6>
            </div>
            <h4 className="date">{props.date}</h4>
        </div>
    )
})

export default ComplaintsListCtxItem;
