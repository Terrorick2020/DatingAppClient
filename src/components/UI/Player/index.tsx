import { JSX, useState, useMemo, useRef, useEffect } from 'react';

import MyPlayerPreview from './Preview';
import MyPlayerMain from './Main';
import MyPlayerError from './Error';


interface PropsMyPlayer {
    previewUrl: string
    videoUrl: string
    playing: boolean
    timeToStart: boolean
    setPlaying: (value: boolean) => void
}

export enum EMyPlayertxType {
    Preview = 'Preview',
    Player = 'Player',
    Error = 'Error',
}

const MyPlayer = (props: PropsMyPlayer): JSX.Element => {
    const [ctxType, setCtxType] = useState<EMyPlayertxType>(EMyPlayertxType.Preview);

    const isFirstly = useRef<boolean>(true);

    useEffect(() => {
        if(!isFirstly || !props.timeToStart) return;

        isFirstly.current = false;

        setTimeout(() => {
            if(ctxType !== EMyPlayertxType.Error)
                setCtxType(EMyPlayertxType.Player);
        }, 200);
    }, [props.timeToStart]);

    const CtxHTML = useMemo((): JSX.Element => {
        switch(ctxType) {
            case EMyPlayertxType.Preview:
                return <MyPlayerPreview imgUrl={props.previewUrl} />;

            case EMyPlayertxType.Error:
                return <MyPlayerError />;
            
            default:
                return <MyPlayerMain
                    videoUrl={props.videoUrl}
                    playing={props.playing}
                    setPlaying={props.setPlaying}
                    setCtxType={setCtxType}
                />;
        }
    }, [ctxType, props.playing]);

    return (
        <div className="my-player">
            <div className="my-player__box">
                { CtxHTML }
            </div>
        </div>
    )
};

export default MyPlayer;
