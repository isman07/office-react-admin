import React, { useRef, useState } from 'react';

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

import { Box, Button, Typography } from '@material-ui/core';
import {QRCodeCanvas} from 'qrcode.react';

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.nama}"` : ''}</span>;
};

const UserFilters = [
    <TextInput source="q" label="Search" alwaysOn />
];

const NonInput = React.memo(function NonInput({ children }) {
    return (
        <div style={{
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            { children }
        </div>
    )
});

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

export const UserEdit = props => {
    const downloadQR = () => {
        const canvas = document.getElementById("qr-canvas");
        const img    = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = img;
        link.download = 'QR.png';
        link.click();
    }

    const printToPdf = () => {
        const canvas = document.getElementById("qr-canvas");
        const img    = canvas.toDataURL("image/png");

        var windows = window.open('', '', '');

        windows.document.write(`
            <div style="text-align: center;">
                <img src="${img}" />
            </div>
        `);

        // windows.document.close();
        setTimeout(() => {
            windows.print();
            windows.close()
        }, 500)
    }

    return ( <Edit title={<UserTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="nama" />
            <ReferenceInput source="department_id" reference="departments">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <ReferenceInput source="role_user" reference="roles">
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="email" />

            <NonInput>
                <div id="qr-content">
                <QRCodeCanvas id="qr-canvas" value={`http://localhost:3000/#/pinjaman-user/${props.id}`} />
                </div>
                <br/>
                <Box>
                    <Button variant="contained" onClick={downloadQR}>Download</Button> &nbsp;
                    <Button variant="contained" onClick={printToPdf}>Print</Button>
                </Box>
                <Typography align="center">
                    Scan QR Code ini untuk melihat barang-barang yang user pinjam
                </Typography>
            </NonInput>
        </SimpleForm>
    </Edit> )
};

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