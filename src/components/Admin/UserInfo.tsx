import { useEffect } from 'react'
import Button from '@mui/material/Button'
import Photos from '@/components/UI/Photos'

import SvgMapPin from '@/assets/icon/map-pin.svg?react'


const UserInfoContent = () => {
    useEffect(
        () => {
            const langHtml = document.getElementById('user-info')
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards'
        },
        []
    )

    return (
        <>
            <div className="user-info__ctx">
                <h3 className="headline">ID8148518</h3>
                <Photos />
                <div className="description">
                    <h4 className="headline">Виктория, 20 лет</h4>
                    <div className="labels">
                        <div className="item">
                            <SvgMapPin />
                            <p className="text">Санкт-Петербург</p>
                        </div>
                        <div className="item">
                            <p className="text">Про - <span>АКТИВЕН</span></p>
                        </div>
                    </div>
                    <p className="info">Привет! Я очень трудолюбивый человек, и у меня есть несколько профессий, которые я с удовольствием совмещаю: я работаю пекарем, баристой и кассиром. Каждая из этих работ приносит мне радость и позволяет развиваться в разных направлениях. В свободное время я увлекаюсь игрой на виолончели 🎻, что приносит мне огромное удовольствие и помогает расслабиться после насыщенного рабочего дня. Кроме того, я обожаю проводить время на свежем воздухе, гуляя по живописным паркам, наслаждаясь красотой природы и общаясь с друзьями. Эти моменты наполняют мою жизнь счастьем и гармонией.</p>
                </div>
            </div>
            <div className="user-info__btns">
                <div className="link">
                    <Button className="link__btn block" variant="contained">Заблокировать</Button>
                </div>
                <div className="link">
                    <Button className="link__btn take-pro" variant="contained">Сделать Pro</Button>
                </div>
                <div className="link">
                    <Button className="link__btn take-away-pro" variant="contained">Убрать Pro</Button>
                </div>
            </div>
        </>
    )
}

export default UserInfoContent
