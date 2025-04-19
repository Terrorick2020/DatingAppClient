import { ReactNode, MouseEvent } from 'react';

import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/material/Menu';


interface PropsMenuBtn {
    anchorEl: null | HTMLElement
    setAnchorEl: (value: null | HTMLElement) => void
    handleClose: (e: MouseEvent<HTMLLIElement>) => void
    btnIcon: string
    btnAddClass: string
    menuAddClass: string
    children: ReactNode
}
const MenuBtn = (props: PropsMenuBtn) => {
    const open = Boolean(props.anchorEl);

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
                <img src={props.btnIcon} alt="menu-btn" />
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
}

export default MenuBtn;
