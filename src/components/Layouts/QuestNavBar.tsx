import {
    toChats,
    toLikes,
    toSlider,
    toPsych,
    toProfile,
} from '@/config/routes.config';

import { JSX, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { type IState, EProfileRoles } from '@/types/store.types';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';

import SvgChats from '@/assets/icon/chats.svg?react';
import SvgLikes from '@/assets/icon/likes.svg?react';
import SvgQuestionnaires from '@/assets/icon/questionnaires.svg?react';
import SvgPsychologists from '@/assets/icon/psychologists.svg?react';
import SvgProfile from '@/assets/icon/profile.svg?react';


const selectSettings = (state: IState) => state.settings;
const selectProfile = (state: IState) => state.profile;

const selectQuestNavBar = createSelector(
    [selectSettings, selectProfile],
    (settings, profile) => ({
      isLoad: settings.load,
      badgeCtx: settings.badge,
      isCurrentPlans: profile.eveningPlans.isCurrent,
      profileInfo: profile.info,
    })
);

const QuestNavBar = (): JSX.Element => {
    const { isLoad, badgeCtx, isCurrentPlans, profileInfo } = useSelector(selectQuestNavBar);

    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = useState(location.pathname);

    const isPsych = profileInfo.role === EProfileRoles.Psych;

    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

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
                { !isPsych && <>
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
                </> }
                <BottomNavigationAction
                    label="Профиль"
                    value={toProfile}
                    icon={
                        <Badge
                            color="error"
                            badgeContent={'❕'}
                            invisible={isCurrentPlans || isPsych}
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
