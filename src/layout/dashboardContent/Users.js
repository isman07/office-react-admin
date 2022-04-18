import * as React from "react";
import { 
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    useNotify, 
    useRefresh, 
    useRedirect,
} from 'react-admin';

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.nama}"` : ''}</span>;
};

const UserFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

export const UserList = props => (
    <List filters={UserFilters} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="nama" />
            <ReferenceField source="department_id" reference="departments">
                <TextField source="nama" />
            </ReferenceField>
            <ReferenceField source="role_user" reference="roles">
                <TextField source="nama" />
            </ReferenceField>
            <TextField source="email" />
            <TextField source="updatedAt" />
            <EditButton />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit title={<UserTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
            <ReferenceInput source="department_id" reference="departments">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <ReferenceInput source="role_user" reference="roles">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="email" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Data created`);
        redirect('/users');
        refresh();
    };

    return (
    <Create onSuccess={onSuccess} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
            <ReferenceInput source="department_id" reference="departments">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <ReferenceInput source="role_user" reference="roles">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="email" />
        </SimpleForm>
    </Create>
)};