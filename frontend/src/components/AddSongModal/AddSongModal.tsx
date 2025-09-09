import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { songActions } from '../../store/slices';
import Modal from '../Modal/Modal';
import SongForm from '../SongForm/SongForm';
import { Song } from '../../types/song';

const AddSongModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modals, loading, error } = useAppSelector(state => state.songs);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (songData: Omit<Song, '_id'>) => {
    if (isSubmitting || loading) return;
    
    setIsSubmitting(true);
    try {
      dispatch(songActions.addSongStart(songData));
      // The saga will handle the API call and update state
      // Modal will close automatically when loading becomes false (success)
    } catch (error) {
      console.error('Failed to add song:', error);
    }
  };

  const handleClose = () => {
    if (!loading && !isSubmitting) {
      dispatch(songActions.closeModals());
    }
  };

  // Reset submitting state when modal closes or when error occurs
  useEffect(() => {
    if (!modals.addSong || error) {
      setIsSubmitting(false);
    }
  }, [modals.addSong, error]);

  return (
    <Modal
      isOpen={modals.addSong}
      onClose={handleClose}
      title="Add New Song"
    >
      <SongForm
        onSubmit={handleSubmit}
        onCancel={handleClose}
        loading={loading || isSubmitting}
      />
    </Modal>
  );
};

export default AddSongModal;