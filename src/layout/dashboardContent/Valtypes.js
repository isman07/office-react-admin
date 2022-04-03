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

const ValtypeTitle = ({ record }) => {
    return <span>Valtype {record ? `"${record.nama}"` : ''}</span>;
};

const ValtypeFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

export const ValtypeList = props => (
    <List filters={ValtypeFilters} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="nama" />
            <TextField source="kode" />
            <TextField source="deskripsi" />
            <TextField source="updatedAt" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ValtypeEdit = props => (
    <Edit title={<ValtypeTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
            <TextInput source="kode" />
            <TextInput multiline source="deskripsi" />
        </SimpleForm>
    </Edit>
);

export const ValtypeCreate = props => {
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