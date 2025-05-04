import { useEffect } from 'react';

import DetailsSlider from './Slider';
import DetailsInfo from './Info';
import DetailsFixed from './Fixed';
import ComplaintDrawer from '@/components/Layouts/ComplaintDrawer';


const DetailsContent = () => {
    useEffect(
        () => {
            const detailsHtml = document.getElementById('details');
            if ( detailsHtml ) detailsHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            <div className="details__slider">
                <DetailsSlider />
            </div>
            <div className="details__info">
                <DetailsInfo />
            </div>
            <div className="details__fixed">
                <DetailsFixed />
            </div>
            <ComplaintDrawer />
        </>
    )
}

export default DetailsContent;
