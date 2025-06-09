import dayjs from 'dayjs';
import type { TargetChatDay, IncomingMsg, TargetChatDayMsg } from '@/types/chats.types';


export function addMessageToChat(
    chatDialog: TargetChatDay[],
    incoming: IncomingMsg,
    interlocatorId: string
): TargetChatDay[] {
    const day = dayjs(incoming.created_at).format('YYYY-MM-DD');
    const time = dayjs(incoming.created_at).format('HH:mm');

    const newMessage: TargetChatDayMsg = {
        id: incoming.id,
        from: incoming.fromUser,
        to: interlocatorId,
        msg: incoming.text,
        time,
        isChecked: incoming.is_read,
    };

    const existingDayIndex = chatDialog.findIndex(d => d.day === day);

    if (existingDayIndex !== -1) {
        const updatedDay = { ...chatDialog[existingDayIndex] };
        updatedDay.dayListMsg = [...updatedDay.dayListMsg, newMessage];

        return [
            ...chatDialog.slice(0, existingDayIndex),
            updatedDay,
            ...chatDialog.slice(existingDayIndex + 1),
        ];
    } else {
        const newDay: TargetChatDay = {
            id: Date.now(), // уникальный ID
            day,
            dayListMsg: [newMessage],
        };

        return [...chatDialog, newDay];
    }
}
