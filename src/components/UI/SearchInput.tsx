import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { type PropsSearchInput } from '@/types/ui.types';

import TextField from '@mui/material/TextField';
import ClearBtn from '@/components/UI/ClearBtn';
import SvgSearch from '@/assets/icon/search.svg?react';


const SearchInput = (props: PropsSearchInput) => {
    const [ showClear, setShowClear ] = useState<boolean>( false );

    const handleClearInput = () => {
        props.handleInputChange( '' );
        setShowClear( false );
        props.handleClearInput();
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.handleInputChange( event.target.value );
        setShowClear( !!event.target.value );
    }

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.handleInputKeyDown();
        }
    }

    return (
        <>
            <TextField
                className="search-input"
                id="search-input"
                fullWidth
                slotProps={{
                    input: {
                        startAdornment: (
                            <SvgSearch />
                        ),
                        endAdornment : (
                            showClear ? <ClearBtn onClear={ handleClearInput } /> : <></>
                        )
                    },
                    }}
                placeholder={props.placeholder}
                value={ props.value }
                onChange={ handleInputChange }
                onKeyDown={ handleInputKeyDown }
            />
        </>
    )
}

export default SearchInput;
