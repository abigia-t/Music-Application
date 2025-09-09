import React from 'react';
import styled from '@emotion/styled';
import { SongStatistics } from '../../types';
import { theme } from '../../theme/theme';

interface StatisticsCardProps {
  statistics: SongStatistics | null;
  loading?: boolean;
}

const StatsContainer = styled.div`
  background: ${theme.colors.background.card};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  margin: ${theme.spacing.xl} 0;
  box-shadow: ${theme.shadows.md};
`;

const StatsTitle = styled.h2`
  margin: 0 0 ${theme.spacing.xl} 0;
  color: ${theme.colors.text.primary};
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background.elevated};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.sm};
  }
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const ChartContainer = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.background.hover};
`;

const ChartTitle = styled.h3`
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: 18px;
  font-weight: 600;
`;

const ChartBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${theme.spacing.sm} 0;
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.elevated};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.colors.background.hover};
  }
`;

const GenreName = styled.span`
  color: ${theme.colors.text.primary};
  font-weight: 500;
  min-width: 100px;
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  width: 60%;
  min-width: 200px;
`;

const Bar = styled.div<{ percentage: number }>`
  height: 12px;
  background: ${theme.colors.gradient.primary};
  border-radius: 6px;
  width: ${props => props.percentage}%;
  min-width: 30px;
  transition: width 0.5s ease-in-out;
`;

const BarStats = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: 14px;
  min-width: 60px;
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

const LoadingText = styled.div`
  color: ${theme.colors.text.secondary};
  text-align: center;
  padding: ${theme.spacing.xl};
  font-style: italic;
`;

const EmptyState = styled.div`
  color: ${theme.colors.text.secondary};
  text-align: center;
  padding: ${theme.spacing.xl};
`;

const StatisticsCard: React.FC<StatisticsCardProps> = ({ statistics, loading }) => {
  if (loading) {
    return (
      <StatsContainer>
        <StatsTitle>Library Statistics</StatsTitle>
        <LoadingText>Loading statistics...</LoadingText>
      </StatsContainer>
    );
  }

  if (!statistics) {
    return (
      <StatsContainer>
        <StatsTitle>Library Statistics</StatsTitle>
        <EmptyState>No statistics available</EmptyState>
      </StatsContainer>
    );
  }

  // Calculate percentages for genres
  const genresWithPercentages = statistics.songsPerGenre.map(genre => ({
    ...genre,
    percentage: Math.round((genre.count / statistics.totalSongs) * 100)
  })).sort((a, b) => b.count - a.count); // Sort by count descending

  return (
    <StatsContainer>
      <StatsTitle>Library Statistics</StatsTitle>
      
      <StatsGrid>
        <StatItem>
          <StatNumber>{statistics.totalSongs}</StatNumber>
          <StatLabel>Total Songs</StatLabel>
        </StatItem>
        
        <StatItem>
          <StatNumber>{statistics.totalArtists}</StatNumber>
          <StatLabel>Artists</StatLabel>
        </StatItem>
        
        <StatItem>
          <StatNumber>{statistics.totalAlbums}</StatNumber>
          <StatLabel>Albums</StatLabel>
        </StatItem>
        
        <StatItem>
          <StatNumber>{statistics.totalGenres}</StatNumber>
          <StatLabel>Genres</StatLabel>
        </StatItem>
      </StatsGrid>

      {genresWithPercentages.length > 0 && (
        <ChartContainer>
          <ChartTitle>Songs by Genre</ChartTitle>
          {genresWithPercentages.map(genre => (
            <ChartBar key={genre._id}>
              <GenreName>{genre._id}</GenreName>
              <BarContainer>
                <Bar percentage={genre.percentage} />
                <BarStats>
                  {genre.count} ({genre.percentage}%)
                </BarStats>
              </BarContainer>
            </ChartBar>
          ))}
        </ChartContainer>
      )}

      {/* Add more statistics sections here if needed */}
    </StatsContainer>
  );
};

export default StatisticsCard;