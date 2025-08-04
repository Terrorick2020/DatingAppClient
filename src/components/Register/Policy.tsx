import { JSX, useEffect } from 'react';
import { SUPPORT_EMAIL, BOT_LINK } from '@/config/env.config';


const PolicyContent = (): JSX.Element => {
    useEffect(() => {
        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';
    }, []);

    return (
        <div className="policy__ctx">
            <div className="shadow"></div>
            <h4 className="headline">Политика конфиденциальности</h4>
            <h5 className="sub-headline">Дата вступления в силу: 20.07.2025</h5>
            <div className="text">
                <h6 className="title">1. Общая информация</h6>
                <p className="description">
                    3date — это мини-приложение в Telegram, предназначенное для знакомств и общения.
                    Доступ осуществляется через бота <span className="purple">{ BOT_LINK }</span>.
                    Мы соблюдаем положения законодательства о защите персональных данных.
                </p>
            </div>
            <div className="text">
                <h6 className="title">2. Какие данные мы собираем</h6>
                <ul className="list">
                    <li className="list__item">Имя и никнейм в Telegram;</li>
                    <li className="list__item">Телеграм ID;</li>
                    <li className="list__item">Аватар Telegram;</li>
                    <li className="list__item">Возраст;</li>
                    <li className="list__item">Геолокация;</li>
                    <li className="list__item">IP-адрес;</li>
                    <li className="list__item">Фото пользователя;</li>
                    <li className="list__item">Поведение в приложении.</li>
                </ul>
            </div>
            <div className="text">
                <h6 className="title">3. Цели обработки данных</h6>
                <ul className="list">
                    <li className="list__item">Авторизация и идентификация;</li>
                    <li className="list__item">Персонализация сервиса;</li>
                    <li className="list__item">Поддержка пользователей;</li>
                    <li className="list__item">Улучшение и аналитика;</li>
                    <li className="list__item">Маркетинговые уведомления.</li>
                </ul>
            </div>
            <div className="text">
                <h6 className="title">4. Хранение и защита данных</h6>
                <p className="sub-title">Данные хранятся на серверах в Yandex Cloud. <br /> Применяются:</p>
                <ul className="list">
                    <li className="list__item">Шифрование данных;</li>
                    <li className="list__item">Ограничение доступа;</li>
                    <li className="list__item">Аудит логов.</li>
                </ul>
            </div>
            <div className="text">
                <h6 className="title">5. Передача третьим лицам</h6>
                <p className="sub-title">Данные передаются только при:</p>
                <ul className="list">
                    <li className="list__item">Требовании закона;</li>
                    <li className="list__item">Использовании сервисов (Telegram SDK/Login, Yandex Geocoder API).</li>
                </ul>
            </div>
            <div className="text">
                <h6 className="title">6. Права пользователей</h6>
                <p className="sub-title">Пользователь может:</p>
                <ul className="list">
                    <li className="list__item">Запросить удаление своих данных;</li>
                    <li className="list__item">Отказаться от уведомлений.</li>
                </ul>
            </div>
            <div className="text">
                <p className="description">
                    Для этого напишите нам на 
                    {" "}<span className="purple">{ SUPPORT_EMAIL }</span>{" "}
                    или отключите уведомления через Telegram-бота.
                </p>
            </div>
            <div className="text">
                <h6 className="title">7. Возрастные ограничения</h6>
                <p className="description">Приложение предназначено только для лиц старше 18 лет</p>
            </div>
            <div className="text">
                <h6 className="title">8. Обновления политики</h6>
                <p className="description">Мы можем изменять политику. Актуальная версия доступна в приложении.</p>
            </div>
            <div className="text">
                <h6 className="title">Контакты</h6>
                <p className="description">
                    По вопросам обработки персональных данных обращайтесь:
                    {" "}<span className="purple">{ SUPPORT_EMAIL }</span>
                </p>
            </div>
            <div className="text">
                <p className="description">Последнее обновление: 20.07.2025</p>
            </div>
        </div>
    )
}

export default PolicyContent;
