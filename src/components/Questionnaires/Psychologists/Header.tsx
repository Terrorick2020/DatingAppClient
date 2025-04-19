import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSerchPsychQuery } from '@/store/slices/psychSlice';
import { initPsychList } from '@/store/slices/psychSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import SearchInput from '@/components/UI/SearchInput';


const PsychHeader = () => {
    const serchPsychQuery = useSelector((state: IState) => state.psych.serchPsychQuery);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(initPsychList());
        }, 500);
    
        return () => {
            clearTimeout(handler);
        };
    }, [serchPsychQuery, dispatch]);

    const handleInputChange = (newValue: string) => {
        dispatch(setSerchPsychQuery(newValue));
    };

    const handleClearInput = (): void => {
        dispatch(initPsychList())
    };

    return (
        <>
            <h4 className="headline">Пси-специалисты</h4>
            <p className="text">Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате</p>
            <SearchInput
                value={serchPsychQuery}
                placeholder="Поиск..."
                inpType="string"
                handleInputChange={handleInputChange}
                handleClearInput={handleClearInput}
                handleInputKeyDown={() => {}}
            />
        </>
    )
}

export default PsychHeader;
