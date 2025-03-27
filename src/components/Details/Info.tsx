import PlanPanel from '@/components/UI/PlanPanel';


const labels = [
    {id: 0, label: 'Коктелтный бар' },
    {id: 1, label: 'Адмиралтейский район' },
]

const DetailsInfo = () => {
    return (
        <>
            <div className="poster">
                <PlanPanel content='18:00' isDetails={ true } />
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
