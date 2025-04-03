import { appRoutes } from '@/config/routes.config';

import ListBlock from '@/components/UI/ListBlock';

import PngWoman from '@/assets/img/woman.png';


const PsychLisst = [
    { id: 0, img: PngWoman, name: 'Михаил', type: 'Психоаналитик', label: 'Онлайн', experience: 'Стаж 8 лет' },
    { id: 1, img: PngWoman, name: 'Анна', type: 'Когнитивно-поведенческий терапевт', label: 'Онлайн', experience: 'Стаж 5 лет' },
    { id: 2, img: PngWoman, name: 'Дмитрий', type: 'Гештальт-терапевт', label: 'Онлайн', experience: 'Стаж 12 лет' },
    { id: 3, img: PngWoman, name: 'Екатерина', type: 'Психотерапевт', label: 'Онлайн', experience: 'Стаж 10 лет' },
    { id: 4, img: PngWoman, name: 'Алексей', type: 'Клинический психолог', label: 'Онлайн', experience: 'Стаж 7 лет' },
    { id: 5, img: PngWoman, name: 'Мария', type: 'Детский психолог', label: 'Онлайн', experience: 'Стаж 6 лет' },
    { id: 6, img: PngWoman, name: 'Иван', type: 'Травматерапевт', label: 'Онлайн', experience: 'Стаж 9 лет' },
    { id: 7, img: PngWoman, name: 'Светлана', type: 'Нейропсихолог', label: 'Онлайн', experience: 'Стаж 15 лет' }
]

const PsychList = () => {
    const globTargetPsychRoute = appRoutes.targetPsych;

    return (
        <>
            <h6 className="headline">Все специалисты</h6>
            <div className="list">
                {PsychLisst.map(item =>(
                    <ListBlock
                        img={PngWoman}
                        route={globTargetPsychRoute.replace(':id', `${item.id}`)}
                        key={`psych-list-item-${item.id}`}
                    >
                        <div className="inner">
                            <div className="inner__desc">
                                <h5 className="headline">{item.name}</h5>
                                <p className="text">{item.type}</p>
                                <span className="label">{item.label}</span>
                            </div>
                            <p className="inner__exp">{item.experience}</p>
                        </div>
                    </ListBlock>
                ))}
            </div>
        </>
    )
}

export default PsychList;