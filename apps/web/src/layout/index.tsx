import { FC, useState, ReactNode } from 'react';
import { Container } from '@mui/material';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Container sx={{ py: 2, position: 'relative' }}>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div>{children}</div>
    </Container>
  );
};

export default Layout;
