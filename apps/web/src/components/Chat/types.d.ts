export interface ChatContextType {
  messages: Message[];
  onNewMessage: (content: string) => void;
  loading: boolean;
}
