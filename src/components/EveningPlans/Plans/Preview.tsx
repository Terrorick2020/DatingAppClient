import { JSX } from 'react';


const PlansPreview = (): JSX.Element => {
    return (
        <div className="ep-preview">
            <h4 className="headline">Планы на вечер</h4>
            <p className="description">Расскажите планы на ваш вечер. Укажите&nbsp;где вы хотите встретиться</p>
            <p className="info">
                Информацию о планах на вечер рекомендуем заполнять каждый день, в противном случае она будет неактуальной
            </p>
        </div>
    )
}

export default PlansPreview;
