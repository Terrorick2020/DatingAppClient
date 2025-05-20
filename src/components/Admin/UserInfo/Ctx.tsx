import { JSX, useMemo, memo } from 'react';
import { ageToStr } from '@/funcs/general.funcs';
import { useDispatch } from 'react-redux';
import { addPhotoToUserAsync, delPhotoToUserAsync } from '@/store/slices/adminSlice';
import { statusTextMap } from '@/constant/admin';
import type { PropsUserInfoComponent } from '@/types/admin.types';
import type { RootDispatch } from '@/store';

import Photos from '@/components/UI/Photos';
import UserInfoContent from './ComplaintInfo';
import SvgMapPin from '@/assets/icon/map-pin.svg?react';


const UserInfoCtx = memo((props: PropsUserInfoComponent): JSX.Element => {
    const { id, name, age, city, description, status, photos, complaint } = props.targetProfile;
    
    const { text, status: statusText, addClass } = useMemo(() => {
        return statusTextMap[status];
    }, [status]);

    const headline = useMemo(() => `${name}, ${ageToStr(age)}`, [name, age]);

    const dispatch = useDispatch<RootDispatch>();

    const handleAdd = async (photo: File): Promise<void> => {
        await dispatch(addPhotoToUserAsync(photo));
    }

    const handleDel = async (id: string): Promise<void> => {
        await dispatch(delPhotoToUserAsync(id));
    }

    return (
        <>
            <h3 className="headline">{`ID${id}`}</h3>
            <UserInfoContent complaint={complaint} />
            <Photos photos={photos} handleAdd={handleAdd} handleDel={handleDel} />
            <div className="description">
                <h4 className="headline">{headline}</h4>
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
})

export default UserInfoCtx;
