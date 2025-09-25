import { JSX, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toShorts } from '@/config/routes.config';
import { delay } from '@/funcs/general.funcs';
import { addRoute } from '@/store/slices/settingsSlice';
import { setSerchPsychQuery } from '@/store/slices/psychSlice';
import { initPsychList } from '@/store/slices/psychSlice';
import type { PropsPsychHeader } from '@/types/quest.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import SearchInput from '@/components/UI/SearchInput';
import SvgShrtsBtn from '@/assets/icon/shorts-btn.svg';


const PsychHeader = memo((props: PropsPsychHeader): JSX.Element => {
    const serchPsychQuery = useSelector((state: IState) => state.psych.serchPsychQuery);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = async (): Promise<void> => {
        dispatch(initPsychList());
        delay(10);
        props.setPreText(!!serchPsychQuery ? 'Найденные специалисты' : 'Все специалисты');
    };

    const handleRoute = async (): Promise<void> => {
        await delay(10);

        dispatch(addRoute(location.pathname));
        navigate(toShorts);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            handleSearch();
        }, 500);
    
        return () => {
            clearTimeout(handler);
        };
    }, [serchPsychQuery, dispatch]);

    const handleInputChange = (newValue: string) => {
        dispatch(setSerchPsychQuery(newValue));
    };

    return (
        <>
            <header className="header">
                <h4 className="headline">Пси-специалисты</h4>
                <button onClick={handleRoute}>
                    <img
                        alt="shorts"
                        loading="lazy"
                        decoding="async"
                        src={ SvgShrtsBtn }
                    />
                </button>
            </header>
            <p className="text">
                Выберите любого специалиста и опишите ему свою проблему или попросите совет.
                Специалист ответит вам в свободное время, а диалог появится в общем чате.
            </p>
            <SearchInput
                value={serchPsychQuery}
                placeholder="Поиск..."
                inpType="string"
                handleInputChange={handleInputChange}
                handleClearInput={handleSearch}
                handleInputKeyDown={() => {}}
            />
        </>
    )
})

export default PsychHeader;
