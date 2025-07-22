import { JSX, memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ageToStr } from '@/funcs/general.funcs';
import { createSelector } from 'reselect';
import { type IState, EProfileRoles } from '@/types/store.types';
import type { PropsProfileInfo } from '@/types/quest.types';

import Button from '@mui/material/Button';
import AvatarWithPreload from '@/components/UI/AvatarWithPreload';
import SvgEdit from '@/assets/icon/edit.svg';


const selectSettings = (state: IState) => state.settings;
const selectProfile = (state: IState) => state.profile;

const selectProfileInfo = createSelector(
    [selectSettings, selectProfile],
    (settings, profile) => ({
      profileInfo: profile.info,
      cityesVars: settings.cityesVars,
    })
);

const ProfileInfo = memo((props: PropsProfileInfo): JSX.Element => {
    const { profileInfo, cityesVars } = useSelector(selectProfileInfo);

    const [city, setCity] = useState<string>('');

    const isPsych = profileInfo.role === EProfileRoles.Psych;

    const handleInitTown = async (): Promise<void> => {
        const targetCity = cityesVars.find(
            item => item.value === profileInfo.town
        );

        setCity(targetCity?.label || 'Поиск...');
    };

    useEffect(() => {
        !isPsych && handleInitTown();
    }, []);

    return (
        <div className="profile-box">
            <div className="info">
                <AvatarWithPreload
                    avatarUrl={profileInfo.photos[0]?.photo}
                    prefAlt={profileInfo.name}
                    handleClick={() => {}}
                />
                <div className="text">
                    <h4 className="headline">
                        <span className="name">{`${profileInfo.name}${isPsych ? '' : ','}`}</span>
                        { !isPsych && <span className="age">{ageToStr(profileInfo.age)}</span> }
                    </h4>
                    { !isPsych && <p className="description opacity">{city}</p> }
                </div>
            </div>
            <Button
                fullWidth
                className="lemon base-height edit"
                variant="contained"
                startIcon={
                    <img
                        src={SvgEdit}
                        alt="edit"
                        loading="lazy"
                        decoding="async"
                    />
                }
                onClick={props.handleRoute}
            >Редактировать профиль</Button>
        </div>
    )
})

export default ProfileInfo;
