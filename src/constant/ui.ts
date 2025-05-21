import { PlanLabelSvgType } from '@/types/ui.types';

import SvgCheckMark from '@/assets/icon/check-mark.svg';
import SvgBracketCheck from '@/assets/icon/bracket-check.svg';


export const planLabelStyle = {
    [PlanLabelSvgType.ordinary]: {
        img: SvgCheckMark,
        style: {
            backgroundColor: '#BC96FF',
        },
    },
    [PlanLabelSvgType.success]: {
        img: SvgCheckMark,
        style: {
            backgroundColor: '#D7FF81',
        },
    },
    [PlanLabelSvgType.error]: {
        img: SvgBracketCheck,
        style: {
            backgroundColor: '#FFFFFF',
            opacity: 0.5,
        },
    },
}

export const validImageTypes: string[] = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif'
];

export const maxImgSize = 5 * 1024 * 1024;
