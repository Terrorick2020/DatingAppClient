import { JSX } from 'react';

import SvgNetError from '@/assets/icon/net-error.svg';


const ErrorContent = (): JSX.Element => {
    return (
        <div className="error__ctx">
            <header className="header">
                <div className="box">
                    <img
                        className="image net-error"
                        alt="net-error"
                        loading="lazy"
                        decoding="async"
                        src={SvgNetError}
                    />
                    <h3 className="headline">Ошибка соединения</h3>
                    <p className="description">
                        Возможно, у вас возникли проблемы с сетью или что-то случилось с сервером.
                        Проверьте ваше интернет-соединение и перезапустите приложение или попробуйте позже.
                    </p>
                </div>
            </header>
        </div>
    )
}

export default ErrorContent;
