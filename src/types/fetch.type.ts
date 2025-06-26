import {
	EApiStatus,
	ELanguage,
	InterestsVarsItem,
	CityesVarsItem
} from './settings.type';

import { ELineStatus, EProfileRoles, EProfileStatus, ESex } from './store.types';


export interface FetchResBase {
	success: boolean
	message: string
	meta?: any
}

export interface FetchResSuccess<T> extends FetchResBase {
	success: true
	data: T | 'None'
	warning?: boolean
	errors?: never
}

export interface FetchResError extends FetchResBase {
	success: false
	data?: never
	errors?: any
}

export type FetchResponse<T = any> = FetchResSuccess<T> | FetchResError

export interface RejectRes {
    isCritical: boolean
    status: EApiStatus
    msg: string
}

export interface FetchGeoRes {
    city: string
}

export interface FetchSavePhotoRes {
    photoId: number
}

export enum EFetchLikesTProps {
	Received = 'received',
	Sent = 'sent',
	Matches = 'matches',
}

export enum UsersEndpointSotrBy {
	CreatedAt = 'createdAt',
	Name = 'name',
	Age = 'age',
}

export enum UsersEndpointSortDir {
	Asc = 'asc',
	Desc = 'desc',
}

export interface UsersEndpointParams {
  page?: number | string | null
  limit?: number | string | null
  sortBy?: UsersEndpointSotrBy | null
  sortDirection?: UsersEndpointSortDir | null
  name?: string | null
  town?: string | null
  ageMin?: number | string | null
  ageMax?: number | string | null
  sex?: ESex | null
  interestId?: number | string | null
}

export interface RegEndpointResUser {
	coordinates: number[] | null
	enableGeo: boolean
	telegramId: string
	referralCode: string
	town: string
}
export interface RegEndpointRes {
	user: RegEndpointResUser
}

export interface PhotoItemRes {
	id: number
	url: string
}

export interface UserProfileResBase {
	telegramId: string
  	name: string
  	town: string
	sex: ESex.All | ESex.Male
	selSex: ESex
	age: number
  	bio: string
  	lang: ELanguage
	enableGeo: boolean
	isVerify: boolean
	latitude?: number
	longitude?: number
	role: EProfileRoles
	status: EProfileStatus
	referralCode?: string
	createdAt: string
	updatedAt: string
	interest: InterestsVarsItem
	photos: PhotoItemRes[]
}

export interface GetSelfEndpointRes extends UserProfileResBase {
	invitedBy?: string
	invitedUsers: string[]
}

export interface TargetUserEndpointRes extends UserProfileResBase {
	isOnline: ELineStatus | boolean
	interestId: number
	invitedById: string | null
	city: CityesVarsItem
}

export interface SendComplEndpointRes {
	createdAt: number
	id: string
	status: string
	type: string
}
