import { ALLOWED_VIDEO_TYPES, MAX_VIDEO_SIZE } from '@/constant/video'
import { errorAlert, successAlert, warningAlert } from '@/funcs/alert.funcs'
import { getPreviewVideo } from '@/funcs/img.funcs'
import type { RootDispatch } from '@/store'
import {
	psychAddVideoAsync,
	resetTargetPsychVideo,
	setTargetPsychVideo,
} from '@/store/slices/videosSlice'
import { ChangeEvent, JSX, useState } from 'react'
import { useDispatch } from 'react-redux'

import SvgAdd from '@/assets/icon/add.svg'
import SvgClose from '@/assets/icon/close.svg?react'
import BrochPatternDialog from '@/components/UI/BrochPatternDialog'
import CircularProgress from '@mui/material/CircularProgress'

const PsychAddVideoMainVideo = (): JSX.Element => {
	const [loadPreview, setLoadingPreview] = useState<boolean>(false)
	const [open, setOpen] = useState<boolean>(false)
	const [loadFetch, setLoadFetch] = useState<boolean>(false)
	const [thumbnail, setThumbnail] = useState<string | null>(null)
	const [progress, setProgress] = useState<number>(0)

	const dispatch = useDispatch<RootDispatch>()

	const clearMeta = (): void => {
		setLoadingPreview(false)
		setThumbnail(null)
		setLoadFetch(false)
		setProgress(0)
		dispatch(resetTargetPsychVideo())
	}

	const handleDelete = async (): Promise<void> => clearMeta()

	const fetchVideo = async (file: File | null): Promise<void> => {
		if (!file) {
			warningAlert(dispatch, 'Не удалось загрузить видео')
			clearMeta()
			return
		}

		setLoadFetch(true)

		const response = await dispatch(
			psychAddVideoAsync({ file, setProgress })
		).unwrap()

		if (!response || response === 'error') {
			warningAlert(dispatch, 'Не удалось сохранить видео! Попробуйте позже.')
			clearMeta()

			return
		} else {
			dispatch(setTargetPsychVideo({ preview: thumbnail || '' }))
		}

		setLoadFetch(false)
		successAlert(dispatch, 'Видео успешно загрузилось')
	}

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (loadPreview) return

		setLoadingPreview(true)

		const files = event.currentTarget.files

		if (!files || files.length === 0) {
			errorAlert(dispatch, 'Не удалось загрузить видео')
			setLoadingPreview(false)
			return
		}

		const file = files[0]

		if (file.size > MAX_VIDEO_SIZE) {
			warningAlert(
				dispatch,
				`Нельзя загрузить видео больше ${MAX_VIDEO_SIZE / 1024 / 1024}Мбайт!`
			)

			setLoadingPreview(false)
			return
		}

		if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
			warningAlert(
				dispatch,
				`Недопустимый формат видео! Разрешённые форматы: ${ALLOWED_VIDEO_TYPES.join(
					' '
				)}`
			)

			setLoadingPreview(false)
			return
		}

		getPreviewVideo(file, setThumbnail, setLoadingPreview, fetchVideo)

		event.target.value = ''
	}

	if (!thumbnail) {
		return (
			<>
				<input
					className='loader'
					type='file'
					accept='video/*'
					onChange={handleFileChange}
				/>
				<div className='loader-box'>
					<div className='loader-box__ctx'>
						{loadPreview ? (
							<CircularProgress />
						) : (
							<img src={SvgAdd} alt='camera' loading='lazy' decoding='async' />
						)}
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<div
				className='video-preview'
				style={{
					backgroundImage: `url(${thumbnail})`,
					backgroundColor: loadFetch ? '#00000080' : 'none',
				}}
			>
				{loadFetch ? (
					<CircularProgress variant='determinate' value={progress} />
				) : (
					<span className='delete' onClick={() => setOpen(true)}>
						<SvgClose />
					</span>
				)}
			</div>
			<BrochPatternDialog
				title='Вы уверены, что хотите удалить видео?'
				btnTxt='Удалить'
				open={open}
				btnFunc={handleDelete}
				setOpen={setOpen}
			/>
		</>
	)
}

export default PsychAddVideoMainVideo
