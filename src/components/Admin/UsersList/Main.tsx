import { useState, MouseEvent } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { appRoutes } from '@/config/routes.config';
import { serchProfileStatusAsync, setTargetProfileId } from "@/store/slices/adminSlice";
import { statusTextMap } from "@/constant/admin";
import { addRoute } from "@/store/slices/settingsSlice";
import { type RootDispatch } from "@/store";
import { type IState, EProfileStatus } from '@/types/store.types';

import ListBlock from '@/components/UI/ListBlock';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UsersListDialog from './Dialog';
import MyLoader from '@/components/UI/MyLoader';
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
    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

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

    const hadleBlock = async (event: MouseEvent<HTMLLIElement>, id: string): Promise<void> => {
        await dispatch(serchProfileStatusAsync({
            id,
            targetValue: EProfileStatus.Blocked,
        }));

        handleClose(event);
    };

    const handleEdit = (event: MouseEvent<HTMLLIElement>, id: string): void => {
        navigate(`${toUserInfo.replace(':id', '')}${id}`);
        dispatch(addRoute(location.pathname));
        handleClose(event);
    };

    const handleOpenDeletePanel = (event: MouseEvent<HTMLLIElement>, id: string): void => {
        dispatch(setTargetProfileId(id));
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
                                <MyLoader />
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
                                                <MenuItem onClick={(e) => hadleBlock(e, item.id)} >Деактивировать</MenuItem>
                                                <MenuItem onClick={(e) => handleEdit(e, item.id)}>Редактировать</MenuItem>
                                                <MenuItem onClick={(e) => handleOpenDeletePanel(e, item.id)}>Удалить</MenuItem>
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
