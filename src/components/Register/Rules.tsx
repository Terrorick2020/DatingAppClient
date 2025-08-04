import { JSX, useEffect } from 'react';
import { SUPPORT_EMAIL } from '@/config/env.config';


const RulesContent = (): JSX.Element => {
    useEffect(() => {
        const langHtml = document.getElementById('rules');
        if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';
    }, []);

    return (
        <div className="rules__ctx">
            <div className="shadow"></div>
            <h4 className="headline">Правила использования приложения 3date</h4>
            <h5 className="sub-headline">Дата вступления в силу: 20.07.2025</h5>
            <div className="text">
                <h6 className="title">1. Общие положения</h6>
                <p className="description">
                    Используя приложение 3date, вы соглашаетесь с этими правилами.
                    Приложение доступно только пользователям Telegram старше 18 лет.
                </p>
            </div>
            <div className="text">
                <h6 className="title">2. Регистрация и профиль</h6>
                <ul className="list">
                    <li className="list__item">Возраст от 18 лет;</li>
                    <li className="list__item">Используйте только свои фото;</li>
                    <li className="list__item">Запрещены чужие фото, фейки и посторонние изображения;</li>
                    <li className="list__item">Запрещено размещать контакты, внешние ссылки и ложную информацию.</li>  
                </ul>
            </div>
            <div className="text">
                <h6 className="title">3. Запрещено:</h6>
                <ul className="list">
                    <li className="list__item">Агрессия и оскорбления;</li>
                    <li className="list__item">Интимный контент без согласия;</li>
                    <li className="list__item">Спам и реклама;</li>
                    <li className="list__item">Финансовые мошенничества;</li>
                    <li className="list__item">Использование чужих данных;</li>
                    <li className="list__item">Дискриминация;</li>
                    <li className="list__item">Фейковые фото;</li>
                    <li className="list__item">Продажа запрещённых веществ;</li>
                    <li className="list__item">Пропаганда ЛГБТ;</li>
                    <li className="list__item">Любые запрещённые в РФ действия.</li> 
                </ul>
            </div>
            <div className="text">
                <h6 className="title">4. Указание мест для встреч</h6>
                <p className="description">
                    Можно указать район или тип заведения.
                    Ответственность за точность и последствия встречи несёт пользователь.
                </p>
            </div>
            <div className="text">
                <h6 className="title">5. Ответственность</h6>
                <p className="sub-title">Приложение не отвечает за:</p>
                <ul className="list">
                    <li className="list__item">Встречи и личное общение пользователей;</li>
                    <li className="list__item">Передаваемую личную информацию;</li>
                    <li className="list__item">Убытки и претензии от использования приложения;</li>
                </ul>
            </div>
            <div className="text">
                <h6 className="title">6. Безопасность</h6>
                <p className="sub-title">Рекомендуем:</p>
                <ul className="list">
                    <li className="list__item">Встречаться в общественных местах;</li>
                    <li className="list__item">Сообщать близким о месте встречи;</li>
                    <li className="list__item">Не передавать личные данные незнакомцам.</li>
                </ul>
            </div>
            <div className="text">
                <h6 className="title">7. Модерация</h6>
                <p className="sub-title">Контент модерируется автоматически и вручную. За нарушения предусмотрены:</p>
                <ul className="list">
                    <li className="list__item">Предупреждение;</li>
                    <li className="list__item">Временная блокировка;</li>
                    <li className="list__item">Полная блокировка.</li>
                </ul>
            </div>
            <div className="text">
                <h6 className="title">8. Платные функции</h6>
                <p className="description">
                    Пока отсутствуют.
                    В будущем возможны через Telegram Stars.
                    Возврат регулируется правилами Telegram.
                </p>
            </div>
            <div className="text">
                <h6 className="title">9. Реклама</h6>
                <p className="description">
                    В приложении может показываться реклама. Возможны ссылки на внешние ресурсы.
                </p>
            </div>
            <div className="text">
                <h6 className="title">10. Удаление аккаунта</h6>
                <p className="sub-title">Удалить аккаунт можно:</p>
                <ul className="list">
                    <li className="list__item">Самостоятельно через личный кабинет;</li>
                    <li className="list__item">Обратившись в техподдержку.</li>
                </ul>
            </div>
            <div className="text">
                <h6 className="title">11. Поддержка</h6>
                <p className="sub-title">Связаться с поддержкой можно</p>
                <ul className="list">
                    <li className="list__item">В приложении;</li>
                    <li className="list__item">Через Telegram-группу (ссылка указана в приложении).</li>
                </ul>
            </div>
            <div className="text">
                <h6 className="title">12. Заключительные положения</h6>
                <p className="description">
                    Правила регулируются законодательством РФ.
                    Об изменениях уведомляем через Telegram-бота.
                </p>
            </div>
            <div className="text">
                <p className="description">
                    По вопросам обращайтесь в поддержку:{" "}
                    <span className="purple">{ SUPPORT_EMAIL }</span>
                </p>
            </div>
            <div className="text">
                <p className="description">Последнее обновление: 20.07.2025</p>
            </div>
        </div>
    )
}

export default RulesContent;
