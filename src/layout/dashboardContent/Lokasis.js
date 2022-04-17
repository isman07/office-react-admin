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

const LokasiTitle = ({ record }) => {
    return <span>Lokasi {record ? `"${record.nama}"` : ''}</span>;
};

const LokasiFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

export const LokasiList = props => (
    <List filters={LokasiFilters} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="nama" />
            <TextField source="updatedAt" />
            <EditButton />
        </Datagrid>
    </List>
);

export const LokasiEdit = props => (
    <Edit title={<LokasiTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
        </SimpleForm>
    </Edit>
);

export const LokasiCreate = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Data created`);
        redirect('/lokasis');
        refresh();
    };

    return (
    <Create onSuccess={onSuccess} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
        </SimpleForm>
    </Create>
)};