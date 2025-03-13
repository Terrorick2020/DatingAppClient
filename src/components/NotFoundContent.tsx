import { NavLink } from 'react-router-dom'
import { appRoutes } from '@/config/routes.config'

import Button from '@mui/material/Button'


const NotFoundContent = () => {
    const regGlobRoute = appRoutes.register.global
    const regPreviewRoute = appRoutes.register.inner.preview
    const toPreview = `${regGlobRoute}/${regPreviewRoute}`

    return (
        <>
            <div className="error__ctx">
                <h1>404</h1>
                <h4>Страница недоступна</h4>
                <NavLink className="link" to={ toPreview }>
                    <Button variant="contained">Вернуться на главную</Button>
                </NavLink>
            </div>
        </>
    )
}

export default NotFoundContent
