import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Song } from '../../types';
import { theme } from '../../theme/theme';

interface SongFormProps {
  song?: Song | null;
  onSubmit: (songData: Omit<Song, '_id'> | Song) => void;
  onCancel: () => void;
  loading?: boolean;
}

const FormContainer = styled.div`
  padding: ${theme.spacing.xl} 0;
`;

const FormTitle = styled.h2`
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.text.primary};
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.text.primary};
  font-size: 14px;
`;

const Input = styled.input`
  background: ${theme.colors.background.card};
  border: 2px solid ${theme.colors.background.hover};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(29, 185, 84, 0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.background.hover};
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  min-width: 100px;
  
  ${props => props.variant === 'secondary' ? `
    background: transparent;
    color: ${theme.colors.text.secondary};
    border: 2px solid ${theme.colors.background.hover};
    
    &:hover:not(:disabled) {
      background: ${theme.colors.background.hover};
      color: ${theme.colors.text.primary};
      transform: translateY(-1px);
    }
  ` : `
    background: ${theme.colors.primary};
    color: ${theme.colors.text.dark};
    
    &:hover:not(:disabled) {
      background: ${theme.colors.primaryDark};
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.md};
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const RequiredIndicator = styled.span`
  color: ${theme.colors.primary};
  margin-left: 2px;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: ${theme.spacing.xs};
  padding: ${theme.spacing.sm};
  background: rgba(255, 107, 107, 0.1);
  border-radius: ${theme.borderRadius.sm};
  border-left: 3px solid #ff6b6b;
`;

const SongForm: React.FC<SongFormProps> = ({ song, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album,
        genre: song.genre
      });
    }
  }, [song]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.artist.trim()) newErrors.artist = 'Artist is required';
    if (!formData.album.trim()) newErrors.album = 'Album is required';
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    if (!validateForm()) return;
    
    const songData = song ? { ...song, ...formData } : formData;
    onSubmit(songData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors(prev => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      }));
    }
  };

  return (
    <FormContainer>
      <FormTitle>{song ? 'Edit Song' : 'Add New Song'}</FormTitle>
      
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <Label htmlFor="title">
            Title <RequiredIndicator>*</RequiredIndicator>
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={loading}
            placeholder="Enter song title"
          />
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="artist">
            Artist <RequiredIndicator>*</RequiredIndicator>
          </Label>
          <Input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={loading}
            placeholder="Enter artist name"
          />
          {errors.artist && <ErrorMessage>{errors.artist}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="album">
            Album <RequiredIndicator>*</RequiredIndicator>
          </Label>
          <Input
            type="text"
            id="album"
            name="album"
            value={formData.album}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={loading}
            placeholder="Enter album name"
          />
          {errors.album && <ErrorMessage>{errors.album}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="genre">
            Genre <RequiredIndicator>*</RequiredIndicator>
          </Label>
          <Input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={loading}
            placeholder="Enter genre"
          />
          {errors.genre && <ErrorMessage>{errors.genre}</ErrorMessage>}
        </FormGroup>

        <ButtonGroup>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onCancel} 
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Saving...' : (song ? 'Update Song' : 'Add Song')}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default SongForm;