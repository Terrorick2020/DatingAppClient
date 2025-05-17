import { JSX } from 'react';
import { NavLink } from 'react-router-dom';


const UserInfoComplaint = (): JSX.Element => {
    return (
        <>
            <div className="complaint-info">
                <h6 className="title">Жалоба</h6>
                <div className="block">
                    <div className="speaker-info">
                        <div className="from-user">
                            <h5 className="sub-headline">От кого:</h5>
                            <NavLink className="user-id" to={''}>
                                <h5 className="sub-headline">ID8148518</h5>
                            </NavLink>
                        </div>
                        <div className="date-user">
                            <div className="sub-headline">Дата:</div>
                            <div className="date">
                                <span className="sub">03.11.2025</span>
                                <span className="sub">14:45</span>
                            </div>
                        </div>
                    </div>
                    <div className="line" />
                </div>
                <div className="block">
                    <div className="type-info">
                        <div className="sub-headline">Тип жалобы:</div>
                        <p>Фейк, Использует данные известного человека</p>
                    </div>
                    <div className="line" />
                </div>
                <div className="block">
                    <div className="text-info">
                        <div className="sub-headline">Сообщение:</div>
                        <p className="descreption">
                            Уважаемая служба поддержки!
                            Я хотел бы выразить свою обеспокоенность по поводу аккаунта, который использует фейковые данные известного человека.
                            Это вызывает у меня серьезные сомнения относительно достоверности информации, размещаемой на данной странице.
                            Использование имени и изображений знаменитости без ее согласия не только нарушает ее права, но и вводит в заблуждение других пользователей.
                            Я считаю, что такие действия могут нанести вред репутации как самой личности, так и платформы в целом.
                            Прошу вас обратить внимание на этот аккаунт и принять соответствующие меры. Надеюсь на ваше понимание и оперативное решение данной проблемы.
                            Спасибо!
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfoComplaint;
