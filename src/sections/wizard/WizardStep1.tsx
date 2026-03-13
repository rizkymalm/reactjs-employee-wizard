import {
    SelectOption,
    Textfield,
    TextfieldAutocomplete,
} from '../../components/forms';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../../components/buttons';
import { Form, FormikProvider, useFormik } from 'formik';
import { basicInfoSchema } from '../../utils/validation';
import { BasicInfo } from '../../lib/types';
import { useWizardState } from '../../hooks/useWizardState';
import { getDepartments } from '../../services/basicInfo.service';
import { useDebounce } from '../../hooks/useDebounce';
import { getDraft, saveDraft } from '../../utils/draftStorage';
import Page from '../../components/Page';
import { useRole } from '../../context/RoleContext';
import { useNavigate } from 'react-router-dom';

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
    const { role } = useRole();
    const { setBasicInfo } = useWizardState();
    const draftStorage = getDraft('wizardstep1_draft');
    const [departments, setDepartments] = useState<PropsOption[]>([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        async function getLocationData() {
            let data: PropsOption[] = [];
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
        initialValues: draftStorage
            ? draftStorage
            : {
                  fullName: '',
                  email: '',
                  department: '',
                  role: '',
              },
        validationSchema: basicInfoSchema,
        onSubmit: (values: BasicInfo) => {
            setBasicInfo(values);
            navigate(`/wizard/step-2?role=${role}`);
        },
    });
    const { handleSubmit, errors, touched, isValid, values } = formik;

    const debouncedValues = useDebounce(formik.values, 2000);

    useEffect(() => {
        if (debouncedValues) {
            saveDraft('wizardstep1_draft', debouncedValues);
        }

        console.log('Draft saved:', getDraft('wizardstep1_draft'));
    }, [debouncedValues]);
    return (
        <Page title="Wizard Step-1 | Basic Info">
            <div className="wrapper">
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit} style={{ width: '60%' }}>
                        <Textfield
                            name="fullName"
                            fullWidth
                            placeholder="Full Name"
                            defaultValue={values.fullName}
                            contentBefore={<Icon icon={'mdi:user'} />}
                            onChange={formik.handleChange}
                            error={Boolean(touched.fullName && errors.fullName)}
                            helperText={touched.fullName && errors.fullName}
                        />
                        <Textfield
                            name="email"
                            fullWidth
                            placeholder="Email"
                            defaultValue={values.email}
                            contentBefore={<Icon icon={'mdi:email'} />}
                            onChange={formik.handleChange}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <TextfieldAutocomplete
                            options={departments || []}
                            placeholder="Department"
                            defaultText={values.department}
                            contentBefore={
                                <Icon icon={'mingcute:department-fill'} />
                            }
                            onChange={(data: string) => setSearch(data)}
                            onSelected={(data: string) =>
                                formik.setFieldValue('department', data)
                            }
                            fullWidth
                            error={Boolean(
                                touched.department && errors.department
                            )}
                            helperText={touched.department && errors.department}
                        />
                        <SelectOption
                            name="role"
                            options={roleType}
                            defaultValue={values.role}
                            contentBefore={<Icon icon={'fa7-solid:user-cog'} />}
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
                            disabled={!isValid}
                        />
                    </Form>
                </FormikProvider>
            </div>
        </Page>
    );
};

export default WizardStep1;
