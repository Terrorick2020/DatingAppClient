import { EApiStatus } from './settings.type';
import { ESex } from './store.types';


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
	town: string
}
export interface RegEndpointRes {
	user: RegEndpointResUser
}
