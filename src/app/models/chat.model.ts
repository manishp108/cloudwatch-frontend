export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'video' | 'file';
}

export interface ChatUser {
  userId: string;
  username: string;
  profilePic: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  createdAt: Date;
  updatedAt: Date;
}