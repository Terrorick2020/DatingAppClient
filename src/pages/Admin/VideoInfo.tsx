import { JSX } from 'react';

import VideoInfoContent from '@/components/Admin/VideoInfo';


const AdminVidoeInfoPage = (): JSX.Element => {
    return (
        <div className="video-info" id="video-info">
            <VideoInfoContent />
        </div>
    )
};

export default AdminVidoeInfoPage;
