'use client';

import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light px-6 py-3',
    secondary: 'bg-white text-primary border border-primary hover:bg-secondary px-6 py-3',
    text: 'text-primary hover:text-primary-light bg-transparent',
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  
  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;