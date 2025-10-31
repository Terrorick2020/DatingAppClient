import {
	EApiStatus,
	ELanguage,
	type CityesVarsItem,
	type InterestsVarsItem,
} from './settings.type'

import {
	ELineStatus,
	EProfileRoles,
	EProfileStatus,
	EPsychStatus,
	ESex,
} from './store.types'

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
	telegramId?: number | string | null
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

export interface ChatMetaRes {
	created_at: number
	id: string
	last_message_id: string
	participants: string[]
}

export interface ChatMsgRes {
	id: string
	chatId: string
	fromUser: string
	is_read: boolean
	text: string
	created_at: number
	updated_at: number
}

export interface ChatUserRes {
	id: string
	name: string
	age: number
	avatarKey: string
	avatarUrl: string
}

export interface ChatItemRes {
	chatId: string
	created_at: number
	lastMsg: string
	toUser: ChatUserRes
	unread_count: number
}

export interface UnreadLikesRes {
	count: number
}

export interface MarkReadLikesRes {
	updatedCount: number
}

export interface LikesListResUserPhoto {
	key: string
}

export interface LikesListResUser {
	telegramId: string
	name: string
	age: number
	town: string
	photoUrl: string
	photos: LikesListResUserPhoto[]
}

export interface LikesListRes {
	id: number
	fromUserId: string
	toUserId: string
	isMatch: boolean
	isRead: boolean
	createdAt: string
	fromUser: LikesListResUser
}

export interface ValidetePsychCodeRes {
	isValid: boolean
	message?: string
}

export interface AdminGenLinkRes {
	code: string
	inviteUrl: string
}

export interface PsychListPhotoRes {
	id: number
	url: string
}

export interface InitPsychListResPsych {
	id: number
	telegramId: string
	name: string
	about: string
	photos: PsychListPhotoRes[]
}

export interface InitPsychListRes {
	psychologists: InitPsychListResPsych[]
	total: number
}

export interface TargetPsychologistRes {
	id: number
	telegramId: string
	name: string
	about: string
	status: EPsychStatus
	createdAt: Date
	updatedAt: Date
	photos: PsychListPhotoRes[]
}

export interface PsychAddVideoRes {
	videoId: number | null
	key: string
	previewKey?: string
}

export interface PsychPublishVideoRes {
	key: string
	videoId: number
	previewUrl: string
	url: string
}

export interface SelfPsychPhotoItem {
	id: number
	url: string
}

export interface SelfPsychRes extends Omit<TargetPsychologistRes, 'photos'> {
	photos: SelfPsychPhotoItem[]
}

export interface ToggleShortsLikeRes {
	isLiked: boolean
	likesCount: number
}

export interface ShortsViewRes {
	viewsCount: number
}

export interface UserSelfPsychRes {
	psychologistId: string | null
}

export interface ComplaintsListRes {
  id: string;
  description: string;
  type: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string; 
  createdAt: number;
  globComplRes: string;
  targetComplRes: string;

  fromUser: {
    name: string;
    avatar: string;
    telegramId: string;
  };

  reportedUser: {
    name: string;
    avatar: string;
    telegramId: string;
  };
}
