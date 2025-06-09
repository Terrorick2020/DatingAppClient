import { PlanLabelSvgType } from "@/types/ui.types";
import type { LikesItem } from "@/types/likes.types";

import PngLeady from '@/assets/img/leady.png';
import PngWoman from '@/assets/img/woman.png';
import PngFemale from '@/assets/img/female.png';


export const likesList: LikesItem[] = [
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.success,
      timer: {
        value: 123,
        isCritical: false
      },
      name: "Алексей",
      age: 28
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.success,
      timer: {
        value: 5432,
        isCritical: true
      },
      name: "Мария",
      age: 24
    },
    {
      id: "12234231",
      avatar: PngWoman,
      planStatus: PlanLabelSvgType.success,
      timer: {
        value: 5432,
        isCritical: false
      },
      name: "Дмитрий",
      age: 31
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.error,
      timer: {
        value: 5432,
        isCritical: true
      },
      name: "Анна",
      age: 22
    },
    {
      id: "12234231",
      avatar: PngWoman,
      planStatus: PlanLabelSvgType.error,
      timer: {
        value: 4567,
        isCritical: false
      },
      name: "Сергей",
      age: 35
    },
    {
      id: "12234231",
      avatar: PngLeady,
      planStatus: PlanLabelSvgType.error,
      timer: {
        value: 4567,
        isCritical: false
      },
      name: "Елена",
      age: 27
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.ordinary,
      timer: {
        value: 4456789,
        isCritical: true
      },
      name: "Иван",
      age: 29
    },
    {
      id: "12234231",
      avatar: PngLeady,
      planStatus: PlanLabelSvgType.ordinary,
      timer: {
        value: 45678,
        isCritical: false
      },
      name: "Ольга",
      age: 26
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.ordinary,
      timer: {
        value: 45678,
        isCritical: true
      },
      name: "Павел",
      age: 33
    },
    {
      id: "12234231",
      avatar: PngLeady,
      planStatus: PlanLabelSvgType.ordinary,
      timer: {
        value: 45678,
        isCritical: false
      },
      name: "Наталья",
      age: 30
    }
];
