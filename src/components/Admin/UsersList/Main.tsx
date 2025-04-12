import { useState, MouseEvent } from "react";
import { resUsersList } from "@/constant/admin";
import { appRoutes } from '@/config/routes.config';

import ListBlock from '@/components/UI/ListBlock';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UsersListDialog from './Dialog';
import SvgMoreCircle from '@/assets/icon/more-circle.svg?react';


const UsersListMain = () => {
    const adminGlobRoute      = appRoutes.admin.global;
    const adminUserInfoRoute  = appRoutes.admin.inner.userInfo;
    const toUserInfo          = `${adminGlobRoute}/${adminUserInfoRoute}`;

    const [openDel, setOpenDel] = useState<boolean>(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
      () => setOpenDel(true)
    };



    return (
        <>
            {
                false
                    ?
                    <div className="not-found">
                        <h2 className="text">Пользователь не найден</h2>
                    </div>
                    :
                    <div className="search-list">
                        {resUsersList.map(item => (
                            <ListBlock img={item.img} route={item.route}>
                                <div className="search-list__item">
                                    <div className="text">
                                        <h3 className="name">Татьяна Иванова</h3>
                                        {
                                            item.id % 2 === 0
                                                ?
                                                <span className="label off">НЕАКТИВЕН</span>
                                                :
                                                <span className="label">АКТИВЕН</span>
                                        }
                                    </div>
                                    <IconButton
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <SvgMoreCircle />
                                    </IconButton>
                                    <Menu
                                        id="serch-usrs-menu"
                                        className="serch-usrs-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Деактивировать</MenuItem>
                                        <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                                        <MenuItem onClick={() => setOpenDel(true)}>Удалить</MenuItem>
                                    </Menu>
                                </div>
                            </ListBlock>
                        ))}
                    </div>
            }
            <UsersListDialog open={openDel} hadleClose={() => setOpenDel(false)} />
        </>
    )
}

export default UsersListMain;