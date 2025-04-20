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

export interface LikesItemTimer {
    value: string
    isCritical: boolean
}

export interface QuestState {
    sliderList: SliderItem[]
}
