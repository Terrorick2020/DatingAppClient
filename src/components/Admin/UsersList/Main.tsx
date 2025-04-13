import { useState, MouseEvent } from "react";
import { useSelector } from 'react-redux';
import { appRoutes } from '@/config/routes.config';
import { statusTextMap } from "@/constant/admin";
import { type IState } from '@/types/store.types';

import ListBlock from '@/components/UI/ListBlock';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UsersListDialog from './Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import SvgMoreCircle from '@/assets/icon/more-circle.svg?react';


const UsersListMain = () => {
    const adminState = useSelector((state: IState) => state.admin);
    const isLoad = useSelector((state: IState) => state.settings.load);

    const adminGlobRoute      = appRoutes.admin.global;
    const adminUserInfoRoute  = appRoutes.admin.inner.userInfo;
    const toUserInfo          = `${adminGlobRoute}/${adminUserInfoRoute}`;

    const [openDel, setOpenDel] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: MouseEvent<HTMLLIElement>): void => {
        event.stopPropagation();
        setAnchorEl(null);
        () => setOpenDel(true);
    };

    const hadleBlock = (event: MouseEvent<HTMLLIElement>): void => {
        console.log("Пользователь заблокирован");
        handleClose(event);
    };

    const handleEdit = (event: MouseEvent<HTMLLIElement>): void => {
        console.log("Редактирование пользователя");
        handleClose(event);
    };

    const handleOpenDeletePanel = (event: MouseEvent<HTMLLIElement>): void => {
        setOpenDel(true);
        handleClose(event);
    };

    return (
        <>
            {
                !adminState.profilesList.length && !isLoad
                    ?
                    <div className="not-found">
                        <h2 className="text">Ничего не найдено</h2>
                    </div>
                    :
                    <div className="search-list">
                        {
                            isLoad
                                ?
                                <CircularProgress className="progress" />
                                :
                                (adminState.profilesList.map(item => (
                                    <ListBlock
                                        img={item.avatr}
                                        route={`${toUserInfo.replace(':id', '')}${item.id}`}
                                        key={`admin-profile-${item.id}`}
                                    >
                                        <div className="search-list__item">
                                            <div className="text">
                                                <h3 className="name">Татьяна Иванова</h3>
                                                <span className={`label ${statusTextMap[item.status].addClass}`}>
                                                    {statusTextMap[item.status].status}
                                                </span>
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
                                                <MenuItem onClick={hadleBlock}>Деактивировать</MenuItem>
                                                <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
                                                <MenuItem onClick={handleOpenDeletePanel}>Удалить</MenuItem>
                                            </Menu>
                                        </div>
                                    </ListBlock>
                                )))
                        }
                    </div>
            }
            <UsersListDialog open={openDel} hadleClose={() => setOpenDel(false)} />
        </>
    )
}

export default UsersListMain;
