import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { songActions } from '../../store/slices';
import Modal from '../Modal/Modal';
import SongForm from '../SongForm/SongForm';
import { Song } from '../../types/song';

const EditSongModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modals, loading } = useAppSelector(state => state.songs);

  const handleSubmit = (songData: Omit<Song, '_id'> | Song) => {
    if (modals.selectedSong) {
      // Use updateSongStart instead of updateSong
      dispatch(songActions.updateSongStart({
        ...modals.selectedSong,
        ...songData
      }));
    }
  };

  const handleClose = () => {
    dispatch(songActions.closeModals());
  };

  if (!modals.selectedSong) return null;

  return (
    <Modal
      isOpen={modals.editSong}
      onClose={handleClose}
      title="Edit Song"
    >
      <SongForm
        song={modals.selectedSong}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        loading={loading}
      />
    </Modal>
  );
};

export default EditSongModal;