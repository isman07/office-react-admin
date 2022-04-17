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

const BarangTitle = ({ record }) => {
    return <span>Barang {record ? `"${record.nama}"` : ''}</span>;
};

const BarangFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

export const BarangList = props => (
    <List filters={BarangFilters} {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="value_type" reference="valtypes">
                <TextField source="nama" />
            </ReferenceField>
            <ReferenceField source="asset_type" reference="assettypes">
                <TextField source="nama" />
            </ReferenceField>
            <TextField source="serial_number" />
            <TextField source="updatedAt" />
            <EditButton />
        </Datagrid>
    </List>
);

export const BarangEdit = props => (
    <Edit title={<BarangTitle/>} {...props}>
        <SimpleForm>
            <ReferenceInput source="value_type" reference="valtypes">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <ReferenceInput source="asset_type" reference="assettypes">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="serial_number" />
            <ReferenceInput source="lokasi" reference="lokasis">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="deskripsi" />
        </SimpleForm>
    </Edit>
);

export const BarangCreate = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Data created`);
        redirect('/barangs');
        refresh();
    };

    return (
    <Create onSuccess={onSuccess} {...props}>
        <SimpleForm>
            <ReferenceInput source="value_type" reference="valtypes">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <ReferenceInput source="asset_type" reference="assettypes">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="serial_number" />
            <ReferenceInput source="lokasi" reference="lokasis">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="deskripsi" />
        </SimpleForm>
    </Create>
)};