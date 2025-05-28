import { JSX, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initLikesListAsync } from '@/store/slices/likesSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import LikesCard from './Card';
import MyLoader from '@/components/UI/MyLoader';


const LikesContent = (): JSX.Element => {
    const likesList = useSelector((state: IState) => state.likes.likesList);
    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const likesHtml = document.getElementById('likes');
            if ( likesHtml ) likesHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            dispatch(initLikesListAsync());
        },
        []
    )

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    if(!likesList.length) return (
        <div className="empty">
            <h4 className="headline">
                Пока никто не проявил к Вам симпатии. <br/>
                Обратитесь к анкетам, чтобы это исправить
            </h4>
        </div>
    )

    return (
        <div className="likes__ctx">
            <h4 className="headline">Симпатии</h4>
            <div className="cards">
                {likesList.map(item => (
                    <LikesCard likesItem={item} />
                ))}
            </div>
        </div>
    )
}

export default LikesContent;
