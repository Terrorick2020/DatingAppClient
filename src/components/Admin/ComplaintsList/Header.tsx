import { JSX, memo, useState } from 'react';

import SearchInput from '@/components/UI/SearchInput';


interface PropsComplaintsListHeader {
    handleSearch: () => void
}
const ComplaintsListHeader = memo((props: PropsComplaintsListHeader): JSX.Element => {
    const [value, setValue] = useState<string>('');

    const handleChange = (newValue: string) => {
        setValue(newValue);

        !newValue && props.handleSearch();
    }

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
