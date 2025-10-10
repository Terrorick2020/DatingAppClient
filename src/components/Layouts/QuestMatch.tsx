import { JSX, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { acceptMatchAsync, setMatch } from '@/store/slices/likesSlice';
import { URL_MARK } from '@/config/env.config';
import { createSelector } from 'reselect';
import { addRoute, setBadge } from '@/store/slices/settingsSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { toTargetChat, toDetails } from '@/config/routes.config';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import ChatInput from '@/components/UI/ChatInput';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


const selectSettings = (state: IState) => state.settings;
const selectProfile = (state: IState) => state.profile;
const selectLikes = (state: IState) => state.likes;

const selectMatchState = createSelector(
    [selectSettings, selectProfile, selectLikes],
    (settings, profile, likes) => ({
      profileInfo: profile.info,
      badgeCtx: settings.badge,
      match: likes.match,
    })
);

const QuestMatch = (): JSX.Element => {
    const { profileInfo, match, badgeCtx } = useSelector(selectMatchState);

    const [message, setMessage] = useState<string>('');

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpen = (): void => {
        dispatch(setMatch({...match, value: true}))
    };
    
    const handleClose = (): void => {
        dispatch(setMatch({from: null, value: false}))
    };

    const handleChange = (newValue: string) => setMessage(newValue);

    const handleNav = (path: string): void => {
        dispatch(addRoute(location.pathname));

        navigate(path);

        handleClose();
    }

    const handleAcceptMatch = async (): Promise<void> => {
        const response = await dispatch(acceptMatchAsync(message)).unwrap();

        if( response && response !== 'error' ) {

            if ( badgeCtx.chats.value && badgeCtx.chats.content > 0 ) {
                const newContent = badgeCtx.chats.content - 1;

                dispatch(setBadge({
                    ...badgeCtx,
                    chats: {
                        value: newContent > 0,
                        content: newContent,
                    }
                }));
            }

            handleNav(toTargetChat.replace(`:${URL_MARK}`, match.from!.chatId));
        }

        handleClose();
    };

    if(!match.value || !match.from) return (<></>);

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
                            onClick={
                                () => handleNav(toDetails.replace(`:${URL_MARK}`, match.from!.id))
                            }
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
