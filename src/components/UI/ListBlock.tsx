import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRoute } from '@/store/slices/settingsSlice';
import { type PropsListBlock } from '@/types/ui.types';

import Avatar from '@mui/material/Avatar';


const ListBlock = (props: PropsListBlock) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleClick = (): void => {
        navigate(props.route);
        dispatch(addRoute(location.pathname));
    }

    return (
        <>
            <div className="list-block" onClick={handleClick}>
                <Avatar
                    className="list-block__avatar"
                    alt="list-block-avatar"
                    src={ props.img }
                />
                <div className="list-block__content">
                    { props.children }
                </div>
            </div>
        </>
    )
}

export default ListBlock;
