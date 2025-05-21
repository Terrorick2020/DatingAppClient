import { JSX, memo, useState, useCallback } from 'react';
import type { PropsComplaintsListHeader } from '@/types/admin.types';

import SearchInput from '@/components/UI/SearchInput';


const ComplaintsListHeader = memo((props: PropsComplaintsListHeader): JSX.Element => {
    const [value, setValue] = useState<string>('');

    const handleChange = useCallback((newValue: string) => {
        setValue(newValue);

        !newValue && props.handleSearch();
    }, [props.handleSearch]);

    return (
        <>
            <h3 className="headline">Список жалоб</h3>
            <SearchInput
                value={value}
                placeholder="Поиск..."
                inpType="text"
                handleInputChange={handleChange}
                handleClearInput={props.handleSearch}
                handleInputKeyDown={props.handleSearch}
            />
            <h5 className="sub-headline">Все жалобы</h5>
        </>
    )
})

export default ComplaintsListHeader;
