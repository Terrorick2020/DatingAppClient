import type { RootDispatch } from '@/store'
import { viewShortsAsync } from '@/store/slices/videosSlice'
import { type JSX, type ReactNode, useEffect, useRef, useState } from 'react'
import type { OnProgressProps } from 'react-player/base'
import { useDispatch } from 'react-redux'
import { EMyPlayertxType } from '.'

import ReactPlayer from 'react-player'
import MyPlayerNav from './Nav'

interface PropsMyPlayerMain {
	videoId: number
	videoUrl: string
	playing: boolean
	isViewed: boolean
	setPlaying: (value: boolean) => void
	setCtxType: (value: EMyPlayertxType) => void
	children?: ReactNode
}
const MyPlayerMain = (props: PropsMyPlayerMain): JSX.Element => {
	const [showBg, setShowBg] = useState<boolean>(false)
	const [isLoad, setIsLoad] = useState<boolean>(true)
	const [muted, setMuted] = useState<boolean>(true)
	const [duration, setDuration] = useState<number>(0)
	const [_, setBuffered] = useState<number>(0)
	const [currentTime, setCurrentTime] = useState<number>(0)

	const playerRef = useRef<ReactPlayer | null>(null)
	const isWaiting = useRef<boolean>(false)
	const isError = useRef<boolean>(false)

	const dispatch = useDispatch<RootDispatch>()

	const handleToggleBg = (): void => {
		setShowBg(prevent => !prevent)
	}

	const handleReady = (): void => {
		setIsLoad(false)
		setMuted(false)
	}
	const handleDuration = (duration: number): void => setDuration(duration)

	const handleProgress = (state: OnProgressProps): void => {
		if (isError.current) return

		setBuffered(state.loadedSeconds)

		if (!props.playing) return

		setCurrentTime(state.playedSeconds)

		if (!isWaiting.current) return

		const delta = state.loadedSeconds - state.playedSeconds

		if (delta > 4) {
			setIsLoad(false)
			props.setPlaying(true)
			isWaiting.current = false
		}
	}

	const handleBuffer = (): void => {
		setIsLoad(true)
		props.setPlaying(false)
	}

	const handleWaiting = (): void => {
		setIsLoad(true)
		props.setPlaying(false)
		isWaiting.current = true
	}

	const handleBufferEnd = (): void => {
		setIsLoad(false)
		props.setPlaying(true)
	}

	const handleEnded = (): void => {
		if (playerRef.current) {
			playerRef.current.seekTo(0, 'seconds')
		}

		props.setPlaying(true)
	}

	const handleError = (
		error: any,
		_data?: any,
		_hlsInstance?: any,
		_hlsGlobal?: any
	): void => {
		if (error instanceof Event) {
			const videoError = (error.target as HTMLVideoElement).error

			if (
				videoError &&
				(videoError.code === videoError.MEDIA_ERR_SRC_NOT_SUPPORTED ||
					videoError.code === videoError.MEDIA_ERR_DECODE)
			) {
				isError.current = true
				props.setCtxType(EMyPlayertxType.Error)
			}
		}
	}

	const setSeek = (seconds: number): void => {
		if (playerRef.current) {
			const newTime = currentTime + seconds
			const clampedTime = Math.min(Math.max(newTime, 0), duration)
			playerRef.current.seekTo(clampedTime, 'seconds')
			setCurrentTime(clampedTime)
		}

		props.setPlaying(true)
	}

	useEffect(() => {
		if (!props.playing || props.isViewed || currentTime < 2) return

		dispatch(viewShortsAsync(props.videoId))
	}, [currentTime])

	return (
		<div className='my-player-main' tabIndex={0} onClick={handleToggleBg}>
			<ReactPlayer
				className='my-player-main__video'
				width='100%'
				height='100%'
				url={props.videoUrl}
				ref={playerRef}
				controls={false}
				muted={muted}
				playing={props.playing}
				onReady={handleReady}
				onDuration={handleDuration}
				onProgress={handleProgress}
				onBuffer={handleBuffer}
				onBufferEnd={handleBufferEnd}
				onWaiting={handleWaiting}
				onEnded={handleEnded}
				onError={handleError}
			/>
			<MyPlayerNav
				isLoad={isLoad}
				playing={props.playing}
				addClass={showBg || isLoad ? 'show' : 'hide'}
				setPlaying={props.setPlaying}
				setSeek={setSeek}
				setShowBg={setShowBg}
			/>
			{props.children}
		</div>
	)
}

export default MyPlayerMain
