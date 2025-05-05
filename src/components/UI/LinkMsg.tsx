import type { PropsLinkMsg } from '@/types/ui.types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/joy/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SvgLinkConfirm from '@/assets/icon/link-confirm.svg';
import SvgCopy from '@/assets/icon/copy.svg';
import SvgLink from '@/assets/icon/link.svg';


const LinkMsg = (props: PropsLinkMsg) => {
    const handleClose = (): void => props.setOpen(false);

    const handleCopy = async (): Promise<void> =>
        await navigator.clipboard.writeText(props.link);

    const handleShare = async (): Promise<void> => {
        const shareData = {
            title: 'Приглашение',
            text: 'Попробуй приложение!',
            url: props.link,
        };

        await navigator.share(shareData);
    }

    return (
        <>
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
                    <img src={SvgLinkConfirm} alt="link-confirm" />
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
                            onClick={handleCopy}
                        >
                            <img src={SvgCopy} alt="copy" />
                        </IconButton>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="send-btn"
                        startIcon={<img src={SvgLink} alt='link'/>}
                        onClick={handleShare}
                    >Отправить</Button>
                    <Button
                        className="close-btn"
                        onClick={handleClose}
                    >Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LinkMsg;
