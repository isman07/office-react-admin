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
} from 'react-admin';

const PostssTitle = ({ record }) => {
    return <span>Postss {record ? `"${record.title}"` : ''}</span>;
};

const PostssFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

export const PostssList = props => (
    <List filters={PostssFilters} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <TextField source="author_id" />
            <EditButton />
        </Datagrid>
    </List>
);

export const PostssEdit = props => (
    <Edit title={<PostssTitle/>} {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const PostssCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);