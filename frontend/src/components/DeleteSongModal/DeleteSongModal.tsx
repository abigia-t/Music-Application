import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { songActions } from '../../store/slices';
import Modal from '../Modal/Modal';
import styled from '@emotion/styled';

// Add the missing ButtonContainer styled component
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  min-width: 80px;
  transition: all 0.2s ease;
`;

const CancelButton = styled(Button)`
  background: #6c757d;
  color: white;
  
  &:hover:not(:disabled) {
    background: #5a6268;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ConfirmDeleteButton = styled(Button)`
  background: #dc3545;
  color: white;
  
  &:hover:not(:disabled) {
    background: #c82333;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin: 10px 0;
  padding: 8px;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 4px;
  font-size: 14px;
`;

const LoadingText = styled.div`
  color: #6c757d;
  font-style: italic;
  margin: 10px 0;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  margin: 10px 0;
  padding: 12px;
  background: rgba(40, 167, 69, 0.1);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  border: 1px solid rgba(40, 167, 69, 0.2);
`;

const SongInfo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 6px;
  margin: 15px 0;
  border-left: 3px solid #dc3545;
`;

const SongTitle = styled.div`
  font-weight: 600;
  color: #fff;
  margin-bottom: 5px;
  font-size: 16px;
`;

const SongArtist = styled.div`
  color: #a0a0a0;
  font-size: 14px;
`;

const DeleteSongModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modals, loading, error } = useAppSelector(state => state.songs);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deletedSongName, setDeletedSongName] = useState('');

  useEffect(() => {
    // Reset success state when modal opens
    if (modals.deleteSong) {
      setShowSuccess(false);
      setDeletedSongName('');
    }
  }, [modals.deleteSong]);

  useEffect(() => {
    // Show success message after successful deletion
    if (showSuccess) {
      const timer = setTimeout(() => {
        dispatch(songActions.closeModals());
        setShowSuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, dispatch]);

  const handleConfirmDelete = () => {
    if (modals.selectedSong?._id) {
      console.log('Modal: Directly deleting song with ID:', modals.selectedSong._id);
      setDeletedSongName(modals.selectedSong.title);
      
      // Use deleteSong action directly
      dispatch(songActions.deleteSong(modals.selectedSong._id));
      setShowSuccess(true);
    }
  };

  const handleClose = () => {
    dispatch(songActions.closeModals());
  };

  if (!modals.selectedSong) return null;

  return (
    <Modal
      isOpen={modals.deleteSong}
      onClose={handleClose}
      title={showSuccess ? "Success!" : "Confirm Deletion"}
    >
      <div>
        {showSuccess ? (
          <>
            <SuccessMessage>
              ✅ Successfully deleted
            </SuccessMessage>
            <SongInfo>
              <SongTitle>"{deletedSongName}"</SongTitle>
              <SongArtist>has been removed from your library</SongArtist>
            </SongInfo>
            <div style={{ textAlign: 'center', color: '#6c757d', fontSize: '13px' }}>
              Closing automatically...
            </div>
          </>
        ) : (
          <>
            <p>Are you sure you want to delete this song?</p>
            
            <SongInfo>
              <SongTitle>{modals.selectedSong.title}</SongTitle>
              <SongArtist>by {modals.selectedSong.artist}</SongArtist>
              {modals.selectedSong.album && (
                <div>Album: {modals.selectedSong.album}</div>
              )}
              {modals.selectedSong.genre && (
                <div>Genre: {modals.selectedSong.genre}</div>
              )}
            </SongInfo>

            {error && (
              <ErrorMessage>
                Error: {error}
              </ErrorMessage>
            )}

            <ButtonContainer>
              <CancelButton onClick={handleClose}>
                Cancel
              </CancelButton>
              <ConfirmDeleteButton onClick={handleConfirmDelete}>
                Yes, Delete
              </ConfirmDeleteButton>
            </ButtonContainer>
          </>
        )}
      </div>
    </Modal>
  );
};

export default DeleteSongModal;