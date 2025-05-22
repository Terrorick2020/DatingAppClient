import { JSX, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delay } from '@/funcs/general.funcs';
import { setSerchPsychQuery } from '@/store/slices/psychSlice';
import { initPsychList } from '@/store/slices/psychSlice';
import type { PropsPsychHeader } from '@/types/quest.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import SearchInput from '@/components/UI/SearchInput';


const PsychHeader = memo((props: PropsPsychHeader): JSX.Element => {
    const serchPsychQuery = useSelector((state: IState) => state.psych.serchPsychQuery);

    const dispatch = useDispatch<RootDispatch>();

    const handleSearch = async (): Promise<void> => {
        dispatch(initPsychList());
        delay(10);
        props.setPreText(!!serchPsychQuery ? 'Найденные специалисты' : 'Все специалисты');
    } 

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
            <h4 className="headline">Пси-специалисты</h4>
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
