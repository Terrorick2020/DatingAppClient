import { JSX, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { URL_MARK } from '@/config/env.config';
import { toUserInfo } from '@/config/routes.config';
import type { PropsUserInfoComplaint } from '@/types/admin.types';


const UserInfoComplaint = memo(({complaint}: PropsUserInfoComplaint): JSX.Element => {
    if(!complaint) return (<></>);

    return (
        <>
            <div className="complaint-info">
                <h6 className="title">Жалоба</h6>
                <div className="block">
                    <div className="speaker-info">
                        <div className="from-user">
                            <h5 className="sub-headline">От кого:</h5>
                            <NavLink className="user-id" to={`${toUserInfo.replace(`:${URL_MARK}`, `${complaint.id}`)}`}>
                                <h5 className="sub-headline">{`ID${complaint.from}`}</h5>
                            </NavLink>
                        </div>
                        <div className="date-user">
                            <div className="sub-headline">Дата:</div>
                            <div className="date">
                                <span className="sub">{complaint.date}</span>
                                <span className="sub">{complaint.time}</span>
                            </div>
                        </div>
                    </div>
                    <div className="line" />
                </div>
                <div className="block">
                    <div className="type-info">
                        <div className="sub-headline">Тип жалобы:</div>
                        <p>{`${complaint.complGlob}, ${complaint.complTarget}`}</p>
                    </div>
                    <div className="line" />
                </div>
                <div className="block">
                    <div className="text-info">
                        <div className="sub-headline">Сообщение:</div>
                        <p className="descreption">{complaint.msg}</p>
                    </div>
                </div>
            </div>
        </>
    )
})

export default UserInfoComplaint;
