import { ReactNode, MouseEvent, HTMLAttributes } from 'react';
import { PhotoItem } from './profile.types';


export enum EPopOrigHor {
    Center = 'center',
    Left = 'left',
    Right = 'right',
}

export enum PlanLabelSvgType {
    ordinary = 'ordinary',
    success = 'success',
    error = 'error',
}

export interface PropsChatInput {
    message: string
    handleChange: (value: string) => void
    handleFocus: () => void
    handleBlur:  () => void
    handleClick: () => void
}

export interface ClearBtnProps {
    onClear: () => void
}

export interface PropsLikeBtn {
    id: string
    isReject?: boolean
    clickLike?: () => void
}

export interface ListBlockView {
    id: number
    handleView: (value: number) => void
}

export interface PropsListBlock extends HTMLAttributes<HTMLDivElement> {
    img: string
    route: string
    children: ReactNode
    view?: ListBlockView
    prefAlt?: string
}

export interface PropsPlansLabel {
    type: PlanLabelSvgType
}

export interface PropsScrollBar {
    len:   number
    index: number
}

export interface PropsSearchInput {
    value: string
    placeholder: string
    inpType: string
    handleInputChange: (newValue: string) => void
    handleClearInput: () => void
    handleInputKeyDown: () => void
}

export interface PropsTimer {
    isCritical: boolean
    value: string
}

export interface PropsLinkMsg {
    link: string
    open: boolean
    setOpen: (value: boolean) => void
}

export interface PropsChatPatternDialog {
    open: boolean
    img: string
    setOpen: (value: boolean) => void
    children: ReactNode
}

export interface PropsMenuBtn {
    id: string
    anchorEl: null | HTMLElement
    setAnchorEl: (value: null | HTMLElement) => void
    handleClose: (e: MouseEvent<HTMLLIElement>) => void
    btnIcon: string
    btnAddClass: string
    menuAddClass: string
    children: ReactNode
}

export interface PropsCustomSelIcon {
    handleClick: () => void
}

export interface PropsAdmineFotter {
    handleSearch: () => void
}

export interface PropsPhotosLoadItem {
    photo: string
    progress: number
    setProgress: (value: number) => void
}

export interface DelDialogState {
    open: boolean
    targetId: string
}

export interface PropsPhotos {
  photos: PhotoItem[]
  handleAdd: (photo: File, setUploadProgress: (value: number) => void) => Promise<void>
  handleDel: (id: string) => void
}

export interface PropsPhotosItem {
    item: PhotoItem
    setDelDialogState: (value: DelDialogState) => void
}

export interface PropsPhotosDelDialog {
    id: string
    open: boolean
    setOpen: (value: boolean) => void
    handleDel: (id: string) => void
}

export interface PropsPhotosCropperDialog {
    open: boolean
    setOpen: (value: boolean) => void
    photo: string
    handleAdd: (photo: File) => void
}

export interface CropState {
    x: number
    y: number
}

export interface PropsPhotosAddItem {
    handleAdd: (photo: File) => void
}

export interface PropsComplaintDrawer {
    id: string
}

export interface EmojiData {
    id: string;
    name: string;
    native: string;
    shortcodes: string;
    unified: string;
    keywords: string[];
}

export interface PropsAvatarWithPreload {
    avatarUrl: string
    prefAlt: string
    size?: number
    addClass?: string
    handleClick: () => void
}
