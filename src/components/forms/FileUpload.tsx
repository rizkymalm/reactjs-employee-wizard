import '../../styles/form.css';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';

interface Props {
    name: string;
    multiple?: boolean;
}

const FileUpload = ({ name, multiple = false }: Props) => {
    const [imagePreview, setImagePreview] = useState('');
    const handleChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImagePreview(fileURL);
        }
    };
    const handleRemoveFile = () => {
        setImagePreview('');
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
