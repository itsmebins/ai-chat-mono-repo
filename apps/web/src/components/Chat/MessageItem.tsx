import { useCallback } from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { ChatMessage } from '@baserepo/utils';

export default function MessageItem({ timestamp, role, content }: ChatMessage) {
  const getRoleName = useCallback((role: string) => {
    switch (role) {
      case 'user':
        return 'You';
      case 'assistant':
        return 'ChatGPT';
      case 'system':
        return 'System';
      default:
        return role;
    }
  }, []);

  const roleName = getRoleName(role);
  const avatar = roleName ? roleName.substring(0, 2) : 'You';
  // const time = new Date(timestamp).toLocaleTimeString();
  const position = role === 'user' ? 'right' : 'left';
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: 'flex', flexDirection: position === 'left' ? 'row' : 'row-reverse' }}>
        {position === 'left' && <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{avatar.toUpperCase()}</Avatar>}
        <Typography textAlign={position}>{content}</Typography>
      </Grid>
    </Grid>
  );
}
