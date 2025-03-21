import SvgVideoHelpers from '@/assets/icon/video-helpers.svg?react';


const FillingQuestHeader = () => {
    return (
        <>  
            <div className="text">
                <h3 className="headline">Регистрация</h3>
                <p className="description">Расскажите немного о себе и о своих планах.</p>
            </div>
            <div className="video">
                <SvgVideoHelpers />
            </div>
        </>
    )
}

export default FillingQuestHeader
