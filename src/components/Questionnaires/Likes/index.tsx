import { JSX, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initLikesListAsync, readNewLikesAsync } from '@/store/slices/likesSlice';
import { AnimatePresence, motion } from 'motion/react';
import { resetBadge } from '@/store/slices/settingsSlice';
import { EBadgeType } from '@/types/settings.type';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import LikesCard from './Card';
import MyLoader from '@/components/UI/MyLoader';
import SvgLikesEmpty from '@/assets/icon/likes-empty.svg';


const LikesContent = (): JSX.Element => {
    const likesList = useSelector((state: IState) => state.likes.likesList);
    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();

    const initLikesCtx = async (): Promise<void> => {
        await dispatch(initLikesListAsync());

        const response = await dispatch(readNewLikesAsync()).unwrap();

        if(response === 'success') {
            dispatch(resetBadge(EBadgeType.Likes));
        }
    }

    useEffect(() => {
        const likesHtml = document.getElementById('likes');
        if ( likesHtml ) likesHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';

        initLikesCtx();
    }, []);

    useEffect(() => {
        const logoHeader = document.getElementById('logo-header');
        const cardsHtml = document.getElementById('cards');

        if( cardsHtml && logoHeader ) {
            const handleScroll = (element: HTMLElement) => {
                const atTop = element.scrollTop <= 5;

                logoHeader.classList.toggle('no-shadow', atTop);
            };

            const onScroll = (event: Event) => {
                handleScroll(event.currentTarget as HTMLElement);
            };

            cardsHtml.addEventListener('scroll', onScroll);

            handleScroll(cardsHtml);

            return () => {
                cardsHtml.removeEventListener('scroll', onScroll);
            };
        };

    }, [isLoad, likesList.length]);

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    if(!likesList.length) return (
        <div className="empty">
            <img
                src={SvgLikesEmpty}
                alt="likes-empty"
                loading="lazy"
                decoding="async"
            />
            <h4 className="headline">Симпатий ещё нет</h4>
            <p className="text">
                Проявляйте активность, лайкайте других пользователей и вы встретите свой мэтч!
            </p>
        </div>
    )

    return (
        <div className="likes__ctx">
            <h4 className="headline">Симпатии</h4>
            <div className="cards" id='cards'>
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
