import '../../styles/form.css';

import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    contentBefore?: any;
    contentAfter?: any;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: any;
    placeholder?: string;
}

const Textfield = ({
    contentBefore,
    contentAfter,
    fullWidth,
    error,
    helperText,
    placeholder,
    ...props
}: Props) => {
    return (
        <div
            className="textfield"
            style={{
                width: fullWidth ? '100%' : 'auto',
            }}
        >
            <span
                className={`${error ? 'border-error' : ''} wrapper transition-all`}
            >
                {contentBefore && (
                    <span className="content-texfield">{contentBefore}</span>
                )}
                <input type="text" placeholder={placeholder} {...props} />
                {contentAfter && (
                    <span className="content-texfield">{contentAfter}</span>
                )}
            </span>
            {error && <div className="helpertext">{helperText}</div>}
        </div>
    );
};

export default Textfield;
