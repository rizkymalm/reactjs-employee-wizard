import {
    FileUpload,
    TextfieldArea,
    SelectOption,
    TextfieldAutocomplete,
} from '../../components/forms';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons';
import { Form, FormikProvider, useFormik } from 'formik';
import { detailInfoSchema } from '../../utils/validation';
import { createBasicInfo } from '../../services/basicInfo.service';
import { DetailInfo } from '../../lib/types';
import { getLocation } from '../../services/detail.service';

interface PropsOption {
    key: any;
    text: string;
    value: string;
}

const employementType = [
    {
        key: 'fullTime',
        value: 'fulltime',
        text: 'Full-time',
    },
    {
        key: 'partTime',
        value: 'partTime',
        text: 'Part-time',
    },
    {
        key: 'contract',
        value: 'contract',
        text: 'Contract',
    },
    {
        key: 'intern',
        value: 'intern',
        text: 'Intern',
    },
];

const WizardStep2 = () => {
    const [location, setLocation] = useState<PropsOption[]>([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        async function getLocationData() {
            let data: PropsOption[] = [];
            const loc: any = await getLocation({
                'name:contains': search,
            });
            for (let i = 0; i < loc.length; i++) {
                data.push({
                    key: loc[i].id,
                    value: loc[i].id,
                    text: loc[i].name,
                });
            }
            setLocation(data);
        }
        getLocationData();
    }, [search]);

    const formik = useFormik({
        initialValues: {
            photo: '',
            type: '',
            location: '',
            notes: '',
        },
        validationSchema: detailInfoSchema,
        onSubmit: (values: DetailInfo) => {
            createBasicInfo(values);
        },
    });
    const { handleSubmit, errors, touched, isValid, dirty } = formik;
    return (
        <div
            style={{
                width: '80%',
                margin: 'auto',
            }}
        >
            <FormikProvider value={formik}>
                <Form onSubmit={handleSubmit}>
                    <FileUpload name="photo" />
                    <SelectOption
                        name="type"
                        options={employementType}
                        error={Boolean(touched.location && errors.location)}
                        helperText={touched.location && errors.location}
                    />
                    <TextfieldAutocomplete
                        options={location || []}
                        onChange={(data: string) => setSearch(data)}
                        onSelected={() => console.log('aaa')}
                        fullWidth
                    />
                    <TextfieldArea
                        name="notes"
                        fullWidth
                        onChange={formik.handleChange}
                        error={Boolean(touched.notes && errors.notes)}
                        helperText={touched.notes && errors.notes}
                    />
                    <Button
                        type="submit"
                        text="Save Data"
                        size="md"
                        variant="contained"
                        icon="mdi:content-save"
                        iconSize={16}
                        disabled={!isValid || !dirty}
                    />
                </Form>
            </FormikProvider>
        </div>
    );
};

export default WizardStep2;
