import React, { useState } from 'react';

interface PropsOption {
    key: any;
    text: string;
    value: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    options: PropsOption[];
    onChange: any;
    onSelected: any;
    contentBefore?: any;
    contentAfter?: any;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: any;
    align?: 'right' | 'left' | 'center' | 'justify' | undefined;
    defaultText?: string;
    nullValue?: boolean;
    nullValueText?: string;
    defaultValue?: string;
}

const TextfieldAutocomplete = ({
    contentBefore,
    contentAfter,
    fullWidth,
    error,
    helperText,
    align,
    options,
    defaultText,
    nullValue,
    nullValueText,
    defaultValue,
    onChange,
    onSelected,
    ...props
}: Props) => {
    const [openOption, setOpenOption] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue || '');
    const [SelectedText, setSelectedText] = useState(defaultText || '');
    const handleSelectvalue = (value: string, text: string) => {
        setSelectedText(text);
        setOpenOption(false);
        setSelectedValue(value);
        onSelected(value);
    };
    const handleInputChange = (event: any) => {
        setSelectedText(event.target.value);
        onChange(event.target.value);
    };
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
                <input
                    className={`focus-visible:outline-none`}
                    style={{
                        width: fullWidth ? '100%' : 'auto',
                        textAlign: align,
                    }}
                    onFocus={() => {
                        setOpenOption(true);
                    }}
                    defaultValue={defaultValue}
                    value={SelectedText}
                    onChange={handleInputChange}
                    {...props}
                />
                <div
                    style={{
                        display: 'none',
                    }}
                >
                    <select value={selectedValue}>
                        {nullValue && nullValueText && (
                            <option key="null" value="">
                                {nullValueText}
                            </option>
                        )}
                        {options.map(option => (
                            <option key={option.key} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
                {contentAfter && (
                    <span className="content">{contentAfter}</span>
                )}
                {openOption && (
                    <div className="autocomplete-option shadow-2">
                        <ul>
                            {nullValue && nullValueText && (
                                <button
                                    onClick={() =>
                                        handleSelectvalue('', nullValueText)
                                    }
                                    type="button"
                                    key="nodataselect"
                                >
                                    <li className="text-text-sm cursor-pointer px-5 py-2 hover:bg-neutral-50">
                                        {nullValueText}
                                    </li>
                                </button>
                            )}
                            {options.map(data => (
                                <button
                                    onClick={() =>
                                        handleSelectvalue(data.value, data.text)
                                    }
                                    type="button"
                                    key={data.value}
                                >
                                    <li className="text-text-sm cursor-pointer px-5 py-2 hover:bg-neutral-50">
                                        {data.text}
                                    </li>
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
