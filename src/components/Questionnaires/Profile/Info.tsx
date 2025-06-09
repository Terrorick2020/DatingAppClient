import { JSX, memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ageToStr } from '@/funcs/general.funcs';
import type { PropsProfileInfo } from '@/types/quest.types';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import SvgEdit from '@/assets/icon/edit.svg';


const ProfileInfo = memo((props: PropsProfileInfo): JSX.Element => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const cityesVars = useSelector((state: IState) => state.settings.cityesVars);

    const [city, setCity] = useState<string>('');

    useEffect(() => {
        const targetCity = cityesVars.find(
            item => item.value === profileInfo.town
        );

        setCity(targetCity?.label || 'Поиск...');
    }, [])
    
    return (
        <div className="profile-box">
            <div className="info">
                <Avatar
                    alt="profile-avatar"
                    src={profileInfo.photos[0]?.photo}
                />
                <div className="text">
                    <h4 className="headline">
                        <span className="name">{`${profileInfo.name},`}</span>
                        <span className="age">{ageToStr(profileInfo.age)}</span>
                    </h4>
                    <p className="description opacity">{city}</p>
                </div>
            </div>
            <Button
                fullWidth
                className="lemon base-height edit"
                variant="contained"
                startIcon={<img src={SvgEdit} alt="edit" />}
                onClick={props.handleRoute}
            >Редактировать профиль</Button>
        </div>
    )
})

export default ProfileInfo;
