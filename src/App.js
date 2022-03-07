import * as React from "react";
import { Admin, Resource, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { UserList } from './layout/dashboardContent/Users';
import { PostList, PostEdit, PostCreate } from './layout/dashboardContent/Posts';
import Dashboard from "./layout/Dashboard";
import CustomLoginPage from './CustomLoginPage';
import { firebaseConfig } from "./FIREBASE_CONFIG";

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import {
  // FirebaseDataProvider,
  FirebaseAuthProvider,
} from 'react-admin-firebase';

import firebase from "firebase/compat/app";
// require('dotenv').config()
// let firebaseConfig;
// try {
//   firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
// } catch (error) {
//   console.error('Error parsing (maybe quotes aren\'t escaped?): ', {REACT_APP_FIREBASE_CONFIG: process.env.REACT_APP_FIREBASE_CONFIG}, error);
// }

const firebaseApp = firebase.initializeApp(firebaseConfig);

console.log({firebaseConfig, firebaseApp});

const authProvider = FirebaseAuthProvider(firebaseConfig);

const myAuthProvider = {
  // Copy all authprovider functionality
  ...authProvider,
  // Wrap the checkAuth to add page redirection
  checkAuth: () =>
    authProvider
      .checkAuth()
      .then(() => {
        // Successfully logged in
        return { redirectTo: "/#" };
        // console.log('success-login');
      })
      .catch(() => {
        // Auth error
        return { redirectTo: "/login" };
        // console.log('failed-login');
      }),
};

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
function App() {
  return (
    <Admin
      title=""
      dashboard={Dashboard}
      loginPage={CustomLoginPage}
      dataProvider={dataProvider}
      authProvider={authProvider}
      disableTelemetry
    >
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
      <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
    
  );
}

export default App;
