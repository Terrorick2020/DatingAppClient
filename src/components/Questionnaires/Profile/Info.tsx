import type { PropsProfileInfo } from '@/types/quest.types';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import SvgEdit from '@/assets/icon/edit.svg';
import PngWoman from '@/assets/img/woman.png';


const ProfileInfo = (props: PropsProfileInfo) => {
    return (
        <>
            <div className="profile-box">
                <div className="info">
                    <Avatar
                        alt="profile-avatar"
                        src={PngWoman}
                    />
                    <div className="text">
                        <h4 className="headline">Александр, 30</h4>
                        <p className="description opacity">Санкт-Петербург</p>
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
        </>
    )
}

export default ProfileInfo;
