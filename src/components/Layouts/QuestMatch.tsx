import { JSX, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { acceptMatchAsync } from '@/store/slices/likesSlice';
import { setMatch } from '@/store/slices/likesSlice';
import { addRoute } from '@/store/slices/settingsSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { toTargetChat, toDetails } from '@/config/routes.config';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import ChatInput from '@/components/UI/ChatInput';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


const QuestMatch = (): JSX.Element => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const match = useSelector((state: IState) => state.likes.match);

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
            handleNav(toTargetChat.replace(':id', match.from!.chatId));
        } else {
            handleClose();
        }
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
                                () => handleNav(toDetails.replace(':id', match.from!.id))
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
