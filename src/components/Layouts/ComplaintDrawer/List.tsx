import { JSX, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initComplaintsVarsAsync, setComplaint } from '@/store/slices/settingsSlice';
import { delay } from '@/funcs/general.funcs';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SvgArrowRight from '@/assets/icon/arrow-right.svg?react'


const ComplaintDrawerList = (): JSX.Element => {
    const complaint = useSelector((state: IState) => state.settings.complaint);

    const [open, setOpen] = useState<boolean>(true);

    const dispatch = useDispatch<RootDispatch>();

    const handleSelect = async (value: string): Promise<void> => {
        setOpen(false);
        await delay(130);
        dispatch(setComplaint({
            ...complaint,
            value,
        }));
        await dispatch(initComplaintsVarsAsync());
        setOpen(true);
    }

    return (
        <Collapse
            in={open}
            orientation="horizontal"
        >
            <List>
                {complaint.complaintsVars.map(item => (
                    <ListItem
                        key={`complaint-item-${item.id}`}
                        disablePadding
                        onClick={() => handleSelect(item.value)}
                    >
                        <ListItemButton>
                            <ListItemText primary={item.label} />
                            <ListItemIcon>
                                <SvgArrowRight />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Collapse>
    )
}

export default ComplaintDrawerList;
