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
import { useFormState } from 'react-final-form';

const PengembalianTitle = ({ record }) => {
    return <span>Pengembalian {record ? `"${record.nama}"` : ''}</span>;
};

const PengembalianFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

const SubReference = ({ translateChoice, children, ...props }) => (
    <ReferenceField {...props}>{children}</ReferenceField>
);

export const PengembalianList = props => (
    <List filters={PengembalianFilters} {...props}>
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
            <TextField source="tanggal_kembali" />
            <TextField source="kondisi" label="Kondisi"/>
            <EditButton />
        </Datagrid>
    </List>
);


const PengInput = () => {
    const { values } = useFormState();

    return (
        // <ReferenceInput
        //     source="peminjamans"
        //     reference="peminjamans"
        //     filter={{ user: values.user }}
        // >
        //     <SelectInput optionText="remarks" />
        // </ReferenceInput>
        <ReferenceInput source="barang_id" reference="peminjamans" filter={{ user: values.user }}>
            <SelectInput optionText="no_aset" />
        </ReferenceInput>
    );
} 
export const PengembalianEdit = props => (
    <Edit title={<PengembalianTitle/>} {...props}>
        <SimpleForm>
            {/* <ReferenceInput source="barang_id" reference="barangs">
                <SelectInput optionText="no_aset" />
            </ReferenceInput> */}
            {/* <ReferenceInput source="user" reference="users">
                <SelectInput optionText="nama" />
            </ReferenceInput> */}
            {/* <SelectInput source="country" choices={toChoices(countries)} /> */}
            <ReferenceInput
                source="user"
                reference="users"
                disabled
            >
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <PengInput disabled/>
            <DateInput source="tanggal_kembali" />
            <SelectInput source="kondisi" choices={[
                { id:"Good Condition", name: "Good" },
                { id:"Repair Condition", name: "Repair" },
                { id:"Damage Condition", name: "Damage" },
            ]}/>
            <TextInput source="remarks" label="Description" multiline/>
        </SimpleForm>

        
    </Edit>
);

export const PengembalianCreate = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Data created`);
        redirect('/pengembalians');
        refresh();
    };

    return (
    <Create onSuccess={onSuccess} {...props}>
        <SimpleForm>
            {/* <ReferenceInput source="barang_id" reference="barangs">
                <SelectInput optionText="no_aset" />
            </ReferenceInput>
            <ReferenceInput source="user" reference="users">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <DateInput source="tanggal_pinjam" />
            <TextInput source="remarks" multiline/> */}
            {/* <ReferenceInput source="user" reference="users">
                <SelectInput optionText="nama" />
            </ReferenceInput> */}
            {/* <SelectInput source="country" choices={toChoices(countries)} /> */}
            <ReferenceInput
                source="user"
                reference="users"
            >
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <PengInput/>
            <DateInput source="tanggal_kembali" />
            <SelectInput source="kondisi" choices={[
                { id:"Good Condition", name: "Good" },
                { id:"Repair Condition", name: "Repair" },
                { id:"Damage Condition", name: "Damage" },
            ]}/>
            <TextInput source="remarks" label="Description" multiline/>
        </SimpleForm>
    </Create>
)};