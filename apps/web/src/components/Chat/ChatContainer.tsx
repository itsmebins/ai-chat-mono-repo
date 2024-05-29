// src/components/ChatContainer.tsx
import React from 'react';
import { Box } from '@mui/material';
import { MessageList } from './MessageList';
import ChatInput from './ChatInput';
import { ChatProvider } from '@/contexts/useChat';

export const ChatContainer: React.FC = () => {
  return (
    <ChatProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh', // Adjust height as needed
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <MessageList />
        <ChatInput />
      </Box>
    </ChatProvider>
  );
};
