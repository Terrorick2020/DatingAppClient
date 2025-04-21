import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import { useSelector, useDispatch } from 'react-redux';
import { setComplOpen } from '@/store/slices/settingsSlice';
import { LinkTooltipText } from '@/types/store.types';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import SvgTime from '@/assets/icon/time.svg';
import SvgUserAdd from '@/assets/icon/user-add.svg';
import SvgBlock from '@/assets/icon/block.svg';


const QuestNavHead = () => {
    const addLink = useSelector((state: IState) => state.profile.addLink);

    const [msg, setMsg] = useState<LinkTooltipText>(LinkTooltipText.Copy);
    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(addLink);
            setOpen(true);
            setMsg(LinkTooltipText.Copied);
        } catch (error) {
            setMsg(LinkTooltipText.Error);
        } finally {
            setTimeout( () => {
                setOpen(false);
                setMsg(LinkTooltipText.Copy);
            }, 1000 );
        }
    }

    const handleComplaint = () => dispatch(setComplOpen(true));

    const regGlobRoute = appRoutes.register.global;
    const regEveningPlansRoute = appRoutes.register.inner.eveningPlans;
    const toEveningPlans = `${regGlobRoute}/${regEveningPlansRoute}`;

    return (
        <>
        <nav className="quest-nav-head" id="quest-nav-head">
            <div className="plans">
                <NavLink className="plans__link" to={ toEveningPlans }>
                    <Button
                        className="nav-btn"
                        variant="contained"
                        startIcon={
                            <img src={SvgTime} alt="time" />
                        }
                    >
                        Обновить планы
                    </Button>
                </NavLink>
            </div>
            <div className="widgets">
                <div>
                    <Tooltip
                        placement="top-end"
                        title={msg}
                        open={open}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                        onMouseDown={handleCopy}
                    >
                        <Button
                            className="nav-btn icon-btn"
                            variant="contained"
                            onClick={handleCopy}
                        >
                            <img src={SvgUserAdd} alt="user-add" />
                        </Button>
                    </Tooltip>
                </div>
                <div>
                    <Button
                        className="nav-btn icon-btn"
                        variant="contained"
                        onClick={handleComplaint}
                    >
                        <img src={SvgBlock} alt="complaint" />
                    </Button>
                </div>
            </div>
        </nav>
        </>
    )
}

export default QuestNavHead;
