import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { songActions } from '../../store/slices';
import Modal from '../Modal/Modal';
import SongForm from '../SongForm/SongForm';
import { Song } from '../../types/song';
import styled from '@emotion/styled';

const ErrorMessage = styled.div`
  color: #dc3545;
  margin: 10px 0;
  padding: 8px;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 4px;
  font-size: 14px;
`;

const EditSongModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modals, loading, error } = useAppSelector(state => state.songs);

  const handleSubmit = (songData: Omit<Song, '_id'> | Song) => {
    if (modals.selectedSong && modals.selectedSong._id) {
      console.log('EditSongModal: Submitting update for song:', modals.selectedSong._id, 'with data:', songData);
      
      dispatch(songActions.updateSongStart({
        _id: modals.selectedSong._id,
        ...songData
      } as Song));
    }
  };

  const handleClose = () => {
    if (!loading) {
      dispatch(songActions.closeModals());
    }
  };

  if (!modals.selectedSong) return null;

  return (
    <Modal
      isOpen={modals.editSong}
      onClose={handleClose}
      title="Edit Song"
      disableClose={loading}
    >
      {error && (
        <ErrorMessage>
          Error: {error}
        </ErrorMessage>
      )}
      
      <SongForm
        song={modals.selectedSong}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        loading={loading}
        // REMOVED: submitText={loading ? 'Updating...' : 'Update Song'}
      />
    </Modal>
  );
};

export default EditSongModal;