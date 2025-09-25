import { JSX } from 'react';

import NotFoundContent from '@/components/NotFoundContent';


const NotFoundPage = (): JSX.Element => {
    return (
        <div className="error">
            <NotFoundContent />
        </div>  
    )
}

export default NotFoundPage;
