import { JSX, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initLikesListAsync } from '@/store/slices/likesSlice';
import { AnimatePresence, motion } from 'motion/react';
import { resetBadge } from '@/store/slices/settingsSlice';
import { EBadgeType } from '@/types/settings.type';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

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

            dispatch(resetBadge(EBadgeType.Likes));
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
                <AnimatePresence>
                    {likesList.map((item, index) => (
                        <motion.div
                            key={`likes-list-item-${item.id}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.3 + index * 0.2,
                            }}
                        >
                            <LikesCard likesItem={item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default LikesContent;
