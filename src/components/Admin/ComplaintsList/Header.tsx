import { type JSX, memo, useCallback, useEffect, type MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchComplType } from '@/store/slices/adminSlice';
import { setSearchComplId } from '@/store/slices/adminSlice';
import { ESearchComplType, type PropsComplaintsListHeader } from '@/types/admin.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import SearchInput from '@/components/UI/SearchInput';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import IconButton from '@mui/joy/IconButton';


const ComplaintsListHeader = memo((props: PropsComplaintsListHeader): JSX.Element => {
    const searchComplId = useSelector((state: IState) => state.admin.searchComplId);
    const searchComplType = useSelector((state: IState) => state.admin.searchComplType);
    
    const dispatch = useDispatch<RootDispatch>();

    const handleChangeSearchType = async (_: MouseEvent<HTMLElement>, newValue: ESearchComplType | null): Promise<void> => {
        if (!newValue) return;
        dispatch(setSearchComplId(''));
        dispatch(setSearchComplType( newValue ));
    };

    const handleChange = useCallback(async (newValue: string) => {
        dispatch(setSearchComplId(newValue));

        !newValue && props.handleSearch();
    }, [props.handleSearch]);

    useEffect(() => {
        props.handleSearch();
    }, [searchComplType]);

    return (
        <>
            <h2 className="headline">Ресурсы и жалобы</h2>
            <ToggleButtonGroup
                className="search-type"
                spacing={2}
                value={searchComplType}
                onChange={handleChangeSearchType}
            >
                <IconButton className="search-type__item" value={ESearchComplType.Complaint}>Жалобы</IconButton>
                <IconButton className="search-type__item" value={ESearchComplType.Video}>Видео</IconButton>
            </ToggleButtonGroup>
            <SearchInput
                value={searchComplId}
                placeholder="Поиск..."
                inpType="text"
                handleInputChange={handleChange}
                handleClearInput={props.handleSearch}
                handleInputKeyDown={props.handleSearch}
            />
        </>
    );
});

export default ComplaintsListHeader;
