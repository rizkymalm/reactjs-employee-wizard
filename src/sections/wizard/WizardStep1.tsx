import { Textfield, TextfieldAutocomplete } from '../../components/forms';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../../components/buttons';
import { Form, FormikProvider, useFormik } from 'formik';
import { basicInfoSchema } from '../../utils/validation';
import { BasicInfo } from '../../lib/types';
import { useWizardState } from '../../hooks/useWizardState';
import {
    createBasicInfo,
    getDepartments,
} from '../../services/basicInfo.service';

interface PropsOption {
    key: any;
    text: string;
    value: string;
}

const WizardStep1 = () => {
    const { setBasicInfo } = useWizardState();
    const [departments, setDepartments] = useState<PropsOption[]>([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        async function getLocationData() {
            let data: PropsOption[] = [];
            const loc: any = await getDepartments({
                'name:contains': search,
            });
            for (let i = 0; i < loc.length; i++) {
                data.push({
                    key: loc[i].id,
                    value: loc[i].id,
                    text: loc[i].name,
                });
            }
            setDepartments(data);
        }
        getLocationData();
    }, [search]);
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
                    <TextfieldAutocomplete
                        options={departments || []}
                        contentBefore={
                            <Icon icon={'mingcute:department-fill'} />
                        }
                        onChange={(data: string) => setSearch(data)}
                        onSelected={(data: string) =>
                            formik.setFieldValue('department', data)
                        }
                        fullWidth
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
