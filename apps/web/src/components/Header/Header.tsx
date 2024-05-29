import { FC } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch } from '@/store';
import { changeMode } from '@/store/user/userSlice';

export interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => setSidebarOpen(!sidebarOpen)}
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Button color="primary">{'Chat App'}</Button>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Divider orientation="vertical" flexItem />
            <IconButton color="primary" size="large" component="a" href={'https://github.com/itsmebins/ai-chat-mono-repo'} target="_blank">
              <GitHubIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Switch theme" arrow>
              <IconButton
                color="primary"
                edge="end"
                size="large"
                onClick={() => dispatch(changeMode())}
                data-pw="theme-toggle"
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
