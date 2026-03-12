import { Textfield } from '../../components/forms';
import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../../components/buttons';

const WizardStep1 = () => {
    return (
        <div>
            <Textfield
                fullWidth
                placeholder="Full Name"
                contentBefore={<Icon icon={'mdi:user'} />}
            />
            <Textfield
                fullWidth
                placeholder="Email"
                contentBefore={<Icon icon={'mdi:email'} />}
            />
            <Textfield
                name="department"
                fullWidth
                placeholder="Department"
                contentBefore={<Icon icon={'mingcute:department-fill'} />}
            />
            <Textfield
                name="role"
                fullWidth
                placeholder="Role"
                contentBefore={<Icon icon={'fa7-solid:user-cog'} />}
            />
            <Button
                type="submit"
                text="Save Data"
                size="md"
                variant="texted"
                icon="mdi:content-save"
                iconSize={16}
            />
        </div>
    );
};

export default WizardStep1;
