import { useState } from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgArrowRight from '@/assets/icon/arrow-right.svg?react'


const СomplaintDrawer = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary={'Фейк'} />
                            <ListItemIcon>
                                <SvgArrowRight />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </>
    )
}

export default СomplaintDrawer;