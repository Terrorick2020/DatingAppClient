import {
    JSX, 
    memo,
    useMemo,
    useState,
    MouseEvent,
    useCallback,
} from 'react';

import { 
    serchProfileStatusAsync,
    setTargetProfileId,
    selectPsychStatusAsync,
} from '@/store/slices/adminSlice';

import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { statusTextMap, userItemActivCtx } from '@/constant/admin';
import { EProfileRoles, EProfileStatus, EPsychStatus } from '@/types/store.types';
import { addRoute } from '@/store/slices/settingsSlice';
import type { PropsUserListItem, UserItemActivCtx } from '@/types/admin.types';
import type { RootDispatch } from '@/store';

import MenuBtn from '@/components/UI/MenuBtn';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import SvgMoreCircle from '@/assets/icon/more-circle.svg';
import { errorAlert } from '@/funcs/alert.funcs';


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

    const sendBlockReq = useCallback(async (): Promise<void> => {
        setLoading(true);

        const response = await dispatch(serchProfileStatusAsync({
            id: props.item.id,
            targetValue: activeCtx.targetStat as EProfileStatus,
            delComplaint: false,
            isDisp: true,
        })).unwrap();

        if(!response || response === 'error') {
            errorAlert(dispatch, 'Ошибка изменение статуса пользователя')
        };

        setLoading(false);

    }, [dispatch, props.item.id, activeCtx.targetStat]);

    const sendPsychBlockReq = async (): Promise<void> => {
        setLoading(true);

        const response = await dispatch(selectPsychStatusAsync({
            id: props.item.id,
            targetValue: activeCtx.targetStat as EPsychStatus,
            isDisp: true,
        })).unwrap();

        if(!response || response === 'error') {
            errorAlert(dispatch, 'Ошибка изменение статуса специалиста')
        };

        setLoading(false);
    };

    const hadleBlock = useCallback((event: MouseEvent<HTMLLIElement>): void => {
        switch(props.item.role) {
            case EProfileRoles.Psych:
                sendPsychBlockReq();
                break;
            default:
                sendBlockReq();
                break;
        };
        handleClose(event);
    }, [sendBlockReq, handleClose]);

    const handleEdit = useCallback((event: MouseEvent<HTMLLIElement>): void => {
        navigate(props.toUserInfo);
        dispatch(addRoute(location.pathname));
        handleClose(event);
    }, [navigate, props.toUserInfo, location.pathname, dispatch, handleClose]);

    const handleOpenDeletePanel = useCallback((event: MouseEvent<HTMLLIElement>): void => {
        dispatch(setTargetProfileId(props.item.id));
        props.setOpenDel(true);
        handleClose(event);
    }, [dispatch, props.item.id, props.setOpenDel, handleClose]);

    return (
        <div className="users-list__item">
            <div className="text">
                <h3 className="name">{props.item.name}</h3>
                <span className={`label ${statusTextMap[props.item.status].addClass}`}>
                    {loading && <CircularProgress />}
                    {statusTextMap[props.item.status].text}
                    {statusTextMap[props.item.status].status}
                </span>
            </div>
            <MenuBtn
                id={`users-list-menu-${props.item.id}`}
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
    )
})

export default UserListItem;
