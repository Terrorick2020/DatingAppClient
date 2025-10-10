import { JSX } from 'react';

import ErrorIcon from '@mui/icons-material/Error';


const MyPlayerError = (): JSX.Element => {
    return (
        <div className="my-player-error">
            <div className="my-player-error__ctx">
                <ErrorIcon />
                <h6 className="text">Ошибка загрузки!</h6>
            </div>
        </div>
    )
};

export default MyPlayerError;
