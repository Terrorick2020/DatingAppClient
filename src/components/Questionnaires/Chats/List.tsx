import ListBlock from '@/components/UI/ListBlock';
import Timer from '@/components/UI/Timer';

import PngWoman from '@/assets/img/woman.png';


const chatsList = [
    { id: 0, headline: 'Пользователь 1, 20', msg: 'Сообщение от пользователя 1', timer: '11:10:41', count: 3 },
    { id: 1, headline: 'Пользователь 2, 21', msg: 'Сообщение от пользователя 2', timer: '11:09:41', count: 3 },
    { id: 2, headline: 'Пользователь 3, 22', msg: 'Сообщение от пользователя 3', timer: '11:08:41', count: 2 },
    { id: 3, headline: 'Пользователь 4, 23', msg: 'Сообщение от пользователя 4', timer: '07:41', count: 4 },
    { id: 4, headline: 'Пользователь 5, 24', msg: 'Сообщение от пользователя 5', timer: '11:06:41', count: 3 },
    { id: 5, headline: 'Пользователь 6, 25', msg: 'Сообщение от пользователя 6', timer: '11:05:41', count: 1 },
    { id: 6, headline: 'Пользователь 7, 26', msg: 'Сообщение от пользователя 7', timer: '04:41', count: 4 },
    { id: 7, headline: 'Пользователь 8, 27', msg: 'Сообщение от пользователя 8', timer: '11:03:41', count: 3 }
]
const ChatsList = () => {
    return (
        <>
            <div className="list">
                {chatsList.map(item =>(
                    <ListBlock img={PngWoman} key={`chats-list-item-${item.id}`}>
                        <div className="inner">
                            <div className="inner__text">
                                <h6 className="headline">{item.headline}</h6>
                                <p className="msg">{item.msg}</p>
                            </div>
                            <div className="inner__trigger">
                                <span className="label">
                                    {/* <span className={`timer ${item.timer.length < 6 && 'critical'}`}>
                                        {item.timer}
                                    </span> */}
                                    <Timer value={item.timer} isCritical={item.timer.length < 6} />
                                    {item.count}
                                </span>
                            </div>
                        </div>
                    </ListBlock>
                ))}
            </div>
        </>
    )
}

export default ChatsList
