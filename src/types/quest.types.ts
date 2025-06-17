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

export interface InitSliderResData {
    isPush: boolean
    slides: SliderItem[]
}

export interface InitSliderData {
    limit: number
    offset: number
}

export interface DetailsTargetUserPlans {
    targetTime: string
    district: string
    distDesc: string
    place: string
    planDesc: string
}

export interface DetailsTargetUser {
    id: string
    photos: string[]
    city: string
    name: string
    age: number
    plans: DetailsTargetUserPlans
    bio: string
}

export interface QuestState {
    sliderList: SliderItem[]
    targetUser: DetailsTargetUser | null
}

export interface PropsProfileInfo {
    handleRoute: () => void
}

export interface PropsDetailsSlide {
    toLeftScroll: () => void
    toRightScroll: () => void
    len:     number
    index:   number
}

export interface PropsPsychHeader {
    setPreText: (value: string) => void
}

export interface PropsPsychList {
    preText: string
}

export interface ISliderItemProps {
    sliderItem: SliderItem
    toDetails: (id: string) => void
    nextStep: () => void
    clickLike: () => void
    prevStep: () => void
}

export interface PlansLabelsState {
    plan: string
    location: string
}

export interface PropsDetailsFixed {
    id: string
}
