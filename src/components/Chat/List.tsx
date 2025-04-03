import ChatDay from './Day';


const msgList = [
    {
        id: 0,
        day: '12 июля',
        dayListMsg: [
            {
                id: 0,
                isSelf: false,
                msg: 'Привет, как твои дела? Что у тебя нового. Чем сегодня занимался',
                time: '14:15',
                isChecked: true
            },
            {
                id: 1,
                isSelf: true,
                msg: 'Привет! Все отлично, работаю над проектом. А ты как?',
                time: '14:20',
                isChecked: true
            },
            {
                id: 2,
                isSelf: false,
                msg: 'Здорово! Я тоже занят, но решил сделать перерыв.',
                time: '14:25',
                isChecked: true
            }
        ]
    },
    {
        id: 1,
        day: '13 июля',
        dayListMsg: [
            {
                id: 0,
                isSelf: false,
                msg: 'Доброе утро! Какие планы на сегодня?',
                time: '09:00',
                isChecked: true
            },
            {
                id: 1,
                isSelf: true,
                msg: 'Привет! Думаю заняться спортом и немного почитать.',
                time: '09:05',
                isChecked: true
            },
            {
                id: 2,
                isSelf: false,
                msg: 'Отлично! Тогда вечером расскажешь, как прошло.',
                time: '09:10',
                isChecked: false
            },
            {
                id: 3,
                isSelf: false,
                msg: 'Если хочешь, можешь пойти со мной.',
                time: '09:10',
                isChecked: false
            },
        ]
    }
];

const ChatList = () => {
    return (
        <>
            <div className="chat-list">
                {msgList.map(item => (
                    <ChatDay
                        id={item.id}
                        day={item.day}
                        dayListMsg={item.dayListMsg}
                    />
                ))}
            </div>
        </>
    )
}

export default ChatList;
