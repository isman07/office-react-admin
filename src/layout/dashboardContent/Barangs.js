import axios from "axios";
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
    Button
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
            <ImageField source="img" />
            <EditButton />
            {/* <DeleteButton undoable={false} /> */}
        </Datagrid>
    </List>
);

export const BarangEdit = props => {
    const [files, setFiles]                 = React.useState("")
    const [serialNumbers, setSerialNumbers] = React.useState("")
    const [valueType, setValueTypes]        = React.useState("")
    const [assetType, setAssetType]         = React.useState("")
    const [purchaseDate, setPurchaseDate]   = React.useState("")
    const [purchasePrice, setPurchasePrice] = React.useState("")
    const [lokasi, setLokasi]               = React.useState("")
    const [deskripsi, setDeskripsi]         = React.useState("")

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    React.useEffect(() => {
        getDetailData()
    }, [])

    const getDetailData = async () => {
        const detail = await axios({
            method: "GET",
            url   : process.env.REACT_APP_BASE_URL+"/barangs/"+props.id
        })

        setSerialNumbers(detail.data.serial_number)
        setValueTypes(detail.data.value_type)
        setAssetType(detail.data.asset_type)
        setPurchaseDate(detail.data.purchase_date)
        setPurchasePrice(detail.data.purchase_price)
        setLokasi(detail.data.lokasi)
        setDeskripsi(detail.data.deskripsi)
    }

    const onSuccess = () => {
        notify(`Data created`);
        redirect('/barangs');
        refresh();
    };

    const submit = async () => {
        if(serialNumbers !== "" && valueType !== "" && assetType !== "" && purchaseDate !== "" && purchasePrice !== "" && lokasi !== "" && deskripsi !== "") {
            let formData = new FormData()
            
            if(files !== "") {
                formData.append("file", files)
            }

            formData.append("serial_number", serialNumbers)
            formData.append("value_type", valueType)
            formData.append("asset_type", assetType)
            formData.append("purchase_date", purchaseDate)
            formData.append("lokasi", lokasi)
            formData.append("deskripsi", deskripsi)
            formData.append("purchase_price", purchasePrice)

            const sendData = await axios({
                method: "PUT",
                url : process.env.REACT_APP_BASE_URL+"/barangs/"+props.id,
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
                data : formData
            })

            if(sendData.data.id === props.id) {
                onSuccess()
            } else {
                alert("Failed update data.")
            }
        } else {
            alert("Please fill all filed input.")
        }
    }

    const deleteData = async () => {
        await axios({
            method: "DELETE",
            url : process.env.REACT_APP_BASE_URL+"/barangs/"+props.id
        })

        notify(`Data deleted`);
        redirect('/barangs');
        refresh();
    }

    const CustomToolbar = (props) => (
        <Toolbar {...props}  style={{ display:"none" }}>
            <SaveButton onClick={() => submit()}/>
        </Toolbar>
    );

    return (
    <div>
        <SimpleForm toolbar={<CustomToolbar/>}>
            <ReferenceInput source="value_type" initialValue={valueType} reference="valtypes" onChange={(e) => setValueTypes(e.target.value)}>
                <SelectInput optionText="nama"/>
            </ReferenceInput>
            <ReferenceInput source="asset_type" initialValue={assetType} reference="assettypes" onChange={(e) => setAssetType(e.target.value)}>
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="serial_number" initialValue={serialNumbers} onChange={(e) => setSerialNumbers(e.target.value)}/>
            <DateInput source="purchase_date" initialValue={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)}/>
            <NumberInput source="purchase_price" initialValue={purchasePrice} step={1000} onChange={(e) => setPurchasePrice(e.target.value)}/>
            <ReferenceInput source="lokasi" initialValue={lokasi} reference="lokasis" onChange={(e) => setLokasi(e.target.value)}>
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="deskripsi" initialValue={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}/>
            <input type="file" onChange={(e) => setFiles(e.target.files[0])}/>
            <Button label="Update" style={{ marginTop: "30px", backgroundColor: "#3f51b5", color:"white", paddingTop:"8px", paddingBottom:"8px"}} onClick={() => submit()}/>
            <Button label="Delete" style={{ marginTop: "10px", backgroundColor: "red", color:"white", paddingTop:"8px", paddingBottom:"8px"}} onClick={() => deleteData()}/>
        </SimpleForm>
    </div>
)};

export const BarangCreate = props => {
    const [files, setFiles]                 = React.useState("")
    const [serialNumbers, setSerialNumbers] = React.useState("")
    const [valueType, setValueTypes]        = React.useState("")
    const [assetType, setAssetType]         = React.useState("")
    const [purchaseDate, setPurchaseDate]   = React.useState("")
    const [purchasePrice, setPurchasePrice] = React.useState("")
    const [lokasi, setLokasi]               = React.useState("")
    const [deskripsi, setDeskripsi]         = React.useState("")

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Data created`);
        redirect('/barangs');
        refresh();
    };

    
    const submit = async () => {
        if(files !== "" && serialNumbers !== "" && valueType !== "" && assetType !== "" && purchaseDate !== "" && purchasePrice !== "" && lokasi !== "" && deskripsi !== "") {
            let formData = new FormData()
            formData.append("file", files)
            formData.append("serial_number", serialNumbers)
            formData.append("value_type", valueType)
            formData.append("asset_type", assetType)
            formData.append("purchase_date", purchaseDate)
            formData.append("lokasi", lokasi)
            formData.append("deskripsi", deskripsi)
            formData.append("purchase_price", purchasePrice)

            const sendData = await axios({
                method: "POST",
                url : process.env.REACT_APP_BASE_URL+"/barangs",
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
                data : formData
            })

            if(sendData.data.message === "Barang Created!") {
                onSuccess()
            } else {
                alert("Failed insert data.")
            }
        } else {
            alert("Please fill all filed input.")
        }
    }

    const CustomToolbar = (props) => (
        <Toolbar {...props}  style={{ display:"none" }}>
            <SaveButton onClick={() => submit()}/>
        </Toolbar>
    );

    return (
    <div>
        <SimpleForm toolbar={<CustomToolbar/>}>
            <ReferenceInput source="value_type" reference="valtypes" onChange={(e) => setValueTypes(e.target.value)}>
                <SelectInput optionText="nama"/>
            </ReferenceInput>
            <ReferenceInput source="asset_type" reference="assettypes" onChange={(e) => setAssetType(e.target.value)}>
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="serial_number" onChange={(e) => setSerialNumbers(e.target.value)}/>
            <DateInput source="purchase_date" onChange={(e) => setPurchaseDate(e.target.value)}/>
            <NumberInput source="purchase_price" step={1000} onChange={(e) => setPurchasePrice(e.target.value)}/>
            <ReferenceInput source="lokasi" reference="lokasis" onChange={(e) => setLokasi(e.target.value)}>
                <SelectInput optionText="nama" />
            </ReferenceInput>
            <TextInput source="deskripsi" onChange={(e) => setDeskripsi(e.target.value)}/>
            <input type="file" onChange={(e) => setFiles(e.target.files[0])}/>
            <Button label="save" style={{ marginTop: "30px", backgroundColor: "#3f51b5", color:"white", paddingTop:"8px", paddingBottom:"8px"}} onClick={() => submit()}/>
        </SimpleForm>
    </div>
)};
