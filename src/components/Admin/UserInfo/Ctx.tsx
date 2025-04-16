import { useMemo } from 'react';
import { ageToStr } from '@/funcs/general.funcs';
import { statusTextMap } from '@/constant/admin';
import { type PropsUserInfoComponent } from '@/types/admin.types';

import Photos from '@/components/UI/Photos';
import SvgMapPin from '@/assets/icon/map-pin.svg?react';


const UserInfoCtx = (props: PropsUserInfoComponent) => {
    const { id, name, age, city, description, status } = props.targetProfile;
    
    const { text, status: statusText, addClass } = useMemo(() => {
        return statusTextMap[status];
    }, [status]);

    const ageStr = useMemo(() => ageToStr(age), [age]);

    return (
        <>
            <h3 className="headline">{`ID${id}`}</h3>
            <Photos />
            <div className="description">
                <h4 className="headline">
                    {`${name}, ${ageStr}`}
                </h4>
                <div className="labels">
                    <div className="item">
                        <SvgMapPin />
                        <p className="text">{city}</p>
                    </div>
                    <div className={`item ${addClass}`}>
                        <p className="text">{text}<span>{statusText}</span></p>
                    </div>
                </div>
                <p className="info">{description}</p>
            </div>
        </>
    )
}

export default UserInfoCtx;
