import { JSX, useMemo, memo, useCallback, useState } from 'react';
import { ageToStr } from '@/funcs/general.funcs';
import { useDispatch } from 'react-redux';
import { addPhotoToUserAsync, delPhotoToUserAsync } from '@/store/slices/adminSlice';
import { statusTextMap } from '@/constant/admin';
import type { PropsUserInfoComponent } from '@/types/admin.types';
import type { RootDispatch } from '@/store';

import Photos from '@/components/UI/Photos';
import UserInfoComplaint from './ComplaintInfo';
import SvgMapPin from '@/assets/icon/map-pin.svg?react';
import Carousel from 'react-material-ui-carousel';
import Paper from '@mui/material/Paper';


const UserInfoCtx = memo((props: PropsUserInfoComponent): JSX.Element => {
    const { id, name, age, city, description, status, photos, complaint } = props.targetProfile;
    
    const { text, status: statusText, addClass } = useMemo(() => {
        return statusTextMap[status];
    }, [status]);

    const [current, setCurrent] = useState<number>(0);
    const [isRet, setIsRet] = useState<boolean>(true);

    const headline = useMemo(() => `${name}, ${ageToStr(age)}`, [name, age]);

    const dispatch = useDispatch<RootDispatch>();

    const handleAdd = useCallback(async (photo: File, setUploadProgress: (value: number) => void): Promise<void> => {
        await dispatch(addPhotoToUserAsync({photo, setUploadProgress}));
    }, [dispatch]);

    const handleDel = useCallback(async (id: string): Promise<void> => {
        await dispatch(delPhotoToUserAsync(id));
    }, [dispatch]);

    const userAgent = navigator.userAgent.toLowerCase();

    const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win');
    const predMobile  = userAgent.includes('iphone') || userAgent.includes('android');
    const isDesktop  = !predMobile || predDesktop;

    return (
        <>
            <h3 className="headline">{`ID${id}`}</h3>
            <Carousel
                className="complaints-slider"
                animation="slide"
                indicators={true}
                swipe={true}
                duration={500}
                interval={5000}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: '#2B2B2B',
                        backgroundColor: '#2B2B2B',
                        width: '15px',
                        height: '15px',
                    }
                }}
                navButtonsAlwaysInvisible={!isDesktop}
                onChange={(index) => {
                    setCurrent(index || 0);
                    setIsRet(false);

                    setTimeout(() => setIsRet(true), 500);
                }}
            >
                {
                    complaint?.map((item, index) => (
                        <Paper
                            key={`compl-slider-item-${index}`}
                            sx={{
                                transform: index === current && isRet ? 'scale(1)' : 'scale(0.8)',
                                transition: 'transform 0.5s ease-in-out',
                            }}
                        >
                            <UserInfoComplaint complaint={item} />
                        </Paper>
                    ))
                }
            </Carousel>
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
