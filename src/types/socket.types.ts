import { ELineStatus } from './store.types';


export enum ServerMethods {
	JoinRoom = 'joinRoom',
	LeaveRoom = 'leaveRoom',
}

export enum MsgsCltOnMeths {
    newMessage = 'newMessage',
    messageRead = 'messageRead',
    typingStatus = 'typingStatus',
}

export enum ChtasCltMethods {
    userStatus = 'userStatus',
}

export enum LikesCltMethods {
    newLike = 'newLike',
}

export enum MatchCltMethods {
    newMatch = 'newMatch'
}

export enum ConnectionStatus {
	Error = 'error',
	Success = 'success',
}

export interface ReqConnectionDto {
    roomName: string
    telegramId: string    
}

export interface ResConnectionDto extends ReqConnectionDto {
	message: string
	status: ConnectionStatus
}

export interface OnResNewMsg {
    chatId: string
    messageId: string
    recipientId: string
    senderId: string
    text: string
    timestamp: number
}

export interface OnResTyping {
    userId: string
    isTyping: boolean
}

export interface OnResReadMsg {
    chatId: string
    msgsId: string[]
}

export interface OnResInterLineStat {
    status: ELineStatus
    timestamp: number
    userId: string
}

export interface OnResNewLike {
    fromUserId: string
    toUserId: string
    timestamp: number
}

export interface OnResNewMatch {
    user1Id: string
    user2Id: string
    chatId: string
    timestamp: number
}
