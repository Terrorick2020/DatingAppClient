import PngPsych from '@/assets/img/psych.png';


const expList = [
    { id: 0, title: 'Частная практика', desc: 'Психоаналитик', label: '2015-н.в.' },
    { id: 1, title: 'Медицинский центр "Здоровье"', desc: 'Клинический психолог', label: '2012-2015' },
    { id: 2, title: 'Городская больница №5', desc: 'Психиатр', label: '2008-2012' },
    { id: 3, title: 'Научный институт психологии', desc: 'Исследователь', label: '2005-2008' },
    { id: 4, title: 'Университетская клиника', desc: 'Ассистент врача', label: '2003-2005' }
];

const PsychologistCtx = () => {
    return (
        <>
            <div
                className="image"
                style={{
                    backgroundImage: `url(${PngPsych})`,
                }}
            >
                <footer className="desc">
                    <h4 className="headline">Иванова Виктория</h4>
                    <div className="labels">
                        <span className="item">Стаж 8 лет</span>
                        <span className="item">Клинический психолог</span>
                    </div>
                </footer>
            </div>
            <div className="bio">
                <header className="head">
                    <h5 className="headline">О себе</h5>
                    <span className="online">Онлайн</span>
                    <span>Оффлайн</span>
                </header>
                <p className="text">Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате</p>
            </div>
            <div className="exp">
                <h5 className="headline">Опыт работы</h5>
                <div className="exp__list">
                    {expList.map(item => (
                        <div className="item">
                            <div className="head">
                                <h6 className="title">{ item.title }</h6>
                                <p className="desc">{ item.desc }</p>
                            </div>
                            <p className="label">{ item.label }</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PsychologistCtx;
