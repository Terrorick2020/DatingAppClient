import { JSX, memo, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { warningAlert } from '@/funcs/alert.funcs';
import { shareURL } from '@telegram-apps/sdk-react';
import type { PropsLinkMsg } from '@/types/ui.types';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/joy/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SvgLinkConfirm from '@/assets/icon/link-confirm.svg';
import SvgCopy from '@/assets/icon/copy.svg';
import SvgLink from '@/assets/icon/link.svg';
import CheckIcon from '@mui/icons-material/Check';


const LinkMsg = memo((props: PropsLinkMsg): JSX.Element => {
    const [copied, setCopied] = useState<boolean>(false);
    const [loadSend, setLoadSend] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleClose = (): void => props.setOpen(false);

    const handleCopy = async (): Promise<void> => {
        await navigator.clipboard.writeText(props.link);

        setCopied(true);

        setTimeout(() => { setCopied(false) }, 2000);
    };

    const handleShare = async (): Promise<void> => {
        try {
            setLoadSend(true);

            const text = 'Попробуй приложение!';

            if(shareURL.isAvailable()) {
                await shareURL(props.link, '\n' + text);
            } else if (navigator.share) {
                const shareData = {
                    title: 'Приглашение',
                    text,
                    url: props.link,
                };

                await navigator.share(shareData);
            }

            handleClose();
        } catch (error: any) {
            warningAlert(dispatch, 'Не удалось отправить ссылку! Попробуйте позже');
        } finally {
            setLoadSend(false);
        }
    };

    const shareIsWorked = useMemo(() => shareURL.isAvailable() || navigator.share, []);

    const CopySvg = useMemo(
        () => copied ? <CheckIcon /> : <img src={SvgCopy} alt="copy" loading="lazy" decoding="async" />,
        [copied]
    );

    const sendSvg = useMemo(
        () => loadSend ? <CircularProgress size="1.2rem" /> : <img src={SvgLink} alt="link" loading="lazy" decoding="async" />,
        [loadSend],
    );

    return (
        <Dialog
            keepMounted
            className="base-confirm link-confirm"
            aria-describedby="alert-dialog-slide-description-link-confirm"
            open={props.open}
            onClose={handleClose}
            slots={{ transition: Slide }}
            slotProps={{
                transition: {
                direction: 'up',
                },
            }}
        >
            <DialogTitle>
                <img
                    src={ SvgLinkConfirm }
                    alt="link-confirm"
                    loading="lazy"
                    decoding="async"
                />
            </DialogTitle>
            <DialogContent>
                <div className="text-block">
                    <h4 className="headline">Пригласить</h4>
                    <p className="description">Отправьте ссылку на ваш профиль</p>
                </div>
                <div className="link-block">
                    <div className="link-block__txt">
                        <h5 className="headline">Ссылка на профиль</h5>
                        <p className="link">{props.link}</p>
                    </div>
                    <IconButton
                        onClick={ handleCopy }
                    >
                        { CopySvg }
                    </IconButton>
                </div>
            </DialogContent>
            <DialogActions>
                {
                    shareIsWorked && <Button
                        className="send-btn"
                        startIcon={ sendSvg }
                        disabled={ loadSend }
                        onClick={ handleShare }
                    >Отправить</Button>
                }
                <Button
                    className="close-btn"
                    onClick={handleClose}
                >Закрыть</Button>
            </DialogActions>
        </Dialog>
    )
})

export default LinkMsg;
