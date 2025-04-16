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
        value: "12:34",
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
        value: "05:20",
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
        value: "23:15",
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
        value: "01:45",
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
        value: "18:30",
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
        value: "09:15",
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
        value: "00:30",
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
        value: "14:20",
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
        value: "03:10",
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
        value: "20:45",
        isCritical: false
      },
      name: "Наталья",
      age: 30
    }
];
