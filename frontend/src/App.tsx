import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { songActions } from './store/slices';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/theme';
import styled from '@emotion/styled';
import StatisticsCard from './components/StatisticsCard/StatisticsCard';
import AddSongModal from './components/AddSongModal/AddSongModal';
import EditSongModal from './components/EditSongModal/EditSongModal';
import DeleteSongModal from './components/DeleteSongModal/DeleteSongModal';
import SongCard from './components/SongCard/SongCard';
import FilterBar from './components/FilterBar/FilterBar'; // Import the FilterBar

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.main};
  color: ${theme.colors.text.primary};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const Header = styled.header`
  background: ${theme.colors.background.elevated};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.xl};
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

const MainContent = styled.main`
  padding: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }
`;

const Section = styled.section`
  background: ${theme.colors.background.card};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: 20px;
  font-weight: 600;
`;

const SongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

const AddButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.text.dark};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.colors.primaryDark};
    transform: scale(1.05);
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: ${theme.borderRadius.lg};
  max-width: 600px;
  margin: ${theme.spacing.xl} auto;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-bottom: ${theme.spacing.lg};
  font-size: 16px;
`;

const RetryButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.primary};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.dark};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.text.secondary};
  font-size: 18px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background.elevated};
  border-radius: ${theme.borderRadius.lg};
  margin-top: ${theme.spacing.lg};
`;

const EmptyStateText = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: 16px;
`;

const FilterSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const App: React.FC = () => {
  const { songs, statistics, loading, error, filters } = useAppSelector(state => state.songs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch songs with current filters when component mounts or filters change
    dispatch(songActions.fetchSongsStart(filters));
    dispatch(songActions.fetchStatisticsStart());
  }, [dispatch, filters]); // Added filters to dependency array

  const songsArray = Array.isArray(songs) ? songs : [];

  const handleAddClick = () => {
    dispatch(songActions.openAddSongModal());
  };

  // Check if there are active filters
  const hasActiveFilters = Object.keys(filters || {}).length > 0;

  if (loading && songsArray.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header>
            <HeaderContent>
              <Logo>MusicHub</Logo>
            </HeaderContent>
          </Header>
          <MainContent>
            <LoadingContainer>
              Loading your music collection...
            </LoadingContainer>
          </MainContent>
        </AppContainer>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header>
            <HeaderContent>
              <Logo>MusicHub</Logo>
            </HeaderContent>
          </Header>
          <MainContent>
            <ErrorContainer>
              <ErrorMessage>{error}</ErrorMessage>
              <RetryButton
                onClick={() => {
                  dispatch(songActions.fetchSongsStart(filters));
                  dispatch(songActions.fetchStatisticsStart());
                }}
              >
                Try Again
              </RetryButton>
            </ErrorContainer>
          </MainContent>
        </AppContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header>
          <HeaderContent>
            <Logo>MusicHub</Logo>
          </HeaderContent>
        </Header>
        
        <MainContent>
          {/* Add FilterBar component */}
          <FilterSection>
            <FilterBar />
          </FilterSection>

          <ContentGrid>
            <div>
              <Section>
                <ActionBar>
                  <SectionTitle>
                    Your Music Library ({songsArray.length} songs)
                    {hasActiveFilters && ' (Filtered)'}
                  </SectionTitle>
                  <AddButton onClick={handleAddClick}>
                    ＋ Add New Song
                  </AddButton>
                </ActionBar>

                <SongGrid>
                  {songsArray.map(song => (
                    <SongCard key={song._id} song={song} />
                  ))}
                </SongGrid>
                
                {songsArray.length === 0 && (
                  <EmptyState>
                    {hasActiveFilters ? (
                      <>
                        <EmptyStateText>No songs match your filters</EmptyStateText>
                        <EmptyStateText>Try adjusting your search criteria</EmptyStateText>
                      </>
                    ) : (
                      <>
                        <EmptyStateText>No songs found in your library</EmptyStateText>
                        <EmptyStateText>Add your first song to get started!</EmptyStateText>
                      </>
                    )}
                  </EmptyState>
                )}
              </Section>
            </div>

            <div>
              <Section>
                <SectionTitle>Statistics</SectionTitle>
                <StatisticsCard statistics={statistics} loading={loading} />
              </Section>
            </div>
          </ContentGrid>

          {/* Modal Components */}
          <AddSongModal />
          <EditSongModal />
          <DeleteSongModal />
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;