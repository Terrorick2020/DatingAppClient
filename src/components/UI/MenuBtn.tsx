import { MouseEvent, JSX, memo } from 'react';
import type { PropsMenuBtn } from '@/types/ui.types';

import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/material/Menu';


const MenuBtn = memo((props: PropsMenuBtn): JSX.Element => {
    const open = !!props.anchorEl;

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        event.preventDefault();
        props.setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <IconButton
                className={`menu-btn ${props.btnAddClass}`}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img
                    src={props.btnIcon}
                    alt="menu-btn"
                    loading="lazy"
                    decoding="async"
                />
            </IconButton>
            <Menu
                id="serch-menu"
                className={`serch-menu ${props.menuAddClass}`}
                anchorEl={props.anchorEl}
                open={open}
                onClose={props.handleClose}
            >
                { props.children }
            </Menu>
        </>
    )
})

export default MenuBtn;
