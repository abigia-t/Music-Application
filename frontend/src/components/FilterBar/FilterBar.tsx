import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../store';
import { songActions } from '../../store/slices';
import { theme } from '../../theme/theme';

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  background: ${theme.colors.background.elevated};
  padding: 20px;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${theme.shadows.md};
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  color: ${theme.colors.text.secondary};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const FilterInput = styled.input`
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.text.primary};
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(76, 201, 240, 0.2);
  }
  
  &::placeholder {
    color: ${theme.colors.text.secondary};
    opacity: 0.7;
  }
`;

const FilterButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.text.dark};
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  align-self: flex-end;
  margin-top: 24px;
  
  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ClearButton = styled.button`
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.md};
  background: transparent;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  align-self: flex-end;
  margin-top: 24px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.text.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-self: flex-end;
  margin-top: 24px;
`;

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState({
    genre: '',
    artist: '',
    album: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    // Remove empty filters
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim() !== '')
    );
    
    dispatch(songActions.setFilters(activeFilters));
    dispatch(songActions.fetchSongsStart(activeFilters));
  };

  const clearFilters = () => {
    setFilters({ genre: '', artist: '', album: '' });
    dispatch(songActions.setFilters({}));
    dispatch(songActions.fetchSongsStart());
  };

  const hasActiveFilters = Object.values(filters).some(value => value.trim() !== '');

  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel>Artist</FilterLabel>
        <FilterInput
          placeholder="Search artists..."
          value={filters.artist}
          onChange={(e) => handleFilterChange('artist', e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
        />
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel>Album</FilterLabel>
        <FilterInput
          placeholder="Search albums..."
          value={filters.album}
          onChange={(e) => handleFilterChange('album', e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
        />
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel>Genre</FilterLabel>
        <FilterInput
          placeholder="Search genres..."
          value={filters.genre}
          onChange={(e) => handleFilterChange('genre', e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
        />
      </FilterGroup>

      <ButtonGroup>
        {hasActiveFilters && (
          <ClearButton onClick={clearFilters}>
            Clear
          </ClearButton>
        )}
        <FilterButton onClick={applyFilters}>
          Search
        </FilterButton>
      </ButtonGroup>
    </FilterContainer>
  );
};

export default FilterBar;