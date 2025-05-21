import { JSX, memo, useMemo, useState } from 'react';
import { EProfileStatus } from '@/types/store.types';
import { useDispatch } from 'react-redux';
import { serchProfileStatusAsync } from '@/store/slices/adminSlice';
import { RootDispatch } from '@/store';
import { type PropsUserInfoComponent, UserInfoBtnId } from '@/types/admin.types';

import Button from '@mui/material/Button';


const UserInfoBtns = memo((props: PropsUserInfoComponent): JSX.Element => {
    const [loadingButton, setLoadingButton] = useState<UserInfoBtnId | null>(null);

    const isPro = props.targetProfile.status === EProfileStatus.Pro;
    const isBlocked = props.targetProfile.status === EProfileStatus.Blocked;
    const isCompl = !!props.targetProfile.complaint;

    const dispatch = useDispatch<RootDispatch>();

    const handleClick = async (targetValue: EProfileStatus, btnId: UserInfoBtnId): Promise<void> => {
        setLoadingButton(btnId);

        await dispatch(serchProfileStatusAsync({
            id: props.targetProfile.id, 
            targetValue,
            delComplaint: btnId === UserInfoBtnId.DelCompl
        }));

        setLoadingButton(null);
    }

    const buttons = useMemo(() => isCompl ? [
            {
                id: UserInfoBtnId.Block,
                label: 'Заблокировать',
                onClick: () => handleClick(EProfileStatus.Blocked, UserInfoBtnId.Block),
                disabled: false,
                className: 'link__btn block',
            },
            {
                id: UserInfoBtnId.DelCompl,
                label: 'Удалить жалобу',
                onClick: () => handleClick(EProfileStatus.Noob, UserInfoBtnId.DelCompl),
                disabled: false,
                className: 'link__btn take-away-pro',
            },
        ] : [
            {
                id: UserInfoBtnId.Block,
                label: 'Заблокировать',
                onClick: () => handleClick(EProfileStatus.Blocked, UserInfoBtnId.Block),
                disabled: isBlocked,
                className: 'link__btn block',
            },
            {
                id: UserInfoBtnId.ProUnblock,
                label: isBlocked ? 'Разблокировать' : 'Сделать Pro',
                onClick: () => handleClick(isBlocked ? EProfileStatus.Noob : EProfileStatus.Pro, UserInfoBtnId.ProUnblock),
                disabled: isPro,
                className: 'link__btn take-pro',
            },
            {
                id: UserInfoBtnId.Unpro,
                label: 'Убрать Pro',
                onClick: () => handleClick(EProfileStatus.Noob, UserInfoBtnId.Unpro),
                disabled: !isPro,
                className: 'link__btn take-away-pro',
            },
        ],
        [isPro, isBlocked, isCompl, handleClick]
    );

    return (
        <>
            {buttons.map( btn => (
                <div
                    className="link"
                    key={`admin-user-info-${btn.id}`}
                >
                    <Button
                        fullWidth
                        loadingPosition="start"
                        loading={loadingButton === btn.id}
                        className={btn.className}
                        variant="contained"
                        disabled={btn.disabled}
                        onClick={btn.onClick}
                    >
                        {btn.label}
                    </Button>
                </div>
            ))}
        </>
    )
})

export default UserInfoBtns;
