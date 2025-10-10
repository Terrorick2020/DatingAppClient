import { EProfileStatus, EProfileRoles } from '@/types/store.types';
import type { UsersEndpointParams } from '@/types/fetch.type';


export const BASE_URL      = import.meta.env.VITE_BASE_URL || '';
export const WS_URL        = import.meta.env.VITE_WS_URL || '';
export const BOT_LINK      = import.meta.env.VITE_BOT_LINK || '';
export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || '';
export const URL_MARK      = import.meta.env.VITE_URL_MARK || 'id';
export const TG_HEADER      = import.meta.env.VITE_TG_HEADER || '';
export const YC_HEADER      = import.meta.env.VITE_YC_HEADER || '';

export const WS_CHATS   = import.meta.env.VITE_WS_CHATS || '';
export const WS_COMPL   = import.meta.env.VITE_WS_COMPL || '';
export const WS_LIKES   = import.meta.env.VITE_WS_LIKES || '';
export const WS_MATCH   = import.meta.env.VITE_WS_MATCH || '';
export const WS_MSGS    = import.meta.env.VITE_WS_MSGS  || '';

export const INITIAL_ENDPOINT = import.meta.env.VITE_INITIAL_ENDPOINT || '';
export const SET_GEO_ENDPOINT = import.meta.env.VITE_SET_GEO_ENDPOINT || '';
export const BILLING_ENDPOINT = import.meta.env.VITE_BILLING_ENDPOINT || '';
export const ADMINE_ENDPOINT  = import.meta.env.VITE_ADMINE_ENDPOINT || '';

export const LIKES_ENDPOINT = import.meta.env.VITE_LIKES_ENDPOINT || '';
export const LIKES_UNREAD   = import.meta.env.VITE_LIKES_UNREAD || '';
export const LIKES_READED   = import.meta.env.VITE_LIKES_READED || '';

export const ADMINE_BLOCK   = import.meta.env.VITE_ADMINE_BLOCK || '';
export const ADMINE_UNBLOCK = import.meta.env.VITE_ADMINE_UNBLOCK || '';
export const ADMINE_PRO     = import.meta.env.VITE_ADMINE_PRO || '';
export const ADMINE_CMPLS   = import.meta.env.VITE_ADMINE_CMPLS || '';

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
export const CHATS_ADD_MSG          = import.meta.env.VITE_CHATS_ADD_MSG || '';
export const CHATS_MEDIA_ENDPOINT   = import.meta.env.VITE_CHATS_MEDIA_ENDPOINT || '';
export const CHATS_READ_ENDPOINT    = import.meta.env.VITE_CHATS_READ_ENDPOINT || '';
export const CHATS_TYPING_ENDPOINT  = import.meta.env.VITE_CHATS_TYPING_ENDPOINT || '';
export const CHATS_UNREAD           = import.meta.env.VITE_CHATS_UNREAD || '';
export const CHATS_CRT_WITH_PSYC    = import.meta.env.VITE_CHATS_CREATE_WITH_PSYCH || '';
export const CHATS_ASSIGN_PSYCH     = import.meta.env.VITE_CHATS_ASSIGN_PSYCH || '';

export const PSYCH_ENDPOINT    = import.meta.env.VITE_PSYCH_ENDPOINT || '';
export const PSYCH_CHECK       = import.meta.env.VITE_PSYCH_CHECK || '';
export const PSYCH_FIND        = import.meta.env.VITE_PSYCH_FIND || '';
export const PSYCH_AVAL        = import.meta.env.VITE_PSYCH_AVAL || '';
export const PSYCH_GEN_TOKEN   = import.meta.env.VITE_PSYCH_GEN_TOKEN || '';
export const PSYCH_VALID_TOKEN = import.meta.env.VITE_PSYCH_VALID_TOKEN || '';
export const PSYCH_UPL_PHOTO   = import.meta.env.VITE_PSYCH_UPL_PHOTO || '';
export const PSYCH_DEL_PHOTO   = import.meta.env.VITE_PSYCH_DEL_PHOTO || '';

export const VIDEO_ENDPOIN = import.meta.env.VITE_VIDEO_ENDPOINT || '';
export const VIDEO_UPL    = import.meta.env.VITE_VIDEO_UPL || '';
export const VIDEO_SAVE   = import.meta.env.VITE_VIDEO_SAVE || '';
export const VIDEO_MY     = import.meta.env.VITE_VIDEO_MY || '';
export const VIDEO_FEED   = import.meta.env.VITE_VIDEO_SHORTS_FEED || '';
export const VIDEO_LIKE   = import.meta.env.VITE_VIDEO_SHORTS_LIKE || '';
export const VIDEO_VIEW   = import.meta.env.VITE_VIDEO_SHORTS_VIEW || '';

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
export const USER_QUESTS       = import.meta.env.VITE_USER_QUESTS || '';
export const USER_SEARCH       = import.meta.env.VITE_USER_SEARCH || '';

export const COMPLS_ENDPOINT     = import.meta.env.VITE_COMPLS_ENDPOINT || '';
export const COMPLS_UPT_ENDPOINT = import.meta.env.VITE_COMPLS_UPT_ENDPOINT || '';
export const COMPLS_STATS        = import.meta.env.VITE_COMPLS_STATS || '';

export const FQ_MEDIA_LINK     = import.meta.env.VITE_FQ_MEDIA_LINK || '';
export const EP_MEDIA_LINK     = import.meta.env.VITE_EP_MEDIA_LINK || '';

export const USER_STATUS  = import.meta.env.VITE_USER_STATUS || '';
export const CAPTURE_KEY  = import.meta.env.VITE_CAPTURE_KEY || '';
export const CAPTURE_MODE = import.meta.env.VITE_CAPTURE_MODE || 'test';

if(
  !BASE_URL      ||
  !WS_URL        ||
  !BOT_LINK      ||
  !SUPPORT_EMAIL ||
  !TG_HEADER     ||
  !YC_HEADER     ||

  !WS_CHATS ||
  !WS_COMPL ||
  !WS_LIKES ||
  !WS_MATCH ||
  !WS_MSGS  ||

  !HELP_INTERESTS_ENDPOINT       ||
  !HELP_PLANS_ENDPOINT           ||
  !HELP_CITYES_ENDPOINT          ||
  !HELP_REGIONS_ENDPOINT         ||
  !HELP_GLOB_COMPLAINTS_ENDPOINT ||
  !HELP_DESC_COMPLAINTS_ENDPOINT ||

  !PSYCH_ENDPOINT    ||
  !PSYCH_CHECK       ||
  !PSYCH_FIND        ||
  !PSYCH_AVAL        ||
  !PSYCH_GEN_TOKEN   ||
  !PSYCH_VALID_TOKEN ||
  !PSYCH_UPL_PHOTO   ||
  !PSYCH_DEL_PHOTO   ||

  !VIDEO_ENDPOIN ||
  !VIDEO_UPL     ||
  !VIDEO_SAVE    ||
  !VIDEO_MY      ||
  !VIDEO_FEED    ||
  !VIDEO_LIKE    ||
  !VIDEO_VIEW    ||

  !PLANS_GET_ENDPOINT ||
  !PLANS_SET_ENDPOINT ||

  !INITIAL_ENDPOINT ||
  !SET_GEO_ENDPOINT ||
  !BILLING_ENDPOINT ||
  !ADMINE_ENDPOINT  ||

  !LIKES_ENDPOINT ||
  !LIKES_UNREAD   ||
  !LIKES_READED   ||

  !ADMINE_BLOCK   ||
  !ADMINE_UNBLOCK ||
  !ADMINE_PRO     ||
  !ADMINE_CMPLS   ||

  !UPLOAD_PHOTO ||
  !DELETE_PHOTO ||
  !LOG_ENDPOINT ||
  !REG_ENDPOINT ||

  !CHATS_ENDPOINT        ||
  !CHATS_METADATA        ||
  !CHATS_MSG             ||
  !CHATS_ADD_MSG         ||
  !CHATS_MEDIA_ENDPOINT  ||
  !CHATS_READ_ENDPOINT   ||
  !CHATS_TYPING_ENDPOINT ||
  !CHATS_UNREAD          ||
  !CHATS_CRT_WITH_PSYC   ||
  !CHATS_ASSIGN_PSYCH    ||

  !REDIS               ||
  !REDIS_KEY_ENDPOINT  ||
  !REDIS_EXPIRE        ||
  !REDIS_HASH_ENDPOINT ||
  !REDIS_ZSET_ENDPOINT ||
  !REDIS_COUNT         ||
  !REDIS_KEYS          ||
  !REDIS_CLEANUP       ||
  !REDIS_TTL           ||

  !MSGS_ENDPOINT        ||
  !MSGS_UPLOAD_ENDPOINT ||
  !MSGS_MEDIA_ENDPOINT  ||
  !MSGS_TYPING_ENDPOINT ||
  !MSGS_READ_ENDPOINT   ||

  !USER_ENDPOINT     ||
  !USER_DEL_ENDPOINT ||
  !USER_DEL_SELF     ||
  !USER_PUBLIC       ||
  !USER_SEARCH       ||

  !COMPLS_ENDPOINT      ||
  !COMPLS_UPT_ENDPOINT  ||
  !COMPLS_STATS         ||

  !FQ_MEDIA_LINK ||
  !EP_MEDIA_LINK ||

  !USER_STATUS ||
  !CAPTURE_KEY ||
  !CAPTURE_MODE
) {
  throw Error('Hasn`t someone environments!');
};

export const REFERAL_LINK = (code: string, type: EProfileRoles): string => {
  const encodedCode = btoa(code);
  const encodedType = btoa(type);

  const paramsString = `code=${encodeURIComponent(encodedCode)}&type=${encodeURIComponent(encodedType)}`;

  const finalEncoded = btoa(paramsString);

  return `${BOT_LINK}?startapp=${finalEncoded}`;
}

export const LIKES_READED_ENDPOINT = `${LIKES_ENDPOINT}${LIKES_READED}`;
export const LIKES_UNREADED_ENDPOINT = (tgId: string) => `${LIKES_ENDPOINT}${LIKES_UNREAD}/${tgId}`;

export const CHATS_METADATA_ENDPOINT = (chatId: string): string => `${CHATS_ENDPOINT}/${chatId}${CHATS_METADATA}`;
export const CHATS_ASSIGN_PSYCH_ENDPOINT = (tgId: string): string => `${CHATS_ENDPOINT}${CHATS_ASSIGN_PSYCH}?telegramId=${tgId}`;
export const CHATS_CRT_WITH_PSYC_ENDPOINT = `${CHATS_ENDPOINT}${CHATS_CRT_WITH_PSYC}`;

export const CHATS_MSG_ENDPOINT = (
  chatId: string,
  limit: number,
  offset: number,
): string => `${CHATS_ENDPOINT}/${chatId}${CHATS_MSG}?limit=${limit}&offset=${offset}`;

export const CHATS_DEL_ENDPOINT      = (chatId: string): string => `${CHATS_ENDPOINT}/${chatId}`;
export const CHATS_UNREAD_ENDPOINT   = (tgId: string): string => `${CHATS_ENDPOINT}${CHATS_UNREAD}?telegramId=${tgId}`;
export const CHATS_ADD_MSG_ENDPOINT  = `${CHATS_ENDPOINT}${CHATS_ADD_MSG}`;

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

export const USER_SELF_DELETE_ENDPOINT = `${USER_ENDPOINT}${USER_DEL_SELF}`;
export const USER_STATUS_ENDPOINT = (tgId: string): string => `${REDIS}/${USER_STATUS.replace('{telegramId}', tgId)}`;
export const USERS_QUESTS_ENDPOINT = (
  telegramId: string,
  limit: number,
  offset: number,
): string => `${USER_ENDPOINT}${USER_QUESTS}?telegramId=${telegramId}&limit=${limit}&offset=${offset}`;

export const USERS_SEARCH = (
  query: string,
  offset?: number,
  limit?: number,
): string => {
  const params: string[] = [];

  params.push(`query=${query}`);
  
  if(offset) params.push(`page=${offset}`);
  if(limit) params.push(`limit=${limit}`);

  return `${USER_ENDPOINT}${USER_SEARCH}?${params.join('&')}`;
}

export const ADMINE_CMPLS_ENDPOINT = `${ADMINE_ENDPOINT}${ADMINE_CMPLS}`;
export const ADMINE_SERCH_STATUS_ENDPOINT = (tgId: string, type: EProfileStatus): string => {
  let end: string;

  switch(type) {
    case EProfileStatus.Pro:
      end = ADMINE_PRO;
      break;
    case EProfileStatus.Noob:
      end = ADMINE_UNBLOCK;
      break;
    case EProfileStatus.Blocked:
      end = ADMINE_BLOCK;
      break;
  }

  return `${ADMINE_ENDPOINT}/${tgId}${end}`;
}

export const COMLS_STATS_ENDPOINT = (tgId: string): string => `${COMPLS_ENDPOINT}${COMPLS_STATS}/${tgId}`;

export const PSYCH_INITIAL_ENDPOINT = `${PSYCH_ENDPOINT}${PSYCH_CHECK}`;
export const PSYCH_FOR_USER_ENDPOINT = `${PSYCH_ENDPOINT}${PSYCH_AVAL}`;
export const PSYCH_GEN_TOKEN_ENDPOINT = `${PSYCH_ENDPOINT}${PSYCH_GEN_TOKEN}`;
export const PSYCH_VALID_TOKEN_ENDPOINT = `${PSYCH_ENDPOINT}${PSYCH_VALID_TOKEN}`;
export const PSYCH_UPL_PHOTO_ENDPOINT = `${PSYCH_ENDPOINT}${PSYCH_UPL_PHOTO}`;
export const PSYCH_DEL_PHOTO_ENDPOINT = `${PSYCH_ENDPOINT}${PSYCH_DEL_PHOTO}`;

export const PSYCH_BY_MARK_ENDPOINT = (mark: string | number): string => `${PSYCH_ENDPOINT}/${mark}`;

export const PSYCH_ADMIN_ENDPOINT = (
  search?: string,
  offset?: number,
  limit?: number,
) => {
  const params: string[] = [];

  if(search) params.push(`search=${search}`);
  if(limit) params.push(`limit=${limit}`);
  if(offset !== undefined && offset >= 0) params.push(`offset=${offset}`);

  const queryString = params.length ? `?${params.join('&')}` : '';

  return `${PSYCH_ENDPOINT}${queryString}`;
}

export const VIDEO_UPL_ENDPOINT = `${VIDEO_ENDPOIN}${VIDEO_UPL}`;
export const VIDEO_SAVE_ENDPOINT = `${VIDEO_ENDPOIN}${VIDEO_SAVE}`;

export const getVideoMark = (videoId: number): string =>
    `${VIDEO_ENDPOIN}/${videoId}`;

export const VIDEO_LIKE_ENDPOINT = (videoId: number): string =>
    `${getVideoMark(videoId)}${VIDEO_LIKE}`;

export const VIDEO_VIEW_ENDPOINT = (videoId: number): string =>
    `${getVideoMark(videoId)}${VIDEO_VIEW}`;

const getBaseVideoParams = (
    telegramId: string,
    offset?: number,
    limit?: number,
): string => {
    const params: string[] = [];

    params.push(`telegramId=${telegramId}`);

    if(limit && limit >= 0) params.push(`limit=${limit}`);
    if(offset && offset >= 0) params.push(`offset=${offset}`);

    const queryString = `?${params.join('&')}`;

    return queryString;
};

export const VIDEO_SELF_ENDPOINT = (
    telegramId: string,
    offset?: number,
    limit?: number,
): string => {
    const queryString = getBaseVideoParams(telegramId, offset, limit);

    return `${VIDEO_ENDPOIN}${VIDEO_MY}${queryString}`;
};

export const VIDEO_SHORTS_ENDPOINT = (
  telegramId: string,
  offset?: number,
  limit?: number,
): string => {
    const queryString = getBaseVideoParams(telegramId, offset, limit);

    return `${VIDEO_ENDPOIN}${VIDEO_FEED}${queryString}`;
};
