import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkTooltipText } from '@/types/admin.types';
import { getUniqueLinkAsync } from '@/store/slices/adminSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/joy/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MyLoader from '@/components/UI/MyLoader';


const PhysAddContent = () => {
    const link = useSelector((state: IState) => state.admin.link);
    const isLoad = useSelector((state: IState) => state.settings.load);

    const [msg, setMsg] = useState<LinkTooltipText>(LinkTooltipText.Copy);
    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    useEffect( () => { dispatch(getUniqueLinkAsync()) }, [] );

    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(link);
            setOpen(true);
            setMsg(LinkTooltipText.Copied);
        } catch (error) {
            setMsg(LinkTooltipText.Error);
        } finally {
            setTimeout( () => { setMsg(LinkTooltipText.Copy) }, 1000 );
        }
    }

    return (
        <>
            {
                isLoad
                    ?
                    <MyLoader />
                    :
                    <>
                        <p className="description">Ссылка регистрации психолога будет действительна 30 минут с настоящего момента.</p>
                        <div className="conteiner">
                            <div className="box">
                                <span className="text">{link}</span>
                                <Tooltip
                                    placement="top-end"
                                    title={msg}
                                    open={open}
                                    onMouseEnter={() => setOpen(true)}
                                    onMouseLeave={() => setOpen(false)}
                                    onMouseDown={handleCopy}
                                >
                                    <IconButton>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default PhysAddContent;
