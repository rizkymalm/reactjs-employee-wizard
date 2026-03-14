import { Icon } from '@iconify/react';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/buttons';
import {
    SelectOption,
    Textfield,
    TextfieldAutocomplete,
} from '../../components/forms';
import Page from '../../components/Page';
import { useDebounce } from '../../hooks/useDebounce';
import { useRole } from '../../hooks/useRole';
import { useWizardState } from '../../hooks/useWizardState';
import type { BasicInfo } from '../../lib/types';
import { getDepartments } from '../../services/basicInfo.service';
import { getDraft, saveDraft } from '../../utils/draftStorage';
import { basicInfoSchema } from '../../utils/validation';

interface PropsOption {
    key: any;
    text: string;
    value: string;
}

const roleType = [
    {
        key: 'Ops',
        value: 'Ops',
        text: 'Ops',
    },
    {
        key: 'Admin',
        value: 'Admin',
        text: 'Admin',
    },
    {
        key: 'Engineer',
        value: 'Engineer',
        text: 'Engineer',
    },
    {
        key: 'Finance',
        value: 'Finance',
        text: 'Finance',
    },
];

const WizardStep1 = () => {
    const navigate = useNavigate();
    const { setBasicInfo } = useWizardState();
    const { role } = useRole();
    const draftRole = `draft_${role}`;
    const storage = getDraft(draftRole);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [departments, setDepartments] = useState<PropsOption[]>([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        async function getLocationData() {
            const data: PropsOption[] = [];
            const dep: any = await getDepartments({
                'name:contains': search,
            });
            for (let i = 0; i < dep.length; i++) {
                data.push({
                    key: dep[i].name,
                    value: dep[i].name,
                    text: dep[i].name,
                });
            }
            setDepartments(data);
        }
        getLocationData();
    }, [search]);
    const formik = useFormik({
        initialValues: storage.basicInfo ?? {
            fullName: '',
            email: '',
            department: '',
            role: '',
        },
        enableReinitialize: true,
        validationSchema: basicInfoSchema,
        onSubmit: async (values: BasicInfo) => {
            try {
                await setLoading(true);
                setBasicInfo(values);
                await new Promise(resolve => {
                    setTimeout(resolve, 2000);
                });
                navigate(`/wizard/step-2?role=${role}`);
            } catch (error: any) {
                setErrorMessage(error);
            } finally {
                setLoading(false);
            }
        },
    });
    const { handleSubmit, errors, touched, isValid, values } = formik;

    const debouncedValues = useDebounce(formik.values, 500);

    useEffect(() => {
        if (debouncedValues) {
            const draftStorage = getDraft(draftRole);
            saveDraft(draftRole, {
                ...draftStorage,
                basicInfo: debouncedValues,
            });
        }
    }, [debouncedValues]);
    return (
        <Page title="Wizard Step-1 | Basic Info">
            <div className="wrapper">
                {errorMessage && (
                    <div className="text-error">{errorMessage}</div>
                )}
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit} style={{ width: '60%' }}>
                        <Textfield
                            name="fullName"
                            fullWidth
                            placeholder="Full Name"
                            defaultValue={values.fullName}
                            contentBefore={<Icon icon="mdi:user" />}
                            onChange={formik.handleChange}
                            error={Boolean(touched.fullName && errors.fullName)}
                            helperText={touched.fullName && errors.fullName}
                        />
                        <Textfield
                            name="email"
                            fullWidth
                            placeholder="Email"
                            defaultValue={values.email}
                            contentBefore={<Icon icon="mdi:email" />}
                            onChange={formik.handleChange}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <TextfieldAutocomplete
                            options={departments || []}
                            name="department"
                            defaultVal={values.department}
                            onSearch={(value: string) => {
                                setSearch(value);
                            }}
                            onSelected={(value: string) => {
                                formik.setFieldValue('department', value);
                            }}
                            contentBefore={
                                <Icon icon="mingcute:department-fill" />
                            }
                            fullWidth
                        />
                        <SelectOption
                            name="role"
                            options={roleType}
                            defaultValue={values.role}
                            contentBefore={<Icon icon="fa7-solid:user-cog" />}
                            error={Boolean(touched.role && errors.role)}
                            helperText={touched.role && errors.role}
                            onChange={formik.handleChange}
                        />
                        <Button
                            type="submit"
                            text={role === 'admin' ? 'Next' : 'Save Data'}
                            size="md"
                            variant="contained"
                            icon="mdi:content-save"
                            iconSize={16}
                            loading={loading}
                            disabled={!isValid || loading}
                        />
                    </Form>
                </FormikProvider>
            </div>
        </Page>
    );
};

export default WizardStep1;
