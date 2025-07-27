import { JSX, memo, useMemo } from 'react';
import { toTargetPsych } from '@/config/routes.config';
import { useSelector } from 'react-redux';
import { ageToStr } from '@/funcs/general.funcs';
import { lineStatusAttr } from '@/constant/settings';
import type { PropsPsychList } from '@/types/quest.types';
import type { IState } from '@/types/store.types';

import ListBlock from '@/components/UI/ListBlock';


const PsychList = memo((props: PropsPsychList): JSX.Element => {
    const psychList = useSelector((state: IState) => state.psych.psychList);

    const PsychList = useMemo(() => {
        if(!psychList.length) return (
            <div className="empty">
                <h4 className="headline">Ничего не найдено</h4>
            </div>
        );

        return (
            <div className="list">
                {psychList.map(item =>(
                    <ListBlock
                        img={item.avatar}
                        route={toTargetPsych.replace(':id', `${item.id}`)}
                        key={`psych-list-item-${item.id}`}
                        prefAlt={item.name}
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
