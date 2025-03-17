import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { appRoutes } from '@/config/routes.config'

import Button from '@mui/material/Button'


const ChangeContent = () => {
    const regGlobRoute    = appRoutes.register.global
    const regPreviewRoute = appRoutes.register.inner.preview
    const toPreview       = `${regGlobRoute}/${regPreviewRoute}`

    const adminGlobRoute      = appRoutes.admin.global
    const adminUsersListRoute = appRoutes.admin.inner.usersList
    const toUsersList         = `${adminGlobRoute}/${adminUsersListRoute}`

    useEffect(
        () => {
            const langHtml = document.getElementById('change')
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards'
        },
        []
    )

    return (
        <>
            <div className="change__ctx">
                <h3 className="headline">Выбор режима!!</h3>
                <div className="links">
                    <NavLink className="link" to={ toPreview }>
                        <Button className="link__btn" variant="contained">Приложение!!</Button>
                    </NavLink>
                    <NavLink className="link" to={ toUsersList }>
                        <Button className="link__btn text-block" variant="contained">Админ!!</Button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default ChangeContent
