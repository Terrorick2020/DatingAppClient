import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { closingBehavior, backButton } from '@telegram-apps/sdk';


const MobileHeadNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const toPrev = () => navigate(-1);

    useEffect(() => {
        switch (window.history.state.idx) {
        case 0:
            if (backButton.isMounted()) backButton.unmount();
            if (closingBehavior.mount.isAvailable()) closingBehavior.mount();
            if (closingBehavior.enableConfirmation.isAvailable()) closingBehavior.enableConfirmation();
            break;
        default:
            if (closingBehavior.isMounted()) closingBehavior.unmount();
            if (backButton.mount.isAvailable()) backButton.mount();
            if (backButton.show.isAvailable()) backButton.show();
            
            if (backButton.onClick.isAvailable()) {
                backButton.onClick(toPrev);
                backButton.offClick(toPrev);
            }
            break;
        }
    }, [location]);

    return null;
}

export default MobileHeadNav
