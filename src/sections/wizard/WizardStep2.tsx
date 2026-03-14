import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import { Button } from '../../components/buttons';
import {
    FileUpload,
    SelectOption,
    TextfieldArea,
    TextfieldAutocomplete,
} from '../../components/forms';
import Page from '../../components/Page';
import { useDebounce } from '../../hooks/useDebounce';
import { useRole } from '../../hooks/useRole';
import type { DetailInfo } from '../../lib/types';
import { getLocation, postDetail } from '../../services/detail.service';
import { getDraft, saveDraft } from '../../utils/draftStorage';
import { detailInfoSchema } from '../../utils/validation';

interface PropsOption {
    key: any;
    text: string;
    value: string;
}

const employementType = [
    {
        key: 'Full-time',
        value: 'Full-time',
        text: 'Full-time',
    },
    {
        key: 'Part-time',
        value: 'Part-time',
        text: 'Part-time',
    },
    {
        key: 'Contract',
        value: 'Contract',
        text: 'Contract',
    },
    {
        key: 'Intern',
        value: 'Intern',
        text: 'Intern',
    },
];

const WizardStep2 = () => {
    const { role } = useRole();
    const draftRole = `draft_${role}`;
    const draftStorage = getDraft(draftRole);
    const [location, setLocation] = useState<PropsOption[]>([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        async function getLocationData() {
            const data: PropsOption[] = [];
            const loc: any = await getLocation({
                'name:contains': search,
            });
            for (let i = 0; i < loc.length; i++) {
                data.push({
                    key: loc[i].name,
                    value: loc[i].name,
                    text: loc[i].name,
                });
            }
            setLocation(data);
        }
        getLocationData();
    }, [search]);

    const formik = useFormik({
        initialValues: draftStorage || {
            photo: '',
            type: '',
            location: '',
            notes: '',
        },
        validationSchema: detailInfoSchema,
        onSubmit: (values: DetailInfo) => {
            postDetail(values);
        },
    });
    const { handleSubmit, errors, touched, isValid, values } = formik;
    const debouncedValues = useDebounce(formik.values, 2000);

    useEffect(() => {
        if (debouncedValues) {
            saveDraft(draftRole, debouncedValues);
        }

        // console.log('Draft saved:', draftStorage);
    }, [debouncedValues]);
    return (
        <Page title="Wizard Step-2 | Basic Info">
            <div className="wrapper">
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit} style={{ width: '60%' }}>
                        <FileUpload
                            name="photo"
                            onSelected={(data: any) =>
                                formik.setFieldValue('photo', data)
                            }
                            defaultImage={values.photo}
                        />
                        <SelectOption
                            name="type"
                            options={employementType}
                            error={Boolean(touched.type && errors.type)}
                            helperText={touched.type && errors.type}
                            onChange={formik.handleChange}
                            defaultValue={values.type}
                        />
                        <TextfieldAutocomplete
                            name="location"
                            options={location || []}
                            defaultText={values.location}
                            onChange={(data: string) => setSearch(data)}
                            onSelected={(data: string) =>
                                formik.setFieldValue('location', data)
                            }
                            fullWidth
                            error={Boolean(touched.location && errors.location)}
                            helperText={touched.location && errors.location}
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
                            disabled={!isValid}
                        />
                    </Form>
                </FormikProvider>
            </div>
        </Page>
    );
};

export default WizardStep2;
