// src/components/MessageList.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useChat } from '@/contexts/useChat';
import { ChatMessage } from '@baserepo/utils';
import MessageItem from './MessageItem';

export const MessageList: React.FC = () => {
  const { messages } = useChat();

  interface Parameters {
    sentiment?: string;
    urgency?: number;
  }

  const messages1 = [
    {
      id: 1,
      chatID: 'chat1',
      timestamp: Date.now() - 100000,
      role: 'user',
      content: 'Hello, how can I help you today?',
    },
    {
      id: 2,
      chatID: 'chat1',
      parentID: 'msg1',
      timestamp: Date.now() - 50000,
      role: 'assistant',
      model: 'gpt-3.5',
      content: 'I am looking to buy a new laptop. Can you recommend something?',
      parameters: {
        sentiment: 'positive',
        urgency: 5,
      },
    },
    {
      id: 3,
      chatID: 'chat1',
      parentID: 'msg2',
      timestamp: Date.now() - 30000,
      role: 'user',
      content: 'Sure, I can help with that. What are your main requirements?',
    },
    {
      id: 4,
      chatID: 'chat1',
      parentID: 'msg3',
      timestamp: Date.now() - 10000,
      role: 'assistant',
      model: 'gpt-4',
      content:
        'I need something powerful for graphic design, preferably with a high-resolution display and at least 16 GB of RAM.',
      done: true,
    },
  ];

  if (messages.length == 0) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          paddingBottom: '5vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: '"Work Sans", sans-serif',
          lineHeight: 1.7,
          gap: 2,
        }}
      >
        <Typography variant="body1">Hello, how can I help you today?</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        p: 2,
      }}
    >
      {messages.map((message: ChatMessage) => (
        <Box
          key={message.id}
          sx={{
            marginBottom: 2,
            padding: 2,
            borderRadius: '10px',
          }}
        >
          <MessageItem {...message} />
        </Box>
      ))}
    </Box>
  );
};
