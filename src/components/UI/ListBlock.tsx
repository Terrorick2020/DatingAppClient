import { ReactNode } from 'react';

import Avatar from '@mui/material/Avatar';


interface PropsListBlock {
    img: string
    children: ReactNode
}

const ListBlock = (props: PropsListBlock) => {

    return (
        <>
            <div className="list-block">
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
