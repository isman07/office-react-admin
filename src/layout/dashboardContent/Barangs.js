import * as React from "react";
import {Fragment} from "react";
import { 
    Toolbar,
    List,
    Datagrid,
    TextField,
    SaveButton,
    EditButton,
    DeleteButton,
    BulkDeleteButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    ReferenceField,
    ReferenceInput,
    NumberInput,
    DateInput,
    SelectInput,
    ImageInput,
    ImageField,
    useNotify, 
    useRefresh, 
    useRedirect,
} from 'react-admin';

const PostBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton {...props} undoable={false}/>
    </Fragment>
);


const CustomToolbar = props => (
    <Toolbar
        {...props}
        // sx={{ display: 'flex', justifyContent: 'space-between' }}
        // classes={useStyles()}
    >
        <SaveButton {...props} />
        <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
);

const BarangTitle = ({ record }) => {
    return <span>Barang {record ? `"${record.deskripsi}"` : ''}</span>;
};

const BarangFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

export const BarangList = props => (
    <List filters={BarangFilters} bulkActionButtons={<PostBulkActionButtons/>} {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="value_type" reference="valtypes">
                <TextField source="nama" />
            </ReferenceField>
            <ReferenceField source="asset_type" reference="assettypes">
                <TextField source="nama" />
            </ReferenceField>
            <TextField source="no_aset" />
            <TextField source="serial_number" />
            <TextField source="purchase_date" />
            <TextField source="purchase_price" />
            <EditButton />
            {/* <DeleteButton undoable={false} /> */}
        </Datagrid>
    </List>
);

export const BarangEdit = props => (
    <Edit title={<BarangTitle/>} undoable={false} {...props}>
        <SimpleForm >
            <ReferenceInput source="value_type" reference="valtypes">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <ReferenceInput source="asset_type" reference="assettypes">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="serial_number" />
            <DateInput source="purchase_date" />
            <NumberInput source="purchase_price" step={1000}/>
            <ReferenceInput source="lokasi" reference="lokasis">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="deskripsi" />
            <ImageInput source="pictures" label="Related pictures" accept="image/*" placeholder={<p>Drop your file here</p>}>
                <ImageField source="img" title="title" />
            </ImageInput>
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
            <DateInput source="purchase_date" />
            <NumberInput source="purchase_price" step={1000}/>
            <ReferenceInput source="lokasi" reference="lokasis">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="deskripsi" />
        </SimpleForm>
    </Create>
)};