import * as React from "react";
import { 
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    useNotify, 
    useRefresh, 
    useRedirect,
} from 'react-admin';

const AssettypeTitle = ({ record }) => {
    return <span>Assettype {record ? `"${record.nama}"` : ''}</span>;
};

const AssettypeFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

export const AssettypeList = props => (
    <List filters={AssettypeFilters} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="nama" />
            <TextField source="kode" />
            <TextField source="deskripsi" />
            <TextField source="updatedAt" />
            <EditButton />
        </Datagrid>
    </List>
);

export const AssettypeEdit = props => (
    <Edit title={<AssettypeTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
            <TextInput source="kode" />
            <TextInput multiline source="deskripsi" />
        </SimpleForm>
    </Edit>
);

export const AssettypeCreate = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Data created`);
        redirect('/assettypes');
        refresh();
    };

    return (
    <Create onSuccess={onSuccess} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
            <TextInput source="kode" />
            <TextInput multiline source="deskripsi" />
        </SimpleForm>
    </Create>
)};