import type {
	EveningPlans,
	EveningPlansItem,
	EveningPlansMeta,
	InitUsetResult,
	PhotoItem,
	ProfileSelf,
	ProfileSelfGeo,
	ProfileState,
	SavePhotoAsyncThuncData,
	SendGeoData,
} from '@/types/profile.types'

import type {
	FetchGeoRes,
	FetchResponse,
	FetchSavePhotoRes,
	GetSelfEndpointRes,
	RegEndpointRes,
	SelfPsychRes,
	UserSelfPsychRes,
	ValidetePsychCodeRes,
} from '@/types/fetch.type'

import {
	CHATS_ASSIGN_PSYCH_ENDPOINT,
	CHATS_CRT_WITH_PSYC_ENDPOINT,
	DELETE_PHOTO,
	INITIAL_ENDPOINT,
	LOG_ENDPOINT,
	PLANS_GET_ENDPOINT,
	PLANS_SET_ENDPOINT,
	PSYCH_BY_MARK_ENDPOINT,
	PSYCH_DEL_PHOTO_ENDPOINT,
	PSYCH_ENDPOINT,
	PSYCH_INITIAL_ENDPOINT,
	PSYCH_UPL_PHOTO_ENDPOINT,
	PSYCH_VALID_TOKEN_ENDPOINT,
	REFERAL_LINK,
	REG_ENDPOINT,
	SET_GEO_ENDPOINT,
	UPLOAD_PHOTO,
	USER_ENDPOINT,
	USER_SELF_DELETE_ENDPOINT,
} from '@/config/env.config'

import {
	ELineStatus,
	EProfileRoles,
	EProfileStatus,
	ESex,
	type AsyncThunkRes,
	type IState,
} from '@/types/store.types'

import {
	addPhotoInCashe,
	delPhotoInCashe,
	resetPhotosCashe,
	setApiRes,
	setIsFirstly,
	setLoad,
} from './settingsSlice'

import { getRefParams, getTgID } from '@/funcs/tg.funcs'
import { KeyFQBtnText } from '@/types/register.typs'
import { EApiStatus } from '@/types/settings.type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AxiosProgressEvent, AxiosResponse } from 'axios'

import api, { setCapTok, setTgId } from '@/config/fetch.config'

const initialState: ProfileState = {
	info: {
		id: '',
		photos: [],
		enableGeo: false,
		latitude: null,
		longitude: null,
		lineStat: ELineStatus.Online,
		role: EProfileRoles.User,
		status: EProfileStatus.Noob,
		name: '',
		age: null,
		town: '',
		sex: ESex.Male,
		bio: '',
		interest: '',
		selSex: ESex.All,
		referralCode: '',
	},
	addLink: '',
	eveningPlans: {
		isCurrent: false,
		remains: null,
		plan: {
			value: '',
			description: '',
		},
		location: {
			value: '',
			description: '',
		},
	},
	selPsych: null,
}

export const initProfileAsync = createAsyncThunk(
	'profile/init-profile',
	async (_, { getState, dispatch }): Promise<AsyncThunkRes<InitUsetResult>> => {
		try {
			const telegramId = getTgID()

			if (!telegramId) return 'error'

			setTgId(telegramId)

			const params = await getRefParams()

			let profileRole: EProfileRoles = EProfileRoles.User

			if (params) {
				profileRole = params.type
				dispatch(setFromRefCode(params.code))
			}

			const data = { telegramId }

			type TInit = AxiosResponse<FetchResponse<any>>
			type TEPSInit = AxiosResponse<FetchResponse<EProfileStatus>>
			let profileStatus: EProfileStatus = EProfileStatus.Noob
			let resResult: boolean = false

			const validResResult = (res: TInit): boolean =>
				!res ||
				![200, 201].includes(res.status) ||
				!res.data.success ||
				!res.data.data ||
				res.data.data === 'None'

			switch (profileRole) {
				case EProfileRoles.User:
					const [userRes, psychRes]: [TEPSInit, AsyncThunkRes<ProfileSelf>] =
						await Promise.all([
							api.post(INITIAL_ENDPOINT, data),
							dispatch(getSelfPsychProfile(telegramId)).unwrap(),
						])

					resResult = validResResult(userRes)

					if (!resResult) {
						profileStatus = userRes.data.data as EProfileStatus
						break
					}

					resResult = !psychRes || psychRes === 'error'

					if (!resResult && psychRes && psychRes !== 'error') {
						profileRole = EProfileRoles.Psych
						profileStatus = psychRes.status
					}

					break
				case EProfileRoles.Psych:
					if (!params || !params.code) return 'error'

					const validData = { code: params.code }

					const [endPsychRes, codePsychRes]: [
						AsyncThunkRes<ProfileSelf>,
						AxiosResponse<FetchResponse<ValidetePsychCodeRes>>
					] = await Promise.all([
						dispatch(getSelfPsychProfile()).unwrap(),
						api.post(PSYCH_VALID_TOKEN_ENDPOINT, validData),
					])

					resResult = !endPsychRes || endPsychRes === 'error'

					if (!resResult && endPsychRes && endPsychRes !== 'error') {
						profileStatus = endPsychRes.status
						break
					}

					resResult = validResResult(codePsychRes)

					if (
						resResult ||
						(codePsychRes.data.data !== 'None' &&
							!codePsychRes.data.data?.isValid)
					) {
						profileRole = EProfileRoles.User
						let msg: string = ''

						if (codePsychRes.data.data !== 'None') {
							msg = codePsychRes.data.data?.message || codePsychRes.data.message
						} else {
							msg = 'Ссылка регистрции специолиста недействительна'
						}

						dispatch(
							setApiRes({
								value: true,
								msg,
								status: EApiStatus.Warning,
								timestamp: Date.now(),
							})
						)
					} else {
						resResult = true
					}

					break
			}

			let selPsych: string | null = null

			if (profileRole !== EProfileRoles.Psych) {
				const psychUrl = CHATS_ASSIGN_PSYCH_ENDPOINT(telegramId)

				const psychRes: AxiosResponse<FetchResponse<UserSelfPsychRes>> =
					await api.get(psychUrl)

				const psychResult = validResResult(psychRes)

				if (
					!psychResult &&
					psychRes.data.data &&
					psychRes.data.data !== 'None'
				) {
					selPsych = (psychRes.data.data as UserSelfPsychRes).psychologistId
				}
			}

			const rootState = getState() as IState
			const profileInfo = rootState.profile.info

			dispatch(
				setInfo({
					...profileInfo,
					id: telegramId,
					role: profileRole,
					status: profileStatus,
				})
			)

			if (resResult) {
				dispatch(setIsFirstly(true))

				return null
			}

			dispatch(setIsFirstly(false))

			return {
				status: profileStatus,
				psych: selPsych,
			}
		} catch (error) {
			dispatch(setIsFirstly(true))

			return 'error'
		}
	}
)

export const sendSelfGeoAsync = createAsyncThunk(
	'profile/send-self-geo',
	async (
		data: SendGeoData,
		{ dispatch }
	): Promise<AsyncThunkRes<FetchGeoRes>> => {
		try {
			const response: AxiosResponse<FetchResponse<FetchGeoRes>> =
				await api.post(SET_GEO_ENDPOINT, data)

			if (
				response.status === 201 &&
				response.data.data &&
				response.data.data !== 'None' &&
				response.data.success
			) {
				dispatch(
					setGeoCoords({
						latitude: data.latitude,
						longitude: data.longitude,
					})
				)

				return response.data.data
			}

			return null
		} catch {
			return 'error'
		}
	}
)

export const saveSelfPhotoAsync = createAsyncThunk(
	'profile/save-self-photo',
	async (
		data: SavePhotoAsyncThuncData,
		{ dispatch, getState }
	): Promise<AsyncThunkRes<PhotoItem>> => {
		try {
			const rootState = getState() as IState
			const telegramId = rootState.profile.info.id
			const profileRole = rootState.profile.info.role

			const formData = new FormData()
			formData.append('photo', data.photo)
			formData.append('telegramId', telegramId)

			const url =
				profileRole === EProfileRoles.Psych
					? PSYCH_UPL_PHOTO_ENDPOINT
					: UPLOAD_PHOTO

			const response: AxiosResponse<FetchResponse<FetchSavePhotoRes>> =
				await api.post(url, formData, {
					onUploadProgress: (progressEvent: AxiosProgressEvent) => {
						if (progressEvent.total) {
							const percent = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							)
							data.setUploadProgress(percent)
						}
					},
				})

			if (
				response.status === 201 &&
				response.data.data &&
				response.data.data !== 'None' &&
				response.data.success
			) {
				const photoUrl = URL.createObjectURL(data.photo)
				const id = String(response.data.data.photoId)

				dispatch(addPhotoInCashe(id))

				return {
					id,
					photo: photoUrl,
				} as PhotoItem
			}

			return null
		} catch (error) {
			return 'error'
		}
	}
)

export const deleteSelfPhotoAsync = createAsyncThunk(
	'profile/delete-self-photo',
	async (
		id: string,
		{ dispatch, getState }
	): Promise<AsyncThunkRes<string>> => {
		try {
			const rootState = getState() as IState
			const profileRole = rootState.profile.info.role

			if (rootState.settings.photosCashe.includes(id)) {
				dispatch(delPhotoInCashe(id))

				return id
			}

			if (rootState.profile.info.photos.length === 1) {
				return id
			}

			const telegramId = rootState.profile.info.id

			const data = {
				telegramId,
				photoId: id,
			}

			const url =
				profileRole === EProfileRoles.Psych
					? PSYCH_DEL_PHOTO_ENDPOINT
					: DELETE_PHOTO

			const response: AxiosResponse<FetchResponse<null>> = await api.post(
				url,
				data
			)

			if (response.status === 200 && response.data.success) {
				dispatch(
					setApiRes({
						value: true,
						msg: 'Фотография успешно удалена! Не забудьте сохранить изменения',
						status: EApiStatus.Success,
						timestamp: Date.now(),
					})
				)

				return id
			}

			dispatch(
				setApiRes({
					value: true,
					msg: 'Нельзя удалить последнюю сохранённую фотографию',
					status: EApiStatus.Warning,
					timestamp: Date.now(),
				})
			)

			return null
		} catch (error) {
			dispatch(
				setApiRes({
					value: true,
					msg: 'Ошибка удаления фотограяии',
					status: EApiStatus.Error,
					timestamp: Date.now(),
				})
			)

			return 'error'
		}
	}
)

export const signUpProfileAsync = createAsyncThunk(
	'profile/sign-up-profile',
	async (
		mark: KeyFQBtnText,
		{ getState, dispatch }
	): Promise<AsyncThunkRes<'success'>> => {
		try {
			const rootState = getState() as IState
			const profileInfo = rootState.profile.info
			const lang = rootState.settings.lang
			const captchaToken = rootState.settings.captchaToken

			setCapTok(captchaToken)

			const interestsVars = rootState.settings.interestsVars

			const interestId = interestsVars.find(
				item => item.value === profileInfo.interest
			)?.id

			if (interestId === undefined) return null

			const needRefCode =
				mark === KeyFQBtnText.First &&
				!!profileInfo.fromRefCode &&
				profileInfo.fromRefCode !== undefined

			const data = {
				telegramId: profileInfo.id,
				name: profileInfo.name.trim(),
				town: profileInfo.town,
				sex: profileInfo.sex,
				selSex: profileInfo.selSex,
				bio: profileInfo.bio,
				age: profileInfo.age,
				enableGeo: profileInfo.enableGeo,
				...(profileInfo.enableGeo && {
					latitude: profileInfo.latitude,
					longitude: profileInfo.longitude,
				}),
				...(needRefCode && {
					invitedByReferralCode: profileInfo.fromRefCode,
				}),
				lang,
				photoIds: profileInfo.photos.map(item => +item.id),
				interestId,
			}

			let response: any = null
			let msg: string = ''

			switch (mark) {
				case KeyFQBtnText.First:
					response = (await api.post(REG_ENDPOINT, data)) as AxiosResponse<
						FetchResponse<RegEndpointRes>
					>
					msg = 'Регистрация пользователя прошла успешно'
					break
				case KeyFQBtnText.Other:
					response = (await api.patch(
						`${USER_ENDPOINT}/${profileInfo.id}`,
						data
					)) as AxiosResponse<FetchResponse<null>>
					msg = 'Профиль обновлён успешно'
					break
			}

			if (
				!response ||
				![200, 201].includes(response.status) ||
				!response.data.success
			) {
				dispatch(
					setApiRes({
						value: true,
						msg: 'Данные не сохранились',
						status: EApiStatus.Warning,
						timestamp: Date.now(),
					})
				)

				return null
			}

			dispatch(
				setApiRes({
					value: true,
					msg,
					status: EApiStatus.Success,
					timestamp: Date.now(),
				})
			)

			if (mark === KeyFQBtnText.First) {
				const referralCode = response.data.data.user.referralCode

				!!referralCode &&
					dispatch(setAddLink(REFERAL_LINK(referralCode, EProfileRoles.User)))
			}

			dispatch(setIsFirstly(false))
			dispatch(resetPhotosCashe())

			return 'success'
		} catch (error: any) {
			let msg = 'Произошла ошибка сервера'

			if (error.name === 'AxiosError') {
				if (
					error.status === 403 &&
					error.response.data.message.error === 'CAPTCHA_VALIDATION_FAILED'
				) {
					setInfoStatus(EProfileStatus.Blocked)
					msg = 'Есть подозрения, что ваш аккаунт используется ботом'
				} else if (error.status === 429) {
					msg = 'Превышен лимит попыток регистрации, попробуйте позже'
				}
			}

			dispatch(
				setApiRes({
					value: true,
					msg,
					status: EApiStatus.Error,
					timestamp: Date.now(),
				})
			)

			return 'error'
		} finally {
			setCapTok(null)
		}
	}
)

export const signUpPsychAsync = createAsyncThunk(
	'profile/sign-up-psych',
	async (
		mark: KeyFQBtnText,
		{ getState, dispatch }
	): Promise<AsyncThunkRes<'success'>> => {
		try {
			const rootState = getState() as IState
			const profileInfo = rootState.profile.info
			const captchaToken = rootState.settings.captchaToken

			setCapTok(captchaToken)

			const photoIds = rootState.profile.info.photos.map(item => +item.id)

			const data = {
				...(mark === KeyFQBtnText.First && {
					telegramId: profileInfo.id,
				}),
				name: profileInfo.name,
				about: profileInfo.bio,
				photoIds,
			}

			let response: any = null
			let msg: string = ''

			switch (mark) {
				case KeyFQBtnText.First:
					response = (await api.post(PSYCH_ENDPOINT, data)) as AxiosResponse<
						FetchResponse<any>
					>
					msg = 'Регистрация прошла успешно'
					break
				case KeyFQBtnText.Other:
					const url = PSYCH_BY_MARK_ENDPOINT(profileInfo.id)
					response = (await api.put(url, data)) as AxiosResponse<
						FetchResponse<any>
					>
					msg = 'Профиль обновлён успешно'
					break
			}

			if (
				!response ||
				![200, 201].includes(response.status) ||
				!response.data.success
			) {
				dispatch(
					setApiRes({
						value: true,
						msg: 'Данные не сохранились',
						status: EApiStatus.Warning,
						timestamp: Date.now(),
					})
				)

				return null
			}

			dispatch(
				setApiRes({
					value: true,
					msg,
					status: EApiStatus.Success,
					timestamp: Date.now(),
				})
			)

			return 'success'
		} catch (error: any) {
			let msg = 'Произошла ошибка сервера'

			if (error.name === 'AxiosError') {
				if (
					error.status === 403 &&
					error.response.data.message.error === 'CAPTCHA_VALIDATION_FAILED'
				) {
					setInfoStatus(EProfileStatus.Blocked)
					msg = 'Есть подозрения, что ваш аккаунт используется ботом'
				} else if (error.status === 429) {
					msg = 'Превышен лимит попыток регистрации, попробуйте позже'
				}
			}

			dispatch(
				setApiRes({
					value: true,
					msg,
					status: EApiStatus.Error,
					timestamp: Date.now(),
				})
			)

			return 'error'
		} finally {
			setCapTok(null)
		}
	}
)

export const getSelfProfile = createAsyncThunk(
	'profile/get-self-profile',
	async (_, { getState, dispatch }): Promise<AsyncThunkRes<ProfileSelf>> => {
		const rootState = getState() as IState
		const isLoad = rootState.settings.load

		let needSetLoad = !isLoad

		try {
			if (needSetLoad) dispatch(setLoad(true))

			const telegramId = rootState.profile.info.id

			const data = { telegramId }

			const response: AxiosResponse<FetchResponse<GetSelfEndpointRes>> =
				await api.post(LOG_ENDPOINT, data)

			if (
				response.status === 200 &&
				response.data.data &&
				response.data.data !== 'None' &&
				response.data.success
			) {
				const referralCode = response.data.data.referralCode

				const data: ProfileSelf = {
					id: telegramId,
					photos: response.data.data.photos.map((item: any) => ({
						id: item.id,
						photo: item.url,
					})),
					enableGeo: response.data.data.enableGeo,
					latitude: response.data.data.latitude || null,
					longitude: response.data.data.longitude || null,
					lineStat: ELineStatus.Online,
					role: response.data.data.role,
					status: response.data.data.status,
					name: response.data.data.name,
					age: response.data.data.age,
					town: response.data.data.town,
					sex: response.data.data.sex,
					bio: response.data.data.bio,
					interest: response.data.data.interest.value,
					selSex: response.data.data.selSex,
					referralCode: referralCode ? referralCode : '',
				}

				referralCode &&
					dispatch(setAddLink(REFERAL_LINK(referralCode, EProfileRoles.User)))

				return data
			}

			return null
		} catch (error) {
			return 'error'
		} finally {
			if (needSetLoad) dispatch(setLoad(false))
		}
	}
)

export const getSelfPsychProfile = createAsyncThunk(
	'profile/get-self-psych-profile',
	async (
		tgId: string | undefined,
		{ getState }
	): Promise<AsyncThunkRes<ProfileSelf>> => {
		try {
			const rootState = getState() as IState
			const telegramId = rootState.profile.info.id || tgId

			if (!telegramId) return null

			const data = { telegramId }

			const response: AxiosResponse<FetchResponse<SelfPsychRes>> =
				await api.post(PSYCH_INITIAL_ENDPOINT, data)

			if (
				response.status !== 201 ||
				!response.data.success ||
				!response.data.data ||
				response.data.data === 'None'
			)
				return null

			const resData = response.data.data
			const photos = resData.photos.map(item => ({
				id: '' + item.id,
				photo: item.url,
			}))

			const result: ProfileSelf = {
				...rootState.profile.info,
				name: resData.name,
				bio: resData.about,
				id: resData.telegramId,
				photos,
			}

			return result
		} catch {
			return 'error'
		}
	}
)

export const getSelfPlansAsync = createAsyncThunk(
	'profile/get-self-plans',
	async (_, { getState }): Promise<AsyncThunkRes<EveningPlans>> => {
		try {
			const rootState = getState() as IState
			const telegramId = rootState.profile.info.id

			const response: AxiosResponse<FetchResponse<EveningPlans>> =
				await api.get(`${PLANS_GET_ENDPOINT}/${telegramId}`)

			if (
				response.status === 200 &&
				response.data.data &&
				response.data.data !== 'None' &&
				response.data.success
			)
				return response.data.data

			return null
		} catch (error) {
			return 'error'
		}
	}
)

export const saveSelfPlansAsync = createAsyncThunk(
	'profile/save-self-plans',
	async (_, { getState }): Promise<AsyncThunkRes<EveningPlans>> => {
		try {
			const rootState = getState() as IState
			const eveningPlans = rootState.profile.eveningPlans
			const telegramId = rootState.profile.info.id

			const targetPlans = rootState.settings.plansVars.find(
				item => item.value === eveningPlans.plan.value
			)

			const targetDistrict = rootState.settings.districtsVars.find(
				item => item.value === eveningPlans.location.value
			)

			if (!targetPlans?.id || !targetDistrict?.id) {
				return 'error'
			}

			const data = {
				telegramId,
				planId: targetPlans.id,
				planDescription: eveningPlans.plan.description,
				regionId: targetDistrict.id,
				regionnDescription: eveningPlans.location.description,
			}

			const response: AxiosResponse<FetchResponse<EveningPlans>> =
				await api.post(PLANS_SET_ENDPOINT, data)

			if (
				response.status === 201 &&
				response.data.data &&
				response.data.data !== 'None' &&
				response.data.success
			)
				return response.data.data

			return null
		} catch (error) {
			return 'error'
		}
	}
)

export const selectSelfPsychAsync = createAsyncThunk(
	'profile/select-self-psych',
	async (id: string, { getState }): Promise<AsyncThunkRes<string>> => {
		try {
			const rootState = getState() as IState
			const telegramId = rootState.profile.info.id

			const data = {
				telegramId: telegramId,
				psychologistId: id,
			}

			const response: AxiosResponse<FetchResponse<any>> = await api.post(
				CHATS_CRT_WITH_PSYC_ENDPOINT,
				data
			)

			if (
				response.status !== 201 ||
				!response.data.success ||
				!response.data.data ||
				response.data.data === 'None'
			)
				return null

			return id
		} catch (error) {
			return 'error'
		}
	}
)

export const deleteSelfAsync = createAsyncThunk(
	'profile/delete-self',
	async (_, { getState }): Promise<AsyncThunkRes<'success'>> => {
		try {
			const rootState = getState() as IState
			const telegramId = rootState.profile.info.id
			const profileRole = rootState.profile.info.role

			let data = null

			const url =
				profileRole === EProfileRoles.User
					? USER_SELF_DELETE_ENDPOINT(telegramId)
					: PSYCH_ENDPOINT

			if (profileRole === EProfileRoles.Psych) {
				data = { telegramId }
			}

			const response: AxiosResponse<FetchResponse<any>> = await api.delete(
				url,
				{ data }
			)

			if (response.status !== 200 || !response.data.success) return null

			if (
				response.status !== 200 ||
				!response.data.success ||
				!response.data.data ||
				response.data.data === 'None'
			)
				return null

			return 'success'
		} catch (error) {
			return 'error'
		}
	}
)

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setInfo: (state, action: PayloadAction<ProfileSelf>): void => {
			state.info = action.payload
		},
		setInfoStatus: (state, action: PayloadAction<EProfileStatus>): void => {
			state.info.status = action.payload
		},
		setGeoCoords: (state, action: PayloadAction<ProfileSelfGeo>): void => {
			state.info.latitude = action.payload.latitude
			state.info.longitude = action.payload.longitude
		},
		setPlan: (state, action: PayloadAction<EveningPlansItem>): void => {
			state.eveningPlans.plan = action.payload
		},
		setPlanMeta: (state, action: PayloadAction<EveningPlansMeta>): void => {
			state.eveningPlans.isCurrent = action.payload.isCurrent
			state.eveningPlans.remains = action.payload.remains
		},
		setLocation: (state, action: PayloadAction<EveningPlansItem>): void => {
			state.eveningPlans.location = action.payload
		},
		setAddLink: (state, action: PayloadAction<string>): void => {
			state.addLink = action.payload
		},
		setFromRefCode: (state, action: PayloadAction<string>): void => {
			state.info.fromRefCode = action.payload
		},
	},
	extraReducers: builder => {
		// Первичная проверка пользователя
		builder.addCase(initProfileAsync.pending, _ => {
			console.log('Первичная проверка пользователя')
		})
		builder.addCase(
			initProfileAsync.fulfilled,
			(state, action: PayloadAction<AsyncThunkRes<InitUsetResult>>) => {
				switch (action.payload) {
					case 'error':
						console.log('Ошибка при первичной проверки пользователя')
						break
					case null:
						console.log('Первичная проверка пользователя не проведена')
						break
					default:
						state.info.status = action.payload.status
						state.selPsych = action.payload.psych
						console.log('Успешная первичная проверка пользователя')
						break
				}
			}
		)
		builder.addCase(initProfileAsync.rejected, _ => {
			console.log('Ошибка при первичной проверки пользователя')
		})

		// Отправка личного geo
		builder.addCase(sendSelfGeoAsync.pending, _ => {
			console.log('Отправка личного geo')
		})
		builder.addCase(
			sendSelfGeoAsync.fulfilled,
			(state, action: PayloadAction<AsyncThunkRes<FetchGeoRes>>) => {
				switch (action.payload) {
					case 'error':
						console.log('Ошибка при отправке личного geo')
						break
					case null:
						console.log('Личный geo не отправлен')
						break
					default:
						state.info.town = action.payload.city
						state.info.enableGeo = true
						console.log('Успешная отправка личного geo')
						break
				}
			}
		)
		builder.addCase(sendSelfGeoAsync.rejected, _ => {
			console.log('Ошибка при отправке личного geo')
		})

		//Отправка сообщения на добавление фотографии пользвателя
		builder.addCase(saveSelfPhotoAsync.pending, _ => {
			console.log('Отправка сообщения на добавление фотографии пользвателя')
		})
		builder.addCase(
			saveSelfPhotoAsync.fulfilled,
			(state, action: PayloadAction<AsyncThunkRes<PhotoItem>>) => {
				switch (action.payload) {
					case 'error':
						console.log(
							'Ошибка при отправке сообщения на добавление фотографии пользвателя'
						)
						break
					case null:
						console.log('Фотография не добавлена')
						break
					default:
						state.info.photos.push(action.payload)
						console.log(
							'Успешная отправка сообщения на добавление фотографии пользвателя'
						)
						break
				}
			}
		)
		builder.addCase(saveSelfPhotoAsync.rejected, _ => {
			console.log(
				'Ошибка при отправке сообщения на добавление фотографии пользвателя'
			)
		})

		//Отправка сообщения на удаление фотографии пользвателя
		builder.addCase(deleteSelfPhotoAsync.pending, _ => {
			console.log('Отправка сообщения на удаление фотографии пользвателя')
		})
		builder.addCase(
			deleteSelfPhotoAsync.fulfilled,
			(state, action: PayloadAction<AsyncThunkRes<string>>) => {
				switch (action.payload) {
					case 'error':
						console.log(
							'Ошибка при отправке сообщения на удаление фотографии пользвателя'
						)
						break
					case null:
						console.log('Фотография не удалилась')
						break
					default:
						state.info.photos = state.info.photos.filter(
							item => item.id !== action.payload
						)
						console.log(
							'Успешная отправка сообщения на удаление фотографии пользвателя'
						)
						break
				}
			}
		)
		builder.addCase(deleteSelfPhotoAsync.rejected, _ => {
			console.log(
				'Ошибка при отправке сообщения на удаление фотографии пользвателя'
			)
		})

		// Регистрация профиля пользователя
		builder.addCase(signUpProfileAsync.pending, _ => {
			console.log('Регистрация профиля пользователя')
		})
		builder.addCase(
			signUpProfileAsync.fulfilled,
			(_, action: PayloadAction<AsyncThunkRes<'success'>>) => {
				switch (action.payload) {
					case 'error':
						console.log('Ошибка регистрации профиля пользователя')
						break
					case null:
						console.log('Регистрация профиля пользователя не прошла')
						break
					case 'success':
						console.log('Успешная регистрация профиля пользователя')
						break
				}
			}
		)
		builder.addCase(signUpProfileAsync.rejected, _ => {
			console.log('Ошибка регистрации профиля пользователя')
		})

		// Регистрация специалиста
		builder.addCase(signUpPsychAsync.pending, _ => {
			console.log('Регистрация специалиста')
		})
		builder.addCase(
			signUpPsychAsync.fulfilled,
			(_, action: PayloadAction<AsyncThunkRes<'success'>>) => {
				switch (action.payload) {
					case 'error':
						console.log('Ошибка регистрации специалиста')
						break
					case null:
						console.log('Регистрация специалиста не прошла')
						break
					case 'success':
						console.log('Успешная регистрация специалиста')
						break
				}
			}
		)
		builder.addCase(signUpPsychAsync.rejected, _ => {
			console.log('Ошибка регистрации специалиста')
		})

		// Получение текущего профиля пользователя
		builder.addCase(getSelfProfile.pending, _ => {
			console.log('Получение текущего профиля пользователя')
		})
		builder.addCase(
			getSelfProfile.fulfilled,
			(state, action: PayloadAction<AsyncThunkRes<ProfileSelf>>) => {
				switch (action.payload) {
					case 'error':
						console.log('Ошибка получения текущего профиля пользователя')
						break
					case null:
						console.log('Профиль текущего пользователя не получен')
						break
					default:
						state.info = action.payload
						console.log('Успешное получение текущего профиля пользователя')
						break
				}
			}
		)
		builder.addCase(getSelfProfile.rejected, _ => {
			console.log('Ошибка получения текущего профиля пользователя')
		})

		// Получение информации о себе, как о специолисте
		builder.addCase(getSelfPsychProfile.pending, _ => {
			console.log('Получение информации о себе, как о специолисте')
		})
		builder.addCase(
			getSelfPsychProfile.fulfilled,
			(state, action: PayloadAction<AsyncThunkRes<ProfileSelf>>) => {
				switch (action.payload) {
					case 'error':
						console.log('Ошибка получения информации о себе, как о специолисте')
						break
					case null:
						console.log('Информация о себе, как о специолисте не получена')
						break
					default:
						state.info = action.payload
						console.log(
							'Успешное получение информации о себе, как о специолисте'
						)
						break
				}
			}
		)
		builder.addCase(getSelfPsychProfile.rejected, _ => {
			console.log('Ошибка получения информации о себе, как о специолисте')
		})

		// Получение планов пользователя
		builder.addCase(getSelfPlansAsync.pending, _ => {
			console.log('Получение текущих планов пользователя')
		})
		builder.addCase(
			getSelfPlansAsync.fulfilled,
			(state, action: PayloadAction<AsyncThunkRes<EveningPlans>>) => {
				switch (action.payload) {
					case 'error':
						console.log('Ошибка получения текущих планов пользователя')
						break
					case null:
						console.log('Текущие планы пользователя не получены')
						break
					default:
						state.eveningPlans = action.payload
						console.log('Успешное получение текущих планов пользователя')
						break
				}
			}
		)
		builder.addCase(getSelfPlansAsync.rejected, _ => {
			console.log('Ошибка получения текущих планов пользователя')
		})

		// Обновление планов пользователя
		builder.addCase(saveSelfPlansAsync.pending, _ => {
			console.log('Обновление планов пользователя')
		})
		builder.addCase(
			saveSelfPlansAsync.fulfilled,
			(state, action: PayloadAction<AsyncThunkRes<EveningPlans>>) => {
				switch (action.payload) {
					case 'error':
						console.log('Ошибка обновления планов пользователя')
						break
					case null:
						console.log('Планы пользователя не обновлены')
						break
					default:
						state.eveningPlans = action.payload
						console.log('Успешное обновление планов пользователя')
						break
				}
			}
		)
		builder.addCase(saveSelfPlansAsync.rejected, _ => {
			console.log('Ошибка обновления планов пользователя')
		})

		// Выбор специалиста
		builder.addCase(selectSelfPsychAsync.pending, _ => {
			console.log('Выбор специалиста')
		})
		builder.addCase(
			selectSelfPsychAsync.fulfilled,
			(state, action: PayloadAction<AsyncThunkRes<string>>) => {
				switch (action.payload) {
					case 'error':
						console.log('Ошибка выбора специалиста')
						break
					case null:
						console.log('Специалист не выбран')
						break
					default:
						state.selPsych = action.payload
						console.log('Успешный выбор специалиста')
						break
				}
			}
		)
		builder.addCase(selectSelfPsychAsync.rejected, _ => {
			console.log('Ошибка выбора специалиста')
		})

		// Удаление собственного аккаунта
		// deleteSelfAsync
		builder.addCase(deleteSelfAsync.pending, _ => {
			console.log('Удаление собственного аккаунта')
		})
		builder.addCase(
			deleteSelfAsync.fulfilled,
			(_, action: PayloadAction<AsyncThunkRes<'success'>>) => {
				switch (action.payload) {
					case 'error':
						console.log('Ошибка удаления собственного аккаунта')
						break
					case null:
						console.log('Собственный аккаунт не удалён')
						break
					case 'success':
						console.log('Успешное удаление собственного аккаунта')
						break
				}
			}
		)
		builder.addCase(deleteSelfAsync.rejected, _ => {
			console.log('Ошибка удаления собственного аккаунта')
		})
	},
})

export const {
	setInfo,
	setInfoStatus,
	setGeoCoords,
	setPlan,
	setPlanMeta,
	setLocation,
	setAddLink,
	setFromRefCode,
} = profileSlice.actions
export default profileSlice.reducer
