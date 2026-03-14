import React, { useEffect, useState } from 'react';

interface PropsOption {
    key: any;
    text: string;
    value: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    options: PropsOption[];
    name: string;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: any;
    align?: 'right' | 'left' | 'center';
    contentBefore?: any;
    contentAfter?: any;
    onSearch: (value: string) => void;
    onSelected: (value: string) => void;
    defaultVal?: string;
}

const TextfieldAutocomplete = ({
    options,
    name,
    fullWidth,
    error,
    helperText,
    align,
    contentBefore,
    contentAfter,
    defaultVal,
    onSearch,
    onSelected,
    ...props
}: Props) => {
    const [openOption, setOpenOption] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    useEffect(() => {
        if (defaultVal) {
            setSelectedText(defaultVal);
        }
    }, [defaultVal]);

    return (
        <div className="autocomplete">
            <span
                className={`autocomplete-wrapper transition-all ${error ? 'border-error' : ''}`}
                style={{
                    width: fullWidth ? '100%' : 'auto',
                }}
            >
                {contentBefore && (
                    <span className="content">{contentBefore}</span>
                )}
                <div
                    style={{
                        width: '80%',
                        flexGrow: 1,
                        position: 'relative',
                        display: 'flex',
                    }}
                >
                    <input
                        className="focus-visible:outline-none"
                        style={{
                            width: fullWidth ? '100%' : 'auto',
                            textAlign: align,
                        }}
                        value={selectedText}
                        onChange={(e: any) => {
                            setSelectedText(e.target.value);
                            onSearch(e.target.value);
                        }}
                        onFocus={() => {
                            setOpenOption(true);
                        }}
                        // onBlur={() => setOpenOption(false)}
                        {...props}
                    />
                </div>
                {contentAfter && (
                    <span className="content">{contentAfter}</span>
                )}
                {openOption && (
                    <div
                        className="autocomplete-option"
                        style={{ backgroundColor: '#CFCFCF' }}
                    >
                        <ul>
                            {options.map(data => (
                                <button type="button" key={data.value}>
                                    <label
                                        htmlFor={data.value}
                                        onChange={(e: any) => {
                                            onSelected(e.target.value);
                                            setSelectedText(e.target.value);
                                            setOpenOption(false);
                                        }}
                                    >
                                        <li>
                                            <input
                                                type="radio"
                                                name={name}
                                                value={data.value}
                                                id={data.value}
                                                style={{
                                                    display: 'none',
                                                }}
                                            />{' '}
                                            {data.text}
                                        </li>
                                    </label>
                                </button>
                            ))}
                        </ul>
                    </div>
                )}
            </span>
            {error && <div className="helpertext">{helperText}</div>}
        </div>
    );
};

export default TextfieldAutocomplete;
