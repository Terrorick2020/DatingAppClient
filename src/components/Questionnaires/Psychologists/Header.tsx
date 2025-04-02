import { useState } from 'react';

import SearchInput from '@/components/UI/SearchInput';


const PsychHeader = () => {
    const [value, setValue] = useState<string>('');

    const handleInputChange = (newValue: string) => {
        setValue(newValue)
    }

    const handleClearInput = () => {

    }

    const handleInputKeyDown = () => {

    }

    return (
        <>
            <h4 className="headline">Пси-специалисты</h4>
            <p className="text">Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате</p>
            <SearchInput
                value={value}
                placeholder="Поиск..."
                handleInputChange={handleInputChange}
                handleClearInput={handleClearInput}
                handleInputKeyDown={handleInputKeyDown}
            />
        </>
    )
}

export default PsychHeader;
