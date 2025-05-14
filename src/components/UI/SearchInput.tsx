import { useState, ChangeEvent, KeyboardEvent, JSX, memo } from 'react';
import { type PropsSearchInput } from '@/types/ui.types';

import TextField from '@mui/material/TextField';
import ClearBtn from '@/components/UI/ClearBtn';
import SvgSearch from '@/assets/icon/search.svg?react';


const SearchInput = memo((props: PropsSearchInput): JSX.Element => {
    const [ showClear, setShowClear ] = useState<boolean>( false );

    const handleClearInput = (): void => {
        props.handleInputChange( '' );
        setShowClear( false );
        props.handleClearInput();
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        props.handleInputChange( event.target.value );
        setShowClear( !!event.target.value );
    }

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        const forbiddenKeys = ['e', 'E', '-', '+'];
        
        forbiddenKeys.includes(event.key) && props.inpType === 'number' && event.preventDefault();

        if (event.key === 'Enter' && props.value) {
            props.handleInputKeyDown();
        }
    }

    return (
        <>
            <TextField
                className="search-input"
                id="search-input"
                fullWidth
                type={props.inpType}
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
})

export default SearchInput;
