import {
    toChats,
    toLikes,
    toSlider,
    toPsych,
    toProfile,
} from '@/config/routes.config';

import { JSX, useState } from 'react';
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
    const isCurrentPlans = useSelector((state: IState) => state.profile.eveningPlans.isCurrent);
    const badgeCtx = useSelector((state: IState) => state.settings.badge);

    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = useState(location.pathname);

    return (
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
                        <Badge
                            color="error"
                            badgeContent={badgeCtx.chats.content}
                            invisible={!badgeCtx.chats.value}
                        >
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
                        <Badge
                            color="error"
                            badgeContent={badgeCtx.likes.content} 
                            invisible={!badgeCtx.likes.value}
                        >
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
                    value={toPsych}
                    icon={<SvgPsychologists />}
                    onClick={() => navigate(toPsych)}
                    disabled={isLoad}
                />
                <BottomNavigationAction
                    label="Профиль"
                    value={toProfile}
                    icon={
                        <Badge
                            color="error"
                            badgeContent={'❕'}
                            invisible={isCurrentPlans}
                        >
                            <SvgProfile />
                        </Badge>
                    }
                    onClick={() => navigate(toProfile)}
                    disabled={isLoad}
                />
            </BottomNavigation>
        </Box>
    )
}

export default QuestNavBar;
