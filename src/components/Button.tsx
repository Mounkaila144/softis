import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  title,
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition duration-200 ease-in-out';
  
  const variantStyles = {
    primary: 'bg-turquoise-500 text-white hover:bg-turquoise-600 focus:ring-2 focus:ring-turquoise-300',
    secondary: 'bg-turquoise-400 text-white hover:bg-turquoise-600 focus:ring-2 focus:ring-turquoise-300',
    outline: 'bg-transparent border border-turquoise-500 text-turquoise-500 hover:bg-turquoise-100',
    gold: 'bg-turquoise-400 text-primary-900 hover:bg-turquoise-500 focus:ring-2 focus:ring-gold-300',
    warning: 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-2 focus:ring-amber-300',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
export type { ButtonProps };