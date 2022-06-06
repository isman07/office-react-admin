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
    DateInput,
    SelectInput,
    useNotify, 
    useRefresh, 
    useRedirect,
} from 'react-admin';

const PeminjamanTitle = ({ record }) => {
    return <span>Peminjaman {record ? `"${record.nama}"` : ''}</span>;
};

const PeminjamanFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

const SubReference = ({ translateChoice, children, ...props }) => (
    <ReferenceField {...props}>{children}</ReferenceField>
);

export const PeminjamanList = props => (
    <List filters={PeminjamanFilters} {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="barang_id" reference="barangs">
                <TextField source="no_aset" />
                {/* <SubReference source="asset_type" reference="assettypes">
                    <TextField source="name" />
                </SubReference> */}
            </ReferenceField>
            <ReferenceField source="user" reference="users">
                <TextField source="nama" />
            </ReferenceField>
            <TextField source="tanggal_pinjam" />
            <TextField source="tanggal_kembali" />
            <EditButton />
        </Datagrid>
    </List>
);

export const PeminjamanEdit = props => (
    <Edit title={<PeminjamanTitle/>} {...props}>
        <SimpleForm>
            <ReferenceInput source="barang_id" reference="barangs">
                <SelectInput optionText="no_aset" />
            </ReferenceInput>
            <ReferenceInput source="user" reference="users">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <DateInput source="tanggal_pinjam" />
            <TextInput source="remarks" multiline/>
        </SimpleForm>
    </Edit>
);

export const PeminjamanCreate = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Data created`);
        redirect('/peminjamans');
        refresh();
    };

    return (
    <Create onSuccess={onSuccess} {...props}>
        <SimpleForm>
            <ReferenceInput source="barang_id" reference="barangs">
                <SelectInput optionText="no_aset" />
            </ReferenceInput>
            <ReferenceInput source="user" reference="users">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <DateInput source="tanggal_pinjam" />
            <TextInput source="remarks" multiline/>
        </SimpleForm>
    </Create>
)};