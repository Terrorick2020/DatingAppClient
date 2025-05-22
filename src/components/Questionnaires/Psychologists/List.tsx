import { JSX, memo } from 'react';
import { appRoutes } from '@/config/routes.config';
import { useSelector } from 'react-redux';
import { ageToStr } from '@/funcs/general.funcs';
import { lineStatusAttr } from '@/constant/settings';
import type { PropsPsychList } from '@/types/quest.types';
import type { IState } from '@/types/store.types';

import ListBlock from '@/components/UI/ListBlock';


const PsychList = memo((props: PropsPsychList): JSX.Element => {
    const psychList = useSelector((state: IState) => state.psych.psychList);

    const globTargetPsychRoute = appRoutes.targetPsych;

    return (
        <>
            <h6 className="headline">
                { props.preText }
            </h6>
            {
                !!psychList.length
                    ?
                    <div className="list">
                        {psychList.map(item =>(
                            <ListBlock
                                img={item.avatar}
                                route={globTargetPsychRoute.replace(':id', `${item.id}`)}
                                key={`psych-list-item-${item.id}`}
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
                    :
                    <h4 className="empty">Ничего не найдено</h4>
            }
        </>
    )
})

export default PsychList;
