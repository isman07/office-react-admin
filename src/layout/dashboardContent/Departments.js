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

const DepartmentTitle = ({ record }) => {
    return <span>Department {record ? `"${record.nama}"` : ''}</span>;
};

const DepartmentFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

export const DepartmentList = props => (
    <List filters={DepartmentFilters} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="nama" />
            <TextField source="updatedAt" />
            <EditButton />
        </Datagrid>
    </List>
);

export const DepartmentEdit = props => (
    <Edit title={<DepartmentTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
        </SimpleForm>
    </Edit>
);

export const DepartmentCreate = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Data created`);
        redirect('/departments');
        refresh();
    };

    return (
    <Create onSuccess={onSuccess} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
        </SimpleForm>
    </Create>
)};