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
    useNotify, 
    useRefresh, 
    useRedirect,
} from 'react-admin';

const RoleTitle = ({ record }) => {
    return <span>Role {record ? `"${record.nama}"` : ''}</span>;
};

const RoleFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

export const RoleList = props => (
    <List filters={RoleFilters} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="nama" />
            <TextField source="updatedAt" />
            <EditButton />
        </Datagrid>
    </List>
);

export const RoleEdit = props => (
    <Edit title={<RoleTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
        </SimpleForm>
    </Edit>
);

export const RoleCreate = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Data created`);
        redirect('/roles');
        refresh();
    };

    return (
    <Create onSuccess={onSuccess} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
        </SimpleForm>
    </Create>
)};