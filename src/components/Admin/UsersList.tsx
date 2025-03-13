import { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import SvgSearch from '@/assets/icon/search.svg?react'


const UsersListContent = () => {
    useEffect(
        () => {
            const langHtml = document.getElementById('users-list')
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards'
        },
        []
    )

    return (
        <>
            <div className="users-list__ctx">
                <h2 className="headline">Админ-панель</h2>
                <TextField
                    className="person-input"
                    id="person-input"
                    fullWidth
                    slotProps={{
                        input: {
                          startAdornment: (
                            <SvgSearch />
                          ),
                        },
                      }}
                    placeholder="Поиск пользователя по ID..."
                />
            </div>
            <div className="users-list__btn">
                <div className="link">
                    <Button className="link__btn" variant="contained">Найти</Button>
                </div>
            </div>
        </>
    )
}

export default UsersListContent
