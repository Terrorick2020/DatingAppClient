import { JSX, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import { ageToStr } from '@/funcs/general.funcs';
import { lineStatusAttr } from '@/constant/settings';
import type { IState } from '@/types/store.types';


const PsychologistCtx = (): JSX.Element => {
    const targerPsych = useSelector((state: IState) => state.psych.targetPsych);

    if ( !targerPsych ) {
        const navgate = useNavigate();

        navgate( appRoutes.notFound );

        return (<></>);
    }

    const expStr = useMemo(() => ageToStr(targerPsych.exp), [targerPsych.exp]);

    return (
        <>
            <div
                className="image"
                style={{
                    backgroundImage: `url(${targerPsych.photo})`,
                }}
            >
                <footer className="desc">
                    <h4 className="headline">{targerPsych.name}</h4>
                    <div className="labels">
                        <span className="item">
                            { `Стаж ${expStr}` }
                        </span>
                        <span className="item">{targerPsych.spec}</span>
                    </div>
                </footer>
            </div>
            <div className="bio">
                <header className="head">
                    <h5 className="headline">О себе</h5>
                    <span className={`line ${lineStatusAttr[targerPsych.lineStat].addClass}`}>
                        {lineStatusAttr[targerPsych.lineStat].text}
                    </span>
                </header>
                <p className="text">{targerPsych.desc}</p>
            </div>
            <div className="exp">
                <h5 className="headline">Опыт работы</h5>
                <div className="exp__list">
                    {targerPsych.expList.map(item => (
                        <div className="item" key={`psych-exp-item-${item.id}`}>
                            <div className="head">
                                <h6 className="title">{ item.title }</h6>
                                <p className="desc">{ item.desc }</p>
                            </div>
                            <p className="label">{ item.expGap }</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PsychologistCtx;
