import '../../styles/button.css';

import { Icon } from '@iconify/react';
import type { JSX } from 'react';
import React from 'react';

import Spinner from './Spinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    type: JSX.IntrinsicElements['button']['type'];
    size: 'sm' | 'md' | 'lg';
    variant: 'contained' | 'texted' | 'outlined';
    icon?: string;
    iconSize?: number;
    fullWidth?: boolean;
    loading?: boolean;
}

const Button = ({
    text,
    type,
    variant,
    size,
    icon,
    iconSize,
    fullWidth,
    loading,
    className,
    ...props
}: Props) => {
    const btnSize =
        size === 'sm' ? 'size-sm' : size === 'md' ? 'size-md' : 'size-lg';
    return variant === 'contained' ? (
        <button
            className={`button contained transition-all ${btnSize} ${className}`}
            style={{
                width: fullWidth ? '100%' : 'auto',
            }}
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            {...props}
        >
            {icon && (
                <Icon
                    icon={`${icon}`}
                    width={iconSize}
                    height={iconSize}
                    className="m-auto"
                />
            )}
            {text}
            {loading && <Spinner />}
        </button>
    ) : variant === 'outlined' ? (
        <button
            className={`button outline ${btnSize}`}
            style={{
                width: fullWidth ? '100%' : 'auto',
            }}
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            {...props}
        >
            {icon && (
                <Icon
                    icon={`${icon}`}
                    width={iconSize}
                    height={iconSize}
                    className="m-auto"
                />
            )}
            {text}
            {loading && <Spinner />}
        </button>
    ) : (
        <button
            className={`button texted transition-all ${btnSize}`}
            style={{
                width: fullWidth ? '100%' : 'auto',
            }}
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            {...props}
        >
            {icon && (
                <Icon
                    icon={`${icon}`}
                    width={iconSize}
                    height={iconSize}
                    className="m-auto"
                />
            )}
            {text}
            {loading && <Spinner />}
        </button>
    );
};

export default Button;
