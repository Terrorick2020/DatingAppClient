import { JSX, useState } from 'react';
import { appRoutes } from '@/config/routes.config';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { IState } from '@/types/store.types';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';

import SvgChats from '@/assets/icon/chats.svg?react';
import SvgLikes from '@/assets/icon/likes.svg?react';
import SvgQuestionnaires from '@/assets/icon/questionnaires.svg?react';
import SvgPsychologists from '@/assets/icon/psychologists.svg?react';
import SvgProfile from '@/assets/icon/profile.svg?react';


const QuestNavBar = (): JSX.Element => {
    const isLoad = useSelector((state: IState) => state.settings.load);

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
                        icon={
                            <Badge badgeContent={4} color="error">
                                <SvgChats />
                            </Badge>
                        }
                        onClick={() => navigate(toChats)}
                        disabled={isLoad}
                    />
                    <BottomNavigationAction
                        label="Симпатии"
                        value={toLikes}
                        icon={
                            <Badge badgeContent={4} color="error">
                                <SvgLikes />
                            </Badge>
                        }
                        onClick={() => navigate(toLikes)}
                        disabled={isLoad}
                    />
                    <BottomNavigationAction
                        label="Анкеты"
                        value={toSlider}
                        icon={<SvgQuestionnaires />}
                        onClick={() => navigate(toSlider)}
                        disabled={isLoad}
                    />
                    <BottomNavigationAction
                        label="Пси-помощь"
                        value={toPhys}
                        icon={<SvgPsychologists />}
                        onClick={() => navigate(toPhys)}
                        disabled={isLoad}
                    />
                    <BottomNavigationAction
                        label="Профиль"
                        value={toProfile}
                        icon={
                            <Badge badgeContent={'❕'} color="error">
                                <SvgProfile />
                            </Badge>
                        }
                        onClick={() => navigate(toProfile)}
                        disabled={isLoad}
                    />
                </BottomNavigation>
            </Box>
        </>
    )
}

export default QuestNavBar;
