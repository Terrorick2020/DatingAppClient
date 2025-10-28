import {
	addToHomeScreen,
	backButton,
	checkHomeScreenStatus,
	closingBehavior,
	cloudStorage,
	init,
	initData,
	isTMA,
	onAddedToHomeScreen,
	onAddToHomeScreenFailed,
	swipeBehavior,
	viewport,
} from '@telegram-apps/sdk'

import {
	EHomeScreenStatus,
	EStatusSetHomeScreen,
	ETgCloudeStore,
	type GetParamsRes,
	type InitHomeScreenRes,
} from '@/types/tg.types'

import { EProfileRoles } from '@/types/store.types'
import { delay } from './general.funcs'

export let statusSetHomeScreen: EStatusSetHomeScreen =
	EStatusSetHomeScreen.Error

export const setStatusSetHomeScreen = (value: EStatusSetHomeScreen) => {
	statusSetHomeScreen = value
}

async function isCloudStorageAvailable(
	retries = 5,
	timeout = 500
): Promise<boolean> {
	let attempts = 0
	while (attempts < retries) {
		const available =
			cloudStorage.isSupported() &&
			cloudStorage.getItem.isAvailable() &&
			cloudStorage.setItem.isAvailable() &&
			cloudStorage.deleteItem.isAvailable()

		if (available) return true

		await delay(timeout)
		attempts++
	}
	return false
}

export const tgCloudStore = {
	async set<T = any>(key: ETgCloudeStore, value: T): Promise<boolean> {
		const available = await isCloudStorageAvailable()
		if (!available) return false

		try {
			const stringified = JSON.stringify(value)
			await cloudStorage.setItem(key, stringified)
			return true
		} catch {
			return false
		}
	},

	async get<T = any>(key: ETgCloudeStore): Promise<T | null> {
		const available = await isCloudStorageAvailable()
		if (!available) return null

		try {
			const raw = await cloudStorage.getItem(key)
			return raw ? (JSON.parse(raw) as T) : null
		} catch {
			return null
		}
	},

	async delete(key: ETgCloudeStore): Promise<boolean> {
		const available = await isCloudStorageAvailable()
		if (!available) return false

		try {
			await cloudStorage.deleteItem(key)
			return true
		} catch {
			return false
		}
	},
}

export async function initTg(): Promise<void> {
	if (!(await isTMA())) return

	try {
		await init()
	} catch {}

	initData.restore()

	if (closingBehavior.mount.isAvailable()) {
		closingBehavior.mount()
	}

	if (closingBehavior.enableConfirmation.isAvailable()) {
		closingBehavior.enableConfirmation()
	}

	if (viewport.mount.isAvailable()) {
		const mountPromise = viewport.mount({ timeout: 3000 })

		await mountPromise.catch(() => {})
	}

	if (viewport.requestFullscreen.isAvailable()) {
		await viewport.requestFullscreen()
	}

	if (swipeBehavior.mount.isAvailable()) {
		await swipeBehavior.mount()

		if (swipeBehavior.isMounted()) {
			swipeBehavior.disableVertical()
			swipeBehavior.isVerticalEnabled()
		}
	}
}

export function getTgID(): string | null {
	const user = initData.user()

	if (!user) return null

	return '' + user.id
}

export async function getRefParams(): Promise<GetParamsRes | null> {
	try {
		console.log('🔍 === НАЧАЛО ОБРАБОТКИ ПАРАМЕТРОВ ===')
		console.log('🔍 window.location.href:', window.location.href)
		console.log('🔍 window.location.search:', window.location.search)

		const isTg = await isTMA()
		console.log('🔍 isTMA():', isTg)

		let param: string | null | undefined = null

		if (isTg) {
			param = initData.startParam()
			console.log('🔍 Telegram startParam:', param)

			// Если startParam пустой, пробуем получить из URL (для отладки)
			if (!param) {
				const urlParams = new URLSearchParams(window.location.search)
				param = urlParams.get('startapp')
				console.log('🔍 URL startapp param (fallback):', param)
			}
		} else {
			const urlParams = new URLSearchParams(window.location.search)
			param = urlParams.get('startapp')
			console.log('🔍 Browser startapp param:', param)
		}

		if (!param || param === undefined) {
			console.log('🔍 Нет параметра startapp')
			console.log('🔍 === КОНЕЦ ОБРАБОТКИ ПАРАМЕТРОВ (НЕТ ПАРАМЕТРА) ===')
			return null
		}

		console.log('🔍 Исходный параметр:', param)

		const decodedString = atob(decodeURIComponent(param))
		console.log('🔍 Декодированная строка:', decodedString)

		const searchParams = new URLSearchParams(decodedString)
		console.log('🔍 Параметры поиска:', Object.fromEntries(searchParams))

		const encodedCode = searchParams.get('code')
		const encodedType = searchParams.get('type')

		console.log('🔍 encodedCode:', encodedCode)
		console.log('🔍 encodedType:', encodedType)

		if (!encodedCode || !encodedType) {
			console.log('🔍 Отсутствуют обязательные параметры')
			return null
		}

		const typeValue = atob(decodeURIComponent(encodedType))
		console.log('🔍 Декодированный тип:', typeValue)

		const isValidType = Object.values(EProfileRoles).includes(
			typeValue as EProfileRoles
		)
		console.log('🔍 Валидный тип:', isValidType)

		if (!isValidType || typeValue === EProfileRoles.Admin) {
			console.log('🔍 Невалидный тип или админ')
			return null
		}

		const finalCode = atob(decodeURIComponent(encodedCode))
		console.log('🔍 Финальный код:', finalCode)

		const result = {
			code: finalCode,
			type: typeValue as EProfileRoles,
		}

		console.log('🔍 === УСПЕШНО ОБРАБОТАНЫ ПАРАМЕТРЫ ===')
		console.log('🔍 Результат:', result)

		return result
	} catch (error) {
		console.error('🔍 === ОШИБКА ПРИ ОБРАБОТКЕ ПАРАМЕТРОВ ===')
		console.error('🔍 Ошибка:', error)
		return null
	}
}

async function checkInstallHomeScreen(): Promise<InitHomeScreenRes> {
	if (!checkHomeScreenStatus.isAvailable()) return null

	try {
		const status = (await checkHomeScreenStatus()) as EHomeScreenStatus
		return status
	} catch {
		return 'error'
	}
}

async function toOfferHomeScreen(): Promise<void> {
	if (addToHomeScreen.isAvailable()) {
		addToHomeScreen()

		const handleSuccess = () => {
			setStatusSetHomeScreen(EStatusSetHomeScreen.Success)
		}

		onAddedToHomeScreen(handleSuccess)

		const handleFailed = () => {
			setStatusSetHomeScreen(EStatusSetHomeScreen.Error)
		}

		onAddToHomeScreenFailed(handleFailed)
	}
}

export async function setHomeScreen(): Promise<void> {
	const countRes =
		(await tgCloudStore.get<number>(ETgCloudeStore.NumRejSetHomeScreen)) || 0

	if (countRes && countRes > 3) return

	const response = await checkInstallHomeScreen()

	if (
		!response ||
		response === 'error' ||
		[EHomeScreenStatus.Added, EHomeScreenStatus.Unknown].includes(response)
	)
		return

	await toOfferHomeScreen()

	setTimeout(() => {
		if ((statusSetHomeScreen = EStatusSetHomeScreen.Error)) {
			tgCloudStore.set<number>(ETgCloudeStore.NumRejSetHomeScreen, countRes + 1)
		}
	}, 5000)
}

export function isTgMobile(): boolean {
	const userAgent = navigator.userAgent.toLowerCase()
	const predDesktop =
		userAgent.includes('windows') ||
		userAgent.includes('macintosh') ||
		userAgent.includes('win')
	const predMobile =
		userAgent.includes('iphone') || userAgent.includes('android')

	const isDesktop = !predMobile || predDesktop
	const isTgMobile =
		!!closingBehavior.mount.isAvailable() &&
		!!backButton.mount.isAvailable() &&
		predMobile &&
		!isDesktop

	return isTgMobile
}
