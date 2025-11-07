import { JSX, memo, useRef, useEffect } from 'react';
import type { PropsComplaintsListCtxItem } from '@/types/admin.types';


const ComplaintsListCtxItem = memo((props: PropsComplaintsListCtxItem): JSX.Element => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        props.dopLoad(props.index)
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ props.date ]);

    return (
        <div className='complaints-list__item' ref={ ref }>
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
