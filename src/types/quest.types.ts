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

export interface DetailsTargetUserPlans {
    targetTime: string
    district: string
    place: string
    description: string
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
    clickLike: (id: number) => void
    prevStep: () => void
}
