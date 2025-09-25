import { JSX } from 'react';

import ErrorContent from '@/components/ErrorContent';


const ErrorPage = (): JSX.Element => {
    return (
        <div className="error">
            <ErrorContent />
        </div>
    )
}

export default ErrorPage;
