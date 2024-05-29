// src/context/ChatContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ChatContextType } from '@/components/Chat/types';
import { ChatMessage } from '@baserepo/utils';
import { apiCall } from '@/lib/api/apiCall';
import { API_ROUTES } from '@baserepo/utils';
import { setMessage } from '@/store/messageSlice';
import { useAppDispatch } from '@/store';
import { useToast, AlertType } from "@/contexts/useToast";

const defaultContextValue: ChatContextType = {
  messages: [],
  onNewMessage: () => {},
  loading: false,
};

export const ChatContext = createContext<ChatContextType>(defaultContextValue);

type ChatProviderProps = {
  children: ReactNode;
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  return context;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { setToastAlert } = useToast();
  const onNewMessage = useCallback(
    async (content: string) => {
      const newUserMessage: ChatMessage = {
        id: `${messages.length + 1}`, // Simple incrementing ID
        content: content,
        role: 'user',
        chatID: `chat-${messages.length + 1}`,
        timestamp: Date.now(),
      };
      setLoading(true);

      try {
        const response = await apiCall<{ prompt: string }, ChatMessage>(API_ROUTES.PROCESS_USER_AUERy, {
          method: 'POST',
          body: JSON.stringify({
            prompt: content,
          }),
          signal: AbortSignal.timeout(60000), // 1 Minute
        });
        if (response.success && response.data) {
          const newMessage = response.data as ChatMessage;
          setMessages((prevMessages) => [...prevMessages, newUserMessage, newMessage]);
          dispatch(setMessage(''));
        } else {
          const error =
          response?.errorMsg || "API request failed. Please try again later."
          setToastAlert({
            type: AlertType.ERROR,
            title: error,
          });
        }
      } catch(e) {
        setToastAlert({
          type: AlertType.ERROR,
          title: "API request failed. Please try again later.",
        });
      }

      setLoading(false);
    },
    [messages],
  );

  return <ChatContext.Provider value={{ messages, onNewMessage, loading }}>{children}</ChatContext.Provider>;
};
