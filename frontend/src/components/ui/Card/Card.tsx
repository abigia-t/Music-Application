import React from 'react';
import styled from '@emotion/styled';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const StyledCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <StyledCard className={className}>{children}</StyledCard>;
};

export default Card;