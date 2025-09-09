import React from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<{ variant: string }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
  margin: 4px;
  
  /* Variant styles */
  background-color: ${props => {
    switch (props.variant) {
      case 'secondary': return '#6c757d';
      case 'danger': return '#dc3545';
      default: return '#007bff';
    }
  }};
  
  color: white;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  /* Glassmorphism effect */
  backdrop-filter: blur(10px);
  background: ${props => {
    switch (props.variant) {
      case 'secondary': return 'rgba(108, 117, 125, 0.8)';
      case 'danger': return 'rgba(220, 53, 69, 0.8)';
      default: return 'rgba(0, 123, 255, 0.8)';
    }
  }};
`;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button'
}) => {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default Button;