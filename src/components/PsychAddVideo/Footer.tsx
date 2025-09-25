import { JSX, useState } from 'react';

import Button from '@mui/material/Button';


const PsychAddVideoFooter = (): JSX.Element => {
    const [isLoad, setIsLoad] = useState<boolean>(false);

    const handlePublished = async (): Promise<void> => {
        setIsLoad(true);
        setIsLoad(false);
    };

    return (
        <footer className="footer">
            <div className="link">
                <Button
                    fullWidth
                    variant="contained"
                    loadingPosition="start"
                    onClick={handlePublished}
                >
                    { isLoad ? 'Публикация...' : 'Опубликовать' }
                </Button>
            </div>
        </footer>
    )
};

export default PsychAddVideoFooter;
