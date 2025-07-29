import { JSX, memo, useMemo, useRef, UIEvent } from 'react';
import { toTargetPsych } from '@/config/routes.config';
import { useSelector } from 'react-redux';
import { ageToStr } from '@/funcs/general.funcs';
import { lineStatusAttr } from '@/constant/settings';
import type { PropsPsychList } from '@/types/quest.types';
import type { IState } from '@/types/store.types';

import ListBlock from '@/components/UI/ListBlock';


const PsychList = memo((props: PropsPsychList): JSX.Element => {
    const psychList = useSelector((state: IState) => state.psych.psychList);

    const lastIndx = useRef<number>(0);

    const handleScroll = (event: UIEvent<HTMLDivElement>): void => {
        const container = event.currentTarget;
        const scrollTop = container.scrollTop;
        const scrollBottom = scrollTop + container.clientHeight;

        let lastVisible: HTMLElement | null = null;

        for (const el of container.children) {
            if (el instanceof HTMLElement) {
                const elTop = el.offsetTop;
                const elBottom = elTop + el.offsetHeight;

                const isVisible = elTop < scrollBottom && elBottom > scrollTop;

                if (isVisible) {
                    lastVisible = el;
                }
            }
        }

        if (lastVisible) {
            const dataIndex = lastVisible.getAttribute('data-indx');
            
            if(dataIndex && +dataIndex > lastIndx.current) {
                lastIndx.current = +dataIndex;
            }
        }
    };

    const PsychList = useMemo(() => {
        if(!psychList.length) return (
            <div className="empty">
                <h4 className="headline">Ничего не найдено</h4>
            </div>
        );

        return (
            <div className="list" onScroll={handleScroll}>
                {psychList.map((item, index) =>(
                    <ListBlock
                        img={item.avatar}
                        route={toTargetPsych.replace(':id', `${item.id}`)}
                        key={`psych-list-item-${item.id}`}
                        prefAlt={item.name}
                        data-indx={index}
                    >
                        <div className="inner">
                            <div className="inner__desc">
                                <h5 className="headline">{item.name}</h5>
                                <p className="text">{item.spec}</p>
                                <span className={`label ${lineStatusAttr[item.lineStat].addClass}`}>
                                    {lineStatusAttr[item.lineStat].text}
                                </span>
                            </div>
                            <p className="inner__exp">
                                {`Стаж ${ageToStr(item.exp)}`}
                            </p>
                        </div>
                    </ListBlock>
                ))}
            </div>
        );
    }, [psychList]);

    return (
        <>
            <h6 className="headline">
                { props.preText }
            </h6>
            { PsychList }
        </>
    )
})

export default PsychList;
