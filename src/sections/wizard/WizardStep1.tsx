import { Textfield } from '../../components/forms';
import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../../components/buttons';
import { Form, FormikProvider, useFormik } from 'formik';
import { basicInfoSchema } from '../../utils/validation';
import { BasicInfo } from '../../lib/types';
import { useWizardState } from '../../hooks/useWizardState';
import { createBasicInfo } from '../../services/basicInfo.service';

const WizardStep1 = () => {
    const { setBasicInfo } = useWizardState();
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            department: '',
            role: '',
        },
        validationSchema: basicInfoSchema,
        onSubmit: (values: BasicInfo) => {
            setBasicInfo(values);
            createBasicInfo(values);
        },
    });
    const { handleSubmit, errors, touched, isValid, dirty } = formik;
    return (
        <div>
            <FormikProvider value={formik}>
                <Form onSubmit={handleSubmit}>
                    <Textfield
                        name="fullName"
                        fullWidth
                        placeholder="Full Name"
                        contentBefore={<Icon icon={'mdi:user'} />}
                        onChange={formik.handleChange}
                        error={Boolean(touched.fullName && errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                    />
                    <Textfield
                        name="email"
                        fullWidth
                        placeholder="Email"
                        contentBefore={<Icon icon={'mdi:email'} />}
                        onChange={formik.handleChange}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <Textfield
                        name="department"
                        fullWidth
                        placeholder="Department"
                        contentBefore={
                            <Icon icon={'mingcute:department-fill'} />
                        }
                        onChange={formik.handleChange}
                        error={Boolean(touched.department && errors.department)}
                        helperText={touched.department && errors.department}
                    />
                    <Textfield
                        name="role"
                        fullWidth
                        placeholder="Role"
                        contentBefore={<Icon icon={'fa7-solid:user-cog'} />}
                        onChange={formik.handleChange}
                        error={Boolean(touched.role && errors.role)}
                        helperText={touched.role && errors.role}
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

export default WizardStep1;
