import type { UsersEndpointParams } from '@/types/fetch.type';
import { EProfileRoles } from '@/types/store.types';


export const HOST = import.meta.env.VITE_HOST || 'localhost';
export const PORT = import.meta.env.VITE_PORT || '5173';
export const MODE = import.meta.env.VITE_MODE || 'dev';

export const SSL_KEY  = import.meta.env.VITE_SSL_KEY || '';
export const SSL_CERT = import.meta.env.VITE_SSL_CERT || '';
export const DOMAIN   = import.meta.env.VITE_DOMAIN || '';
export const REFERAL  = import.meta.env.VITE_REFERAL || '';

export const PHOTOS_BASE = import.meta.env.VITE_PHOTOS_BASE || '';

export const BASE_URL = import.meta.env.VITE_BASE_URL || '';
export const WS_URL   = import.meta.env.VITE_WS_URL || '';

export const WS_CHATS   = import.meta.env.VITE_WS_CHATS || '';
export const WS_COMPL   = import.meta.env.VITE_WS_COMPL || '';
export const WS_LIKES   = import.meta.env.VITE_WS_LIKES || '';
export const WS_MATCH   = import.meta.env.VITE_WS_MATCH || '';
export const WS_MSGS    = import.meta.env.VITE_WS_MSGS  || '';

export const INITIAL_ENDPOINT = import.meta.env.VITE_INITIAL_ENDPOINT || '';
export const SET_GEO_ENDPOINT = import.meta.env.VITE_SET_GEO_ENDPOINT || '';
export const LIKES_ENDPOINT   = import.meta.env.VITE_LIKES_ENDPOINT || '';
export const BILLING_ENDPOINT = import.meta.env.VITE_BILLING_ENDPOINT || '';
export const ADMINE_ENDPOINT  = import.meta.env.VITE_ADMINE_ENDPOINT || '';

export const HELP_INTERESTS_ENDPOINT       = import.meta.env.VITE_HELP_INTERESTS_ENDPOINT || '';
export const HELP_PLANS_ENDPOINT           = import.meta.env.VITE_HELP_PLANS_ENDPOINT || '';
export const HELP_CITYES_ENDPOINT          = import.meta.env.VITE_HELP_CITYES_ENDPOINT || '';
export const HELP_REGIONS_ENDPOINT         = import.meta.env.VITE_HELP_REGIONS_ENDPOINT || '';
export const HELP_GLOB_COMPLAINTS_ENDPOINT = import.meta.env.VITE_HELP_GLOB_COMPLAINTS_ENDPOINT || '';
export const HELP_DESC_COMPLAINTS_ENDPOINT = import.meta.env.VITE_HELP_DESC_COMPLAINTS_ENDPOINT || '';

export const PLANS_GET_ENDPOINT = import.meta.env.VITE_PLANS_GET_ENDPOINT || '';
export const PLANS_SET_ENDPOINT = import.meta.env.VITE_PLANS_SET_ENDPOINT || '';

export const UPLOAD_PHOTO  = import.meta.env.VITE_UPLOAD_PHOTO || '';
export const DELETE_PHOTO  = import.meta.env.VITE_DELETE_PHOTO || '';
export const LOG_ENDPOINT  = import.meta.env.VITE_LOG_ENDPOINT || '';
export const REG_ENDPOINT  = import.meta.env.VITE_REG_ENDPOINT || '';

export const CHATS_ENDPOINT         = import.meta.env.VITE_CHATS_ENDPOINT || '';
export const CHATS_METADATA         = import.meta.env.VITE_CHATS_METADATA || '';
export const CHATS_MSG              = import.meta.env.VITE_CHATS_MSG || '';
export const CHATS_MEDIA_ENDPOINT   = import.meta.env.VITE_CHATS_MEDIA_ENDPOINT || '';
export const CHATS_READ_ENDPOINT    = import.meta.env.VITE_CHATS_READ_ENDPOINT || '';
export const CHATS_TYPING_ENDPOINT  = import.meta.env.VITE_CHATS_TYPING_ENDPOINT || '';

export const REDIS               = import.meta.env.VITE_REDIS || '';
export const REDIS_KEY_ENDPOINT  = import.meta.env.VITE_REDIS_KEY_ENDPOINT || '';
export const REDIS_EXPIRE        = import.meta.env.VITE_REDIS_EXPIRE || '';
export const REDIS_HASH_ENDPOINT = import.meta.env.VITE_REDIS_HASH_ENDPOINT || '';
export const REDIS_ZSET_ENDPOINT = import.meta.env.VITE_REDIS_ZSET_ENDPOINT || '';
export const REDIS_COUNT         = import.meta.env.VITE_REDIS_COUNT || '';
export const REDIS_KEYS          = import.meta.env.VITE_REDIS_KEYS || '';
export const REDIS_CLEANUP       = import.meta.env.VITE_REDIS_CLEANUP || '';
export const REDIS_TTL           = import.meta.env.VITE_REDIS_TTL || '';

export const MSGS_ENDPOINT        = import.meta.env.VITE_MSGS_ENDPOINT || '';
export const MSGS_UPLOAD_ENDPOINT = import.meta.env.VITE_MSGS_UPLOAD_ENDPOINT || '';
export const MSGS_MEDIA_ENDPOINT  = import.meta.env.VITE_MSGS_MEDIA_ENDPOINT || '';
export const MSGS_TYPING_ENDPOINT = import.meta.env.VITE_MSGS_TYPING_ENDPOINT || '';
export const MSGS_READ_ENDPOINT   = import.meta.env.VITE_MSGS_READ_ENDPOINT || '';

export const USER_ENDPOINT     = import.meta.env.VITE_USER_ENDPOINT || '';
export const USER_DEL_ENDPOINT = import.meta.env.VITE_USER_DEL_ENDPOINT || '';
export const USER_DEL_SELF     = import.meta.env.VITE_USER_DEL_SELF || '';
export const USER_PUBLIC       = import.meta.env.VITE_USER_PUBLIC || '';

export const COMPLS_ENDPOINT     = import.meta.env.VITE_COMPLS_ENDPOINT || '';
export const COMPLS_UPT_ENDPOINT = import.meta.env.VITE_COMPLS_UPT_ENDPOINT || '';
export const COMPLS_STATS        = import.meta.env.VITE_COMPLS_STATS || '';

if(
  !BASE_URL ||
  !WS_URL   ||
  !REFERAL  ||

  !WS_CHATS ||
  !WS_COMPL ||
  !WS_LIKES ||
  !WS_MATCH ||
  !WS_MSGS  ||

  !PHOTOS_BASE ||

  !HELP_INTERESTS_ENDPOINT       ||
  !HELP_PLANS_ENDPOINT           ||
  !HELP_CITYES_ENDPOINT          ||
  !HELP_REGIONS_ENDPOINT         ||
  !HELP_GLOB_COMPLAINTS_ENDPOINT ||
  !HELP_DESC_COMPLAINTS_ENDPOINT ||

  !PLANS_GET_ENDPOINT ||
  !PLANS_SET_ENDPOINT ||

  !INITIAL_ENDPOINT ||
  !SET_GEO_ENDPOINT ||
  !LIKES_ENDPOINT   ||
  !BILLING_ENDPOINT ||
  !ADMINE_ENDPOINT  ||

  !UPLOAD_PHOTO ||
  !DELETE_PHOTO ||
  !LOG_ENDPOINT ||
  !REG_ENDPOINT ||

  !CHATS_ENDPOINT        ||
  !CHATS_METADATA        ||
  !CHATS_MSG             ||
  !CHATS_MEDIA_ENDPOINT  ||
  !CHATS_READ_ENDPOINT   ||
  !CHATS_TYPING_ENDPOINT ||

  !REDIS               ||
  !REDIS_KEY_ENDPOINT  ||
  !REDIS_EXPIRE        ||
  !REDIS_HASH_ENDPOINT ||
  !REDIS_ZSET_ENDPOINT ||
  !REDIS_COUNT         ||
  !REDIS_KEYS          ||
  !REDIS_CLEANUP       ||
  !REDIS_TTL           ||

  !MSGS_ENDPOINT         ||
  !MSGS_UPLOAD_ENDPOINT  ||
  !MSGS_MEDIA_ENDPOINT   ||
  !MSGS_TYPING_ENDPOINT  ||
  !MSGS_READ_ENDPOINT    ||

  !USER_ENDPOINT      ||
  !USER_DEL_ENDPOINT  ||
  !USER_DEL_SELF      ||
  !USER_PUBLIC        ||

  !COMPLS_ENDPOINT      ||
  !COMPLS_UPT_ENDPOINT  ||
  !COMPLS_STATS
) {
  throw Error('Hasn`t someone environments!');
};

export const REFERAL_LINK = (type: EProfileRoles, referal: string): string => `${REFERAL}?type=${type}&referal=${referal}`;
export const PHOTO_LINK = (key: string): string => PHOTOS_BASE.replace('{key}', key);

export const CHATS_METADATA_ENDPOINT = (chatId: string): string => `${CHATS_ENDPOINT}/${chatId}${CHATS_METADATA}`;
export const CHATS_MSG_ENDPOINT      = (chatId: string): string => `${CHATS_ENDPOINT}/${chatId}${CHATS_MSG}`;
export const CHATS_DEL_ENDPOINT      = (chatId: string): string => `${CHATS_ENDPOINT}/${chatId}`;

export const USERS_ENDPOINT = ({
  page = null,
  limit = null,
  sortBy = null,
  sortDirection = null,
  name = null,
  town = null,
  ageMin = null,
  ageMax = null,
  sex = null,
  interestId = null,
}: UsersEndpointParams = {}): string => {
  const params: string[] = [];

  if (page !== null)       params.push(`page=${page}`);
  if (limit !== null)      params.push(`limit=${limit}`);
  if (sortBy)             params.push(`sortBy=${sortBy}`);
  if (sortDirection)      params.push(`sortDirection=${sortDirection}`);
  if (name)               params.push(`name=${name}`);
  if (town)               params.push(`town=${town}`);
  if (ageMin !== null)     params.push(`ageMin=${ageMin}`);
  if (ageMax !== null)     params.push(`ageMax=${ageMax}`);
  if(sex !== null)        params.push(`sex=${sex}`);
  if (interestId != null) params.push(`interestId=${interestId}`);

  const queryString = params.length ? `?${params.join('&')}` : '';

  return `${USER_ENDPOINT}${queryString}`;
}
