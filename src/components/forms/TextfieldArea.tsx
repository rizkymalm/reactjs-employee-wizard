import React from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    contentBefore?: any;
    contentAfter?: any;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: any;
    rows?: number;
}

const TextfieldArea = ({
    contentBefore,
    contentAfter,
    fullWidth,
    error,
    helperText,
    rows,
    ...props
}: Props) => {
    return (
        <div className="textfield-area">
            <label htmlFor="textarea">
                <span
                    className={`inline-flex ${error ? 'border-error' : ''} transition-all`}
                    style={{
                        width: fullWidth ? '100%' : 'auto',
                    }}
                >
                    {contentBefore && (
                        <span className="m-auto box-border">
                            {contentBefore}
                        </span>
                    )}
                    <textarea
                        {...props}
                        style={{
                            width: fullWidth ? '100%' : 'auto',
                        }}
                        id="textarea"
                        rows={rows || 2}
                    />
                    {contentAfter && (
                        <span className="m-auto box-border">
                            {contentAfter}
                        </span>
                    )}
                </span>
            </label>
            {error && (
                <div className="helpertext">
                    {helperText}
                </div>
            )}
        </div>
    );
};

export default TextfieldArea;
