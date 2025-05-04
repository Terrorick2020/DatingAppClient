export interface PlansObj {
    date: string
    content: string
}

export interface SliderItem {
    id: string
    name: string
    age: number
    city: string
    description: string
    plans: PlansObj
    photos: string[]
}

export interface DetailsTargetUser {
    id: string
    photos: string[]
    city: string
    plans: {}
}

export interface QuestState {
    sliderList: SliderItem[]
    targetUser: DetailsTargetUser | null
}

export interface PropsProfileInfo {
    handleRoute: () => void
}
