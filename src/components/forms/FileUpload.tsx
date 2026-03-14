import '../../styles/form.css';

import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';

import { convertToBase64 } from '../../utils/convertbase64';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    multiple?: boolean;
    onSelected: any;
    defaultImage?: string;
}

const FileUpload = ({
    name,
    multiple = false,
    onSelected,
    defaultImage,
    ...props
}: Props) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    useEffect(() => {
        if (defaultImage) {
            setImagePreview(defaultImage);
        }
    }, [defaultImage]);
    const handleChange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setImagePreview(base64);
            onSelected(base64);
        }
    };
    const handleRemoveFile = () => {
        setImagePreview('');
        onSelected('');
    };
    return (
        <div className="file-upload">
            <label htmlFor="photo">
                <span>
                    <Icon
                        icon="mdi:file-image-outline"
                        width={28}
                        height={28}
                    />
                </span>
                <input
                    name={name}
                    type="file"
                    id="photo"
                    accept="image/*"
                    multiple={multiple}
                    onChange={handleChange}
                    {...props}
                />
            </label>
            {imagePreview && (
                <div className="preview">
                    <button
                        className="close-preview"
                        type="button"
                        onClick={handleRemoveFile}
                    >
                        <Icon icon="mdi:trash" width={16} height={16} />
                    </button>
                    <div>
                        <div
                            className="preview-image"
                            style={{
                                backgroundImage: `url('${imagePreview}')`,
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
