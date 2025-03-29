import Button from '@mui/material/Button';

import SvgCheckMark from '@/assets/icon/check-mark.svg';
import SvgTimerCircle from '@/assets/icon/timer-circle.svg';


const labels = [
    {id: 0, label: 'Коктелтный бар' },
    {id: 1, label: 'Адмиралтейский район' },
]

const DetailsInfo = () => {
    return (
        <>
            <div className="poster">
                <div className="plan-panel">
                    <Button
                        className="label"
                        variant="outlined"
                        disabled
                        endIcon={
                            <span className="circle">
                                <img src={SvgCheckMark} alt="check-mark" />
                            </span>  
                        }
                    >
                        Планы на сегодня
                    </Button>
                    <div className="timer">
                        <img src={SvgTimerCircle} alt="timer-circle" />
                        <p className="time">18:00</p>
                    </div>
                </div>
                <div className="labels">
                    {labels.map(item => (
                        <p key={`labels-item-${item.id}`} className="item">{item.label}</p>
                    ))}
                </div>
                <p className="text">Хочу сходить в коктейльный бар, выпить пару коктейлей и пообщаться.</p>
            </div>
            <div className="description">
                <h4 className="headline">Био</h4>
                <p className="text">Много работаю ( просто пекарь, бариста, кассир)) Играю на виолончели 🎻 Люблю гулять на свежем воздухе...Много работаю ( просто пекарь, бариста, кассир)) Играю на виолончели 🎻 Люблю гулять на свежем воздухе</p>
            </div>
        </>
    )
}

export default DetailsInfo
