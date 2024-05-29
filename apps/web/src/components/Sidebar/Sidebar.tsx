import { useCallback, FC } from 'react';
import { Link } from 'react-router-dom';

import DefaultIcon from '@mui/icons-material/Deblur';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
const Sidebar: FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const close = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const open = useCallback(() => {
    setSidebarOpen(true);
  }, []);
  return (
    <SwipeableDrawer
      anchor="left"
      open={sidebarOpen}
      onClose={close}
      onOpen={open}
      disableBackdropTransition={false}
      swipeAreaWidth={30}
      data-pw="sidebar"
    >
      <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
        <ListItem sx={{ p: 0 }} key={'/'}>
          <ListItemButton component={Link} to={'#'} onClick={close}>
            <ListItemIcon>{<DefaultIcon />}</ListItemIcon>
            <ListItemText>Chat history</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};

export default Sidebar;
