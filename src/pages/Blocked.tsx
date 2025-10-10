import { JSX } from 'react';

import BlockedContent from '@/components/BlockedContent';


const BlockedPage = (): JSX.Element => {
    return (
        <div className="error">
            <BlockedContent />
        </div>
    )
}

export default BlockedPage;
