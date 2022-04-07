import { Chat } from '@/services/ChatsService';

type VMessengerListItemBase = Partial<Pick<Chat, 'lastMessage'>> & Pick<Chat, 'conversation'>;

export interface VMessengerListItemType extends VMessengerListItemBase {
  label?: string,
}

export type VMessengerListItemsType = Array<VMessengerListItemType>;
