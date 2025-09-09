import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../store';
import { songActions } from '../../store/slices';

const FabButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #4cc9f0;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: #3aa8d4;
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const FAB: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(songActions.openAddSongModal());
  };

  return (
    <FabButton onClick={handleClick} aria-label="Add new song">
      +
    </FabButton>
  );
};

export default FAB;