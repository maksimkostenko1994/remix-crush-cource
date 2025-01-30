import React, { ComponentProps, ReactElement } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
    variant?: 'primary' | 'danger' | 'ghost';
    children: React.ReactNode;
}

export function Button({
                           variant = 'primary',
                           className = '',
                           children,
                           ...props
                       }: ButtonProps): ReactElement {
    const baseStyles = 'px-4 py-2 rounded-md focus:outline-none focus:ring-2';
    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
        ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
    };

    return (
        <button type="button" {...props} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</button>
    );
}