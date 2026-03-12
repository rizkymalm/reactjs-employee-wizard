import { Textfield, FileUpload, TextfieldArea } from '../../components/forms';
import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../../components/buttons';
import { Form, FormikProvider, useFormik } from 'formik';
import { detailInfoSchema } from '../../utils/validation';
import { createBasicInfo } from '../../services/basicInfo.service';
import { DetailInfo } from '@/lib/types';

const WizardStep2 = () => {
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
                    <Textfield
                        name="type"
                        fullWidth
                        placeholder="Employee Type"
                        contentBefore={<Icon icon={'mdi:user'} />}
                        onChange={formik.handleChange}
                        error={Boolean(touched.type && errors.type)}
                        helperText={touched.type && errors.type}
                    />
                    <Textfield
                        name="location"
                        fullWidth
                        placeholder="Office Location"
                        contentBefore={<Icon icon={'mdi:location'} />}
                        onChange={formik.handleChange}
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
                        disabled={!isValid || !dirty}
                    />
                </Form>
            </FormikProvider>
        </div>
    );
};

export default WizardStep2;
