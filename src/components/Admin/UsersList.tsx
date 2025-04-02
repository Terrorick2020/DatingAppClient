import {
    useEffect,
    useState,
    ChangeEvent,
    KeyboardEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addRoute } from '@/store/slices/settingsSlice';
import { appRoutes } from '@/config/routes.config';
import { personTypeList, testIdtList } from '@/constant/admin';
import { setSearchType, setSearchId } from '@/store/slices/adminSlice';

import { type IState } from '@/types/store.types';
import { type PersonType } from '@/types/admin.types';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ClearBtn from '@/components/UI/ClearBtn';
import SvgSearch from '@/assets/icon/search.svg?react';
import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';


const UsersListContent = () => {
    const adminState = useSelector((state: IState) => state.admin);

    const [ context, setContext ] = useState<string>( '' );
    const [ showClear, setShowClear ] = useState<boolean>( false );
    const [ showFindBtn, setShowFindBtn ] = useState<boolean>( true );
    const [ showNotFound, setShowNotFound ] = useState<boolean>( false );

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const adminGlobRoute      = appRoutes.admin.global;
    const adminUserInfoRoute  = appRoutes.admin.inner.userInfo;
    const toUserInfo          = `${adminGlobRoute}/${adminUserInfoRoute}`;

    useEffect(
        () => {
            const langHtml = document.getElementById('users-list');
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            setShowClear( !!adminState.searchId );
        },
        []
    )

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        if ( context ) {
            setShowFindBtn( event.target.value !== context );
            setShowNotFound( event.target.value === context );
            setContext( '' );
        }

        setShowClear( !!event.target.value );
        dispatch( setSearchId( event.target.value ) );
    }

    const handleClearInput = () => {
        dispatch( setSearchId( '' ) );
        setContext( '' );
        setShowFindBtn( true );
        setShowNotFound( false );
        setShowClear( false );
    }

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchQuery();
        }
    }

    const handleSearchQuery = () => {
        if ( !adminState.searchId ) {
            return;
        }

        setContext( adminState.searchId )

        if ( testIdtList.includes( adminState.searchId ) ) {
            navigate( toUserInfo );
            dispatch(addRoute(location.pathname));
        } else {
            setShowFindBtn( false );
            setShowNotFound( true );
        }
    }

    return (
        <>
            <div className="users-list__ctx">
                <h2 className="headline">Админ-панель</h2>
                <ToggleButtonGroup
                    className="person-type"
                    spacing={ 2 }
                    value={ adminState.searchType }
                    onChange={(_event, newValue) => {
                        if ( newValue !== null ) {
                            dispatch(setSearchType( newValue ))
                        }
                    }}
                >
                    {personTypeList.map( (item: PersonType) => (
                        <IconButton
                            className="person-type__item"
                            key={`person-type__${item.id}`}
                            value={item.value}
                        >
                            {item.label}
                        </IconButton>
                    ))}
                </ToggleButtonGroup>
                <TextField
                    className="person-input"
                    id="person-input"
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
                    placeholder="Поиск пользователя по ID..."
                    value={ adminState.searchId }
                    onChange={ handleInputChange }
                    onKeyDown={ handleInputKeyDown }
                />
                {
                    showNotFound
                        ?
                        <div className="not-found">
                            <h2 className="text">Пользователь не найден</h2>
                        </div>
                        :
                        <div className="search-list">

                        </div>
                }
            </div>
            {
                showFindBtn &&
                <div className="users-list__btn">
                    <div className="link">
                        <Button className="link__btn" variant="contained" onClick={ handleSearchQuery }>Найти</Button>
                    </div>
                </div>
            }
        </>
    )
}

export default UsersListContent
