import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../theme/theme';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.main};
  color: ${theme.colors.text.primary};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const MainContent = styled.main`
  padding: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  background: ${theme.colors.background.elevated};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  backdrop-filter: blur(10px);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: ${theme.colors.primary};
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Logo>MusicHub</Logo>
        </HeaderContent>
      </Header>
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;