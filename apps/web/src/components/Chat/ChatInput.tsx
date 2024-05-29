import { useCallback, useMemo } from 'react';
import { IconButton, TextField, CircularProgress, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { useChat } from '@/contexts/useChat';
import { useAppDispatch, useAppSelector } from '@/store';
import { setMessage } from '@/store/messageSlice';

interface MessageInputProps {
  disabled?: boolean;
}

const ChatInput: React.FC<MessageInputProps> = (props) => {
  const message = useAppSelector((state) => state.message.message);

  const { loading, onNewMessage } = useChat();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setMessage(event.target.value));
    },
    [dispatch],
  );

  const onSubmit = useCallback(async () => {
    await onNewMessage(message);
  }, [message, dispatch, navigate]);

  const hotkeyHandler = useMemo(() => {
    // Implement hotkey functionalities similar to before
    return (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' && !event.ctrlKey) {
        onSubmit();
        event.preventDefault();
      }
    };
  }, [onSubmit]);

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
        margin: 3,
      }}
    >
      <TextField
        disabled={props.disabled || loading}
        id="message-input"
        multiline
        minRows={3}
        maxRows={12}
        placeholder="Enter a message here..."
        value={message}
        onChange={onChange}
        onKeyDown={hotkeyHandler}
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {loading ? (
                <CircularProgress size="small" sx={{ mr: 1 }} color='primary' />
              ) : (
                <IconButton onClick={onSubmit} size="large" color='primary'>
                  <SendIcon style={{ fontSize: '1.25rem' }} />
                </IconButton>
              )}
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default ChatInput;
