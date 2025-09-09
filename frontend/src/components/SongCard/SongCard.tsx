import React from 'react';
import styled from '@emotion/styled';
import { Song } from '../../types';
import { useAppDispatch } from '../../store';
import { songActions } from '../../store/slices';
import { Card } from '../ui';
import { theme } from '../../theme/theme';

interface SongCardProps {
  song: Song;
}

const SongContainer = styled(Card)`
  margin: 16px 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, ${theme.colors.background.elevated} 0%, #1a1a2e 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  
  &:hover {
    background: linear-gradient(135deg, ${theme.colors.background.hover} 0%, #2a2a4a 100%);
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
`;

const MusicIcon = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${theme.colors.primary};
  backdrop-filter: blur(10px);
`;

const SongHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-right: 50px;
`;

const SongTitle = styled.h3`
  color: ${theme.colors.text.primary};
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
`;

const SongIcon = styled.span`
  font-size: 20px;
  color: ${theme.colors.primary};
  margin-right: 8px;
`;

const SongDetails = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 1.6;
`;

const GenreTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.primary};
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: flex-end;
`;

const ActionButton = styled.button<{ variant: 'edit' | 'delete' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 60px;
  
  ${props => props.variant === 'edit' ? `
    background: rgba(255, 193, 7, 0.15);
    color: #ffc107;
    border: 1px solid rgba(255, 193, 7, 0.3);
    
    &:hover {
      background: rgba(255, 193, 7, 0.25);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 193, 7, 0.2);
    }
  ` : `
    background: rgba(220, 53, 69, 0.15);
    color: #dc3545;
    border: 1px solid rgba(220, 53, 69, 0.3);
    
    &:hover {
      background: rgba(220, 53, 69, 0.25);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
`;

const ButtonIcon = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
`;

// Green-themed AlbumArt
const AlbumArt = styled.div<{ colorIndex: number }>`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;
  color: white;
  float: left;
  font-weight: bold;
  
  // Green color variations
  ${props => {
    const greenColors = [
      '#28a745', // Success green
      '#20c997', // Teal green
      '#38d39f', // Bright green
      '#2ecc71', // Emerald green
      '#27ae60', // Forest green
      '#16a085', // Sea green
      '#10ac84', // Dark green
      '#00b894', // Mint green
    ];
    const color = greenColors[props.colorIndex % greenColors.length];
    return `
      background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
      box-shadow: 0 4px 15px ${color}40;
    `;
  }}
`;

const SongInfo = styled.div`
  overflow: hidden;
`;

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const dispatch = useAppDispatch();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(songActions.openEditSongModal(song));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(songActions.openDeleteSongModal(song));
  };

  // Generate a unique music icon based on song title
  const musicIcons = ['🎵', '🎶', '🎼', '🎹', '🎸', '🎷', '🎺', '🎻', '🥁'];
  const iconIndex = song.title.length % musicIcons.length;
  const musicIcon = musicIcons[iconIndex];

  // Generate consistent color index based on album name
  const colorIndex = song.album.length % 8; // 8 different green shades

  return (
    <SongContainer>
      <MusicIcon>{musicIcon}</MusicIcon>
      
      <SongHeader>
        <SongTitle>
          <SongIcon>🎵</SongIcon>
          {song.title}
        </SongTitle>
        <GenreTag>{song.genre}</GenreTag>
      </SongHeader>
      
      <AlbumArt colorIndex={colorIndex}>
        {song.album.charAt(0).toUpperCase()}
      </AlbumArt>
      
      <SongInfo>
        <SongDetails>
          <strong>Artist:</strong> {song.artist}<br/>
          <strong>Album:</strong> {song.album}
        </SongDetails>
      </SongInfo>
      
      <ActionButtons>
        <ActionButton 
          variant="edit" 
          onClick={handleEdit}
          aria-label={`Edit ${song.title}`}
        >
          <ButtonIcon>✏️</ButtonIcon>
          Edit
        </ActionButton>
        <ActionButton 
          variant="delete" 
          onClick={handleDelete}
          aria-label={`Delete ${song.title}`}
        >
          <ButtonIcon>🗑️</ButtonIcon>
          Delete
        </ActionButton>
      </ActionButtons>
    </SongContainer>
  );
};

export default SongCard;