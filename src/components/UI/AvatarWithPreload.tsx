import { JSX, useEffect, useState } from 'react';
import type { PropsAvatarWithPreload } from '@/types/ui.types';

import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';


const AvatarWithPreload = (props: PropsAvatarWithPreload): JSX.Element => {
    const {avatarUrl, prefAlt, size = 56, handleClick} = props;

    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    useEffect(() => {
        if (!avatarUrl) {
            setStatus('error');
            return;
        }

        const img = new Image();
        img.src = avatarUrl;

        img.onload = () => setStatus('loaded');
        img.onerror = () => setStatus('error');
    }, [avatarUrl]);

    if (status === 'loading') return (
      <Skeleton
        sx={{
            bgcolor: '#919191',
            opacity: 0.2,
            '&::after': {
                opacity: 0.1,
            }
        }}
        variant="circular"
        width={size}
        height={size}
      />
    )

    return (
        <Avatar
            className={`${props.addClass ? props.addClass : ''}`}
            alt={`avatar-${prefAlt}`}
            src={status === 'loaded' ? avatarUrl : undefined}
            onClick={handleClick}
            sx={{ width: size, height: size }}
        >
            { prefAlt.charAt(0).toUpperCase() }
        </Avatar>
    )
}

export default AvatarWithPreload;
