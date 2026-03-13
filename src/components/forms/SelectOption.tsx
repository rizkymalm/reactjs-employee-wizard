import { Icon } from '@iconify/react';
import React, { useId } from 'react';

interface PropsOption {
    key: any;
    text: string;
    value: any;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    options: PropsOption[];
    error?: boolean;
    helperText?: any;
    fullWidth?: boolean;
    label?: string;
    nullValue?: boolean;
    nullValueText?: string;
}

const SelectOption = ({
    label,
    options,
    error,
    helperText,
    fullWidth,
    nullValue,
    nullValueText,
    ...props
}: Props) => {
    const selectId = useId();
    return (
        <div
            className={`select-option`}
            style={{
                width: fullWidth ? '100%' : 'auto',
            }}
        >
            <label htmlFor={`${selectId}-outline`}>{label}</label>
            <span className={`select-wrapper transition-all ${error ? 'border-error' : ''}`}>
                <select {...props}>
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
                <span className="arrow-select pointer-events-none absolute right-2 block">
                    <Icon
                        icon="fluent:chevron-down-20-regular"
                        width={20}
                        height={20}
                    />
                </span>
            </span>

            {error && (
                <div className="helpertext">
                    {helperText}
                </div>
            )}
        </div>
    );
};

export default SelectOption;
