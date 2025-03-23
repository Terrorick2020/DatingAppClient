import {
    useEffect,
    useState,
    ChangeEvent,
    KeyboardEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '@/config/routes.config'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ClearBtn from '@/components/UI/ClearBtn'
import SvgSearch from '@/assets/icon/search.svg?react'
import IconButton from '@mui/joy/IconButton'
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup'


interface PersonType {
    id: number,
    value: string,
    label : string,
}

const personType: PersonType[] = [
    { id: 0, value: 'users', label: 'Пользователи' },
    { id: 1, value:'psychologists', label: 'Пси-специалисты' }
]

const idsList = [
    '8148518',
]

const UsersListContent = () => {
    const [value, setValue] = useState<string>( personType[0].value )
    const [ searchQuery, setSearchQuery ] = useState<string>( '' )
    const [ context, setContext ] = useState<string>( '' )
    const [ showClear, setShowClear ] = useState<boolean>( false )
    const [ showFindBtn, setShowFindBtn ] = useState<boolean>( true )
    const [ showNotFound, setShowNotFound ] = useState<boolean>( false )

    useEffect(
        () => {
            const langHtml = document.getElementById('users-list')
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards'
        },
        []
    )

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        if ( context ) {
            setShowFindBtn( event.target.value !== context )
            setShowNotFound( event.target.value === context )
            setContext( '' )
        }

        setShowClear( event.target.value !== '' )
        setSearchQuery( event.target.value )
    }

    const handleClearInput = () => {
        setSearchQuery( '' )
        setContext( '' )
        setShowFindBtn( true )
        setShowNotFound( false )
        setShowClear( false )
    }

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchQuery();
        }
    }

    const navigate = useNavigate()

    const adminGlobRoute      = appRoutes.admin.global
    const adminUserInfoRoute  = appRoutes.admin.inner.userInfo
    const toUserInfo          = `${adminGlobRoute}/${adminUserInfoRoute}`

    const handleSearchQuery = () => {
        if ( !searchQuery ) {
            return 
        }

        setContext( searchQuery )

        if ( idsList.includes( searchQuery ) ) {
            navigate( toUserInfo )
        } else {
            setShowFindBtn( false )
            setShowNotFound( true )
        }
    }

    return (
        <>
            <div className="users-list__ctx">
                <h2 className="headline">Админ-панель</h2>
                <ToggleButtonGroup
                    className="person-type"
                    spacing={ 2 }
                    value={ value }
                    onChange={(_event, newValue) => {
                        if ( newValue !== null ) {
                            setValue(newValue)
                        }
                    }}
                >
                    {personType.map( (item: PersonType) => (
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
                    value={ searchQuery }
                    onChange={ handleInputChange }
                    onKeyDown={ handleInputKeyDown }
                />
                {
                    showNotFound &&
                    <div className="not-found">
                        <h2 className="text">Пользователь не найден</h2>
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
