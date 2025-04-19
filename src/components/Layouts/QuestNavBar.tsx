import { useState } from 'react';
import { appRoutes } from '@/config/routes.config';
import { useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import SvgChats from '@/assets/icon/chats.svg?react';
import SvgLikes from '@/assets/icon/likes.svg?react';
import SvgQuestionnaires from '@/assets/icon/questionnaires.svg?react';
import SvgPsychologists from '@/assets/icon/psychologists.svg?react';
import SvgProfile from '@/assets/icon/profile.svg?react';


const QuestNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [value, setValue] = useState(location.pathname);

    const questGlobRoute = appRoutes.questionnaires.global;

    const chatsRoute = appRoutes.questionnaires.inner.chats;
    const likesRoute = appRoutes.questionnaires.inner.likes;
    const sliderRoute = appRoutes.questionnaires.inner.slider;
    const physRoute = appRoutes.questionnaires.inner.psychologists;
    const profileRoute = appRoutes.questionnaires.inner.profile;

    const toChats = `${questGlobRoute}/${chatsRoute}`;
    const toLikes = `${questGlobRoute}/${likesRoute}`;
    const toSlider = `${questGlobRoute}/${sliderRoute}`;
    const toPhys = `${questGlobRoute}/${physRoute}`;
    const toProfile = `${questGlobRoute}/${profileRoute}`;

    return (
        <>
            <Box className="nav-bar">
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(_event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        label="Чаты"
                        value={toChats}
                        icon={ <SvgChats />}
                        onClick={() => navigate(toChats)}
                    />
                    <BottomNavigationAction
                        label="Симпатии"
                        value={toLikes}
                        icon={ <SvgLikes />}
                        onClick={() => navigate(toLikes)}
                    />
                    <BottomNavigationAction
                        label="Анкеты"
                        value={toSlider}
                        icon={ <SvgQuestionnaires />}
                        onClick={() => navigate(toSlider)}
                    />
                    <BottomNavigationAction
                        label="Пси-помощь"
                        value={toPhys}
                        icon={ <SvgPsychologists />}
                        onClick={() => navigate(toPhys)}
                    />
                    <BottomNavigationAction
                        label="Профиль"
                        value={toProfile}
                        icon={ <SvgProfile />}
                        onClick={() => navigate(toProfile)}
                    />
                </BottomNavigation>
            </Box>
        </>
    )
}

export default QuestNavBar;
