import { JSX, useState, MouseEvent, useMemo, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { serchProfileStatusAsync, setTargetProfileId } from '@/store/slices/adminSlice';
import { statusTextMap, userItemActivCtx } from '@/constant/admin';
import { addRoute } from '@/store/slices/settingsSlice';
import type { ProfilesListItem, UserItemActivCtx } from '@/types/admin.types';
import type { RootDispatch } from '@/store';

import MenuBtn from '@/components/UI/MenuBtn';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import SvgMoreCircle from '@/assets/icon/more-circle.svg';


interface PropsUserListItem {
    item: ProfilesListItem
    toUserInfo: string
    setOpenDel: (value: boolean) => void
}
const UserListItem = memo((props: PropsUserListItem): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const activeCtx: UserItemActivCtx = useMemo(
        () => userItemActivCtx[props.item.status],
        [props.item.status],
    );

    const handleClose = (event: MouseEvent<HTMLLIElement>): void => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const sendBlockReq = async (): Promise<void> => {
        setLoading(true);

        try {
            await dispatch(serchProfileStatusAsync({
                id: props.item.id,
                targetValue: activeCtx.targetStat,
            }));
        } finally {
            setLoading(false);
        }
    }

    const hadleBlock = (event: MouseEvent<HTMLLIElement>): void => {
        sendBlockReq();
        handleClose(event);
    };

    const handleEdit = (event: MouseEvent<HTMLLIElement>): void => {
        navigate(props.toUserInfo);
        dispatch(addRoute(location.pathname));
        handleClose(event);
    };

    const handleOpenDeletePanel = (event: MouseEvent<HTMLLIElement>): void => {
        dispatch(setTargetProfileId(props.item.id));
        props.setOpenDel(true);
        handleClose(event);
    };

    return (
        <>
            <div className="users-list__item">
                <div className="text">
                    <h3 className="name">{props.item.name}</h3>
                    <span className={`label ${statusTextMap[props.item.status].addClass}`}>
                        {loading && <CircularProgress />}
                        {statusTextMap[props.item.status].status}
                    </span>
                </div>
                <MenuBtn
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    handleClose={handleClose}
                    btnIcon={SvgMoreCircle}
                    btnAddClass="admin-ul-btn"
                    menuAddClass="admin-ul-menu"
                >
                    <MenuItem disabled={loading} onClick={hadleBlock}>{activeCtx.text}</MenuItem>
                    <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
                    <MenuItem onClick={handleOpenDeletePanel}>Удалить</MenuItem>
                </MenuBtn>
            </div>
        </>
    )
})

export default UserListItem;
