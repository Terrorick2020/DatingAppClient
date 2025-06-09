import { JSX, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { acceptMatchAsync } from '@/store/slices/likesSlice';
import { setMatch } from '@/store/slices/likesSlice';
import { addRoute } from '@/store/slices/settingsSlice';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import ChatInput from '@/components/UI/ChatInput';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


const QuestMatch = (): JSX.Element => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const match = useSelector((state: IState) => state.likes.match);

    if(!match.value || !match.from) return (<></>);

    const [message, setMessage] = useState<string>('');

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    const handleOpen = (): void => {
        dispatch(setMatch({...match, value: true}))
    }
    
    const handleClose = (): void => {
        dispatch(setMatch({...match, value: false}))
    }

    const handleChange = (newValue: string) => setMessage(newValue);

    const handleAcceptMatch = async (): Promise<void> => {

        await dispatch(acceptMatchAsync());

        const questGlobRoute = appRoutes.questionnaires.global;
        const questChatsRoute = appRoutes.questionnaires.inner.chats;
        const toChats = `${questGlobRoute}/${questChatsRoute}`;

        dispatch(addRoute(toChats));

        const toTargetChat = appRoutes.targetChat.replace(':id', match.from!.id);

        navigate(toTargetChat);

        dispatch(setMatch({ value: false, from: null }));
    }

    return (
        <SwipeableDrawer
            className="match-drawer"
            anchor="top"
            open={match.value}
            onOpen={handleOpen}
            onClose={handleClose}
        >
            <div className="match">
                <header className="header">
                    <h2 className="headline">Это мэтч!</h2>
                </header>
                <main className="main">
                    <div className="cards">
                        <div className="item female"
                            style={{
                                backgroundImage: `url(${profileInfo.photos[0].photo})`
                            }}
                        />
                        <div className="item male"
                            style={{
                                backgroundImage: `url(${match.from.avatar})`
                            }}
                        />
                    </div>
                    <h6 className="text">
                        <span className="caps">Вы</span> и <span className="caps">Виктория</span> 
                        <span className="no-wrap">понравились друг другу</span>
                    </h6>
                    <ChatInput
                        message={message}
                        handleChange={handleChange}
                        handleFocus={() => {}}
                        handleBlur={() => {}}
                        handleClick={handleAcceptMatch}
                    />
                </main>
                <footer className="footer"></footer>
            </div>
        </SwipeableDrawer>
    )
}

export default QuestMatch;
