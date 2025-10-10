import {
    JSX,
    useRef,
    useState,
} from 'react';

import { useDispatch } from 'react-redux';
import { toPsychAddVideo } from '@/config/routes.config';
import { useNavigate, useLocation } from 'react-router-dom';
import { addRoute } from '@/store/slices/settingsSlice';
import { PSYCH_VIDEO_ADD_MARK } from '@/constant/quest';
import { URL_MARK } from '@/config/env.config';
import { infoAlert } from '@/funcs/alert.funcs';
import type { RootDispatch } from '@/store';

import SvgVideoAdd from '@/assets/icon/video-add.svg';

const LONG_PRESS_DELAY = 500;
const SHORT_VIBRO_DELAY = 200;

interface VideoAddPos {
    x: number;
    y: number;
}

const VideoAddBtn = (): JSX.Element => {
    const btnRef = useRef<HTMLDivElement>(null);
    const cursorPos = useRef<VideoAddPos | null>(null);
    const longPressTimer = useRef<NodeJS.Timeout | null>(null);
    const longPressActive = useRef(false);

    const [dragging, setDragging] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [vibro, setVibro] = useState(false);
    const [pos, setPos] = useState<VideoAddPos>({ x: 0, y: 0 });

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const startDrag = (event: React.PointerEvent) => {
        setPressed(true);
        cursorPos.current = { x: event.clientX, y: event.clientY };

        const cancelDrag = () => {
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }
            window.removeEventListener('pointermove', cancelDrag);
            setPressed(false);
        };

        longPressTimer.current = setTimeout(() => {
            longPressActive.current = true;
            setDragging(true);

            const inform = () => infoAlert(
                dispatch,
                'Можете перетаскивать кнопку по экрану',
            );

            try {
                navigator.vibrate
                    ? navigator.vibrate(SHORT_VIBRO_DELAY)
                    : inform();
            } catch {
                inform();
            }

            window.addEventListener('pointermove', handleMove);
            window.addEventListener('pointerup', stopDrag);

            setVibro(true);
            setTimeout(() => setVibro(false), SHORT_VIBRO_DELAY);
        }, LONG_PRESS_DELAY);

        window.addEventListener('pointermove', cancelDrag);
    };

    const handleEnd = (_: React.PointerEvent) => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }

        if (!longPressActive.current) {
            dispatch(addRoute(location.pathname));
            navigate(toPsychAddVideo.replace(`:${URL_MARK}`, PSYCH_VIDEO_ADD_MARK));
        }

        longPressActive.current = false;
        setPressed(false);
    };

    const handleMove = (event: PointerEvent) => {
        if (!cursorPos.current || !longPressActive.current) return;

        const pos = { x: event.clientX, y: event.clientY };

        const offsetX = pos.x - cursorPos.current.x;
        const offsetY = pos.y - cursorPos.current.y;

        setPos(prev => ({
            x: prev.x + offsetX,
            y: prev.y + offsetY,
        }));

        cursorPos.current = pos;
    };

    const stopDrag = (_: PointerEvent) => {
        setDragging(false);
        cursorPos.current = null;

        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', stopDrag);
    };

    return (
        <div
            className="add"
            title="Удерживайте, чтобы передвигать"
            ref={btnRef}
            style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${pressed ? 0.95 : 1})`,
                transition: dragging ? "none" : "transform 0.1s",
            }}
            onPointerDown={startDrag}
            onPointerUp={handleEnd}
        >
            <div className={`icon ${vibro ? 'vibrating' : ''}`}>
                <img
                    src={SvgVideoAdd}
                    alt="map-pin"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </div>
    );
};

export default VideoAddBtn;
